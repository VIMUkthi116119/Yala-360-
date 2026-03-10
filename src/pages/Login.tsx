import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  if (currentUser) {
    navigate('/');
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/gallery');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to authenticate');
    }
  };

  const signInWithGoogle = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/gallery');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-beige flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 shadow-md max-w-md w-full animate-fadeIn">
        <h2 className="text-3xl serif mb-6 text-center text-black">
          {isRegistering ? 'Create an Account' : 'Welcome Back'}
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 mb-6 font-light">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gold">Email</label>
            <input 
              type="email" 
              required
              className="w-full p-4 border border-gold/20 focus:border-gold outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gold">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-4 border border-gold/20 focus:border-gold outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-black text-white uppercase tracking-widest text-xs font-bold hover:bg-gold transition-colors"
          >
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-xs uppercase tracking-widest text-gray-400">Or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button 
          onClick={signInWithGoogle}
          className="w-full py-4 border border-gray-300 text-black uppercase tracking-widest text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
          <span>Google</span>
        </button>

        <p className="mt-8 text-center text-xs text-gray-500 font-light">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-gold font-bold hover:underline"
          >
            {isRegistering ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
