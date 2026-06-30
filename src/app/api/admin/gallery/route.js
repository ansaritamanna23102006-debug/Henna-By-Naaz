import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Gallery from "@/lib/models/Gallery";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    await dbConnect();

    const query = category && category !== "All" ? { category } : {};
    const images = await Gallery.find(query).sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to retrieve gallery" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    
    // Support single or multiple image uploads in request
    if (Array.isArray(body)) {
      const newImages = await Gallery.insertMany(body);
      return NextResponse.json({
        message: "Gallery images added successfully!",
        images: newImages,
      });
    }

    const newImage = await Gallery.create(body);
    return NextResponse.json({
      message: "Gallery image added successfully!",
      image: newImage,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to add gallery items" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    
    // Support bulk reordering or single updating
    if (Array.isArray(body)) {
      const promises = body.map(item => 
        Gallery.findByIdAndUpdate(item._id, { displayOrder: item.displayOrder }, { new: true })
      );
      await Promise.all(promises);
      return NextResponse.json({ message: "Gallery order updated successfully!" });
    }

    const { _id, ...updateData } = body;
    if (!_id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updated = await Gallery.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ message: "Gallery item updated successfully!", image: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to update gallery" }, { status: 500 });
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
      await Gallery.deleteMany({ _id: { $in: ids } });
      return NextResponse.json({ message: "Images deleted successfully!" });
    }

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await Gallery.findByIdAndDelete(id);
    return NextResponse.json({ message: "Image deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to delete gallery items" }, { status: 500 });
  }
}
