import { getPostHogClient } from '@/lib/posthog-server';

const Analytics = async () => {
  // Server-side tracking for analytics page view
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: 'server_analytics_viewer',
    event: 'analytics_viewed',
    properties: {
      page: 'dashboard_analytics',
    }
  });
  await posthog.shutdown();

  return (
    <div>Analytics</div>
  )
}

export default Analytics