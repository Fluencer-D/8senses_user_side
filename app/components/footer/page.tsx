"use client"
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#2D63AF] py-[80px] px-[160px] h-[260px] mt-[85.73px]">
      {/* Tablet-specific styling (iPad, Surface Pro 7, Nest Hub) */}
      <style jsx>{`
        @media (min-width: 768px) and (max-width: 1280px) {
          footer {
            height: auto !important;
            padding: 60px 80px !important;
          }
          nav {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px 40px !important;
            text-align: center !important;
          }
          .copyright {
            text-align: center !important;
            margin-top: 30px !important;
          }
        }
      `}</style>

      {/* Mobile-specific styling (unchanged) */}
      <style jsx>{`
        @media (max-width: 767px) {
          footer {
            height: auto !important;
            padding: 40px 20px !important;
            margin-top: 40px !important;
          }
          .container {
            flex-direction: column !important;
            gap: 30px !important;
          }
          nav {
            flex-direction: column !important;
            gap: 15px !important;
            text-align: center !important;
            margin-top: 20px !important;
          }
          .nav-link {
            margin: 0 !important;
          }
          .copyright {
            text-align: center !important;
            margin-top: 20px !important;
          }
        }
      `}</style>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Section: Logo & Navigation */}
        <div className="flex flex-col items-center md:items-start gap-[29px]">
          <Link href="/">
            <Image 
              src="/FinalLogo.svg" 
              alt="8Senses Logo" 
              width={182} 
              height={72} 
              priority 
              className="w-[150px] md:w-[182px]"
            />
          </Link>
          <nav className="mt-4 text-[18px] flex flex-wrap justify-center md:flex-row md:space-x-[54px] text-white">
            {["Home", "About", "Services", "Blogs", "Contact"].map((item, index) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              return (
                <Link 
                  key={index} 
                  href={path} 
                  className="nav-link relative group px-3 py-1 md:px-0 md:py-0"
                >
                  {item}
                  <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:scale-x-110"></span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Copyright Text */}
        <p className="copyright text-white text-[16px] md:text-[18px] mt-6 md:mt-0 md:text-right">
          Copyright © 2022 8Senses | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;