"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState } from "react";

const BookEvent = ({eventID, slug}: {eventID: string, slug: string}) => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmitt = async (e: React.FormEvent) => {
        e.preventDefault();
        const {success} = await createBooking({eventID, slug, email});
        if (success) {
            setSubmitted(true);
            posthog.capture("event_booked", {eventID, slug, email});
        } else {
            console.error("Booking failed:", e);
            posthog.captureException("event_booking_failed");
        }
    }


  return (
    <div is="book-event">
        {submitted ? (
        <p>Thank you for booking! A confirmation email has been sent to {email}.</p>

    ) : (

        <form onSubmit={handleSubmitt}>

            <label htmlFor="email">Email Address</label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button
                type="submit"
                className="button-submit"
            >
                Book Now
            </button>
        
        </form>

    )}
    </div>
  )
}

export default BookEvent