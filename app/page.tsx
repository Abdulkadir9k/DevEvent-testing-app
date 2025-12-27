import EventCard from "@/components/EventCard"
import ExploreBtn from "@/components/ExploreBtn"
import { IEvent } from "@/database"
// import { getPostHogClient } from "@/lib/posthog-server"
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
  "use cache"
  cacheLife('minutes');
   const response = await fetch(`${BASE_URL}/api/events`)
   const {events} = await response.json()

  // Server-side tracking for home page view (top of conversion funnel)
  // const posthog = getPostHogClient();
  // posthog.capture({
  //   distinctId: 'server_home_visitor',
  //   event: 'home_page_viewed',
  //   properties: {
  //     featured_events_count: events.length,
  //     page: 'home',
  //   }
  // });
  // await posthog.shutdown();

  return (

    <section>
      <h1 className="text-center">Welcome to the Home of Developers <br /> Where all events in one place </h1>
      <p className="text-center mt-5">Dont mess it!</p>

      <ExploreBtn />
      <div className="mt-20 space-y-5">
        <h3>Featured Events</h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li className="list-none" key={event.title}><EventCard {...event}/></li>

          ))}
        </ul>
      </div>
    </section>


  )
}

export default Home