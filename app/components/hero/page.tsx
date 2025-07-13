"use client"
import Image from "next/image"
import HeroImage from "../../../public/FinalLogo.svg"
import Link from "next/link"
import { useState } from "react"
import { X } from "lucide-react" // Import X icon for closing the modal

export default function Hero() {
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false)

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 bg-white">
      <div className="relative">
        <h1 className="ml-[550px] absolute font-nav_link_font text-5xl text-[#245BA7] mt-28">Welcome to</h1>
        <Image src={HeroImage || "/placeholder.svg"} alt="8Senses Logo" width={931} height={380} priority />
      </div>
      <p className="max-w-2xl text-2xl text-[#456696] mt-4 px-4">
        Empowering children to reach their full potential through specialized therapy and compassionate care.
      </p>
      {/* <div className="mt-8 grid gap-4 md:flex md:space-x-6">
        {/* Custom button to open the modal - Enhanced Styling */}
        <button
          onClick={() => setIsAppointmentDialogOpen(true)}
          className="w-[250px] whitespace-nowrap h-[60px] bg-[#C83C92] hover:bg-[#b8327f] text-white px-8 py-4 text-xl rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#C83C92] focus:ring-opacity-50 shadow-lg"
        >
          Make an appointment
        </button>

        <Link href="/services">
          <button className="w-[250px] h-[60px] border-2 border-[#C83C92] text-[#C83C92] hover:bg-[#fff] bg-white px-8 py-4 text-xl rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#C83C92] focus:ring-opacity-50 shadow-lg">
            Explore our services
          </button>
        </Link>
      </div> */}

      {/* Custom Modal/Dialog - Enhanced Styling with Transparent Foggy Background */}
      {isAppointmentDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl animate-fade-in-up">
            {/* Close button */}
            <button
              onClick={() => setIsAppointmentDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col space-y-4 text-center">
              <h2 className="text-3xl font-extrabold text-[#245BA7]">Book Your Appointment</h2>
              <p className="text-lg text-[#456696] leading-relaxed">
                We believe in personalized care, and for appointments, we prefer to connect with you directly. Please
                visit our clinic during operating hours or give us a call to schedule your session.
              </p>
            </div>
            <div className="grid gap-3 py-6">
              <p className="text-md text-gray-700">
                Our friendly staff will be happy to assist you and find the best time for your child's needs.
              </p>
              <p className="text-md font-semibold text-gray-800">
                <span className="font-bold text-[#245BA7]">Clinic Address:</span> [Your Clinic Address Here]
              </p>
              <p className="text-md font-semibold text-gray-800">
                <span className="font-bold text-[#245BA7]">Phone:</span> [Your Phone Number Here]
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
      )}
    </section>
  )
}
