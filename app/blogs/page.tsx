"use client"
import React from 'react'
import Banner from '../components/CommonBanner/page'
import Navbar from '../components/navbar/page'
import Consultation from '../components/consultation/page'
import Footer from '../components/footer/page'
import BlogBanner from '../../public/BlogBanner.png'
import BlogSection from '../components/blogCard/page'

const Blogs = () => {
  return (
    <>
    <Navbar/>
    <Banner
        title="Blogs"
        description="Expert tips and trusted advice on child health, parenting, and nutrition—for the best start in life."
        imageSrc={BlogBanner}
    />
    <div className='mt-[120px]'>
    <BlogSection/>
    </div>
    <Consultation/>
    <Footer/>
    </>
  )
}

export default Blogs