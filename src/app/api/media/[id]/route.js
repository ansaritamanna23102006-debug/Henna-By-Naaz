import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Media from "@/lib/models/Media";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const media = await Media.findById(id);
    if (!media) {
      return new NextResponse("Media file not found", { status: 404 });
    }

    const buffer = Buffer.from(media.data, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": media.mimeType,
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new NextResponse(error.message || "Failed to retrieve media", { status: 500 });
  }
}
