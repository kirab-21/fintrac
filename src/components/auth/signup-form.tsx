"use client";

import { useState } from "react";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      setSuccess("Account created successfully.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

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
          placeholder="Enter your email"
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
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

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : null}

      {success ? (
        <p className="text-sm text-green-600">{success}</p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isLoading ? "Creating account..." : "Sign up"}
      </button>
    </form>
  );
}