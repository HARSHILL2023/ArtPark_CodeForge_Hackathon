import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import * as api from '../lib/api';

export default function MentorChat({ userData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm your AI Skill Mentor. ${
        userData?.role
          ? `I'm analyzing your pathway toward becoming a ${userData.role}.`
          : 'I can help you audit skill gaps, explain roadmap milestones, or prep for technical rounds.'
      } How can I assist you right now?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const quickPrompts = [
    'Explain my biggest skill gaps',
    'How should I prioritize milestone 1?',
    'Give me a mock interview question'
  ];

  const handleSend = async (userMsgText) => {
    const textToSend = userMsgText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMessage = { role: 'user', content: textToSend.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const data = await api.sendChatMessage(textToSend.trim(), userData);
      const botMessage = {
        role: 'assistant',
        content: data.reply || "I've analyzed your question against your active skill graph. Let's focus on closing critical prerequisite milestones."
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting to the mentor endpoint right now. Feel free to review the roadmap steps in your dashboard."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AI Mentor Chat' : 'Open AI Mentor Chat'}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl shadow-md flex items-center justify-center z-50 transition-colors cursor-pointer"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] max-h-[80vh] bg-white dark:bg-[#111418] rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden border border-[#E2E5E9] dark:border-[#252A31]"
          >
            {/* Header */}
            <div className="p-4 bg-[#F7F8FA] dark:bg-[#171A1F] border-b border-[#E2E5E9] dark:border-[#252A31] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-[#6366F1]/10 rounded-lg flex items-center justify-center text-[#6366F1]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#16181D] dark:text-[#F5F7FA]">AI Career Mentor</h3>
                  <span className="text-[10px] text-[#5F6672] dark:text-[#A7AFBA]">Context-Aware Guidance</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1 rounded-lg text-[#5F6672] dark:text-[#A7AFBA] hover:text-[#16181D] dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7F8FA] dark:bg-[#0B0D10] text-xs leading-relaxed">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-md bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-xl max-w-[84%] ${
                      msg.role === 'user'
                        ? 'bg-[#6366F1] text-white shadow-xs'
                        : 'bg-white dark:bg-[#111418] text-[#16181D] dark:text-[#F5F7FA] border border-[#E2E5E9] dark:border-[#252A31] shadow-xs'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-md bg-[#171A1F] text-[#A7AFBA] flex items-center justify-center flex-shrink-0">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-[#737C88] py-1">
                  <div className="w-6 h-6 rounded-md bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-2.5 py-1.5 bg-white dark:bg-[#111418] border border-[#E2E5E9] dark:border-[#252A31] rounded-lg text-[10px]">
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-white dark:bg-[#111418] border-t border-[#E2E5E9] dark:border-[#252A31] flex gap-1.5 overflow-x-auto">
                {quickPrompts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="px-2 py-1 rounded-md bg-[#F7F8FA] dark:bg-[#171A1F] text-[10px] font-medium text-[#5F6672] dark:text-[#A7AFBA] hover:text-[#16181D] dark:hover:text-white whitespace-nowrap border border-[#E2E5E9] dark:border-[#252A31] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-3 bg-white dark:bg-[#111418] border-t border-[#E2E5E9] dark:border-[#252A31] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask career guidance question..."
                className="flex-1 px-3 py-2 bg-[#F7F8FA] dark:bg-[#171A1F] border border-[#E2E5E9] dark:border-[#252A31] rounded-lg text-xs text-[#16181D] dark:text-[#F5F7FA] placeholder:text-[#8A919C] dark:placeholder:text-[#737C88] focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="p-2 bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer"
              >
                {isTyping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
