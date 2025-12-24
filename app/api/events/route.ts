import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "../../../database/event.model";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {

    try {
        await connectDB();
        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());

        } catch (e) {
            console.log(e);
            return NextResponse.json({ message: "Form Data Parsing Failed", error: e instanceof Error ? e.message : "Unknown" }, { status: 400 });
        }

        const file = formData.get("image") as File;
        if (!file) return NextResponse.json({ message: "Image File Missing" }, { status: 400 });

        let tags = JSON.parse(formData.get("tags") as string);
        let agenda = JSON.parse(formData.get("agenda") as string);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: "image", folder: "events" }, (error, result) => {
                if (error) return reject(error);
                resolve(result);

            }).end(buffer);

        });

        event.image = (uploadResult as { secure_url: string }).secure_url;


        const CreateEvents = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda,
        });
        console.log(CreateEvents);
        return NextResponse.json({ message: "Event Created Successfully", event: CreateEvents }, { status: 201 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Event Creation Failed", error: e instanceof Error ? e.message : "Unknown" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 });
        console.log(events);
        return NextResponse.json({ message: "Event fetched Successfully", events }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Failed to Fetch Events", error: e }, { status: 500 });
    }
}