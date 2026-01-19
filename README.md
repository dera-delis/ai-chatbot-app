# AI Chat Frontend

Minimal, premium-grade chat interface for an authenticated AI assistant. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Axios.

## Features
- JWT-based authentication flow
- Protected `/chat` route with conversation history
- Clean chat shell UI (sidebar + main panel)
- Optimistic messaging and typing indicator
- Subtle motion and calm, monochrome design

## Architecture
- `app/lib/api.ts`: Axios API client
- `app/lib/auth-context.tsx`: Auth state + login/signup/logout
- `app/lib/chat-context.tsx`: Chat state + history/send
- `app/components/`: UI building blocks
- `app/login`, `app/signup`, `app/chat`: routes

## Environment
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development
```
npm run dev
```

## Production
```
npm run build
npm run start
```

## Deployment
Deploy to Vercel with `NEXT_PUBLIC_API_URL` set to your API host.
