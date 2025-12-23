# PostHog post-wizard report

The wizard has completed a deep integration of your Next.js 16.1.0 project with PostHog analytics. The integration includes both client-side and server-side event tracking, error monitoring with `captureException`, and automatic pageview/pageleave capture through the modern `instrumentation-client.ts` approach recommended for Next.js 15.3+.

## Integration Summary

### Files Created
- `instrumentation-client.ts` - Client-side PostHog initialization with automatic pageview capture, exception tracking, and debug mode in development
- `lib/posthog-server.ts` - Server-side PostHog client for tracking events in server components and API routes
- `.env` - Environment variables for PostHog API key and host

### Packages Installed
- `posthog-js` - Client-side JavaScript SDK
- `posthog-node` - Server-side Node.js SDK

## Events Tracked

| Event Name | Description | File |
|------------|-------------|------|
| `explore_events_clicked` | User clicked the 'Explore Events' button on the home page | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view details (includes event slug, title, location, date) | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicked a navigation link (includes destination and label) | `components/NavBar.tsx` |
| `logo_clicked` | User clicked the site logo to navigate home | `components/NavBar.tsx` |
| `user_link_clicked` | User clicked a user link in the dashboard users list | `app/(dashboard)/dashboard/users/page.tsx` |
| `user_profile_viewed` | User viewed a specific user profile (server-side, includes user ID) | `app/(dashboard)/dashboard/users/[id]/page.tsx` |
| `analytics_viewed` | User accessed the analytics dashboard page (server-side) | `app/(dashboard)/dashboard/analytics/page.tsx` |
| `error_occurred` | An application error occurred (includes error message, digest, name) | `app/(root)/error.tsx` |
| `error_retry_clicked` | User clicked 'Try again' to recover from an error | `app/(root)/error.tsx` |
| `home_page_viewed` | User viewed the home page (server-side, top of conversion funnel) | `app/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/271172/dashboard/934434) - Core analytics dashboard for DevEvent

### Insights
- [Event Engagement Funnel](https://us.posthog.com/project/271172/insights/4GYiCHqH) - Tracks user journey from home page to event card click
- [Navigation Link Clicks](https://us.posthog.com/project/271172/insights/e9BNcd6J) - Shows which navigation links users click most frequently
- [Popular Events by Location](https://us.posthog.com/project/271172/insights/74LqudWB) - Shows which events users are most interested in by location
- [Error Tracking Overview](https://us.posthog.com/project/271172/insights/UnULCLCw) - Monitors application errors and retry attempts
- [Dashboard Activity](https://us.posthog.com/project/271172/insights/ol20VQfr) - Tracks user activity in the dashboard area

## Configuration

Environment variables are configured in `.env`:
```
NEXT_PUBLIC_POSTHOG_KEY=phc_Lb8hd7LdRfjHUxog88Dy0mVlRRmaPohwEiBHgJr5Vg9
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Make sure to add these to your hosting provider's environment variables (Vercel, Netlify, etc.) for production deployments.
