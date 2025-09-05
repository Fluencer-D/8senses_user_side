"use client"
import React, { useState } from 'react'
import Navbar from '../components/navbar/page'
import Consultation from '../components/consultation/page'
import Footer from '../components/footer/page'
import Banner from '../components/CommonBanner/Banner'
import ContactBanner from '@/public/ContactBanner.png'
import { Minus, Plus } from 'lucide-react';
import DottedPattern from '../components/dottedPattern/page'
import { motion } from "framer-motion";

const faqs = [
    {
        question: "What services does 8 Senses Pediatric Occupational Therapy & Speech Therapy Clinic offer?",
        answer: "At 8 Senses, we offer a comprehensive range of services for children with developmental challenges. Our services include: Pediatric Occupational Therapy tailored for children with neurological, sensory, and motor impairments; Speech Therapy focusing on improving language, communication, and speech-related issues; Early Intervention Programs specialized for developmental delays in young children; Sensory Integration Therapy for children with sensory processing difficulties; Fine Motor & Gross Motor Development helping children develop essential motor skills; Feeding Therapy for children with difficulties related to eating and swallowing; and Parent Guidance and Education workshops and training to help parents better understand and support their children."
    },
    {
        question: "What types of conditions do you treat?",
        answer: "We specialize in treating a wide range of developmental disorders and conditions, including but not limited to: Autism Spectrum Disorder (ASD), Attention Deficit Hyperactivity Disorder (ADHD), Sensory Processing Disorder (SPD), Developmental Delays, Cerebral Palsy, Down Syndrome, Speech and Language Delays, Feeding and Swallowing Disorders, and Motor Coordination Disorders."
    },
    {
        question: "How do I know if my child needs occupational or Speech Therapy?",
        answer: "Signs that your child may need therapy include: Delayed speech, language, or communication skills; Difficulty with motor tasks like holding a pencil, using utensils, or coordinating movements; Challenges in sensory processing, such as being overly sensitive to lights, sounds, or touch; Struggles with self-care tasks such as dressing, feeding, or using the toilet; Behavioral issues related to frustration, anxiety, or social interaction difficulties; Feeding difficulties like choking, gagging, or not wanting to eat certain textures."
    },
    {
        question: "What is sensory integration therapy?",
        answer: "Sensory integration therapy helps children who have trouble processing and responding to information from their senses. Our clinic uses specialized equipment and activities to help children better regulate their sensory input, which in turn can improve their behavior, coordination, and ability to focus."
    },
    {
        question: "What does a typical Occupational Therapy session look like?",
        answer: "A typical session lasts for 45 minutes and is customized based on your child's needs. It involves a combination of: Play-based activities to improve fine and gross motor skills; Sensory integration exercises to help children respond better to sensory inputs; Strengthening exercises for coordination and balance; Self-care skill development for tasks like dressing, feeding, and grooming; Parental guidance and training for follow-up activities at home."
    },
    {
        question: "How is Speech Therapy conducted?",
        answer: "Speech Therapy sessions are designed to improve your child's communication, speech, and language skills. It may include: Exercises to strengthen the muscles used for speech; Techniques to improve understanding and use of language; Articulation therapy for clearer speech sounds; Play-based learning to enhance social communication skills; Assistive communication tools for children with limited verbal communication."
    },
    {
        question: "How do I schedule an appointment at 8 Senses?",
        answer: "You can book an appointment by calling our clinic directly at 9309187144, 9766712546, 8600994239 or by visiting our website and filling out the appointment form. We recommend scheduling an initial consultation to assess your child's needs."
    },
    {
        question: "What is the cost of therapy, and do you offer any concessions?",
        answer: "The cost of therapy varies depending on the type and frequency of sessions."
    },
    {
        question: "What should I expect during the first consultation?",
        answer: "During your first consultation, we will: Conduct a thorough evaluation of your child's developmental needs; Discuss your child's history, challenges, and goals; Develop an individualized therapy plan tailored to your child; Provide you with guidance on what to expect from the therapy process; Schedule future therapy sessions based on the assessment."
    },
    {
        question: "Do you offer group therapy or individual sessions?",
        answer: "We offer both individual and group therapy sessions, depending on the child's needs. Individual sessions focus on personalized care, while group therapy helps children develop social skills and learn from their peers in a collaborative setting."
    },
    {
        question: "What kind of equipment and tools are used during therapy?",
        answer: "Our clinic is equipped with advanced tools and technology, including: Sensory integration equipment like swings, trampolines, and therapy balls; Fine motor development aids such as puzzles, beading, and cutting tools; Balance and coordination tools like balance boards and climbing structures; Auditory and visual stimulation tools to improve sensory regulation; Feeding therapy equipment for children with oral-motor difficulties."
    },
    {
        question: "How can parents support therapy at home?",
        answer: "We encourage parents to participate actively in their child's therapy. We provide home programs with activities and exercises that can be incorporated into daily routines to enhance progress. Additionally, our workshops offer valuable information to help parents understand how to create a supportive environment at home."
    },
    {
        question: "Do you conduct workshops or community outreach programs?",
        answer: "Yes, we host regular workshops to raise awareness about pediatric Occupational Therapy, Speech Therapy, and developmental disorders. We also conduct free assessments for underprivileged children and offer community outreach programs to ensure access to therapy for all."
    },
    {
        question: "What is your approach to early intervention?",
        answer: "Early intervention is a key focus at 8 Senses. By identifying developmental issues early and beginning therapy as soon as possible, we help children achieve their maximum potential and prevent further delays. Our early intervention programs are designed for children under the age of 6, addressing challenges such as speech delays, motor skill difficulties, and sensory processing issues."
    },
    {
        question: "What is the success rate of your therapy programs?",
        answer: "The success of therapy varies depending on each child's unique situation. However, our tailored approach, experienced therapists, and family-centered care model have resulted in significant progress for many children. We work closely with parents to track milestones and adjust therapy plans to ensure continued success."
    },
    {
        question: "How long will my child need therapy?",
        answer: "The length of therapy depends on your child's specific needs and progress. Some children may benefit from therapy for a few months, while others with more complex developmental issues may require longer-term support. We regularly assess progress and adjust therapy plans to ensure your child is making the most gains possible. We aim to help your child reach their goals as quickly and effectively as possible."
    },
    {
        question: "How involved do I need to be as a parent in my child's therapy?",
        answer: "Your involvement is crucial for your child's success. We encourage parents to participate in therapy sessions when appropriate and to practice recommended activities at home. Our therapists provide guidance on how you can support your child's development outside of the clinic, whether through structured activities or incorporating therapeutic exercises into daily routines. We also offer workshops and resources to help you better understand your child's needs."
    },
    {
        question: "How will I know if therapy is working for my child?",
        answer: "Progress in therapy can be seen in small but meaningful changes over time. Signs of progress may include improvements in speech clarity, motor coordination, social interactions, or behavior. Our therapists will track your child's progress at every session and provide regular updates to keep you informed. We also set clear, measurable goals and adjust the therapy plan as your child grows and develops. Parent feedback is vital, so we encourage you to share any changes you notice at home or in school."
    },
    {
        question: "Does my child need both occupational and Speech Therapy?",
        answer: "This depends on your child's specific challenges. If your child has difficulties with motor skills, daily living tasks, and sensory regulation, Occupational Therapy may be recommended. If your child struggles with speech, language, or communication, they may benefit from Speech Therapy. In some cases, children require both services to address a range of developmental issues. After the initial assessment, we will recommend the most suitable therapy or combination of therapies for your child."
    },
    {
        question: "How do I prepare my child for their first therapy session?",
        answer: "To prepare your child for their first session: Explain that they will be meeting someone who is going to help them learn new things in a fun way; Encourage them to talk about any feelings they have about the visit (excited, nervous, etc.); Ensure they are well-rested and have had something to eat before the session; Bring any necessary documents, medical reports, or previous evaluations that could help the therapist understand your child's background; Dress them in comfortable clothing that allows for movement, especially if they will be participating in physical activities like climbing or balancing."
    }
];

