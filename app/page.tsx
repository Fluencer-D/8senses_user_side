import Navbar from "./components/navbar/page";
import Hero from "./components/hero/page";
import About from "./components/about/page";
import Services from "./components/services/page";
import Testimonials from "./components/testimonials/page";
import Consultation from "./components/consultation/page";
import Footer from "./components/footer/page";
import WhyChoose8Senses from "./components/ChooseSection/page";
import AuthModal from "./components/auth/AuthModal";

export default function Home() {


  return (
    <main className="pt-[6rem]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <WhyChoose8Senses/> 
      <Consultation />
      <Footer />
    </main>
  );
}



// HERO
// "use client";

// import Image from "next/image";
// import HeroImage from "../../../public/FinalLogo.svg";
// import { Button } from "@/components/ui/Button";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Hero() {
//   // Simplified - we'll use CSS instead of JS for device detection
//   return (
//     <section className="relative flex flex-col items-center justify-center text-center py-24 bg-white">
//       <div className="relative">
//         {/* For desktop/tablets */}
//         <h1 className="hidden md:block ml-[550px] absolute font-nav_link_font text-5xl text-[#245BA7] mt-28">Welcome to</h1>
        
//         {/* For mobile devices with device-specific styles */}
//         <h1 className="md:hidden font-nav_link_font text-3xl text-[#245BA7] absolute ml-45 mt-8">Welcome to</h1>
        
//         {/* Add inline styles for specific devices */}
//         <style jsx>{`
//           /* Galaxy Z Fold - Folded */
//           @media screen and (min-width: 275px) and (max-width: 285px) {
//             h1.md\\:hidden {
//               margin-left: 20px !important;
//             }
//           }
          
//           /* Galaxy Z Fold - Unfolded */
//           @media screen and (min-width: 700px) and (max-width: 740px) and (max-height: 530px) {
//             h1.md\\:hidden {
//               margin-left: 20px !important;
//             }
//           }
          
//           /* Surface Duo */
//           @media screen and (min-width: 530px) and (max-width: 550px) and (min-height: 710px) and (max-height: 730px) {
//             h1.md\\:hidden {
//               margin-left: 35px !important;
//             }
//           }
//         `}</style>
        
//         <Image 
//           src={HeroImage} 
//           alt="8Senses Logo" 
//           width={931} 
//           height={380} 
//           priority 
//           className="max-w-full md:max-w-none"
//         />
//       </div>
//       <p className="max-w-2xl font-medium text-xl text-[#456696] px-4 2xl:ml-18 md:-mt-10 xl:-mt-10 z-20">Pediatric Occupational Therapy and Speech Therapy Clinic</p>
//       <p className="max-w-2xl text-2xl text-[#456696] mt-10 px-4">
//         Empowering children to reach their full potential through specialized therapy and compassionate care.
//       </p>
      
//       <div className="mt-8 flex md:flex-row flex-col md:space-x-6 space-y-4 md:space-y-0">
//         <Link href={'/booking-form'}><Button className="w-[250px] h-[60px] bg-[#C83C92] hover:bg-[#b8327f] text-white px-8 py-4 text-xl rounded-full transition duration-300 ease-in-out transform hover:scale-105">
//           Make an appointment
//         </Button></Link>
//         <Link href={'/booking-form'}><Button className="w-[250px] h-[60px] border-2 border-[#C83C92] text-[#C83C92] hover:bg-[#fff] bg-white px-8 py-4 text-xl rounded-full transition duration-300 ease-in-out transform hover:scale-105">
//           Explore our services
//         </Button></Link>
//       </div>
//     </section>
//   );
// }



// ABOUT

// import Image from "next/image";
// import AboutContainer from "../../../public/AboutContainer.png";
// import AboutContainer2 from "../../../public/AboutContainer2.png";
// import AboutImg1 from "../../../public/AboutImg1.png";
// import AboutDoctor from "../../../public/AboutDoctor.png";
// import DottedPattern from "../dottedPattern/page";

// export default function AboutUs() {
//   return (
//     // Mission & Vision Section
//     <section className="relative bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
//       <div className="max-w-6xl mx-auto">
//         {/* Images Container - Positioned above content */}
//         <div className="max-w-6xl mx-auto">
//     {/* Images Container - Positioned above content */}
//     <div className="relative flex justify-center mb-16">
//       {/* Left image with decorative element */}
//       <div className="relative mr-4 md:mr-12">
//         <div className="hidden 2xl:block absolute top-20 -right-100 z-0">
//           <Image src={AboutContainer} alt="Background Shape" width={78} height={58} />
//         </div>
//         <div className="relative z-10">
//           <Image
//             src={AboutImg1}
//             alt="Medical professional with child"
//             width={450}
//             height={250}
//             className="rounded-lg h-80 w-140"
//           />
//         </div>
//         <div className="hidden 2xl:block absolute bottom-[70px] left-[220px]">
//           <Image src={AboutContainer2} alt="Background Shape" width={80} height={80} />
//         </div>
//       </div>

//       {/* Right image */}
//       <div className="relative ml-4 md:ml-12 mt-30">
//         <div className="relative z-10">
//           <Image
//             src={AboutDoctor}
//             alt="Medical professional examining baby"
//             width={450}
//             height={250}
//             className="rounded-lg h-80 w-140"
//           />
//         </div>
//       </div>
      
