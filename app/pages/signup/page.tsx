
"use client";
import Link from 'next/link';
import {signIn} from "next-auth/react";
import Header from "@/components/ui/header";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Signup() {
    
  const [error, setError] = useState("");
  async function handleSubmit(e: any) {
    e.preventDefault();
    
    const form = new FormData(e.target);
    const password = form.get("password");
    const confirm = form.get("confirm");

    if (password !== confirm) {
        setError("Password do not match!");
        return;
    }

    setError("");

    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        password,
      }),
    });

    alert("Registered!");
  };



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      >
      <div className="min-h-screen bg-[#daecf3] flex items-center justify-center p-6">

      <Header />
        
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 h-[60vh]">

         <div className="p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
            <p className="text-gray-500">Please create an account.</p>
          </div>

          <form className="space-y-2 -mt-7">
            <div>
              <label className="block text-sm font-semibold mb-2">Name <span className="text-red-500">*</span></label>
              <input 
                name="name"
                type="name" 
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
            <div className="justify-center">
              <a className="text-sm ml-13">Already have an account?</a>
              <Link href="/pages/login">
                <button className="text-sm cursor-pointer ml-1 font-semibold hover:text-[#2d5671]">Login Here</button>
              </Link>
            </div>
          </form>
        </div>
        <div className="bg-[#2d5671] p-14 flex flex-col justify-center items-center text-white">
          <img
            src="/loginphoto.png"
            alt="Login Photo"
            className="w-80 h-80"
          />    
          <h2 className="text-xl font-semibold mb-2">Track your internship properly</h2>
          <p className="text-blue-100 text-center mb-8 text-sm">
            Manage your internships and stay organized with our all-in-one platform.
          </p>
        </div>
        </div>
      </div>
    </motion.div>
  );
}