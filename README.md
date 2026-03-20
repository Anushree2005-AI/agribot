# 🌾 AgroBot — AI Farming Advisor

A purpose-built chatbot for Indian farmers, powered by Groq AI (Llama 3.3 70B).

## 🌐 Live Demo
[https://agribot-delta.vercel.app](https://agribot-delta.vercel.app)

## 💡 Why I Built This
I chose farming as the topic because I have hands-on experience building a crop prediction ML model using soil and weather data. AgroBot turns that domain knowledge into a conversational product — making agricultural expertise accessible to any farmer in plain language.

## 🤖 What It Does
- Recommends crops based on soil type and region
- Gives fertilizer advice with exact NPK ratios
- Helps diagnose and treat crop diseases and pests
- Guides farmers on irrigation and seasonal planning
- Focused specifically on Indian farming conditions

## 🛠 Tech Stack
- **Frontend**: Next.js 16, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Route
- **AI**: Groq API (Llama 3.3 70B) via AI SDK
- **Deployment**: Vercel

## 🧠 The AI Brain
The chatbot is trained via a detailed system prompt covering:
- Kharif, Rabi, and Zaid crop seasons
- 8 Indian soil types (black cotton, red, alluvial, sandy, laterite etc.)
- NPK fertilizer ratios per crop
- Common pests and diseases with treatments
- Regional farming knowledge across 28 Indian states

## ✨ Frontend Thinking
- **Landing page** with hero, features, and starter questions
- **Smooth page transitions** between landing and chat
- **Loading state**: animated bouncing dots with "AgroBot is thinking..."
- **Empty state**: welcoming prompt to ask first question
- **Dark/light mode** with system preference detection
- **Streaming responses** for real-time feel
- **Mobile responsive** throughout

## 🚀 Run Locally
git clone https://github.com/Anushree2005-AI/agribot.git
cd agribot
npm install
Add GROQ_API_KEY to .env.local
