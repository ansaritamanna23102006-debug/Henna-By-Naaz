import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Seo from "@/lib/models/Seo";

export async function GET(request) {
  try {
    await dbConnect();
    let seo = await Seo.findOne();
    if (!seo) {
      // Create default SEO configuration
      seo = await Seo.create({});
    }
    return NextResponse.json({ seo });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to retrieve SEO details" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    let seo = await Seo.findOne();

    if (!seo) {
      seo = await Seo.create(body);
    } else {
      seo = await Seo.findByIdAndUpdate(seo._id, body, { new: true });
    }

    return NextResponse.json({
      message: "SEO configuration updated successfully!",
      seo,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to update SEO details" }, { status: 500 });
  }
}
