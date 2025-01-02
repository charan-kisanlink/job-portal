import React from 'react';
import ApplicantsTable from './ApplicantsTable';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const ApplicantsPage = () => {
    return (
        <div className="applicants-page">
            <Navbar />
            <main className="p-4">
                <ApplicantsTable />
            </main>
        </div>
    );
};

export default ApplicantsPage;
