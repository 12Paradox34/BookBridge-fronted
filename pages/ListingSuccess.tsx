
import React from 'react';
import { CheckCircle, ArrowRight, Plus } from 'lucide-react';

interface ListingSuccessProps {
  onGoHome: () => void;
  onSellAnother: () => void;
  onViewListings: () => void;
}

export const ListingSuccess: React.FC<ListingSuccessProps> = ({ onGoHome, onSellAnother, onViewListings }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-12 h-12 text-brand-green" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Listing Published!</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-10">
        Your book is now live on BookBridge. Students nearby can see it and contact you directly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button 
          onClick={onViewListings}
          className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-blue hover:bg-brand-darkBlue shadow-sm transition-colors"
        >
          Manage Listings <ArrowRight size={18} className="ml-2" />
        </button>
        
        <button 
          onClick={onSellAnother}
          className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-white bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} className="mr-2" /> Sell Another
        </button>
      </div>

      <button 
        onClick={onGoHome}
        className="mt-8 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white underline"
      >
        Go back to Home
      </button>
    </div>
  );
};
