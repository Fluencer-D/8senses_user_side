"use client";
import Image from "next/image";
import consultation from "@/public/consultation.png";
import React from "react";
import Link from "next/link";

const Consultation = () => {
  return (
    <section className="relative h-[450px] w-full flex items-center justify-center text-white mt-[160px] -mb-24">
      {/* Mobile-specific styling */}
      <style jsx>{`
        @media (max-width: 767px) {
          section {
            height: 500px !important;
            margin-top: 80px !important;
          }
          .content-container {
            width: 100% !important;
            height: auto !important;
            padding: 0 20px !important;
          }
          h2 {
            font-size: 32px !important;
            line-height: 1.3 !important;
          }
          p {
            font-size: 18px !important;
            line-height: 26px !important;
            margin-top: 16px !important;
          }
          .button-group {
            flex-direction: column !important;
            gap: 16px !important;
            margin-top: 24px !important;
          }
          button {
            width: 100% !important;
            height: 56px !important;
            font-size: 16px !important;
            padding: 0 24px !important;
          }
        }
      `}</style>

      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src={consultation}
          alt="Consultation Background"
          layout="fill"
          objectFit="cover"
          className="brightness-70"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="content-container relative z-10 text-center px-6 w-[753px] h-[251px]">
        <h2 className="text-[54px] font-medium text-white tracking-[0.54px] text-center font-nav_link_font">
          Book a Consultation Today!
        </h2>
        <p className="mt-4 text-[23px] leading-[34px] tracking-[0.48px] font-normal text-[#E7E7E7] max-w-2xl mx-auto text-center">
          Get expert Pediatric Occupational Therapy and Speech Therapy tailored to your child's needs. Early intervention makes a difference!
        </p>
      </div>
    </section>
  );
};

export default Consultation;