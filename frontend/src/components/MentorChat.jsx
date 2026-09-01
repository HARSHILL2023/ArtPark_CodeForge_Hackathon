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
    const updatedHistory = [...messages, userMessage];
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
        className="fixed bottom-6 right-6 w-11 h-11 bg-[#2563EB] dark:bg-[#3B82F6] hover:bg-[#1D4ED8] dark:hover:bg-[#60A5FA] text-white rounded-xl shadow-md flex items-center justify-center z-50 transition-colors cursor-pointer"
      >
        {isOpen ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[360px] h-[480px] max-h-[80vh] bg-[#FCFBF8] dark:bg-[#121416] rounded-2xl shadow-md z-50 flex flex-col overflow-hidden border border-[#DCD9D1] dark:border-[#292D33]"
          >
            {/* Header */}
            <div className="p-3.5 bg-[#EEECE6] dark:bg-[#181B1F] border-b border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-lg flex items-center justify-center text-[#2563EB] dark:text-[#3B82F6]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#1B1B19] dark:text-[#F2F0EA]">AI Career Mentor</h3>
                  <span className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">Context-Aware Guidance</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1 rounded-md text-[#85827A] dark:text-[#7E7C77] hover:text-[#1B1B19] dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-[#FCFBF8] dark:bg-[#0C0D0F] text-xs leading-relaxed">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-5 h-5 rounded-md bg-[#EEECE6] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`p-2.5 rounded-xl max-w-[85%] text-xs ${
                      msg.role === 'user'
                        ? 'bg-[#2563EB] dark:bg-[#3B82F6] text-white'
                        : 'bg-[#FCFBF8] dark:bg-[#181B1F] text-[#1B1B19] dark:text-[#F2F0EA] border border-[#DCD9D1] dark:border-[#292D33]'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-5 h-5 rounded-md bg-[#EEECE6] dark:bg-[#181B1F] text-[#85827A] dark:text-[#7E7C77] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-[#85827A] dark:text-[#7E7C77] py-0.5">
                  <div className="w-5 h-5 rounded-md bg-[#EEECE6] dark:bg-[#181B1F] text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="px-2 py-1 bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded-md text-[10px]">
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            {messages.length <= 2 && (
              <div className="px-3 py-1.5 bg-[#FCFBF8] dark:bg-[#121416] border-t border-[#DCD9D1] dark:border-[#292D33] flex gap-1.5 overflow-x-auto">
                {quickPrompts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="px-2 py-0.5 rounded-md bg-[#EEECE6] dark:bg-[#181B1F] text-[10px] font-medium text-[#5E5C56] dark:text-[#B4B1A9] hover:text-[#1B1B19] dark:hover:text-white whitespace-nowrap border border-[#DCD9D1] dark:border-[#292D33] transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-2.5 bg-[#FCFBF8] dark:bg-[#121416] border-t border-[#DCD9D1] dark:border-[#292D33] flex items-center gap-1.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask career guidance question..."
                className="flex-1 px-2.5 py-1.5 bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded-lg text-xs text-[#1B1B19] dark:text-[#F2F0EA] placeholder:text-[#85827A] dark:placeholder:text-[#7E7C77] focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#3B82F6]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="p-1.5 cf-btn-primary rounded-lg cursor-pointer"
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
