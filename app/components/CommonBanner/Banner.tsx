import Image from 'next/image';
import type { StaticImageData } from "next/image";

export interface BannerProps {
  title?: string;
  description?: string;
  imageSrc?: string | StaticImageData;
}


const Banner: React.FC<BannerProps> = ({ title, description, imageSrc }) => {
  return (
    <section className="2xl:relative flex flex-col lg:items-center 2xl:items-stretch lg:flex-row justify-between h-auto 2xl:h-[500px] w-full bg-[#FFEBF7] overflow-hidden md:mt-10 sm:mt-0 xl:mt-10 2xl:mt-0">
      {/* Content Section with mid-size device adjustments */}
      <div className="w-full 2xl:flex-1 px-6 lg:px-12 py-12 lg:py-8 mt-20 2xl:py-0 flex flex-col justify-center 2xl:ml-26 text-center lg:text-left lg:mt-10 3xl:mt-0">
        <h1 className="text-[#1E437A] font-nav_link_font text-4xl lg:text-5xl 2xl:text-[58px] font-medium leading-tight lg:leading-none tracking-[0.72px] 2xl:ml-10">
          {title}
        </h1>
        <p className="text-[#456696] font-nav_link_font text-lg lg:text-xl 2xl:text-[25px] font-normal 2xl:ml-10 leading-relaxed lg:leading-snug 2xl:leading-[44px] tracking-[0.64px] mt-4 w-full lg:w-[80%] 2xl:w-[90%] mx-auto lg:mx-0">
          {description}
        </p>
      </div>

      {/* Image Section - ONLY shown on true desktop (≥1536px) */}
      <div className="hidden 2xl:block relative flex-1">
        {/* Pink Circle */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/ h-[880px] w-[1200px] -mr-[520px] mt-5 bg-[#C83C92] rounded-full"></div>
        
        {/* Image inside circle */}
        <div className="relative mt-13 h-[450px] ml-9 w-full">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={"Banner Image"}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;  