# 💬 **AI Chat Frontend**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![Status](https://img.shields.io/badge/Status-Live%20Production-brightgreen)](https://ai-chatbot-app-three.vercel.app/)
[![Live App](https://img.shields.io/badge/Live%20App-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-chatbot-app-three.vercel.app/)

A calm, premium chat interface that consumes the **AI Chatbot API**. Built to feel like a modern 2025/2026 product—clean, focused, and fast.

> ✨ **Minimal UI** · 🧠 **Conversation Memory** · 🔐 **JWT Auth** · 🎞️ **Subtle Motion**

**Live App:**  
[![Open App](https://img.shields.io/badge/Open%20App-Live%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-chatbot-app-three.vercel.app/)

**API:**  
[![Open API](https://img.shields.io/badge/Open%20API-Northflank-1f9d6a?style=for-the-badge)](https://p01--ai-chatbot-api--zn54zt65xhrv.code.run)

---

## 📌 **Table of Contents**
- [✨ Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [🎨 Design System](#-design-system)
- [✅ Features](#-features)
- [⚙️ Environment](#️-environment)
- [🚀 Development](#-development)
- [📦 Production](#-production)
- [🚀 Deployment](#-deployment)

---

## ✨ **Overview**
This frontend delivers a premium AI chat experience: sidebar navigation, history-aware sessions, and a focused chat surface. Designed for clarity, not clutter.

---

## 🏗️ **Architecture**
- `app/lib/api.ts`: Axios API client
- `app/lib/auth-context.tsx`: Auth state + login/signup/logout
- `app/lib/chat-context.tsx`: Chat state + history/send
- `app/components/`: Chat shell UI components
- `app/login`, `app/signup`, `app/chat`: App Router pages

---

## 🎨 **Design System**
- Monochrome base with soft accents
- Spacious typography and rhythm
- Subtle motion (Framer Motion)
- WhatsApp-style emoji picker

---

## ✅ **Features**
- JWT-based authentication flow
- Protected `/chat` route with conversation history
- Pinned sidebar with new chat + logout
- Optimistic message rendering + typing indicator
- ChatGPT-like scroll-to-bottom behavior

---

## ⚙️ **Environment**
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🚀 **Development**
```bash
npm run dev
```

---

## 📦 **Production**
```bash
npm run build
npm run start
```

---

## 🚀 **Deployment**
Deploy to Vercel with `NEXT_PUBLIC_API_URL` set to your API host.
