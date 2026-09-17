
"use client";
import Link from 'next/link';
import {signIn} from "next-auth/react";
import Header from "@/components/ui/header";
import { motion } from "framer-motion";
import { useState } from 'react';

export default function LoginPage() {

  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password!");
    } else {
      window.location.href = "/dashboard";
    }
 
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
      <div className="min-h-screen bg-white flex items-center justify-center p-6">

      <Header />
        
      <div className="bg-white w-fit rounded-3xl overflow-hidden flex flex-row items-center justify-center h-[60vh]">
         <div className="p-12 lg:p-16 flex flex-col justify-center items-center">
          <img
              src="/logo.png"
              alt="Logo"
              className="w-35 h-5 mb-5"
            />  
          <h1 className="text-4xl font-extrabold mb-2">Welcome back</h1>
          <div className="items-center text-center mb-8">
            <a className="text-sm text-center">Not registered yet?</a>
            <Link href="/pages/signup">
              <button className="text-sm cursor-pointer ml-1 font-semibold hover:text-[#2d5671]">Create an account</button>
            </Link>
          </div>

          <form 
            onSubmit={handleLogin}
            className="space-y-6 w-full max-w-150 mx-auto">
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address<span className="text-red-500">*</span></label>
              <input 
                name="email"
                type="email" 
                className="w-full p-2 pr-40 rounded-xl border border-gray-200 focus:border-[#2d5671] outline-none" 
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