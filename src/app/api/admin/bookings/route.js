import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/lib/models/Booking";

export async function GET(request) {
  try {
    // Authenticate admin
    await verifyAuth(request);
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const service = searchParams.get("service") || "";

    const query = {};

    // Search filter (name, phone, email, notes)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // Status filter
    if (status && status !== "All") {
      query.status = status;
    }

    // Service filter
    if (service && service !== "All") {
      query.service = service;
    }

    const bookings = await Booking.find(query).sort({ eventDate: 1, createdAt: -1 });
    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to retrieve bookings" }, { status: 401 });
  }
}

// POST - Public endpoint for submitting bookings
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { name, phone, email, eventDate, location, service, notes } = body;

    if (!name || !phone || !eventDate || !location || !service) {
      return NextResponse.json(
        { error: "Missing required booking details (Name, Phone, Event Date, Location, Service)" },
        { status: 400 }
      );
    }

    const newBooking = await Booking.create({
      name,
      phone,
      email,
      eventDate: new Date(eventDate),
      location,
      service,
      notes,
      status: "Pending",
    });

    return NextResponse.json({
      message: "Booking request submitted successfully! We will contact you soon.",
      booking: newBooking,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to submit booking" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    const { _id, status, notes } = body;

    if (!_id) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const updateFields = {};
    if (status) updateFields.status = status;
    if (notes !== undefined) updateFields.notes = notes;

    const updated = await Booking.findByIdAndUpdate(_id, updateFields, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Booking updated successfully!",
      booking: updated,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const idsParam = searchParams.get("ids");

    if (idsParam) {
      const ids = idsParam.split(",");
      await Booking.deleteMany({ _id: { $in: ids } });
      return NextResponse.json({ message: "Bookings deleted successfully!" });
    }

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await Booking.findByIdAndDelete(id);
    return NextResponse.json({ message: "Booking deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to delete booking" }, { status: 500 });
  }
}
