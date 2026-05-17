<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# API Routes Structure

Next.js App Router requires API routes to be in the `app/api` directory to work. However, for future scalability:

- Main API code lives in: `backend/api/`
- Next.js requires copy in: `app/api/`

When adding new API routes, create them in `backend/api/` first, then copy to `app/api/`.