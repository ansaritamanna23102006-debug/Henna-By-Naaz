import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Content from "@/lib/models/Content";

export async function GET(request) {
  try {
    await dbConnect();
    let content = await Content.findOne();
    if (!content) {
      content = await Content.create({});
    }
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to retrieve page content" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    let content = await Content.findOne();

    if (!content) {
      content = await Content.create(body);
    } else {
      content = await Content.findByIdAndUpdate(content._id, body, { new: true });
    }

    return NextResponse.json({
      message: "Page content updated successfully!",
      content,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to update page content" }, { status: 500 });
  }
}
