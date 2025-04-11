import Image from "next/image";
import AboutContainer from "../../../public/AboutContainer.png";
import AboutContainer2 from "../../../public/AboutContainer2.png";
import AboutImg1 from "../../../public/AboutImg1.png";
import AboutDoctor from "../../../public/AboutDoctor.png";
import DottedPattern from "../dottedPattern/page";

export default function AboutUs() {
  return (
    <section className="relative -mt-20 lg:mt-23 bg-white py-16 px-8 md:px-20 lg:px-32 flex flex-col md:flex-row lg:flex-row items-center gap-6 md:gap-8 lg:gap-12 lg:mb-40">
      {/* Images section */}
      <div className="relative flex flex-row items-center justify-center md:justify-start lg:items-start w-full md:w-[40%] lg:w-auto">
        {/* First image group - Baby image */}
        <div className="relative lg:absolute lg:left-[-120px] lg:top-[-100px] w-[150px] h-[200px] md:w-[150px] md:h-[200px] lg:w-[276px] lg:h-[507px] 2xl:w-[376px] 2xl:h-[507px] flex flex-col items-center">
          <div className="absolute top-[100px] md:top-[100px] lg:top-[275px] w-[30px] h-[140px] md:w-[30px] md:h-[170px] lg:w-[80px] lg:h-[378px] z-10">
            <Image src={AboutContainer2} alt="Background Shape" layout="fill" objectFit="contain" />
          </div>
          <div className="relative flex justify-center items-center w-full h-full z-20">
            <Image
              src={AboutImg1}
              alt="Smiling Baby"
              width={120}
              height={160}
              className="md:w-[120px] md:h-[160px] lg:w-[310px] lg:h-[410px]"
            />
          </div>
        </div>

        {/* Second image group - Doctor image */}
        <div className="relative ml-4 md:ml-4 lg:ml-0 lg:left-[250px] lg:top-[70px]">
          <div className="absolute left-[45px] md:left-[45px] lg:left-[108px] -top-3 md:-top-3 lg:-top-8 -right-1 md:-right-1 lg:-right-4 z-0">
            <Image 
              src={AboutContainer} 
              alt="Background Shape" 
              width={32} 
              height={22}
              className="md:w-[32px] md:h-[22px] lg:w-[82px] lg:h-[58px]" 
            />
          </div>
          <div className="relative z-10">
            <Image
              src={AboutDoctor}
              alt="Doctor Smiling"
              width={120}
              height={160}
              className="md:w-[120px] md:h-[160px] lg:w-[310px] lg:h-[410px]"
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="relative left-0 lg:left-29 text-left text-[#245BA7] mt-8 md:mt-0 lg:mt-0 md:w-[60%] lg:w-auto 2xl:left-59">
        {/* Dotted pattern - only for mobile and desktop, hidden on iPad Pro/Nest Hub */}
        <div className="absolute right-0 top-0 md:hidden lg:mt-10 lg:ml-[710px] lg:static z-10 block lg:hidden scale-75">
          <DottedPattern />
        </div>
        
        {/* Desktop-only dotted pattern */}
        <div className="absolute mt-15 ml-[710px] z-10 hidden lg:block">
          <DottedPattern />
        </div>

        <h2 className="w-full lg:w-[222px] h-auto lg:h-[65px] font-nav_link_font font-normal text-4xl lg:text-5xl leading-[65px] flex items-center tracking-wide text-[#1E437A] justify-center md:justify-start">
          About Us
        </h2>

        <div className="2xl:w-200 font-sans text-[#456696] px-4 md:px-6 lg:px-8 2xl:-ml-8 2xl:mt-8">
      <ul className="text-lg md:text-xl lg:text-2xl space-y-6 md:space-y-8">
        <li className="flex">
          <span className="font-bold mr-2">•</span>
          <div>
            <span className="font-bold">Specialization:</span> Pediatric Occupational & Speech Therapy
          </div>
        </li>
        
        <li className="flex">
          <span className="font-bold mr-2">•</span>
          <div>
            <span className="font-bold">Who We Help:</span> Children with developmental delays, sensory processing issues, autism, ADHD, genetics disorders, down syndrome, voice disorders, hearing disorders, swallowing and feeding issues, and many other neurological conditions
          </div>
        </li>
        
        <li className="flex">
          <span className="font-bold mr-2">•</span>
          <div>
            <span className="font-bold">Focus:</span> Early intervention
          </div>
        </li>
        
        <li className="flex">
          <span className="font-bold mr-2">•</span>
          <div>
            <span className="font-bold">Goal:</span> Help children build essential skills for daily life, school, and social interactions
          </div>
        </li>
      </ul>
    </div>
      </div>
    </section>
  );
}