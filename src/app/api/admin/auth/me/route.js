import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcryptjs";

export async function GET(request) {
  try {
    const admin = await verifyAuth(request);
    return NextResponse.json({ admin });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PUT(request) {
  try {
    const admin = await verifyAuth(request);
    const { name, email, currentPassword, newPassword, profileImage } = await request.json();

    await dbConnect();
    const adminDoc = await Admin.findById(admin._id);

    if (!adminDoc) {
      return NextResponse.json({ error: "Admin profile not found" }, { status: 404 });
    }

    if (name) adminDoc.name = name;
    if (email) adminDoc.email = email.toLowerCase();
    if (profileImage !== undefined) adminDoc.profileImage = profileImage;

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, adminDoc.password);
      if (!isMatch) {
        return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
      }
      adminDoc.password = await bcrypt.hash(newPassword, 10);
    }

    await adminDoc.save();

    return NextResponse.json({
      message: "Profile updated successfully!",
      admin: {
        id: adminDoc._id,
        name: adminDoc.name,
        email: adminDoc.email,
        profileImage: adminDoc.profileImage,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 });
  }
}
