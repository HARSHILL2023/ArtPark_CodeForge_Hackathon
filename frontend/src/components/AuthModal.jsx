import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Chrome, BrainCircuit, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, redirectTo = '/dashboard' }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      if (email.includes('@')) {
        demoLogin();
        setIsLoading(false);
        onClose?.();
        onLoginSuccess?.();
        navigate(redirectTo);
      } else {
        setErrorMsg('Please enter a valid email address.');
        setIsLoading(false);
      }
    }, 400);
  };

  const handleGoogleLogin = () => {
    login();
  };

  const handleJudgeDemo = () => {
    demoLogin();
    onClose?.();
    onLoginSuccess?.();
    navigate(redirectTo);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0C0D0F]/80 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.97, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 12 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-sm bg-[#FCFBF8] dark:bg-[#121416] rounded-2xl shadow-md border border-[#DCD9D1] dark:border-[#292D33] overflow-hidden relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Authentication Modal"
              className="absolute top-3.5 right-3.5 p-1 rounded-md text-[#85827A] dark:text-[#7E7C77] hover:text-[#1B1B19] dark:hover:text-white hover:bg-[#EEECE6] dark:hover:bg-[#181B1F] transition-colors z-20 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6">
              {/* Header Icon */}
              <div className="flex justify-center mb-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#2563EB] dark:bg-[#3B82F6] flex items-center justify-center text-white shadow-xs">
                  <BrainCircuit className="w-4 h-4" />
                </div>
              </div>

              <div className="text-center mb-5">
                <h2 className="text-base font-bold text-[#1B1B19] dark:text-[#F2F0EA] tracking-tight">
                  {mode === 'login' ? 'Sign in to CodeForge' : 'Create an Account'}
                </h2>
                <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] mt-0.5">
                  Continue with your account to access your personalized career workspace.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-3.5 p-2.5 bg-[#B33A3A]/10 dark:bg-[#D96565]/10 border border-[#B33A3A]/20 dark:border-[#D96565]/25 rounded-lg text-xs text-[#B33A3A] dark:text-[#D96565] text-center font-medium">
                  {errorMsg}
                </div>
              )}

              {/* 1. Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2 px-3 bg-[#FCFBF8] dark:bg-[#181B1F] hover:bg-[#EEECE6] dark:hover:bg-[#1D2025] text-[#1B1B19] dark:text-[#F2F0EA] border border-[#DCD9D1] dark:border-[#292D33] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Chrome className="w-3.5 h-3.5 text-[#4285F4]" />
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-3.5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#DCD9D1] dark:border-[#292D33]" />
                </div>
                <span className="relative px-2 bg-[#FCFBF8] dark:bg-[#121416] text-[10px] uppercase font-semibold text-[#85827A] dark:text-[#7E7C77]">
                  or
                </span>
              </div>

              {/* 2. Email & Password Form */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-[10px] font-semibold text-[#5E5C56] dark:text-[#B4B1A9] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-[#85827A] dark:text-[#7E7C77] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full pl-8 pr-3 py-1.5 bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded-lg text-xs text-[#1B1B19] dark:text-[#F2F0EA] placeholder:text-[#85827A] dark:placeholder:text-[#7E7C77] focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#3B82F6]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-semibold text-[#5E5C56] dark:text-[#B4B1A9] mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-[#85827A] dark:text-[#7E7C77] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-8 pr-3 py-1.5 bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded-lg text-xs text-[#1B1B19] dark:text-[#F2F0EA] placeholder:text-[#85827A] dark:placeholder:text-[#7E7C77] focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#3B82F6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#5E5C56] dark:text-[#B4B1A9] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-[#85827A] dark:text-[#7E7C77] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-8 pr-3 py-1.5 bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded-lg text-xs text-[#1B1B19] dark:text-[#F2F0EA] placeholder:text-[#85827A] dark:placeholder:text-[#7E7C77] focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#3B82F6]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="cf-btn-primary w-full justify-center mt-2 py-2"
                >
                  <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Mode Toggle */}
              <div className="mt-3 text-center text-xs text-[#5E5C56] dark:text-[#B4B1A9]">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="font-semibold text-[#2563EB] dark:text-[#3B82F6] hover:underline"
                >
                  {mode === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </div>

              {/* 3. Judge Demo Sandbox Access */}
              <div className="mt-4 pt-3.5 border-t border-[#DCD9D1] dark:border-[#292D33] text-center">
                <button
                  type="button"
                  onClick={handleJudgeDemo}
                  className="cf-btn-secondary w-full justify-center py-2 text-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
                  <span>Judge Demo Sandbox Access</span>
                </button>
                <p className="text-[10px] text-[#85827A] dark:text-[#7E7C77] mt-1.5 font-normal">
                  Instant isolated sandbox session for hackathon evaluators
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
