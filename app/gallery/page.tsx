"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/page';
import Banner from '../components/CommonBanner/Banner';
import ContactBanner from '@/public/ContactBanner.png';
import Consultation from '../components/consultation/page';
import Footer from '../components/footer/page';
import Image from 'next/image';
import Gallery1 from '@/public/Gallery1.png';
import DottedPattern from '../components/dottedPattern/page';
import { FaQuoteLeft } from "react-icons/fa";
import avatar from '@/public/testimonial.png'

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

  

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://eight-senses-backend.onrender.com';
        const response = await fetch(`${apiUrl}/api/gallery`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        
        // Handle different response structures with proper typing
        const items: GalleryItem[] = Array.isArray(data) ? data : 
                     Array.isArray(data?.data) ? data.data : 
                     Array.isArray(data?.gallery) ? data.gallery : [];

        if (items.length > 0) {
          setGalleryItems(items);
          const featured = items.find((item: GalleryItem) => item.featured) || items[0];
          setFeaturedVideo(featured);
        } else {
        }
      } catch (err: unknown) {
        console.error("Failed to fetch gallery:", err);
        setError(err instanceof Error ? err.message : "Failed to load gallery. Showing default content.");

      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar/>
        <Banner
          title="Gallery"
          description="Contact us today and let's support your child's journey to growth and development."
          imageSrc={ContactBanner}
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C83C92]"></div>
        </div>
        <Footer/>
      </>
    );
  }

  return (
    <>
    <Navbar/>
    <Banner
      title="Gallery"
      description="Contact us today and let's support your child's journey to growth and development."
      imageSrc={ContactBanner}
    />

    {/* Video Section */}
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      <div className="relative w-full h-[400px] max-[1280px]:h-[200px] rounded-xl overflow-hidden shadow-lg">
        {featuredVideo && (
          <Image
            src={featuredVideo.imageUrl || Gallery1}
            alt={featuredVideo.title || "Featured Video"}
            fill
            className="object-cover"
            unoptimized={featuredVideo.imageUrl?.startsWith('http')}
          />
        )}
        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
          <div className="bg-opacity-20 rounded-full p-4 hover:bg-opacity-30 transition-all duration-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-black" viewBox="0 0 20 20" fill="white">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Equipment Gallery - No changes to this section */}
    <div className="p-30 -mt-[50px] -mb-50 mx-[10px] max-[1280px]:p-2 max-[1280px]:-mt-[20px] max-[1280px]:-mb-[30px] max-[1280px]:mx-2">
      {error && (
        <div className="text-center text-red-500 mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-[1280px]:gap-4">
        {galleryItems.map((item: GalleryItem) => (
          <div key={item._id} className="relative rounded-xl overflow-hidden shadow-md mt-[40px] w-[400px] max-[1280px]:w-full max-[1280px]:mt-[20px]">
            <Image
              src={item.imageUrl || Gallery1}
              alt={item.title}
              width={400}
              height={300}
              className="object-cover w-full h-[286px] max-[1280px]:h-[200px]"
              unoptimized={item.imageUrl?.startsWith('http')}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white p-3 w-[55%] h-[20%] max-[1280px]:w-[65%] max-[1280px]:p-2">
              <h3 className="font-semibold max-[1280px]:text-sm">{item.title}</h3>
              <p className="text-gray-600 text-sm max-[1280px]:text-xs">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <section className="relative mt-50 bg-transparent py-8 sm:py-12 md:py-16">
      {/* Tablet-specific styling */}
      <style jsx>{`
        @media (min-width: 768px) and (max-width: 1024px) {
          .quote-container {
            padding-left: 50px !important;
            padding-right: 20px !important;
          }
          .quote-icon {
            margin-left: 0 !important;
            left: 10px !important;
            top: -5px !important;
            width: 40px !important;
            height: 40px !important;
          }
          .testimonial-text {
            font-size: 26px !important;
            line-height: 36px !important;
          }
          .profile-section {
            margin-right: 150px !important;
          }
          .avatar-image {
            width: 70px !important;
            height: 70px !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-start md:items-center">
        {/* Quote and Testimonial */}
        <div className="quote-container relative max-w-full md:max-w-[1200px] h-auto md:h-[132px] text-left md:text-center">
          <FaQuoteLeft className="quote-icon absolute text-[#C83C92] w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] md:w-[55px] md:h-[55px] mb-[-20px] sm:mb-[-25px] md:mb-[-2px] -mt-9 ml-[-10px] sm:ml-[-60px] md:ml-[-80px] xl:-ml-7 2xl:-ml-12" />
          <p className="testimonial-text text-[#1E437A] font-urbanist text-[20px] sm:text-[24px] md:text-[30px] font-normal text-left md:text-center leading-[32px] sm:leading-[38px] md:leading-[44px] tracking-[0.4px] sm:tracking-[0.5px] md:tracking-[0.64px]">
            8 Senses has been a game-changer for our son! The therapists are so patient and understanding. His fine motor skills have improved tremendously, and he's more confident than ever!
          </p>
        </div>

        {/* Profile Section */}
        <div className="profile-section flex items-start mt-[40px] sm:mt-[60px] md:mt-[80px] mr-[10px] sm:mr-[300px] md:mr-[1000px]">
          <div className="avatar-image w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mr-3 sm:mr-3 md:mr-4">
            <Image
              src={avatar}
              alt="Ananya S."
              width={80}
              height={80}
              className="object-cover rounded-full border w-full h-full"
            />
          </div>
          <div>
            <h4 className="text-[#1E437A] text-xl sm:text-xl md:text-2xl font-semibold">
              Ananya S.
            </h4>
            <p className="text-[#456696] text-base sm:text-lg md:text-xl">
              Nashik
            </p>
          </div>
        </div>
      </div>

      {/* Dotted Background Pattern - unchanged */}
      <div className="absolute w-3xl bottom-15 right-9 hidden sm:block">
        <DottedPattern />
      </div>  
    </section>
    
    <Consultation/>
    <Footer/>
  </>
  );
};

export default Gallery;