import React from 'react'
import Navbar from '../components/navbar/page'
import Banner from '../components/CommonBanner/Banner'
import MembersBanner from '@/public/MembersBanner.png'
import DottedPattern from '../components/dottedPattern/page'
import Image from 'next/image'
import AbtIconContainer from '@/public/AbtIconContainer.png'
import PricingCard from '../components/PricingCard/PricingCard'
import Footer from '../components/footer/page'

const services = [
    {
        title: "Exclusive Online Learning Hub",
        description:
            "Access to expert-designed materials, videos, and practical exercises to support your child’s progress at home.",
    },
    {
        title: "Weekly Motivational Emails",
        description:
            "Get inspiring success stories, expert advice, and easy-to-implement strategies to keep you motivated.",
    },
    {
        title: "Monthly Online Discussion with Experts",
        description: "Participate in a live Q&A session where you can discuss concerns, get advice, and learn from specialists.",
    },
    {
        title: "Parent Community Forum",
        description: "Join a private members-only group where you can connect with other parents, share experiences, and support each other..",
    },
    {
        title: "Discounts on Workshops",
        description: "Enjoy exclusive discounts on therapy programs, workshops, and special events.",
    },
    {
        title: "Personalized Progress Tracking Tools",
        description: "Download goal-setting and progress monitoring templates to track your child’s development effectively.",
    },
];

const Members = () => {
  return (
    <>
        <Navbar/>
        <Banner
        title="8 Senses Members Club!"
        description="Exclusive Support for Parents & Caregivers of Children with Special Needs"
        imageSrc={MembersBanner}
        />

        {/* Why join section */}
        <section className='relative mt-[30px] sm:mt-[50px] md:mt-[100px] lg:mt-[150px] bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-20 lg:px-32 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12'>
            <div className="hidden lg:block absolute -mt-80 ml-[125px] z-10">
                <DottedPattern />
            </div>
            <div className='text-center lg:text-left w-full lg:w-auto'>
                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-nav_link_font font-normal 
                    leading-tight tracking-wide text-[#1E437A] mb-4'>
                    Why Join the Members Club?
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-[26px] font-normal 
                    leading-relaxed tracking-wide text-[#456696] font-urbanist mb-6">
                    At 8 Senses Pediatric Occupational Therapy Clinic, we understand that parenting a child
with neurological and developmental challenges comes with unique struggles. The 8 Senses
Members Club is designed to provide you with continuous guidance, expert knowledge, and
a supportive community to help your child thrive.
                </p>
                <div className='flex justify-center lg:justify-start'>
                    <button className="bg-[#C83C92] text-white text-sm sm:text-base md:text-lg font-medium 
                        px-4 py-2 sm:px-5 sm:py-3 rounded-full cursor-pointer">
                        Explore our products
                    </button>
                </div>
            </div>
        </section>

        {/* Cards after join section */}
        <section className="py-8 sm:py-12 md:py-16 text-white relative w-full px-4 sm:px-8 md:px-16">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-[72px] justify-center items-stretch">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-[#245CA7] h-full text-base sm:text-[28px] font-nav_link_font 
                            w-full max-w-[400px] mx-auto rounded-[32px] p-10 text-center shadow-lg flex flex-col 
                            items-center justify-center"
                        >
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

                            <h3 className="text-lg sm:text-[24px] font-semibold text-white text-center">
                                {service.title}
                            </h3>

                            <p className="text-[#E7E7E7] text-center text-sm sm:text-[20px] mt-2">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <div className='text-center mt-12 sm:mt-[100px] mb-8 sm:mb-[40px] px-4'>
            <h1 className='font-nav_link_font text-2xl sm:text-4xl lg:text-5xl text-[#1E437A] mb-3 sm:mb-5'>
                Choose Your Membership Plan
            </h1>
            <h3 className='font-nav_link_font text-base sm:text-xl lg:text-2xl text-[#456696] px-4'>
                Select the perfect plan to access expert guidance, exclusive 
                <br className='hidden sm:block' /> resources, and a supportive parent community.
            </h3>
        </div>

        {/* Member cards */}
        <div className="flex flex-col lg:flex-row justify-center gap-6 sm:gap-8 p-4 sm:p-10">
            <div className="hidden lg:block absolute mt-5 -ml-[1195px] -z-10">
                <DottedPattern />
            </div>
            <div className="hidden lg:block absolute mt-132 ml-[1490px] -z-10">
                <DottedPattern />
            </div>
            
            {/* Basic Plan */}
            <PricingCard
                title="Basic Plan (3 Months)"
                price="₹2,999"
                description="per user for 3 months"
                features={[
                    "Access to Online Learning Hub",
                    "Weekly Motivational Emails",
                    "1 Monthly Expert Discussion",
                    "Access to Parent Community"
                ]}
            />

            {/* Advanced Plan */}
            <PricingCard
                title="Advanced Plan (6 Months)"
                price="₹5,499"
                description="per user for 6 months"
                features={[
                    "Everything in the Basic Plan PLUS",
                    "Gluten-free casein free recipes",
                    "Personalized Progress Tracking Templates",
                    "10% Discount on Workshops",
                    "Priority Access to New Content"
                ]}
            />

            {/* Premium Plan */}
            <PricingCard
                title="Premium Plan (12 Months)"
                price="₹9,999"
                description="per user for 12 months"
                features={[
                    "Everything in the Advanced Plan PLUS",
                    "Gluten-free casein free recipes and full day meal plan",
                    "Detox diet recipes",
                    "1 Private Consultation (30 mins) with Dr.Shrruti Patil, Pediatric occupational therapist",
                    "15% on Workshops",
                    "Special Recognition as a Parent Advocate in our Community"
                ]}
                isPremium
            />
        </div>
        <Footer/>
    </>
  )
}

export default Members