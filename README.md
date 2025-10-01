# REAL Platform - Interactive Web Experience

> An immersive, interactive 3D web platform showcasing AI capabilities through rich visual storytelling, dynamic scroll-based interactions, and engaging user experiences.

---

## 📁 Repository Structure

This is the **GitLab repository root** for the REAL Platform website.

```
website/                          # ← Git repository root
├── 📄 README.md                  # This file
├── 📚 docs/                      # Documentation
├── 🎨 app/                       # Next.js App Router
├── 🧩 components/               # React components
├── 🛠️ utils/                     # Utilities & providers
└── 📦 public/                    # Static assets
```

---

## 📚 Documentation

All project documentation is in the **[`docs/`](./docs/)** folder:

- **[📊 POC Summary](./docs/POC_SUMMARY.md)** - POC deliverables and status
- **[🛠️ Development Guide](./docs/DEVELOPMENT.md)** - How to customize
- **[🎮 Interactions Guide](./docs/INTERACTIONS_GUIDE.md)** - How features work
- **[🚨 Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues & fixes

## 🚀 Features

- **3D Interactive Visuals**: Built with React Three Fiber for stunning WebGL graphics
- **Smooth Scroll Animations**: GSAP ScrollTrigger integration for seamless scroll-driven experiences
- **Performance Optimized**: Targeting 60fps on modern devices with <3MB initial load
- **Responsive Design**: Mobile-first approach with touch interactions
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **3D Graphics**: React Three Fiber + Three.js + Drei
- **Animation**: GSAP + ScrollTrigger
- **Scroll Management**: Lenis
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: Zustand

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🏃 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
website/
├── app/                  # Next.js app router
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── canvas/          # 3D React Three Fiber components
│   │   ├── Scene.tsx
│   │   ├── AIOrb.tsx
│   │   └── CameraController.tsx
│   ├── dom/             # Regular React components
│   │   ├── HeroSection.tsx
│   │   ├── ScrollSections.tsx
│   │   └── Loader.tsx
│   └── layout/          # Layout components
│       └── Navbar.tsx
├── utils/               # Utilities and providers
│   └── lenis-provider.tsx
└── public/              # Static assets
    └── models/          # 3D model files (GLB/GLTF)
```

## 🎯 POC Features (Week 1)

- ✅ Hero section with 3D AI orb/core
- ✅ Pulsing animation with emissive materials
- ✅ Scroll-triggered story sections (Problem → Solution → Benefits)
- ✅ Smooth scroll with Lenis
- ✅ GSAP animations and camera movements
- ✅ Mouse parallax effects
- ✅ Responsive navbar with CTA
- ✅ Performance optimizations

## 🎨 Customization

### Changing Colors

Update the gradient colors in components to match your brand:
- `components/layout/Navbar.tsx` - Logo and CTA button
- `components/canvas/AIOrb.tsx` - Orb colors and emissive properties
- `components/dom/ScrollSections.tsx` - Section gradients

### Adding 3D Models

1. Place `.glb` files in `public/models/`
2. Import using React Three Fiber's `useGLTF` hook
3. Ensure Draco compression for optimal performance

### Content Updates

Edit placeholder content in:
- `components/dom/HeroSection.tsx` - Main hero text
- `components/dom/ScrollSections.tsx` - Story sections array

## ⚡ Performance Targets

- **60fps** on modern desktop devices
- **LCP < 2.5s** (Largest Contentful Paint)
- **Initial Load < 3-5MB**
- Smooth, jank-free scroll animations

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

```bash
npm run build
npm start
```

## 🐛 Known Issues & Todos

- [ ] Add Draco compression for 3D models
- [ ] Implement mobile-specific optimizations
- [ ] Add prefers-reduced-motion fallbacks
- [ ] Set up analytics (GA4)
- [ ] Add error boundary components

## 🤝 Contributing

This is a client project. Please follow the established code style and commit conventions.

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for REAL Platform**
