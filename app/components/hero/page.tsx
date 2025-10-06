"use client";
import Image from "next/image";
import HeroImage from "../../../public/FinalLogo.svg";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react"; // Import X icon for closing the modal

export default function Hero() {
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-8 sm:py-12 md:py-15 bg-white px-4">
      <div className="relative w-full max-w-4xl">
        <h1 className="font-nav_link_font text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#245BA7] mb-4 sm:mb-6">
          Welcome to
        </h1>
        <div className="relative w-full h-auto">
          <Image
            src={HeroImage || "/placeholder.svg"}
            alt="8Senses Logo"
            width={931}
            height={380}
            priority
            className="w-full h-auto max-w-full"
          />
        </div>
      </div>
      <p className="text-center text-lg sm:text-xl md:text-2xl text-[#C83C92] px-4 font-semibold mt-4 sm:mt-6 leading-tight max-w-4xl">
        Pediatric Occupational Therapy and Speech Therapy Clinic
      </p>
      <p className="max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl text-[#456696] mt-4 px-4 leading-relaxed">
        Empowering children to reach their full potential through specialized
        therapy and compassionate care.
      </p>
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex md:space-x-6 max-w-2xl w-full">
        <button
          onClick={() => setIsAppointmentDialogOpen(true)}
          className="w-full sm:w-[250px] h-[50px] sm:h-[60px] bg-[#C83C92] hover:bg-[#b8327f] text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#C83C92] focus:ring-opacity-50 shadow-lg flex items-center justify-center"
        >
          Make an appointment
        </button>

        <Link href="/services" className="w-full sm:w-[250px]">
          <button className="w-full h-[50px] sm:h-[60px] border-2 border-[#C83C92] text-[#C83C92] hover:bg-[#fff] bg-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#C83C92] focus:ring-opacity-50 shadow-lg flex items-center justify-center">
            Explore our services
          </button>
        </Link>
      </div>

      {/* Custom Modal/Dialog - Enhanced Styling with Transparent Foggy Background */}
      {isAppointmentDialogOpen && (
        <>
          <style jsx>{`
            .modal-scroll::-webkit-scrollbar {
              width: 8px;
            }
            .modal-scroll::-webkit-scrollbar-track {
              background: transparent;
              border-radius: 0 12px 12px 0;
            }
            .modal-scroll::-webkit-scrollbar-thumb {
              background: #d1d5db;
              border-radius: 12px;
            }
            .modal-scroll::-webkit-scrollbar-thumb:hover {
              background: #9ca3af;
            }
          `}</style>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4 backdrop-blur-xl">
            <div className="modal-scroll relative w-full max-w-md rounded-xl bg-white p-6 sm:p-8 shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto overflow-x-hidden">
            {/* Close button */}
            <button
              onClick={() => setIsAppointmentDialogOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="flex flex-col space-y-4 text-center">
              <h2 className="text-3xl font-extrabold text-[#245BA7]">
                Book Your Appointment
              </h2>
              <p className="text-lg text-[#456696] leading-relaxed">
                We believe in personalized care, and for appointments, we prefer
                to connect with you directly. Please visit our clinic during
                operating hours or give us a call to schedule your session.
              </p>
            </div>
            <div className="grid gap-3 py-6">
              <p className="text-md text-gray-700">
                Our friendly staff will be happy to assist you and find the best
                time for your child's needs.
              </p>
              <p className="text-md font-semibold text-gray-800">
                <span className="font-bold text-[#245BA7]">
                  Clinic Address:
                </span>{" "}
                301, 302 8Senses Pediatric Occupational Therapy and Speech
                Therapy Clinic, One Gangapur Building, above Reliance Digital,
                Jehan Circle, Gangapur Road, Nashik, Maharashtra, India-422013
              </p>
              <p className="text-md font-semibold text-gray-800">
                <span className="font-bold text-[#245BA7]">Phone:</span>{" "}
                9309187144 | 9766712546 | 86009 94239
              </p>
            </div>
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setIsAppointmentDialogOpen(false)}
                className="w-full max-w-[200px] h-12 bg-[#C83C92] hover:bg-[#b8327f] text-white text-lg font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#C83C92] focus:ring-opacity-50 shadow-md"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
        </>
      )}
    </section>
  );
}
