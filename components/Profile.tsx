
import React from 'react';
import { User } from '../types';
import { MapPin, Phone, Mail, Book, LogOut, Edit } from 'lucide-react';

interface ProfileProps {
  user: User;
  onEdit: () => void;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onEdit, onLogout }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-brand-cardDark shadow overflow-hidden sm:rounded-lg border border-gray-100 dark:border-gray-700">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">User Profile</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and preferences.</p>
          </div>
          <button onClick={onEdit} className="flex items-center text-sm font-medium text-brand-blue hover:text-brand-darkBlue">
            <Edit size={16} className="mr-1"/> Edit
          </button>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <dl>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                 Profile Photo
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                 <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full object-cover border-2 border-brand-blue"/>
              </dd>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{user.name}</dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <Mail size={16} className="mr-2"/> Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{user.email}</dd>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <Phone size={16} className="mr-2"/> Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{user.phone || 'Not set'}</dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                 <MapPin size={16} className="mr-2"/> Location
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                {user.address ? `${user.address}, ${user.city} - ${user.pincode}` : 'Not set'}
              </dd>
            </div>
             <div className="bg-gray-50 dark:bg-gray-800/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                 <Book size={16} className="mr-2"/> Preferred Exam
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{user.preferences || 'General'}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <button 
            onClick={onLogout}
            className="flex items-center px-6 py-3 border border-red-300 text-red-600 bg-white dark:bg-transparent dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
        >
            <LogOut size={20} className="mr-2"/> Log Out
        </button>
      </div>
    </div>
  );
};
