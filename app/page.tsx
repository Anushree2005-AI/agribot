'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';
import type { Transition } from 'framer-motion';
import {
  LazyMotion,
  domAnimation,
  m as motion,
  AnimatePresence,
} from 'framer-motion';

const spring: Transition = { type: 'spring', stiffness: 300, damping: 24, mass: 1.1 };
const springGentle: Transition = { type: 'spring', stiffness: 300, damping: 24, mass: 1.1 };
const easeOut = [0.165, 0.84, 0.44, 1] as const;
const easeCubic = [0.4, 0, 0.2, 1] as const;

const starterQuestions = [
  { icon: '🌱', text: 'Best crop for black cotton soil?', tag: 'Soil' },
  { icon: '🌾', text: 'Wheat fertilizer tips for Rabi season', tag: 'Fertilizer' },
  { icon: '🍚', text: 'How to deal with rice blast disease?', tag: 'Pest Control' },
  { icon: '💧', text: 'Water requirement for sugarcane?', tag: 'Irrigation' },
  { icon: '🌽', text: 'Which crops grow best in sandy soil?', tag: 'Soil' },
  { icon: '☀️', text: 'Best Kharif crops for Maharashtra?', tag: 'Seasonal' },
];

const stats = [
  { value: '50+', label: 'Crops Covered' },
  { value: '8', label: 'Soil Types' },
  { value: '28', label: 'Indian States' },
  { value: '3', label: 'Growing Seasons' },
];

