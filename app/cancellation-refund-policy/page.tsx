import React from "react";

const CancellationRefundPolicy = () => {
  const sections = [
    {
      title: "Cancellations",
      content: `Bookings can be canceled within 24 hours of purchase for a full refund. 
Once a program has commenced, cancellations are not allowed. 
For subscription-based services, cancellation requests must be made at least 48 hours before the next billing cycle.`,
    },
    {
      title: "Refunds",
      content: `Refunds are processed only if the program/service was not delivered as promised or if duplicate payments were made. 
Refunds will be credited to the original payment method within 7–10 business days. 
No refunds will be provided for partially completed or missed sessions.`,
    },
    {
      title: "Rescheduling",
      content: `Sessions may be rescheduled once, free of charge, if requested at least 24 hours in advance. 
Late rescheduling may attract an additional fee.`,
    },
    {
      title: "Contact for Refunds",
      content: `For cancellations or refunds, please write to us at 8sensesclinic@gmail.com with your booking details. 
Our support team will process your request promptly.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Cancellation & Refund Policy</h1>
      {sections.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{section.title}</h2>
          <p className="text-gray-700 leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CancellationRefundPolicy;
