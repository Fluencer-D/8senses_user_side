"use client"
import React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Calendar,
  Mail,
  ChefHat,
  Video,
  WorkflowIcon as WorkshopIcon,
  MessageSquare,
  Download,
  Star,
  Crown,
  Bell,
  Play,
  FileText,
  X,
  Search,
  ArrowLeft,
  ArrowRight,
  Eye,
  Printer,
  Share2,
  BookOpen,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Loader2,
  Leaf,
  Clock,
  CalendarDays,
  Heart,
  Sparkles,
  Link,
  Hourglass,
  CheckCircle,
  XCircle,
  UserIcon,
  Tag,
} from "lucide-react"
import Navbar from "../components/navbar/page"
// API Configuration
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`
// Types based on your API response
interface User {
  name: string
  email: string
  role: string
  membership: string
  subscriptionStart?: string
  subscriptionEnd?: string
}
interface Recipe {
  _id: string
  title: string
  description: string
  category: string
  image: string
  prepTime: string
  cookTime: string
  servings: number
  ingredients: string[]
  instructions: string[]
  downloads: number
  isGlutenFree: boolean
  tags: string[]
  nutritionFacts: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  createdAt: string
  updatedAt: string
}
interface Workshop {
  _id: string
  title: string
  description: string
  instructor: string
  date: string
  startTime: string
  endTime: string
  location: string
  maxParticipants: number
  currentParticipants: number
  price: number
  memberDiscount: number
  category: string
  status: string
  image: string
  materials: string[]
  prerequisites: string[]
  availableSpots: number
}
interface Webinar {
  _id: string
  title: string
  speaker: string
  date: string
  duration: number
  startTime: string
  maxRegistrations: number
  status: string
  url: string
  thumbnail: string
  description: string
  tags: string[]
  participantsCount: number
  availableSlots: number
}
interface Email {
  _id: string
  subject: string
  content: string
  createdAt: string
}
interface DetoxPlan {
  _id: string
  title: string
  description: string
  duration: string
  meals: {
    _id: string
    day: string
    mealPlan: string
  }[]
  createdBy: string
  createdAt: string
  updatedAt: string
}

// New Meeting Interface
interface Meeting {
  _id: string
  meetLink: string
  date: string // ISO date string
  startTime: string // e.g., "10:00 AM"
  endTime: string // e.g., "11:00 AM"
  approxDuration: string // e.g., "60 minutes"
  hostDoctor: string
  associatedPlans: string[] // e.g., ["prime", "basic"]
  createdAt: string
  updatedAt: string
  title?: string // Optional title for display, if not present, use "Untitled Meeting"
  description?: string // Optional description for display
}

// Updated DashboardData Interface to include Meetings
interface DashboardData {
  isSubscribed: boolean
  user: User
  recipes: Recipe[]
  workshops: Workshop[]
  webinars: Webinar[]
  emails: Email[]
  detoxPlans: DetoxPlan[]
  meetings: Meeting[] // Added meetings
}
// Custom Components (same as before)
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
)
const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
)
const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)
const CardFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)
const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
)
const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
)
const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  disabled?: boolean
  [key: string]: any
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    default: "bg-[#C83C92]  text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700",
  }
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8",
  }
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode
  variant?: "default" | "secondary"
  className?: string
}) => {
  const variants = {
    default: "bg-[#C83C92]  text-white",
    secondary: "bg-gray-100 text-gray-800",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
const Avatar = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>
)
const AvatarImage = ({ src, alt }: { src: string; alt: string }) => (
  <img className="aspect-square h-full w-full object-cover" src={src || "/placeholder.svg"} alt={alt} />
)
const AvatarFallback = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600">
    {children}
  </div>
)
const Progress = ({ value, className = "" }: { value: number; className?: string }) => (
  <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
    <div
      className="h-full w-full flex-1 bg-[#C83C92]  transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
)
const Dialog = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 max-h-[90vh] w-full max-w-lg overflow-auto">{children}</div>
    </div>
  )
}
const DialogContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>{children}</div>
)
const DialogHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
)
const DialogTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h2>
)
const DialogDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-gray-600 mt-2 ${className}`}>{children}</p>
)
const DialogClose = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <button
    className={`absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 ${className}`}
  >
    {children}
  </button>
)
const DialogFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)
const Input = ({
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}: {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  [key: string]: any
}) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    {...props}
  />
)
const Select = ({
  value,
  onValueChange,
  children,
}: {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative">
      <button
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md">
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement, {
              onClick: () => {
                onValueChange((child as React.ReactElement).props.value)
                setIsOpen(false)
              },
            }),
          )}
        </div>
      )}
    </div>
  )
}
const SelectTrigger = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)
const SelectValue = ({ placeholder }: { placeholder: string }) => <span>{placeholder}</span>
const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>
const SelectItem = ({
  value,
  children,
  onClick,
}: {
  value: string
  children: React.ReactNode
  onClick?: () => void
}) => (
  <div
    className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    onClick={onClick}
  >
    {children}
  </div>
)
// Video Player Component
const VideoPlayer = ({
  src,
  thumbnail,
  title,
}: {
  src: string
  thumbnail?: string
  title?: string
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleLoadedData = () => {
      setIsLoading(false)
      setDuration(video.duration)
    }
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }
    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
    }
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("error", handleError)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("error", handleError)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [src])
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    video.currentTime = newTime
  }
  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      video.requestFullscreen()
    }
  }
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }
  if (hasError) {
    return (
      <div className="aspect-video w-full bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Failed to load video</p>
          <p className="text-xs opacity-75 mt-1">Please check the video URL</p>
        </div>
      </div>
    )
  }
  return (
    <div
      className="relative aspect-video w-full bg-black group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={thumbnail}
        preload="metadata"
        crossOrigin="anonymous"
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center text-white">
            <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}
      {/* Play Button Overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button onClick={togglePlay} className="bg-black/50 hover:bg-black/70 rounded-full p-4 transition-colors">
            <Play className="h-12 w-12 text-white fill-white" />
          </button>
        </div>
      )}
      {/* Controls */}
      {showControls && !isLoading && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer" onClick={handleSeek}>
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="hover:bg-white/20 rounded-full p-2 transition-colors">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
              </button>
              <button onClick={toggleMute} className="hover:bg-white/20 rounded-full p-2 transition-colors">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <button onClick={toggleFullscreen} className="hover:bg-white/20 rounded-full p-2 transition-colors">
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default function UserDashboard() {
  // State for API data
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // UI State
  const [selectedVideo, setSelectedVideo] = useState<Webinar | null>(null)
  const [showAllRecipes, setShowAllRecipes] = useState(false)
  const [showAllEmails, setShowAllEmails] = useState(false)
  const [showAllDetoxPlans, setShowAllDetoxPlans] = useState(false)
  const [showAllMeetings, setShowAllMeetings] = useState(false) // New state for meetings dialog
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [selectedDetoxPlan, setSelectedDetoxPlan] = useState<DetoxPlan | null>(null)
  const [selectedMeetingDetail, setSelectedMeetingDetail] = useState<Meeting | null>(null) // New state for meeting detail dialog
  const [recipeSearchQuery, setRecipeSearchQuery] = useState("")
  const [recipeCategory, setRecipeCategory] = useState("all")
  const [emailSearchQuery, setEmailSearchQuery] = useState("")
  const [detoxSearchQuery, setDetoxSearchQuery] = useState("")
  const [meetingSearchQuery, setMeetingSearchQuery] = useState("") // New state for meeting search

  // Check if user has premium membership
  const isPremium = dashboardData?.user?.membership === "premium plan"
  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem("token") // Adjust based on your auth implementation
      const response = await fetch(`${API_BASE_URL}/users/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      if (result.success) {
        setDashboardData(result.data)
      } else {
        throw new Error("Failed to fetch dashboard data")
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch dashboard data")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchDashboardData()
  }, [])
  // Filter recipes based on search query and category
  const filteredRecipes =
    dashboardData?.recipes?.filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(recipeSearchQuery.toLowerCase())
      const matchesCategory = recipeCategory === "all" || recipe.category.toLowerCase() === recipeCategory.toLowerCase()
      return matchesSearch && matchesCategory
    }) || []
  // Filter emails based on search query
  const filteredEmails =
    dashboardData?.emails?.filter(
      (email) =>
        email.subject.toLowerCase().includes(emailSearchQuery.toLowerCase()) ||
        email.content.toLowerCase().includes(emailSearchQuery.toLowerCase()),
    ) || []
  // Filter detox plans based on search query
  const filteredDetoxPlans =
    dashboardData?.detoxPlans?.filter(
      (plan) =>
        plan.title.toLowerCase().includes(detoxSearchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(detoxSearchQuery.toLowerCase()),
    ) || []

  // New: Filter meetings based on search query
  const filteredMeetings =
    dashboardData?.meetings?.filter(
      (meeting) =>
        meeting.title?.toLowerCase().includes(meetingSearchQuery.toLowerCase()) ||
        meeting.hostDoctor.toLowerCase().includes(meetingSearchQuery.toLowerCase()) ||
        meeting.meetLink.toLowerCase().includes(meetingSearchQuery.toLowerCase()),
    ) || []

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate).toLocaleDateString()
    const end = new Date(endDate).toLocaleDateString()
    return `${start} - ${end}`
  }
  const getSubscriptionStatus = () => {
    if (!dashboardData?.user?.subscriptionEnd) return "Unknown"
    const endDate = new Date(dashboardData.user.subscriptionEnd)
    const now = new Date()
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    if (daysLeft < 0) return "Expired"
    if (daysLeft <= 7) return `Expires in ${daysLeft} days`
    return "Active"
  }
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }
  const calculateMembershipProgress = () => {
    // This could be based on actual membership data from your API
    return isPremium ? 90 : 45
  }

  // New: Get meeting status
  const getMeetingStatus = (meeting: Meeting) => {
    const now = new Date()
    const meetingDate = new Date(meeting.date)
    const [startHour, startMinute] = meeting.startTime.split(":").map(Number)
    const [endHour, endMinute] = meeting.endTime.split(":").map(Number)

    const meetingStart = new Date(meetingDate)
    meetingStart.setHours(startHour, startMinute, 0, 0)

    const meetingEnd = new Date(meetingDate)
    meetingEnd.setHours(endHour, endMinute, 0, 0)

    if (now < meetingStart) {
      return { status: "Upcoming", icon: <Hourglass className="w-3 h-3" />, color: "bg-blue-100 text-blue-800" }
    } else if (now >= meetingStart && now <= meetingEnd) {
      return { status: "Ongoing", icon: <CheckCircle className="w-3 h-3" />, color: "bg-green-100 text-green-800" }
    } else {
      return { status: "Completed", icon: <XCircle className="w-3 h-3" />, color: "bg-gray-100 text-gray-800" }
    }
  }

  const DashboardCard = ({
    title,
    description,
    icon: Icon,
    children,
    premium = false,
    className = "",
  }: {
    title: string
    description: string
    icon: any
    children: React.ReactNode
    premium?: boolean
    className?: string
  }) => (
    <Card className={`relative ${className} ${premium && !isPremium ? "opacity-60" : ""}`}>
      {premium && !isPremium && (
        <div className="absolute top-3 right-3">
          <Crown className="h-4 w-4 text-yellow-500" />
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {premium && !isPremium ? (
          <div className="text-center py-6">
            <p className="text-sm text-gray-600 mb-3">Premium Feature</p>
            <Button variant="outline" size="sm">
              Upgrade to Premium
            </Button>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
  // Function to download recipe
  const downloadRecipe = (recipe: Recipe) => {
    const recipeText = `${recipe.title}
Category: ${recipe.category}
Prep Time: ${recipe.prepTime}
Cook Time: ${recipe.cookTime}
Servings: ${recipe.servings}

DESCRIPTION:
${recipe.description}

INGREDIENTS:
${recipe.ingredients.join("\n")}

INSTRUCTIONS:
${recipe.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join("\n")}

NUTRITION FACTS:
Calories: ${recipe.nutritionFacts.calories}
Protein: ${recipe.nutritionFacts.protein}g
Carbs: ${recipe.nutritionFacts.carbs}g
Fat: ${recipe.nutritionFacts.fat}g
Fiber: ${recipe.nutritionFacts.fiber}g
Tags: ${recipe.tags.join(", ")}
Gluten-Free: ${recipe.isGlutenFree ? "Yes" : "No"}
    `
    const blob = new Blob([recipeText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${recipe.title.replace(/\s+/g, "-").toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  // Function to download email
  const downloadEmail = (email: Email) => {
    const emailText = `Subject: ${email.subject}
Date: ${formatDate(email.createdAt)}

${email.content}
    `
    const blob = new Blob([emailText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `email-${email._id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  // Function to download detox plan
  const downloadDetoxPlan = (plan: DetoxPlan) => {
    const planText = `${plan.title}
Duration: ${plan.duration}

DESCRIPTION:
${plan.description}

MEAL PLAN:
${plan.meals.map((meal) => `${meal.day}: ${meal.mealPlan}`).join("\n\n")}

Created: ${formatDate(plan.createdAt)}
    `
    const blob = new Blob([planText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${plan.title.replace(/\s+/g, "-").toLowerCase()}-detox-plan.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-medium mb-2">Error Loading Dashboard</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchDashboardData} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }
  // No data state
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No dashboard data available</p>
          <Button onClick={fetchDashboardData} variant="outline" className="mt-4 bg-transparent">
            Refresh
          </Button>
        </div>
      </div>
    )
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen  bg-gray-50 p-2 mt-22 md:p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{getInitials(dashboardData.user.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {dashboardData.user.name.split(" ")[0]}!</h1>
                <p className="text-gray-600 mt-1">Manage your wellness journey</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={isPremium ? "default" : "secondary"} className="gap-1">
                {isPremium && <Crown className="h-3 w-3" />}
                {isPremium ? "Premium Member" : "Basic Member"}
              </Badge>
              {dashboardData.isSubscribed && (
                <Badge variant="default" className="bg-green-600">
                  Subscribed
                </Badge>
              )}
            </div>
          </div>
          {/* Membership Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-blue-600" />
                <CardTitle>Membership Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Current Plan</p>
                  <p className="text-2xl font-bold capitalize">{dashboardData.user.membership}</p>
                  <Badge variant={dashboardData.isSubscribed ? "default" : "secondary"}>
                    {getSubscriptionStatus()}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Account Details</p>
                  <p className="text-lg capitalize">{dashboardData.user.role}</p>
                  <p className="text-sm text-gray-600">{dashboardData.user.email}</p>
                </div>
                {dashboardData.user.subscriptionStart && dashboardData.user.subscriptionEnd && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Subscription Period</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {formatDateRange(dashboardData.user.subscriptionStart, dashboardData.user.subscriptionEnd)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Wellness Journey</p>
                  <Progress value={calculateMembershipProgress()} className="w-full" />
                  <p className="text-xs text-gray-600">{calculateMembershipProgress()}% complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Weekly Email Archive */}
            <DashboardCard title="Weekly Email Archive" description="Access all your motivational emails" icon={Mail}>
              <div className="space-y-4">
                {dashboardData.emails.slice(0, 3).map((email) => (
                  <div
                    key={email._id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{email.subject}</p>
                      <p className="text-xs text-gray-600 mt-1">{formatDate(email.createdAt)}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs ml-2">
                      New
                    </Badge>
                  </div>
                ))}
                {dashboardData.emails.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-6">No emails available</p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => setShowAllEmails(true)}
                  disabled={dashboardData.emails.length === 0}
                >
                  View All Emails
                </Button>
              </div>
            </DashboardCard>
            {/* Recipe Collection */}
            <DashboardCard title="Recipe Collection" description="Download gluten-free recipes" icon={ChefHat}>
              <div className="space-y-4">
                {dashboardData.recipes.slice(0, 3).map((recipe) => (
                  <div
                    key={recipe._id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{recipe.title}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {recipe.category} • {recipe.downloads} downloads
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadRecipe(recipe)
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {dashboardData.recipes.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-6">No recipes available</p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => setShowAllRecipes(true)}
                  disabled={dashboardData.recipes.length === 0}
                >
                  Browse All Recipes
                </Button>
              </div>
            </DashboardCard>
            {/* Webinar Library */}
            <DashboardCard title="Webinar Library" description="Access learning webinars and recordings" icon={Video}>
              <div className="space-y-4">
                {dashboardData.webinars.slice(0, 3).map((webinar) => (
                  <div
                    key={webinar._id}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedVideo(webinar)}
                  >
                    <div className="relative w-16 h-9 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={webinar.thumbnail || "/placeholder.svg"}
                        alt={webinar.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{webinar.title}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {webinar.duration} min • {webinar.participantsCount} participants
                      </p>
                      {/* <Badge variant={webinar.status === "upcoming" ? "default" : "secondary"} className="text-xs mt-2">
                        {webinar.status}
                      </Badge> */}
                    </div>
                  </div>
                ))}
                {dashboardData.webinars.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-6">No webinars available</p>
                )}
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View All Webinars
                </Button>
              </div>
            </DashboardCard>
            {/* Detox Plans - Premium */}
            <DashboardCard
              title="Detox Plans"
              description="Personalized detox and cleanse programs"
              icon={Leaf}
              premium={true}
            >
              <div className="space-y-4">
                {dashboardData.detoxPlans.slice(0, 2).map((plan) => (
                  <div
                    key={plan._id}
                    className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 cursor-pointer hover:shadow-sm transition-all"
                    onClick={() => setSelectedDetoxPlan(plan)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-green-600" />
                      <p className="text-sm font-medium">{plan.title}</p>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{plan.description}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{plan.duration}</span>
                      <Badge variant="secondary" className="text-xs ml-auto">
                        {plan.meals.length} days
                      </Badge>
                    </div>
                  </div>
                ))}
                {dashboardData.detoxPlans.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-6">No detox plans available</p>
                )}
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => setShowAllDetoxPlans(true)}
                  disabled={dashboardData.detoxPlans.length === 0}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  View All Plans
                </Button>
              </div>
            </DashboardCard>
            {/* Workshop Notifications - Premium */}
            <DashboardCard
              title="Workshop Notifications"
              description="Offline workshops with discounts"
              icon={WorkshopIcon}
              premium={true}
            >
              <div className="space-y-4">
                {dashboardData.workshops.slice(0, 2).map((workshop) => (
                  <div key={workshop._id} className="p-4 rounded-lg bg-gray-50 border">
                    <div className="flex items-center gap-2 mb-3">
                      <Bell className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-medium">{workshop.title}</p>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {formatDate(workshop.date)} • {workshop.memberDiscount}% Member Discount
                    </p>
                    <p className="text-xs text-gray-600">
                      ₹{workshop.price} • {workshop.availableSpots} spots available
                    </p>
                  </div>
                ))}
                {dashboardData.workshops.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-6">No workshops available</p>
                )}
                <Button size="sm" className="w-full">
                  View All Workshops
                </Button>
              </div>
            </DashboardCard>

            {/* New: Upcoming Meetings Card */}
            <DashboardCard
              title="Upcoming Meetings"
              description="Your scheduled virtual consultations"
              icon={Calendar}
              premium={false} // Adjust based on whether meetings are premium
            >
              <div className="space-y-4">
                {dashboardData.meetings.slice(0, 3).map((meeting) => {
                  const { status, icon, color } = getMeetingStatus(meeting)
                  return (
                    <div
                      key={meeting._id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedMeetingDetail(meeting)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{meeting.title || "Untitled Meeting"}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {formatDate(meeting.date)} • {meeting.startTime} - {meeting.endTime}
                        </p>
                      </div>
                      <Badge className={`text-xs ml-2 ${color}`}>
                        {icon} {status}
                      </Badge>
                    </div>
                  )
                })}
                {dashboardData.meetings.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-6">No upcoming meetings</p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => setShowAllMeetings(true)}
                  disabled={dashboardData.meetings.length === 0}
                >
                  View All Meetings
                </Button>
              </div>
            </DashboardCard>
          </div>
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dashboardData.emails[0] && setSelectedEmail(dashboardData.emails[0])}
                  disabled={dashboardData.emails.length === 0}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Read Latest Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dashboardData.detoxPlans[0] && setSelectedDetoxPlan(dashboardData.detoxPlans[0])}
                  disabled={dashboardData.detoxPlans.length === 0}
                >
                  <Leaf className="h-4 w-4 mr-2" />
                  View Detox Plan
                </Button>
                {dashboardData.meetings.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(dashboardData.meetings[0].meetLink, "_blank")}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Join Latest Meeting
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Video Player Dialog */}
        <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
          <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
            <DialogHeader className="p-6 pb-0">
              <div className="flex items-center justify-between">
                <DialogTitle>{selectedVideo?.title}</DialogTitle>
                <DialogClose
                  className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  onClick={() => setSelectedVideo(null)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </div>
              <DialogDescription>
                {selectedVideo?.duration} min • Speaker: {selectedVideo?.speaker}
              </DialogDescription>
            </DialogHeader>
            {/* Video Player */}
            {selectedVideo && (
              <VideoPlayer src={selectedVideo.url} thumbnail={selectedVideo.thumbnail} title={selectedVideo.title} />
            )}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-medium mb-3">Description</h3>
                <p className="text-sm text-gray-600">{selectedVideo?.description}</p>
              </div>
              {selectedVideo?.tags && selectedVideo.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        {/* Detox Plans Dialog */}
        <Dialog open={showAllDetoxPlans} onOpenChange={setShowAllDetoxPlans}>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detox Plans</DialogTitle>
              <DialogDescription>Personalized detox and cleanse programs for your wellness journey</DialogDescription>
            </DialogHeader>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search detox plans..."
                className="pl-10"
                value={detoxSearchQuery}
                onChange={(e) => setDetoxSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDetoxPlans.map((plan) => (
                <Card key={plan._id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-lg">{plan.title}</CardTitle>
                    </div>
                    <CardDescription className="mb-4">{plan.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{plan.duration}</span>
                      </div>
                      <Badge variant="secondary">{plan.meals.length} days</Badge>
                    </div>
                  </div>
                  <CardFooter className="flex justify-between p-6">
                    <Button variant="outline" size="sm" onClick={() => setSelectedDetoxPlan(plan)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredDetoxPlans.length === 0 && (
              <div className="text-center py-12">
                <Leaf className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-500">No detox plans found. Try a different search term.</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
        {/* Detox Plan Detail Dialog */}
        <Dialog open={!!selectedDetoxPlan} onOpenChange={(open) => !open && setSelectedDetoxPlan(null)}>
          <DialogContent className="sm:max-w-[700px] p-4 max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <DialogTitle>{selectedDetoxPlan?.title}</DialogTitle>
              </div>
              <DialogDescription>Duration: {selectedDetoxPlan?.duration}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h3 className="font-medium mb-2">About This Plan</h3>
                <p className="text-sm text-gray-600">{selectedDetoxPlan?.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Daily Meal Plan</h3>
                <div className="space-y-4">
                  {selectedDetoxPlan?.meals.map((meal, index) => (
                    <div key={meal._id} className="p-4 rounded-lg border bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <h4 className="font-medium">{meal.day}</h4>
                      </div>
                      <p className="text-sm text-gray-600 ml-10">{meal.mealPlan}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Created: {selectedDetoxPlan && formatDate(selectedDetoxPlan.createdAt)}
              </div>
            </div>
            <DialogFooter>
              <div className="flex w-full justify-between">
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Recipe Browser Dialog */}
        <Dialog open={showAllRecipes} onOpenChange={setShowAllRecipes}>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Recipe Collection</DialogTitle>
              <DialogDescription>Browse all gluten-free recipes</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search recipes..."
                  className="pl-10"
                  value={recipeSearchQuery}
                  onChange={(e) => setRecipeSearchQuery(e.target.value)}
                />
              </div>
              <Select value={recipeCategory} onValueChange={setRecipeCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card key={recipe._id} className="overflow-hidden">
                  <div className="aspect-video w-full bg-gray-200 relative">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="object-cover w-full h-full"
                    />
                    {recipe.isGlutenFree && <Badge className="absolute top-2 right-2 bg-green-600">Gluten-Free</Badge>}
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">{recipe.title}</CardTitle>
                    <CardDescription>
                      {recipe.category} • {recipe.prepTime} prep • {recipe.cookTime} cook
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setSelectedRecipe(recipe)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-500">No recipes found. Try a different search term or category.</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
        {/* Email Archive Dialog */}
        <Dialog open={showAllEmails} onOpenChange={setShowAllEmails}>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Email Archive</DialogTitle>
              <DialogDescription>Access all your motivational emails</DialogDescription>
            </DialogHeader>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search emails..."
                className="pl-10"
                value={emailSearchQuery}
                onChange={(e) => setEmailSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              {filteredEmails.map((email) => (
                <div
                  key={email._id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{email.subject}</p>
                      <Badge variant="default" className="text-xs">
                        New
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{formatDate(email.createdAt)}</p>
                    <p className="text-sm text-gray-600 truncate">{email.content.substring(0, 80)}...</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadEmail(email)
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {filteredEmails.length === 0 && (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-500">No emails found. Try a different search term.</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
        {/* Recipe Detail Dialog */}
        <Dialog open={!!selectedRecipe} onOpenChange={(open) => !open && setSelectedRecipe(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedRecipe?.title}</DialogTitle>
              <DialogDescription>{selectedRecipe?.category}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="aspect-video w-full bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={selectedRecipe?.image || "/placeholder.svg"}
                  alt={selectedRecipe?.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-gray-100 rounded-md">
                  <p className="text-xs text-gray-600">Prep Time</p>
                  <p className="font-medium">{selectedRecipe?.prepTime}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-md">
                  <p className="text-xs text-gray-600">Cook Time</p>
                  <p className="font-medium">{selectedRecipe?.cookTime}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-md">
                  <p className="text-xs text-gray-600">Servings</p>
                  <p className="font-medium">{selectedRecipe?.servings}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-4">{selectedRecipe?.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Ingredients</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedRecipe?.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Instructions</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  {selectedRecipe?.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Nutrition Facts</h3>
                <div className="grid grid-cols-5 gap-3 text-center">
                  <div className="p-3 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">Calories</p>
                    <p className="font-medium">{selectedRecipe?.nutritionFacts.calories}</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">Protein</p>
                    <p className="font-medium">{selectedRecipe?.nutritionFacts.protein}g</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">Carbs</p>
                    <p className="font-medium">{selectedRecipe?.nutritionFacts.carbs}g</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">Fat</p>
                    <p className="font-medium">{selectedRecipe?.nutritionFacts.fat}g</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">Fiber</p>
                    <p className="font-medium">{selectedRecipe?.nutritionFacts.fiber}g</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe?.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {selectedRecipe?.isGlutenFree && <Badge className="bg-green-600">Gluten-Free</Badge>}
                </div>
              </div>
            </div>
            <DialogFooter>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Email Detail Dialog */}
        <Dialog open={!!selectedEmail} onOpenChange={(open) => !open && setSelectedEmail(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedEmail?.subject}</DialogTitle>
              <DialogDescription>Date: {selectedEmail && formatDate(selectedEmail.createdAt)}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-6 bg-gray-50 rounded-md whitespace-pre-line border">{selectedEmail?.content}</div>
            </div>
            <DialogFooter>
              <div className="flex w-full justify-between">
                <div className="flex gap-3">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button variant="outline">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Next
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* New: All Meetings Dialog */}
        <Dialog open={showAllMeetings} onOpenChange={setShowAllMeetings}>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>All Meetings</DialogTitle>
              <DialogDescription>Browse your scheduled virtual consultations</DialogDescription>
            </DialogHeader>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search meetings by doctor or link..."
                className="pl-10"
                value={meetingSearchQuery}
                onChange={(e) => setMeetingSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMeetings.map((meeting) => {
                const { status, icon, color } = getMeetingStatus(meeting)
                return (
                  <Card key={meeting._id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg truncate">{meeting.title || "Untitled Meeting"}</CardTitle>
                        <Badge className={`text-xs ml-2 ${color}`}>
                          {icon} {status}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">
                        <div className="flex items-center gap-1">
                          <UserIcon className="h-3 w-3" />
                          <span>{meeting.hostDoctor}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(meeting.date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {meeting.startTime} - {meeting.endTime} ({meeting.approxDuration})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-indigo-600 mt-1 truncate">
                        <Link className="h-4 w-4" />
                        <a
                          href={meeting.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {meeting.meetLink}
                        </a>
                      </div>
                      {meeting.associatedPlans.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {meeting.associatedPlans.map((plan) => (
                            <Badge key={plan} variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {plan.charAt(0).toUpperCase() + plan.slice(1)}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <Button size="sm" onClick={() => window.open(meeting.meetLink, "_blank")}>
                        <Video className="h-4 w-4 mr-2" />
                        Join Meeting
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
            {filteredMeetings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-500">No meetings found. Try a different search term.</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
        {/* New: Meeting Detail Dialog (similar to Recipe/DetoxPlan detail) */}
        <Dialog open={!!selectedMeetingDetail} onOpenChange={(open) => !open && setSelectedMeetingDetail(null)}>
          <DialogContent className="sm:max-w-[700px] p-4 max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <DialogTitle>{selectedMeetingDetail?.title || "Untitled Meeting"}</DialogTitle>
              </div>
              <DialogDescription>Host: {selectedMeetingDetail?.hostDoctor}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">Meeting Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Date</p>
                      <p className="text-gray-600">{selectedMeetingDetail && formatDate(selectedMeetingDetail.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Time</p>
                      <p className="text-gray-600">
                        {selectedMeetingDetail?.startTime} - {selectedMeetingDetail?.endTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hourglass className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Duration</p>
                      <p className="text-gray-600">{selectedMeetingDetail?.approxDuration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Link className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Meeting Link</p>
                      <a
                        href={selectedMeetingDetail?.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {selectedMeetingDetail?.meetLink}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {selectedMeetingDetail?.description && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-gray-600">{selectedMeetingDetail.description}</p>
                </div>
              )}
              {selectedMeetingDetail?.associatedPlans.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium mb-2">Associated Plans</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeetingDetail.associatedPlans.map((plan) => (
                      <Badge key={plan} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {plan.charAt(0).toUpperCase() + plan.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <div className="flex w-full justify-end">
                <Button size="sm" onClick={() => window.open(selectedMeetingDetail!.meetLink, "_blank")}>
                  <Video className="h-4 w-4 mr-2" />
                  Join Meeting
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
