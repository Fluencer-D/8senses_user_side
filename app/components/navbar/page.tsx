"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import FinalLogo from "../../../public/FinalLogo.svg"
import AuthModal from "../auth/AuthModal"

interface NavItem {
  label: string
  href: string
}

interface NavbarProps {
  user?: any
  isAuthenticated?: boolean
  onLogout?: () => void
}

export default function Navbar({  }: NavbarProps = {}) { //user, isAuthenticated, onLogout
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
  ]



const handleAuthModal = () =>{
  setShowAuthModal(true);
}


const resourceItems: NavItem[] = [
  { label: "Blogs", href: "/blogs" },
  { label: "Our Store", href: "/store" },
  { label: "Health Library", href: "/health-library" },
  // { label: "Webinars", href: "/webinars" },
  { label: "Gallery", href: "/gallery" },
  { label: "Career", href: "/career" },
  { label: "Members Club", href: "/members-club" },
  ...(user?.membership
    ? [{ label: "Dashboard", href: "/userDashboard" }]
    : []),
];

  const handleLogout = async () => {
    if (onLogout) {
      onLogout()
    }
    setShowUserDropdown(false)
    setIsMenuOpen(false)
  }


  const onLogout=() => {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          setUser(null)
          setIsAuthenticated(false)
        }


    useEffect(() => {
      const checkAuthStatus = async () => {
        const token = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")
  
        if (token && savedUser) {
          try {
            // Verify token is still valid
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL }/api/auth/me`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            )
  
            if (response.ok) {
              const data = await response.json()
              setUser(data.data)

              console.log("daat",data.data)
              setIsAuthenticated(true)
            } else {
              // Token is invalid, clear storage
              localStorage.removeItem("token")
              localStorage.removeItem("user")
            }
          } catch (error) {
            console.error("Auth verification failed:", error)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
          }
        }
      }
  
      checkAuthStatus()
    }, []);

  
  const handleAuthSuccess = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    setShowAuthModal(false)

    // If user was trying to select a plan, redirect them to it
    if (selectedPlanId) {
      router.push(`/members-club/${selectedPlanId}`)
    }
  }


  return (
    <nav className="fixed top-0 h-[100px] w-full bg-[#245BA7] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Adjusted for specific device sizes */}
          <div className="p-3 rounded-xl max-[1024px]:p-2 max-[1024px]:ml-[-20px]">
            <Link href="/">
              <Image
                src={FinalLogo || "/placeholder.svg"}
                alt="8Senses Logo"
                width={140}
                height={68}
                priority
                className="max-[1024px]:w-[100px] max-[1024px]:h-[50px]"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center space-x-12 font-nav_link_font ml-9">
            {navItems.map((item) => (
              <Link
                key={item?.label}
                href={item?.href}
                className="text-white text-xl font-medium hover:text-gray-200 transition"
              >
                {item?.label}
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
                          key={item?.label}
                          href={item?.href}
                          className="block px-6 py-4 text-white text-lg hover:bg-[#1d4a8c] border-b border-white font-nav_link_font last:border-none"
                          onClick={() => setIsResourcesOpen(false)}
                        >
                          {item?.label}
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

          {/* Desktop Auth/Service Button Section */}
          <div className="hidden md:block text-center max-[1024px]:mr-[-20px]">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </div>
                  <span className="font-medium text-lg">
                    {user.firstName} {user.lastName}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <AnimatePresence>
                  {showUserDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        {user.membership && (
                          <p className="text-xs text-[#C83C92] font-medium mt-1">
                            {user.membership.toUpperCase()} Member
                          </p>
                        )}
                      </div>

                      {/* <button
                        onClick={() => setShowUserDropdown(false)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile Settings
                      </button> */}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
                <Button
                  onClick={handleAuthModal}
                  className="
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
                  "
                >
                  Login
                </Button>
            )}
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
              {/* Mobile Navigation Items */}
              {navItems.map((item) => (
                <Link
                  key={item?.label}
                  href={item?.href}
                  className="block py-3 text-white text-lg font-medium hover:bg-[#1d4a8c] px-4 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item?.label}
                </Link>
              ))}

              {/* Mobile Resources Dropdown */}
              <div>
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="flex items-center w-full py-3 text-white text-lg font-medium hover:bg-[#1d4a8c] px-4 rounded"
                >
                  Resources{" "}
                  <ChevronDown
                    className={`ml-1 h-5 w-5 text-white transition-transform duration-200 ${
                      isResourcesOpen ? "rotate-180" : ""
                    }`}
                  />
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
                          key={item?.label}
                          href={item?.href}
                          className="block py-3 text-white text-lg hover:bg-[#1d4a8c] px-4 rounded border-b border-white/10 last:border-none"
                          onClick={() => {
                            setIsResourcesOpen(false)
                            setIsMenuOpen(false)
                          }}
                        >
                          {item?.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Contact Link */}
              <Link
                href="/contact"
                className="block py-3 text-white text-lg font-medium hover:bg-[#1d4a8c] px-4 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Auth Section */}
              {isAuthenticated && user ? (
                <div className="border-t border-white/20 pt-4 mt-4">
                  <div className="px-4 py-3 bg-white/10 rounded-lg mb-3">
                    <p className="text-white font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-white/80 text-sm">{user.email}</p>
                    {user.membership && (
                      <p className="text-[#C83C92] text-xs font-medium mt-1">{user.membership.toUpperCase()} Member</p>
                    )}
                  </div>

                  {/* <button
                    className="w-full text-left py-3 text-white text-lg font-medium hover:bg-[#1d4a8c] px-4 rounded flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-2" />
                    Profile Settings
                  </button> */}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-3 text-white text-lg font-medium hover:bg-[#1d4a8c] px-4 rounded flex items-center"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-2 pb-3 border-t border-white/20 mt-4">
                  {/* <Link href="/booking-form" onClick={() => setIsMenuOpen(false)}> */}
                    <Button onClick={handleAuthModal} className="bg-[#C83C92] hover:bg-[#d43d73] text-white rounded-full px-6 py-4 text-lg font-medium w-full transition duration-300 ease-in-out">
                      Login
                    </Button>
                  {/* </Link> */}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
    />
    </nav>
  )
}
