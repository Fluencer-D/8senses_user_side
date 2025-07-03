"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Calendar,
  Mail,
  ChefHat,
  Users,
  Video,
  WorkflowIcon as Workshop,
  Gamepad2,
  MessageSquare,
  Leaf,
  Download,
  Star,
  Crown,
  Bell,
  Play,
  CalendarDays,
  FileText,
  Settings,
  X,
  Search,
  ArrowLeft,
  ArrowRight,
  Eye,
  Printer,
  Share2,
  BookOpen,
} from "lucide-react"

// API base URL - you can move this to environment variables
const API_BASE_URL = "http://localhost:5000/api"

// API helper function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token") // Assuming JWT token is stored in localStorage

  console.log("endpoint",API_BASE_URL,endpoint)
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}

// Inline UI Components
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-3 ${className}`}>{children}</div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
)

const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
)

const CardFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
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
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
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
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-100 text-gray-800",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

const Avatar = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>
)

const AvatarImage = ({ src, alt }: { src: string; alt: string }) => (
  <img className="aspect-square h-full w-full" src={src || "/placeholder.svg"} alt={alt} />
)

const AvatarFallback = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
    <span className="text-sm font-medium text-gray-600">{children}</span>
  </div>
)

const Progress = ({ value, className = "" }: { value: number; className?: string }) => (
  <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
    <div
      className="h-full w-full flex-1 bg-blue-600 transition-all"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-auto">
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)

const DialogHeader = ({ children }: { children: React.ReactNode }) => <div className="p-6 pb-4">{children}</div>

const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
)

const DialogDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-600 mt-1">{children}</p>
)

const DialogFooter = ({ children }: { children: React.ReactNode }) => <div className="p-6 pt-4">{children}</div>

const DialogClose = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <button className={`absolute top-4 right-4 ${className}`}>{children}</button>
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
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
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
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {children}
    </select>
  </div>
)

const SelectTrigger = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)

const SelectValue = ({ placeholder }: { placeholder: string }) => <span>{placeholder}</span>

const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>

const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <option value={value}>{children}</option>
)

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // User and dashboard data
  const [userData, setUserData] = useState<any>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)

  // Feature-specific data
  const [emailArchive, setEmailArchive] = useState<any[]>([])
  const [recipes, setRecipes] = useState<any[]>([])
  const [webinars, setWebinars] = useState<any[]>([])
  const [expertSessions, setExpertSessions] = useState<any[]>([])

  // Modal states
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [showAllRecipes, setShowAllRecipes] = useState(false)
  const [showAllEmails, setShowAllEmails] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)
  const [selectedEmail, setSelectedEmail] = useState<any>(null)

  // Search states
  const [recipeSearchQuery, setRecipeSearchQuery] = useState("")
  const [recipeCategory, setRecipeCategory] = useState("all")
  const [emailSearchQuery, setEmailSearchQuery] = useState("")

  const isPremium = userData?.membership === "premium plan"

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch main dashboard data
      const dashboardResponse = await apiCall("/overview")
      setDashboardData(dashboardResponse.data)
      setUserData(dashboardResponse.data.user)

      // Set individual data arrays
      setEmailArchive(dashboardResponse.data.recentEmails || [])
      setRecipes(dashboardResponse.data.popularRecipes || [])
      setWebinars(dashboardResponse.data.upcomingWebinars || [])
      setExpertSessions(dashboardResponse.data.upcomingAppointments || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch dashboard data")
      console.error("Dashboard fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Email API functions
  const fetchAllEmails = async () => {
    try {
      const response = await apiCall("/dashboard/emails")
      return response.data
    } catch (err) {
      console.error("Failed to fetch emails:", err)
      return []
    }
  }

  const markEmailAsRead = async (emailId: string) => {
    try {
      await apiCall(`/dashboard/emails/${emailId}/read`, { method: "PUT" })
      // Update local state
      setEmailArchive((prev) => prev.map((email) => (email._id === emailId ? { ...email, isRead: true } : email)))
    } catch (err) {
      console.error("Failed to mark email as read:", err)
    }
  }

  const downloadEmailAPI = async (emailId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/emails/${emailId}/download`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `email-${emailId}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      console.error("Failed to download email:", err)
    }
  }

  // Recipe API functions
  const fetchAllRecipes = async () => {
    try {
      const response = await apiCall("/dashboard/recipes")
      return response.data
    } catch (err) {
      console.error("Failed to fetch recipes:", err)
      return []
    }
  }

  const searchRecipesAPI = async (query: string, category: string) => {
    try {
      const params = new URLSearchParams()
      if (query) params.append("q", query)
      if (category && category !== "all") params.append("category", category)

      const response = await apiCall(`/dashboard/recipes/search?${params.toString()}`)
      return response.data
    } catch (err) {
      console.error("Failed to search recipes:", err)
      return []
    }
  }

  const downloadRecipeAPI = async (recipeId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/recipes/${recipeId}/download`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `recipe-${recipeId}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      console.error("Failed to download recipe:", err)
    }
  }

  // Webinar API functions
  const registerForWebinarAPI = async (webinarId: string) => {
    try {
      const response = await apiCall(`/dashboard/webinars/${webinarId}/register`, {
        method: "POST",
      })
      alert("Successfully registered for webinar!")
      return response.data
    } catch (err) {
      console.error("Failed to register for webinar:", err)
      alert("Failed to register for webinar")
    }
  }

  // Appointment API functions
  const createAppointmentAPI = async (appointmentData: any) => {
    try {
      const response = await apiCall("/dashboard/appointments", {
        method: "POST",
        body: JSON.stringify(appointmentData),
      })
      alert("Appointment booked successfully!")
      fetchDashboardData() // Refresh data
      return response.data
    } catch (err) {
      console.error("Failed to create appointment:", err)
      alert("Failed to book appointment")
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
        <div className="absolute top-2 right-2">
          <Crown className="h-4 w-4 text-yellow-500" />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {premium && !isPremium ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-600 mb-2">Premium Feature</p>
            <Button variant="outline" size="sm">
              Upgrade to Access
            </Button>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )

  const handleEmailClick = async (email: any) => {
    setSelectedEmail(email)
    if (!email.isRead) {
      await markEmailAsRead(email._id || email.id)
    }
  }

  const downloadRecipe = async (recipe: any) => {
    await downloadRecipeAPI(recipe._id || recipe.id)
  }

  const downloadEmail = async (email: any) => {
    await downloadEmailAPI(email._id || email.id)
  }

  const handleShowAllRecipes = async () => {
    setShowAllRecipes(true)
    const allRecipes = await fetchAllRecipes()
    setRecipes(allRecipes)
  }

  const handleShowAllEmails = async () => {
    setShowAllEmails(true)
    const allEmails = await fetchAllEmails()
    setEmailArchive(allEmails)
  }

  const handleRecipeSearch = async () => {
    const searchResults = await searchRecipesAPI(recipeSearchQuery, recipeCategory)
    setRecipes(searchResults)
  }

  // Update search when query or category changes
  useEffect(() => {
    if (showAllRecipes) {
      handleRecipeSearch()
    }
  }, [recipeSearchQuery, recipeCategory])

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(recipeSearchQuery.toLowerCase()) &&
      (recipeCategory === "all" || recipe.category.toLowerCase() === recipeCategory.toLowerCase()),
  )

  const filteredEmails = emailArchive.filter((email) =>
    email.subject.toLowerCase().includes(emailSearchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={fetchDashboardData}>Retry</Button>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <p>No user data available</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userData.profilePicture || "/placeholder.svg"} alt={userData.fullName} />
              <AvatarFallback>
                {userData.firstName?.[0]}
                {userData.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {userData.firstName}!</h1>
              <p className="text-gray-600">Manage your wellness journey</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isPremium ? "default" : "secondary"} className="gap-1">
              {isPremium && <Crown className="h-3 w-3" />}
              {isPremium ? "Premium Member" : "Basic Member"}
            </Badge>
          </div>
        </div>

        {/* Membership Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              <CardTitle>Membership Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Current Plan</p>
                <p className="text-2xl font-bold">{isPremium ? "Premium Plan" : "Basic Plan"}</p>
                <Badge variant={dashboardData?.subscription?.isActive ? "default" : "secondary"}>
                  {dashboardData?.subscription?.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Renewal Date</p>
                <p className="text-lg">
                  {userData.subscriptionEnd ? new Date(userData.subscriptionEnd).toLocaleDateString() : "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {userData.subscriptionEnd
                    ? Math.ceil(
                        (new Date(userData.subscriptionEnd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      ) + " days remaining"
                    : "No active subscription"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-lg">{new Date(userData.subscriptionStart).toLocaleDateString()}</p>
                <Progress value={75} className="w-full" />
                <p className="text-xs text-gray-600">75% through your wellness journey</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weekly Email Archive */}
          <DashboardCard title="Weekly Email Archive" description="Access all your motivational emails" icon={Mail}>
            <div className="space-y-3">
              {emailArchive.slice(0, 3).map((email) => (
                <div
                  key={email._id || email.id}
                  className="flex items-center justify-between p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleEmailClick(email)}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{email.subject}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(email.createdAt || email.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={email.isRead ? "secondary" : "default"} className="text-xs">
                    {email.isRead ? "Read" : "New"}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleShowAllEmails}>
                View All Emails
              </Button>
            </div>
          </DashboardCard>

          {/* Recipe Collection */}
          <DashboardCard title="Recipe Collection" description="Download gluten-free recipes" icon={ChefHat}>
            <div className="space-y-3">
              {recipes.slice(0, 3).map((recipe) => (
                <div
                  key={recipe._id || recipe.id}
                  className="flex items-center justify-between p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{recipe.title}</p>
                    <p className="text-xs text-gray-600">
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
              <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleShowAllRecipes}>
                Browse All Recipes
              </Button>
            </div>
          </DashboardCard>

          {/* Expert Session Hub */}
          <DashboardCard title="Expert Session Hub" description="Book and manage expert sessions" icon={Users}>
            <div className="space-y-3">
              {expertSessions.map((session) => (
                <div key={session.id} className="p-2 rounded-lg border">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{session.expert}</p>
                    <Badge variant={session.status === "upcoming" ? "default" : "secondary"}>{session.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-600">{session.topic}</p>
                  <p className="text-xs text-gray-600">{session.date}</p>
                </div>
              ))}
              <Button size="sm" className="w-full">
                <CalendarDays className="h-4 w-4 mr-2" />
                Book New Session
              </Button>
            </div>
          </DashboardCard>

          {/* Webinar Library */}
          <DashboardCard title="Webinar Library" description="Access learning webinars and recordings" icon={Video}>
            <div className="space-y-3">
              {webinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="flex items-center justify-between p-2 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedVideo(webinar)}
                >
                  <div className="flex items-center gap-2">
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
                    <div className="flex-1">
                      <p className="text-sm font-medium">{webinar.title}</p>
                      <p className="text-xs text-gray-600">
                        {webinar.duration} • {webinar.views} views
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedVideo(webinar)
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View All Webinars
              </Button>
            </div>
          </DashboardCard>

          {/* Workshop Notifications - Premium */}
          <DashboardCard
            title="Workshop Notifications"
            description="Offline workshops with discounts"
            icon={Workshop}
            premium={true}
          >
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium">Upcoming Workshop</p>
                </div>
                <p className="text-sm">Mindful Cooking Workshop</p>
                <p className="text-xs text-gray-600">Jan 25, 2024 • 20% Member Discount</p>
              </div>
              <Button size="sm" className="w-full">
                View All Workshops
              </Button>
            </div>
          </DashboardCard>

          {/* Toy Library Access - Premium */}
          <DashboardCard
            title="Toy Library Access"
            description="Discount portal for toy library services"
            icon={Gamepad2}
            premium={true}
          >
            <div className="space-y-3">
              <div className="text-center p-4 rounded-lg bg-gray-100">
                <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">15% Member Discount</p>
                <p className="text-xs text-gray-600">Available on all toy library services</p>
              </div>
              <Button size="sm" className="w-full">
                Browse Toy Library
              </Button>
            </div>
          </DashboardCard>

          {/* Consultation Center - Premium */}
          <DashboardCard
            title="Consultation Center"
            description="Private session booking and history"
            icon={MessageSquare}
            premium={true}
          >
            <div className="space-y-3">
              <div className="p-2 rounded-lg border">
                <p className="text-sm font-medium">Next Consultation</p>
                <p className="text-xs text-gray-600">Jan 22, 2024 at 2:00 PM</p>
                <p className="text-xs text-gray-600">Dr. Sarah Wilson - Nutrition</p>
              </div>
              <Button size="sm" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Book Consultation
              </Button>
            </div>
          </DashboardCard>

          {/* Detox Diet Portal - Premium */}
          <DashboardCard title="Detox Diet Portal" description="Exclusive detox diet plans" icon={Leaf} premium={true}>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <p className="text-sm font-medium">7-Day Spring Detox</p>
                </div>
                <p className="text-xs text-gray-600">Personalized meal plans and shopping lists</p>
              </div>
              <Button size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View Diet Plans
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
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedRecipe(recipes[0])}>
                <Download className="h-4 w-4 mr-2" />
                Download Latest Recipe
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedEmail(emailArchive.find((e) => !e.read) || emailArchive[0])}
              >
                <Mail className="h-4 w-4 mr-2" />
                Read Latest Email
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle>{selectedVideo?.title}</DialogTitle>
              <DialogClose className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
            <DialogDescription>
              {selectedVideo?.duration} • {selectedVideo?.views} views
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4" />
                <p className="text-sm">Video would play here</p>
                <p className="text-xs text-gray-400 mt-2">Using URL: {selectedVideo?.videoUrl}</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Notes
                </Button>
              </div>
              <Button size="sm" variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recipe Browser Dialog */}
      <Dialog open={showAllRecipes} onOpenChange={setShowAllRecipes}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Recipe Collection</DialogTitle>
            <DialogDescription>Browse and download all gluten-free recipes</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col md:flex-row gap-4 items-center p-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search recipes..."
                className="pl-8"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-0">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe._id || recipe.id} className="overflow-hidden">
                <div className="aspect-video w-full bg-gray-200 relative">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    className="object-cover w-full h-full"
                  />
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
                  <Button size="sm" onClick={() => downloadRecipe(recipe)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-600">No recipes found. Try a different search term or category.</p>
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

          <div className="relative p-6">
            <Search className="absolute left-8 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search emails..."
              className="pl-8"
              value={emailSearchQuery}
              onChange={(e) => setEmailSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2 px-6 pb-6">
            {filteredEmails.map((email) => (
              <div
                key={email._id || email.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedEmail(email)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{email.subject}</p>
                    {!email.isRead && (
                      <Badge variant="default" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(email.createdAt || email.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 truncate">{email.content.substring(0, 60)}...</p>
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
            <div className="text-center py-8">
              <Mail className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-600">No emails found. Try a different search term.</p>
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

          <div className="space-y-4 p-6">
            <div className="aspect-video w-full bg-gray-200 rounded-md overflow-hidden">
              <img
                src={selectedRecipe?.image || "/placeholder.svg"}
                alt={selectedRecipe?.title}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-gray-100 rounded-md">
                <p className="text-xs text-gray-600">Prep Time</p>
                <p className="font-medium">{selectedRecipe?.prepTime}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-md">
                <p className="text-xs text-gray-600">Cook Time</p>
                <p className="font-medium">{selectedRecipe?.cookTime}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-md">
                <p className="text-xs text-gray-600">Servings</p>
                <p className="font-medium">{selectedRecipe?.servings}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1">
                {selectedRecipe?.ingredients?.map((ingredient: string, index: number) => (
                  <li key={index} className="text-sm">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Instructions</h3>
              <ol className="list-decimal pl-5 space-y-2">
                {selectedRecipe?.instructions?.map((instruction: string, index: number) => (
                  <li key={index} className="text-sm">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            {selectedRecipe?.nutritionFacts && (
              <div>
                <h3 className="text-lg font-medium mb-2">Nutrition Facts</h3>
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div className="p-2 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">Calories</p>
                    <p className="font-medium">{selectedRecipe.nutritionFacts.calories}</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">Protein</p>
                    <p className="font-medium">{selectedRecipe.nutritionFacts.protein}g</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">Carbs</p>
                    <p className="font-medium">{selectedRecipe.nutritionFacts.carbs}g</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">Fat</p>
                    <p className="font-medium">{selectedRecipe.nutritionFacts.fat}g</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-md">
                    <p className="text-xs text-gray-600">Fiber</p>
                    <p className="font-medium">{selectedRecipe.nutritionFacts.fiber}g</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={() => downloadRecipe(selectedRecipe!)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <div className="flex gap-2">
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

      {/* Email Detail Dialog */}
      <Dialog open={!!selectedEmail} onOpenChange={(open) => !open && setSelectedEmail(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedEmail?.subject}</DialogTitle>
            <DialogDescription>
              From: {selectedEmail?.sender} •{" "}
              {new Date(selectedEmail?.createdAt || selectedEmail?.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 p-6">
            <div className="p-4 bg-gray-100 rounded-md whitespace-pre-line">{selectedEmail?.content}</div>
          </div>

          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={() => downloadEmail(selectedEmail!)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <div className="flex gap-2">
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
    </div>
  )
}
