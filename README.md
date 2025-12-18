# Here With You

A mobile-first web application designed to provide emotional support through voice messages from loved ones on difficult days.

## Overview

On emotionally hard days, this app provides a simple, calming flow that helps users feel supported through real voices from people who care about them. The app prioritizes nervous system regulation before presenting emotional content, minimizing cognitive load and decision-making.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Static site (Vercel)
- **Package Manager**: pnpm

## Project Structure

```
here-with-you/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── src/
│   ├── components/
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── types.ts         # TypeScript type definitions
│   │   ├── constants.ts     # Application constants
│   │   └── utils.ts         # Utility functions
│   └── styles/
│       └── globals.css      # Global styles with Tailwind
├── public/
│   ├── audio/
│   │   └── messages/        # Voice message recordings (mp3/m4a)
│   ├── images/
│   │   └── contributors/    # Profile photos (square crop, optimized)
│   └── fonts/               # Custom fonts
└── PRODUCT_REQUIREMENTS.md  # Full product specifications
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (install with `npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build static site for production (output in `out/`)
- `pnpm start` - Start production server (after build)
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm type-check` - Run TypeScript type checking

## Core User Flow

1. **Grounding & Breath** - Calming breath animation (3 cycles)
2. **Choose Support** - Select a person or play a random message
3. **Message Playback** - Listen to a voice message
4. **Soft Landing** - Gentle close with option to listen again

## Adding Content

### Voice Messages

1. Record audio messages (20-45 seconds, mp3 or m4a format)
2. Place files in `public/audio/messages/`
3. Update the data structure to reference the new files

### Profile Photos

1. Prepare square-cropped photos
2. Optimize for mobile (recommend 300x300px or similar)
3. Place in `public/images/contributors/`

## Deployment

This is a static Next.js application that can be deployed to Vercel, Netlify, or any static hosting service.

```bash
# Build static site
pnpm build

# The `out/` directory contains the complete static site
```

### Vercel Deployment

The easiest deployment option:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

## Design Philosophy

- **Mobile-first**: Optimized for touch interfaces
- **Minimal cognitive load**: Large tap targets, minimal reading
- **Nervous system regulation first**: Breathing before emotional content
- **No pressure**: All user behaviors are valid (skip, replay, exit anytime)
- **Deeply personal**: Real voices from real people who care

## Version

v1.0.0 - Initial setup

## License

ISC

## Author

Travis Saylor
