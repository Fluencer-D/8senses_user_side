import React from 'react'
import Navbar from '../components/navbar/page'
import Consultation from '../components/consultation/page'
import Footer from '../components/footer/page'
import Image from 'next/image'
import DottedPattern from '../components/dottedPattern/page'

  
interface TherapyService {
    title: string;
    points: Array<{
      bold?: string;
      text: string;
    }>;
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


  return (
    <>
    <Navbar/>
    <section className="mt-30 w-full bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-20 lg:px-32">
  <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
    {/* Text Content */}
    <div className="md:w-1/2 order-2 md:order-1">
      <h2 className="font-nav_link_font text-3xl sm:text-4xl md:text-5xl text-[#1E437A] mb-4 text-center md:text-left">
        What is Pediatric Speech Therapy?
      </h2>
      <p className="text-[#456696] text-lg sm:text-xl md:text-[22px] leading-relaxed mb-4 md:mb-6 text-center md:text-left">
        Pediatric Speech Therapy is a specialized intervention designed to help children develop and improve their communication skills. It focuses on enhancing speech clarity, language comprehension, expression, fluency, and social communication. Speech Therapy also helps children who struggle with feeding and swallowing difficulties.
      </p>
      <p className="text-[#456696] text-lg sm:text-xl md:text-[22px] leading-relaxed text-center md:text-left">
        At 8 Senses Pediatric Occupational Therapy Clinic, our expert speech therapists work with children facing challenges such as delayed speech, stammering, articulation difficulties, language disorders, and social communication delays. We create personalized therapy plans to help each child find their voice and confidently express themselves.
      </p>
    </div>
    
    {/* Image */}
    <div className="md:w-1/2 flex justify-center order-1 md:order-2">
      <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] lg:w-[420px] lg:h-[480px]">
        <div>
          <Image
            src="/STbannerimg.png" 
            alt="Children in Speech Therapy session"
            width={420}
            height={480}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</section>
    

     {/* How Our OT Sessions Work Section */}
<div className="w-full bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-20 lg:px-32">
  {/* Heading Section */}
  <div className="text-center md:text-left mb-8 sm:mb-12">
    <h2 className="font-nav_link_font text-3xl sm:text-4xl md:text-5xl text-[#1E437A] mb-4">Why is Pediatric Speech Therapy Important for Children?</h2>
    <p className="text-[#456696] text-lg sm:text-xl font-normal max-w-4xl mx-auto md:mx-0">Communication is a vital part of a child's development. It allows them to express their needs, build relationships, and succeed in school and social settings. When a child has difficulty with speech or language, it can impact their confidence, academic progress, and social interactions.</p>
  </div>

