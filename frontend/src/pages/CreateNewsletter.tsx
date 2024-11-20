import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { Customer } from "../types";
import imageCompression from "browser-image-compression";
//const API_URL = "http://localhost:3000";

const NewsletterPage: React.FC = () => {
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsletterText, setNewsletterText] = useState("");
  const [newsletterImage, setNewsletterImage] = useState<File | null>(null);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/customers");
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920 };
      const compressedFile = await imageCompression(file, options);
      setNewsletterImage(compressedFile); // åtkomst till setNewsletterImage
    }
  };

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedCustomers(
      selectAll ? [] : customerData.map((customer) => customer.id.toString())
    );
  };

  const handleSubmit = async () => {
    if (!newsletterText || !newsletterImage || selectedCustomers.length === 0) {
      alert("Please provide all fields and select at least one customer.");
      return;
    }

    const formData = new FormData();
    formData.append("text", newsletterText);
    formData.append("image", newsletterImage);
    formData.append("recipients", JSON.stringify(selectedCustomers));

    try {
      await axios.post("/api/newsletters", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Newsletter sent successfully!");
    } catch (error) {
      console.error("Error sending newsletter:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Newsletter</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium">Newsletter Text</label>
        <textarea
          value={newsletterText}
          onChange={(e) => setNewsletterText(e.target.value)}
          className="w-full border rounded p-2"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Upload Image</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <h2 className="text-xl font-semibold mb-2">Select Customers</h2>
      <label>
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
        Select All
      </label>

      {loading ? (
        <p>Loading customer data...</p>
      ) : (
        <div className="grid gap-4 mt-2">
          {customerData.map((customer) => (
            <div key={customer.id} className="border p-4 rounded shadow">
              <input
                type="checkbox"
                checked={selectedCustomers.includes(customer.id.toString())}
                onChange={() => handleSelectCustomer(customer.id.toString())}
              />
              <span className="ml-2">
                <strong>{customer.name}</strong> - {customer.email}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Send Newsletter
      </button>
    </div>
  );
};

export default NewsletterPage;
