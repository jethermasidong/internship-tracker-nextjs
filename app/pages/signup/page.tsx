
"use client";
import {signIn} from "next-auth/react";
import Header from "@/components/ui/header";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Signup() {
    
  const [error, setError] = useState("");
  async function handleSubmit(e: any) {
    e.preventDefault();
  
    const form = new FormData(e.target);
    const full_name = form.get("full_name");
    const email = form.get("email");
    const password = form.get("password");
    const confirm = form.get("confirm");

    if (password !== confirm) {
        setError("Password do not match!");
        return;
    }

    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          full_name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      alert("Account created successfully! Please log in.");
      window.location.href = "/pages/login";

    } catch (err) {
      setError("Failed to connect to server.");
    }

  };



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      >
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Header />
        <div className="w-fit items-center justify-center h-[80vh]">

          <div className="p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-2">Create an Account</h1>
              <p className="text-gray-500 text-center">Please create an account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="block text-sm font-semibold mb-2">Name <span className="text-red-500">*</span></label>
                <input 
                  name="full_name"
                  type="text" 
                  className="w-full p-2 rounded-xl border border-gray-200 focus:border-[#2d5671] outline-none" 
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address <span className="text-red-500">*</span></label>
                <input 
                  name="email"
                  type="email" 
                  className="w-full p-2 rounded-xl border border-gray-200 focus:border-[#2d5671] outline-none" 
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Password <span className="text-red-500">*</span></label>
                <input 
                  name="password"
                  type="password" 
                  className="w-full p-2 rounded-xl border border-gray-200 mb-2 focus:border-[#2d5671] outline-none" 
                  placeholder="••••••••"
                  required
                />
                <label className="block text-sm font-semibold mb-2">Confirm Password <span className="text-red-500">*</span></label>
                <input 
                  name="confirm"
                  type="password" 
                  className="w-full p-2 rounded-xl border border-gray-200 focus:border-[#2d5671] outline-none mb-5" 
                  placeholder="Confirm Password"
                  required
                />
                {error && <p className='text-red-400'>{error}</p>}
              </div>
              
              <button type="submit" className="w-full bg-[#2d5671] text-white py-2 rounded-xl font-normal hover:bg-[white] hover:text-black border border-black transition-all">
                Create Account
              </button>
            </form>
            <p className="text-center my-5">or</p>
            <button 
              type="submit" 
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full text-black py-2 rounded-xl font-bold hover:bg-black hover:text-white border border-black transition-all flex flex-row items-center justify-center gap-2">
              <img
                src="/google.png"
                alt="Logo"
                className="w-4 h-4"
              />  
              <p className="font-medium">Continue with Google</p>
            </button>

          </div>
        </div>
      </div>
    </motion.div>
  );
}