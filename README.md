# Wedding Invitation: Ahsan & Shinta

A premium, dual-themed digital wedding invitation website built with React, Vite, and GSAP.

## ✨ Features

- **Dual Experience**: Two distinct themes and routes for different audiences:
  - `/a` - **Modern Dark Mode**: Sleek, cinematic experience with neutral tones.
  - `/s` - **Islamic/Cream Theme**: Elegant, traditional aesthetic with Arabic typography and ornaments.
- **GSAP Animations**: Fluid scrolling effects, revealing sections, and interactive elements using `useGSAP`.
- **Preloading Splash Screen**: Full-screen loader that preloads video assets and serves as an interaction gate for browser autoplay restrictions.
- **Guestbook (Wishes)**: Real-time guestbook powered by **Firebase Firestore**.
- **Responsive Media**: Optimized video backgrounds for both Desktop and Mobile.
- **Performance Optimized**: Fine-tuned asset preloading, lazy loading, and environment-driven asset management.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_ASSETS_BASE_URL=https://assets.yourhostname.com/
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

## 🏗️ Project Structure

```text
├── a/                 # Route A: Modern Dark Theme
│   ├── components/    # Specific components for Route A
│   ├── constants.ts   # Wedding details for Route A
│   └── types.ts       # Type definitions for Route A
├── s/                 # Route S: Islamic/Cream Theme
│   ├── components/    # Specific components for Route S
│   ├── constants.ts   # Wedding details for Route S
│   └── types.ts       # Type definitions for Route S
├── firebase.ts        # Firebase initialization
├── tailwind.config.js # Theming and styling configuration
└── vite.config.ts     # Multi-page/Multi-root Vite configuration
```

## 🛠️ Technology Stack

- **Framework**: [React](https://reactjs.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [GSAP](https://greensock.com/gsap/) & [@gsap/react](https://github.com/greensock/react)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Deployment**: Any static host (Firebase Hosting, Vercel, Netlify)

---
<div align="center">
  Built with ❤️ for Shinta & Ahsan
</div>
