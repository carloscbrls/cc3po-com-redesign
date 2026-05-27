# AGENTS.md — CC3PO Village

## Project Overview
CC3PO is an AI automation and compliance-as-a-service company. We build websites, tools, and systems for small businesses with a focus on ADA/WCAG compliance, lead generation, and automated monitoring.

## Architecture
- **Framework:** Astro (static site generator)
- **Hosting:** Netlify (git push workflow)
- **DNS:** Cloudflare (cc3po.com zone)
- **Styling:** Tailwind CSS
- **Content:** Markdown/MDX blog posts

## Key Conventions
- Use TypeScript for all new files
- Components go in `src/components/`
- Pages go in `src/pages/`
- Blog content goes in `src/content/blog/`
- Each author has their own bio in `src/content/authors/`
- Run `npm run build` before pushing to verify no errors

## Village Agents
This project is maintained by the CC3PO village of AI agents. Key agents:
- **Atlas** — Systems coordinator, infrastructure
- **Hermes** — Research & GPU operations
- **Taylor** — Blog content
- **Axecessor** — WCAG/accessibility auditing

## Important
- Never commit API keys or secrets
- Always verify WCAG compliance on new pages
- Blog posts should include proper frontmatter (title, description, pubDate, author)
- Push to main branch triggers Netlify deployment