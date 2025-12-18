# Event Booking Platform - Frontend

A production-ready React 19 application built with TypeScript for seamless event discovery, real-time seat selection, and secure ticket booking across all devices.

## 🚀 Core Features

- **Real-time Seat Maps** - Live availability updates via Socket.IO with instant booking conflict resolution
- **Advanced Animations** - Framer Motion-powered scroll-triggered effects including zig-zag card layouts and floating UI elements
- **Smart Authentication** - JWT tokens with automatic refresh, role-based routing, and secure session persistence
- **Admin Power Tools** - Complete event CRUD operations, analytics dashboard, and bulk management capabilities
- **Performance-First** - Vite-powered builds with code-splitting, lazy loading, and optimized bundle sizes under 200KB gzipped

## 🛠️ Quick Start

### Prerequisites
- Node.js ≥18.x
- Backend API (GravitInfo_server) running on port 5000

### Clone & Install
```bash
git clone <repo-url>
cd Frontend
npm install
```

### Environment Setup
Copy `.env.example` to `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### Development
```bash
npm run dev
```
→ Opens at `http://localhost:5173` with HMR

## 📁 Clean Architecture

```
src/
├── api/            # Axios client w/ auth interceptors
├── components/     # Atomic design: Hero, EventCard, BookingForm
├── contexts/       # AuthContext for global state
├── hooks/          # useSocket, useAuth, custom animations
├── pages/          # Smart pages: EventsList, AdminEvents
├── types/          # Event, User, Booking TypeScript definitions
├── lib/            # Animation utils & validation schemas
└── App.tsx         # Router + global providers
```
Follows scalable folder-by-feature structure[3][4]

## ⚡ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.2.0 |
| Language | TypeScript | 5.9.3 |
| Bundler | Vite | 7.2.4 |
| Styling | TailwindCSS | 4.1.17 |
| Animation | Framer Motion | 12.23.26 |
| Routing | React Router | 7.6.2 |
| Real-time | Socket.IO Client | 4.8.1 |
| HTTP | Axios | 1.7.9 |
| Icons | Lucide React | 0.560.0 |

## 🌐 Key Routes

**Public:**
- `/` → Hero + featured events
- `/events` → Filterable event grid
- `/events/:id` → Interactive seat map + booking

**User:**
- `/dashboard` → Booking history + upcoming events
- `/booking-success/:id` → Receipt + calendar add

**Admin (`/admin/`):**
- `events` → List + analytics
- `events/new` → Event creator
- `events/:id/edit` → Live editor

## 🔌 Real-time Magic

Socket.IO handles:
- **Seat locking** - Prevents double bookings
- **Price updates** - Dynamic pricing changes
- **Status alerts** - Event sold out/canceled notifications
- **Live counters** - Remaining tickets displa

## 🚀 Production Deployment

### Vercel (One-click)
```bash
npm i -g vercel
vercel --prod
```
Auto-deploys from `dist/`, sets env vars via dashboard.

### Environment Variables Required
| Variable | Purpose | Production Example |
|----------|---------|-------------------|
| `VITE_API_BASE_URL` | REST API endpoint | `https://api.gravitinfo.com/api` |
| `VITE_SOCKET_URL` | WebSocket server | `https://api.gravitinfo.com` |

## 🧪 Development Scripts

```bash
npm run dev      # → localhost:5173 (HMR)
npm run build    # → dist/ (production)
npm run preview  # → localhost:4173 (built preview)
npm run lint     # → ESLint + Prettier
npm run type-check # → Strict TS validation
```

## 🔧 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| `CORS error` | Backend CORS allows `http://localhost:5173` |
| `Socket fails` | Match `VITE_SOCKET_URL` exactly |
| `Token expired` | Auto-refresh handles; clear localStorage if stuck |
| `Build fails` | `rm -rf node_modules/.vite && npm run build` |
| `Port conflict` | Vite auto-increments: `:5174`, `:5175`, etc. |

## 🎨 Custom Animations Showcase

Features scroll-triggered effects:
- **Zig-zag team cards** - Straight → wavy → realig
- **Shooting stars** - Subtle cosmic background
- **Dots flood** - Floating particle system
- **Curvy ribbons** - Diagonal sweep animation

## 📱 Responsive Breakpoints

```
Tailwind Config:
sm: 640px    → Mobile portrait
md: 768px    → Tablet
lg: 1024px   → Laptop
xl: 1280px   → Desktop
2xl: 1536px  → Wide screens
```

## 🔐 Security Checklist

- ✅ JWT tokens never stored in cookies
- ✅ HTTPS-only in production
- ✅ Input sanitization + Zod validation
- ✅ Rate limiting on auth endpoints (backend)
- ✅ No `.env` in git (`.gitignore`)

## 🤝 Contribution Flow

1. `git checkout -b feature/amazing-thing`
2. Implement + `npm run type-check && npm run lint`
3. `git commit -m "feat: add amazing thing (#123)"`
4. Push + PR → Auto-tested by GitHub Actions

## 📄 License & Support

**© 2025 Gravit InfoSystem** - All rights reserved.

**Need help?**
- 🐛 Bugs → GitHub Issues
- 💬 Questions → Backend API docs
- 🚀 Features → Discuss first!

## 🔗 Related Projects

- [Backend Server](../GravitInfo_server/README.md)
- [API Reference](../GravitInfo_server/API_DOCUMENTATION.md)
- [Monorepo Root](../README.md)
