import React from "react";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Services",
      content: `We provide wellness, therapy, and clinical programs designed for individuals seeking physical, mental, or emotional well-being. 
The programs may include consultations, therapy sessions, workshops, and online/offline programs. 
We reserve the right to modify, suspend, or discontinue services at our sole discretion.`,
    },
    {
      title: "Eligibility",
      content: `You must be at least 18 years of age to purchase services. 
If you are under 18, a parent/guardian must make the purchase and accompany you (where required). 
We may refuse service if you provide false or incomplete information.`,
    },
    {
      title: "Medical Disclaimer",
      content: `All content, resources, workshops, videos, written materials, blog posts, and related media provided by 8 Senses Pediatric Occupational Therapy Clinic are for general educational and informational purposes only. 
They are not intended to serve as medical, diagnostic, or therapeutic instruction. 
Please consult a qualified healthcare provider for individual guidance.`,
    },
    {
      title: "Payments",
      content: `All payments must be made online through our secure payment partners, including Razorpay. 
Prices listed on the Website are inclusive of applicable taxes unless stated otherwise. 
We do not store your credit/debit card or payment details on our servers.`,
    },
    {
      title: "User Obligations",
      content: `You agree to provide accurate information during registration. 
You will not use the Website for unlawful purposes. 
You agree not to copy, distribute, or misuse the Website’s content.`,
    },
    {
      title: "Intellectual Property",
      content: `All content, including text, images, logos, and material on the Website, are the property of 8 Senses Clinic. 
Unauthorized use, duplication, or distribution is prohibited.`,
    },
    {
      title: "Limitation of Liability",
      content: `We strive for accuracy but make no guarantee of uninterrupted or error-free services. 
The Clinic shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.`,
    },
    {
      title: "Governing Law",
      content: `These Terms are governed by the laws of India. 
Any dispute will be subject to the exclusive jurisdiction of the courts in Nashik, Maharashtra.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms and Conditions</h1>
      {sections.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{section.title}</h2>
          <p className="text-gray-700 leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TermsAndConditions;
