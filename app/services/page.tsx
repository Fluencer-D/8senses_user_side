"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';
import Consultation from '../components/consultation/page';
import Banner from '../components/CommonBanner/Banner';
import ServiceBannerImg from '../../public/ServiceBannerImg.png'
import services1img from '../../public/services1.png'
import AboutContainer2 from '../../public/AboutContainer2.png'
import AboutContainer from '../../public/AboutContainer.png'
import ServicesBaby1 from '../../public/servicesgroup.png'
import ServicesBaby2 from '../../public/ServicesBaby2.png'
import DottedPattern from '../components/dottedPattern/page';


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
  const [featuredService, setFeaturedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/services`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const servicesData: Service[] = Array.isArray(data) ? data :
          Array.isArray(data?.data) ? data.data :
            Array.isArray(data?.services) ? data.services : [];

        if (servicesData.length > 0) {
          // Filter only active services
          const activeServices = servicesData.filter(service => service.isActive);

          // Find the featured service (assuming it's the Consultation service)
          const featured = activeServices.find(service =>
            service.category === "Consultation" &&
            service.name.includes("Counseling")
          );

          if (featured) {
            setFeaturedService(null);
            setServices(activeServices);
          } else {
            setServices(activeServices);
          }
        } else {
          // If no services are returned, set empty arrays
          setServices([]);
          setFeaturedService(null);
          setError("No services available at the moment.");
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services. Please try again later.");
        setServices([]);
        setFeaturedService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBookConsultation = () => {
    // Navigate to consultation booking page or open modal
    window.location.href = '/contact';
  };

  return (
    <div className=''>
      <Navbar />
      <Banner title="Services"
        description="Expert care tailored to support your child's growth and development."
        imageSrc={ServiceBannerImg} 
      />

      {/* Personalized Therapy Section - Desktop remains EXACTLY as is */}
      <section className="mt-23  m-auto py-16 px-4 sm:px-8 md:px-20 lg:px-32 flex flex-col lg:flex-row items-center gap-12 w-[80%] justify-between">
        {/* Images Container */}
        <div className="hidden lg:flex relative flex-col gap-10 items-center lg:items-start">
          {/* Baby Image */}
          <div className="absolute left-[-120px] lg:left-[-80px] xl:left-[-120px] top-[-170px] lg:top-[-120px] xl:top-[-170px] w-[376px] lg:w-[230px] xl:w-[376px] h-[507px] lg:h-[400px] xl:h-[507px] flex flex-col items-center">
            
            <div className="relative flex justify-center items-center w-full h-full z-20">
              <Image
                src={ServicesBaby1}
                alt="Smiling Baby"
                width={350}
                height={410}
                className=" w-[400px] h-[500px] -mt-32"
              />
            </div>
          </div>

          {/* Doctor Image*/}
          <div className="relative left-[250px] top-[20px] hidden 2xl:block">
            <div className="absolute left-[108px] -top-10 -right-4 z-0">
              <Image src={AboutContainer} alt="Background Shape" width={78} height={58} />
            </div>

          </div>
        </div>

        {/* Text Content*/}
        <div className="">
          <div className="hidden xl:block absolute mt-3 ml-[710px] z-10">
            <DottedPattern />
          </div>

          <h2 className="w-full lg:w-[522px] font-nav_link_font font-normal text-3xl md:text-4xl lg:text-[44px] lg:leading-[65px] flex justify-center lg:justify-start items-center tracking-wide text-[#1E437A] mb-8 lg:mb-[100px] 2xl:-mb-3">
            Personalized Therapy for Every Child's Growth & Development
          </h2>

          <p className="w-full lg:w-[730px] font-nav_link_font text-lg md:text-xl lg:text-[28px] lg:leading-[44px] tracking-[0.02em] text-[#456696] mt-6 lg:mt-10 px-4 md:px-0">
            At 8 Senses Pediatric Occupational Therapy & Speech Therapy Clinic, we offer a range of specialized therapies
            designed to support children with developmental delays, Sensory Challenges, Speech Difficulties, and
            Neurological Conditions. Our expert team tailors each treatment plan to help children build essential
            skills, improve communication, and gain independence in their daily lives.
          </p>

          {/* <div className="flex justify-center lg:justify-start mt-12 lg:mt-16 2xl:mt-3">
            <button
              onClick={handleBookConsultation}
              className="bg-[#C83C92] text-white text-base md:text-lg font-medium px-6 py-3 rounded-full inline-block cursor-pointer">
              Book a Consultation
            </button>
          </div> */}
        </div>
      </section>

      {/* Our Core Services Section - Desktop remains EXACTLY as is */}
      <section className='relative mt-34 py-16 px-4 sm:px-8 md:px-20 lg:px-32 flex flex-col lg:flex-row items-center lg:items-start gap-12 w-[80%] m-auto'>
        {/* Dotted Pattern - Hidden on mobile */}
        <div className="hidden  lg:block absolute -mt-50 ml-[125px] z-10 2xl:-mt-0 ">
          <DottedPattern />
        </div>

        {/* Heading Section - Adjusted for mid-size devices */}
        <div className='mt-9 w-full lg:w-auto xl:-ml-20  2xl:ml-0'>
          <h2 className='w-full lg:w-[522px] font-nav_link_font font-normal text-3xl md:text-4xl xl:text-[52px] xl:leading-[65px] flex justify-center lg:justify-start items-center tracking-wide text-[#1E437A] lg:-mt-7'>
            Our Core Services
          </h2>

          <p className="w-full lg:w-auto text-xl md:text-2xl xl:text-[30px] font-normal leading-relaxed xl:leading-[44px] tracking-wide xl:tracking-[0.64px] text-[#456696] font-urbanist mt-7 text-center lg:text-left">
            Helping Children Develop Essential <br className="hidden xl:inline" /> Skills for Growth & Independence
          </p>
        </div>

        {/* Desktop Button - EXACTLY as is */}
        {/* <div className="hidden xl:flex justify-start mt-2 ml-[478px]">
          <button
            onClick={handleBookConsultation}
            className="bg-[#C83C92] text-white text-lg font-medium px-6 py-3 rounded-full cursor-pointer">
            Book a Consultation
          </button>
        </div> */}

        {/* Tablet/Mid-size Button - Only shows on iPad Pro and Nest Hub */}
        {/* <div className="hidden lg:flex xl:hidden justify-center w-full mt-8">
          <button
            onClick={handleBookConsultation}
            className="bg-[#C83C92] text-white text-lg font-medium px-6 py-3 rounded-full">
            Book a Consultation
          </button>
        </div> */}

        {/* Mobile Button - Only shows on small screens */}
        {/* <div className="lg:hidden flex justify-center w-full mt-8">
          <button
            onClick={handleBookConsultation}
            className="bg-[#C83C92] text-white text-lg font-medium px-6 py-3 rounded-full">
            Book a Consultation
          </button>
        </div> */}
      </section>

      {/* Cards Section - Fixed to prevent content overflow */}
      <section className="py-16 text-white relative  m-auto">
        <div className="container mx-auto px-4 lg:px-6">
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

              {/* Regular Services Grid - Fixed height and overflow issues */}
              <div className="-mt-8 lg:-mt-18 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-[150px] xl:-ml-30 2xl:gap-[72px] 2xl:ml-0 justify-center">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-[#245CA7] h-auto min-h-[360px] xl:min-h-[400px] text-lg xl:text-[28px] font-nav_link_font w-full sm:w-[350px] xl:w-[400px] rounded-2xl xl:rounded-[32px] p-6 text-center shadow-lg relative flex flex-col items-center justify-between mx-auto"
                  >
                    {/* Icon Container */}
                    <div className="relative mb-4 mt-2">
                      <Image
                        src={services1img}
                        alt="Service Icon"
                        width={110}
                        height={110}
                        className="w-20 h-20 xl:w-[110px] xl:h-[110px]"
                      />
                    </div>

                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl xl:text-[24px] font-semibold text-white text-center mb-2">
                        {service.name}
                      </h3>
                      <p className="text-[#E7E7E7] text-center text-base xl:text-[18px] flex-grow overflow-hidden">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              
            </>
          )}
        </div>
      </section>

      <div className='-mt-32'>
        <Consultation />
        <Footer />
      </div>
    </div>
  )
}

export default Services


