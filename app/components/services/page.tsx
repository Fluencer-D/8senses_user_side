"use client";

import React, { useState } from "react";
import Image from "next/image";
import DottedPattern from "../dottedPattern/page";
import Services1 from "@/public/services1.png";

const services = [
  {
    title: "Occupational Therapy",
    description:
      "Enhancing motor skills, coordination, and self-care abilities to help children achieve independence in daily activities.",
      subServices: [
        "Speech & Language Therapy",
        "Speech & Language Therapy",
        "Speech & Language Therapy",
        "Speech & Language Therapy",
        "Speech & Language Therapy"
      ]
  },
  {
    title: "Speech & Language Therapy",
    description:
      "Improving communication, articulation, and language comprehension to help children express thoughts and interact confidently.",
    subServices: [
      "Speech & Language Therapy",
      "Speech & Language Therapy",
      "Speech & Language Therapy",
      "Speech & Language Therapy",
      "Speech & Language Therapy"
    ]
  },
];

const Services = () => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  return (
    <section className="py-16 text-white relative w-full md:w-[80%] h-auto md:h-[70%] mx-auto px-4 md:px-0">
      <div className="container mx-auto px-2 md:px-6">
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
            <button className="bg-[#C83C92] text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-[18px] md:text-[24px]">
              Explore our all services
            </button>
          </div>
        </div>

        {/* Services Grid (Centered) */}
        <div className="mt-10 flex flex-wrap justify-center gap-[20px] md:gap-[32px]">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#245CA7] h-auto min-h-[350px] md:h-[405px] w-full sm:w-[350px] md:w-[570px] rounded-[20px] md:rounded-[32px] p-4 md:p-6 text-center shadow-lg relative overflow-visible"
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

              {/* Dropdown Toggle Button */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center mt-6">
                <button
                  onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                  className="text-white transition-transform duration-300 ease-in-out"
                  style={{ transform: dropdownOpen === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Dropdown Content - Positioned absolutely over the content */}
              <div 
                className={`absolute left-0 right-0 top-[94%] bg-[#245CA7] rounded-b-[20px] md:rounded-b-[32px] z-10 overflow-hidden transition-all duration-300 ease-in-out ${
                  dropdownOpen === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                }`}
                style={{
                  boxShadow: dropdownOpen === index ? '0 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
                  transform: dropdownOpen === index ? 'translateY(0)' : 'translateY(-10px)',
                }}
              >
                {service.subServices && (
                  <div className="py-4 md:py-6 px-4 md:px-6 flex flex-col space-y-3 md:space-y-4 text-center">
                    {service.subServices.map((subService, subIndex) => (
                      <div 
                        key={subIndex} 
                        className="text-white text-[18px] md:text-[24px] transition-opacity"
                        style={{
                          opacity: dropdownOpen === index ? 1 : 0,
                          transitionDelay: `${subIndex * 0.05}s`
                        }}
                      >
                        {subService}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-[-730px] right-[1075px] h-full z-10 hidden md:block">
        <DottedPattern />
      </div>
    </section>
  );
};

export default Services;