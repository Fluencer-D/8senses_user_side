"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar/page";
import Link from "next/link";

export default function BookingForm() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  // Predefined service types
  const serviceOptions = [
    { value: "therapy", label: "Therapy" },
  ];
  
  const [formData, setFormData] = useState({
    motherName: "",
    fatherName: "",
    childName: "",
    contactNumber: "",
    email: "",
    childAge: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    specialNeeds: "",
    paymentMethod: "credit_card",
    consent: false
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ 
        ...formData, 
        [name]: (e.target as HTMLInputElement).checked 
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['motherName', 'childName', 'contactNumber', 'email', 
                          'childAge', 'serviceType', 'preferredDate', 'preferredTime'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setServerError(`Please fill all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!formData.consent) {
      setServerError('You must consent to the treatment and privacy policy');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const requestData = {
        motherName: formData.motherName,
        fatherName: formData.fatherName,
        childName: formData.childName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        childAge: formData.childAge,
        serviceType: formData.serviceType, // Send service type directly
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        specialNeeds: formData.specialNeeds || "None specified",
        paymentMethod: formData.paymentMethod
      };

      const response = await fetch(`https://eight-senses-backend.onrender.com/api/appointment-forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || 'Failed to submit booking');
      }

      alert('Booking submitted successfully!');
      setFormData({
        motherName: "",
        fatherName: "",
        childName: "",
        contactNumber: "",
        email: "",
        childAge: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        specialNeeds: "",
        paymentMethod: "credit_card",
        consent: false
      });

    } catch (error: unknown) {
      console.error('Booking error:', error);
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('An unknown error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F8FBFF] flex justify-center items-center px-4 py-12 mt-15">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border-2 border-[#1E437A] overflow-hidden">
          <div className="p-8 bg-[#F8FBFF]">
            <Link href={'/'} className="flex items-center mb-6 text-[#456696] hover:text-[#1E437A] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 20" fill="none" className="mr-2">
                <path d="M20.668 24L12.668 16L20.668 8" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg -mb-2">Back</span>
            </Link>

            <h2 className="text-4xl font-bold text-[#1E437A] mb-4">Book a Service</h2>
            <p className="text-[#456696] text-lg mb-8">
              Fill out the form below to book a personalized service for your child. We&apos;re committed to supporting your child&apos;s unique developmental journey.
            </p>

            {serverError && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                <p>{serverError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mother's Name */}
                <div>
                  <label className="block text-[#1E437A] text-lg font-semibold mb-2">Mother&apos;s Name*</label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Enter mother's full name"
                    className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition"
                    style={{ color: "#456696", backgroundColor: "white" }}
                    required
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <label className="block text-[#1E437A] text-lg font-semibold mb-2">Father&apos;s Name*</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Enter father's full name"
                    className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition"
                    style={{ color: "#456696", backgroundColor: "white" }}
                    required
                  />
                </div>

                {/* Child Name */}
                <div>
                  <label className="block text-[#1E437A] text-lg font-semibold mb-2">Child&apos;s Name*</label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    placeholder="Enter child's name"
                    className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition"
                    style={{ color: "#456696", backgroundColor: "white" }}
                    required
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-[#1E437A] text-lg font-semibold mb-2">Contact Number*</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition"
                    style={{ color: "#456696", backgroundColor: "white" }}
                    required
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[#1E437A] text-lg font-semibold mb-2">Email Address*</label>
                  <input
                    type="email"
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition"
                    style={{ color: "#456696", backgroundColor: "white" }}
                    required
                  />
                </div>

                {/* Child Age */}
                <div>
                  <label className="block text-[#1E437A] text-lg font-semibold mb-2">Child&apos;s Age (in years)*</label>
                  <input
                    type="number"
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="Enter child's age"
                    min="0"
                    max="18"
                    className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition"
                    style={{ color: "#456696", backgroundColor: "white" }}
                    required
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-[#1E437A] text-lg font-semibold mb-2">Service Type*</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition"
                    style={{ color: "#456696", backgroundColor: "white" }}
                    required
                  >
                    <option value="">Select service type</option>
                    {serviceOptions.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-[#1E437A] text-lg font-semibold mb-2">Preferred Date*</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition"
                    style={{ color: "#456696", backgroundColor: "white" }}
                    required
                  />
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-[#1E437A] text-lg font-semibold mb-2">Preferred Time*</label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition"
                    style={{ color: "#456696", backgroundColor: "white" }}
                    required
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-[#1E437A] text-lg font-semibold mb-2">Payment Method*</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition"
                    style={{ color: "#456696", backgroundColor: "white" }}
                    required
                  >
                    <option value="credit_card">Credit/Debit Card</option>
                    <option value="cash">Cash</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>
              </div>

              {/* Special Needs */}
              <div>
                <label className="block text-[#1E437A] text-lg font-semibold mb-2">Special Needs or Considerations</label>
                <textarea
                  name="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={handleChange}
                  placeholder="Please describe any special needs or considerations"
                  className="w-full p-3 rounded-lg border-2 border-[#1E437A]/30 focus:border-[#1E437A] focus:ring-2 focus:ring-[#1E437A]/20 transition h-32 resize-none"
                  style={{ color: "#456696", backgroundColor: "white" }}
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="consent"
                  id="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#C83C92] focus:ring-[#C83C92] border-gray-300 rounded"
                  // required 
                />
                <label htmlFor="consent" className="ml-2 block text-[#1E437A] text-lg">
                  I consent to the treatment and privacy policy*
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#C83C92] text-white font-semibold p-4 rounded-xl mt-6 transition duration-300 ease-in-out shadow-lg ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#a63079] hover:scale-[1.01]'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Book Service →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}