# Piantasia

Premium herbal smoking blends made from organic, sustainably sourced herbs.

## Monorepo structure

- **`apps/web`** — Vite + React frontend (site and product pages)
- **`apps/api`** — Stripe webhook handler and order confirmation emails (Resend)

## Tech stack

- **Web:** React 18, TypeScript, Vite, Tailwind CSS v4, Radix UI + shadcn/ui
- **API:** Vercel Serverless Functions, Stripe (Payment Links + webhooks), Resend, React Email

## Getting started

### Prerequisites

- Node.js 18+
- npm (or pnpm)

### Installation

```bash
# From repo root: install all workspace dependencies
npm install

# Run the frontend
cd apps/web && npm run dev

# Type-check the API (optional)
cd apps/api && npm run type-check
```

### Scripts (from repo root)

| Command | Description |
|--------|-------------|
| `cd apps/web && npm run dev` | Start web dev server |
| `cd apps/web && npm run build` | Build web for production |
| `cd apps/web && npm run preview` | Preview web production build |
| `cd apps/api && npm run type-check` | Type-check API |

## Deploying

### Vercel (two projects)

1. **Frontend** — New project, import this repo, set **Root Directory** to `apps/web`. Deploy.
2. **API** — New project, import this repo, set **Root Directory** to `apps/api`. Deploy.

If the frontend build fails with `MODULE_NOT_FOUND` for Rollup’s `native.js`, the project already pins Rollup’s Linux optional dependencies. If it still fails, set the project’s **Node.js version** to **20.x** (e.g. in Vercel → Settings → General → Node.js Version).

The API project will expose the webhook at:  
`https://<your-api-project>.vercel.app/api/stripe-webhook`

---

## Order confirmation emails (API app)

The `apps/api` service listens for Stripe `checkout.session.completed` events and sends a confirmation email via Resend.

### Environment variables (API project in Vercel)

Set these in the **API project** (Vercel → Project → Settings → Environment Variables):

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (Dashboard → Developers → API keys) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret (see below) |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) (Dashboard → API Keys) |
| `FROM_EMAIL` | Sender address, e.g. `orders@piantasia.eu` or `onboarding@resend.dev` for testing |

### Stripe webhook setup

1. Deploy the API project so you have a URL like `https://<api-project>.vercel.app/api/stripe-webhook`.
2. In **Stripe Dashboard** → **Developers** → **Webhooks** → **Add endpoint**:
   - **Endpoint URL:** `https://<api-project>.vercel.app/api/stripe-webhook`
   - **Events to send:** select `checkout.session.completed`
3. After creating the endpoint, open it and copy the **Signing secret** (starts with `whsec_`).
4. In Vercel (API project), add **Environment variable** `STRIPE_WEBHOOK_SECRET` with that value.
5. Redeploy the API project so the new env var is used.

### Resend setup

1. Sign up at [resend.com](https://resend.com).
2. Create an **API key** and set it as `RESEND_API_KEY` in Vercel.
3. **From address:**  
   - For testing, use `onboarding@resend.dev` (no domain setup).  
   - For production, add and verify your domain (e.g. `piantasia.eu`) in Resend, then set `FROM_EMAIL` to e.g. `orders@piantasia.eu`.

---

## Project structure

```
piantasia/
├── apps/
│   ├── web/                 # Frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   ├── types/
│   │   │   └── main.tsx
│   │   ├── public/
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── api/                  # Stripe webhook + emails
│       ├── api/
│       │   └── stripe-webhook.ts
│       ├── emails/
│       │   └── order-confirmation.tsx
│       ├── package.json
│       ├── tsconfig.json
│       └── vercel.json
│
├── package.json              # Workspaces root
└── README.md
```

## License

Private — All rights reserved.
