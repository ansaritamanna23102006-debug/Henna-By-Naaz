import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/lib/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET || "henna-naaz-secret-key-12345";

export async function verifyAuth(request) {
  const token = request.cookies.get("admin-token")?.value;
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    await dbConnect();
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      throw new Error("Unauthorized: Admin user not found");
    }
    return admin;
  } catch (error) {
    throw new Error("Unauthorized: Invalid or expired token");
  }
}
