import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Sparkles, Brain, Code, Zap } from 'lucide-react';

export default function MentorChat({ userData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hello! I'm your AI Skill Mentor. I see you're working towards becoming a " + (userData?.role || "developer") + ". How can I help you today?",
            type: 'greeting'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            let response = generateResponse(input, userData);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (text, data) => {
        const query = text.toLowerCase();

        if (query.includes('learn next') || query.includes('what next')) {
            const nextStep = data?.roadmap?.find(s => s.status === 'todo');
            return `Based on your analysis, you should focus on "${nextStep?.title}" next. It is marked as high priority to bridge your current gap in ${nextStep?.description.split(' ').slice(0, 3).join(' ')}...`;
        }

        if (query.includes('explain') || query.includes('what is')) {
            if (query.includes('react')) return "React is a JavaScript library for building user interfaces. Think of it as a way to create 'Lego blocks' (components) that automatically update when your data changes. 🏗️";
            if (query.includes('semantic')) return "Semantic matching means understanding the *meaning* behind words. Instead of just looking for the word 'Deep Learning', our AI knows that 'Neural Networks' is a related concept. 🧠";
            return "That's a great question! In the context of your roadmap, that skill is critical for achieving the role of " + data?.role + ". Would you like me to find a resource for it? 📚";
        }

        if (query.includes('readiness') || query.includes('score')) {
            return `Your current readiness score is ${data?.readinessScore}%. You've mastered ${data?.skills?.filter(s => s.yourLevel >= s.requiredLevel).length} skills so far. Keep pushing! 🚀`;
        }

        return "I'm here to help! You can ask me to explain a concept, find your next learning step, or check your readiness for " + data?.role + ".";
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-2xl shadow-2xl flex items-center justify-center z-[60] group border border-white/20"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-8 h-8" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            className="relative"
                        >
                            <MessageSquare className="w-8 h-8" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-indigo-600 animate-pulse" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-[60] flex flex-col overflow-hidden border border-slate-200/60 dark:border-slate-800/60"
                    >
                        {/* Header */}
                        <div className="p-6 bg-gradient-to-r from-indigo-600 to-violet-700 text-white relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Brain className="w-24 h-24" />
                            </div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                                    <Sparkles className="w-6 h-6 text-indigo-100" />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg">AI Skill Mentor</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100">Adaptive Intelligence Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 
                      ${msg.role === 'assistant' ? 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
                                        >
                                            {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                        </div>
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                      ${msg.role === 'assistant'
                                                ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none'
                                                : 'bg-indigo-600 text-white rounded-tr-none'}`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask your AI Mentor..."
                                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3.5 pr-12 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white transition-all shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="absolute right-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
