"use client";

import React from "react";
import Image from "next/image";
import DottedPattern from "../dottedPattern/page";
import { FaQuoteLeft } from "react-icons/fa";
import avatar from '@/public/testimonial.png'

const Testimonials = () => {
  return (
    <section className="relative bg-transparent py-8 sm:py-12 md:py-16">
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
  );
};

export default Testimonials;