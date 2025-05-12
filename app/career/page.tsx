"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/page';
import Consultation from '../components/consultation/page';
import Footer from '../components/footer/page';
import Banner from '../components/CommonBanner/Banner';
import Contactimage from '@/public/ContactBanner.png';
import DottedPattern from '../components/dottedPattern/page';



interface Job {
  _id: string;
  title: string;
  type: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  applicationDeadline: string;
  isActive: boolean;
}

const Career = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        let jobsData = [];
        if (Array.isArray(data)) {
          jobsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          jobsData = data.data;
        } else if (data.jobs && Array.isArray(data.jobs)) {
          jobsData = data.jobs;
        }

        const activeJobs = jobsData
          .filter((job: Job) => job.isActive)
          .sort((a: Job, b: Job) => 
            new Date(b.applicationDeadline).getTime() - new Date(a.applicationDeadline).getTime()
          );
        
        setJobs(activeJobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Failed to load job openings. Please try again later.");
        
        setJobs([
          {
            _id: '1',
            title: "Occupational Therapist",
            type: "Full-Time",
            department: "Therapy",
            location: "New York",
            description: "Due to growing workload, we are looking for experienced occupational therapists to join our team.",
            requirements: ["2+ years experience", "State license", "Pediatric experience"],
            responsibilities: ["Patient evaluation", "Treatment planning", "Progress documentation"],
            qualifications: ["Master's degree in OT", "NBCOT certification"],
            benefits: ["Health insurance", "401(k)", "Paid time off"],
            applicationDeadline: "2023-12-31",
            isActive: true
          },
          {
            _id: '2',
            title: "Speech Therapist",
            type: "Part-Time",
            department: "Therapy",
            location: "Chicago",
            description: "Looking for speech therapists to work with our pediatric patients.",
            requirements: ["State license", "ASHA certification"],
            responsibilities: ["Speech assessments", "Therapy sessions", "Parent education"],
            qualifications: ["Master's degree in SLP"],
            benefits: ["Flexible schedule", "Professional development"],
            applicationDeadline: "2023-11-30",
            isActive: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar/>
        <Banner
          title="Join Our Team"
          description="Make a difference in children's lives with a rewarding career in pediatric therapy."
          imageSrc={Contactimage}
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C83C92]"></div>
        </div>
        <Footer/>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar/>
        <Banner
          title="Join Our Team"
          description="Make a difference in children's lives with a rewarding career in pediatric therapy."
          imageSrc={Contactimage}
        />
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer/>
      </>
    );
  }

  return (
    <>
      <Navbar/>
      <Banner
        title="Join Our Team"
        description="Make a difference in children's lives with a rewarding career in pediatric therapy."
        imageSrc={Contactimage}
      />

      <section className="relative p-8 pt-30 -mb-20 max-[1281px]:p-4 max-[1281px]:pt-20 max-[1281px]:-mb-10">
        <h2 className="text-[48px] font-nav_link_font text-[#1E437A] mb-[30px] ml-17 
          max-[1280px]:text-[32px] max-[1280px]:mb-[20px] max-[1280px]:ml-10
          max-[768px]:text-[28px] max-[640px]:text-[24px] max-[375px]:text-[22px]">
          Current Job Openings
        </h2>

        <div className="hidden xl:block absolute top-50 right-6 
          max-[1280px]:top-40 max-[1280px]:right-4
          max-[768px]:top-35 max-[640px]:right-2">
          <DottedPattern />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 ml-15 
          max-[1280px]:ml-10 max-[1280px]:gap-4
          max-[768px]:ml-8 max-[640px]:ml-4 max-[375px]:ml-2">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="rounded-xl border border-[#1E437A] bg-white p-6 w-[600px] h-auto min-h-[380px] max-[1280px]:w-full max-[1280px]:p-4 max-[768px]:min-h-[320px] max-[640px]:min-h-[280px]"
            >
              <h3 className="text-[28px] font-nav_link_font font-medium text-[#1E437A] 
                max-[1280px]:text-[24px] max-[768px]:text-[20px] max-[640px]:text-[18px]">
                {job.title}
              </h3>

              <div className="flex gap-2 mt-2">
                <span className="inline-block text-[15px] font-medium border rounded-full px-3 py-1 border-gray-400 text-[#1E437A] 
                  max-[768px]:text-[13px] max-[640px]:px-2 max-[640px]:py-0.5">
                  {job.type}
                </span>
                <span className="inline-block text-[15px] font-medium border rounded-full px-3 py-1 border-gray-400 text-[#1E437A] 
                  max-[768px]:text-[13px] max-[640px]:px-2 max-[640px]:py-0.5">
                  {job.department}
                </span>
              </div>

              <p className="mt-4 text-[#456696] text-[18px] break-words max-[1280px]:text-[16px] max-[768px]:text-[14px] max-[640px]:mt-2">
                {job.description}
              </p>

              <div className="mt-4">
                <p className="text-[#1E437A] font-medium">Requirements:</p>
                <ul className="list-disc pl-5 text-[#456696]">
                  {job.requirements.slice(0, 3).map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <button 
                className="mt-8 px-5 py-2 bg-[#C83C92] text-white font-medium w-[142px] h-[50px] rounded-full cursor-pointer 
                  max-[1280px]:mt-8 max-[1280px]:w-[130px] max-[1280px]:h-[45px]
                  max-[768px]:mt-6 max-[768px]:w-[120px] max-[768px]:h-[40px]
                  max-[640px]:mt-4 max-[640px]:w-[110px] max-[640px]:h-[38px]"
                // onClick={() => window.location.href = `/careers/apply/${job._id}`}
                onClick={() => window.location.href = `/career/jobForm`}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <Consultation/>
      <Footer/>
    </>
  );
};

export default Career;