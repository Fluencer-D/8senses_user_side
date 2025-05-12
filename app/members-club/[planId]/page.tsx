"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

interface MembershipFormData {
  name: string;
  email: string;
  phone: string;
  planId: string;
}

interface PlanFeatures {
  accessToWebinars: boolean;
  customerDiscounts: boolean;
  autoRenewal: boolean;
  displayOnPricingPage: boolean;
  accessToPremiumCourses: boolean;
}

interface SubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: string;
  features: PlanFeatures;
  order: number;
}

const MembershipConfirmation: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const planId = params.planId as string;

  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<MembershipFormData>({
    name: '',
    email: '',
    phone: '',
    planId: planId
  });

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/plans/${planId}`);
        const data = await response.json();

        if (response.ok) {
          setPlan(data.data);
        } else {
          setError(data.message || 'Failed to load plan details');
        }
      } catch (err) {
        setError('An error occurred while fetching plan details');
      } finally {
        setLoading(false);
      }
    };

    if (planId) {
      fetchPlanDetails();
    }
  }, [planId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = (error) => reject(new Error('Failed to load Razorpay script'));
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    setIsSubmitting(true);

    try {
      // Step 1: Create the subscription record
      const subscriptionResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const subscriptionData = await subscriptionResponse.json();

      if (!subscriptionResponse.ok) {
        throw new Error(subscriptionData.message || 'Subscription creation failed');
      }

      // Step 2: Initiate Razorpay payment
      const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: formData.planId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subscriptionId: subscriptionData.data._id
        }),
      });

      const paymentData = await paymentResponse.json();
      console.log("suiiiiiiiiiiiiiiiiiii",paymentData)

      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || 'Payment initiation failed');
      }

      // Step 3: Load Razorpay script if not already loaded
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // Step 4: Initialize Razorpay checkout
      const options = {
        key: paymentData.data.key,
        amount: paymentData.data.amount,
        currency: paymentData.data.currency,
        name: paymentData.data.name,
        description: paymentData.data.description,
        order_id: paymentData.data.order.id,
        handler: async function (response: any) {
          try {
            // Step 5: Verify payment with the backend
            const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/subscription/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                subscriptionId: subscriptionData.data._id
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyData.message || 'Payment verification failed');
            }

            // Step 6: Redirect to success page
            router.push(`/payment-success?plan=${planId}&subscription=${subscriptionData.data._id}`);
          } catch (err) {
            setError('Payment verification failed. Please contact support.');
            console.error('Payment verification error:', err);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          planId: formData.planId,
          subscriptionId: subscriptionData.data._id
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
      setError(err.message || 'An error occurred during payment. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBillingDescription = (billingCycle: string) => {
    switch (billingCycle) {
      case 'monthly':
        return 'per month';
      case 'quarterly':
        return 'every 3 months';
      case 'biannual':
        return 'every 6 months';
      case 'annual':
        return 'per year, billed annually';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => router.push('/members-club')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Plans
        </button>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Plan not found
        </div>
        <button
          onClick={() => router.push('/members-club')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Plans
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />

      <Link href="/members-club" className="flex items-center text-blue-800 mb-4">
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Plans</span>
      </Link>

      <h1 className="text-3xl font-bold text-blue-900 mb-2">Confirm your membership!</h1>
      <p className="text-gray-600 mb-6">
        Secure your spot — confirm your membership and start enjoying exclusive perks!
      </p>

      <div className="mb-8">
        <div className={`rounded-lg p-6 text-white ${
          plan.order === 3 ? 'bg-blue-900' : 'bg-[#245BA7]'
        }`}>
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

      <form onSubmit={(e) => {
        e.preventDefault();
        initiatePayment();
      }} className="border border-gray-200 rounded-lg p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-blue-900 font-medium mb-2">
            Full Name
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
            Email
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
            Phone Number
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

        <input type="hidden" name="planId" value={planId} />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 bg-[#C83C92] hover:bg-pink-600 text-white rounded-full font-medium flex items-center justify-center ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
          {!isSubmitting && (
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default MembershipConfirmation;
