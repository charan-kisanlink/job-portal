import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar"; 
import Footer from "./shared/Footer";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(COMPANY_API_END_POINT+"/getAll", {
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setCompanies(data.companies);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="p-6 mt-28 flex-grow">
        <h1
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          style={{
            backgroundImage: "linear-gradient(to right, #4b6cb7, #182848)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "3em",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          Connecting Dreams to Opportunities
        </h1>
        {companies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-24 h-24 object-cover rounded-full mb-4 border border-gray-300 mx-auto"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-gray-600">No Logo</span>
                  </div>
                )}
                <h2 className="text-xl font-semibold text-gray-700 text-left">{company.name}</h2>

                <div className="mt-4 space-y-3 text-gray-600 text-sm text-left">
                  <p>
                    <strong className="block">Description:</strong>{" "}
                    <span className="break-words">{company.description || "No description available"}</span>
                  </p>
                  <p>
                    <strong className="block">Website:</strong>{" "}
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {company.website}
                      </a>
                    ) : (
                      "No website available"
                    )}
                  </p>
                  <p>
                    <strong className="block">Location:</strong> {company.location || "No location available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No companies available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CompanyPage;
