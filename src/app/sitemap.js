export default function sitemap() {
  const baseUrl = "https://hennabynaaz.com";
  
  const routes = [
    "",
    "/about",
    "/services",
    "/bridal-mehendi",
    "/gallery",
    "/pricing",
    "/testimonials",
    "/faq",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
