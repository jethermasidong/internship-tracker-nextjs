import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
      
      <nav className="w-full max-w-5xl flex items-center justify-between px-6 py-4
                      bg-white/75 backdrop-blur-md border border-white/20 
                      rounded-3xl shadow-lg shadow-gray-200/50">
        
        <div className="flex items-center gap-2">
            <img
                src="/logo.png"
                alt="Logo"
                className="w-16 h-5"
                />
        </div>

        <div className="flex items-center gap-4">
        <Link href="/pages/login">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Log in
          </button>
        </Link>
        <Link href="/pages/signup">
          <button className="bg-[#2d5671] text-white px-5 py-2 rounded-xl text-sm font-semibold 
                             hover:bg-[#30688a] transition-all shadow-md active:scale-95">
            Get Started
          </button>
        </Link>
        </div>
        
      </nav>
    </header>
  );
}   