"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DottedPattern from "../dottedPattern/page";
import Services1 from "@/public/services1.png";
import Link from "next/link";

const services = [
  {
    id: "occupational-therapy",
    title: "Occupational Therapy",
    description:
      "Enhancing motor skills, coordination, and self-care abilities to help children achieve independence in daily activities.",
  },
  {
    id: "speech-language-therapy",
    title: "Speech & Language Therapy",
    description:
      "Improving communication, articulation, and language comprehension to help children express thoughts and interact confidently.",
  },
];

const Services = () => {
  const router = useRouter();

  const handleCardClick = (serviceId: string) => {
    if(serviceId=="occupational-therapy") router.push(`/occupationalTherapy`);
    else{
      router.push(`/speechTherapy`)
    }
  };

  return (
    <section className="py-16 text-white relative w-full md:w-[80%] h-auto md:h-[70%] mx-auto px-4 md:px-0">
      <div className="container mx-auto px-2 md:px-6">
        {/* Background Pattern */}
        {/* <div className="relative right-0 top-15 z-0">
          <DottedPattern />
        </div> */}
        {/* Heading & Button Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-left max-w-lg">
            <h2 className="text-[32px] md:text-[54px] font-font_nav_link text-[#1E437A]">
              Our Core Services
            </h2>
            <p className="text-[22px] md:text-[32px] text-[#456696] mt-2">
              Helping Children Develop Essential Skills for Growth & Independence
            </p>
          </div>
          <div className="mt-4 lg:mt-0 py-[30px] md:py-[85px] px-[15px] md:px-[32px]">
            <Link href={"/services"}>
            <button className="bg-[#C83C92] text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-[18px] md:text-[24px]">
              Explore our all services
            </button>
            </Link>
          </div>
        </div>

        {/* Services Grid (Centered) */}
        <div className="mt-10 flex flex-wrap justify-center gap-[20px] md:gap-[32px]">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(service.id)}
              className="bg-[#245CA7] h-auto min-h-[350px] md:h-[405px] w-full sm:w-[350px] md:w-[570px] rounded-[20px] md:rounded-[32px] p-4 md:p-6 text-center shadow-lg relative cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
            >
              {/* Card Content */}
              <div className="flex justify-center mb-4">
                <span className="p-2 md:p-4 rounded-full">
                  <Image src={Services1} alt="Service Icon" width={80} height={80} className="w-[80px] md:w-[110px] h-auto" />
                </span>
              </div>
              <h3 className="text-[22px] md:text-[28px] font-semibold text-white text-center tracking-[0.28px]">
                {service.title}
              </h3>
              <p className="text-[16px] md:text-[21px] text-[#E7E7E7] text-center leading-[28px] md:leading-[34px] tracking-[0.36px] md:tracking-[0.48px] mt-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default Services;