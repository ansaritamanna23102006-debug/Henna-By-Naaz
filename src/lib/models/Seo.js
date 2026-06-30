import mongoose from "mongoose";

const SeoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      default: "Henna by Naaz | Premium Luxury Mehendi Artist by Tabassum",
    },
    metaDescription: {
      type: String,
      default: "Bespoke, premium, and intricate bridal mehendi artistry by Tabassum. Offering professional home-visit services for weddings, engagements, festivals, and special celebrations.",
    },
    keywords: {
      type: String,
      default: "Henna by Naaz, Tabassum Mehendi Artist, Home Visit Henna Artist, Luxury Bridal Mehendi, Professional Mehendi Artist, Wedding Henna Designer, Best Henna Artist, Organic Henna Mehndi, Mehendi Artist Near Me",
    },
    openGraphImage: {
      type: String,
      default: "/images/hero_mehendi.png",
    },
    favicon: {
      type: String,
      default: "/favicon.ico",
    },
    googleAnalyticsId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Seo || mongoose.model("Seo", SeoSchema);
