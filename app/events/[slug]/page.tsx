import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getSimiarEventsBySlug } from "@/lib/actions/event.actions";
import { cacheLife } from "next/cache";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => (
  <div className="flex-row-gap-2 items-center">

    <Image src={icon} alt={alt} width={17} height={17} />
    <span>{label}</span>

  </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Event Agenda</h2>
    <ul>
      {agendaItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag, index) => (
      <div className="pill" key={index}>{tag}</div>
    ))}
  </div>
)

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  "use cache";
  cacheLife("minutes")
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const data = await request.json();
  const { description, overview, image, date, time, venue, location, mode, audience, organizer, agenda, tags } = data.event;

  const bookings = 10; // Placeholder for bookings count

  const similarEvents: IEvent[] = (await getSimiarEventsBySlug(slug)).map((event) => ({
    ...event,
    _id: event._id.toString(), // Convert ObjectId to string
    agenda: JSON.parse(event.agenda[0]), // Parse agenda JSON string into an array
    tags: JSON.parse(event.tags[0]), // Parse tags JSON string into an array
  }));

  return (
    <section id="event">
      <div className="header">

        <h1>Event Description</h1>
        <p>{description}</p>

      </div>

      <div className="details">
        {/* {left side - Event content} */}

        <div>
          <Image src={image} alt="Event Banner" width={400} height={400} className="banner" />

          <section className="flex-col-gap-2">

            <h2>Overiew</h2>
            <p>{overview}</p>

          </section>

          <section className="flex-col-gap-2">

            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="Calendar Icon" label={date} />
            <EventDetailItem icon="/icons/clock.svg" alt="Clock Icon" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin Icon" label={venue + ", " + location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode Icon" label={mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="audience Icon" label={audience} />


          </section>

          <EventAgenda agendaItems={JSON.parse(agenda[0])} />

          <section className="flex-col-gap-2">

            <h2> About the Organizer</h2>
            <p>{organizer}</p>

          </section>

          <EventTags tags={JSON.parse(tags[0])} />

        </div>


        {/* {right side - Booking Form} */}

        <aside className="booking">

          <div className="signup-card">
            <h2>Book Your Spot Now!</h2>
            <p>Don't miss out on this exciting event. Secure your spot today by filling out the booking form below.</p>
            {bookings > 0 ? (
              <p className="text-sm">join {bookings} people who have already joined there</p>
            ) : (
              <p className="text-sm">Be the first to book the spot</p>
            )}
            <BookEvent eventID={data.event._id.toString()} slug={slug}/>
          </div>

        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 mt-20">
        <h2>Similar Events You May Like</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
            console.log(similarEvent),
            <EventCard key={similarEvent._id.toString()} {...similarEvent} />
          ))}
        </div>
      </div>

    </section>
  )
}

export default EventDetailsPage