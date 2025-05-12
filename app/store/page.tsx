"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar/page'
import Image from 'next/image'
import Banner from '../components/CommonBanner/Banner'
import Footer from '../components/footer/page'
import ContactBanner from '@/public/ContactBanner.png'
import DottedPattern from '../components/dottedPattern/page'
import AbtIconContainer from '@/public/AbtIconContainer.png'
import Link from 'next/link'; // Import Link component
import PlaceholderImage from '@/public/Gallery1.png'


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface Service {
  title: string;
  description: string;
}

interface ProductImage {
  url: string;
  isMain: boolean;
  _id?: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountedPrice?: number;
  images?: ProductImage[];
  isFeatured: boolean;
  category?: string;
  ageGroup?: string;
}

interface Category {
  _id: string;
  name: string;
  description?: string;
  categoryType?: string;
  image?: string;
  slug?: string;
}

interface FilterState {
  category: string;
  ageGroup: string;
}

const services: Service[] = [
    {
        title: "Curated by Experts",
        description:
            "Our products are handpicked by pediatric therapists to support optimal child development and therapy goals.",
    },
    {
        title: "Safe & Child-Friendly",
        description:
            "Designed with safety, comfort, and effectiveness in mind, ensuring the best experience for your child.",
    },
    {
        title: "Easy Ordering",
        description: "No complex checkout! Simply inquire, confirm, and receive your products hassle-free.",
    },
];

