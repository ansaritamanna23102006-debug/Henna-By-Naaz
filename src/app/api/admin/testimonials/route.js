import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/lib/models/Testimonial";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isPublic = searchParams.get("public") === "true";

    await dbConnect();

    // If public, we can fetch all or prioritize featured ones
    const query = {};
    const testimonials = await Testimonial.find(query).sort({ isFeatured: -1, createdAt: -1 });

    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to retrieve testimonials" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    const newTestimonial = await Testimonial.create(body);

    return NextResponse.json({
      message: "Testimonial created successfully!",
      testimonial: newTestimonial,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updated = await Testimonial.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({
      message: "Testimonial updated successfully!",
      testimonial: updated,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to update testimonial" }, { status: 500 });
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
      await Testimonial.deleteMany({ _id: { $in: ids } });
      return NextResponse.json({ message: "Testimonials deleted successfully!" });
    }

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ message: "Testimonial deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to delete testimonial" }, { status: 500 });
  }
}