const Contact = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
                        <Navbar/>
            <Banner 
                title="Contact"
                description="Contact us today and let's support your child's journey to growth and development."
                imageSrc={ContactBanner}
            />

            {/* Map and Contact Info Section */}
            <div className="flex flex-col lg:flex-row items-start justify-center gap-10 p-4 md:p-6 mt-10 md:mt-[80px] max-w-7xl mx-auto">
                <div className="relative w-full max-w-lg lg:mr-40 mb-8 lg:mb-0">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7497.835541424234!2d73.7570925514019!3d20.01196559765945!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb030c8a3821%3A0xdc4fa0f39f358212!2sDr%20Shruti%20paatil!5e0!3m2!1sen!2sus!4v1743593745276!5m2!1sen!2sus" 
                        width="100%" 
                        height="450" 
                        style={{border: 0}} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg w-full h-auto md:h-[450px] 2xl:h-90 2xl:w-[130%]"
                    ></iframe>
                </div>

                <div className="text-[#1E437A] max-w-lg w-full px-4 lg:mr-24">
                    {/* Location Section */}
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 40 40" fill="none" className="mr-2">
                                <g clipPath="url(#clip0_56_106)">
                                <path d="M32.9688 37.6562H25.8594V23.5156H14.1406V37.6562H7.03125V16.4844H4.6875V40H35.3125V16.4844H32.9688V37.6562ZM16.4844 37.6562V25.8594H23.5156V37.6562H16.4844ZM39.5312 15.2344L38.125 17.1094L20 3.82812L1.875 17.1094L0.46875 15.2344L20 0.859375L39.5312 15.2344Z" fill="#1E437A"/>
                                </g>
                            </svg>
                            <h3 className="text-xl md:text-[25px] font-nav_link_font font-medium">Location</h3>
                        </div>
                        <p className="text-sm md:text-[15px] font-nav_link_font">
                            301, 302 8Senses Pediatric Occupational Therapy and Speech Therapy
                            Clinic, One Gangapur Building, above Reliance Digital, Jehan Circle,
                            Gangapur Road, Nashik, Maharashtra, India-422013.
                        </p>
                    </div>

                    {/* Phone Number Section */}
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 40 40" fill="none" className="mr-2">
                                <path d="M21.7969 34.1406C21.7969 35.0781 20.9375 35.8594 20 35.8594C19.0625 35.8594 18.2031 35.0781 18.2031 34.1406C18.2031 33.125 19.0625 32.3438 20 32.3438C20.9375 32.3438 21.7969 33.125 21.7969 34.1406ZM37.6562 3.51562V36.4844C37.6562 38.4375 36.1719 40 34.375 40H5.625C3.82812 40 2.34375 38.4375 2.34375 36.4844V3.51562C2.34375 1.5625 3.82812 0 5.625 0H34.375C36.1719 0 37.6562 1.5625 37.6562 3.51562ZM35.3125 3.51562C35.3125 2.89062 34.8438 2.34375 34.375 2.34375H5.625C5.15625 2.34375 4.6875 2.89062 4.6875 3.51562V36.4844C4.6875 37.1094 5.15625 37.6562 5.625 37.6562H34.375C34.8438 37.6562 35.3125 37.1094 35.3125 36.4844V3.51562ZM7.03125 4.6875H32.9688V30.625H7.03125V4.6875ZM9.375 28.2031H30.625V7.03125H9.375V28.2031Z" fill="#1E437A"/>
                            </svg>
                            <h3 className="text-xl md:text-[25px] font-nav_link_font font-medium">Phone Number</h3>
                        </div>
                        <p className="text-sm md:text-[15px] font-nav_link_font">
                            9309187144 | 9766712546 | 86009 94239
                        </p>
                    </div>

                    {/* Working Hours Section */}
                    <div className="mb-8">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 40 40" fill="none" className="mr-2">
                                <path d="M6.66634 31.6667V13.3334H33.333V18.8167C34.533 19.1834 35.6663 19.7167 36.6663 20.4334V13.3334C36.6663 11.4834 35.183 10 33.333 10H26.6663V6.66671C26.6663 4.81671 25.183 3.33337 23.333 3.33337H16.6663C14.8163 3.33337 13.333 4.81671 13.333 6.66671V10H6.66634C4.81634 10 3.34967 11.4834 3.34967 13.3334L3.33301 31.6667C3.33301 33.5167 4.81634 35 6.66634 35H19.4663C18.9663 33.9667 18.633 32.85 18.4663 31.6667H6.66634ZM16.6663 6.66671H23.333V10H16.6663V6.66671Z" fill="#1E437A"/>
                                <path d="M30.0003 21.6666C25.4003 21.6666 21.667 25.4 21.667 30C21.667 34.6 25.4003 38.3333 30.0003 38.3333C34.6003 38.3333 38.3337 34.6 38.3337 30C38.3337 25.4 34.6003 21.6666 30.0003 21.6666ZM32.7503 33.9166L29.167 30.3333V25H30.8337V29.65L33.917 32.7333L32.7503 33.9166Z" fill="#1E437A"/>
                            </svg>
                            <h3 className="text-xl md:text-[25px] font-nav_link_font font-medium">Working Hours</h3>
                        </div>
                        <p className="text-sm md:text-[15px] font-nav_link_font">9:00 am to 8:00 pm</p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="mt-8">
                        <h3 className="text-xl md:text-[25px] font-nav_link_font font-medium mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            {/* Instagram */}
                            <a 
          href="https://www.instagram.com/8senses_nsk/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center group"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-800 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
            <svg 
              className="w-6 h-6 md:w-7 md:h-7 text-blue-800 group-hover:text-white transition-colors duration-300" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" 
                fill="currentColor"
              />
              <path 
                d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none"
              />
              <path 
                d="M17.5 6.5C17.7761 6.5 18 6.27614 18 6C18 5.72386 17.7761 5.5 17.5 5.5C17.2239 5.5 17 5.72386 17 6C17 6.27614 17.2239 6.5 17.5 6.5Z" 
                fill="currentColor" 
                stroke="currentColor"
              />
            </svg>
          </div>
        </a>
                            
        <a 
          href="http://facebook.com/8senses.clinic" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center group"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-800 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
            <svg 
              className="w-6 h-6 md:w-7 md:h-7 text-blue-800 group-hover:text-white transition-colors duration-300" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>
        
        {/* YouTube */}
        <a 
          href="https://www.youtube.com/@8_senses" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center group"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-800 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
            <svg 
              className="w-6 h-6 md:w-7 md:h-7 text-blue-800 group-hover:text-blue transition-colors duration-300" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.991235 13.537 1.14521 15.3075 1.46 17.06C1.59096 17.5258 1.8383 17.951 2.17814 18.2946C2.51799 18.6381 2.93842 18.8878 3.4 19.02C5.12 19.47 12 19.47 12 19.47C12 19.47 18.88 19.47 20.6 19.02C21.0708 18.8868 21.498 18.6318 21.8387 18.2806C22.1793 17.9294 22.4212 17.4946 22.54 17.02C22.8524 15.2675 23.0063 13.497 23 11.71C23.0063 9.923 22.8524 8.1525 22.54 6.42Z" 
                fill="currentColor"
              />
              <path 
                d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" 
                fill="white"
              />
            </svg>
          </div>
        </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Frequently Asked Questions Section */}
            <div className="relative bg-white py-10 md:py-20 px-4 md:px-20 lg:px-32 text-white">
                <div className="hidden xl:block absolute top-5 right-5 mr-15 mt-10 md:top-0 md:right-10 w-[80px] h-[80px] md:w-[100px] md:h-[100px">
                    <DottedPattern />
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-[54px] font-nav_link_font font-medium text-[#123072] mb-6 md:mb-10">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4 md:space-y-8 w-full">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="bg-white text-[#456696] rounded-lg border-1 w-full"
                        >
                            <button
                                className="w-full text-base md:text-[24px] flex justify-between items-center p-3 md:p-5 text-left font-semibold"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-[#1E437A]">{faq.question}</span>
                                <span className="text-[#456696]">
                                    {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                                </span>
                            </button>
                
                            {openIndex === index && faq.answer && (
                                <motion.div
                                    className="px-3 md:px-5 pb-3 md:pb-5 text-[#456696] text-sm md:text-[20px]"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Consultation/>
            <Footer/>
        </>
    )
}

export default Contact