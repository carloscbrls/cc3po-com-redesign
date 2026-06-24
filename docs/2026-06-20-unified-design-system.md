# CC3PO Unified Design System Specification

## 1. COLOR PALETTE (Single Brand — Non-Negotiable)

### Primary Brand Colors
```
--accent: #e8506b           /* CC3PO Pink — primary brand accent */
--accent-hover: #f0617a     /* Lighter pink for hover states */
--accent-dark: #b82d45      /* Darker pink for buttons/CTAs */
--accent-glow: rgba(233,69,96,0.35)  /* Glow effect */
```

### Background Colors  
```
--bg-primary: #0a0a12       /* Main dark background */
--bg-secondary: #11111f     /* Secondary section background */
--bg-card: rgba(255,255,255,0.04)  /* Card backgrounds */
```

### Text Colors
```
--text-primary: #ffffff
--text-secondary: rgba(255,255,255,0.85)
--text-muted: rgba(255,255,255,0.78)
```

### Border Colors
```
--border: rgba(255,255,255,0.06)
--border-hover: rgba(233,69,96,0.25)
```

### Semantic Colors (For status indicators only — NOT brand colors)
```
--success: #00e676          /* Green — only for positive states */
--warning: #ffd700           /* Yellow — only for warnings */
--blue: #4fc3f7             /* Blue — only for info/secondary accents */
--red: #ff5252              /* Red — only for errors/critical */
```

### FORBIDDEN on product pages:
```
NO #2563eb (blue Shield)       → Replace with --accent
NO #7c3aed (purple Fortress)    → Replace with --accent  
NO #f59e0b (amber Citadel)      → Replace with --accent
NO #db2777 (pink2 AI Voice)     → Replace with --accent
NO #ff4757 (red Legal Check)    → Replace with --accent
```

## 2. TYPOGRAPHY SCALE

```
--font: 'Inter', -apple-system, system-ui, sans-serif
--font-mono: 'JetBrains Mono', mono

--text-caption: 13px
--text-body: 15px
--text-base: 16px
--text-lg: 18px
--text-xl: 20px
--text-2xl: 24px
--text-3xl: 28px
--text-4xl: 36px
--text-5xl: 48px
--text-6xl: 72px
```

### Hero Title (ALL pages — unified)
```
font-size: clamp(var(--text-4xl), 6vw, var(--text-6xl))
font-weight: 800
letter-spacing: -2px
line-height: 1.1
```

### Section Title (ALL pages — unified)
```
font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl))
font-weight: 800
letter-spacing: -1.5px
line-height: 1.1
```

## 3. SPACING SCALE

```
--space-2xs: 4px
--space-xs: 8px
--space-sm: 12px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
--space-4xl: 96px
```

NO px values in page files. ALL spacing uses --space-* variables.

## 4. BUTTON SYSTEM

### Primary CTA
```
class="btn btn-primary btn-glow"
background: var(--accent-dark)
hover: var(--accent)
box-shadow glow animation
```

### Secondary (Outline)
```
class="btn btn-secondary"
background: rgba(255,255,255,0.06)
border: 1px solid var(--border)
```

### CTA Copy Rules
Use one of these unified CTAs:
- "Get Your Free Scan" — primary scan CTA
- "Start Free Trial" — product signup
- "Get Compliant →" — compliance CTA
- "Contact Us" — contact page
- "View All →" — list expansion

NO competing CTA voices. No "Subscribe →" alongside "Buy Now" alongside "Get a Demo".

## 5. HERO SYSTEM (Single Architecture)

ALL heroes use this structure:

```
<section class="hero">
  [optional: <video class="hero-video"> or <canvas id="hero-canvas">]
  <div class="hero-content">
    <div class="hero-badge reveal">
      <span class="pulse-dot"></span>
      [Eyebrow label]
    </div>
    <h1 class="hero-title reveal">
      [Main headline]
    </h1>
    <p class="hero-sub reveal">
      [Supporting copy — max 2 sentences]
    </p>
    <div class="hero-buttons reveal">
      <a href="[primary-url]" class="btn btn-primary btn-glow">Primary CTA</a>
      <a href="[secondary-url]" class="btn btn-secondary">Secondary CTA</a>
    </div>
  </div>
</section>
```

NO padding-only heroes. NO 70vh heroes. NO custom inline hero styles.

## 6. SECTION PATTERN

ALL content sections use:
```
<section class="section">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Label</div>
      <h2 class="section-title">Title</h2>
      <p class="section-desc">Description</p>
    </div>
    [section-specific content]
  </div>
</section>
```

## 7. FOOTER (Single component — SiteFooter.astro, no deviation)

## 8. TRUST BAR (Add to ALL product pages)
```
<section class="trust-bar" style="background: var(--bg-secondary); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 16px 0;">
  <div class="container" style="display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; text-align: center;">
    <!-- Trust badges: CA Certified, Latino-Owned, Spanish, SB/DVBE -->
  </div>
</section>
```

## 9. ICON RULES
- NO emoji as UI icons (🔍🚨📊⚖️🛠️📋👤🏢📜⚡)
- Use SVG icons in `public/images/icons/` directory
- Icon size: 40x40px for feature cards, 24x24px for inline

## 10. ACCESSIBILITY — maintain skip-link, focus-visible, reduced-motion, 44px touch targets
