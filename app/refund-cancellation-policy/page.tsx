import React from "react";
import Navbar from "../components/navbar/page";

const RefundCancellationPolicy = () => {
  const sections = [
    {
      title: "Cancellations",
      content: `You may cancel bookings within 24 hours of purchase for a full refund. 
Programs that have already commenced cannot be canceled. 
For subscription services, cancellation requests must be made at least 48 hours before the next billing cycle.`,
    },
    {
      title: "Refund Eligibility",
      content: `Refunds will only be processed if:
- The program/service was not delivered as promised.
- Duplicate payments were made.

Refunds are credited to the original payment method within 7–10 business days. 
No refunds are provided for partially completed or missed sessions.`,
    },
    {
      title: "Rescheduling",
      content: `Sessions may be rescheduled once, free of charge, if requested at least 24 hours in advance. 
Late rescheduling may attract additional fees.`,
    },
    {
      title: "Support Contact",
      content: `For cancellations or refunds, contact us at 8sensesclinic@gmail.com with your booking details. 
Our support team will process your request promptly.`,
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="max-w-4xl mx-auto px-6 py-12 mt-22">
      <h1 className="text-3xl font-bold mb-8 text-center">Refund & Cancellation Policy</h1>
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

export default RefundCancellationPolicy;
