import { getPostHogClient } from '@/lib/posthog-server';

const UserDetails = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params;

  // Server-side tracking for user profile view
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: `server_user_${id}`,
    event: 'user_profile_viewed',
    properties: {
      user_id: id,
      source: 'dashboard',
    }
  });
  await posthog.shutdown();

  return (
    <div> showing user details for #{id}</div>
  )
}

export default UserDetails