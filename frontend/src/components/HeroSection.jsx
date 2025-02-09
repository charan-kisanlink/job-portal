import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, Briefcase, TrendingUp, Star, MapPin } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import CategoryCarousel from './CategoryCarousel';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchHandler = () => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }
    }

    return (
        <div className='hero-section min-h-[85vh] w-full flex items-center justify-center bg-gradient-to-b from-purple-50 to-white'>
            <div className='hero-background absolute inset-0 opacity-40'></div>
            
            <div className='relative z-10 w-full py-12 md:py-16'>
                <div className='max-w-[1200px] mx-auto px-4 md:px-8'>
                    <div className='flex flex-col items-center justify-center gap-6 md:gap-8'>
                        {/* Badge - Enhanced with better animation and contrast */}
                        <div className='inline-flex items-center gap-2 px-5 py-2 rounded-full 
                            bg-white shadow-lg backdrop-blur-md border border-purple-100
                            text-[#F83002] text-sm font-medium animate-pulse'>
                            <Star className='h-4 w-4 text-yellow-500' />
                            Your Ultimate Opportunity Portal
                        </div>

                        {/* Heading - Improved typography and spacing */}
                        <div className='text-center space-y-4 max-w-2xl'>
                            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 
                                leading-tight tracking-tight'>
                                Discover Your Next <span className="text-[#6A38C2]">Career Move</span>
                            </h1>
                            <p className='text-base md:text-lg text-gray-600 max-w-xl mx-auto'>
                                Find the perfect role to match your experience and goals
                            </p>
                        </div>

                        {/* Enhanced Search Bar - Improved visual feedback and accessibility */}
                        <div className='w-full max-w-2xl mx-auto pt-4'>
                            <div className='relative flex flex-col sm:flex-row gap-3 p-2.5 
                                bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg
                                border border-purple-100 hover:border-purple-200 transition-all duration-300'>
                                
                                {/* Search Input - Enhanced focus states and visual feedback */}
                                <div className='flex-grow relative group'>
                                    <div className='absolute left-4 top-1/2 -translate-y-1/2 
                                        text-gray-400 group-focus-within:text-[#6A38C2] 
                                        transition-colors duration-200'>
                                        <Search className='h-5 w-5' />
                                    </div>
                                    <input
                                        type="text"
                                        value={query}
                                        placeholder='Search jobs, companies, or keywords...'
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && searchHandler()}
                                        className='w-full pl-12 pr-4 py-3.5 rounded-xl
                                            bg-gray-50/50 border border-gray-200
                                            focus:bg-white focus:border-[#6A38C2] focus:ring-2
                                            focus:ring-purple-100 outline-none
                                            text-base text-gray-700 placeholder:text-gray-400
                                            transition-all duration-200'
                                    />
                                </div>

                                {/* Search Button - Enhanced visual feedback and accessibility */}
                                <Button 
                                    onClick={searchHandler}
                                    disabled={!query.trim()} 
                                    className={`shrink-0 px-6 py-3.5 rounded-xl text-base font-medium
                                        transition-all duration-300 transform
                                        hover:scale-[1.02] active:scale-[0.98]
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        ${query.trim() 
                                            ? 'bg-[#6A38C2] hover:bg-[#5A2F99] text-white shadow-md hover:shadow-lg' 
                                            : 'bg-gray-100 text-gray-400'}`}
                                >
                                    <Search className="h-5 w-5 sm:mr-2" />
                                    <span className="hidden sm:inline">Search</span>
                                </Button>
                            </div>

                            {/* Popular Searches - Uncomment and update styling */}
                            <div className='mt-4 flex flex-wrap justify-center gap-2 text-sm'>
                                <span className='text-gray-500'>Popular:</span>
                                {['Remote', 'Full-time', 'Engineering', 'Design'].map((term, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setQuery(term);
                                            searchHandler();
                                        }}
                                        className='px-4 py-1.5 rounded-full bg-white/90 
                                            hover:bg-white border border-purple-100
                                            text-gray-600 hover:text-[#6A38C2] hover:border-[#6A38C2]
                                            transition-all duration-200 shadow-sm hover:shadow-md'
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Carousel */}
                        <div className='w-full max-w-4xl mx-auto animate-fade-in-up animation-delay-300 py-8'>
                            <CategoryCarousel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
