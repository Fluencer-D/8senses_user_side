"use client"
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

interface MembershipFormData {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  workExperience: string;
  companyName: string;
  skills: string;
  graduation: string;
  college: string;
}

const ApplicationForm: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [formData, setFormData] = useState<MembershipFormData>({
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    workExperience: '',
    companyName: '',
    skills: '',
    graduation: '',
    college: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      // You can add the file to your form data if needed.
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here, including the file upload
    console.log(formData, fileName);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Back Button */}
      <Link href="/career" className="flex items-center text-blue-800 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="ml-1">Back</span>
      </Link>

      {/* Form Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-blue-800 font-medium mb-2">Apply here to join our team!</h1>
        <p className="text-blue-600">Join our team and be part of something extraordinary!</p>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-6 md:p-8">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx"
          className="hidden"
        />

        {/* Upload Resume Button */}
        <div className="flex justify-center mb-8">
          <button 
            type="button" 
            onClick={triggerFileInput}
            className="border border-pink-500 text-blue-800 rounded-full py-3 px-8 w-full max-w-md flex justify-center items-center"
          >
            {fileName ? `Resume: ${fileName}` : 'Upload your resume'} 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M7 17l5-5 5 5M7 7l5 5 5-5" />
            </svg>
          </button>
        </div>

        {/* Form Fields - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-blue-800 mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-md text-[#456696] bg-[#F8FBFF]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-blue-800 mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+91 55001-55889"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-md text-[#456696] bg-[#F8FBFF]"
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-blue-800 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@123"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-md text-[#456696] bg-[#F8FBFF]"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-blue-800 mb-2">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-3 text-[#456696] bg-[#F8FBFF] border border-gray-200 rounded-md "
            />
          </div>

          {/* Work Experience */}
          <div>
            <label htmlFor="workExperience" className="block text-blue-800 mb-2">Work Experience</label>
            <input
              type="text"
              id="workExperience"
              name="workExperience"
              placeholder="E.g. Pediatrician"
              value={formData.workExperience}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-md text-[#456696] bg-[#F8FBFF]"
            />
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-blue-800 mb-2">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter the company name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-md text-[#456696] bg-[#F8FBFF]"
            />
          </div>

          {/* Graduation */}
          <div>
            <label htmlFor="graduation" className="block text-blue-800 mb-2">Graduation Degree</label>
            <input
              type="text"
              id="graduation"
              name="graduation"
              placeholder="e.g., BPT (Physiotherapy)"
              value={formData.graduation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-md text-[#456696] bg-[#F8FBFF]"
            />
          </div>

          {/* College */}
          <div>
            <label htmlFor="college" className="block text-blue-800 mb-2">College/University</label>
            <input
              type="text"
              id="college"
              name="college"
              placeholder="Name of your college/university"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-md text-[#456696] bg-[#F8FBFF]"
            />
          </div>
        </div>

        {/* Skills Textarea - Full Width */}
        <div className="mt-6">
          <label htmlFor="skills" className="block text-blue-800 mb-2">Skills</label>
          <textarea
            id="skills"
            name="skills"
            rows={5}
            placeholder="Relevant skills: Child assessment, patient care, immunization tracking, etc."
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-md text-[#456696] bg-[#F8FBFF]"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button 
            type="submit" 
            className="w-full bg-pink-500 text-white py-4 rounded-full flex justify-center items-center"
          >
            Submit the form
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;