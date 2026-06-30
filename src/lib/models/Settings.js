import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: "Henna by Naaz",
    },
    businessLogo: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "+91 91676 00320",
    },
    whatsApp: {
      type: String,
      default: "+91 91676 00320",
    },
    email: {
      type: String,
      default: "heenabynaaz20@gmail.com",
    },
    instagram: {
      type: String,
      default: "https://instagram.com",
    },
    facebook: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "Home-Visit Service available across the region",
    },
    workingHours: {
      type: String,
      default: "9:00 AM - 9:00 PM (Daily)",
    },
    googleMapsLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
