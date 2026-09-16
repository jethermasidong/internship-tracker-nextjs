
"use client";
import Link from 'next/link';
import {signIn} from "next-auth/react";
import Header from "@/components/ui/header";
import { motion } from "framer-motion";

export default function LoginPage() {
  async function handleLogin(e: any) {
    e.preventDefault();

    const form = new FormData(e.target);

    await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: true,
      callbackUrl: "/dashboard",
    });
  }

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

         <div className="p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-16 h-6 mb-5"
            />  
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back!</h1>
            <p className="text-gray-500">Please enter log in details below</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address<span className="text-red-500">*</span></label>
              <input 
                name="email"
                type="email" 
                className="w-full p-2 rounded-xl border border-gray-200 focus:border-[#2d5671] outline-none" 
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Password<span className="text-red-500">*</span></label>
              <input 
                name="password"
                type="password" 
                className="w-full p-2 rounded-xl border border-gray-200 focus:border-[#2d5671] outline-none" 
                placeholder="••••••••"
                required
              />
            </div>
            
            <button type="submit" className="w-full bg-[#2d5671] text-white py-2 rounded-xl font-bold hover:bg-[white] hover:text-black border border-black transition-all">
              Sign In
            </button>
            <div className="justify-center">
              <a className="text-sm ml-13">Not registered yet?</a>
              <Link href="/pages/signup">
                <button className="text-sm cursor-pointer ml-1 font-semibold hover:text-[#2d5671]">Create an account</button>
              </Link>
            </div>
          </form>
        </div>
        </div>
      </div>
  </motion.div>
  );
}