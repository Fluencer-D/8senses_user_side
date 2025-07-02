"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar/page'
import Consultation from '../components/consultation/page'
import Footer from '../components/footer/page'
import OT1 from '@/public/OT1.png'
import Image, { StaticImageData } from 'next/image'
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
            <div className={`w-80 h-80 ${card.bgColor} rounded-3xl relative overflow-hidden`} 
            key={`benefit-card-${index}`} 

            >
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
    <section className="mt-20 -mb-15 w-full bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
    {/* Text Content */}
    <div className="md:w-1/2">
      <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">
        Why is Pediatric Occupational Therapy Important for Children?
      </h2>
      <p className="text-[#456696] text-2xl font-medium leading-relaxed">
        Every child has unique strengths and challenges. For some children, certain developmental milestones—such as walking, dressing, feeding, or focusing on tasks—can be difficult to achieve. Pediatric Occupational Therapy is essential because it offers the necessary support to children and their families in achieving these milestones.
      </p>
    </div>
    
    {/* Circular Image */}
    <div className="md:w-1/2 flex justify-center">
      <div className="w-[320px] h-[320px] lg:w-[420px] lg:h-[420px]">
        <Image
          src="/OTimg.png" 
          alt="Children in therapy session"
          width={420}
          height={420}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>

  
</section>


