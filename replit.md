# Your Earth - Climate Engagement Platform

## Overview
A comprehensive climate action platform featuring interactive data visualizations, community hubs, education resources, and more. Built from a Figma Make design export with 40+ pages.

## Architecture
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4 (oklch colors)
- **Backend**: Express 5
- **Database**: PostgreSQL via Drizzle ORM (in-memory storage currently used)
- **Auth**: Supabase client with email/password sign-up, sign-in, sign-out, and session persistence

## Routing
Uses custom state-based routing via `currentPage` state + `switch` in `renderPage()`. URL is kept in sync: `?page=<pageName>` is set on navigate (`history.pushState`) and read on load and on browser back/forward (`popstate`). Priority: `?page=` → `localStorage.lastPage` → `'home'`.

## Key Pages
- `HomePage` - Landing page with hero section and CSS Earth animation
- `ClimateDataDashboardPage` - Climate metrics and data visualization
- `CommunityPage` - Community hubs (Energy, Food, Mobility, etc.) + Community Feed entry
- `CommunityFeedPage` - iframe wrapper for standalone `feed.html` community feed
- `ActionPage` - Campaigns, events, green careers
- `LearnPage` - Education, calculators, corporate monitoring, Infrastructure Map, Disaster Map
- `InfraMapPage` - iframe wrapper for standalone `renewables_map.html` (renewable energy infrastructure map)
- `DisasterMapPage` - iframe wrapper for standalone `disasters.html` disaster globe
- `FeedPage` - Posts & Feed with composer, "All Posts" / "Following" tabs, image upload via Supabase Storage
- `MarketplacePage`, `JobsPage`, `ProfilePage`, `DashboardPage`, etc.

## Standalone HTML Pages (in client/public/, served via iframe wrappers)
- `renewables_map.html` - Renewable energy infrastructure (used by InfraMapPage)
- `globe_map.html` - 3D WebGL global infrastructure map (power plants, renewables, industrial sites)
- `disasters.html` - 152 global climate disaster events on 3D/2D Cesium globe
- `feed.html` - Community activity feed with glassmorphism theme, wired to Supabase backend via yeApi()
- `electricity_map.html` - Live global electricity & carbon intensity map with Three.js globe, 40 live zones + 60+ static baseline zones, choropleth coloring, signal switcher (carbon/renewable/fossil), auto-refresh every 15 min

## Backend API Proxy (server/routes.ts)
- `GET /api/electricity-maps/carbon-intensity/:zone` - Proxies to Electricity Maps API with auth token from ELECTRICITY_MAPS_API_KEY env secret
- `GET /api/electricity-maps/power-breakdown/:zone` - Proxies power breakdown data (renewable %, fossil-free %, electricity mix by source)

## Routing: ?page= Query Param Support
App.tsx reads `?page=<pageName>` from the URL on initial load and on browser back/forward. Navigation updates the URL with `history.pushState`. Feed iframe sidebar links use `/?page=learn-infra-map` (and similar) with `target="_parent"` to open map pages in the main SPA.

## Database Schema (shared/schema.ts)
- `users` - Basic user accounts (username, password)

## Supabase Tables (via migrations in supabase-migrations/)
- `posts` - id, user_id, content, image_url, link_url, created_at
- `follows` - follower_id, following_id, created_at
- `reactions` - id, post_id, user_id, reaction_type (like/love/fire/eco/wow/sad), created_at; unique on (post_id, user_id)
- `profiles` - id (references auth.users), username, avatar_url, bio, created_at; auto-populated via trigger on auth.users insert
- Storage bucket: `post-images` for uploaded post images
- Posts utility functions in `client/src/utils/posts.ts`
- Reactions utility functions in `client/src/utils/reactions.ts` (bulk fetch counts/user reactions, upsert, remove)
- Follows utility functions in `client/src/utils/follows.ts` (follow/unfollow, isFollowing check, counts, followers/following lists, profile lookup)

## Server
- `server/routes.ts` - Registers Electricity Maps API proxy routes (see Backend API Proxy above); optional rate limiting for those routes
- `server/storage.ts` - In-memory storage with IStorage interface

## Protected Routes
The following pages require authentication (redirect to login if not signed in):
- `profile`, `dashboard`, `settings`
- `community-create`, `action-create`
- `impact-report`, `achievements`
- `feed`

Protected route logic is in `client/src/components/ProtectedRoute.tsx` and wraps pages in `App.tsx`'s `renderPage()`.

## Important Notes
- CSS uses Tailwind v4 with oklch colors (238KB index.css from Figma export)
- Assets are in `client/src/assets/` (PNG files from Figma export)
- Map components (Leaflet) reference external data sources that may be unavailable
- Supabase credentials in `client/src/utils/supabase/info.tsx` point to original Figma Make project
- The `figma:asset/` protocol and version-pinned imports have been normalized for Vite compatibility
- The `sonner.tsx` component must import from the `sonner` package, NOT from itself (was a bug in original export)
