"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/page';
import Banner from '../components/CommonBanner/Banner';
import Footer from '../components/footer/page';
import WebinarBanner from '@/public/WebinarBanner.png';
import { Button } from "@/components/ui/Button";
import DottedPattern from '../components/dottedPattern/page';
import avatar from '@/public/testimonial.png';
import Webinar1 from '@/public/Webinar1.png';
import Link from 'next/link';
import Image from 'next/image';
import { FaQuoteLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


interface Webinar {
  _id: string;
  title: string;
  speaker: string;
  date: string;
  duration: number;
  startTime: string;
  description: string;
  thumbnail: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  url: string;
  category?: string;
}

interface Course {
  _id: string;
  title: string;
  instructor: string;
  description: string;
  thumbnail: string;
  category: string;
  status: string;
}

const Webinars = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [upcomingWebinars, setUpcomingWebinars] = useState<Webinar[]>([]);
  const [pastWebinars, setPastWebinars] = useState<Webinar[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const categories = [
    "All",
    "Parenting & Child Development",
    "Therapeutic Approaches",
    "STEM & Educational Activities",
    "Special Needs Support",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://eight-senses-backend.onrender.com';

        // Fetch webinars
        const webinarResponse = await fetch(`${apiUrl}/api/webinars`);
        if (!webinarResponse.ok) throw new Error('Failed to fetch webinars');
        const webinarData = await webinarResponse.json();
        console.log(webinarData);

        const courseResponse = await fetch(`${apiUrl}/api/courses`);
        if (!courseResponse.ok) throw new Error('Failed to fetch courses');
        const courseData = await courseResponse.json();
        console.log(courseData);

        const webinars = webinarData.data || [];
        const now = new Date();

        setUpcomingWebinars(
          webinars.filter((webinar: Webinar) =>
            new Date(webinar.date) > now &&
            webinar.status !== 'cancelled'
          )
        );

        setPastWebinars(
          webinars.filter((webinar: Webinar) =>
            new Date(webinar.date) <= now ||
            webinar.status === 'completed'
          )
        );

        const courses = courseData.data || [];
        setCourses(courses);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (selectedCategory === "All") return true;

    if (!course.category) return false;

    const courseCat = course.category.toLowerCase();
    const selectedCat = selectedCategory.toLowerCase();

    if (courseCat === selectedCat) return true;

    if (selectedCategory === "Parenting & Child Development" &&
      (courseCat.includes("parent") ||
        courseCat.includes("child") ||
        courseCat.includes("development"))) {
      return true;
    }

    return false;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const isExternalImage = (url: string): boolean => {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C83C92]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }


  function handleNavigate(){
    if(localStorage.getItem("user")){
      router.push("/userDashboard")
    }
  }


  return (
    <>
      <Navbar />
      <Banner
        title="Our Expert-Led Courses & Webinars"
        description="Learn from specialists, enhance your parenting skills, and support your child's development with our curated courses and webinars."
        imageSrc={WebinarBanner}
      />

      {/* Search and Categories */}
      <section className="relative bg-white text-white px-4 sm:px-6 py-8 sm:py-12">
        <div className='hidden 2xl:block relative mb-6 sm:mr-290 sm:mb-10 sm:mt-2 2xl:mr-310  '>
          <DottedPattern />
        </div>
        <div className="max-w-6xl mx-auto text-left sm:ml-40 md:ml-20 lg:ml-40 2xl:ml-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-nav_link_font text-[#1E437A] text-center sm:text-left">Course Categories</h2>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-5 md:px-9 py-2 sm:py-3 rounded-full border border-gray-400 text-xs sm:text-sm md:text-md transition-all duration-200 ${selectedCategory === category ? "bg-[#245BA7] text-white" : "bg-[#F8FBFF] text-[#456696]"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full px-4 sm:px-6 md:px-10 lg:px-20 mt-6 sm:mt-10">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white text-black p-4 sm:p-5 md:p-6 rounded-lg shadow-lg border border-[#1E437A] md:border-2 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-video mb-3">
                  {isExternalImage(course.thumbnail) ? (
                    <div
                      className="w-full h-full rounded-lg bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${Webinar1.src})`,
                      }}
                      aria-label={course.title}
                    />
                  ) : (
                    <Image
                      src={course.thumbnail || Webinar1}
                      fill
                      alt={course.title}
                      className="rounded-lg object-cover"
                    />
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-[#1E437A]">
                  {course.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#456696] mt-1 line-clamp-2">
                  {course.description}
                </p>
              </div>
              <Link href={`/webinars/${course?._id}`}>
                <Button className="w-full mt-4 bg-[#C83C92] text-white rounded-2xl text-sm md:text-base">
                  Enroll Now →
                </Button>
              </Link>
            </div>
          ))}
        </div>

      </section>

      {/* Upcoming Webinars */}
      <section className="relative bg-white px-6 py-12 mt-20 2xl:mr-40">
        <div className="max-w-5xl mx-auto text-left">
          <h2 className="text-5xl font-nav_link_font text-[#1E437A]">Upcoming Webinars</h2>
          <div className='hidden 2xl:block relative ml-150 mt-5'>
            <DottedPattern />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-30 max-w-5xl mx-auto mt-10">
          {upcomingWebinars.map((webinar) => (
            <div key={webinar._id} className="bg-white text-black p-6 rounded-lg shadow-lg border-[2px] border-[#1E437A]">
              {/* Add the thumbnail image here */}
              <div className="relative w-full aspect-video mb-4">
                {isExternalImage(webinar.thumbnail) ? (
                  <div
                    className="w-full h-full rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${webinar.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    aria-label={webinar.title}
                  />
                ) : (
                  <Image
                    src={webinar.thumbnail || Webinar1}
                    fill
                    alt={webinar.title}
                    className="rounded-lg object-cover"
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold text-[#1E437A]">{webinar.title}</h3>
              <p className="text-lg text-[#456696] mt-2">
                <strong>Date:</strong> {formatDate(webinar.date)} at {webinar.startTime}
              </p>
              <p className="text-lg text-[#456696] mt-1">
                <strong>Speaker:</strong> {webinar.speaker}
              </p>
              <p className="text-[15px] text-[#456696] mt-2">
                {webinar.description}
              </p>
              <Link href={`/webinars/registration/${webinar._id}`}>
                <Button className="w-full mt-4 bg-[#C83C92] text-white rounded-2xl">
                  Register Now →
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Past Webinars */}
      <section className="relative bg-white px-6 py-12 mt-20 2xl:mr-40">
        <div className="max-w-5xl mx-auto text-left">
          <h2 className="text-5xl font-nav_link_font text-[#1E437A]">Past Webinars</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-30 max-w-5xl mx-auto mt-10">
          {pastWebinars.map((webinar) => (
            <div key={webinar._id} className="bg-white text-black p-6 rounded-lg shadow-lg border-[2px] border-[#1E437A]">
              <h3 className="text-xl font-semibold text-[#1E437A]">{webinar.title}</h3>
              <p className="text-lg text-[#456696] mt-2">
                <strong>Date:</strong> {formatDate(webinar.date)}
              </p>
              <p className="text-lg text-[#456696] mt-1">
                <strong>Speaker:</strong> {webinar.speaker}
              </p>
              <p className="text-[15px] text-[#456696] mt-2">
                {webinar.description}
              </p>
              {webinar.url && (
                <Button className="w-full mt-4 bg-[#C83C92] text-white rounded-2xl" onClick={handleNavigate}>
                  Watch Recording
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-transparent py-16 2xl:mr-30">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <FaQuoteLeft className="text-[#C83C92] w-[55px] h-[55px] mr-280" />
          <p className="text-[#1E437A] text-[30px] text-center leading-[44px]">
            These courses have completely changed the way I support my child at home!
          </p>
          <div className="flex items-center mt-8 2xl:mr-200">
            <Image
              src={avatar}
              alt="Aarav's Mom"
              width={80}
              height={80}
              className="rounded-full border mr-4"
            />
            <div>
              <h4 className="text-[#1E437A] text-2xl font-semibold">Aarav's Mom</h4>
              <p className="text-[#456696] text-xl">Mumbai</p>
            </div>
          </div>
        </div>
        <div className="hidden xl:block absolute bottom-15 right-9">
          <DottedPattern />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Webinars;