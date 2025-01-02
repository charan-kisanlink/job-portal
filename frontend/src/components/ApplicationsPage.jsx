import React from 'react';
import AppliedJobTable from './AppliedJobTable';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const ApplicationsPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-5 mt-28">
                <h1 className="text-2xl font-bold mb-4">Your Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <Footer />
        </div>
    );
};

export default ApplicationsPage;
