# Piantasia

Premium herbal smoking blends made from organic, sustainably sourced herbs.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Radix UI + shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |

## Project Structure

```
src/
├── app/
│   ├── App.tsx           # Main app component
│   └── components/       # Feature components
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── Footer.tsx
│       ├── ProductCard.tsx
│       └── ui/           # shadcn/ui components
├── components/           # Shared components
│   └── ErrorBoundary.tsx
├── data/                 # Static data
│   ├── products.ts
│   └── benefits.ts
├── types/                # TypeScript types
│   └── product.ts
├── styles/               # CSS files
└── main.tsx             # Entry point
```

## License

Private - All rights reserved.
