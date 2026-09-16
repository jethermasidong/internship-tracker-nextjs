
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

          <form className="space-y-6 w-full max-w-150 mx-auto">
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
            <div className="items-center text-center">
              <a className="text-sm text-center">Not registered yet?</a>
              <Link href="/pages/signup">
                <button className="text-sm cursor-pointer ml-1 font-semibold hover:text-[#2d5671]">Create an account</button>
              </Link>
            </div>
            <p className="text-center">or</p>

            <button 
              type="submit" 
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full text-black py-2 rounded-xl font-bold hover:bg-black hover:text-white border border-black transition-all">
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  </motion.div>
  );
}