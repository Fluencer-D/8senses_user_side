import React from "react";

interface PricingCardProps {
  title?: string;
  price?: string;
  description?: string;
  desc2?:string;
  features?: string[];
  isPremium?: boolean;
  onClick?: () => void; // Add this line
}

const PricingCard: React.FC<PricingCardProps> = ({
  title="",
  price="",
  description="",
  desc2="",
  features=[],
  isPremium = false,
  onClick, 

}) => {
  return (
    <div
      className={`rounded-3xl p-4 md:p-6 lg:p-8 w-full max-w-full md:max-w-lg lg:max-w-xl border-2 border-[#184179] flex flex-col justify-between ${
        isPremium ? "bg-[#184179] text-white" : "bg-white text-[#184179] border border-gray-300"
      }`}
    >
      {/* Title & Price */}
      <div>
        <h3 className="text-lg sm:text-xl font-medium font-nav_link_font">{title}</h3>
        <p className="text-2xl sm:text-4xl font-normal mt-2">{price}</p>
      
      </div>

      {/* Features List */}
      <ul className="mt-4 space-y-2 text-xs sm:text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className={`${isPremium ? `bg-[#4B4B4B80]` : `bg-[#F2F2F2]`} flex-shrink-0`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
                <g clipPath="url(#clip0_103_1344)">
                  <path d="M4.14062 9.00054L7.61285 12.4728L14.5573 5.52832" stroke="#AFAFAF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_103_1344">
                    <rect width="16.6667" height="16.6667" fill="white" transform="translate(0.667969 0.665039)"/>
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className={`${!isPremium ? `text-[#456696]` : `text-white`}`}>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button onClick={onClick} className="mt-4 sm:mt-6 w-full bg-[#C83790] text-white py-2 sm:py-3 rounded-3xl font-semibold text-sm sm:text-base">
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;