//       {/* Dotted pattern */}
//       <div className="absolute right-0 top-15 z-0">
//         <DottedPattern/>
//       </div>
//     </div>

//     {/* Text Content - Centered below images */}
//     <div className="text-left text-[#245BA7]">
//       <h2 className="font- text-center font-normal text-3xl md:text-5xl leading-tight tracking-wide text-[#1E437A] mb-8">
//       About Us
//       </h2>

//       <div className="font-nav_link_font text-lg md:text-xl leading-relaxed tracking-[0.02em] text-[#456696] max-w-6xl mx-auto space-y-8">
//   <p>
//     Welcome to 8 Senses Pediatric Occupational Therapy & Speech Therapy Clinic, where we are dedicated to unlocking every child's full potential. Since our founding in 2014, we've been a trusted resource for families, providing expert care and support for children with developmental challenges. Our team of compassionate therapists is committed to helping children with neurological, sensory, and motor difficulties thrive in all aspects of their lives.
//   </p>

//   <p>
//     At 8 Senses, we take a holistic approach to therapy, combining cutting-edge tools with personalized care plans tailored to each child's unique needs. From early intervention to ongoing therapy, we focus on empowering children to overcome obstacles and reach key developmental milestones—while supporting parents every step of the way. Our services include occupational therapy, speech therapy, ensuring a comprehensive approach to your child's growth.
//   </p>

//   <p>
//     Driven by our core belief that every child deserves the opportunity to succeed, we also offer community workshops, free assessments for underprivileged children, and support for families in need. At 8 Senses, we don't just treat children; we build a brighter future for families. Let us help your child discover their strengths and achieve their fullest potential.
//   </p>
// </div>
      
      
//     </div>
//   </div>
    
//       </div>
//     </section>
//   );
// }




// Services

// "use client";

// import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import DottedPattern from "../dottedPattern/page";
// import Services1 from "@/public/services1.png";

// const services = [
//   {
//     id: "occupational-therapy",
//     title: "Occupational Therapy",
//     description:
//       "Enhancing motor skills, coordination, and self-care abilities to help children achieve independence in daily activities.",
//   },
//   {
//     id: "speech-language-therapy",
//     title: "Speech & Language Therapy",
//     description:
//       "Improving communication, articulation, and language comprehension to help children express thoughts and interact confidently.",
//   },
// ];

// const Services = () => {
//   const router = useRouter();

//   const handleCardClick = (serviceId: string) => {
//     if(serviceId=="occupational-therapy") router.push(`/occupationalTherapy`);
//     else{
//       router.push(`/speechTherapy`)
//     }
//   };

//   return (
//     <section className="py-16 text-white relative w-full md:w-[80%] h-auto md:h-[70%] mx-auto px-4 md:px-0">
//       <div className="container mx-auto px-2 md:px-6">
//         {/* Heading & Button Section */}
//         <div className="flex flex-col lg:flex-row items-center justify-between">
//           <div className="text-left max-w-lg">
//             <h2 className="text-[32px] md:text-[54px] font-font_nav_link text-[#1E437A]">
//               Our Core Services
//             </h2>
//             <p className="text-[22px] md:text-[32px] text-[#456696] mt-2">
//               Helping Children Develop Essential Skills for Growth & Independence
//             </p>
//           </div>
//           <div className="mt-4 lg:mt-0 py-[30px] md:py-[85px] px-[15px] md:px-[32px]">
//             <button className="bg-[#C83C92] text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-[18px] md:text-[24px]">
//               Explore our all services
//             </button>
//           </div>
//         </div>

//         {/* Services Grid (Centered) */}
//         <div className="mt-10 flex flex-wrap justify-center gap-[20px] md:gap-[32px]">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               onClick={() => handleCardClick(service.id)}
//               className="bg-[#245CA7] h-auto min-h-[350px] md:h-[405px] w-full sm:w-[350px] md:w-[570px] rounded-[20px] md:rounded-[32px] p-4 md:p-6 text-center shadow-lg relative cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
//             >
//               {/* Card Content */}
//               <div className="flex justify-center mb-4">
//                 <span className="p-2 md:p-4 rounded-full">
//                   <Image src={Services1} alt="Service Icon" width={80} height={80} className="w-[80px] md:w-[110px] h-auto" />
//                 </span>
//               </div>
//               <h3 className="text-[22px] md:text-[28px] font-semibold text-white text-center tracking-[0.28px]">
//                 {service.title}
//               </h3>
//               <p className="text-[16px] md:text-[21px] text-[#E7E7E7] text-center leading-[28px] md:leading-[34px] tracking-[0.36px] md:tracking-[0.48px] mt-2">
//                 {service.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Background Pattern */}
//       <div className="absolute top-[-730px] right-[1075px] h-full z-10 hidden md:block">
//         <DottedPattern />
//       </div>
//     </section>
//   );
// };

// export default Services;


// Testimonials

// "use client";

// import React from "react";
// import Image from "next/image";
// import DottedPattern from "../dottedPattern/page";
// import { FaQuoteLeft } from "react-icons/fa";
// import avatar from '@/public/testimonial.png'

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