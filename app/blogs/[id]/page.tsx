"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from '@/app/components/navbar/page';
import Consultation from '@/app/components/consultation/page';
import Footer from '@/app/components/footer/page';
import { useParams } from "next/navigation";
import BlogCard1 from '../../../public/BlogCard1.png'; // Fallback image

interface BlogDetail {
  featuredImage?: string;
  title?: string;
  content?: string;
  description?: string;
  slug?: string;
  _id?: string;
  tags?: string[];  
  author?: string;
  readTime?: string;
  publishedDate?: string;
  publishDate?: string;
}

const BlogPost = () => {
  const params = useParams();
  const blogId = params.id;
  
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`https://eight-senses-backend.onrender.com/api/blogs/${blogId}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Check if the response has a data property (from your sample JSON structure)
        const blogData = data.data || data;
        console.log("Blog data:", blogData);
        setBlog(blogData);
      } catch (err) {
        console.error("Failed to fetch blog details:", err);
        setError("Failed to load blog details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlogDetails();
    }
  }, [blogId]);

  // Function to decode HTML entities
  const decodeHtmlEntities = (html: string | undefined): string => {
    if (!html) return '';
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  };

  // Function to enhance HTML content with custom styling
  const enhanceHtmlContent = (html: string): string => {
    // Add custom styling to h2 tags
    html = html.replace(/<h2>/g, '<h2 class="text-3xl font-semibold text-[#1E437A] mt-10 mb-4">');
    
    // Add custom styling to h3 tags
    html = html.replace(/<h3>/g, '<h3 class="text-2xl font-semibold text-[#1E437A] mt-8 mb-3">');
    
    // Add custom styling to p tags
    html = html.replace(/<p>/g, '<p class="text-lg text-[#456696] mb-6 leading-relaxed">');
    
    return html;
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C83C92]"></div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 max-w-7xl mx-auto px-4">
          <p className="text-red-500 text-xl mb-4">{error || "Blog not found"}</p>
          <p className="text-[#456696]">Please try again later or go back to the blogs page.</p>
        </div>
        <Footer />
      </>
    );
  }

  // Format date for display in the header
  const formatShortDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format date for display in the article details
  const formatLongDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get the formatted dates
  const shortDate = formatShortDate(blog.publishDate || blog.publishedDate);
  const longDate = formatLongDate(blog.publishDate || blog.publishedDate);

  // Process the content
  const decodedContent = decodeHtmlEntities(blog.content);
  const enhancedContent = enhanceHtmlContent(decodedContent);

  return (
    <>
      <Navbar />
      
      {/* Hero Image and Title */}
      <div className="relative w-full">
        <div className="relative w-[90%] mx-auto mt-25 h-[300px] md:h-[400px] overflow-hidden rounded-b-3xl">
          <Image 
            src={blog.featuredImage || BlogCard1} 
            alt={blog.title || "Blog post"} 
            fill
            style={{ objectFit: 'cover'}}
            priority
          />
          <div className="absolute bottom-4 left-4 bg-white px-4 py-3 rounded-lg text-gray-800 max-w-md">
            <h2 className="text-xl font-medium">{blog.title}</h2>
            <div className="flex mt-1 text-sm text-gray-600">
              <span>{shortDate || 'Oct 19'}</span>
              <span className="mx-2">·</span>
              <span>{blog.readTime || '10 min read'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="w-[90%] max-w-7xl mx-auto px-4 py-8">        
        {/* Author and publish date (optional, you may want to remove if redundant) */}
        {(blog.author || longDate) && (
          <div className="flex items-center mb-8 text-[#456696]">
            {blog.author && (
              <div className="mr-4 text-lg font-medium">
                By {blog.author}
              </div>
            )}
            {longDate && (
              <div className="text-base">
                {longDate}
              </div>
            )}
          </div>
        )}
        
        {/* Main content - Using dangerouslySetInnerHTML with enhanced styling */}
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: enhancedContent }}
        />

        {/* Balance tips section */}
        <div className="mt-12 mb-8 p-6 bg-blue-50 rounded-xl">
          <h3 className="text-2xl font-semibold text-[#1E437A] mb-4">
            Balance tip:
          </h3>
          <ul className="space-y-4 text-[#456696]">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 text-xl">✓</span>
              <span className="text-lg">Be involved in your child's life, but focus on empowering rather than controlling them</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 text-xl">✓</span>
              <span className="text-lg">Foster open communication while respecting their personal space and decision-making within safe boundaries</span>
            </li>
          </ul>
        </div>
      </article>

      <Consultation />
      <Footer />
    </>
  );
};

export default BlogPost;