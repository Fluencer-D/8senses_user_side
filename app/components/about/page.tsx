import Image from "next/image";
import AboutContainer2 from "../../../public/AboutContainer2.png";
import AboutImg1 from "../../../public/sruthi.jpg";
import AboutDoctor from "../../../public/parul.jpg";


export default function AboutUs() {
  return (
    <section className="relative bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
      <div className="max-w-6xl mx-auto">
        {/* Images Row */}
        <div className="relative flex flex-col md:flex-row justify-center items-center mb-16 gap-6 md:gap-0">
          {/* Left image */}
          <div className="relative md:mr-12">
            <div className="relative rounded-xl overflow-hidden shadow-md mt-[40px] w-[400px] max-[1280px]:w-full max-[1280px]:mt-[20px]">
              <Image
                src={AboutImg1}
                alt="Dr. Shruti Patil"
                width={400}
                height={300}
                className="object-cover w-full h-auto rounded-lg transition-transform duration-300 hover:scale-105"
              />

            </div>
          </div>

          {/* Right image */}
          <div className="relative md:mr-12">
            <div className="relative rounded-xl overflow-hidden shadow-md mt-[40px] w-[400px] max-[1280px]:w-full max-[1280px]:mt-[20px]">
              <Image
                src={AboutDoctor}
                alt="Medical professional examining child"
                width={400}
                height={300}
                className="object-cover w-full h-auto rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-left text-[#245BA7]">
          <h2 className="text-center font-normal text-3xl md:text-5xl leading-tight tracking-wide text-[#1E437A] mb-8">
            About Us
          </h2>

          <div className="text-lg md:text-xl leading-relaxed tracking-[0.02em] text-[#456696] max-w-6xl mx-auto space-y-8">
            <p>
              Welcome to <strong>8 Senses Pediatric Occupational Therapy & Speech Therapy Clinic</strong>, where we are committed to unlocking every child’s full potential. Since our founding in 2014, we have been a trusted resource for families, offering expert care and unwavering support to children facing developmental challenges. Our dedicated team of compassionate therapists specializes in helping children with neurological, sensory, and motor difficulties—empowering them to thrive in every aspect of life.
            </p>

            <p>
              At 8 Senses, we take a holistic approach to therapy by combining advanced tools with personalized care plans tailored to each child's unique needs. From early intervention to ongoing therapy, our focus is on empowering children to overcome challenges and achieve important developmental milestones—while providing continuous support to parents along the journey. Our comprehensive services include Occupational Therapy and Speech Therapy, ensuring well-rounded care for your child's growth and success.
            </p>

            <p>
              Driven by our core belief that every child deserves the opportunity to succeed, 8 Senses proudly offers community workshops, free assessments for underprivileged children, and dedicated support for families in need. We don't just provide therapy—we build brighter futures for children and their families. Let us help your child discover their strengths and reach their fullest potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

