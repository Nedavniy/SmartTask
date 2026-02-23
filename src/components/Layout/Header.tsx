import { useState } from "react";
import { Bars3Icon, XMarkIcon, BellIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-linear-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">ST</span>
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">SmartTask</h1>
            <p className="text-gray-400 text-xs">Task Management</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
            Dashboard
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
            Projects
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
            Teams
          </a>
        </nav>

        <div className="flex items-center space-x-6">
          <button className="relative text-gray-400 hover:text-white transition-colors hidden sm:block">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
          </button>

          <button className="relative text-gray-400 hover:text-white transition-colors group">
            <Cog6ToothIcon className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
          </button>

          <div className="hidden sm:flex items-center space-x-3 pl-6 border-l border-gray-700">
            <div className="text-right hidden md:block">
              <p className="text-white text-sm font-medium">John Doe</p>
              <p className="text-gray-400 text-xs">Premium</p>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <UserCircleIcon className="w-8 h-8" />
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden mt-4 pt-4 border-t border-gray-700 space-y-3">
          <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">
            Dashboard
          </a>
          <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">
            Projects
          </a>
          <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">
            Teams
          </a>
          <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">
            Settings
          </a>
        </nav>
      )}
    </header>
  );
}

export default Header;