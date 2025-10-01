# Troubleshooting Guide

## Common Issues & Solutions

### 1. ✅ Internal Server Error (FIXED)

**Problem**: "Internal Server Error" when accessing localhost:3000

**Symptoms**:
- Browser shows "Internal Server Error"
- Console shows ENOENT errors for `_buildManifest.js.tmp.*` files
- Multiple file not found errors in terminal

**Root Cause**: 
- Next.js 15 with Turbopack can have build cache corruption issues
- Turbopack is experimental and may cause instability

**Solution** (ALREADY APPLIED):
```bash
# 1. Remove corrupted cache
rm -rf .next

# 2. Restart without Turbopack (now default)
npm run dev
```

**Changes Made**:
- Removed `--turbopack` flag from package.json scripts
- Using standard Next.js webpack compiler (more stable)

---

### 2. Lenis TypeScript Errors

**Problem**: Build fails with TypeScript errors about Lenis options

**Symptoms**:
```
Type error: Object literal may only specify known properties, 
and 'smooth' does not exist in type 'LenisOptions'
```

**Solution** (ALREADY FIXED):
Simplified Lenis configuration to use only valid options:

```tsx
// ❌ Before (incorrect)
new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,        // Invalid
  smoothTouch: false,  // Invalid
});

// ✅ After (correct)
new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

---

### 3. 3D Canvas Not Showing

**Problem**: Black screen or no 3D content visible

**Possible Causes & Solutions**:

1. **WebGL not supported**
   - Test: Visit https://get.webgl.org/
   - Solution: Update browser or use Chrome/Firefox

2. **Camera position issue**
   - Check camera is not inside objects
   - Default position: `[0, 0, 8]`

3. **Canvas pointer events**
   - Ensure canvas has `pointer-events-none` class
   - Check z-index layering

---

### 4. Scroll Animations Not Working

**Problem**: No scroll animations or jerky scrolling

**Solutions**:

1. **Check Lenis initialization**
   ```bash
   # In browser console, check for errors
   # Look for Lenis initialization messages
   ```

2. **Hard refresh**
   - Mac: `Cmd + Shift + R`
   - Windows/Linux: `Ctrl + Shift + F5`

3. **Clear browser cache**
   - DevTools → Application → Clear Storage

---

### 5. Performance Issues / Low FPS

**Problem**: Choppy animations or low frame rate

**Solutions**:

1. **Check GPU usage**
   - Chrome DevTools → Performance → Record
   - Look for GPU bottlenecks

2. **Reduce polygon count**
   - Use simpler 3D models
   - Implement LOD (Level of Detail)

3. **Optimize materials**
   - Reduce texture sizes
   - Use compressed formats

4. **Close other tabs**
   - Free up GPU/CPU resources

---

### 6. Build Fails

**Problem**: `npm run build` fails with errors

**Solutions**:

1. **Clear cache and reinstall**
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Check TypeScript errors**
   ```bash
   npm run type-check
   ```

3. **Check for linter issues**
   ```bash
   npm run lint
   ```

---

### 7. Mouse Parallax Not Working

**Problem**: Camera doesn't follow mouse movement

**Check**:

1. **Event listener attached**
   - Should initialize in `CameraController.tsx`
   - Check browser console for errors

2. **GSAP loaded**
   - Verify GSAP is in dependencies
   - Check network tab for script loading

3. **Camera permissions**
   - Ensure camera updates are not blocked

---

### 8. Module Not Found Errors

**Problem**: `Cannot find module '@/...'` errors

**Solution**:
```bash
# Check tsconfig.json has correct paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

# Restart dev server
npm run dev
```

---

## Quick Fixes Checklist

When something goes wrong, try these in order:

- [ ] Hard refresh browser (`Cmd/Ctrl + Shift + R`)
- [ ] Clear `.next` folder: `rm -rf .next`
- [ ] Restart dev server
- [ ] Clear browser cache
- [ ] Check browser console for errors
- [ ] Reinstall dependencies: `rm -rf node_modules && npm install`
- [ ] Check Node version (requires 18+): `node -v`

---

## Getting Help

1. **Check browser console** - Most errors show here first
2. **Check terminal output** - Build errors appear here
3. **Review documentation** - See README.md and DEVELOPMENT.md
4. **Check Git history** - What changed recently?

---

## Current Status: ✅ ALL WORKING

- ✅ Server running on http://localhost:3000
- ✅ Build process successful
- ✅ TypeScript errors resolved
- ✅ Turbopack issues fixed
- ✅ All animations working

---

**Last Updated**: After fixing Turbopack and Lenis issues

