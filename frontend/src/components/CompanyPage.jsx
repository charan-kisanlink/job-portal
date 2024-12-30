import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyPage = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("/api/companies", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust token retrieval as needed
                    },
                });
                if (response.data.success) {
                    setCompanies(response.data.companies);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError("Failed to fetch companies. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Companies</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {companies.map((company) => (
                    <div
                        key={company._id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "16px",
                            width: "200px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>
                            {company.name}
                        </h2>
                        <p style={{ color: "#555" }}>{company.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyPage;
