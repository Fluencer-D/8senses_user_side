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
import avatar from "@/public/placeholder.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Dr. Shruti patil mam is best occupational therapist in nashik.She is professional and very dedicated to her work.she make sure all your questions are answered.within 3-4 months I began to notice positive difference in my daughter.Thank you Shruti mam for helping us and guiding us in right direction.We are really glad to have u as therapist for our kid.I would highly recommend her as occupational therapist for your kid.",
    name: "Shital Deore",
    location: "Nashik",
  },
  {
    text: "Dr Shruti Patil is one the best Occupational Therapist I have seen. She is very knowledgeable, professional and is excellent at her work. She throughly assessed my child and develop the plan to help him areas needed. My son developed lot of skills during the timeframe she was consulting him in nasik. I highly recommend her and hoping we see her soon. Thanks a ton for your help.",
    name: "Sonam Kukreja",
    location: "Mumbai",
  },
  {
    text: "Dr Shruti patil ma'am is excellent and experienced occupational therapist in Nashik. She has very good experience in sensory skills fine motor life skills and gross motor skills as well. She has solutions for every queries. She behaves very strict as well as very kind with kids. Thank you so much ma'am with Gratitude.",
    name: "Sayali Bagde",
    location: "Aurangabad",
  },
  {
    text: "Her expertise as a Pediatric Occupational Therapist is truly remarkable. My daughter has been under her care, and I've seen tremendous progress in her development. Dr. Patil's personalized approach, attention to detail, and genuine concern for her patients make her stand out. She goes above and beyond to understand each child's unique needs and tailors the therapy accordingly.",
    name: "Param Panchal",
    location: "Nashik",
  },
  {
    text: "Dr. Shruti patil is awesome,excellent and very hardworking. she always listen my queries and guide me in better way.We are really grateful to have u as therapist for our daughter.Thank you so much ma'am for motivating and giving us hope. 8 sense clinic staff is also very helpful and friendly.I would highly recommend her as occupational therapist for your kid.",
    name: "Ekta Khare",
    location: "Nagpur",
  },
  {
    text: "8 Senses Occupational therapy center is an excellent therapy center for the kids with special needs. Our child has experienced significant growth in writing and many other day to day activities since beginning the therapy. We truly appreciate the dedication and support provided by Shruti mam and the team which is working for all the kids. The therapists are patient, kind, responsive, dedicated and supportive.We are really very happy to join 8 Senses Occupational therapy center.Thank you everyone for working so hard!!",
    name: "Gurukripa Mathematics",
    location: "Satara",
  },
  {
    text: "Dr. Shruti Patil is an excellent therapist with loving, caring, hard working and friendly nature. She is professional and dedicated. She helped me to facing reality with positive approach. She conscious future about her kids and heartily try to trat them. Dr. Patil is blessing for us. Like God. Love u and thank u mam.",
    name: "Dhruvi Shah",
    location: "Satara",
  },
  {
    text: "Dr. Shruti is always on her toes to make my child focussed and attentive. She is very assertive and optimistic in nature that gives us Hope.I have faith in her way of treatment, and I would recommend to the other parents too for the treatment of their kids.",
    name: "Aditi Bagul",
    location: "Satara",
  },
  {
    text: "I wanted to take a moment to express my gratitude for the excellent care my daughter Myra has received at your clinic. After attending just 11 sessions, we've noticed significant progress in her development. The improvements are truly remarkable, and we are thrilled with the results. Thank you for your dedication and support.",
    name: "Mukesh Nandwani",
    location: "Satara",
  },
  {
    text: "Very empowering and explains things very practically and to the point. She designs children's development treatment very precisely. Very cheerful and updated with her professional knowledge and treatment skills for children. Would definitely recommend to the parents with any doubts about their children to consult Dr Shruti mam.",
    name: "Pooja Choudhary",
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
    <section className="relative bg-transparent py-6 sm:py-10 md:py-14">
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
                                 className="min-w-[90%] sm:min-w-[70%] md:min-w-[50%] bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-5 relative"
              >
                <FaQuoteLeft className="quote-icon absolute text-[#C83C92] w-8 h-8 top-4 left-4" />
                                 <p className="testimonial-text text-[#1E437A] font-urbanist text-[18px] sm:text-[20px] md:text-[22px] leading-relaxed mt-6 sm:mt-7 md:mt-8 mb-3 sm:mb-4">
                  {testimonial.text}
                </p>
                                 <div className="flex items-center mt-3 sm:mt-4">
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
                    {/* <p className="text-[#456696] text-sm">
                      {testimonial.location}
                    </p> */}
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
