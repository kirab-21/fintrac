"use client"

import { useState } from "react";

type SigninFormData = {
  email: string;
  password: string;
};

export default function SigninForm() {
  const [formData, setFormData] = useState<SigninFormData>({
    email: "",
    password: "",
  }); 
}