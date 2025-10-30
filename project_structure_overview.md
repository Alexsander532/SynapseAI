# 🧱 Project Structure Overview

This document describes the overall architecture and folder structure of the full-stack project integrating **NestJS**, **Fastify**, **Prisma**, **Supabase**, **Better Auth**, and **Shadcn UI**.

---

## 📦 Folder Structure

```bash
root/
├── apps/
│   ├── web/                  # Front-end app (Next.js + Shadcn UI)
│   │   ├── app/              # App router structure and pages
│   │   ├── components/       # Reusable UI/UX components
│   │   ├── lib/              # Utility functions and helpers (e.g., fetcher, formatters)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── styles/           # Global styles and themes
│   │   ├── env.mjs           # Environment variables for the front-end
│   │   └── config/           # Web app configuration files
│   │
│   └── api/                  # Back-end (NestJS + Fastify + Prisma)
│       ├── src/
│       │   ├── main.ts       # Application entry point
│       │   ├── app.module.ts # Root module
│       │   ├── prisma/       # Prisma configuration and client
│       │   ├── modules/      # Core modules (auth, users, etc.)
│       │   ├── common/       # Interceptors, guards, pipes, decorators
│       │   ├── config/       # App configuration (CORS, env, etc.)
│       │   └── utils/        # Helper functions
│       │
│       ├── prisma/schema.prisma  # Database schema definition
│       ├── .env                   # Backend environment variables
│       └── package.json
│
├── packages/                # Shared packages across apps
│   ├── ui/                  # Base UI components (buttons, inputs, cards, etc.)
│   ├── auth/                # Better Auth + Supabase integration
│   ├── utils/               # Shared utility functions and types
│   └── config/              # Shared configurations (eslint, tsconfig, etc.)
│
├── docker/                  # Docker and Dokploy setup
│   ├── api.Dockerfile
│   ├── web.Dockerfile
│   ├── docker-compose.yml
│   └── dokploy.yaml
│
├── .env                     # Global environment variables
├── turbo.json               # Turborepo build configuration
├── package.json
└── README.md
