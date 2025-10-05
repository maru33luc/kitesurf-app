# 🏄 Kitesurf App - Modern Design System

## 🎨 Visual Identity

### Color Palette
- **Ocean Blue**: `#12C2E9` → `#0EA5E9` (Primary gradient)
- **Sunset**: `#FF7E5F` → `#FF3D81` → `#7F5AF0` (Hero gradient)
- **Seafoam Accent**: `#34D399`
- **Deep Ink**: `#0B1020` (Background)

### Gradients
```css
--grad-sunset: linear-gradient(135deg, #FF7E5F 0%, #FF3D81 50%, #7F5AF0 100%);
--grad-ocean: linear-gradient(145deg, #12C2E9 0%, #0EA5E9 100%);
--grad-accent: linear-gradient(120deg, #34D399 0%, #12C2E9 100%);
```

### Typography
- **Headings**: Montserrat, 700-800 weight, tight letter-spacing
- **Body**: Inter, 400-500 weight
- **Responsive scaling**: clamp() for fluid typography

### Elevation & Shadows
- **Card Shadow**: `0 10px 30px rgba(18, 194, 233, 0.15)`
- **Glow Effect**: `0 10px 40px rgba(127, 90, 240, 0.3)`
- **Float Shadow**: `0 20px 50px rgba(127, 90, 240, 0.2)`

### Border Radius
- **XL**: 24px (cards, pricing)
- **LG**: 16px (testimonials)
- **MD**: 12px (inputs, menus)
- **Pills**: 999px (buttons, CTAs)

---

## 🖼️ Landing Page Sections

### 1. Hero Section
**Style**: Full-screen cinematic hero with parallax background
- **Background**: Windsurf/kitesurf image with gradient overlays
- **Effects**:
  - Animated gradient overlay (8s shift)
  - Light flare animation (12s move)
  - Fixed background attachment for parallax
- **Title**: Gradient text with glow shadow
- **CTAs**: 
  - Primary: Ocean gradient with glow
  - Secondary: Glass-morphism with border

### 2. Features Section
**Style**: Dark background with glass cards
- **Cards**: 
  - Glass-morphism (backdrop-blur)
  - Gradient top border on hover
  - Gradient icon with drop-shadow
  - Lift animation on hover (-8px)

### 3. Levels Section
**Style**: Radial gradient background
- **Cards**:
  - Glass panels with gradient accent bar
  - Gradient headings (seafoam → ocean)
  - Scale + lift on hover
  - Animated gradient bar reveal

### 4. Testimonials Section
**Style**: Gradient background with quote decoration
- **Cards**:
  - Large decorative quote mark
  - Glass-morphism
  - Gradient author name
  - Lift on hover

### 5. Pricing Section
**Style**: Radial gradient from bottom
- **Cards**:
  - Glass panels with gradient top border
  - Gradient price display
  - Highlight card: pre-scaled + violet tint
  - Full-width gradient CTA buttons

### 6. Footer
**Style**: Deep gradient with subtle top border
- Gradient brand text
- Hover slide animation on links
- Centered copyright with divider

---

## ✨ Micro-Interactions

### Button Hover
- **Lift**: `translateY(-3px)`
- **Shadow**: Intensifies
- **Duration**: 300ms
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)`

### Card Hover
- **Lift**: `translateY(-8px)`
- **Scale**: `1.02` (levels) or `1.05` (pricing)
- **Border**: Gradient color intensifies
- **Shadow**: Glow effect appears

### Animations
- **Hero fade-in**: Scale + opacity (1.2s)
- **Title slide-up**: Staggered (0.2s, 0.4s, 0.6s)
- **Gradient shift**: Infinite alternate (8s)
- **Light flare**: Infinite loop (12s)

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
  - Single column layouts
  - Full-width CTAs
  - Reduced padding
  - Scroll background attachment

### Mobile Optimizations
- Hero: `background-attachment: scroll`
- Cards: `grid-template-columns: 1fr`
- Buttons: `width: 100%`
- Padding: Reduced to `3rem 1.5rem`

---

## 🎭 Dark Mode Support
Already implemented via `[data-theme="dark"]` attribute controlled by `ThemeService`.

---

## 🚀 Performance
- **Reduced motion**: Respects `prefers-reduced-motion`
- **GPU acceleration**: `transform` and `opacity` only
- **Smooth scrolling**: `scroll-behavior: smooth`
- **Optimized animations**: Hardware-accelerated properties

---

## 📦 Implementation Files
- **Global tokens**: `src/styles.css`
- **Landing styles**: `src/app/pages/landing/landing.css`
- **Landing template**: `src/app/pages/landing/landing.html`
- **Theme service**: `src/app/core/theme.service.ts`

---

## 🎯 Next Steps
1. Add scroll-triggered animations (Intersection Observer)
2. Implement booking widget glass panel
3. Add parallax layers for depth
4. Create reusable UI components library
5. Add loading skeletons with shimmer effect
6. Implement toast notifications with gradient accents
