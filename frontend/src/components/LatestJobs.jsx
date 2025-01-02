import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            <div className="w-full pt-10">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 mt-20">
                {
                    allJobs.length <= 0
                        ? <span className="text-center text-gray-500 text-lg">No Job Available</span>
                        : allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    );
};

export default LatestJobs;
