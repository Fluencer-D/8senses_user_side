"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/app/components/navbar/page';

const OrderPage: React.FC = () => {
  const router = useRouter();
  const { productId } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://eight-senses-backend.onrender.com'}/api/products/${productId}`);
          const data = await response.json();
          if (response.ok) {
            setProduct(data.data);
            console.log("Product data:", data.data); // For debugging
          } else {
            throw new Error('Product not found');
          }
        } catch (err) {
          setError('Failed to load product details');
        }
      };

      fetchProduct();
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Step 1: Create the order in your backend (submit the order)
      const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://eight-senses-backend.onrender.com'}/api/orders/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        }),
      });
  
      const orderData = await orderResponse.json();
      console.log("orderrrrrrrrrrrrrr",orderData)
      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Order creation failed');
      }
  
      const orderId = orderData.reference;  // Get the reference of the created order
  
      // Step 2: Initiate Razorpay payment with the created orderId
      const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,  
          name: firstName + ' ' + lastName,
          email,
          phone,
        }),
      });
  
      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || 'Payment initiation failed');
      }
  
      // Razorpay payment options
      const options = {
        key: paymentData.data.key,
        amount: paymentData.data.amount * 100,  // Convert to paise
        currency: paymentData.data.currency,
        name: '8 Senses Clinic',
        description: `Payment for ${product.name}`,
        order_id: paymentData.data.order.id,
        handler: async function (response: any) {
          const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/product/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            }),
          });
  
          const verifyData = await verifyResponse.json();
          if (!verifyResponse.ok) {
            throw new Error(verifyData.error || 'Payment verification failed');
          }
  
          alert(`Payment successful! Order #${verifyData.data.order.orderNumber} confirmed.`);
          router.push('/');
        },
        prefill: {
          name: firstName + ' ' + lastName,
          email,
          contact: phone,
        },
        notes: {
          orderId,
        },
        theme: { color: '#d83f96' },
      };
  
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  // Function to get the product image URL
  const getProductImage = () => {
    if (product?.images && product.images.length > 0) {
      const mainImage = product.images.find((img: any) => img.isMain) || product.images[0];
      return mainImage.url;
    }
    return "/placeholder-toy.jpg"; // Default placeholder
  };

  if (!product && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar/>

      <div className="container mx-auto px-4 py-8 mt-10">
        {/* Back Button */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-blue-700 hover:text-blue-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>

        {/* Order Title */}
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Order Now</h1>
        <p className="text-gray-600 mb-8">
          Fill out the form below to borrow a developmental toy for your child. Play, learn, and grow with expert-selected toys!
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="lg:flex lg:space-x-8">
          {/* Product Card */}
          {product && (
            <div className="lg:w-1/3 mb-8">
              <div className="border rounded-lg overflow-hidden shadow-md">
                <div className="w-full h-64 relative">
                  <img 
                    src={getProductImage()}
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; 
                      target.src = '/placeholder-toy.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl text-blue-800 font-semibold">{product.name}</h3>
                  <p className="text-gray-500">{product.description || "good"}</p>
                  
                  {/* Show original price and discounted price if available */}
                  {product.discountPercentage && product.discountPercentage > 0 ? (
                    <div className="mt-2">
                      <p className="text-gray-500 line-through">Rs. {product.price.toFixed(2)}</p>
                      <p className="text-lg text-green-600 font-bold">
                        Rs. {(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}
                        <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          {product.discountPercentage}% OFF
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-lg text-green-600 font-bold mt-2">Rs. {product.price.toFixed(2)}</p>
                  )}
                  
                  <button 
                    className="mt-4 w-full bg-[#C83C92] hover:[#C83C92] text-white py-3 px-4 rounded-md flex items-center justify-center"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    Order Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Order Form */}
          <div className="lg:w-2/3">
            <div className="border rounded-lg p-6 shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
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

                <div className="mb-6">
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

                <div className="mb-6">
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

                <div className="mb-6">
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

                <div className="mb-6">
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

                <div className="mb-6">
                  <label className="block text-blue-800 font-medium mb-2">Address 2 (Optional)</label>
                  <input
                    type="text"
                    placeholder="Your address line 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
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

                <div className="mb-6">
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

                <div className="mb-6">
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

                <div className="mb-6">
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
                  className="w-full bg-[#C83C92] hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center"
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                {error && (
                  <div className="mt-4 text-red-600">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
