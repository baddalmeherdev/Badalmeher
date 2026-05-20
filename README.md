Badal Meher Portfolio
Premium Personal Brand Website
A production-ready, ultra-premium personal portfolio and brand website built for Badal Meher — Tech
Entrepreneur, Startup Founder & Digital Creator.
Design Philosophy
• Theme: Deep Blue + Electric Blue gradients
• Style: Dark mode premium glassmorphism
• Inspiration: Apple, Stripe, Notion, Linear, Vercel, Tesla-level UI
• Feel: Luxury personal brand + futuristic startup founder portfolio
Project Structure
badal-meher-portfolio/
├── index.html # Main HTML file (SEO optimized, structured data)
├── css/
│ └── style.css # Complete stylesheet (glassmorphism, animations)
├── js/
│ └── main.js # Core functionality (particles, typing, gallery, form)
├── assets/
│ ├── images/ # Image assets (replace with your own)
│ ├── favicon.svg # Favicon (create your own)
│ ├── apple-touch-icon.png
│ └── site.webmanifest # PWA manifest
├── robots.txt # Search engine directives
├── sitemap.xml # SEO sitemap
└── README.md # This file
Features
Hero Section
• Full-screen premium hero with animated particles
• Typing text effect with rotating phrases
• Animated statistics counters
• Floating decorative elements
• Scroll indicator
About Section
• Professional introduction cards (Story, Vision, Mission)
• Technical expertise skill tags
• Entrepreneur mindset section with orbit animation
• Glassmorphism card design with hover effects
Image Gallery
• Premium image slider/carousel with autoplay
• Touch/swipe support for mobile
• Keyboard navigation (arrow keys)
• Hover zoom effects
• Glassmorphism overlays
Social Media Hub
• 9 branded social media cards (YouTube, Instagram, Facebook, LinkedIn, GitHub, X/Twitter, Tele-
gram, WhatsApp, Email)
• Hover animations with brand colors
• External link safety (noopener noreferrer)
• Glow effects on interaction
Contact Section
• Secure contact form with validation
• Real-time field validation
• Character counter
• Honeypot spam protection
• Success/error status messages
• Loading states
Premium UI/UX
• Custom cursor with trail (desktop)
• Scroll progress bar
• Smooth scrolling navigation
• Floating sticky navbar
• Reveal animations on scroll
• Loading screen with progress bar
• Back to top button
• Mobile-first responsive design
SEO & Performance
• Comprehensive meta tags
• Open Graph / Twitter Cards
• Schema.org structured data (Person + WebSite)
• Semantic HTML5
• Lazy loading images
• Optimized fonts (preconnect)
• Lighthouse optimized
• Accessibility compliant (WCAG)
Security
• Content Security Policy (CSP) meta tag
• XSS prevention (input sanitization)
• No eval() or unsafe scripts
• Honeypot field for bot protection
• Secure external links
• Input validation & sanitization
Deployment Guide
Option 1: Vercel (Recommended for Next.js/React)
1. Install Vercel CLI: npm i -g vercel
2. Navigate to project folder: cd badal-meher-portfolio
3. Deploy: vercel --prod
4. Or push to GitHub and connect to Vercel dashboard
Option 2: Netlify (Recommended for static sites)
1. Install Netlify CLI: npm i -g netlify-cli
2. Navigate to project folder: cd badal-meher-portfolio
3. Deploy: netlify deploy --prod --dir .
4. Or drag & drop folder to netlify.com
Option 3: GitHub Pages
1. Create a repository: badal-meher-portfolio
2. Push code to main branch
3. Go to Settings > Pages
4. Select “Deploy from a branch” > main / root
5. Your site will be at https://yourusername.github.io/badal-meher-portfolio
Option 4: Cloudflare Pages
1. Sign up at cloudflare.com
2. Go to Pages > Create a project
3. Connect your GitHub repository
4. Build settings: Framework preset = “None”, Build command = ““, Build output directory =”/”
5. Deploy
SSL & Security Setup
Free SSL
• Vercel: Automatic SSL via Let’s Encrypt
• Netlify: Automatic SSL via Let’s Encrypt
• Cloudflare Pages: Automatic SSL
• GitHub Pages: Automatic SSL (for custom domains, use Cloudflare)
Cloudflare Protection (Recommended)
1. Add your domain to Cloudflare
2. Update nameservers
3. Enable:
• Always Use HTTPS
• Auto Minify (JS, CSS, HTML)
• Brotli compression
• Rocket Loader (optional)
• Browser Cache TTL: 4 hours
Security Headers (Add via Cloudflare or server config)
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
SEO Optimization Checklist
• Update canonical URL in <head>
• Replace og:image with your actual image URL
• Update Schema.org sameAs links with real social URLs
• Add Google Analytics 4 tag
• Submit sitemap to Google Search Console
• Verify domain in Google Search Console
• Add robots.txt (included)
• Add sitemap.xml (included)
• Set up Google Business Profile
• Create social media profiles and link back
Customization Guide
Update Personal Information
1. Name: Search and replace “Badal Meher” in index.html
2. Tagline: Update hero description and about sections
3. Social Links: Update all href attributes in social cards
4. Email: Update mailto: links
5. Images: Replace Unsplash URLs with your own in gallery section
6. Stats: Update data-count attributes in hero stats
Update Colors
Edit CSS custom properties in :root:
--electric-blue: #00d4ff; /* Your accent color */
deep-blue-900: #020617; /* Your dark background */
Add/Remove Social Links
Edit the social grid in index.html social section. Each card follows this pattern:
<a href="YOUR_URL" class="social-card platform-name">
<div class="social-icon-wrapper">
<i class="fab fa-icon-name"></i>
</div>
<div class="social-info">
<h3 class="social-name">Platform</h3>
<span class="social-handle">@username</span>
</div>
</a>
Browser Support
• Chrome 90+
• Firefox 88+
• Safari 14+
• Edge 90+
• Mobile Safari (iOS 14+)
• Chrome Mobile (Android 10+)
License
2024 Badal Meher. All rights reserved.
Credits
• Fonts: Google Fonts (Inter, Space Grotesk)
• Icons: Font Awesome 6.5.1
• Images: Unsplash (replace with your own)
Support
For questions or customizations, reach out via the contact form on the website or email baddalmeherdev@gmail.com 
