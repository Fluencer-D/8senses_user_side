"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar/page";
import Banner from "../components/CommonBanner/Banner";
import MembersBanner from "@/public/MembersBanner.png";
import DottedPattern from "../components/dottedPattern/page";
import Image from "next/image";
import AbtIconContainer from "@/public/AbtIconContainer.png";
import PricingCard from "../components/PricingCard/PricingCard";
import Footer from "../components/footer/page";
import AuthModal from "../components/auth/AuthModal";
import { useRouter } from "next/navigation";
import member_club_img from "@/public/member_club_img.png";
import axios from "axios";

// Define TypeScript interfaces
interface Service {
  title: string;
  description: string;
}

interface PlanFeatures {
  accessToWebinars: boolean;
  customerDiscounts: boolean;
  autoRenewal: boolean;
  displayOnPricingPage: boolean;
  accessToPremiumCourses: boolean;
  [key: string]: boolean;
}

interface SubscriptionPlan {
  _id?: string;
  name: string;
  description: string;
  status: string;
  price: number;
  billingCycle: string;
  features: PlanFeatures;
  order: number;
  trialPeriod: number;
  gracePeriod: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: SubscriptionPlan[];
  message?: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  membership: string | null;
}

// Helper function to convert billing cycle to duration
const getBillingCycleDuration = (
  billingCycle: string
): { duration: number; unit: string } => {
  switch (billingCycle) {
    case "quarterly":
      return { duration: 3, unit: "months" };
    case "biannual":
      return { duration: 6, unit: "months" };
    case "annual":
      return { duration: 12, unit: "months" };
    case "monthly":
      return { duration: 1, unit: "month" };
    default:
      return { duration: 1, unit: "month" };
  }
};

// Helper function to convert features object to feature strings array
const convertFeaturesToArray = (plan: SubscriptionPlan): string[] => {
  const featuresArray: string[] = [];

  // Basic plan features
  if (plan.order === 1) {
    featuresArray.push("Access to Online Learning Hub");
    featuresArray.push("Weekly Motivational Emails");
    featuresArray.push("1 Monthly Expert Discussion");
    featuresArray.push("Access to Parent Community");
  }
  // Advanced plan features
  else if (plan.order === 2) {
    featuresArray.push("Everything in the Basic Plan PLUS");
    if (plan.features.accessToWebinars) {
      featuresArray.push("Gluten-free casein free recipes");
    }
    featuresArray.push("Personalized Progress Tracking Templates");
    if (plan.features.customerDiscounts) {
      featuresArray.push("10% Discount on Workshops");
    }
    featuresArray.push("Priority Access to New Content");
  }
  // Premium plan features
  else if (plan.order === 3) {
    featuresArray.push("Everything in the Advanced Plan PLUS");
    featuresArray.push(
      "Gluten-free casein free recipes and full day meal plan"
    );
    featuresArray.push("Detox diet recipes");
    featuresArray.push(
      "1 Private Consultation (30 mins) with Dr.Shrruti Paatil, Pediatric Occupational Therapist"
    );
    if (plan.features.customerDiscounts) {
      featuresArray.push("15% on Workshops");
    }
    if (plan.features.accessToPremiumCourses) {
      featuresArray.push(
        "Special Recognition as a Parent Advocate in our Community"
      );
    }
  }

  return featuresArray;
};

const services: Service[] = [
  {
    title: "Exclusive Online Learning Hub",
    description:
      "Access to expert-designed materials, videos, and practical exercises to support your child's progress at home.",
  },
  {
    title: "Weekly Motivational Emails",
    description:
      "Get inspiring success stories, expert advice, and easy-to-implement strategies to keep you motivated.",
  },
  {
    title: "Monthly Online Discussion with Experts",
    description:
      "Participate in a live Q&A session where you can discuss concerns, get advice, and learn from specialists.",
  },
  {
    title: "Parent Community Forum",
    description:
      "Join a private members-only group where you can connect with other parents, share experiences, and support each other..",
  },
  {
    title: "Discounts on Workshops",
    description:
      "Enjoy exclusive discounts on therapy programs, workshops, and special events.",
  },
  {
    title: "Personalized Progress Tracking Tools",
    description:
      "Download goal-setting and progress monitoring templates to track your child's development effectively.",
  },
  {
    title: "Special Curated Recipes",
    description:
      "Access nutritionist-approved, kid-friendly recipes designed to support sensory needs, oral motor development, and picky eating habits.",
  },
];

