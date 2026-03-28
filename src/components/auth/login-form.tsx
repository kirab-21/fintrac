"use client"

import { useState } from "react";

type LogInFormData = {
  email: string;
  password: string;
};

export default function LogInForm() {
  const [formData, setFormData] = useState<LogInFormData>({
    email: "",
    password: "",
  });
  
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    setError("");
    setSuccess("");
    
    if (!formData.email || !formData.password) {
      setError("Fill all Fields.");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login Failed.");
        return;
      }
      
      setSuccess("Login Successful");
      setFormData({
        email: "",
        password: "",
      });
    } catch {
      setError("Something went wrong.Try Again.");
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email"
          className="w-full rounded-lg border px-3 py-2 outline-none foucs:ring-2 focus:ring-black"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      {error ? <p className="text-sm text-red-600"> {error}</p> : null}
      {success ? <p className="text-sm text-green-600">{success}</p> : null}
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-black px-4 py-2 text-white disable:opacity-50"
      >
        {isLoading ? "Logging in.." : "Log in"}
      </button>
    </form>
  );
}