import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcryptjs";

export async function GET(request) {
  try {
    await dbConnect();

    // Check if an admin already exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return NextResponse.json(
        { message: "Setup already completed. Admin account already exists." },
        { status: 400 }
      );
    }

    // Create default admin account
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const newAdmin = await Admin.create({
      name: "Tabassum",
      email: "admin@hennabynaaz.com",
      password: hashedPassword,
      profileImage: "/images/about_tabassum.png",
    });

    return NextResponse.json({
      message: "Default admin account created successfully!",
      admin: {
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to setup admin" },
      { status: 500 }
    );
  }
}
