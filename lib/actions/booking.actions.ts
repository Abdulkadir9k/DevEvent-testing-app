"use server";
import Booking from "@/database/booking.model";
import connectDB from "../mongodb";

export const createBooking = async ({eventID, slug, email}: {eventID: string; slug: string; email: string}) => {
    try {
        await connectDB();
        await Booking.create({eventId: eventID, slug, email});
        return {success: true};
        
    } catch (e) {
        console.error("Error creating booking:", e);
        return {success: false};
    }
}