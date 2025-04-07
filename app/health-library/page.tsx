"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/page";
import Consultation from "../components/consultation/page";
import Footer from "../components/footer/page";
import Image, { StaticImageData } from "next/image";
import BlogCard1 from "@/public/BlogCard1.png";
import BlogCard2 from "@/public/BlogCard2.png";
import BlogCard3 from "@/public/BlogCard3.png";
import BlogCard4 from "@/public/BlogCard4.png";
import BlogCard5 from "@/public/BlogCard5.png";
import Banner from "../components/CommonBanner/page";
import HealthBanner from '@/public/HealthBanner.png';

interface Disease {
  _id: string;
  name: string;
  description: string;
  symptoms: string[];
  category: string;
  featuredImage?: string;
  slug: string;
}

interface BlogCardProps {
  imageSrc: string | StaticImageData;
  title: string;
  description: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ imageSrc, title, description, link }) => {
  const getImageSource = (src: string | StaticImageData) => {
    if (typeof src === 'string') {
      try {
        const url = new URL(src);
        if (url.hostname === 'res.cloudinary.com') {
          return src.replace('/upload/', '/upload/f_auto,q_auto,w_800/');
        }
        return src;
      } catch {
        return src;
      }
    }
    return src;
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border-2 border-[#456696] w-full max-w-[780px] lg:max-w-none h-full flex flex-col">
      <div className="relative w-full aspect-[4/3] lg:h-[250px]">
        <Image 
          src={typeof imageSrc === 'string' ? getImageSource(imageSrc) : imageSrc}
          alt={title} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          onError={(e) => {
            const fallbackImages = [BlogCard1, BlogCard2, BlogCard3, BlogCard4, BlogCard5];
            const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
            (e.target as HTMLImageElement).src = randomFallback.src;
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[#1E437A] font-semibold text-lg sm:text-xl lg:text-2xl">{title}</h3>
        <p className="text-[#456696] text-sm sm:text-base lg:text-md mt-2 flex-grow">{description}</p>
        <a href={link} className="text-[#C83C92] font-bold text-base sm:text-lg lg:text-[18px] mt-3">
          Read blog
        </a>
      </div>
    </div>
  );
};

const Health = () => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Fallback data
  const fallbackDiseases: Disease[] = [
    {
      _id: '1',
      name: "Common Childhood Illnesses",
      description: "From fevers to sniffles, childhood illnesses are a part of growing up. Learn how to recognize symptoms and care for your little one with confidence.",
      symptoms: ["Fever", "Cough", "Runny nose"],
      category: "Other",
      slug: "common-childhood-illnesses"
    },
  ];

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://eight-senses-backend.onrender.com';
        const response = await fetch(`${apiUrl}/api/diseases`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const diseasesData: Disease[] = Array.isArray(data) ? data : 
                                     Array.isArray(data?.data) ? data.data : 
                                     Array.isArray(data?.diseases) ? data.diseases : [];
        
        setDiseases(diseasesData.length ? diseasesData : fallbackDiseases);
      } catch (err) {
        console.error("Failed to fetch diseases:", err);
        setError("Failed to load diseases. Showing default content.");
        setDiseases(fallbackDiseases);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  const filteredDiseases = selectedLetter
    ? diseases.filter((disease) => 
        disease.name.toUpperCase().startsWith(selectedLetter))
    : diseases;

  const getDiseasesCountByLetter = (letter: string) => {
    return diseases.filter(disease => 
      disease.name.toUpperCase().startsWith(letter)
    ).length;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Banner
          title="Understanding Pediatric Diseases"
          description="A trusted resource for parents to learn about common childhood illnesses, symptoms, and treatment options."
          imageSrc={HealthBanner}
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
        title="Understanding Pediatric Diseases"
        description="A trusted resource for parents to learn about common childhood illnesses, symptoms, and treatment options."
        imageSrc={HealthBanner}
      />

      {/* A-Z Alphabet Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 mb-10">        
        <div className="bg-[#F5F8FC] rounded-xl border border-[#456696] p-4">
          <h3 className="text-[#1E437A] font-semibold text-lg mb-3">Filter by letter:</h3>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium ${
                selectedLetter === null 
                  ? "bg-[#C83C92] text-white" 
                  : "bg-white text-[#456696] border border-[#456696]"
              }`}
            >
              All
            </button>
            
            {alphabet.map((letter) => {
              const count = getDiseasesCountByLetter(letter);
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium ${
                    selectedLetter === letter 
                      ? "bg-[#C83C92] text-white" 
                      : count > 0 
                        ? "bg-white text-[#456696] border border-[#456696]" 
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={count === 0}
                >
                  {letter}
                </button>
              );
            })}
          </div>
          
          {selectedLetter && (
            <p className="text-[#456696] mt-3 text-center">
              Showing diseases starting with "{selectedLetter}" 
              <button 
                onClick={() => setSelectedLetter(null)}
                className="ml-2 text-[#C83C92] underline"
              >
                Clear filter
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Disease Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 justify-items-center max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 -mb-20 sm:-mb-[160px]">
        {error && (
          <div className="col-span-3 text-center text-red-500">
            {error}
          </div>
        )}
        {filteredDiseases.length > 0 ? (
          filteredDiseases.map((disease) => (
            <BlogCard
              key={disease._id}
              imageSrc={disease.featuredImage || BlogCard1}
              title={disease.name}
              description={disease.description}
              link={`/health/${disease.slug || disease._id}`}
            />
          ))
        ) : (
          <div className="col-span-3 text-center text-[#456696] py-8">
            No diseases found{selectedLetter ? ` starting with "${selectedLetter}"` : ""}. 
            {selectedLetter && (
              <button 
                onClick={() => setSelectedLetter(null)}
                className="ml-2 text-[#C83C92] font-medium"
              >
                View all diseases
              </button>
            )}
          </div>
        )}
      </div>

      <Consultation />
      <Footer />
    </>
  );
};

export default Health;