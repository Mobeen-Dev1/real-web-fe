'use client';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          REAL
        </div>

        {/* CTA Button */}
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-indigo-500/50">
          Book a Demo
        </button>
      </div>
    </nav>
  );
}

