import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Service from "@/lib/models/Service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isPublic = searchParams.get("public") === "true";

    await dbConnect();

    const query = isPublic ? { isActive: true } : {};
    const services = await Service.find(query).sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to retrieve services" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    const newService = await Service.create(body);

    return NextResponse.json({
      message: "Service created successfully!",
      service: newService,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await verifyAuth(request);
    await dbConnect();

    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const updatedService = await Service.findByIdAndUpdate(_id, updateData, { new: true });
    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Service updated successfully!",
      service: updatedService,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to update service" }, { status: 500 });
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
      // Bulk delete support
      const ids = idsParam.split(",");
      await Service.deleteMany({ _id: { $in: ids } });
      return NextResponse.json({ message: "Services deleted successfully!" });
    }

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to delete service" }, { status: 500 });
  }
}
