import Header from "@/components/ui/header";
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-white bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[2rem_2rem]"> 

      <Header />

      <div className="flex min-h-[80vh] flex-col items-center justify-center w-full mt-30">
        <div className="flex flex-col justify-center items-center px-20">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-5 italic">
            <span className="text-[#0077B3]">Log</span> hours.{' '}
            <span className="text-[#0077B3]">Track</span> time. <br />{' '}
            <span className="text-[#0077B3]">Ace</span> your internship.
          </h1>
          <p className="text-gray-500 text-md lg:text-lg mb-10 max-w-md text-center">
            Easily log your daily hours and monitor your overall progress in one place. Stay organized from day one and make every moment of your internship count.
          </p>
          
            <div className="flex flex-row gap-3">
              <Link href="/pages/login">
                <button className="bg-[#0077B3] hover:bg-white lg:text-md text-sm border border-black/50 cursor-pointer hover:text-black transition-colors px-10 py-2 rounded-md w-fit font-light text-white">
                  Get Started &rarr;
                </button>
              </Link>
              <button className="hover:bg-white border border-black/50 lg:text-md text-sm cursor-pointer hover:text-black transition-colors px-10 py-2 rounded-md w-fit font-light text-black">
                Contact Us
              </button>
            </div>
        </div>

        <div className="mt-20 mb-20 flex flex-col lg:flex-row lg:mb-0 items-center justify-center gap-6 relative">
          <div className="w-56 h-64">
            <img src="one.png" alt="One" className="w-full h-full object-cover" />
          </div>
          <div className="w-56 h-64">
            <img src="two.png" alt="Two" className="w-full h-full object-cover" />
          </div>
          <div className="w-56 h-64">
            <img src="three.png" alt="Three" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}