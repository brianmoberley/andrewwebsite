"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function EstimateForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    projectDescription: "",
    budgetRange: "",
    desiredTimeline: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    preferredContact: "email",
    emailConsent: true,
    smsConsent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
            },
            leadSource: "website_form",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit");

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        projectType: "",
        projectDescription: "",
        budgetRange: "",
        desiredTimeline: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        preferredContact: "email",
        emailConsent: true,
        smsConsent: false,
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
          <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-green-900">Success!</h3>
            <p className="text-green-700">
              We've received your request. Check your email for confirmation.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
          <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold mb-2">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">ZIP Code *</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Project Type *</label>
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select a project type</option>
          <option value="Kitchen Remodel">Kitchen Remodel</option>
          <option value="Bathroom Remodel">Bathroom Remodel</option>
          <option value="Roofing">Roofing</option>
          <option value="Addition">Home Addition</option>
          <option value="Deck">Deck/Patio</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">
          Project Description
        </label>
        <textarea
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold mb-2">Budget Range</label>
          <select
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select budget</option>
            <option value="0-5000">$0 - $5,000</option>
            <option value="5000-10000">$5,000 - $10,000</option>
            <option value="10000-25000">$10,000 - $25,000</option>
            <option value="25000-50000">$25,000 - $50,000</option>
            <option value="50000+">$50,000+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Timeline</label>
          <select
            name="desiredTimeline"
            value={formData.desiredTimeline}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select timeline</option>
            <option value="ASAP">ASAP</option>
            <option value="1-2 months">1-2 months</option>
            <option value="2-3 months">2-3 months</option>
            <option value="3+ months">3+ months</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">
          Preferred Contact Method
        </label>
        <select
          name="preferredContact"
          value={formData.preferredContact}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="sms">Text Message</option>
        </select>
      </div>

      <div className="mb-6 space-y-3">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="emailConsent"
            checked={formData.emailConsent}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm">I consent to receive emails</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="smsConsent"
            checked={formData.smsConsent}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm">
            I consent to receive text messages (standard rates apply)
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Request Free Estimate"}
      </button>
    </form>
  );
}
