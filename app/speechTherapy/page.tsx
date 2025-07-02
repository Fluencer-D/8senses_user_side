import React from 'react'
import Navbar from '../components/navbar/page'
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
              text: "Each therapy journey starts with a thorough assessment to identify the child’s strengths and areas of improvement. Our speech therapists work closely with parents to set personalized goals based on the child’s needs."
            }
          ]
        },
        {
          title: "Warm-Up and Engagement Activities",
          points: [
            {
              text: "To make the child comfortable, we start with fun interactive exercises like singing, storytelling, or playful verbal games that prepare them for the session."
            },
            
          ]
        },
        {
          title: "Targeted Speech and Language Activities",
          points: [
            {
              bold: "Articulation Exercises –",
              text: " Teaching children how to pronounce sounds and words correctly."
            },
            {
              bold: "Language Development –",
              text: " Helping children understand words, sentences, and how to express their thoughts."
            },
            {
              bold: "Fluency Training –",
              text: " Guiding children with stammering or hesitant speech to speak more smoothly."
            },
            {
              bold: "Voice Therapy –",
              text: " Helping children with voice disorders modulate their pitch, tone, and volume."
            },
            {
              bold: "Social Communication Skills –",
              text: " Teaching appropriate gestures, expressions, and conversational techniques."
            },
            {
              bold: "Aids in Non-Verbal Communication-",
              text: " Helps with assistive hearing devices in hearing loss"
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
              text: "At the end of each session, we provide parents with feedback and simple exercises to reinforce progress at home."
            },
            {
              text: "Parental involvement is crucial for continued development beyond therapy sessions."
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
    <section className="mt-30 w-full bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
    {/* Text Content */}
    <div className="md:w-1/2">
      <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">
        What is Pediatric Speech Therapy?
      </h2>
      <p className="text-[#456696] text-[22px] leading-relaxed mb-6">
        Pediatric Speech Therapy is a specialized intervention designed to help children develop and improve their communication skills. It focuses on enhancing speech clarity, language comprehension, expression, fluency, and social communication. Speech Therapy also helps children who struggle with feeding and swallowing difficulties.
      </p>
      <p className="text-[#456696] text-[22px] leading-relaxed">
        At 8 Senses Pediatric Occupational Therapy Clinic, our expert speech therapists work with children facing challenges such as delayed speech, stammering, articulation difficulties, language disorders, and social communication delays. We create personalized therapy plans to help each child find their voice and confidently express themselves.
      </p>
    </div>
    
    {/* Oval-shaped Image with Pink Border */}
    <div className="md:w-1/2 flex justify-center">
      <div className="relative w-[320px] h-[420px] lg:w-[420px] lg:h-[480px]">
        <div>
          <Image
            src="/STbannerimg.png" 
            alt="Children in Speech Therapy session"
            width={420}
            height={480}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>
    

     {/* How Our OT Sessions Work Section */}
<div className="w-full bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
  {/* Heading Section */}
  <div className="text-left mb-12">
    <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">Why is Pediatric Speech Therapy Important for Children?</h2>
    <p className="text-[#456696] text-xl font-normal">Communication is a vital part of a child’s development. It allows them to express their needs, build relationships, and succeed in school and social settings. When a child has difficulty with speech or language, it can impact their confidence, academic progress, and social interactions.</p>
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
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Improves Speech Clarity</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-center max-w-xs">
          <li className="mb-2">Helps children pronounce words correctly, making it easier for them to be understood by others.</li>
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
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Enhances Language Development</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-center max-w-xs">
          <li className="mb-2">Supports children in understanding and using language effectively, whether verbally or through alternative communication methods.</li>
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
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Boosts Social Skills</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-center max-w-xs">
          <li className="mb-2">Encourages proper conversational skills, listening, turn-taking, and appropriate responses in different social settings.
          </li>
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
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Supports Fluency</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-center max-w-xs">
          <li className="mb-2"> Assists children who stammer or experience difficulty in speaking smoothly.
          </li>
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
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Aids in Feeding and Swallowing Disorders</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-center max-w-xs">
          <li className="mb-2"> Helps children who struggle with chewing, swallowing, or transitioning to solid foods.
          </li>
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
        <h3 className="text-xl font-semibold text-[#1E437A] mb-4">Prepares for Academic Success</h3>
        
        {/* Description */}
        <ul className="text-[#456696] text-center max-w-xs">
          <li className="mb-2">Strong language skills lay the foundation for reading, writing, and learning in school.
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
{/* Blue Banner Section */}
<div className="rounded-xl mb-30 w-[100%] bg-[#B0C2D8] py-10 px-4 sm:px-8 md:px-20 lg:px-10 2xl:ml-35 2xl:w-[80%]">
  <div className="max-w-6xl mx-auto text-center">
    <p className="text-[#1D2939] text-xl md:text-2xl font-medium mb-8 leading-relaxed">
    Early intervention is key! The earlier a child receives support, the better their chances of overcoming communication barriers and thriving in their daily life.
    </p>
  
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
          <h2 className="font-nav_link_font text-5xl text-[#1E437A] mb-4">What Happens During a Speech Therapy Session?</h2>
          <p className="text-[#456696] text-2xl max-w-7xl font-medium">
          At 8 Senses, each Speech Therapy session is carefully structured to make learning fun and effective. Our sessions last for 45 minutes, focusing on improving speech, language, and communication in an engaging way.
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