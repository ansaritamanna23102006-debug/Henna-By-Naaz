import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    hero: {
      heading: {
        type: String,
        default: "Bringing Art To Your Hands,\nBeauty To Your Celebrations",
      },
      subHeading: {
        type: String,
        default: "Traditional Elegance, Modern Luxury",
      },
      description: {
        type: String,
        default: "Professional Mehendi Artist with 4+ Years of Experience, creating elegant, handcrafted, and intricate henna designs in the comfort of your home.",
      },
      ctaButtonText: {
        type: String,
        default: "Book Appointment",
      },
      ctaButtonLink: {
        type: String,
        default: "/contact",
      },
      heroImage: {
        type: String,
        default: "/images/hero_mehendi.png",
      },
      backgroundImage: {
        type: String,
        default: "",
      },
    },
    about: {
      heading: {
        type: String,
        default: "Founder of Henna by Naaz",
      },
      subHeading: {
        type: String,
        default: "Hello, I'm Tabassum",
      },
      description: {
        type: String,
        default: "For over 4 years, I have been bringing beautiful, custom mehendi artistry directly to my clients' homes, making weddings, engagements, festivals and celebrations even more memorable.",
      },
      quote: {
        type: String,
        default: "My goal is not just applying mehendi, but creating designs that become an integral, beautiful part of your most special life moments.",
      },
      experience: {
        type: String,
        default: "4+",
      },
      happyBrides: {
        type: String,
        default: "500+",
      },
      eventsCovered: {
        type: String,
        default: "120+",
      },
      aboutImage: {
        type: String,
        default: "/images/about_tabassum.png",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
