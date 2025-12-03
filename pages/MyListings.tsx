
import React, { useEffect, useState } from 'react';
import { listingService } from '../services/listingService';
import { Listing, User, ListingStatus } from '../types';
import { Trash2, CheckCircle, Edit, Eye } from 'lucide-react';

interface MyListingsProps {
  user: User;
}

export const MyListings: React.FC<MyListingsProps> = ({ user }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    setLoading(true);
    const data = await listingService.getMyListings(user.id);
    setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, [user.id]);

  const handleMarkSold = async (id: string) => {
    if (confirm('Mark this item as sold? It will be hidden from search results.')) {
        await listingService.updateListingStatus(id, ListingStatus.SOLD);
        fetchListings();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
        await listingService.deleteListing(id);
        fetchListings();
    }
  };

  if (loading) return <div className="p-20 text-center dark:text-white">Loading your listings...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Listings</h1>
      
      {listings.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-brand-cardDark rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't listed any books yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className={`bg-white dark:bg-brand-cardDark p-4 rounded-xl shadow-sm border ${listing.status === ListingStatus.SOLD ? 'border-gray-200 dark:border-gray-800 opacity-75' : 'border-gray-100 dark:border-gray-700'} flex flex-col sm:flex-row gap-4`}>
                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover"/>
                </div>
                
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{listing.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{listing.author}</p>
                            <p className="mt-1 font-semibold text-brand-blue">₹{listing.price}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                            listing.status === ListingStatus.AVAILABLE ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                            {listing.status}
                        </span>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                         <span className="mr-4">Views: 0</span> {/* Mock data */}
                         <span>Posted: {new Date(listing.postedAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="flex sm:flex-col gap-2 justify-center border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-gray-700 pt-4 sm:pt-0 sm:pl-4">
                     {listing.status === ListingStatus.AVAILABLE && (
                        <button 
                            onClick={() => handleMarkSold(listing.id)}
                            className="flex items-center justify-center px-3 py-2 bg-green-50 dark:bg-green-900/20 text-brand-green rounded hover:bg-green-100 transition-colors text-sm"
                        >
                            <CheckCircle size={16} className="mr-1"/> Mark Sold
                        </button>
                     )}
                     <button className="flex items-center justify-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-brand-blue rounded hover:bg-blue-100 transition-colors text-sm">
                        <Edit size={16} className="mr-1"/> Edit
                     </button>
                     <button 
                        onClick={() => handleDelete(listing.id)}
                        className="flex items-center justify-center px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded hover:bg-red-100 transition-colors text-sm"
                     >
                        <Trash2 size={16} className="mr-1"/> Delete
                     </button>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
