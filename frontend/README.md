# 🌊 Safe-Flow: AI-Powered Eco-Friendly Urban Mobility & Smart Traffic Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.0-lightgrey?logo=express)](https://expressjs.com/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Realtime-blue?logo=websocket)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Safe-Flow** is a next-generation, AI-driven urban mobility platform designed to alleviate city traffic congestion, preempt emergency response delays, optimize zero-emission multimodal transit, and quantify carbon offsets in real time.

---

## 📸 Platform Highlights & Vision

- 🚦 **Real-Time Congestion & Heatmaps**: Instant IoT sensor updates and live visual congestion metrics per city zone.
- 🔮 **AI Predictive Congestion Forecasting**: 1-hour, 3-hour, and 6-hour predictive traffic modeling based on historical time-series analytics.
- 🚨 **Emergency Green Wave Preemption**: Priority signal synchronization and emergency corridor allocation for ambulances, fire engines, and police.
- 🌿 **Emissions Tracking & Carbon Offset Engine**: Precise CO₂, NOx, and PM2.5 monitoring paired with a gamified carbon credit leaderboard.
- 🚆 **Multimodal Zero-Emission Routing**: Integrated route optimizer combining EV transit, metro networks, e-scooters, and dedicated green walkways.
- 🔐 **Dual Authentication System**: Support for both Firebase Auth (Google, GitHub, Email) and local JWT security.

---

## ⚡ Frontend Setup Guide

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the live app console.

---

## 🔑 Environment Variables (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_AUTH_MODE=local # 'local' or 'firebase'
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