  {/* Steps Container */}
  <div className="max-w-6xl mx-auto">
    {/* Mobile: Single column, Desktop: Grid layout */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-8">
      {/* Step 1 */}
      <div className="flex flex-col items-center text-center">
        {/* Circle with Number */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">1</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-[#1E437A] mb-3 md:mb-4">Improves Speech Clarity</h3>
        
        {/* Description */}
        <p className="text-[#456696] text-sm sm:text-base text-center max-w-xs">
          Helps children pronounce words correctly, making it easier for them to be understood by others.
        </p>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-center text-center">
        {/* Circle with Number */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">2</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-[#1E437A] mb-3 md:mb-4">Enhances Language Development</h3>
        
        {/* Description */}
        <p className="text-[#456696] text-sm sm:text-base text-center max-w-xs">
          Supports children in understanding and using language effectively, whether verbally or through alternative communication methods.
        </p>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col items-center text-center">
        {/* Circle with Number */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">3</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-[#1E437A] mb-3 md:mb-4">Boosts Social Skills</h3>
        
        {/* Description */}
        <p className="text-[#456696] text-sm sm:text-base text-center max-w-xs">
          Encourages proper conversational skills, listening, turn-taking, and appropriate responses in different social settings.
        </p>
      </div>

      {/* Step 4 */}
      <div className="flex flex-col items-center text-center">
        {/* Circle with Number */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">4</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-[#1E437A] mb-3 md:mb-4">Supports Fluency</h3>
        
        {/* Description */}
        <p className="text-[#456696] text-sm sm:text-base text-center max-w-xs">
          Assists children who stammer or experience difficulty in speaking smoothly.
        </p>
      </div>

      {/* Step 5 */}
      <div className="flex flex-col items-center text-center">
        {/* Circle with Number */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">5</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-[#1E437A] mb-3 md:mb-4">Aids in Feeding and Swallowing Disorders</h3>
        
        {/* Description */}
        <p className="text-[#456696] text-sm sm:text-base text-center max-w-xs">
          Helps children who struggle with chewing, swallowing, or transitioning to solid foods.
        </p>
      </div>

      {/* Step 6 */}
      <div className="flex flex-col items-center text-center">
        {/* Circle with Number */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#245CA7] flex items-center justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#22B14C] flex items-center justify-center">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">6</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-[#1E437A] mb-3 md:mb-4">Prepares for Academic Success</h3>
        
        {/* Description */}
        <p className="text-[#456696] text-sm sm:text-base text-center max-w-xs">
          Strong language skills lay the foundation for reading, writing, and learning in school.
        </p>
      </div>
    </div>
  </div>
</div>
{/* Blue Banner Section */}
<div className="rounded-xl mb-8 sm:mb-12 md:mb-30 w-[100%] bg-[#B0C2D8] py-6 sm:py-8 md:py-10 px-4 sm:px-8 md:px-20 lg:px-10 2xl:ml-35 2xl:w-[80%]">
  <div className="max-w-6xl mx-auto text-center">
    <p className="text-[#1D2939] text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6 md:mb-8 leading-relaxed">
    Early intervention is key! The earlier a child receives support, the better their chances of overcoming communication barriers and thriving in their daily life.
    </p>
  </div>
</div>


    <div className="w-full bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-20 lg:px-32">
      {/* Heading Section */}
      <div className="text-center md:text-left mb-8 sm:mb-12 relative">
        {/* Dotted Pattern */}
        <div className="hidden 2xl:block absolute justify-center mb-4 ml-30">
          <DottedPattern />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-nav_link_font text-3xl sm:text-4xl md:text-5xl text-[#1E437A] mb-4">What Happens During a Speech Therapy Session?</h2>
          <p className="text-[#456696] text-lg sm:text-xl md:text-2xl max-w-7xl font-medium mx-auto md:mx-0">
          At 8 Senses, each Speech Therapy session is carefully structured to make learning fun and effective. Our sessions last for 45 minutes, focusing on improving speech, language, and communication in an engaging way.
          </p>
        </div>
      </div>





      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-[#245CA7] rounded-2xl p-4 sm:p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4">{therapyServices[0].title}</h2>
            <ul className="space-y-3 md:space-y-4">
              {therapyServices[0].points.map((point, idx) => (
                <li key={idx} className="flex text-sm sm:text-base">
                  <span className="mr-2 flex-shrink-0">·</span>
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
        
          {/* Card 2 */}
          <div className="bg-[#245CA7] rounded-2xl p-4 sm:p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4">{therapyServices[1].title}</h2>
            <ul className="space-y-3 md:space-y-4">
              {therapyServices[1].points.map((point, idx) => (
                <li key={idx} className="flex text-sm sm:text-base">
                  <span className="mr-2 flex-shrink-0">·</span>
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
        
          {/* Card 3 - Tall card on desktop */}
          <div className="bg-[#245CA7] rounded-2xl p-4 sm:p-6 text-white md:row-span-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4">{therapyServices[2].title}</h2>
            <ul className="space-y-3 md:space-y-4">
              {therapyServices[2].points.map((point, idx) => (
                <li key={idx} className="flex text-sm sm:text-base">
                  <span className="mr-2 flex-shrink-0">·</span>
                  <span>
                    {point.bold && <span className="font-semibold">{point.bold}</span>}
                    {point.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        
          {/* Card 4 */}
          <div className="bg-[#245CA7] rounded-2xl p-4 sm:p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4">{therapyServices[3].title}</h2>
            <ul className="space-y-3 md:space-y-4">
              {therapyServices[3].points.map((point, idx) => (
                <li key={idx} className="flex text-sm sm:text-base">
                  <span className="mr-2 flex-shrink-0">·</span>
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
        
          {/* Card 5 */}
          <div className="bg-[#245CA7] rounded-2xl p-4 sm:p-6 text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4">{therapyServices[4].title}</h2>
            <ul className="space-y-3 md:space-y-4">
              {therapyServices[4].points.map((point, idx) => (
                <li key={idx} className="flex text-sm sm:text-base">
                  <span className="mr-2 flex-shrink-0">·</span>
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