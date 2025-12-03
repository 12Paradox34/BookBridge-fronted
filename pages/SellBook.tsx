
import React from 'react';
import { ListingForm } from '../components/ListingForm';
import { User } from '../types';
import { listingService } from '../services/listingService';

interface SellBookProps {
  user: User;
  onSuccess: () => void;
}

export const SellBook: React.FC<SellBookProps> = ({ user, onSuccess }) => {
  const handleSubmit = async (data: any) => {
    console.log(data);
    try {
      await listingService.createListing(data, user);
      onSuccess();
    } catch (error) {
      console.error('Failed to create listing', error);
      alert('Failed to publish listing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-bgDark py-10 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Sell Your Book</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Fill in the details below to list your book on BookBridge.</p>
        </div>
        <ListingForm user={user} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
