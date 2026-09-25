# JurisNet — Legal Professional Network

> An exclusive, high-trust social networking and professional collaboration platform designed specifically for legal practitioners, advocates, barristers, and jurists.

[![Repository](https://img.shields.io/badge/GitHub-JurisNet-blue?logo=github)](https://github.com/azharhussaincs/JurisNet-.git)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel%20Ready-black?logo=vercel)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 🏛️ Project Overview

**JurisNet** provides verified advocates and jurists with an authentic digital forum to examine judicial precedents, share appellate insights, exchange statutory developments, and build collegial networks across jurisdictions without the noise and algorithmic distractions of generic social networks.

---

## 👥 Developer Group & Academic Attribution

### Platform Engineering Team
* **Azhar Hussain** — AI Systems & Architecture · *MSAI (72908)*
* **Haris Javeed** — Platform Engineering & State · *MSAI (75722)*
* **Usman Kayani** — Research & Advanced Analytics · *PhD (6678)*

### Course & Institution
* **Assignment**: Assignment 1 — Task 1
* **Subject**: Agentic AI
* **Instructor**: Ms Afia
* **Institution**: Riphah International University, G-7 Campus, Islamabad

---

## ✨ Key Features

1. **Academic & Engineering Introduction Screen**
   - Elegant introductory portal displaying Developer Group credentials, course attribution, and platform launch controls.

2. **Home / Legal Insights Feed**
   - Three-column layout balanced for focused reading.
   - **Insight Composer**: Publish commentary with practice tags, legal precedent citation badges, and verified evidentiary media.
   - **Feed Sorting**: Filter by *Latest*, *Top Endorsed*, or *With Precedents*.
   - **Trending Legal Precedents & Suggested Counsel**: Real-time contextual sidebar.

3. **Core Social Interactions**
   - **Like / Endorse**: Instant visual feedback and dynamic counter updates.
   - **Commentary Drawer**: Inline discussions with verified counsel metadata.
   - **Citation Sharing**: One-click link copying with inline visual confirmation.
   - **Bookmarks**: Save important judicial analyses to your library.

4. **Colleague Discovery & Directory**
   - Search across counsel names, law firms, court admissions, and jurisdictions.
   - Filter by specialized practice domains (Commercial Chancery, Appellate Advocacy, Antitrust, White Collar Defense, Constitutional Law, etc.).

5. **Colleague Network & Relationship State Machine**
   - Unified connection lifecycle across the application:
     - `Connect` (Not Connected) $\to$ `Pending` (Invitation Dispatched) $\to$ `Connected` (Active Network).
   - Review pending invitations with introductory notes.
   - Direct disconnect options with synchronized counters.

6. **Counsel Profile & Biography**
   - High-trust profile headers with bar numbers, admissions, and mutual connections.
   - Structured history: Professional Experience, Legal Education, and Published Insights.
   - In-place profile editor modal.

---

## 🛠️ Technology Stack

* **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Typography**: Newsreader Serif (Legal Editorial) + Plus Jakarta Sans (Clean UI)
* **Iconography**: [Lucide React](https://lucide.dev/)
* **Deployment Target**: [Vercel](https://vercel.com/) (configured via `vercel.json`)

---

## 🚀 Getting Started

Follow these step-by-step instructions to run JurisNet locally on your machine.

### Prerequisites
* [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
* `npm` or `yarn` / `pnpm` / `bun`

### 1. Clone the Repository
```bash
git clone https://github.com/azharhussaincs/JurisNet-.git
cd JurisNet-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port indicated in your terminal).

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```
The compiled assets will be output to the `dist/` directory.

### 5. Type-Check & Lint
```bash
npm run lint
```

---

## ☁️ Deploying to Vercel (Step-by-Step)

The project includes a ready-to-use `vercel.json` configuration file with SPA routing rewrites.

### Option 1: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** $\to$ **"Project"**.
3. Import your GitHub repository:
   ```
   https://github.com/azharhussaincs/JurisNet-.git
   ```
4. Vercel will automatically detect the settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. The site will deploy and provide your live production URL.

### Option 2: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```
For production release:
```bash
vercel --prod
```

---

## 📂 Project Structure

```text
├── index.html                   # HTML entry point with Newsreader & Jakarta fonts
├── package.json                 # Project dependencies and build scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vercel.json                  # Vercel deployment and SPA routing rewrite rules
├── vite.config.ts               # Vite configuration with React plugin
└── src/
    ├── main.tsx                 # Application bootstrap
    ├── App.tsx                  # Root switcher (Intro vs. Main Platform)
    ├── index.css                # Global CSS & Tailwind configuration
    ├── types/
    │   └── index.ts             # Strong TypeScript models (Lawyer, Post, Connection)
    ├── data/
    │   └── mockData.ts          # Curated jurists, bar numbers, precedents & posts
    └── components/
        ├── DeveloperIntro.tsx   # Project launchpad & academic attribution
        ├── LawyerNetworkShell.tsx # Main application state manager & shell
        ├── common/
        │   └── ConnectionButton.tsx # Unified 3-state connection button
        ├── navigation/
        │   ├── TopNav.tsx       # Desktop navigation & quick counsel badge
        │   └── MobileNav.tsx    # Mobile touch-friendly bottom dock
        ├── feed/
        │   ├── HomeFeed.tsx     # 3-column feed with composer & trending topics
        │   └── PostCard.tsx     # Legal card with Like, Comment, Share, Citation
        ├── profile/
        │   └── ProfileView.tsx  # Counsel profile, credentials & edit modal
        ├── network/
        │   └── NetworkView.tsx  # Active colleagues & pending inquiry review
        └── discover/
            └── DiscoverLawyersView.tsx # Searchable directory with domain filters
```

---

## 📄 License

Developed for academic and portfolio demonstration at **Riphah International University**. All rights reserved.
