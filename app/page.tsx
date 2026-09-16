import Header from "@/components/ui/header";
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex bg-[#daecf3]"> 

      <Header />

      <div className="w-1/2 min-h-[65vh] mt-28 mb-10 ml-10 flex flex-col justify-center px-20 bg-white/50 rounded-tr-[30vw] rounded-br-[80px] shadow-sm z-10">
        
        <span className="flex items-center gap-2 border mt-2 mb-5 sm:mt-0 rounded-full py-2 px-5 w-fit mx-auto sm:mx-0 font-semibold text-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#89bfd7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30688a]"></span>
          </span>
          Students
        </span>

        <h1 className="text-6xl font-bold text-gray-900 leading-tight">
          Track your internships
        </h1>
        <h1 className="text-6xl font-bold mb-6 text-gray-900 leading-tight">
          Manage progress, and stay organized.
        </h1>
        
        <p className="text-gray-500 text-xl mb-10 max-w-md">
          Online Internship Tracker that will help you stay on top of your applications.
        </p>
        <Link href="/pages/login">
          <button className="bg-[#2d5671] hover:bg-white border border-black cursor-pointer hover:text-black transition-colors px-10 py-3 rounded-xl w-fit font-semibold text-white">
            Get Started
          </button>
        </Link>
      </div>

      <div className="w-1/2 flex items-center justify-center relative">
        <img
          src="/illustration.svg"
          alt="Welcome"
          className="w-3/4 relative z-20"
        />
      </div>

    </div>
  );
}