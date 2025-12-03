
import React, { useState } from 'react';
import { User, ExamTag } from '../types';
import { authService } from '../services/authService';
import { Camera, MapPin, Phone, Tag, Home } from 'lucide-react';

interface ProfileSetupProps {
  user: User;
  onComplete: (updatedUser: User) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ user, onComplete }) => {
  const [formData, setFormData] = useState({
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || '',
    pincode: user.pincode || '',
    preferences: user.preferences || ExamTag.NONE
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      setError('Phone number must be 10 digits');
      return;
    }
    
    setLoading(true);
    try {
      const updated = await authService.updateProfile(formData);
      onComplete(updated);
    } catch (err: any) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "block w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200";
  const selectClass = "block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200 appearance-none";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white dark:bg-brand-cardDark shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Complete Your Profile</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Tell us a bit more about yourself to get started.</p>
        
        <div className="flex items-center space-x-6 mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-700 shadow-sm">
                {user.avatar ? <img src={user.avatar} alt="Avatar" className="h-full w-full object-cover"/> : <span className="text-2xl font-bold text-gray-400">{user.name[0]}</span>}
            </div>
            <div>
              <h3 className="font-bold text-lg dark:text-white">{user.name}</h3>
              <button className="text-sm text-brand-blue font-medium hover:text-brand-darkBlue flex items-center mt-1 transition-colors">
                  <Camera size={16} className="mr-1"/> Change Photo
              </button>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClass}>Mobile Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="9876543210"
                required
              />
            </div>
          </div>

          <div>
             <label className={labelClass}>Address (Flat/Street)</label>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Flat 402, Sunshine Apts"
                    required
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className={labelClass}>City</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Bangalore"
                        required
                    />
                </div>
            </div>
             <div>
                <label className={labelClass}>Pincode</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                     <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="560038"
                        required
                    />
                </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Preferred Exam/Category</label>
            <div className="relative">
                <select
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                className={selectClass}
                >
                {Object.values(ExamTag).map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-100 dark:border-red-900/30">{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-6 border border-transparent shadow-lg text-base font-bold rounded-xl text-white bg-brand-blue hover:bg-brand-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-50 transition-all hover:-translate-y-0.5"
            >
              {loading ? 'Saving Profile...' : 'Save & Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
