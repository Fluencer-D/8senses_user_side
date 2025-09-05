
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import Consultation from "../components/consultation/page";
import Banner from "../components/CommonBanner/Banner";
import ServiceBannerImg from "../../public/ServiceBannerImg.png";
import services1img from "../../public/services1.png";
import AboutContainer from "../../public/AboutContainer.png";
import ServicesBaby1 from "../../public/servicesgroup.png";
import DottedPattern from "../components/dottedPattern/page";

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  isActive: boolean;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/services`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const servicesData: Service[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.services)
          ? data.services
          : [];

        const activeServices = servicesData.filter(
          (service) => service.isActive
        );
        setServices(activeServices);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <Navbar />

      <Banner
        title="Services"
        description="Expert care tailored to support your child's growth and development."
        imageSrc={ServiceBannerImg}
      />

      {/* Personalized Therapy Section */}
      <section className="relative mt-16 py-16 px-4 sm:px-8 md:px-20 lg:px-32 flex flex-col lg:flex-row items-center gap-12 max-w-[1300px] mx-auto">
        {/* Left Images */}
        <div className="hidden lg:flex relative w-[300px] xl:w-[400px]">
          <div className="absolute left-[-100px] top-[-150px] w-full">
            <Image
              src={ServicesBaby1}
              alt="Smiling Baby"
              width={350}
              height={410}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="absolute left-[200px] top-[50px] hidden 2xl:block z-10">
            <Image src={AboutContainer} alt="Shape" width={78} height={58} />
          </div>
        </div>

        {/* Right Text */}
        <div className="relative z-20">
          <div className="hidden xl:block absolute top-[-30px] right-[-80px] z-0">
            <DottedPattern />
          </div>

          <h2 className="text-[#1E437A] text-3xl md:text-4xl lg:text-[44px] font-nav_link_font leading-tight mb-6">
            Personalized Therapy for Every Child's Growth & Development
          </h2>

          <p className="text-[#456696] text-lg md:text-xl lg:text-[24px] leading-relaxed max-w-3xl font-nav_link_font">
            At 8 Senses Pediatric Occupational Therapy & Speech Therapy Clinic,
            we offer a range of specialized therapies designed to support
            children with developmental delays, sensory challenges, speech
            difficulties, and neurological conditions. Our expert team tailors
            each treatment plan to help children build essential skills, improve
            communication and gain independence in their daily lives.
          </p>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="relative py-20 px-4 sm:px-8 md:px-20 lg:px-32 max-w-[1300px] mx-auto">
        <div className="relative z-20 mb-12">
          <div className="hidden lg:block absolute left-[60px] -top-[60px] z-0">
            <DottedPattern />
          </div>

          <h2 className="text-[#1E437A] text-3xl md:text-4xl xl:text-[52px] font-nav_link_font text-center lg:text-left mb-4">
            Our Core Services
          </h2>
          <p className="text-[#456696] text-lg md:text-2xl xl:text-[28px] font-urbanist leading-relaxed text-center lg:text-left">
            Helping Children Develop Essential Skills for Growth & Independence
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C83C92]"></div>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-center">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="bg-[#245CA7] rounded-[24px] xl:rounded-[32px] p-6 text-white text-center shadow-lg flex flex-col justify-between min-h-[360px]"
                >
                  <div className="flex justify-center mb-4">
                    <Image
                      src={services1img}
                      alt="Service Icon"
                      width={100}
                      height={100}
                      className="w-[80px] h-[80px] xl:w-[100px] xl:h-[100px] object-contain"
                    />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-semibold mb-2">
                    {service.name}
                  </h3>
                  <p className="text-base xl:text-lg text-[#E7E7E7] leading-snug">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Consultation + Footer */}
      <div className="-mt-16">
        <Consultation />
        <Footer />
      </div>
    </div>
  );
};

export default Services;
