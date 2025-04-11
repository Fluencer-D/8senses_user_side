import React from 'react'
import Banner from '../components/CommonBanner/Banner'
import Navbar from '../components/navbar/page'
import STBanner from '@/public/STBanner.png'
import Consultation from '../components/consultation/page'
import Footer from '../components/footer/page'
import Image from 'next/image'
import AboutContainer from '@/public/AboutContainer.png'
import AboutContainer2 from '@/public/AboutContainer2.png'
import STimg1 from '@/public/STimg1.png'
import STimg2 from '@/public/STimg2.png'
import AbtIconContainer from '@/public/AbtIconContainer.png'
import DottedPattern from '../components/dottedPattern/page'

  
interface TherapyService {
    title: string;
    points: Array<{
      bold?: string;
      text: string;
    }>;
  }
  
  
  interface TherapyBenefit {
    title: string;
    description: string;
  }

interface TherapyBenefit {
    title: string;
    description: string;
}

const page = () => {
    const therapyServices: TherapyService[] = [
        {
          title: "Initial Assessment and Goal Setting",
          points: [
            {
              text: "The session begins with an evaluation to identify the child's strengths and challenges."
            },
            {
              text: "Speech therapists collaborate with parents to set personalized goals."
            }
          ]
        },
        {
          title: "Warm-Up and Engagement Activities",
          points: [
            {
              text: "Fun activities like singing, storytelling, and verbal games help children feel comfortable."
            },
            {
              text: "These interactive exercises set the stage for focused learning."
            }
          ]
        },
        {
          title: "Targeted Speech and Language Activities",
          points: [
            {
              bold: "Articulation Exercises –",
              text: " Helping children learn to pronounce sounds and words correctly by improving their tongue, lip, and jaw movements for clearer speech."
            },
            {
              bold: "Language Development –",
              text: " Enhancing a child's ability to understand and use words, form meaningful sentences, and express their thoughts effectively in conversations."
            },
            {
              bold: "Fluency Training –",
              text: " Assisting children who struggle with stammering or hesitant speech by guiding them through techniques to develop smooth, natural, and confident speech patterns."
            },
            {
              bold: "Voice Therapy –",
              text: " Managing pitch, tone, and volume."
            },
            {
              bold: "Social Communication Skills –",
              text: " Teaching gestures, expressions, and conversation techniques."
            }
          ]
        },
        {
          title: "Interactive Play-Based Learning",
          points: [
            {
              text: "Engaging tools like flashcards, toys, digital apps, and role-playing make learning enjoyable."
            },
            {
              text: "Storytelling and puppet shows help children practice communication naturally."
            }
          ]
        },
        {
          title: "Parent Involvement and Home Practice Guidance",
          points: [
            {
              text: "Parents receive feedback and home exercises to continue progress outside therapy."
            },
            {
              text: "Their active participation is essential for long-term improvement."
            }
          ]
        }
      ];    

    const therapyBenefits: TherapyBenefit[] = [
        {
          title: "Improves Speech Clarity",
          description: "Helps children pronounce words correctly for better communication."
        },
        {
          title: "Enhances Language Development",
          description: " Supports understanding and expression through verbal or alternative methods."
        },
        {
          title: "Boosts Social Skills",
          description: " Teaches turn-taking, listening, and appropriate responses in conversations."
        },
        {
          title: "Supports Fluency",
          description: "Helps children with stammering or hesitant speech to speak smoothly.    "
        },
        {
          title: "Aids in Feeding & Swallowing Disorders",
          description: "Assists children struggling with chewing, swallowing, or transitioning to solid foods."
        },
        {
          title: " Prepares for Academic Success        ",
          description: "Builds strong language skills that support reading, writing, and learning in school."
        }
      ];

  return (
    <>
    <Navbar/>
    <Banner
    title="Helping Children Find Their Voice with Speech Therapy"
    description="Helping children develop essential life skills, build confidence, and reach their full potential"
    imageSrc={STBanner}
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
                  src={STimg1}
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
          src={STimg2}
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
    
            <h2 className="w-full 2xl:-mb-1 lg:w-[822px] h-auto lg:h-[65px] font-nav_link_font font-semibold text-3xl lg:text-4xl leading-[65px] flex items-center tracking-wide text-[#1E437A] justify-center md:justify-start">
            Personalized therapy to improve speech, language, and communication skills for a brighter future
            </h2>
    
            <p className="mt-2 sm:mt-0 md:mt-14 2xl:mt-25 w-full lg:w-[730px] h-auto lg:h-[308px] font-urbanist text-xl md:text-lg lg:text-[30px] leading-[34px] md:leading-[32px] lg:leading-[44px] tracking-[0.02em] text-[#456696] text-center md:text-left">
            <span className='font-semibold'>The goal:</span> Pediatric speech therapy helps children develop communication skills by improving speech clarity, fluency, language comprehension, and social interaction.
            <br /> <br />
    <span className='font-semibold'>Who benefits:</span> It also supports children with feeding and swallowing difficulties.
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
        {therapyBenefits.slice(0, 9).map((benefit, index) => (
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
      <div className="text-left mb-12 relative">
        {/* Dotted Pattern */}
        <div className="hidden 2xl:block absolute justify-center mb-4 ml-30">
          <DottedPattern />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">How Our Sessions Work?</h2>
          <p className="text-[#456696] text-2xl max-w-6xl font-medium">
          At 8 Senses, each session lasts for 45 minutes and is designed to improve speech, language, and communication in an engaging way.
          </p>
        </div>
      </div>





      <div className="p-4 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - top card */}
        <div className="bg-[#245CA7] rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">{therapyServices[0].title}</h2>
          <ul className="space-y-4">
            {therapyServices[0].points.map((point, idx) => (
              <li key={idx} className="flex">
                <span className="mr-2">·</span>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Middle column - top card */}
        <div className="bg-[#245CA7] rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">{therapyServices[1].title}</h2>
          <ul className="space-y-4">
            {therapyServices[1].points.map((point, idx) => (
              <li key={idx} className="flex">
                <span className="mr-2">·</span>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right column - tall card spanning both rows */}
        <div className="bg-[#245CA7] rounded-2xl p-6 text-white row-span-2">
          <h2 className="text-2xl font-semibold mb-4">{therapyServices[2].title}</h2>
          <ul className="space-y-4">
            {therapyServices[2].points.map((point, idx) => (
              <li key={idx} className="flex">
                <span className="mr-2">·</span>
                <span>
                  {point.bold && <span className="font-semibold">{point.bold}</span>}
                  {point.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Left column - bottom card */}
        <div className="bg-[#245CA7] rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">{therapyServices[3].title}</h2>
          <ul className="space-y-4">
            {therapyServices[3].points.map((point, idx) => (
              <li key={idx} className="flex">
                <span className="mr-2">·</span>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Middle column - bottom card */}
        <div className="bg-[#245CA7] rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">{therapyServices[4].title}</h2>
          <ul className="space-y-4">
            {therapyServices[4].points.map((point, idx) => (
              <li key={idx} className="flex">
                <span className="mr-2">·</span>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>  

    </div>



    <Consultation/>
    <Footer/>
    </>
  )
}

export default page