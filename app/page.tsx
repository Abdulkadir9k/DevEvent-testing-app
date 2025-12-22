import EventCard from "@/components/EventCard"
import ExploreBtn from "@/components/ExploreBtn"
import { events } from "@/lib/constants"

const Home = () => {
  console.log("am I in server or client?")
  return (
    
    <section>
      <h1 className="text-center">Welcome to the Home of Developers <br /> Where all events in one place </h1>
      <p className="text-center mt-5">Dont mess it!</p>

      <ExploreBtn />
      <div className="mt-20 space-y-5">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.title}><EventCard {...event}/></li>
            
          ))}
        </ul>
      </div>
    </section>
    
    
  )
}

export default Home