"use client";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import BlogCard1 from "../../../public/BlogCard1.png";

interface Blog {
  featuredImage?: string;
  title?: string;
  description?: string;
  slug?: string;
  _id?: string;
}

interface BlogCardProps {
  imageSrc: string | StaticImageData;
  title: string;
  description: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageSrc,
  title,
  description,
  link,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border-2 border-[#456696] w-full max-w-[780px] flex flex-col">
      <div className="relative w-full h-[200px] md:h-[280px] lg:h-[345px]">
        <Image src={imageSrc} alt={title} fill style={{ objectFit: "cover" }} />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[#1E437A] font-semibold text-lg md:text-xl lg:text-2xl">
          {title}
        </h3>
        <p className="text-[#456696] text-sm md:text-base lg:text-md mt-2 flex-grow">
          {description}
        </p>
        <a
          href={link}
          className="text-[#C83C92] font-bold text-base md:text-[18px] mt-3"
        >
          Read blog
        </a>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const blogsArray = Array.isArray(data)
          ? data
          : data.blogs || data.data || [];

        const formattedBlogs = blogsArray.map((blog: Blog) => ({
          imageSrc: blog.featuredImage || BlogCard1,
          title: blog.title || "Untitled Blog",
          description: blog.description
            ? `${blog.description.substring(0, 150)}...`
            : "No description available",
          link: `/blogs/${blog.slug || blog._id || "#"}`,
        }));

        setBlogs(formattedBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");

        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C83C92]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <p className="text-[#456696] mt-2">Showing fallback content</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 justify-items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {blogs.slice(0, 4).map((blog, index) => (
        <BlogCard key={index} {...blog} />
      ))}
      {blogs.length > 4 && (
        <div className="sm:col-span-2 lg:col-span-1 flex justify-center w-full">
          <BlogCard {...blogs[4]} />
        </div>
      )}
    </div>
  );
};

export default BlogSection;
