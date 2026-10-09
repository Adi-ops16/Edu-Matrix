# Edu-Matrix

Edu-Matrix is a role-based education and institution-management platform. This repository contains the Next.js frontend; the backend is a separate service accessed through typed API functions.

## What the system does

The application provides account access and academic workflows for four roles:

- **Super admin** manages institutions and institution applications, and uses the platform overview to monitor institution, user, academic, and revenue totals.
- **Institution admin** manages institution users, departments, department membership requests, courses, course schedules/details, and teacher assignments.
- **Students** browse departments and courses, view their enrolled courses and classes, and make course payments through Stripe. Payment history is available from the student dashboard.
- **Teachers** view their profile and assigned courses.

Users can register, verify their email, sign in with credentials, or start Google OAuth. Users without a selected role/institution are guided through institution selection or institution setup. Route guards protect dashboard routes and restrict each dashboard to its authorized role.

## Main routes

| Route | Purpose |
| --- | --- |
| `/login`, `/registration` | Sign in and create an account |
| `/registration/verify-email` | Verify a registered email |
| `/select-institution`, `/create-institution` | Join or set up an institution |
| `/oauth-progress` | Verify the session after Google OAuth and route to the user's workspace |
| `/institution_admin/*` | Institution administration |
| `/student/*` | Student academics, courses, classes, and payment history |
| `/teacher/*` | Teacher profile and assigned courses |
| `/super_admin/*` | Institution oversight and platform overview |
| `/privacy-policy`, `/terms-of-service` | Public legal-information pages |

## Tech stack

- Next.js App Router and React
- TypeScript with strict checking
- Tailwind CSS v4, shadcn-style UI primitives, and Base UI
- TanStack Query for server state and cache management
- TanStack Form and Zod for forms and validation
- Recharts, with the shared shadcn chart wrapper, for dashboard visualizations
- Biome for formatting and lint checks
- `ofetch` for HTTP requests

## Getting started

Use a supported Node.js LTS release and npm.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root and set the public API base URL used by the frontend:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-backend.example.com/api/v1
   ```

   The URL should point to the backend API root that exposes the `/auth`, `/user`, `/course`, `/department`, `/institution`, `/student`, `/teacher`, `/admin`, and `/payment` endpoints. Google sign-in also uses this base URL to begin OAuth. Do not commit `.env.local` or credentials.

   `next.config.ts` also contains a rewrite for `/api/v1/:path*` to the project's configured backend deployment. If you use that proxy instead of calling the backend origin directly, set the API base URL to the matching frontend-relative API prefix and confirm your production OAuth callback and cookie configuration are compatible with the proxy.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Next.js (normally `http://localhost:3000`).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve a production build |
| `npm run lint` | Run `biome check` |
| `npm run format` | Format supported project files with Biome |

## Application architecture

### Routes and layouts

`src/app` contains the App Router pages and layouts. Route groups organize authentication and dashboard UI without adding URL segments. The root layout installs the global styles, theme, React Query and tooltip providers, and toast notifications. Dashboard routes use an authentication guard, then each role's layout uses a role guard and the shared dashboard shell/sidebar.

Role-specific sidebar navigation is described in `src/routes`. The API-facing UI is organized into feature modules under `src/components/modules`, while reusable controls are in `src/components/ui` and `src/components/shared`.

### Data and API flow

Feature functions in `src/api` make typed requests through the shared `src/lib/ofetch.ts` client. The client includes browser credentials so cookie-based sessions can be sent. Query hooks in `src/hooks` wrap these functions with TanStack Query, manage cache keys, and invalidate dependent data after mutations. Shared response and domain types live in `src/types`; form schemas are in `src/schemas`.

The frontend expects API responses in the declared `ApiResponse<T>` shape where applicable. Pagination metadata is read from `meta`; query parameters are passed through feature-specific hooks. Authentication and role guards obtain the current user from the profile endpoint.

### Authentication

Credential sign-in and registration use the `/auth` API functions; email verification is handled through a verification code flow. Google OAuth begins with a browser redirect to the backend. After the provider callback, `/oauth-progress` requests the signed-in profile and redirects to the workspace associated with the role. The backend must set a session cookie that is accepted by the browser and sent with credentialed API calls; production also requires matching CORS origins and OAuth callback URLs.

### Payments

Students start Stripe checkout from the course details UI. The backend creates the Stripe checkout session and returns its URL; the browser redirects to Stripe. Stripe returns the user to the student success or cancel route. The payment history page reads the student's payment records from the payment API.

## Project structure

```text
src/
  api/          Typed backend requests
  app/          App Router routes and layouts
  components/   UI, forms, shared components, and feature modules
  hooks/        TanStack Query and UI hooks
  lib/          HTTP client and shared utilities
  providers/    Theme, query, and tooltip providers
  routes/       Role-specific dashboard navigation
  schemas/      Zod validation schemas
  types/        API and domain types
  utils/        Formatting and UI helpers
public/         Static images and assets
```

## Development notes

- Keep API request/response types aligned with the backend contracts.
- Reuse the existing UI primitives, query hooks, form schemas, and shared pagination/table components when extending features.
- Handle loading, empty, and error states explicitly for asynchronous data.
- Do not expose secrets in `NEXT_PUBLIC_*` variables; those values are bundled into browser code.
- Check auth cookies, CORS, OAuth callback settings, and frontend/API origins together when diagnosing production sign-in problems.