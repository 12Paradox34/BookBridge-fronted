
import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { ExamTag } from '../types';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTag: ExamTag | 'All';
  setSelectedTag: (tag: ExamTag | 'All') => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, selectedTag, setSelectedTag }) => {
  const inputClass = "block w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200";
  const selectClass = "block w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200 appearance-none cursor-pointer";

  return (
    <div className="bg-white dark:bg-brand-cardDark p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Main Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className={inputClass}
            placeholder="Search by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Location (Mock) */}
        <div className="relative md:w-1/4">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select className={selectClass}>
            <option>Bangalore (5km)</option>
            <option>Delhi NCR</option>
            <option>Kota</option>
            <option>Mumbai</option>
            <option>Hyderabad</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-2 flex items-center">
          <Filter size={12} className="mr-1"/> Filters:
        </span>
        <button
          onClick={() => setSelectedTag('All')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedTag === 'All'
              ? 'bg-brand-blue text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700'
          }`}
        >
          All
        </button>
        {Object.values(ExamTag).map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedTag === tag
                ? 'bg-brand-blue text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
