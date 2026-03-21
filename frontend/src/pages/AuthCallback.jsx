import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      try {
        // Decode token to get user info (payload is 2nd part of JWT)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        const user = {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          avatar: payload.avatar,
          role: payload.role || 'user'
        };

        // Call the auth context login function to set global user state
        login({ token, user });
        processed.current = true;

        // Navigate to dashboard AFTER state is set
        // Use a tiny delay to ensure state propagates in high-latency React trees
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 100);

      } catch (err) {
        console.error('Token decode failed:', err);
        navigate('/?error=auth_failed', { replace: true });
      }
    } else {
      // No token in URL — something went wrong on backend
      navigate('/?error=no_token', { replace: true });
    }
  }, [login, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#07080f] text-white">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0] 
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="p-6 bg-indigo-600 rounded-3xl mb-6 shadow-2xl shadow-indigo-500/40"
      >
        <Brain className="w-12 h-12 text-white" />
      </motion.div>
      <h2 className="text-2xl font-black mb-2 tracking-tight">Authenticating...</h2>
      <p className="text-slate-400 font-medium">Preparing your AI-Adaptive Dashboard</p>
    </div>
  );
}
