
import React, { useState } from 'react';
import { Menu, X, Sun, Moon, BookOpen, User as UserIcon, LogOut } from 'lucide-react';
import { APP_NAME } from '../constants';
import { User } from '../types';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: string;
  setPage: (page: string) => void;
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, currentPage, setPage, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Browse', id: 'browse' },
    { name: 'Sell Book', id: 'sell' },
    { name: 'Chats', id: 'chats' },
  ];

  const handleNavClick = (pageId: string) => {
    setPage(pageId);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-brand-cardDark shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <BookOpen className="h-8 w-8 text-brand-blue" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">{APP_NAME}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`${
                  currentPage === link.id ? 'text-brand-blue font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-brand-blue'
                } px-4 py-2 rounded-full transition-colors`}
              >
                {link.name}
              </button>
            ))}
            
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user ? (
               <div className="relative ml-2 flex items-center space-x-4">
                  <button 
                    onClick={() => handleNavClick('my-listings')}
                    className={`text-sm font-medium ${currentPage === 'my-listings' ? 'text-brand-blue' : 'text-gray-700 dark:text-gray-300 hover:text-brand-blue'}`}
                  >
                    My Listings
                  </button>
                  <button 
                    onClick={() => handleNavClick('profile')}
                    className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-blue"
                  >
                    <img src={user.avatar} alt="" className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-600 mr-2 object-cover"/>
                    <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
                  </button>
               </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
             <button onClick={toggleDarkMode} className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-brand-cardDark border-t dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === link.id
                    ? 'text-brand-blue bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-brand-blue hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {link.name}
              </button>
            ))}
            {user ? (
               <>
                <button
                  onClick={() => handleNavClick('my-listings')}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-blue hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  My Listings
                </button>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-blue hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  My Profile
                </button>
                <button
                  onClick={() => { onLogout(); setIsOpen(false); }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Logout
                </button>
               </>
            ) : (
               <button
                  onClick={() => handleNavClick('login')}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-brand-blue hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Login
                </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
