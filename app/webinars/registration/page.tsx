"use client"
import Navbar from '@/app/components/navbar/page'

import Link from 'next/link'; // Correct import
import React, { useState } from 'react'

const UpcomingWeb = [
  {
    id: 1,
    title: "Speech Development Milestones in Toddlers",
    date:"March 15, 2025",
    time: "6:00 PM IST",
    speaker: "Dr. Jon Doe, Pediatric Speech Therapist",
    description: ["Identifying speech delays & early", "Fun activities to encourage speech at" ,"When to seek professional therapy"],
  
   
  },
];
const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    //  Send data to backend API
  };
  return (
    <>
    <Navbar/>
    <div className="ml-25 mt-30 max-[1280px]:ml-5 w-[90%] max-[1280px]:mt-20">
  <Link href={'/webinars'} className="flex mb-[20px] max-[1280px]:mb-[15px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 20" fill="none" className="max-[1280px]:w-16 max-[1280px]:h-16">
      <path d="M20.668 24L12.668 16L20.668 8" stroke="#456696" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <h1 className="text-[#456696] text-lg -mb-2 max-[1280px]:text-base">Back</h1>
  </Link>
  <h2 className="text-3xl font-semibold text-[#1E437A] mb-3 max-[1280px]:text-2xl max-[1280px]:mb-2">Register for This Webinar</h2>
  <p className="text-[#456696] -mb-5 text-lg max-[1280px]:text-base">
    Join us for an expert-led session on child development and therapy insights. Reserve your spot now!
  </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-30 max-w-5xl mx-5  mt-10 ml-25 max-[1280px]:ml-5 max-[1280px]:mt-8 max-[1280px]:gap-6">
  {UpcomingWeb.map((course) => (
    <div key={course.id} className="bg-white text-black h-70 p-4 rounded-lg w-[120%] shadow-lg border-[2px] border-[#1E437A] max-[1280px]:w-full max-[1280px]:p-3">
      <div className='flex gap-3 max-[1280px]:gap-2'>
        <p className="mt-4 text-[#456696] font-nav_link_font font-medium gap-2 flex text-lg rounded-2xl bg-[#245BA729] w-[34%] h-7 items-center max-[1280px]:text-base max-[1280px]:h-6 max-[1280px]:w-auto max-[1280px]:px-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 24 25" fill="none" className="max-[1280px]:w-4 max-[1280px]:h-4">
          <path d="M7.74913 3C7.74913 2.80109 7.67011 2.61032 7.52946 2.46967C7.3888 2.32902 7.19804 2.25 6.99913 2.25C6.80021 2.25 6.60945 2.32902 6.46879 2.46967C6.32814 2.61032 6.24913 2.80109 6.24913 3V4.58C4.80912 4.695 3.86512 4.977 3.17112 5.672C2.47612 6.366 2.19412 7.311 2.07812 8.75H21.9201C21.8041 7.31 21.5221 6.366 20.8271 5.672C20.1331 4.977 19.1881 4.695 17.7491 4.579V3C17.7491 2.80109 17.6701 2.61032 17.5295 2.46967C17.3888 2.32902 17.198 2.25 16.9991 2.25C16.8002 2.25 16.6094 2.32902 16.4688 2.46967C16.3281 2.61032 16.2491 2.80109 16.2491 3V4.513C15.5841 4.5 14.8381 4.5 13.9991 4.5H9.99913C9.16012 4.5 8.41412 4.5 7.74913 4.513V3Z" fill="#245BA7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M2 12.5C2 11.661 2 10.915 2.013 10.25H21.987C22 10.915 22 11.661 22 12.5V14.5C22 18.271 22 20.157 20.828 21.328C19.656 22.499 17.771 22.5 14 22.5H10C6.229 22.5 4.343 22.5 3.172 21.328C2.001 20.156 2 18.271 2 14.5V12.5ZM17 14.5C17.2652 14.5 17.5196 14.3946 17.7071 14.2071C17.8946 14.0196 18 13.7652 18 13.5C18 13.2348 17.8946 12.9804 17.7071 12.7929C17.5196 12.6054 17.2652 12.5 17 12.5C16.7348 12.5 16.4804 12.6054 16.2929 12.7929C16.1054 12.9804 16 13.2348 16 13.5C16 13.7652 16.1054 14.0196 16.2929 14.2071C16.4804 14.3946 16.7348 14.5 17 14.5ZM17 18.5C17.2652 18.5 17.5196 18.3946 17.7071 18.2071C17.8946 18.0196 18 17.7652 18 17.5C18 17.2348 17.8946 16.9804 17.7071 16.7929C17.5196 16.6054 17.2652 16.5 17 16.5C16.7348 16.5 16.4804 16.6054 16.2929 16.7929C16.1054 16.9804 16 17.2348 16 17.5C16 17.7652 16.1054 18.0196 16.2929 18.2071C16.4804 18.3946 16.7348 18.5 17 18.5ZM13 13.5C13 13.7652 12.8946 14.0196 12.7071 14.2071C12.5196 14.3946 12.2652 14.5 12 14.5C11.7348 14.5 11.4804 14.3946 11.2929 14.2071C11.1054 14.0196 11 13.7652 11 13.5C11 13.2348 11.1054 12.9804 11.2929 12.7929C11.4804 12.6054 11.7348 12.5 12 12.5C12.2652 12.5 12.5196 12.6054 12.7071 12.7929C12.8946 12.9804 13 13.2348 13 13.5ZM13 17.5C13 17.7652 12.8946 18.0196 12.7071 18.2071C12.5196 18.3946 12.2652 18.5 12 18.5C11.7348 18.5 11.4804 18.3946 11.2929 18.2071C11.1054 18.0196 11 17.7652 11 17.5C11 17.2348 11.1054 16.9804 11.2929 16.7929C11.4804 16.6054 11.7348 16.5 12 16.5C12.2652 16.5 12.5196 16.6054 12.7071 16.7929C12.8946 16.9804 13 17.2348 13 17.5ZM7 14.5C7.26522 14.5 7.51957 14.3946 7.70711 14.2071C7.89464 14.0196 8 13.7652 8 13.5C8 13.2348 7.89464 12.9804 7.70711 12.7929C7.51957 12.6054 7.26522 12.5 7 12.5C6.73478 12.5 6.48043 12.6054 6.29289 12.7929C6.10536 12.9804 6 13.2348 6 13.5C6 13.7652 6.10536 14.0196 6.29289 14.2071C6.48043 14.3946 6.73478 14.5 7 14.5ZM7 18.5C7.26522 18.5 7.51957 18.3946 7.70711 18.2071C7.89464 18.0196 8 17.7652 8 17.5C8 17.2348 7.89464 16.9804 7.70711 16.7929C7.51957 16.6054 7.26522 16.5 7 16.5C6.73478 16.5 6.48043 16.6054 6.29289 16.7929C6.10536 16.9804 6 17.2348 6 17.5C6 17.7652 6.10536 18.0196 6.29289 18.2071C6.48043 18.3946 6.73478 18.5 7 18.5Z" fill="#245BA7"/>
          </svg> {course.date}
        </p>
        <p className="mt-4 text-[#456696] font-nav_link_font font-medium gap-2 flex text-lg rounded-2xl bg-[#245BA729] w-[28%] h-7 items-center max-[1280px]:text-base max-[1280px]:h-6 max-[1280px]:w-auto max-[1280px]:px-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className="max-[1280px]:w-4 max-[1280px]:h-4">
          <path d="M12 2.5C17.523 2.5 22 6.977 22 12.5C22 18.023 17.523 22.5 12 22.5C6.477 22.5 2 18.023 2 12.5C2 6.977 6.477
   2.5 12 2.5ZM12 6.5C11.7348 6.5 11.4804 6.60536 11.2929 6.79289C11.1054 6.98043 11 7.23478 11 7.5V12.5C11.0001 12.7652 
   11.1055 13.0195 11.293 13.207L14.293 16.207C14.4816 16.3892 14.7342 16.49 14.9964 16.4877C15.2586 16.4854 15.5094
    16.3802 15.6948 16.1948C15.8802 16.0094 15.9854 15.7586 15.9877 15.4964C15.99 15.2342 15.8892 14.9816 15.707 14.793L13
     12.086V7.5C13 7.23478 12.8946 6.98043 12.7071 6.79289C12.5196 6.60536 12.2652 6.5 12 6.5Z" fill="#245BA7"/>
     </svg> {course.time}
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-2 text-[#1E437A] max-[1280px]:text-lg">{course.title}</h3>

      <p className="text-lg font-bold text-[#456696] mt-1 flex gap-2 items-center max-[1280px]:text-base">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" fill="none" className="max-[1280px]:w-6 max-[1280px]:h-6">
        <path d="M6.66667 26.6667C5.93333 26.6667 5.30578 26.4059 4.784 25.8841C4.26222 25.3623 4.00089 24.7343 4 
  24.0001V14.6667C4 13.0223 4.31689 11.4721 4.95067 10.0161C5.58444 8.56008 6.44533 7.28808 7.53333 6.20008C8.62133 
  5.11208 9.89378 4.25119 11.3507 3.61741C12.8076 2.98364 14.3573 2.66675 16 2.66675C17.6427 2.66675 19.1929 2.98364 
  20.6507 3.61741C22.1084 4.25119 23.3804 5.11208 24.4667 6.20008C25.5529 7.28808 26.4142 8.56053 27.0507 10.0174C27.6871 
  11.4743 28.0036 13.0241 28 14.6667V28.0001C28 28.7334 27.7391 29.3614 27.2173 29.8841C26.6956 30.4067 26.0676 30.6676 
  25.3333 30.6667H17.3333C16.9556 30.6667 16.6391 30.5387 16.384 30.2827C16.1289 30.0267 16.0009 29.7103 16 29.3334C15.9991
   28.9565 16.1271 28.6401 16.384 28.3841C16.6409 28.1281 16.9573 28.0001 17.3333 28.0001H25.3333V26.6667H22.6667C21.9333 
   26.6667 21.3058 26.4059 20.784 25.8841C20.2622 25.3623 20.0009 24.7343 20 24.0001V18.6667C20 17.9334 20.2613 17.3059 
   20.784 16.7841C21.3067 16.2623 21.9342 16.001 22.6667 16.0001H25.3333V14.6667C25.3333 12.089 24.4222 9.88897 22.6 
   8.06675C20.7778 6.24453 18.5778 5.33341 16 5.33341C13.4222 5.33341 11.2222 6.24453 9.4 8.06675C7.57778 9.88897 6.66667
    12.089 6.66667 14.6667V16.0001H9.33333C10.0667 16.0001 10.6947 16.2614 11.2173 16.7841C11.74 17.3067 12.0009 17.9343 
    12 18.6667V24.0001C12 24.7334 11.7391 25.3614 11.2173 25.8841C10.6956 26.4067 10.0676 26.6676 9.33333 
    26.6667H6.66667Z" fill="#456696"/>
        </svg> 
        Speaker: <span className='font-normal'>{course.speaker}</span>
      </p>
      
      <p className="text-lg font-bold text-[#456696] mt-2 flex gap-2 items-center max-[1280px]:text-base">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" fill="none" className="max-[1280px]:w-6 max-[1280px]:h-6">
        <path d="M16 16L4.064 11.232L4.8 28.8H1.6L2.368 10.544L0 9.59995L16 3.19995L32 9.59995L16 16ZM16 7.99995C15.12 7.99995 14.4 8.35195 14.4 8.79995C14.4 9.24795 15.12 9.59995 16 9.59995C16.88 9.59995 17.6 9.24795 17.6 8.79995C17.6 8.35195 16.88 7.99995 16 7.99995ZM16 17.6L24.912 14.032C26.048 15.536 26.832 17.344 27.088 19.312C26.608 19.248 26.112 19.2 25.6 19.2C21.52 19.2 17.952 21.392 16 24.656C15.0087 22.9936 13.603 21.6169 11.9203 20.6606C10.2376 19.7042 8.33548 19.201 6.4 19.2C5.888 19.2 5.392 19.248 4.912 19.312C5.168 17.344 5.952 15.536 7.088 14.032L16 17.6Z" fill="#456696"/>
        </svg> 
        What You'll Learn
      </p>
      
      <div className="text-[15px] text-[#456696] gap-2 max-[1280px]:text-sm">
        <ul>
          {course.description.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  ))}
  
  <form onSubmit={handleSubmit} className="w-[600px] bg-white p-6 border-2 h-70 border-[#1E437A] rounded-xl flex flex-col max-[1280px]:w-full max-[1280px]:p-4">
    <label className="block font-semibold text-[#1E437A] text-lg max-[1280px]:text-base">Full Name</label>
    <input
      type="text"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      placeholder="Enter your full name"
      className="w-full p-2 rounded-lg text-[#456696] bg-[#F8FBFF] mb-4 border border-[#1E437A] max-[1280px]:p-1.5"
      required
    />

    <label className="block font-semibold text-[#1E437A] text-lg max-[1280px]:text-base">Email Address</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Your registration link will be sent here"
      className="w-full p-2 rounded-lg mb-4 text-[#456696] bg-[#F8FBFF] border border-[#1E437A] max-[1280px]:p-1.5"
      required
    />

    <button
      type="submit"
      className="w-full bg-[#C83C92] text-white font-semibold p-3 rounded-4xl mt-6 max-[1280px]:mt-4 max-[1280px]:p-2"
    >
      Register Now →
    </button>
  </form>
</div>

    </>
  )
}

export default Registration