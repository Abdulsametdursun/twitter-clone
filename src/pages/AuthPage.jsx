import { useState } from 'react';
import { auth, provider } from './../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthPage = () => {
  // Change modes SignUp or Login
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const [isForgotPass, setIsForgotPass] = useState(false);

  // SignUp or Login
  const handleSubmit = e => {
    e.preventDefault();

    if (isSignUp) {
      // create new account
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success('Creation successful');
          navigate('/feed');
        })
        .catch(err => toast.error(`Sorry there is a problem: ${err.code}`));
    } else {
      // Login to account
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success('Login successful');
          navigate('/feed');
        })
        .catch(err => {
          // if password is entered wrong
          if (err.code === 'auth/invalid-credential') {
            setIsForgotPass(true);
          }
          toast.error(`Sorry there is a problem: ${err.code}`);
        });
    }
  };

  // Send email for forgot password
  const sendMail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info('A password reset link has been sent to your email');
      })
      .catch(() => {
        toast.error(`Error sending email !!!`);
      });
  };

  // Login with google
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => navigate('/feed'))
      .catch(() => {
        toast.error(`Error sending email !!!`);
      });
  };

  return (
    <section className="min-h-screen grid place-items-center py-10 px-5 bg-black text-white">
      <div className="w-full max-w-lg flex flex-col gap-5 py-10 px-6 md:px-10 lg:px-16 rounded-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <img className="h-[50px]" src="/x-logo.png" alt="x-logo" />
        </div>

        <h1 className="font-bold text-2xl md:text-3xl text-center">
          {isSignUp ? 'Join today.' : 'Welcome Back!'}
        </h1>

        {/* Google button */}
        <button
          onClick={loginWithGoogle}
          className="flex items-center justify-center bg-white text-black py-2 px-4 md:px-8 rounded-full cursor-pointer gap-4 transition hover:bg-gray-300"
        >
          <img
            className="h-[25px] md:h-[30px]"
            src="/g-logo.png"
            alt="google-logo"
          />
          <span className="whitespace-nowrap text-sm md:text-base">
            {isSignUp ? 'Sign up with Google' : 'Log in with Google'}
          </span>
        </button>

        {/* Account create */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm md:text-base">Email</label>
          <input
            type="email"
            required
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-gray-500"
            onChange={e => setEmail(e.target.value)}
          />

          <label className="text-sm md:text-base">Password</label>
          <input
            type="password"
            required
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-gray-500"
            onChange={e => setPass(e.target.value)}
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-500 py-2 px-5 rounded-full text-white cursor-pointer transition hover:bg-blue-600"
          >
            {isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        {isForgotPass && (
          <p
            onClick={sendMail}
            className="text-center text-red-500 cursor-pointer"
          >
            Forgot password?
          </p>
        )}

        <p className="text-center">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        </p>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full flex items-center justify-center bg-black border-solid border border-gray-500 py-2 px-5 rounded-full text-white cursor-pointer gap-3 transition hover:bg-blue-400"
        >
          {isSignUp ? 'Sign in' : 'Create account'}
        </button>
      </div>
    </section>
  );
};

export default AuthPage;
