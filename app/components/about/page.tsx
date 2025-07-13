import Image from "next/image";
import AboutContainer from "../../../public/AboutContainer.png";
import AboutContainer2 from "../../../public/AboutContainer2.png";
import AboutImg1 from "../../../public/sruthi.jpg";
import AboutDoctor from "../../../public/parul.jpg";
import DottedPattern from "../dottedPattern/page";

export default function AboutUs() {
  return (
    // Mission & Vision Section
    <section className="relative bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
      <div className="max-w-6xl mx-auto">
        {/* Images Container - Positioned above content */}
        <div className="max-w-6xl mx-auto">
          {/* Images Container - Positioned above content */}
          <div className="relative flex flex-col md:flex-row justify-center items-center mb-16 gap-6 md:gap-0">
            {/* Left image with decorative element */}
            <div className="relative md:mr-12">
              <div className="hidden 2xl:block absolute top-20 -right-100 z-0">
                <Image src={AboutContainer} alt="Background Shape" width={78} height={58} />
              </div>
              <div className="relative z-10">
                <Image
                  src={AboutImg1}
                  alt="Medical professional with child"
                  width={450}
                  height={250}
                  className="rounded-lg h-80 w-140"
                />
              </div>
              <div className="hidden 2xl:block absolute bottom-[70px] left-[220px]">
                <Image src={AboutContainer2} alt="Background Shape" width={80} height={80} />
              </div>
            </div>

            {/* Right image */}
            <div className="relative md:ml-12 mt-6 md:mt-30">
              <div className="relative z-10">
                <Image
                  src={AboutDoctor}
                  alt="Medical professional examining baby"
                  width={450}
                  height={250}
                  className="rounded-lg h-80 w-140"
                />
              </div>
            </div>

            {/* Dotted pattern */}
            <div className="absolute right-0 top-15 z-0">
              <DottedPattern />
            </div>
          </div>


          {/* Text Content - Centered below images */}
          <div className="text-left text-[#245BA7]">
            <h2 className="font- text-center font-normal text-3xl md:text-5xl leading-tight tracking-wide text-[#1E437A] mb-8">
              About Us
            </h2>
            <div className="font-nav_link_font text-lg md:text-xl leading-relaxed tracking-[0.02em] text-[#456696] max-w-6xl mx-auto space-y-8">
              <p>
                Welcome to 8 Senses Pediatric Occupational Therapy & Speech Therapy Clinic, where we are dedicated to unlocking every child's full potential. Since our founding in 2014, we've been a trusted resource for families, providing expert care and support for children with developmental challenges. Our team of compassionate therapists is committed to helping children with neurological, sensory, and motor difficulties thrive in all aspects of their lives.
              </p>

              <p>
                At 8 Senses, we take a holistic approach to therapy, combining cutting-edge tools with personalized care plans tailored to each child's unique needs. From early intervention to ongoing therapy, we focus on empowering children to overcome obstacles and reach key developmental milestones—while supporting parents every step of the way. Our services include Occupational Therapy, Speech Therapy, ensuring a comprehensive approach to your child's growth.
              </p>
              <p>
                Driven by our core belief that every child deserves the opportunity to succeed, we also offer community workshops, free assessments for underprivileged children, and support for families in need. At 8 Senses, we don't just treat children; we build a brighter future for families. Let us help your child discover their strengths and achieve their fullest potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}