const features = [
  { icon: '🌿', title: 'Crop Advisory', desc: 'Get personalized crop recommendations based on your soil and region' },
  { icon: '🧪', title: 'Soil Analysis', desc: 'Understand your soil type and what nutrients it needs' },
  { icon: '🐛', title: 'Pest Control', desc: 'Identify and treat diseases and pests affecting your crops' },
  { icon: '📅', title: 'Season Planning', desc: 'Know exactly when to plant, irrigate, and harvest' },
];

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'streaming' || status === 'submitted';
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('agro-dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved !== null ? saved === 'true' : prefersDark;
    setDarkMode(shouldBeDark);
    setIsMounted(true);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('agro-dark-mode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode, isMounted]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const enterChat = (question?: string) => {
    setShowLanding(false);
    setTimeout(() => {
      if (question) sendMessage({ text: question });
      else inputRef.current?.focus();
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');
    sendMessage({ text });
  };

  const getMessageText = (m: any) => {
    if (typeof m.content === 'string') return m.content;
    if (m.parts) return m.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('');
    return '';
  };

  const formatMessage = (text: string) =>
    text.split('\n').map((line, i, arr) => (
      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
    ));

  const dark = darkMode;

  return (
    <LazyMotion features={domAnimation}>
      <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-gray-950' : 'bg-stone-50'}`}>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          suppressHydrationWarning
          className="fixed top-5 right-5 z-50 p-2.5 rounded-2xl backdrop-blur-md border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={spring}
            className="w-7 h-7 flex items-center justify-center text-xl"
          >
            {isMounted ? (dark ? '🌙' : '☀️') : '☀️'}
          </motion.div>
        </button>

        <AnimatePresence mode="wait">

          {/* LANDING PAGE */}
          {showLanding && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.97 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="min-h-screen flex flex-col"
            >
              {/* Hero */}
              <div className="relative overflow-hidden flex-shrink-0">
                <div className={`absolute inset-0 ${dark
                  ? 'bg-[radial-gradient(ellipse_at_top_left,_#064e3b_0%,_#0f172a_40%,_#042f2e_100%)]'
                  : 'bg-[radial-gradient(ellipse_at_top_left,_#059669_0%,_#065f46_40%,_#0f766e_100%)]'
                }`} />

                <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
                <div className="absolute top-10 right-20 w-72 h-72 bg-teal-400/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-green-600/10 rounded-full blur-3xl" />

                {/* Floating emojis */}
                <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
                  {['🌾', '🌱', '🍃', '🌿', '🌻', '🌽', '🍅', '🥬'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-4xl opacity-10"
                      style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%` }}
                      animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 px-6 pt-20 pb-16 md:pt-28 md:pb-24 text-center max-w-5xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: easeOut }}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/25 text-emerald-200 text-xs font-bold px-5 py-2 rounded-full mb-6 tracking-widest uppercase shadow-lg"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    AI-Powered · India Focused · Free
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: easeOut }}
                    className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-2xl">
                      🌾 AgroBot
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-emerald-100/85 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light mb-10"
                  >
                    Your intelligent farming companion. Ask about{' '}
                    <span className="text-emerald-300 font-medium">crops</span>,{' '}
                    <span className="text-teal-300 font-medium">soil</span>,{' '}
                    <span className="text-cyan-300 font-medium">pests</span>, and{' '}
                    <span className="text-green-300 font-medium">seasons</span> — in plain language.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6, ease: easeOut }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
                  >
                    <motion.button
                      onClick={() => enterChat()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={spring}
                      className="px-10 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-2xl shadow-emerald-500/30 transition-all duration-300"
                    >
                      Start Chatting 🌱
                    </motion.button>
                    <motion.button
                      onClick={() => enterChat('What can AgroBot help me with?')}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      transition={spring}
                      className="px-10 py-4 rounded-2xl font-bold text-lg text-emerald-200 border-2 border-emerald-500/40 hover:border-emerald-400/70 hover:bg-white/5 backdrop-blur transition-all duration-300"
                    >
                      See What It Can Do →
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
                  >
                    {stats.map((s, i) => (
                      <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                        className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl py-4 px-3 text-center"
                      >
                        <div className="text-white font-black text-2xl md:text-3xl">{s.value}</div>
                        <div className="text-emerald-300/80 text-xs md:text-sm mt-1">{s.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Features */}
              <div className={`py-16 px-6 ${dark ? 'bg-gray-950' : 'bg-stone-50'}`}>
                <div className="max-w-5xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className={`text-3xl md:text-4xl font-black text-center mb-3 ${dark ? 'text-white' : 'text-gray-800'}`}
                  >
                    Everything a farmer needs 🌿
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className={`text-center mb-12 ${dark ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    Powered by advanced AI with deep knowledge of Indian agriculture
                  </motion.p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((f, i) => (
                      <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease: easeOut }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className={`p-6 rounded-3xl border transition-all duration-300 cursor-default
                          ${dark
                            ? 'bg-gray-900 border-gray-800 hover:border-emerald-800 hover:shadow-lg'
                            : 'bg-white border-gray-200 hover:border-emerald-300 hover:shadow-xl shadow-sm'
                          }`}
                      >
                        <div className="text-4xl mb-4">{f.icon}</div>
                        <h3 className={`font-bold text-lg mb-2 ${dark ? 'text-white' : 'text-gray-800'}`}>{f.title}</h3>
                        <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{f.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick start */}
              <div className={`py-16 px-6 ${dark ? 'bg-gray-900/50' : 'bg-emerald-50/50'}`}>
                <div className="max-w-5xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`text-3xl font-black text-center mb-10 ${dark ? 'text-white' : 'text-gray-800'}`}
                  >
                    Ask anything 🌾
                  </motion.h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {starterQuestions.map((q, i) => (
                      <motion.button
                        key={q.text}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5, ease: easeOut }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => enterChat(q.text)}
                        className={`flex flex-col gap-3 p-5 rounded-3xl border text-left transition-all duration-300 shadow-sm hover:shadow-xl
                          ${dark
                            ? 'bg-gray-800/80 border-gray-700 hover:border-emerald-600/50 hover:bg-gray-800'
                            : 'bg-white border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/30'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{q.icon}</span>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full
                            ${dark ? 'bg-emerald-900/60 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                            {q.tag}
                          </span>
                        </div>
                        <span className={`text-sm font-medium leading-snug ${dark ? 'text-gray-200' : 'text-gray-700'}`}>
                          {q.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-center mt-12"
                  >
                    <motion.button
                      onClick={() => enterChat()}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.97 }}
                      transition={spring}
                      className="px-14 py-5 rounded-2xl font-black text-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-2xl shadow-emerald-600/25 transition-all duration-300"
                    >
                      Launch AgroBot 🚀
                    </motion.button>
                    <p className={`mt-4 text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Free · No login required · Instant answers
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className={`py-8 px-6 border-t text-center ${dark ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-white'}`}>
                <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                  🌾 AgroBot · Built with AI for Indian farmers · Powered by Groq
                </p>
              </div>
            </motion.div>
          )}

          {/* CHAT PAGE */}
          {!showLanding && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="min-h-screen flex flex-col"
            >
              {/* Chat Header */}
              <div className="relative overflow-hidden flex-shrink-0">
                <div className={`absolute inset-0 ${dark
                  ? 'bg-gradient-to-br from-gray-950 via-emerald-950 to-teal-950'
                  : 'bg-gradient-to-br from-emerald-900 via-green-800 to-teal-800'
                }`} />
                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

                <div className="relative z-10 px-5 py-8 text-center backdrop-blur-xl bg-black/15 border-b border-white/10">
                  <motion.button
                    onClick={() => setShowLanding(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={spring}
                    className="absolute top-5 left-5 text-emerald-300/70 hover:text-emerald-200 text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    ← Back
                  </motion.button>

                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300"
                  >
                    🌾 AgroBot
                  </motion.h1>
                  <p className="text-emerald-200/70 text-sm mt-1">Your AI farming advisor</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-8 max-w-4xl mx-auto w-full">
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="text-6xl mb-4">🌿</div>
                    <p className={`text-lg font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                      What would you like to know?
                    </p>
                    <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Ask me about crops, soil, fertilizers, pests, or seasons
                    </p>
                  </motion.div>
                )}

                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                    className={`mb-6 flex items-end gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-xl shadow-lg flex-shrink-0 ring-2 ring-emerald-500/20 mb-1">
                        🌱
                      </div>
                    )}

                    <div className={`flex flex-col gap-1 max-w-[78%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <span className={`text-xs font-medium px-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {m.role === 'user' ? 'You' : 'AgroBot'}
                      </span>
                      <div className={`px-5 py-4 rounded-3xl text-[15px] leading-relaxed shadow-lg backdrop-blur-sm border whitespace-pre-wrap break-words
                        ${m.role === 'user'
                          ? 'bg-gradient-to-br from-emerald-700 to-teal-800 text-white rounded-br-lg border-emerald-600/30'
                          : dark
                            ? 'bg-gray-800/90 border-gray-700/60 text-gray-100 rounded-bl-lg'
                            : 'bg-white/95 border-gray-200/70 text-gray-800 rounded-bl-lg shadow-md'
                        }`}
                      >
                        {formatMessage(getMessageText(m))}
                      </div>
                    </div>

                    {m.role === 'user' && (
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-lg flex-shrink-0 mb-1 ${dark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        👨‍🌾
                      </div>
                    )}
                  </motion.div>
                ))}

                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: easeOut }}
                      className="flex items-end gap-3 mb-6"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-xl shadow-lg flex-shrink-0 relative ring-2 ring-emerald-500/20 mb-1">
                        🌱
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-emerald-400/50"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={`text-xs font-medium px-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>AgroBot</span>
                        <div className={`backdrop-blur-lg border shadow-lg px-6 py-4 rounded-3xl rounded-bl-lg
                          ${dark ? 'bg-gray-800/90 border-gray-700/60' : 'bg-white/95 border-gray-200/70'}`}>
                          <div className="flex items-center gap-3">
                            <div className="flex gap-2">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-2.5 h-2.5 bg-emerald-500 rounded-full"
                                  animate={{ y: ['0%', '-60%', '0%'], scale: [1, 0.7, 1] }}
                                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: easeCubic }}
                                />
                              ))}
                            </div>
                            <span className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-500'}`}>
                              AgroBot is thinking...
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className={`border-t sticky bottom-0 z-20 backdrop-blur-2xl transition-colors duration-300
                ${dark ? 'border-gray-800 bg-gray-950/90' : 'border-gray-200 bg-white/90'}`}>
                <div className="max-w-4xl mx-auto px-4 py-4">
                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about crops, soil, pests, seasons..."
                      disabled={isLoading}
                      className={`flex-1 border rounded-2xl px-5 py-3.5 text-base placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300
                        ${dark
                          ? 'bg-gray-800/80 border-gray-700 text-white focus:border-emerald-500 focus:ring-emerald-500/20'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-200/50 shadow-sm'
                        }`}
                    />
                    <motion.button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={spring}
                      className="px-6 py-3.5 rounded-2xl font-bold text-white shadow-lg disabled:opacity-50 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 flex items-center gap-2 transition-all duration-300"
                    >
                      Send 🌿
                    </motion.button>
                  </form>
                  <p className={`text-center text-xs mt-2 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
                    Specialized for Indian farming · Powered by Groq AI
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
