"use client";
import React, { useEffect, useState } from "react";
import AbtIconContainer from "@/public/AbtIconContainer.png";
import DottedPattern from "../dottedPattern/page";
import Image from "next/image";
import Gallery1 from "@/public/Gallery1.png";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  order: number;
}

const WhyChoose8Senses = () => {
  const features = [
    {
      title: "Passion for Child Development",
      description:
        "The founder of 8 Senses Clinic, experienced occupational and speech therapists herself, had a strong passion for supporting the holistic development of children – not just in physical and motor skills, but also in cognitive, emotional, and social growth.",
    },
    {
      title: "Expert Team",
      description:
        "Our experienced team members Occupational therapist, Speech therapist, Psychologist and Special educators specialize in early intervention, sensory processing, speech development and mainstreaming in academic skills",
    },
    {
      title: "Personalised care",
      description:
        "Every child is unique and we tailor our treatment programmers to meet their individual needs",
    },
    {
      title: "Creating a Unique Therapy Enviorment",
      description:
        "8 Senses Clinic was envisioned as a place where innovative therapy methods, such as sensory gyms and play-based learning, could be utilized effectively to make therapy a more enjoyable and engaging experience for children.",
    },
    {
      title: "Empowering Families",
      description:
        "A core part of 8 Senses Clinic's mission have been to work closely with families, providing them with resources, education, and support to actively participate in their child's developmental journey.",
    },
    {
      title: "Building a Community",
      description:
        "8 Senses Clinic have been founded with the goal of creating a community where children and their families feel supported, understood, and valued, fostering a sense of belonging and collaboration in the therapy process.",
    },
    {
      title: "Cutting edge equipment",
      description:
        "We use advanced tools like sensory integration equipment's and devices, oral replacement therapy, gross motor gym and fine motor aids and variety of toys range to help child motivated to participate and have fun in therapy sessions' and speech technology for the best outcomes. We also use gold standard assessment scales like Sensory Integration Praxis Test (SIPT), Bayleys developmental Scale of infant and toddlers and DASII",
    },
    {
      title: "Proven Results",
      description:
        "Our treatments helps children achieve their milestones, gain confidence and develop their daily living skills.",
    },
  ];
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

        // Handle different response structures with proper typing
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
        } else {
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
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C83C92]"></div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full -mt-3 bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
      {/* Heading Section */}
      <div className="text-left mb-12">
        {/* Dotted Pattern */}
        <div className="hidden 2xl:block absolute justify-center mb-4 ml-30">
          <DottedPattern />
        </div>
        <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">
          Why Choose 8 Senses?
        </h2>
        <p className="text-[#456696] text-3xl max-w-5xl font-medium">
          At 8Senses Pediatric Occupational Therapy and Speech Therapy Clinic,
          Nashik, we're more than just a therapy clinic, we're your partner in
          helping your child grow,learn and thrive! Here's why parents trust us:
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {features.slice(0, 6).map((feature, index) => (
          <div
            key={index}
            className="bg-[#245CA7] rounded-2xl text-white p-8 flex flex-col items-center text-center h-full"
          >
            {/* Circle with Check Icon */}
            <div className="relative mb-2 sm:mb-4 mt-2">
              <Image
                src={AbtIconContainer}
                alt="Check Icon"
                width={80}
                height={80}
                className="sm:w-[110px] sm:h-[110px]"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <path
                    d="M50 17.5L25 42.5L12.5 30"
                    stroke="white"
                    strokeWidth="3.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Feature Title */}
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>

            {/* Feature Description */}
            <p className="text-[#E7E7E7] text-base text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Row - Wide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.slice(6, 8).map((feature, index) => (
          <div
            key={index}
            className="bg-[#245CA7] rounded-2xl text-white p-8 flex flex-col items-center text-center h-full"
          >
            {/* Circle with Check Icon */}
            <div className="relative mb-2 sm:mb-4 mt-2">
              <Image
                src={AbtIconContainer}
                alt="Check Icon"
                width={80}
                height={80}
                className="sm:w-[110px] sm:h-[110px]"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <path
                    d="M50 17.5L25 42.5L12.5 30"
                    stroke="white"
                    strokeWidth="3.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Feature Title */}
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>

            {/* Feature Description */}
            <p className="text-[#E7E7E7] text-base text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-30">
        {/* Video Section */}
        <div className="w-full px-4 py-8 max-w-6xl mx-auto 2xl:-mb-30">
          <div className="relative w-full h-[400px] max-[1280px]:h-[200px] rounded-xl overflow-hidden ">
            {featuredVideo && (
              <Image
                src={featuredVideo.imageUrl || Gallery1}
                alt={featuredVideo.title || "Featured Video"}
                fill
                className="object-cover"
                unoptimized={featuredVideo.imageUrl?.startsWith("http")}
              />
            )}
            <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
              <div className="bg-opacity-20 rounded-full p-4 hover:bg-opacity-30 transition-all duration-300 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-black"
                  viewBox="0 0 20 20"
                  fill="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Gallery - No changes to this section */}
        <div className="p-30 -mt-[50px] -mb-50 -mx-[110px] max-[1280px]:p-2 max-[1280px]:-mt-[20px] max-[1280px]:-mb-[30px] max-[1280px]:mx-2">
          {error && (
            <div className="text-center text-red-500 mb-4">{error}</div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-[1280px]:gap-4">
            {galleryItems.map((item: GalleryItem) => (
              <div
                key={item._id}
                className="relative rounded-xl overflow-hidden mt-[40px] w-[400px] max-[1280px]:w-full max-[1280px]:mt-[20px]"
              >
                <Image
                  src={item.imageUrl || Gallery1}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-[286px] max-[1280px]:h-[200px]"
                  unoptimized={item.imageUrl?.startsWith("http")}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white p-3 w-[55%] h-[20%] max-[1280px]:w-[65%] max-[1280px]:p-2">
                  <h3 className="font-semibold max-[1280px]:text-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm max-[1280px]:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose8Senses;
