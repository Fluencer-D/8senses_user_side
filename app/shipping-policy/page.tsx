import React from "react";
import Navbar from "../components/navbar/page";

const ShippingPolicy = () => {
  const sections = [
    {
      title: "Digital Delivery",
      content: `Since we provide therapy and wellness programs, there is no physical shipping of goods. 
Program details, confirmations, and access information will be delivered digitally via email or SMS within 24–48 hours of successful payment.`,
    },
    {
      title: "Offline / Clinic-based Programs",
      content: `For offline or clinic-based programs, appointment details will be shared via registered email or phone. 
Please ensure your contact information is accurate during registration.`,
    },
    {
      title: "Delays and Issues",
      content: `In case of delays or non-receipt of confirmation, please contact our support team at: 
9309187144 | 9766712546 | 8600994239. 
We will assist you promptly to resolve any issues.`,
    },
  ];

  return (
    <>
        <Navbar/>
    <div className="max-w-4xl mt-22 mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Shipping Policy</h1>
      {sections.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{section.title}</h2>
          <p className="text-gray-700 leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default ShippingPolicy;