<section className="relative bg-white py-16 px-8 md:px-20 lg:px-32 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 lg:mb-20">
  {/* Therapist Image section */}
  <div className="w-full md:w-[45%] lg:w-[50%] 2xl:-mr-30">
    <div className="relative">
      {/* Background container effect */}
      <div className="absolute left-[45px] -top-3 lg:-top-6 -right-1 lg:-right-3 z-0">
      </div>
      {/* Main image */}
      <div className="relative z-10">
        <Image
          src={OT1} // Replace with your therapist image
          alt="Occupational Therapist Working with Child"
          width={450}
          height={600}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  </div>

  {/* Text content */}
  <div className="w-full md:w-[55%] lg:w-[50%] text-left text-[#245BA7]">
    <h2 className="font-nav_link_font font-normal text-4xl lg:text-5xl tracking-wide text-[#1E437A] mb-8">
      Here's why Occupational Therapy is beneficial:
    </h2>

    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-[#245BA7] mb-2">Enhances Independence:</h3>
        <p className="text-lg text-[#456696]">
          Therapy helps children develop essential life skills such as dressing, eating, writing, and other activities that promote self-sufficiency.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-[#245BA7] mb-2">Supports Physical Development:</h3>
        <p className="text-lg text-[#456696]">
          It strengthens fine motor skills (e.g., using hands and fingers) and gross motor skills (e.g., balance and coordination).
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-[#245BA7] mb-2">Improves Sensory Processing:</h3>
        <p className="text-lg text-[#456696]">
          For children with sensory processing issues, therapy helps them better manage their reactions to sensory inputs (such as sounds, textures, or lights).
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-[#245BA7] mb-2">Promotes Social and Emotional Well-being:</h3>
        <p className="text-lg text-[#456696]">
          Occupational Therapy fosters confidence, emotional regulation, and social interaction, helping children better navigate social environments like school and peer groups.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-[#245BA7] mb-2">Prepares for School Success:</h3>
        <p className="text-lg text-[#456696]">
          By improving attention, focus, and cognitive skills, therapy supports a child's ability to learn and succeed academically.
        </p>
      </div>
    </div>
  </div>
</section>


    {/* How Our OT Sessions Work Section */}
<div className="w-full bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
  {/* Heading Section */}
  <div className="text-left mb-12">
    <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">What Happens During an Occupational Therapy Session?</h2>
    <p className="text-[#456696] text-lg font-medium mb-10">At 8 Senses, each Occupational Therapy session is designed to be engaging, fun, and therapeutic. Our sessions last for 45 minutes, during which we focus on specific goals tailored to each child’s needs.At 8 Senses, each Occupational Therapy session is designed to be engaging, fun, and therapeutic. Our sessions last for 45 minutes, during which we focus on specific goals tailored to each child’s needs.</p>
  </div>

  {/* Steps Container */}
  <div className="max-w-6xl mx-auto">
    {/* Top Row Steps */}
    <div className="flex flex-col md:flex-row justify-between mb-24">
      {/* Step 1 */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-0">
        {/* Circle with Number */}
        <div className="w-28 h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-4xl font-bold">1</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Assessment & Goal Setting</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-left max-w-xs">
          <li className="mb-2">• In the initial sessions, we assess the child's strengths, challenges, and interests.</li>
          <li>• We collaborate with parents to set realistic and meaningful goals.</li>
        </ul>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-0">
        {/* Circle with Number */}
        <div className="w-28 h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-4xl font-bold">2</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Warm-Up Activities</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-left max-w-xs">
          <li className="mb-2">• Each session begins with warm-up activities to prepare the child's body and mind for therapy.</li>
          <li>• These can include movement-based exercises, stretching, or balance tasks to engage their muscles and senses.</li>
        </ul>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-0">
        {/* Circle with Number */}
        <div className="w-28 h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-4xl font-bold">3</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Skill Development</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-left max-w-xs">
          <li className="mb-2">• The therapist guides the child through targeted activities to develop fine motor skills, hand-eye coordination, and balance.</li>
          <li>• These can include tasks like using playdough, drawing, cutting, or working with blocks.</li>
        </ul>
      </div>
    </div>

    {/* Bottom Row Steps */}
    <div className="flex flex-col md:flex-row justify-between">
      {/* Step 4 */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-0">
        {/* Circle with Number */}
        <div className="w-28 h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-4xl font-bold">4</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Sensory Integration</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-left max-w-xs">
          <li className="mb-2">• For children with sensory processing issues, we engage them in activities that help them better respond to sensory input.</li>
          <li>• This could include using swings, trampolines, or textured toys to balance their sensory systems.</li>
        </ul>
      </div>

      {/* Step 5 */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-0">
        {/* Circle with Number */}
        <div className="w-28 h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-4xl font-bold">5</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Play-Based Learning</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-left max-w-xs">
          <li className="mb-2">• Play is central to our sessions, as it motivates children while improving their problem-solving, communication, and social interaction skills.</li>
        </ul>
      </div>

      {/* Step 6 */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-0">
        {/* Circle with Number */}
        <div className="w-28 h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-4xl font-bold">6</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Progress Review and Parental Involvement</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-left max-w-xs">
          <li className="mb-2">• At the end of each session, we review the child's progress and provide parents with feedback and suggestions for reinforcing skills at home.</li>
        </ul>
      </div>
    </div>
  </div>
</div>


{/* Blue Banner Section */}
<div className="rounded-xl w-[100%] bg-[#B0C2D8] py-16 px-4 sm:px-8 md:px-20 lg:px-10 2xl:ml-35 2xl:w-[80%]">
  <div className="max-w-6xl mx-auto text-center">
    <p className="text-[#1D2939] text-xl md:text-2xl font-medium mb-8 leading-relaxed">
      Through our personalized approach, we ensure that each session not only addresses therapy goals but also fosters a joyful, supportive environment where children feel empowered to grow.
    </p>
    
    <p className="text-[#1D2939] text-xl md:text-2xl font-medium leading-relaxed">
      Let us help your child thrive through Pediatric Occupational Therapy at 8 Senses Pediatric Occupational Therapy Clinic, where every session is a step toward a brighter future!
    </p>
  </div>
</div>

 {/* "Who Can Benefit?" section - modified to use isMobile */}
 <div className="w-full bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
        <div className="text-left mb-12">
            <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">Who Can Benefit from Occupational Therapy?</h2>
        </div>
        {/* Desktop View - All cards in a row - now using isMobile */}
        {!isMobile && (
            <div className="flex justify-between items-center space-x-4">
                {benefitCards.map((card, index) => (
                    <BenefitCard key={index} card={card} index={index} />
                ))}
            </div>
        )}

        {/* Mobile Carousel View - now using isMobile */}
        {isMobile && (
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
                    className="z-20 absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#245BA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        )}
    </div>

    <Consultation/>
    <Footer/>
    </>
  )
}

export default OT