import React from 'react';
import { Hero } from '../components/Hero';
import { ListingCard } from '../components/ListingCard';
import { Listing, ExamTag } from '../types';
import { SUGGESTED_QUERIES } from '../constants';
import { TrendingUp, BookOpen } from 'lucide-react';

interface HomeProps {
  listings: Listing[];
  onSearchClick: () => void;
  onSellClick: () => void;
  onChatClick: (listing: Listing) => void;
  onListingClick: (listing: Listing) => void;
}

export const Home: React.FC<HomeProps> = ({ listings, onSearchClick, onSellClick, onChatClick, onListingClick }) => {
  const recentListings = listings.slice(0, 4);

  return (
    <div>
      <Hero onSearchClick={onSearchClick} onSellClick={onSellClick} />
      
      {/* Categories / Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp size={20} className="mr-2 text-brand-orange"/> Trending Searches
        </h3>
        <div className="flex flex-wrap gap-4">
            {SUGGESTED_QUERIES.map((q, idx) => (
                <button key={idx} onClick={onSearchClick} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-brand-blue hover:text-brand-blue transition-colors">
                    {q}
                </button>
            ))}
        </div>
      </div>

      {/* Recent Listings */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Fresh Arrivals</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Books listed in your area within the last 24 hours.</p>
                </div>
                <button onClick={onSearchClick} className="hidden sm:inline-flex items-center font-semibold text-brand-blue hover:text-brand-darkBlue">
                    View All <BookOpen size={16} className="ml-1"/>
                </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentListings.map(l => (
                    <ListingCard 
                        key={l.id} 
                        listing={l} 
                        onChatClick={onChatClick}
                        onClick={onListingClick}
                    />
                ))}
            </div>
             <div className="mt-8 text-center sm:hidden">
                <button onClick={onSearchClick} className="inline-flex items-center font-semibold text-brand-blue hover:text-brand-darkBlue">
                    View All <BookOpen size={16} className="ml-1"/>
                </button>
            </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-brand-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Why use BookBridge?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <h3 className="font-bold text-lg mb-2">Local First</h3>
                    <p className="text-sm opacity-90">Find sellers in your college or colony. Save on shipping.</p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <h3 className="font-bold text-lg mb-2">Exam Focused</h3>
                    <p className="text-sm opacity-90">Dedicated filters for JEE, NEET, UPSC, and GATE.</p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <h3 className="font-bold text-lg mb-2">Verified Sellers</h3>
                    <p className="text-sm opacity-90">Student-to-student marketplace. Safe and transparent.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};