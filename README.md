<div align="center">

  # ✨ Aayush Tyagi — Immersive 3D Portfolio

  <p align="center">
    <strong>Software Engineer & AI/ML Specialist</strong><br />
    <em>"Engineering Intelligence, Architecting Realities."</em>
  </p>

  <p align="center">
    <a href="https://github.com/aayushtyagi00/aayush-tyagi-portfolio/stargazers"><img src="https://img.shields.io/github/stars/aayushtyagi00/aayush-tyagi-portfolio?style=for-the-badge&color=A88B62&logo=github" alt="Stars" /></a>
    <a href="https://github.com/aayushtyagi00/aayush-tyagi-portfolio/network/members"><img src="https://img.shields.io/github/forks/aayushtyagi00/aayush-tyagi-portfolio?style=for-the-badge&color=A88B62&logo=github" alt="Forks" /></a>
    <a href="https://github.com/aayushtyagi00/aayush-tyagi-portfolio/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-202328?style=for-the-badge&labelColor=15171A&color=A88B62" alt="License" /></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React_19-202328?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-202328?style=flat-square&logo=typescript&logoColor=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Three.js-202328?style=flat-square&logo=three.js&logoColor=FFFFFF" alt="Three.js" />
    <img src="https://img.shields.io/badge/GSAP-202328?style=flat-square&logo=greensock&logoColor=88CE02" alt="GSAP" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-202328?style=flat-square&logo=tailwindcss&logoColor=06B6D4" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-202328?style=flat-square&logo=vite&logoColor=646CFF" alt="Vite" />
  </p>

  <h4>
    <a href="#-overview">Overview</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-featured-projects">Featured Projects</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-contact">Contact</a>
  </h4>

</div>

---

## 🌌 Overview

A cinematic, interactive **3D Developer Portfolio** engineered with **React 19**, **Three.js (React Three Fiber & Drei)**, **GSAP**, and **Tailwind CSS**. Crafted with an architectural color palette inspired by **Obsidian (`#0B0C0E`)**, **Warm Ivory (`#F2EFE8`)**, and **Brushed Bronze (`#A88B62`)**.

This platform showcases production-grade full-stack applications, autonomous AI/ML architectures, and interactive 3D simulations with frictionless performance.

---

## ✨ Key Features

- **🪐 Interactive 3D Beacon & Starfields:** Real-time WebGL canvas featuring floating polyhedrons, metallic orbits, and depth-reactive particles powered by `@react-three/fiber` and `@react-three/drei`.
- **🌊 Interactive Fluid Shaders:** Custom GLSL shaders creating dynamic background fluid mechanics with cursor interactions.
- **⚡ Kinetic GSAP & Lenis Motion:** Smooth-scroll physics with Lenis combined with GSAP ScrollTrigger timeline orchestrations.
- **🎯 3D Perspective Tilt Cards:** Mouse-tracking spring physics computed on client interaction with Framer Motion.
- **📬 Transmission Relay (Contact Form):** Built-in contact transmission engine supporting Formspree integration, anti-spam fallbacks, and quick clipboard actions.
- **📱 Responsive & Accessible:** High-performance responsive layouts engineered for smooth frame rates across mobile, tablet, and desktop displays.

---

## 🚀 Featured Projects

