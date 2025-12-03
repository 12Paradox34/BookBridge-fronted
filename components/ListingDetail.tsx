import React from 'react';
import { ArrowLeft, MapPin, MessageCircle, Share2, ShieldCheck, Heart } from 'lucide-react';
import { Listing } from '../types';

interface ListingDetailProps {
  listing: Listing;
  onBack: () => void;
  onChatClick: (listing: Listing) => void;
}

export const ListingDetail: React.FC<ListingDetailProps> = ({ listing, onBack, onChatClick }) => {
  const discount = Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-brand-blue mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-1" /> Back to Browse
      </button>

      <div className="bg-white dark:bg-brand-cardDark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image Section */}
          <div className="relative bg-gray-100 dark:bg-gray-800 h-96 md:h-[600px] flex items-center justify-center p-8">
            <img 
              src={listing.images[0]} 
              alt={listing.title} 
              className="max-h-full max-w-full object-contain shadow-2xl rounded-md"
            />
            <button className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-black/50 rounded-full hover:text-red-500 transition-colors shadow-sm">
                <Heart size={24} className="text-gray-600 dark:text-gray-200"/>
            </button>
          </div>

          {/* Details Section */}
          <div className="p-8 flex flex-col">
             <div className="flex flex-wrap gap-2 mb-4">
                {listing.tags.map(tag => (
                    <span key={tag} className="bg-blue-50 dark:bg-blue-900/30 text-brand-blue text-sm px-3 py-1 rounded-full font-medium">
                        {tag}
                    </span>
                ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
              {listing.title}
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">by {listing.author}</p>

            <div className="flex items-end mb-8">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">₹{listing.price}</span>
              <span className="text-lg text-gray-400 line-through ml-3 mb-1">₹{listing.originalPrice}</span>
              <span className="ml-3 mb-2 text-brand-green font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded text-sm">
                {discount}% OFF
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-8">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {listing.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-xs text-gray-500 block">Condition</span>
                        <span className="font-medium dark:text-white">{listing.condition}</span>
                    </div>
                     <div>
                        <span className="text-xs text-gray-500 block">Posted</span>
                        <span className="font-medium dark:text-white">{new Date(listing.postedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <img src={listing.seller.avatar} alt={listing.seller.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm mr-3"/>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Sold by</p>
                            <p className="font-bold text-gray-900 dark:text-white">{listing.seller.name}</p>
                        </div>
                    </div>
                     <div className="text-right">
                        <p className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                            <MapPin size={16} className="mr-1"/> {listing.location}
                        </p>
                        <p className="text-xs text-gray-500">
                             {listing.distanceKm ? `${listing.distanceKm} km away` : 'Nearby'}
                        </p>
                     </div>
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={() => onChatClick(listing)}
                        className="flex-1 bg-brand-orange hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
                    >
                        <MessageCircle className="mr-2" /> Chat with Seller
                    </button>
                    <button className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Share2 className="text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
                 <div className="mt-4 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                    <ShieldCheck size={14} className="mr-1 text-brand-green"/> 
                    BookBridge Protection: Verified Student Seller
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};