import React from "react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: `We collect personal details such as name, contact number, email address, and billing information. 
Health-related information voluntarily shared by you to assess program suitability. 
Payment details are processed securely through Razorpay and other trusted third-party payment gateways.`,
    },
    {
      title: "Use of Information",
      content: `Information collected is used to confirm and process bookings, provide program schedules, updates, and reminders. 
We may send promotional offers and newsletters (optional, with unsubscribe facility). 
Data helps us improve user experience on our Website.`,
    },
    {
      title: "Data Security",
      content: `We use SSL encryption and secure servers to protect your information. 
Payments are processed through PCI-DSS-compliant gateways. 
We do not store or have access to your complete card/banking details.`,
    },
    {
      title: "Sharing of Information",
      content: `We do not sell or trade your personal information. 
Information may be shared only with trusted third parties necessary to provide services, such as payment processors. 
Data may be disclosed if required by law or regulatory authorities.`,
    },
    {
      title: "User Rights",
      content: `You can request access, correction, or deletion of your personal data by contacting us. 
You may opt out of promotional communication anytime.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
      {sections.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{section.title}</h2>
          <p className="text-gray-700 leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
