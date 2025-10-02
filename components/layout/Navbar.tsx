'use client';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/50" />
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            REAL
          </span>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 text-gray-300 hover:text-white transition-colors drop-shadow-lg">
            Sound <span className="text-cyan-400">○</span>
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-cyan-500/50">
            Book a Demo
          </button>
        </div>
      </div>
    </nav>
  );
}

