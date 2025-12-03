import React from 'react';
import { Search, Book } from 'lucide-react';

interface HeroProps {
  onSearchClick: () => void;
  onSellClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchClick, onSellClick }) => {
  return (
    <div className="relative bg-white dark:bg-brand-bgDark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-brand-bgDark sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-brand-bgDark transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Pass on your Knowledge.</span>{' '}
                <span className="block text-brand-blue xl:inline">Recover your Cost.</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                India's smartest marketplace for students. Buy and sell used exam prep books, notes, and novels within your city. 
                JEE, NEET, UPSC, or Fiction - find it nearby.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={onSearchClick}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-blue hover:bg-brand-darkBlue md:py-4 md:text-lg transition"
                  >
                    <Search className="mr-2" size={20}/>
                    Find Books Nearby
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={onSellClick}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-blue bg-brand-bgLight hover:bg-gray-200 dark:bg-gray-800 dark:text-brand-blue dark:hover:bg-gray-700 md:py-4 md:text-lg transition"
                  >
                    <Book className="mr-2" size={20}/>
                    Sell Old Books
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
          src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Students studying with books"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-brand-bgDark to-transparent lg:via-white/20"></div>
      </div>
    </div>
  );
};