"use client"
import Image from "next/image"
import posthog from "posthog-js"

const ExploreBtn = () => {
  const handleClick = () => {
    console.log("clicked")
    posthog.capture('explore_events_clicked', {
      button_location: 'home_page_hero',
    })
  }

  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={handleClick}>
     <a href="#events">Explore Events
        <Image
            src="/icons/arrow-down.svg"
            alt="arrow down"
            width={26}
            height={20}
        />
     </a>
    </button>

  )
}

export default ExploreBtn