| Project | Domain | Architecture / Stack | Description |
| :--- | :--- | :--- | :--- |
| **[ExpertEdge](#)** | *Full-Stack & Mobile Architecture* | `React Native` `Firebase` `Razorpay` `Node.js` | 17-screen mobile marketplace linking verified enterprise consultants with clients. Features real-time scheduling, chat, and Indian payment gateway escrow rails. |
| **[Stock Council AI](#)** | *Autonomous Agentic Networks* | `Claude API` `React` `Supabase` `Bigdata API` | Multi-agent equity intelligence platform. Autonomous AI personas (Technical, Fundamental, Risk) run multi-round debates to synthesize quantitative consensus reports. |
| **[MindCraft AI](#)** | *Generative AI Systems* | `Gemini API` `React` `Vite` `Tailwind CSS` | Multimodal technical study accelerator that ingests textbooks and papers to synthesize interactive concept maps, active-recall flashcards, and slide decks. |
| **[Personal AI Voice Agent](#)** | *Voice AI & Automation* | `Bland.ai` `Vapi.ai` `Node.js` `Prompt Engineering` | Sub-500ms low-latency call screening and meeting triage system with custom persona guardrails and direct telephony routing. |

---

## 🛠️ Tech Stack

### **Frontend & 3D Engineering**
- **Core:** React 19, TypeScript, Vite
- **3D & Shaders:** Three.js, `@react-three/fiber`, `@react-three/drei`, `maath`
- **Animation & Physics:** GSAP (ScrollTrigger), Framer Motion (`motion/react`), Lenis Smooth Scroll
- **Styling:** Tailwind CSS v4, Lucide React, React Icons

### **AI & Machine Learning**
- **LLM APIs & Engines:** Anthropic Claude API, Google Gemini API
- **Frameworks & Libraries:** TensorFlow, Scikit-learn, LangChain, Hugging Face
- **Voice AI:** Bland.ai, Vapi.ai

### **Backend & Cloud Infrastructure**
- **Databases & Auth:** Firebase, Supabase, MongoDB, Express / Node.js
- **Payment Rails:** Razorpay API
- **Deployment:** Vercel / GitHub Pages

---

## 📁 Project Architecture

```plaintext
aayush-tyagi-portfolio/
├── public/
│   ├── hero-video.mp4                                # Background hero visuals
│   └── The_man_looks_into_the_camera_gwr_video_mvp.mp4
├── src/
│   ├── assets/                                       # Media and static assets
│   ├── components/
│   │   ├── About.tsx                                 # Profile, identity & 3D tilt card
│   │   ├── Background3D.tsx                          # Ambient WebGL starfield
│   │   ├── Contact.tsx                               # Interactive 3D beacon & message relay
│   │   ├── CustomCursor.tsx                          # Custom magnetic cursor tracker
│   │   ├── Experience.tsx                            # Milestones & educational timeline
│   │   ├── Footer.tsx                                # Colophon & live status indicator
│   │   ├── Hero.tsx                                  # Hero headline, 3D viewport & video reel
│   │   ├── InteractiveFluidShader.tsx                # Dynamic WebGL fluid shader
│   │   ├── LoadingScreen.tsx                         # Kinetic initial boot sequence
│   │   ├── Navbar.tsx                                # Glassmorphic sticky navigation
│   │   ├── Projects.tsx                              # Featured case studies & interactive previews
│   │   ├── ScrollIndicator.tsx                       # Reading progress tracker
│   │   └── Skills.tsx                                # Filterable tech stack matrix
│   ├── App.tsx                                       # Main application layout & Lenis orchestrator
│   ├── index.css                                     # Obsidian & Bronze design tokens
│   └── main.tsx                                      # React entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 💻 Getting Started

### **Prerequisites**
Ensure you have **Node.js** (v18.0 or higher) installed on your system.

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/aayushtyagi00/aayush-tyagi-portfolio.git
   cd aayush-tyagi-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional for contact form & APIs):
   ```bash
   cp .env.example .env.local
   ```
   Configure your Formspree Form ID:
   ```env
   VITE_FORMSPREE_KEY=your_formspree_key_or_id
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` to view the portfolio.

### **Production Build**

To compile the optimized production bundle:
```bash
npm run build
```

To preview the production bundle locally:
```bash
npm run preview
```

---

## 📬 Contact & Connect

**Aayush Tyagi**  
*BTech Computer Science (AI & ML) — Lovely Professional University*

- 📧 **Email:** [tyagiaayush3030@gmail.com](mailto:tyagiaayush3030@gmail.com)
- 🐙 **GitHub:** [@aayushtyagi00](https://github.com/aayushtyagi00)
- 💼 **LinkedIn:** [in/aayushtyagi00](https://linkedin.com/in/aayushtyagi00)
- 🐦 **X (Twitter):** [@aayushtyagi00](https://x.com/aayushtyagi00)

---

<div align="center">
  <sub>Designed & Developed by Aayush Tyagi. Released under the MIT License.</sub>
</div>