const Members: React.FC = () => {
  const router = useRouter();
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlan[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Authentication states
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          // Verify token is still valid
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUser(data.data);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.error("Auth verification failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    const fetchSubscriptionPlans = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/plans`
        );
        console.log("API Response:", response.data);

        const plans = response.data.data || [];
        plans.sort((a, b) => a.order - b.order);

        setSubscriptionPlans(plans);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching subscription plans:", err);
        setError("Failed to load subscription plans. Please try again later.");
        setLoading(false);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  const handlePlanSelect = (planId: string) => {
    if (!isAuthenticated) {
      setSelectedPlanId(planId);
      setAuthMode("login");
      setShowAuthModal(true);
      return;
    }
    router.push(`/members-club/${planId}`);
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);

    // If user was trying to select a plan, redirect them to it
    if (selectedPlanId) {
      router.push(`/members-club/${selectedPlanId}`);
    }
  };

  return (
    <>
      <Navbar
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setIsAuthenticated(false);
        }}
      />

      <Banner
        title="8 Senses Members Club!"
        description="Exclusive Support for Parents & Caregivers of Children with Special Needs"
        imageSrc={MembersBanner}
      />

      {/* what join section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl 2xl:ml-20">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
          {/* Left content section */}
          <div className="w-full md:w-1/2 mt-15">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-nav_link_font text-[#1E437A] mb-6 md:mb-8">
              What is 8 Senses Members Club?
            </h1>

            <ul className="list-none pl-0">
              <li className="flex mb-6">
                <span className="mr-3 text-xl text-[#456696]">·</span>
                <p className="text-base md:text-lg 2xl:text-xl text-[#456696]">
                  At 8 Senses Pediatric Occupational Therapy Clinic, we
                  understand that parenting a child with neurological and
                  developmental challenges comes with unique struggles.
                </p>
              </li>

              <li className="flex">
                <span className="mr-3 text-xl text-[#456696]">·</span>
                <p className="text-base md:text-lg 2xl:text-xl text-[#456696]">
                  The 8 Senses Members Club is designed to provide you with
                  continuous guidance, expert knowledge, and a supportive
                  community to help your child thrive.
                </p>
              </li>
            </ul>
          </div>

          {/* Right image section */}
          <div className="w-full md:w-1/2 sm:mt-0 md:mt-20 2xl:mt-10">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={member_club_img || "/placeholder.svg"}
                alt="Occupational therapist working with child"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why join section */}
      <section className="relative mt-[30px] sm:mt-[50px] md:mt-[100px] lg:mt-[150px] bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-20 lg:px-32 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 2xl:-mb-15">
        <div className="hidden lg:block absolute -mt-80 ml-[125px] z-10">
          <DottedPattern />
        </div>
        <div className="text-center lg:text-left w-full lg:w-auto">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-nav_link_font font-normal 
                        leading-tight tracking-wide text-[#1E437A] mb-4"
          >
            Why Join the Members Club?
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl lg:text-[26px] font-normal 
                        leading-relaxed tracking-wide text-[#456696] font-urbanist mb-6"
          >
            Get access to expert resources, special discounts, and a community
            that helps your child thrive!
          </p>
          <div className="flex justify-center lg:justify-start">
            <button
              className="bg-[#C83C92] text-white text-sm sm:text-base md:text-lg font-medium 
                            px-4 py-2 sm:px-5 sm:py-3 rounded-full cursor-pointer"
            >
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
                    src={AbtIconContainer || "/placeholder.svg"}
                    alt="Check Icon"
                    width={80}
                    height={80}
                    className="sm:w-[110px] sm:h-[110px]"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 60 60"
                      fill="none"
                    >
                      <path
                        d="M50 17.5L25 42.5L12.5 30"
                        stroke="white"
                        strokeWidth="3.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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

      <div className="text-center mt-12 sm:mt-[100px] mb-8 sm:mb-[40px] px-4">
        <h1 className="font-nav_link_font text-2xl sm:text-4xl lg:text-5xl text-[#1E437A] mb-3 sm:mb-5">
          Choose Your Membership Plan
        </h1>
        <h3 className="font-nav_link_font text-base sm:text-xl lg:text-2xl text-[#456696] px-4">
          Select the perfect plan to access expert guidance, exclusive
          <br className="hidden sm:block" /> resources, and a supportive parent
          community.
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

        {loading ? (
          <div className="flex justify-center w-full py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#245CA7]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : subscriptionPlans.length > 0 ? (
          subscriptionPlans.map((plan, index) => {
            const durationInfo = getBillingCycleDuration(plan.billingCycle);
            const featuresList = convertFeaturesToArray(plan);

            return (
              <PricingCard
                key={plan._id || index}
                title={`${plan.name} (${durationInfo.duration} ${durationInfo.unit})`}
                price={`₹${plan.price}`}
                description={
                  plan.description ||
                  `per user for ${durationInfo.duration} ${durationInfo.unit}`
                }
                features={featuresList}
                isPremium={plan.order === 3}
                onClick={() => handlePlanSelect(plan._id || "")}
              />
            );
          })
        ) : (
          <>
            <PricingCard
              title="Basic Plan (3 Months)"
              price="₹2,999"
              description="per user for 3 months"
              features={[
                "Access to Online Learning Hub",
                "Weekly Motivational Emails",
                "1 Monthly Expert Discussion",
                "Access to Parent Community",
              ]}
              onClick={() => handlePlanSelect("basic")}
            />
            <PricingCard
              title="Advanced Plan (6 Months)"
              price="₹5,499"
              description="per user for 6 months"
              features={[
                "Everything in the Basic Plan PLUS",
                "Gluten-free casein free recipes",
                "Personalized Progress Tracking Templates",
                "10% Discount on Workshops",
                "Priority Access to New Content",
              ]}
              onClick={() => handlePlanSelect("advanced")}
            />
            <PricingCard
              title="Premium Plan (12 Months)"
              price="₹9,999"
              description="per user for 12 months"
              features={[
                "Everything in the Advanced Plan PLUS",
                "Gluten-free casein free recipes and full day meal plan",
                "Detox diet recipes",
                "1 Private Consultation (30 mins) with Dr.Shrruti Paatil, Pediatric Occupational Therapist",
                "15% on Workshops",
                "Special Recognition as a Parent Advocate in our Community",
              ]}
              isPremium
              onClick={() => handlePlanSelect("premium")}
            />
          </>
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      <Footer />
    </>
  );
};

export default Members;
