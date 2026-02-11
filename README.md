# Aetheria Retreats

Full stack Next.js + MongoDB experience curation platform.

## Quick start

1) Copy env

```bash
cp .env.example .env.local
```

2) Install deps

```bash
npm install
```

3) Run

```bash
npm run dev
```

## Notes

- Uses MongoDB via Mongoose.
- Auth is JWT + httpOnly cookie.
- Deploys cleanly on Vercel/Netlify with `MONGODB_URI` + `JWT_SECRET`.
