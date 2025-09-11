"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/page";
import Banner from "../components/CommonBanner/Banner";
import ContactBanner from "@/public/ContactBanner.png";
import Consultation from "../components/consultation/page";
import Footer from "../components/footer/page";
import Image from "next/image";
import Gallery1 from "@/public/Gallery1.png";
import Dummy1 from "@/public/topu1.jpg";
import Dummy2 from "@/public/topu2.jpg";
import Dummy3 from "@/public/topu3.jpg";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MeetOurTeam from "../components/meetOurTeam/page";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  order: number;
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    // ----------------- BACKEND FETCH (COMMENTED FOR NOW) -----------------

    const fetchGalleryData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/gallery`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data, "gallery");

        const items: GalleryItem[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.gallery)
              ? data.gallery
              : [];

        if (items.length > 0) {
          setGalleryItems(items);
          const featured =
            items.find((item: GalleryItem) => item.featured) || items[0];
          setFeaturedVideo(featured);
        }
      } catch (err: unknown) {
        console.error("Failed to fetch gallery:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load gallery. Showing default content."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
    // ----------------------------------------------------------------------

    // Using Dummy Images for Local Testing
    // const dummyData: GalleryItem[] = [
    //   {
    //     _id: "1",
    //     title: "Dummy Image 1",
    //     description: "Testing image 1",
    //     imageUrl: Dummy1.src,
    //     category: "test",
    //     featured: true,
    //     order: 1,
    //   },
    //   {
    //     _id: "2",
    //     title: "Dummy Image 2",
    //     description: "Testing image 2",
    //     imageUrl: Dummy2.src,
    //     category: "test",
    //     featured: false,
    //     order: 2,
    //   },
    //   {
    //     _id: "3",
    //     title: "Dummy Image 3",
    //     description: "Testing image 3",
    //     imageUrl: Dummy3.src,
    //     category: "test",
    //     featured: false,
    //     order: 3,
    //   },
    // ];

    // setGalleryItems(dummyData);
    // setFeaturedVideo(dummyData[0]);
    // setLoading(false);
  }, []);

  // Handle ESC and Arrow Keys
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  // Next Image
  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % galleryItems.length);
    }
  };

  // Previous Image
  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev! === 0 ? galleryItems.length - 1 : prev! - 1
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Banner
          title="Gallery"
          description="Contact us today and let's support your child's journey to growth and development."
          imageSrc={ContactBanner}
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C83C92]"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Banner
        title="Gallery"
        description="Contact us today and let's support your child's journey to growth and development."
        imageSrc={ContactBanner}
      />

      <div className="p-30 -mt-[50px]  mx-[10px] max-[1280px]:p-2 max-[1280px]:-mt-[20px] max-[1280px]:-mb-[30px] max-[1280px]:mx-2">
         <div className="w-full max-w-2xl mx-auto">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/FaS64bNMwSo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-[1280px]:gap-4">
          {galleryItems.map((item: GalleryItem, index) => (
            <div
              key={item._id}
              className="relative rounded-xl overflow-hidden shadow-md mt-[40px] w-[400px] max-[1280px]:w-full max-[1280px]:mt-[20px] cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={item.imageUrl || Gallery1}
                alt={item.title}
                width={400}
                height={300}
                className="object-cover w-full h-[286px] max-[1280px]:h-[200px] transition-transform duration-300 hover:scale-105"
                unoptimized={item.imageUrl?.startsWith("http")}
              />
            </div>
          ))}
          <div
              key={654}
              className="relative rounded-xl overflow-hidden shadow-md mt-[40px] w-[400px] max-[1280px]:w-full max-[1280px]:mt-[20px] cursor-pointer"
              
            >
          <Image
              src={Dummy1}
                alt={"notfound"}
                width={400}
                height={300}
                className="object-cover w-full h-[286px] max-[1280px]:h-[200px] transition-transform duration-300 hover:scale-105"
                
          />
          </div>


          <div
              key={456}
              className="relative rounded-xl overflow-hidden shadow-md mt-[40px] w-[400px] max-[1280px]:w-full max-[1280px]:mt-[20px] cursor-pointer"
              
            >
          <Image
              src={Dummy2}
                alt={"notfound"}
                width={400}
                height={300}
                className="object-cover w-full h-[286px] max-[1280px]:h-[200px] transition-transform duration-300 hover:scale-105"
                
          />
        </div>

          <div
              key={678}
              className="relative rounded-xl overflow-hidden shadow-md mt-[40px] w-[400px] max-[1280px]:w-full max-[1280px]:mt-[20px] cursor-pointer"
              
            >
          <Image
              src={Dummy3}
                alt={"notfound"}
                width={400}
                height={300}
                className="object-cover w-full h-[286px] max-[1280px]:h-[200px] transition-transform duration-300 hover:scale-105"
                
          />
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 transition-opacity duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-[90%] max-h-[85%] rounded-xl shadow-xl animate-zoom"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryItems[selectedIndex].imageUrl || Gallery1}
              alt="Preview"
              width={800}
              height={600}
              className="rounded-xl object-contain max-h-[80vh] transition-transform duration-300"
              unoptimized={galleryItems[selectedIndex].imageUrl?.startsWith(
                "http"
              )}
            />

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </button>

            {/* Left Arrow */}
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              onClick={handlePrev}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Arrow */}
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              onClick={handleNext}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}


      <div className="mt-12">
        {/*MeetOurTeam*/}
        <MeetOurTeam></MeetOurTeam>
      </div>
     


      <Consultation />
      <Footer />

      {/* Zoom Animation */}
      <style jsx>{`
        @keyframes zoom {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-zoom {
          animation: zoom 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Gallery;
