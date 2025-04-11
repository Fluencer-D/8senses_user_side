"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar/page'
import Banner from '../components/CommonBanner/Banner'
import OTBanner from '@/public/OTBanner.png'
import Consultation from '../components/consultation/page'
import Footer from '../components/footer/page'
import AboutContainer from "@/public/AboutContainer.png";
import AboutContainer2 from "@/public/AboutContainer2.png";
import OT1 from '@/public/OT1.png'
import OT2 from '@/public/OT2.png'
import Image, { StaticImageData } from 'next/image'
import DottedPattern from '../components/dottedPattern/page'
import AbtIconContainer from '@/public/AbtIconContainer.png'
import Ushape from '@/public/Ushape.svg'
import OTimg1 from '@/public/OTimg1.png'
import OTimg2 from '@/public/OTimg2.png'
import OTimg3 from '@/public/OTimg3.png'
import OTimg4 from '@/public/OTimg4.png'

interface BenefitCard {
    title: string;
    bgColor: string;
    image: StaticImageData;
    imagePosition: string;
}

interface TherapyBenefit {
    title: string;
    description: string;
}

interface TherapyStep {
    number: number;
    title: string;
    description: string;
}

const OT = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Cards data for "Who Can Benefit?" section
    const benefitCards: BenefitCard[] = [
        {
            title: "Children with Autism Spectrum Disorder",
            bgColor: "bg-[#245BA7]",
            image: OTimg1,
            imagePosition: "left-17"
        },
        {
            title: "Kids with ADHD & Learning Disabilities",
            bgColor: "bg-[#C83C92]",
            image: OTimg2,
            imagePosition: "left-25"
        },
        {
            title: "Speech & Sensory Processing Disorders",
            bgColor: "bg-[#0CB24B]",
            image: OTimg3,
            imagePosition: "left-5"
        },
        {
            title: "Coordination & Balance Improvement",
            bgColor: "bg-[#456696]",
            image: OTimg4,
            imagePosition: "left-20"
        }
    ];

    // Check window size on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Set initial value
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Next slide function
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === benefitCards.length - 1 ? 0 : prev + 1));
    };

    // Previous slide function
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? benefitCards.length - 1 : prev - 1));
    };

    // Render a single benefit card
    const BenefitCard = ({ card, index }: { card: BenefitCard; index: number }) => {
        const titleLines = card.title.split(" & ").length > 1 
            ? [card.title.split(" & ")[0] + " &", ...card.title.split(" & ").slice(1)]
            : card.title.split(" ");
        
        return (
            <div className={`w-80 h-80 ${card.bgColor} rounded-3xl relative overflow-hidden`}>
                {/* Text Content */}
                <div className="p-4 text-white">
                    {titleLines.map((line: string, i: number) => (
                        <h3 key={i} className="text-2xl font-semibold leading-tight">{line}</h3>
                    ))}
                </div>
                
                {/* Image */}
                <div className={`absolute z-10 bottom-0 right-0 ${card.imagePosition}`}>
                    <Image
                        src={card.image}
                        alt={card.title}
                        className="object-cover"
                    />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute bottom-1 left-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 83 83" fill="none">
                        <path d="M45.8376 2.16808C51.1988 -1.25359 58.3501 1.07002 60.6763 6.98946L61.8472 9.96931C63.0778 13.1008 65.7864 15.4142 69.0718 16.1397L72.1982 16.8301C78.4086 18.2016 81.8224 24.9014 79.2815 30.7319L78.0024 33.667C76.6583 36.7514 76.9378 40.3025 78.7479 43.1387L80.4703 45.8375C83.892 51.1988 81.5684 58.3501 75.649 60.6762L72.6691 61.8472C69.5377 63.0778 67.2242 65.7864 66.4987 69.0718L65.8083 72.1982C64.4368 78.4086 57.737 81.8223 51.9065 79.2815L48.9715 78.0024C45.887 76.6583 42.3359 76.9377 39.4997 78.7478L36.8009 80.4703C31.4397 83.892 24.2883 81.5684 21.9622 75.6489L20.7912 72.6691C19.5607 69.5376 16.852 67.2242 13.5666 66.4987L10.4403 65.8083C4.22981 64.4368 0.816077 57.737 3.35694 51.9065L4.63601 48.9714C5.98016 45.887 5.70068 42.3359 3.89057 39.4997L2.1681 36.8009C-1.25357 31.4396 1.07004 24.2883 6.98949 21.9622L9.96933 20.7912C13.1008 19.5606 15.4142 16.852 16.1397 13.5666L16.8301 10.4402C18.2016 4.22978 24.9014 0.816054 30.7319 3.35692L33.667 4.63599C36.7514 5.98014 40.3026 5.70066 43.1387 3.89055L45.8376 2.16808Z" fill="#456696"/>
                    </svg>
                </div>
                
                <div className="absolute z-0 right-2 top-28">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 150 150" fill="none">
                        <circle cx="75" cy="75" r="60" stroke="#ffffff" strokeWidth="30" strokeOpacity="0.25"/>
                    </svg>
                </div>
                
                <div className="absolute z-0 right-58 top-40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
                        <path d="M15.4034 3.24298L28.4796 18.247L38.2451 0.905148L36.8819 20.7608L56.0497 15.4036L41.0457 28.4797L58.3875 38.2452L38.5319 36.882L43.8891 56.0498L30.813 41.0458L21.0475 58.3877L22.4107 38.532L3.24286 43.8893L18.2469 30.8131L0.905021 21.0476L20.7607 22.4108L15.4034 3.24298Z" fill="#F2F4F7"/>
                    </svg>
                </div>
            </div>
        );
    };

    const therapyBenefits: TherapyBenefit[] = [
        {
          title: "Enhances Independence",
          description: "Helps children develop self-care skills like dressing, eating, and writing, enabling them to perform daily activities with confidence."
        },
        {
          title: "Supports Physical Development",
          description: "Strengthens fine motor skills (grasping, cutting) and gross motor skills (balance, coordination), improving movement and control."
        },
        {
          title: "Improves Sensory Processing",
          description: "Assists children in managing sensory challenges, such as sensitivity to sounds, textures, and lights, helping them feel more comfortable."
        },
        {
          title: "Builds Social & Emotional Skills",
          description: "Encourages positive interactions, emotional regulation, and confidence, making it easier for children to connect with peers."
        },
        {
          title: "Prepares for School Success",
          description: "Enhances focus, problem-solving, and cognitive abilities, helping children adapt to classroom activities and learning environments."
        }
      ];
      
      const topRowSteps: TherapyStep[] = [
        {
          number: 1,
          title: "Assessment & Goal Setting",
          description: "Personalized evaluation & therapy plan"
        },
        {
          number: 2,
          title: "Warm-Up Activities",
          description: "Movement-based exercises for muscle activation"
        },
        {
          number: 3,
          title: "Skill Development",
          description: "Engaging activities to improve motor & coordination skills"
        }
      ];
    
      const bottomRowSteps: TherapyStep[] = [
        {
          number: 6,
          title: "Parental Guidance & Progress Review",
          description: "Tools like swings & textured objects to aid sensory balance"
        },
        {
          number: 5,
          title: "Play-Based Learning",
          description: "Games to build cognitive, social & problem-solving skills"
        },
        {
          number: 4,
          title: "Sensory Integration Therapy",
          description: "Reports & at-home strategies for continued improvement"
        }
      ];
      
      const reversedBottomRowSteps = [...bottomRowSteps].reverse();
    
  return (
    <>
    <Navbar/>
    <Banner
    title="Helping Kids Thrive with Occupational Therapy"
    description="Helping children develop essential life skills, build confidence, and reach their full potential"
    imageSrc={OTBanner}
    />
    <section className="relative xl:ml-10 -mt-20 lg:mt-23 bg-white py-16 px-8 md:px-20 lg:px-32 flex flex-col md:flex-row lg:flex-row items-center gap-6 md:gap-8 lg:gap-12 lg:mb-40">
      {/* Images section */}
      <div className="relative flex flex-row items-center justify-center md:justify-start lg:items-start w-full md:w-[40%] lg:w-auto">
        {/* First image group - Baby image */}
        <div className="relative lg:absolute lg:left-[-120px] lg:top-[-100px] w-[150px] h-[200px] md:w-[150px] md:h-[200px] lg:w-[276px] lg:h-[507px] 2xl:w-[376px] 2xl:h-[507px] flex flex-col items-center">
          <div className="absolute top-[110px] md:top-[100px] lg:top-[275px] w-[30px] h-[140px] md:w-[30px] md:h-[170px] lg:w-[80px] lg:h-[378px] z-10">
            <Image src={AboutContainer2} alt="Background Shape" layout="fill" objectFit="contain" />
          </div>
          <div className="relative flex justify-center items-center w-full h-full z-20">
            <Image
              src={OT1}
              alt="Smiling Baby"
              width={120}
              height={160}
              className="md:w-[120px] md:h-[160px] lg:w-[310px] lg:h-[410px]"
            />
          </div>
        </div>

        {/* Second image group - Doctor image - hidden only on Nest Hub Max */}
<div className="relative ml-4 md:ml-4 lg:ml-0 lg:left-[200px] xl:left-[250px] lg:top-[50px] xl:top-[70px] nesthub-max:hidden">
  <div className="absolute left-[45px] md:left-[45px] lg:left-[85px] xl:left-[108px] -top-3 md:-top-3 lg:-top-6 xl:-top-8 -right-1 md:-right-1 lg:-right-3 xl:-right-4 z-0">
    <Image 
      src={AboutContainer} 
      alt="Background Shape" 
      width={32} 
      height={22}
      className="md:w-[32px] md:h-[22px] lg:w-[65px] xl:w-[82px] lg:h-[45px] xl:h-[58px]" 
    />
  </div>
  <div className="relative z-10">
    <Image
      src={OT2}
      alt="Doctor Smiling"
      width={120}
      height={160}
      className="md:w-[120px] md:h-[160px] lg:w-[250px] xl:w-[310px] lg:h-[330px] xl:h-[410px]"
    />
  </div>
</div>
      </div>

      {/* Text content */}
      <div className="relative left-0  lg:left-30 text-left text-[#245BA7] md:mt-0 lg:mt-0 md:w-[60%] lg:w-auto 2xl:left-59">

        <h2 className="w-full 2xl:-mb-10 lg:w-[822px] h-auto lg:h-[65px] font-nav_link_font font-normal text-4xl lg:text-5xl leading-[65px] flex items-center tracking-wide text-[#1E437A] justify-center md:justify-start">
        What is Pediatric Occupational Therapy?
        </h2>

        <p className="mt-2 sm:mt-0 md:mt-14 2xl:mt-25 w-full lg:w-[730px] h-auto lg:h-[308px] font-urbanist text-xl md:text-lg lg:text-[30px] leading-[34px] md:leading-[32px] lg:leading-[44px] tracking-[0.02em] text-[#456696] text-center md:text-left">
        <span className='font-bold'>The goal:</span> Improve independence in daily activities like dressing, writing, feeding, and playing.
        <br /> <br />
<span className='font-bold'>Who benefits:</span> Children with ADHD, Autism, Sensory Processing Disorders, Developmental Delays, etc.
        </p>
      </div>
    </section>

      <div className="w-full bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
        {/* Heading Section */}
        <div className="text-left mb-12 relative">
          {/* Dotted Pattern */}
          <div className="hidden 2xl:block absolute justify-center mb-4 ml-30">
            <DottedPattern />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">What is Occupational Therapy?</h2>
            <p className="text-[#456696] text-xl max-w-5xl font-medium">
              At 8 Senses, we prioritize personalized therapy and early intervention to ensure children receive the support they need at the right time.
            </p>
          </div>
        </div>

        {/* Benefits Grid - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {therapyBenefits.slice(0, 3).map((benefit, index) => (
            <div 
              key={index}
              className="bg-[#245CA7] rounded-2xl text-white p-8 flex flex-col items-center text-center h-full"
            >
              {/* Circle with Check Icon */}
              <div className="relative mb-2 sm:mb-4 mt-2">
                                  <Image 
                                      src={AbtIconContainer} 
                                      alt="Check Icon" 
                                      width={80} 
                                      height={80} 
                                      className="sm:w-[110px] sm:h-[110px]"
                                  />
                                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60" fill="none">
                                          <path d="M50 17.5L25 42.5L12.5 30" stroke="white" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                  </div>
                              </div>
              
              {/* Benefit Title */}
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              
              {/* Benefit Description */}
              <p className="text-[#E7E7E7] text-base text-center">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits Grid - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {therapyBenefits.slice(3, 5).map((benefit, index) => (
            <div 
              key={index}
              className="bg-[#245CA7] rounded-2xl text-white p-8 flex flex-col items-center text-center h-full"
            >
              {/* Circle with Check Icon */}
              <div className="relative mb-2 sm:mb-4 mt-2">
                                  <Image 
                                      src={AbtIconContainer} 
                                      alt="Check Icon" 
                                      width={80} 
                                      height={80} 
                                      className="sm:w-[110px] sm:h-[110px]"
                                  />
                                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60" fill="none">
                                          <path d="M50 17.5L25 42.5L12.5 30" stroke="white" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                  </div>
                              </div>
              
              {/* Benefit Title */}   
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              
              {/* Benefit Description */}
              <p className="text-[#E7E7E7] text-base text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

    <div className="w-full bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
  {/* Heading Section */}
  <div className="text-left mb-12">
    <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">How Our OT Sessions Work?</h2>
    <p className="text-[#456696] text-xl font-medium">Each session is 45 minutes and includes:</p>
  </div>

  {/* Workflow Container */}
  <div className="relative max-w-6xl mx-auto">
    {/* Path Background Image */}
    <div className="hidden xl:block absolute inset-0 z-0">
      <Image
        src={Ushape}
        alt="Workflow Path"
        layout="fill"
        objectFit="contain"
        priority
        className='-mt-10 ml-21'
      />
    </div>

    {/* Top Row */}
    <div className="relative flex flex-col md:flex-row justify-between mb-24 md:mb-40">
      {topRowSteps.map((step, index) => (
        <div key={index} className="flex flex-col items-center text-center mb-16 md:mb-0 relative z-10 mt-3">
          {/* Circle with Number */}
          <div className="w-28 h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{step.number}</span>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-[#1E437A] mb-2">{step.title}</h3>
          
          {/* Description */}
          <p className="text-[#456696] text-center max-w-xs">{step.description}</p>
        </div>
      ))}
    </div>

    {/* Bottom Row - Desktop */}
    <div className="relative hidden md:flex flex-row justify-between">
      {bottomRowSteps.map((step, index) => (
        <div key={index} className="flex flex-col items-center text-center mb-16 md:mb-0 relative z-10 xl:-ml-12 xl:mt-10">
          {/* Circle with Number */}
          <div className="w-28 h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{step.number}</span>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-[#1E437A] mb-2">{step.title}</h3>
          
          {/* Description */}
          <p className="text-[#456696] text-center max-w-xs">{step.description}</p>
        </div>
      ))}
    </div>

    {/* Bottom Row - Mobile (reversed) */}
    <div className="relative flex flex-col md:hidden">
      {reversedBottomRowSteps.map((step, index) => (
        <div key={index} className="flex flex-col items-center text-center mb-16 relative z-10">
          {/* Circle with Number */}
          <div className="w-28 h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{step.number}</span>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-[#1E437A] mb-2">{step.title}</h3>
          
          {/* Description */}
          <p className="text-[#456696] text-center max-w-xs">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</div>

<div className="w-full bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
    <div className="text-left mb-12">
        <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">Who Can Benefit?</h2>
    </div>

    {/* Desktop View - All cards in a row */}
    <div className="hidden md:flex justify-between items-center space-x-4">
        {benefitCards.map((card, index) => (
            <BenefitCard key={index} card={card} index={index} />
        ))}
    </div>

    {/* Mobile Carousel View */}
    <div className="md:hidden">
        <div className="relative">
            {/* Current Slide */}
            <div className="flex justify-center">
                <BenefitCard card={benefitCards[currentSlide]} index={currentSlide} />
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
                {benefitCards.map((_, index) => (
                    <button 
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-[#245BA7]' : 'bg-gray-300'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#245BA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#245BA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
        </div>
    </div>
</div>

    <Consultation/>
    <Footer/>
    </>
  )
}

export default OT