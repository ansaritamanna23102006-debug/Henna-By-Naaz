import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import ContactMessage from "@/lib/models/ContactMessage";

export async function GET(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to retrieve messages" }, { status: 401 });
  }
}

// POST - Public endpoint for sending contact form messages
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required contact details (Name, Email, Message)" },
        { status: 400 }
      );
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      phone,
      subject: subject || "General Inquiry",
      message,
      status: "Unread",
    });

    return NextResponse.json({
      message: "Message sent successfully! We will get back to you shortly.",
      contactMessage: newMessage,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to submit message" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    const { _id, status } = body;

    if (!_id || !status) {
      return NextResponse.json({ error: "Booking ID and Status are required" }, { status: 400 });
    }

    const updated = await ContactMessage.findByIdAndUpdate(_id, { status }, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Message status updated successfully!",
      contactMessage: updated,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to update message" }, { status: 500 });
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
      await ContactMessage.deleteMany({ _id: { $in: ids } });
      return NextResponse.json({ message: "Messages deleted successfully!" });
    }

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await ContactMessage.findByIdAndDelete(id);
    return NextResponse.json({ message: "Message deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to delete message" }, { status: 500 });
  }
}
