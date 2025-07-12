"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import Script from "next/script"
import Navbar from "@/app/components/navbar/page"

const OrderPage: React.FC = () => {
  const router = useRouter()
  const { productId } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>("")
  const [backendStatus, setBackendStatus] = useState<string>("Checking...")

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 

  // Check if backend is running
  useEffect(() => {
    const checkBackend = async () => {
      try {
        console.log("🔍 Checking backend status...")
        const response = await fetch(`${API_BASE_URL}/api/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          setBackendStatus("✅ Backend is running")
          console.log("✅ Backend is accessible")
        } else {
          setBackendStatus(`⚠️ Backend responded with ${response.status}`)
          console.log("⚠️ Backend responded but with error:", response.status)
        }
      } catch (err) {
        setBackendStatus("❌ Backend not accessible")
        console.error("❌ Backend check failed:", err)
      }
    }

    checkBackend()
  }, [])

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          setDebugInfo("Fetching product details...")
          const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          const data = await response.json()
          if (response.ok) {
            setProduct(data.data)
            setDebugInfo("Product loaded successfully")
            console.log("Product data:", data.data)
          } else {
            throw new Error("Product not found")
          }
        } catch (err) {
          setError("Failed to load product details")
          setDebugInfo("Failed to load product")
        }
      }
      fetchProduct()
    }
  }, [productId])

  // Load Razorpay script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setDebugInfo("Starting order process...")

    try {
      // Step 1: Load Razorpay script first
      setDebugInfo("Loading Razorpay SDK...")
      const isScriptLoaded = await loadRazorpayScript()
      if (!isScriptLoaded) {
        throw new Error("Failed to load Razorpay SDK. Please check your internet connection.")
      }

      // Step 2: Create the order using your existing working endpoint
      setDebugInfo("Creating order...")
      const orderResponse = await fetch(`${API_BASE_URL}/api/orders/public`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          address1,
          address2,
          city,
          state,
          postalCode,
          country,
          items: [{ productId: productId, quantity: 1 }],
          paymentMethod: "razorpay",
        }),
      })

      const orderData = await orderResponse.json()
      console.log("Full order response:", orderData)

      if (!orderResponse.ok) {
        console.error("Order creation failed:", orderData)
        throw new Error(orderData.error || orderData.message || "Order creation failed")
      }

      // ⚠️ IMPORTANT: Don't show success here - order is created but payment not done yet
      const orderId = orderData.reference
      console.log("Order ID extracted:", orderId)
      setDebugInfo("Order created (pending payment)")

      // Step 3: Create payment order - try the working endpoint from your original code
      setDebugInfo("Creating payment order...")

      // Let's try the exact same endpoint structure you had working before
      const paymentResponse = await fetch(`${API_BASE_URL}/api/payments/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          orderId, // Use the actual order ID from the created order
          name: firstName + " " + lastName,
          email,
          phone,
        }),
      })

      const paymentData = await paymentResponse.json()
      console.log("Payment response:", paymentData)

      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || "Payment initiation failed")
      }

      setDebugInfo("Payment order created successfully")

      // Step 4: Configure Razorpay options
      const options = {
        key: paymentData.data.key,
        amount: paymentData.data.amount,
        currency: paymentData.data.currency || "INR",
        name: "8 Senses Clinic",
        description: `Payment for ${product.name}`,
        order_id: paymentData.data.order.id,
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
          emi: false,
          paylater: false,
        },
        config: {
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
          setDebugInfo("Payment successful, verifying...")
          try {
            const verifyResponse = await fetch(`${API_BASE_URL}/api/payments/product/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId,
              }),
            })

            const verifyData = await verifyResponse.json()
            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || "Payment verification failed")
            }

            setDebugInfo("Payment verified successfully")

            // ✅ ONLY NOW show success message after payment verification
            console.log("✅ Payment successful and verified:", verifyData)
            alert(`Payment successful! Order #${verifyData.data?.order?.orderNumber || orderId} confirmed.`)
            router.push("/")
          } catch (err: any) {
            setError(`Payment verification failed: ${err.message}`)
            setDebugInfo(`Payment verification failed: ${err.message}`)
          }
        },
        prefill: {
          name: firstName + " " + lastName,
          email,
          contact: phone,
        },
        theme: { color: "#d83f96" },
        modal: {
          ondismiss: () => {
            setLoading(false)
            setDebugInfo("Payment cancelled by user")
          },
        },
      }

      // Step 5: Open Razorpay
      setDebugInfo("Opening Razorpay checkout...")
      const rzp = new (window as any).Razorpay(options)

      rzp.on("payment.failed", (response: any) => {
        setError(`Payment failed: ${response.error.description}`)
        setDebugInfo(`Payment failed: ${response.error.code} - ${response.error.description}`)
        setLoading(false)
      })

      rzp.open()
    } catch (err: any) {
      console.error("Order process error:", err)
      setError(err.message)
      setDebugInfo(`Order process failed: ${err.message}`)
      setLoading(false)
    }
  }

  // Function to get the product image URL
  const getProductImage = () => {
    if (product?.images && product.images.length > 0) {
      const mainImage = product.images.find((img: any) => img.isMain) || product.images[0]
      return mainImage.url
    }
    return "/placeholder-toy.jpg"
  }

  if (!product && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
          {debugInfo && (
            <div className="mt-4 text-sm text-gray-500">
              <strong>Status:</strong> {debugInfo}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-10">
        {/* Back Button */}
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center text-blue-700 hover:text-blue-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Order Title */}
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Order Now</h1>
        <p className="text-gray-600 mb-8">
          Fill out the form below to borrow a developmental toy for your child. Play, learn, and grow with
          expert-selected toys!
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

        {/* Backend Status */}
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">🔧 System Status</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <div>
              <strong>Backend Status:</strong> {backendStatus}
            </div>
            <div>
              <strong>API Base URL:</strong> {API_BASE_URL}
            </div>
            <div>
              <strong>Product ID:</strong> {productId}
            </div>
            <div>
              <strong>Product Loaded:</strong> {product ? "✅ Yes" : "❌ No"}
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-medium text-orange-800 mb-2">⚠️ Important Notice</h3>
          <div className="text-sm text-orange-700">
            <p>
              <strong>Payment Flow:</strong> Order will be created first, then payment will be processed. Success
              message will only show AFTER successful payment verification.
            </p>
          </div>
        </div>

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

        <div className="lg:flex lg:space-x-8">
          {/* Product Card */}
          {product && (
            <div className="lg:w-1/3 mb-8">
              <div className="border rounded-lg overflow-hidden shadow-md">
                <div className="w-full h-64 relative">
                  <img
                    src={getProductImage() || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null
                      target.src = "/placeholder-toy.jpg"
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl text-blue-800 font-semibold">{product.name}</h3>
                  <p className="text-gray-500">{product.description || "Developmental toy for children"}</p>
                  {/* Show original price and discounted price if available */}
                  {product.discountPercentage && product.discountPercentage > 0 ? (
                    <div className="mt-2">
                      <p className="text-gray-500 line-through">Rs. {product.price.toFixed(2)}</p>
                      <p className="text-lg text-green-600 font-bold">
                        Rs. {(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
                        <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          {product.discountPercentage}% OFF
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-lg text-green-600 font-bold mt-2">Rs. {product.price.toFixed(2)}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Order Form */}
          <div className="lg:w-2/3">
            <div className="border rounded-lg p-6 shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-blue-800 font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-800 font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-blue-800 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-800 font-medium mb-2">Phone</label>
                    <input
                      type="text"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-blue-800 font-medium mb-2">Address 1</label>
                  <input
                    type="text"
                    placeholder="Your address"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-blue-800 font-medium mb-2">Address 2 (Optional)</label>
                  <input
                    type="text"
                    placeholder="Your address line 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <label className="block text-blue-800 font-medium mb-2">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-800 font-medium mb-2">State</label>
                    <input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-800 font-medium mb-2">Postal Code</label>
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-blue-800 font-medium mb-2">Country</label>
                  <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full mt-8 bg-[#C83C92] hover:bg-pink-600 text-white font-medium py-4 px-4 rounded-md flex items-center justify-center transition-colors ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay with UPI, Cards & More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
