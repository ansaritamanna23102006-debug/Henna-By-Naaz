"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Sparkles 
} from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import GalleryCard from "@/components/GalleryCard";
import { CornerOrnament, GoldMandala } from "@/components/Mandalas";
import Button from "@/components/Button";

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const galleryGridRef = useRef(null);

  const [dbGallery, setDbGallery] = useState(null);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          setDbGallery(data.images);
        }
      })
      .catch((err) => console.log("Failed to load CMS gallery:", err));
  }, []);

  // Gallery items metadata
  const galleryItems = useMemo(() => {
    if (dbGallery) {
      return dbGallery.map((g) => ({
        src: g.url,
        title: g.altText || "Luxury Henna Design",
        category: g.category || "Bridal",
      }));
    }
    return [
      {
        src: "/images/portfolio_bridal.png",
        title: "Royal Rajasthani Heritage",
        category: "Bridal",
      },
      {
        src: "/images/portfolio_arabic.png",
        title: "Bold Silhouette Outline",
        category: "Arabic",
      },
      {
        src: "/images/portfolio_traditional.png",
        title: "Intricate Peacock Jaal",
        category: "Traditional",
      },
      {
        src: "/images/portfolio_festival.png",
        title: "Eid Floral Hand Ornament",
        category: "Festival",
      },
      {
        src: "/images/portfolio_minimalist.png",
        title: "Symmetric Mandala Accent",
        category: "Traditional",
      },
      {
        src: "/images/portfolio_feet.png",
        title: "Bridal Elephant Motif",
        category: "Feet",
      },
      {
        src: "/images/hero_mehendi.png",
        title: "Custom Portrait Details",
        category: "Portrait",
      },
      {
        src: "/images/portfolio_bridal.png",
        title: "Classic Bride & Groom",
        category: "Portrait",
      },
      {
        src: "/images/portfolio_feet.png",
        title: "Detailed Lotus Feet Accent",
        category: "Feet",
      },
      {
        src: "/images/portfolio_arabic.png",
        title: "Vibrant Leafy Wrist Cuff",
        category: "Arabic",
      },
      {
        src: "/images/portfolio_festival.png",
        title: "Diwali Floral Pattern",
        category: "Festival",
      },
      {
        src: "/images/hero_mehendi.png",
        title: "Bridal Classic Mandala",
        category: "Bridal",
      },
    ];
  }, [dbGallery]);

  const categories = ["All", "Bridal", "Arabic", "Traditional", "Portrait", "Feet", "Festival"];

  const itemsPerPage = 6;

  // Filter items
  const filteredItems = useMemo(() => {
    if (selectedFilter === "All") return galleryItems;
    return galleryItems.filter(item => item.category.toLowerCase() === selectedFilter.toLowerCase());
  }, [selectedFilter, galleryItems]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Items currently rendered (Page pagination)
  const renderedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (galleryGridRef.current) {
      const offsetTop = galleryGridRef.current.offsetTop - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  // Lightbox handlers
  const openLightbox = (index) => {
    // Map rendered item index to absolute filtered item index
    const absoluteIndex = galleryItems.indexOf(renderedItems[index]);
    setLightboxIndex(absoluteIndex);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoomLevel(1);
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    
    // Find index in the current filtered item list
    const currentItem = galleryItems[lightboxIndex];
    const filteredIndex = filteredItems.indexOf(currentItem);
    const nextFilteredIndex = (filteredIndex + 1) % filteredItems.length;
    
    // Convert back to absolute index
    const nextAbsoluteIndex = galleryItems.indexOf(filteredItems[nextFilteredIndex]);
    setLightboxIndex(nextAbsoluteIndex);
    setZoomLevel(1);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    
    const currentItem = galleryItems[lightboxIndex];
    const filteredIndex = filteredItems.indexOf(currentItem);
    const prevFilteredIndex = (filteredIndex - 1 + filteredItems.length) % filteredItems.length;
    
    const prevAbsoluteIndex = galleryItems.indexOf(filteredItems[prevFilteredIndex]);
    setLightboxIndex(prevAbsoluteIndex);
    setZoomLevel(1);
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => (prev === 1 ? 1.8 : 1));
  };

  return (
    <div className="flex-1 bg-bg-ivory pt-32 pb-20 relative selection:bg-primary selection:text-bg-ivory overflow-hidden">
      
      {/* Decors */}
      <div className="absolute top-20 left-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48" />
      </div>
      <div className="absolute bottom-0 right-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48 rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <SectionHeading
          subtitle="Adorning with Art"
          title="The Henna Gallery"
          description="Explore our portfolio of organic henna designs, categorised by styles. Click on any creation to preview details."
        />

        {/* Filters */}
        <div ref={galleryGridRef} className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedFilter(category);
                setCurrentPage(1); // reset pagination on filter change
              }}
              className={`px-5 py-2 text-xs sm:text-sm tracking-wider uppercase font-sans border transition-all duration-300 ${
                selectedFilter === category
                  ? "bg-primary text-bg-ivory border-primary shadow-sm"
                  : "bg-transparent text-primary/80 border-accent/20 hover:border-accent hover:text-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {renderedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {renderedItems.map((item, index) => (
                <motion.div
                  key={`${item.title}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <GalleryCard
                    src={item.src}
                    title={item.title}
                    category={item.category}
                    index={index}
                    onClick={() => openLightbox(index)}
                    priority={index < 3}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 font-sans text-primary/60">
            No work items found in this category.
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12 select-none">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 border transition-all duration-300 ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed border-accent/10 text-primary/30"
                  : "border-accent/20 text-primary hover:border-accent hover:text-accent cursor-pointer"
              }`}
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 text-xs sm:text-sm tracking-wider uppercase font-sans border transition-all duration-300 ${
                  currentPage === page
                    ? "bg-primary text-bg-ivory border-primary shadow-sm font-semibold"
                    : "bg-transparent text-primary/80 border-accent/20 hover:border-accent hover:text-accent cursor-pointer"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 border transition-all duration-300 ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed border-accent/10 text-primary/30"
                  : "border-accent/20 text-primary hover:border-accent hover:text-accent cursor-pointer"
              }`}
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-primary/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close trigger top right */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-bg-ivory hover:text-accent transition-colors z-50 p-2"
              aria-label="Close Lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Lightbox Metadata Header */}
            {galleryItems[lightboxIndex] && (
              <div className="absolute top-6 left-6 text-bg-ivory max-w-[calc(100%-80px)] z-40">
                <span className="font-script text-accent text-2xl tracking-wider block mb-1">
                  {galleryItems[lightboxIndex].category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold">
                  {galleryItems[lightboxIndex].title}
                </h3>
              </div>
            )}

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-bg-ivory/20 flex items-center justify-center text-bg-ivory hover:bg-bg-ivory/10 hover:border-accent hover:text-accent transition-all duration-300 z-50"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-bg-ivory/20 flex items-center justify-center text-bg-ivory hover:bg-bg-ivory/10 hover:border-accent hover:text-accent transition-all duration-300 z-50"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Zoom Tool */}
            <button
              onClick={toggleZoom}
              className="absolute bottom-6 right-6 text-bg-ivory hover:text-accent transition-colors z-50 flex items-center gap-1.5 font-sans text-xs tracking-wider uppercase bg-bg-ivory/5 border border-bg-ivory/10 px-4 py-2"
            >
              {zoomLevel === 1 ? (
                <>
                  <ZoomIn className="w-4 h-4 text-accent" />
                  <span>Zoom In</span>
                </>
              ) : (
                <>
                  <ZoomOut className="w-4 h-4 text-accent" />
                  <span>Zoom Out</span>
                </>
              )}
            </button>

            {/* Image Frame */}
            {galleryItems[lightboxIndex] && (
              <motion.div
                className="relative max-w-4xl max-h-[75vh] aspect-[4/3] w-full border border-accent/20 select-none overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="relative w-full h-full cursor-zoom-in"
                  animate={{ scale: zoomLevel }}
                  onClick={toggleZoom}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={galleryItems[lightboxIndex].src}
                    alt={galleryItems[lightboxIndex].title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1000px"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Footer index tracker */}
            {galleryItems[lightboxIndex] && (
              <div className="absolute bottom-6 left-6 text-bg-warm/60 font-serif text-sm">
                {filteredItems.indexOf(galleryItems[lightboxIndex]) + 1} / {filteredItems.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
