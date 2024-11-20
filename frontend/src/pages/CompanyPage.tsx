import React, { useState, useEffect } from "react";
import axios from "axios";
import { Company } from "../types";

const CompanyPage: React.FC = () => {
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(":3000/api/companies");
        setCompanyData(response.data);
      } catch (error) {
        console.error("Error fetching companies data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Company List</h1>
      {loading ? (
        <p>Loading company data...</p>
      ) : (
        <div className="grid gap-4">
          {companyData.length > 0 ? (
            companyData.map((company) => (
              <div key={company.id} className="border p-4 rounded shadow">
                <p>
                  <strong>Name:</strong> {company.name}
                </p>
                <p>
                  <strong>Email:</strong> {company.email}
                </p>
                <p>
                  <strong>password:</strong> {company.password}
                </p>
              </div>
            ))
          ) : (
            <p>No companys available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
