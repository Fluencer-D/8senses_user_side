"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import FinalLogo from "../../../public/FinalLogo.svg";

interface NavItem {
  label: string;
  href: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
  ];

  const resourceItems: NavItem[] = [
    { label: "Blogs", href: "/blogs" },
    { label: "Our Store", href: "/store" },
    { label: "Health Library", href: "/health-library" },
    { label: "Webinars", href: "/webinars" },
    { label: "Gallery", href: "/gallery" },
    { label: "Career", href: "/career" },
    { label: "Members Club", href: "/members-club" },
  ];

  return (
    <nav className="fixed top-0 h-[100px] w-full bg-[#245BA7] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Adjusted for specific device sizes */}
          <div className="p-3 rounded-xl 
            max-[1024px]:p-2 
            max-[1024px]:ml-[-20px]"
          >
            <Link href="/">
              <Image 
                src={FinalLogo} 
                alt="8Senses Logo" 
                width={140} 
                height={68} 
                priority
                className="
                  max-[1024px]:w-[100px] 
                  max-[1024px]:h-[50px]
                "
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center space-x-12 font-nav_link_font ml-9">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-white text-xl font-medium hover:text-gray-200 transition">
                {item.label}
              </Link>
            ))}

            <div className="relative group">
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="flex items-center text-white text-lg font-medium hover:text-gray-200 transition"
              >
                Resources <ChevronDown className="ml-1 h-5 w-5 text-white" />
              </button>

              <AnimatePresence>
                {isResourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full left-0 w-80 bg-[#245BA7] shadow-lg"
                  >
                    <div className="py-2">
                      {resourceItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-6 py-4 text-white text-lg hover:bg-[#1d4a8c] border-b border-white font-nav_link_font last:border-none"
                          onClick={() => setIsResourcesOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/contact" className="text-white text-lg font-medium hover:text-gray-200 transition">
              Contact
            </Link>
          </div>

          {/* Take Service Button - Adjusted for specific device sizes */}
          <div className="hidden md:block text-center 
            max-[1024px]:mr-[-20px]"
          >
            <Link href="/booking-form">
              <Button className="
                bg-[#C83C92] 
                hover:bg-[#d43d73] 
                text-white 
                rounded-full 
                px-8 
                py-6 
                text-lg 
                font-medium 
                w-[160px] 
                h-[50px] 
                transition 
                duration-300 
                ease-in-out 
                transform 
                hover:scale-105
                max-[1024px]:px-4 
                max-[1024px]:py-2 
                max-[1024px]:text-base 
                max-[1024px]:w-[120px] 
                max-[1024px]:h-[40px]
              ">
                Take a service
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Updated for scrollability */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#245BA7] overflow-hidden fixed top-[100px] left-0 right-0 bottom-0"
          >
            <div 
              className="px-4 pt-2 pb-4 space-y-1 border-t border-white/20 
              h-[calc(100vh-100px)] 
              overflow-y-auto 
              scrollbar-thin 
              scrollbar-thumb-[#1d4a8c] 
              scrollbar-track-[#245BA7]"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-3 text-white text-lg font-medium hover:bg-[#1d4a8c] px-4 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div>
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="flex items-center w-full py-3 text-white text-lg font-medium hover:bg-[#1d4a8c] px-4 rounded"
                >
                  Resources <ChevronDown className={`ml-1 h-5 w-5 text-white transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isResourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 bg-[#1d4a8c]/50"
                    >
                      {resourceItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block py-3 text-white text-lg hover:bg-[#1d4a8c] px-4 rounded border-b border-white/10 last:border-none"
                          onClick={() => {
                            setIsResourcesOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link
                href="/contact"
                className="block py-3 text-white text-lg font-medium hover:bg-[#1d4a8c] px-4 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-2 pb-3">
                <Link href="/booking-form" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-[#C83C92] hover:bg-[#d43d73] text-white rounded-full px-6 py-4 text-lg font-medium w-full transition duration-300 ease-in-out">
                    Take a service
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}