const Store: React.FC = () => {
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    ageGroup: ''
  });
  const [error, setError] = useState<string | null>(null);
  
  const initialProductCount = 6;


  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = `${BASE_URL}/api/products`;
        console.log("Fetching products from:", apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data); // Debugging
        
        let productsData = [];
        if (Array.isArray(data)) {
          productsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          productsData = data.data;
        } else if (data.products && Array.isArray(data.products)) {
          productsData = data.products;
        }
        
        console.log("Processed Products:", productsData); // Debugging
        setProducts(productsData);
        
        const featured = productsData.filter((product: Product) => product.isFeatured);
        setFeaturedProducts(featured.length > 3 ? featured.slice(0, 3) : featured);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchCategories = async (): Promise<void> => {
      try {
        const apiUrl = `${BASE_URL}/api/categories`;
        console.log("Fetching categories from:", apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          setCategories(result.data);
        } else if (Array.isArray(result)) {
          setCategories(result);
        } else {
          console.error('Unexpected categories response structure:', result);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };
    
    fetchProducts();
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchFilteredProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        
        if (filters.category || filters.ageGroup) {
          const params = new URLSearchParams();
          
          if (filters.category && filters.category !== 'all') {
            params.append('category', filters.category);
          }
          
          if (filters.ageGroup && filters.ageGroup !== 'all') {
            params.append('ageGroup', filters.ageGroup);
          }
          
          const apiUrl = `${BASE_URL}/api/products?${params.toString()}`;
          console.log("Fetching filtered products from:", apiUrl);
          
          const response = await fetch(apiUrl);
          
          if (response.status === 404) {
            console.warn("Filter endpoint not found, falling back to all products");
            const filteredProducts = clientSideFilter(products, filters);
            setProducts(filteredProducts);
            return;
          }
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          
          const productsData = Array.isArray(result) 
            ? result 
            : result.success 
              ? result.data || result.products || []
              : [];
          
          setProducts(productsData);
        }
        
      } catch (error) {
        console.error('Error fetching filtered products:', error);
        const filteredProducts = clientSideFilter(products, filters);
        setProducts(filteredProducts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilteredProducts();
  }, [filters]);
  
  const clientSideFilter = (allProducts: Product[], currentFilters: FilterState): Product[] => {
    return allProducts.filter(product => {
      const categoryMatch = !currentFilters.category || 
                          currentFilters.category === 'all' || 
                          product.category === currentFilters.category;
      
      const ageGroupMatch = !currentFilters.ageGroup || 
                          currentFilters.ageGroup === 'all' || 
                          product.ageGroup === currentFilters.ageGroup;
      
      return categoryMatch && ageGroupMatch;
    });
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const toggleProductsView = (): void => {
    setShowAllProducts(!showAllProducts);
  };

  const displayedProducts = showAllProducts 
    ? products 
    : products.slice(0, initialProductCount);
    
  const getMainImage = (product: Product): string => {
    if (!product.images || product.images.length === 0) {
      return PlaceholderImage.src;
    }
    
    const mainImage = product.images.find(img => img.isMain);
    return mainImage ? mainImage.url : product.images[0].url;
  };
  
  const formatPrice = (price: number): string => {
    return `Rs. ${price.toLocaleString()}/-`;
  };
  
  const getDisplayPrice = (product: Product): string => {
    return product.discountedPrice && product.discountedPrice < product.price 
      ? formatPrice(product.discountedPrice)
      : formatPrice(product.price);
  };

  return (
    <>
    <Navbar/>
    <Banner
    title="Our Store"
    description="Expert-approved products designed to support your child&apos;s growth, learning, and development."
    imageSrc={ContactBanner}
    />

       {/* explore our products section */}
       <section className="bg-white py-8 md:py-16 px-4 sm:px-6 lg:px-26 text-center">
      {/* Title - DottedPattern hidden on mobile/tablet, shown on desktop */}
      <div className='hidden lg:block mt-10 md:mt-20'><DottedPattern/></div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-nav_link_font text-[#1E437A] mb-6 md:mb-10">
        Explore our Products
      </h2>

      {/* Error message if present */}
      {error && (
        <div className="mt-4 mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
        <select 
          name="ageGroup"
          value={filters.ageGroup}
          onChange={handleFilterChange}
          className="px-4 py-3 rounded-md border border-[#456696] bg-[#F8FBFF] w-full sm:w-auto lg:w-160"
        >
          <option value="">Select your child's age</option>
          <option value="all">All Ages</option>
          <option value="0-2">0-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="6-8">6-8 years</option>
          <option value="9-12">9-12 years</option>
          <option value="13+">13+ years</option>
        </select>
        <select 
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="px-4 py-3 rounded-md border border-[#456696] bg-[#F8FBFF] w-full sm:w-auto lg:w-160"
        >
          <option value="">Select the Therapy Focus</option>
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category._id} value={category.slug || category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="mt-10 text-center">
          <p className="text-lg text-[#456696]">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-lg text-[#456696]">No products found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10 px-2 sm:px-0">
            {displayedProducts && displayedProducts.map((product) => (
              <div key={product._id} className="bg-white shadow-lg w-full max-w-[410px] mx-auto sm:w-full rounded-2xl flex flex-col h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={getMainImage(product)}
                    alt={product.name}
                    width={410}
                    height={300}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-xl text-left font-medium text-[#1E437A]">
                    {product.name}
                  </h3>
                  <p className="text-md text-[#456696] mt-2 text-left">
                    {product.shortDescription || product.description.substring(0, 100) + (product.description.length > 100 ? '...' : '')}
                  </p>
                  <span className="text-[#0CB24B] text-lg font-semibold block mt-2 text-left">
                    {getDisplayPrice(product)}
                  </span>
                </div>
                <Link href={`/store/${product._id}`}>
              <button className="w-[calc(100%-16px)] cursor-pointer mx-2 mb-2 py-2 bg-[#C83C92] text-white font-medium rounded-full">
                Order Now →
              </button>
            </Link>
              </div>
            ))}
          </div>

          {/* View More/View Less Button - Only shows if there are more than initial products */}
          {products.length > initialProductCount && (
            <button 
              onClick={toggleProductsView}
              className="mt-8 px-7 py-3 text-[#C83C92] border border-[#C83C92] rounded-full hover:bg-[#C83C92] hover:text-white transition-colors"
            >
              {showAllProducts ? 'View Less' : 'View More'}
            </button>
          )}
        </>
      )}
    </section>

       {/* Featured Products section */}
<section className="bg-white py-8 md:py-16 px-4 sm:px-6 lg:px-26 text-center -mb-10 md:-mb-20">
  {/* Title */}
  <h2 className="text-3xl min-[768px]:text-4xl lg:text-5xl font-nav_link_font text-[#1E437A] mb-6 lg:mb-10">
    Featured Products
  </h2>
  <div className="hidden lg:block relative mb-10 lg:mb-20">
    <DottedPattern />
  </div>

  {/* Loading State */}
  {loading ? (
    <div className="mt-10 text-center">
      <p className="text-lg text-[#456696]">Loading featured products...</p>
    </div>
  ) : featuredProducts.length === 0 ? (
    <div className="mt-10 text-center">
      <p className="text-lg text-[#456696]">No featured products available at the moment.</p>
    </div>
  ) : (
    /* Product Grid - Fixed for iPad Pro and Nest Hub */
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[900px]:grid-cols-3 gap-4 min-[768px]:gap-6 lg:gap-8 mt-6 min-[768px]:mt-8 lg:mt-10 justify-items-center">
      {featuredProducts && featuredProducts.map((product) => (
        <div key={product._id} className="bg-white shadow-lg w-full max-w-[400px] min-[900px]:max-w-[410px] rounded-2xl flex flex-col h-full overflow-hidden">
          <div className="aspect-[4/3] min-[900px]:h-[300px]">
            <Image
              src={getMainImage(product)}
              alt={product.name}
              width={410}
              height={300}
              className="w-full h-full object-cover rounded-t-2xl"
            />
          </div>
          <div className="p-3 min-[768px]:p-4 flex-grow">
            <h3 className="text-lg min-[768px]:text-xl lg:text-xl text-left font-medium text-[#1E437A]">
              {product.name}
            </h3>
            <p className="text-sm min-[768px]:text-base lg:text-md text-[#456696] mt-1 min-[768px]:mt-2 lg:mt-2 text-left">
              {product.shortDescription || product.description.substring(0, 100) + (product.description.length > 100 ? '...' : '')}
            </p>
            <span className="text-base min-[768px]:text-lg lg:text-lg text-[#0CB24B] font-semibold block mt-1 min-[768px]:mt-2 lg:mt-2 text-left">
              {getDisplayPrice(product)}
            </span>
          </div>
          <Link href={`/store/${product._id}`}>
          <button className="w-[calc(100%-16px)] cursor-pointer min-[900px]:w-[96%] mx-2 mb-2 py-2 bg-[#C83C92] text-white font-medium rounded-full text-sm min-[768px]:text-base">
            Order Now →
          </button>
          </Link>
        </div>
      ))}
    </div>
  )}
</section>

{/* Why Buy section */}
<section className='relative mt-12 lg:mt-23 bg-white py-8 lg:py-16 px-4 sm:px-8 md:px-20 lg:px-32 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12'>
  {/* Dotted Pattern - Hidden on mobile */}
  <div className="hidden lg:block absolute -mt-40 lg:-mt-50 ml-[125px] z-10 2xl:-mt-0">
    <DottedPattern />
  </div>
  
  {/* Heading Section */}
  <div className='mt-0 lg:mt-9 w-full lg:w-auto'>
    <h2 className='w-full lg:w-[522px] font-nav_link_font font-normal text-3xl md:text-4xl lg:text-[50px] xl:text-[52px] xl:leading-[65px] flex justify-center lg:justify-start items-center tracking-wide text-[#1E437A] lg:-mt-7'>
      Why Buy from Us?
    </h2>
    <p className="w-full lg:w-auto text-lg md:text-xl lg:text-[26px] xl:text-[30px] font-normal leading-relaxed lg:leading-[44px] tracking-wide lg:tracking-[0.64px] text-[#456696] font-urbanist mt-4 lg:mt-7 text-center lg:text-left">
      Support your child's growth with expert-approved <br className="hidden lg:inline" /> therapy essentials!
    </p>
  </div>

  {/* Desktop Button - EXACTLY as is */}
  <div className="hidden xl:flex justify-start lg:mt-2 lg:ml-[400px] xl:ml-[300px]">
    <button className="bg-[#C83C92] text-white text-lg font-medium px-6 py-3 rounded-full cursor-pointer">
      Explore our products
    </button>
  </div>

  {/* Tablet/Mid-size Button - Only shows on iPad Pro and Nest Hub */}
  <div className="hidden lg:flex xl:hidden justify-center w-full mt-8">
    <button className="bg-[#C83C92] text-white text-lg font-medium px-6 py-3 rounded-full">
      Explore our products
    </button>
  </div>

  {/* Mobile Button - Only shows on small screens */}
  <div className="lg:hidden flex justify-center w-full mt-8">
    <button className="bg-[#C83C92] text-white text-lg font-medium px-6 py-3 rounded-full">
      Explore our products
    </button>
  </div>
</section>

{/* Cards section */}
<section className="py-8 lg:py-16 text-white relative w-full lg:w-[80%] mx-auto px-4 lg:ml-30 -mb-10">
  <div className="container mx-auto px-2 lg:px-6">
    {/* Services Grid */}
    <div className="-mt-8 lg:-mt-18 grid grid-cols-1 min-[768px]:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 min-[768px]:gap-8 xl:gap-[72px] justify-center">
      {services && services.map((service, index) => (
        <div
          key={index}
          className="bg-[#245CA7] h-auto min-h-[240px] min-[768px]:min-h-[280px] xl:h-[320px] text-lg min-[768px]:text-xl xl:text-[28px] font-nav_link_font w-full sm:w-[350px] xl:w-[400px] rounded-2xl min-[768px]:rounded-3xl xl:rounded-[32px] p-4 min-[768px]:p-6 text-center shadow-lg relative flex flex-col items-center justify-center mx-auto"
        >
          {/* Icon Container with Tick */}
          <div className="relative mb-4 mt-2">
            <Image 
              src={AbtIconContainer} 
              alt="Check Icon" 
              width={110} 
              height={110}
              className="w-20 h-20 min-[768px]:w-[90px] min-[768px]:h-[90px] xl:w-[110px] xl:h-[110px]"
            />
            {/* Tick Icon Overlay */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none" className="w-8 h-8 min-[768px]:w-[50px] min-[768px]:h-[50px] xl:w-[60px] xl:h-[60px]">
                <path d="M50 17.5L25 42.5L12.5 30" stroke="white" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-xl min-[768px]:text-xl xl:text-[24px] font-semibold text-white text-center">
            {service.title}
          </h3>

          {/* Service Description */}
          <p className="text-[#E7E7E7] text-center text-base min-[768px]:text-lg xl:text-[20px] mt-2">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

    <Footer/>    
    </>
  )
}

export default Store