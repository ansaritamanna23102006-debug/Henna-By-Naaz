import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Service from "@/lib/models/Service";
import Gallery from "@/lib/models/Gallery";
import Testimonial from "@/lib/models/Testimonial";
import Booking from "@/lib/models/Booking";
import ContactMessage from "@/lib/models/ContactMessage";

export async function GET(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    // Fetch counts
    const [servicesCount, galleryCount, testimonialsCount, bookingsCount, messagesCount] = await Promise.all([
      Service.countDocuments(),
      Gallery.countDocuments(),
      Testimonial.countDocuments(),
      Booking.countDocuments(),
      ContactMessage.countDocuments(),
    ]);

    // Fetch recents
    const [recentBookings, recentMessages] = await Promise.all([
      Booking.find().sort({ createdAt: -1 }).limit(5),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5),
    ]);

    return NextResponse.json({
      counts: {
        services: servicesCount,
        gallery: galleryCount,
        testimonials: testimonialsCount,
        bookings: bookingsCount,
        messages: messagesCount,
      },
      recentBookings,
      recentMessages,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to fetch dashboard data" }, { status: 401 });
  }
}
