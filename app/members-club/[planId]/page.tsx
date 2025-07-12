"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import AuthModal from "../../components/auth/AuthModal"

interface MembershipFormData {
  name: string
  email: string
  phone: string
  planId: string
}

interface PlanFeatures {
  accessToWebinars: boolean
  customerDiscounts: boolean
  autoRenewal: boolean
  displayOnPricingPage: boolean
  accessToPremiumCourses: boolean
}

interface SubscriptionPlan {
  _id: string
  name: string
  description: string
  price: number
  billingCycle: string
  features: PlanFeatures
  order: number
}

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  membership: string | null
}

const MembershipConfirmation: React.FC = () => {
  const router = useRouter()
  const params = useParams()
  const planId = params.planId as string

  const [plan, setPlan] = useState<SubscriptionPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string>("")

  // Authentication states
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  const [formData, setFormData] = useState<MembershipFormData>({
    name: "",
    email: "",
    phone: "",
    planId: planId,
  })

  // API Base URL - Make sure this matches your backend
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Enhanced API request function with better debugging
  const makeApiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`
    console.log(`🔄 Making request to: ${url}`)
    console.log(`📤 Request options:`, {
      method: options.method || "GET",
      headers: options.headers,
      body: options.body ? JSON.parse(options.body as string) : null,
    })

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...options.headers,
        },
      })

      console.log(`📥 Response status: ${response.status} ${response.statusText}`)
      console.log(`📥 Response headers:`, Object.fromEntries(response.headers.entries()))

      // Get response text first
      const responseText = await response.text()
      console.log(`📥 Raw response (first 500 chars):`, responseText.substring(0, 500))

      // Check if response is HTML (error page)
      if (responseText.includes("<!DOCTYPE") || responseText.includes("<html")) {
        console.error("❌ Server returned HTML instead of JSON")
        throw new Error(
          `Server returned HTML error page. Status: ${response.status}. This usually means the API endpoint doesn't exist or there's a server configuration issue.`,
        )
      }

      // Try to parse JSON
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("❌ JSON parse error:", parseError)
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`)
      }

      if (!response.ok) {
        console.error("❌ API Error:", data)
        throw new Error(data.error || data.message || `HTTP ${response.status}: ${response.statusText}`)
      }

      console.log("✅ API Success:", data)
      return data
    } catch (error) {
      console.error(`❌ Request failed for ${url}:`, error)
      throw error
    }
  }

  // Test API connectivity
  const testApiConnection = async () => {
    try {
      setDebugInfo("Testing API connection...")

      // Test basic connectivity
      const response = await fetch(API_BASE_URL)
      console.log(`API Base URL test: ${response.status}`)

      // Test auth endpoint
      const token = localStorage.getItem("token")
      if (token) {
        await makeApiRequest("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setDebugInfo("API connection successful")
      }
    } catch (error: any) {
      console.error("API connection test failed:", error)
      setDebugInfo(`API connection failed: ${error.message}`)
    }
  }

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          console.log("No token found")
          setShowAuthModal(true)
          setAuthMode("login")
          setLoading(false)
          return
        }

        setDebugInfo("Verifying authentication...")

        const data = await makeApiRequest("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUser(data.data)
        setIsAuthenticated(true)
        setDebugInfo("Authentication verified")

        // Pre-fill form
        setFormData((prev) => ({
          ...prev,
          name: `${data.data.firstName} ${data.data.lastName}`,
          email: data.data.email,
          phone: data.data.phone || "",
        }))
      } catch (error: any) {
        console.error("Auth verification failed:", error)
        setDebugInfo(`Auth failed: ${error.message}`)

        // Clear invalid token
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setShowAuthModal(true)
        setAuthMode("login")
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  // Fetch plan details
  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!planId) return

      try {
        setDebugInfo(`Fetching plan details for ID: ${planId}`)

        const data = await makeApiRequest(`/api/subscriptions/plans/${planId}`)

        setPlan(data.data)
        setDebugInfo("Plan details loaded")
      } catch (err: any) {
        console.error("Plan fetch error:", err)
        setError(`Failed to load plan: ${err.message}`)
        setDebugInfo(`Plan fetch failed: ${err.message}`)
      }
    }

    fetchPlanDetails()
  }, [planId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAuthSuccess = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    setShowAuthModal(false)
    setDebugInfo("Authentication successful")

    setFormData((prev) => ({
      ...prev,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      phone: prev.phone,
    }))
  }

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if (typeof (window as any).Razorpay !== "undefined") {
        console.log("✅ Razorpay already loaded")
        resolve(true)
        return
      }

      console.log("📦 Loading Razorpay script...")
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true

      script.onload = () => {
        console.log("✅ Razorpay script loaded successfully")
        resolve(true)
      }

      script.onerror = (error) => {
        console.error("❌ Failed to load Razorpay script:", error)
        resolve(false)
      }

      document.body.appendChild(script)
    })
  }

  const initiatePayment = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    setIsSubmitting(true)
    setError("")
    setDebugInfo("Starting payment process...")

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      // Step 1: Load Razorpay script first
      setDebugInfo("Loading Razorpay SDK...")
      const isScriptLoaded = await loadRazorpayScript()
      if (!isScriptLoaded) {
        throw new Error("Failed to load Razorpay SDK. Please check your internet connection.")
      }

      // Step 2: Create payment order (NOT subscription yet)
      setDebugInfo("Creating payment order...")
      const paymentData = await makeApiRequest("/api/payments/subscription", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId: formData.planId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      })

      setDebugInfo("Payment order created successfully")

      // Step 3: Configure Razorpay options with UPI and other payment methods
      const options = {
        key: paymentData.data.key,
        amount: paymentData.data.amount,
        currency: paymentData.data.currency || "INR",
        name: paymentData.data.name || "8 Senses",
        description: paymentData.data.description || `${plan?.name} Subscription`,
        order_id: paymentData.data.order.id,

        // Enable all payment methods including UPI
        method: paymentData.data.method || {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
          emi: false,
          paylater: false,
        },

        // UPI configuration
        config: paymentData.data.config || {
          display: {
            blocks: {
              utib: {
                name: "Pay using UPI",
                instruments: [
                  {
                    method: "upi",
                  },
                ],
              },
              other: {
                name: "Other Payment Methods",
                instruments: [
                  {
                    method: "card",
                  },
                  {
                    method: "netbanking",
                  },
                  {
                    method: "wallet",
                  },
                ],
              },
            },
            hide: [
              {
                method: "emi",
              },
            ],
            sequence: ["block.utib", "block.other"],
            preferences: {
              show_default_blocks: false,
            },
          },
        },

        handler: async (response: any) => {
          setDebugInfo("Payment successful, creating subscription...")

          try {
            // Step 4: Create subscription after successful payment
            const subscriptionData = await makeApiRequest("/api/subscriptions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                plan: formData.planId,
                paymentMethod: "razorpay",
                transactionId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            })

            setDebugInfo("Subscription created successfully")
            router.replace('/')
          } catch (err: any) {
            console.error("Post-payment error:", err)
            setError(`Subscription creation failed: ${err.message}`)
            setDebugInfo(`Subscription creation failed: ${err.message}`)
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#3399cc",
        },

        modal: {
          ondismiss: () => {
            setIsSubmitting(false)
            setDebugInfo("Payment cancelled by user")
          },
        },
      }

      // Step 4: Open Razorpay
      setDebugInfo("Opening Razorpay checkout with UPI support...")
      const rzp = new (window as any).Razorpay(options)

      rzp.on("payment.failed", (response: any) => {
        setError(`Payment failed: ${response.error.description}`)
        setDebugInfo(`Payment failed: ${response.error.code} - ${response.error.description}`)
        setIsSubmitting(false)
      })

      rzp.open()
    } catch (err: any) {
      console.error("Payment initiation error:", err)
      setError(err.message)
      setDebugInfo(`Payment initiation failed: ${err.message}`)
      setIsSubmitting(false)
    }
  }

  const getBillingDescription = (billingCycle: string) => {
    switch (billingCycle) {
      case "monthly":
        return "per month"
      case "quarterly":
        return "every 3 months"
      case "biannual":
        return "every 6 months"
      case "annual":
        return "per year, billed annually"
      default:
        return ""
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-600">Loading...</p>
        </div>
        {debugInfo && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
            <strong>Status:</strong> {debugInfo}
          </div>
        )}
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-[#1E437A] mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            Please sign in or create an account to continue with your membership purchase.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-[#C83C92] hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Sign In / Sign Up
          </button>

          <button
            onClick={testApiConnection}
            className="ml-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
          >
            Test API
          </button>
        </div>

        {debugInfo && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
            <strong>Debug:</strong> {debugInfo}
          </div>
        )}

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => router.push("/members-club")}
          onAuthSuccess={handleAuthSuccess}
          initialMode={authMode}
        />
      </div>
    )
  }

  if (error && !plan) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>

        {debugInfo && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
            <strong>Debug:</strong> {debugInfo}
          </div>
        )}

        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
          <strong>Troubleshooting Steps:</strong>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>
              Verify API URL: <code className="bg-gray-100 px-1 rounded">{API_BASE_URL}</code>
            </li>
            <li>Check if server is running and accessible</li>
            <li>
              Verify the subscription route exists:{" "}
              <code className="bg-gray-100 px-1 rounded">POST /api/subscriptions</code>
            </li>
            <li>Check authentication middleware</li>
            <li>Review server logs for errors</li>
          </ol>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push("/members-club")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Plans
          </button>
          <button onClick={testApiConnection} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Test API Connection
          </button>
        </div>
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Plan not found for ID: {planId}
        </div>
        <button
          onClick={() => router.push("/members-club")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Plans
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />

      <Link href="/members-club" className="flex items-center text-blue-800 mb-4 hover:text-blue-600">
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Plans</span>
      </Link>

      <h1 className="text-3xl font-bold text-blue-900 mb-2">Confirm your membership!</h1>
      <p className="text-gray-600 mb-6">
        Secure your spot — confirm your membership and start enjoying exclusive perks!
      </p>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {debugInfo && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <strong>Status:</strong> {debugInfo}
        </div>
      )}

      {/* Payment Methods Info */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-medium text-green-800 mb-2">💳 Available Payment Methods</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-green-700">
          <div className="flex items-center gap-2">
            <span>📱</span>
            <span>UPI (PhonePe, GPay)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💳</span>
            <span>Credit/Debit Cards</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏦</span>
            <span>Net Banking</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👛</span>
            <span>Digital Wallets</span>
          </div>
        </div>
      </div>

      {/* Plan Details */}
      <div className="mb-8">
        <div className={`rounded-lg p-6 text-white ${plan.order === 3 ? "bg-blue-900" : "bg-[#245BA7]"}`}>
          <h2 className="text-xl font-medium mb-1">{plan.name}</h2>
          <p className="text-4xl font-bold mb-1">₹{plan.price}</p>
          <p className="text-sm mb-4">{getBillingDescription(plan.billingCycle)}</p>
          <p className="mb-4">{plan.description}</p>

          <div className="space-y-2 mb-6">
            {plan.features.accessToWebinars && (
              <div className="flex items-start">
                <input type="checkbox" checked readOnly className="mt-1 mr-2" />
                <span>Access to exclusive webinars</span>
              </div>
            )}
            {plan.features.customerDiscounts && (
              <div className="flex items-start">
                <input type="checkbox" checked readOnly className="mt-1 mr-2" />
                <span>Discounts on workshops and products</span>
              </div>
            )}
            {plan.features.accessToPremiumCourses && (
              <div className="flex items-start">
                <input type="checkbox" checked readOnly className="mt-1 mr-2" />
                <span>Access to premium courses</span>
              </div>
            )}
            <div className="flex items-start">
              <input type="checkbox" checked readOnly className="mt-1 mr-2" />
              <span>Access to our private parent community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          initiatePayment()
        }}
        className="border border-gray-200 rounded-lg p-6 space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-blue-900 font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-blue-900 font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-blue-900 font-medium mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 bg-[#C83C92] hover:bg-pink-600 text-white rounded-full font-medium flex items-center justify-center transition-colors ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              Pay with UPI, Cards & More
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </form>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </div>
  )
}

export default MembershipConfirmation
