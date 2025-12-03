
import React from 'react';
import { MapPin, MessageCircle, Heart } from 'lucide-react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onChatClick: (listing: Listing) => void;
  onClick: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onChatClick, onClick }) => {
  const discount = listing.originalPrice > 0 
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : 0;

  return (
    <div 
        className="bg-white dark:bg-brand-cardDark rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700 cursor-pointer group"
        onClick={() => onClick(listing)}
    >
      <div className="relative h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <img
          src={listing.images && listing.images.length > 0 ? listing.images[0] : 'https://via.placeholder.com/400x600?text=No+Image'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-brand-green text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            {discount}% OFF
          </div>
        )}
        <button 
            className="absolute top-2 left-2 p-1.5 bg-white/80 dark:bg-black/50 rounded-full hover:text-red-500 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); /* Add wishlist logic later */ }}
        >
            <Heart size={16} className="text-gray-600 dark:text-gray-200"/>
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2 h-6">
            {(listing.tags || []).slice(0, 2).map(tag => (
                <span key={tag} className="inline-block bg-blue-50 dark:bg-blue-900/30 text-brand-blue text-[10px] px-2 py-0.5 rounded-full mr-1 font-medium">
                    {tag}
                </span>
            ))}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1 line-clamp-2 group-hover:text-brand-blue transition-colors">
          {listing.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{listing.author}</p>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{listing.location} {listing.distanceKm ? `(${listing.distanceKm} km)` : ''}</span>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">₹{listing.price}</span>
            {listing.originalPrice > 0 && (
              <span className="text-xs text-gray-400 line-through ml-2">₹{listing.originalPrice}</span>
            )}
          </div>
          <button
            onClick={(e) => {
                e.stopPropagation();
                onChatClick(listing);
            }}
            className="flex items-center bg-brand-orange hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <MessageCircle size={16} className="mr-1" />
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};
