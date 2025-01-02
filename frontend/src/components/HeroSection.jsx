import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
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
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='hero-section text-center top-10'>
            <div className='hero-background'></div> 
            <div className='flex flex-col gap-5 my-10 relative z-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    Your Ultimate Opportunity Portal
                </span>
                <h1 className='text-5xl font-bold'>
                    Discover, Explore & <br /> Achieve Your <span className='text-[#6A38C2]'>Career Goals</span>
                </h1>
                <p>Find the perfect role to unlock your potential. Start your journey with us today and explore endless possibilities!</p>
                <div className='search-bar flex w-[50%] shadow-md border border-gray-300 pl-4 rounded-full items-center mx-auto'>
                    <input
                        type="text"
                        placeholder='Search for opportunities'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-3 px-4 rounded-l-full text-gray-600'
                    />
                    <Button onClick={searchHandler} className="rounded-r-full bg-[#6A38C2] text-white hover:bg-[#5A2F99] px-5">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
                <CategoryCarousel />
            </div>
        </div>
    );
}

export default HeroSection;
