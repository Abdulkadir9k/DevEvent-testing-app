"use client";

import { useState } from "react";

const BookEvent = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmitt = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the booking logic, e.g., send the email to your backend
        setTimeout(() => {
            setSubmitted(true);
        }, 1000); // Simulate async operation
        console.log(`Booking submitted for email: ${email}`);
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