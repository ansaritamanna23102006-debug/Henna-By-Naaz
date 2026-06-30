import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Media from "@/lib/models/Media";

export async function GET(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "/";
    const search = searchParams.get("search") || "";

    const query = {};
    if (folder) query.folder = folder;
    if (search) query.filename = { $regex: search, $options: "i" };

    const mediaFiles = await Media.find(query)
      .select("-data") // Do not return raw binary base64 string in list API
      .sort({ createdAt: -1 });

    return NextResponse.json({ media: mediaFiles });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to retrieve media library" }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "/";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString("base64");

    const media = await Media.create({
      filename: file.name,
      data: base64Data,
      mimeType: file.type,
      size: file.size,
      folder: folder,
    });

    return NextResponse.json({
      message: "File uploaded successfully!",
      media: {
        _id: media._id,
        filename: media.filename,
        mimeType: media.mimeType,
        size: media.size,
        folder: media.folder,
        url: `/api/media/${media._id}`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "No file ID provided" }, { status: 400 });
    }

    const deleted = await Media.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "File deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to delete file" }, { status: 500 });
  }
}
