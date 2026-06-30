import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Settings from "@/lib/models/Settings";

export async function GET(request) {
  try {
    await dbConnect();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to retrieve settings" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, body, { new: true });
    }

    return NextResponse.json({
      message: "Business settings updated successfully!",
      settings,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
