# Development Guide

## 🚀 Quick Start

The POC is now running at **http://localhost:3000**

## 📋 What's Included

### ✅ Completed Features (POC Week 1)

1. **Hero Section**
   - 3D AI orb with pulsing animation
   - Emissive glow effect
   - Smooth fade-in animations
   - Scroll indicator

2. **3D Scene**
   - React Three Fiber canvas
   - Camera parallax on mouse movement
   - Camera zoom on scroll
   - Optimized rendering with Suspense

3. **Scroll Story**
   - 3 narrative sections:
     - **The Challenge**: Problem statement
     - **Our Solution**: Product introduction
     - **Transform Your Workflow**: Benefits & CTA
   - Smooth scroll with Lenis
   - GSAP ScrollTrigger animations
   - Parallax gradient backgrounds

4. **Navigation**
   - Minimal navbar with logo
   - "Book a Demo" CTA button
   - Fixed positioning

5. **Interactions**
   - Mouse parallax on 3D camera
   - Hover effects on buttons
   - Scroll-triggered fade animations
   - Text gradient effects

6. **Performance**
   - Progress loader
   - Lazy loading with Suspense
   - Optimized bundle size
   - Smooth 60fps animations

## 🎨 Customization Guide

### 1. Update Brand Colors

**Logo Gradient** (`components/layout/Navbar.tsx`):
```tsx
// Change from indigo-purple to your brand colors
className="bg-gradient-to-r from-indigo-500 to-purple-600"
```

**AI Orb Colors** (`components/canvas/AIOrb.tsx`):
```tsx
<MeshDistortMaterial
  color="#6366f1"        // Main color
  emissive="#4f46e5"     // Glow color
  emissiveIntensity={0.5}
/>
```

**Section Gradients** (`components/dom/ScrollSections.tsx`):
```tsx
const sections = [
  { gradient: 'from-red-500/20 to-orange-500/20' },    // Problem
  { gradient: 'from-indigo-500/20 to-purple-500/20' }, // Solution
  { gradient: 'from-green-500/20 to-emerald-500/20' }, // Benefits
]
```

### 2. Update Content

**Hero Text** (`components/dom/HeroSection.tsx`):
```tsx
<h1>AI That Awakens Possibilities</h1>
<p>Experience the future of intelligent assistance...</p>
```

**Story Sections** (`components/dom/ScrollSections.tsx`):
```tsx
const sections = [
  {
    title: 'The Challenge',
    description: 'Your problem statement here...'
  },
  // ... add more sections
]
```

### 3. Add Real Logo

Replace placeholder logo in `components/layout/Navbar.tsx`:
```tsx
import Image from 'next/image';

<Image 
  src="/logo.svg" 
  alt="REAL" 
  width={120} 
  height={40}
/>
```

### 4. Add Custom 3D Models

1. Export model as `.glb` with Draco compression
2. Place in `/public/models/`
3. Load in component:

```tsx
import { useGLTF } from '@react-three/drei';

function CustomModel() {
  const { scene } = useGLTF('/models/your-model.glb');
  return <primitive object={scene} />;
}
```

## 🔧 Animation Tweaks

### Adjust Scroll Speed
**Lenis** (`utils/lenis-provider.tsx`):
```tsx
const lenis = new Lenis({
  duration: 1.2,  // Lower = faster, Higher = slower
  // ...
});
```

### Adjust Camera Movement
**CameraController** (`components/canvas/CameraController.tsx`):
```tsx
// Scroll zoom
gsap.to(camera.position, {
  z: 12,  // End position (higher = zoomed out)
  // ...
});

// Mouse parallax strength
x: x * 0.5,  // Increase for more movement
y: -y * 0.5,
```

### Orb Animation Speed
**AIOrb** (`components/canvas/AIOrb.tsx`):
```tsx
pulseRef.current += 0.02;  // Increase for faster pulse
```

## 📊 Performance Monitoring

### Check Bundle Size
```bash
npm run build
```

### Lighthouse Audit
1. Build production version: `npm run build && npm start`
2. Open Chrome DevTools
3. Run Lighthouse audit
4. Target: Performance > 90

### FPS Monitoring
```tsx
// Add to Scene.tsx
import { Perf } from 'r3f-perf';

<Perf position="top-left" />
```

## 🐛 Common Issues

### 3D Canvas Not Showing
- Check browser WebGL support
- Ensure `pointer-events-none` on Canvas
- Verify camera position

### Scroll Animations Janky
- Reduce ScrollTrigger scrub value
- Simplify GSAP timelines
- Check for layout shifts

### Performance Issues
- Reduce polygon count on 3D models
- Enable Draco compression
- Implement LOD (Level of Detail)

## 📦 Next Steps (Full Development)

1. **Milestone 2**: Add Phases 2-3
2. **Milestone 3**: Complete 5-phase journey + audio
3. **Milestone 4**: Strapi CMS integration
4. **Milestone 5**: SEO & accessibility
5. **Milestone 6**: Production deployment
6. **Milestone 7**: Real desktop integration
7. **Milestone 8**: Live chatbot

## 🔗 Useful Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [GSAP ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [Next.js Docs](https://nextjs.org/docs)

---

**Happy Coding! 🚀**

