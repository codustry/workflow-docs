# Cloudflare Worker — Mintlify Docs Proxy

This worker proxies `workflow.codustry.com/docs` to the Mintlify-hosted docs at `codustry.mintlify.dev`.

## Deploy Steps

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create Application** → **Create Worker**
2. Name it `workflow-docs-proxy` → **Deploy**
3. Click **Edit Code** → replace the entire script with the contents of `worker.js` → **Deploy**
4. Go to **Settings** → **Triggers** → **Add Route**
   - Route: `workflow.codustry.com/docs*`
   - Zone: `codustry.com`
5. Save

## Also required (one-time, in Mintlify Dashboard)

- Update the GitHub source repo from `codustry/docs` to `codustry/workflow-docs` in [dashboard.mintlify.com](https://dashboard.mintlify.com) under your project settings.

## How it works

All requests to `workflow.codustry.com/docs*` are forwarded to `codustry.mintlify.dev` with the correct host headers so Mintlify serves the right content.
