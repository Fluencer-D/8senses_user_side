// "use client";

// import React from "react";
// import Image from "next/image";
// import DottedPattern from "../dottedPattern/page";
// import { FaQuoteLeft } from "react-icons/fa";
// import avatar from "@/public/testimonial.png";

// const Testimonials = () => {
//   return (
//     <section className="relative bg-transparent py-8 sm:py-12 md:py-16">
//       {/* Tablet-specific styling */}
//       <style jsx>{`
//         @media (min-width: 768px) and (max-width: 1024px) {
//           .quote-container {
//             padding-left: 50px !important;
//             padding-right: 20px !important;
//           }
//           .quote-icon {
//             margin-left: 0 !important;
//             left: 10px !important;
//             top: -5px !important;
//             width: 40px !important;
//             height: 40px !important;
//           }
//           .testimonial-text {
//             font-size: 26px !important;
//             line-height: 36px !important;
//           }
//           .profile-section {
//             margin-right: 150px !important;
//           }
//           .avatar-image {
//             width: 70px !important;
//             height: 70px !important;
//           }
//         }
//       `}</style>

//       <div className="container mx-auto px-4 sm:px-6 flex flex-col items-start md:items-center">
//         {/* Quote and Testimonial */}
//         <div className="quote-container relative max-w-full md:max-w-[1200px] h-auto md:h-[132px] text-left md:text-center">
//           <FaQuoteLeft className="quote-icon absolute text-[#C83C92] w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] md:w-[55px] md:h-[55px] mb-[-20px] sm:mb-[-25px] md:mb-[-2px] -mt-9 ml-[-10px] sm:ml-[-60px] md:ml-[-80px] xl:-ml-7 2xl:-ml-12" />
//           <p className="testimonial-text text-[#1E437A] font-urbanist text-[20px] sm:text-[24px] md:text-[30px] font-normal text-left md:text-center leading-[32px] sm:leading-[38px] md:leading-[44px] tracking-[0.4px] sm:tracking-[0.5px] md:tracking-[0.64px]">
//             8 Senses has been a game-changer for our son! The therapists are so patient and understanding. His fine motor skills have improved tremendously, and he's more confident than ever!
//           </p>
//         </div>

//         {/* Profile Section */}
//         <div className="profile-section flex items-start mt-[40px] sm:mt-[60px] md:mt-[80px] mr-[10px] sm:mr-[300px] md:mr-[1000px]">
//           <div className="avatar-image w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mr-3 sm:mr-3 md:mr-4">
//             <Image
//               src={avatar}
//               alt="Ananya S."
//               width={80}
//               height={80}
//               className="object-cover rounded-full border w-full h-full"
//             />
//           </div>
//           <div>
//             <h4 className="text-[#1E437A] text-xl sm:text-xl md:text-2xl font-semibold">
//               Ananya S.
//             </h4>
//             <p className="text-[#456696] text-base sm:text-lg md:text-xl">
//               Nashik
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Dotted Background Pattern - unchanged */}
//       <div className="absolute w-3xl bottom-15 right-9 hidden sm:block">
//         <DottedPattern />
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import DottedPattern from "../dottedPattern/page";
import avatar from "@/public/testimonial.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Dr. Shrruti Mam is amazing. Like sunlight in our life, she guided me about my son's behavior and therapy. Thanks to her care, my son has shown tremendous progress. Highly recommended for any parent seeking genuine help.",
    name: "Rashmi K.",
    location: "Pune",
  },
  {
    text: "Thanks to Dr. Shrruti Patil and Dr. Patil Diwan for their dedication. We began seeing positive changes within weeks. Their approach is deeply impactful and compassionate.",
    name: "Suresh D.",
    location: "Nashik",
  },
  {
    text: "What impressed me the most about Dr. Shrruti Patil was her customized approach to therapy. Each session felt tailored specifically to my child’s needs. Truly exceeded our expectations!",
    name: "Sneha M.",
    location: "Mumbai",
  },
  {
    text: "Dr. Shrruti Patil is excellent and very hardworking. She patiently listens to all our concerns and guides us with compassion. My child with autism has developed attention and communication after therapy with her.",
    name: "Amit S.",
    location: "Aurangabad",
  },
  {
    text: "8 Senses has been a game-changer for our son! The therapists are so patient and understanding. His fine motor skills have improved tremendously, and he's more confident than ever!",
    name: "Ananya S.",
    location: "Nashik",
  },
  {
    text: "I cannot thank 8 Senses enough. My child now looks forward to therapy sessions and shows consistent improvement. The team truly understands children.",
    name: "Meera T.",
    location: "Nagpur",
  },
  {
    text: "The therapists at 8 Senses treat each child as their own. Their warmth and expertise helped our child blossom socially and emotionally.",
    name: "Ritika V.",
    location: "Satara",
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 500;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative bg-transparent py-8 sm:py-12 md:py-16">
      <style jsx>{`
        .testimonial-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .testimonial-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .quote-container {
            padding-left: 50px !important;
            padding-right: 20px !important;
          }
          .quote-icon {
            left: 10px !important;
            top: -5px !important;
            width: 40px !important;
            height: 40px !important;
          }
          .testimonial-text {
            font-size: 26px !important;
            line-height: 36px !important;
          }
          .avatar-image {
            width: 70px !important;
            height: 70px !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button onClick={() => scroll("left")} className="p-2 z-10">
            <ChevronLeft className="w-8 h-8 text-[#1E437A]" />
          </button>

          {/* Scrollable Testimonials */}
          <div
            ref={scrollRef}
            className="testimonial-scroll-container flex gap-8 overflow-x-auto w-full scroll-smooth"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[90%] sm:min-w-[70%] md:min-w-[50%] bg-white rounded-lg shadow-lg p-6 relative"
              >
                <FaQuoteLeft className="quote-icon absolute text-[#C83C92] w-8 h-8 top-4 left-4" />
                <p className="testimonial-text text-[#1E437A] font-urbanist text-[18px] sm:text-[20px] md:text-[22px] leading-relaxed mt-8 mb-4">
                  {testimonial.text}
                </p>
                <div className="flex items-center mt-4">
                  <div className="avatar-image w-14 h-14 mr-3">
                    <Image
                      src={avatar}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover border w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-[#1E437A] text-lg font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-[#456696] text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button onClick={() => scroll("right")} className="p-2 z-10">
            <ChevronRight className="w-8 h-8 text-[#1E437A]" />
          </button>
        </div>
      </div>

      {/* Dotted Background */}
      <div className="absolute w-3xl bottom-15 right-9 hidden sm:block">
        <DottedPattern />
      </div>
    </section>
  );
};

export default Testimonials;
