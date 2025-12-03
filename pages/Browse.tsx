
import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { ListingCard } from '../components/ListingCard';
import { Listing, ExamTag, ListingCategory, User } from '../types';
import { listingService } from '../services/listingService';
import { Filter, X, ChevronDown } from 'lucide-react';
import { authService } from '../services/authService';

interface BrowseProps {
  listings: Listing[]; // Fallback initial data
  onChatClick: (listing: Listing) => void;
  onListingClick: (listing: Listing) => void;
}

export const Browse: React.FC<BrowseProps> = ({ listings: initialListings, onChatClick, onListingClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<ExamTag | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'All'>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'nearest'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [allListings, setAllListings] = useState<Listing[]>(initialListings);
  const currentUser = authService.getCurrentUser();

  // Load latest listings on mount
  useEffect(() => {
    const loadData = async () => {
        const data = await listingService.getAllListings();
        setAllListings(data);
    };
    loadData();
  }, []);

  const calculateDistance = (l: Listing) => {
    if (!currentUser?.pincode || !l.pincode) return 9999;
    // Simple Heuristic: Difference in pincode * roughly 0.5km per unit (very rough approx for India)
    // In production, use PostGIS or Google Maps Distance Matrix
    const diff = Math.abs(parseInt(currentUser.pincode) - parseInt(l.pincode));
    return parseFloat((diff * 0.5).toFixed(1));
  };

  const filteredListings = allListings
    .map(l => ({...l, distanceKm: calculateDistance(l)})) // Enrich with distance
    .filter((l) => {
        const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              l.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag === 'All' || l.tags.includes(selectedTag);
        const matchesCategory = selectedCategory === 'All' || l.category === selectedCategory;
        const matchesPrice = l.price >= priceRange[0] && l.price <= priceRange[1];
        return matchesSearch && matchesTag && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'nearest') return (a.distanceKm || 9999) - (b.distanceKm || 9999);
        // Default Newest
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });

  // Standard input style matching other forms
  const selectClass = "block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200 appearance-none cursor-pointer";

  // Reusable Radio Option Component
  const RadioOption = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <label className="flex items-center cursor-pointer group py-2">
      <div className="relative flex items-center justify-center">
        <input 
          type="radio" 
          checked={checked} 
          onChange={onChange} 
          className="peer appearance-none h-5 w-5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 checked:bg-brand-blue checked:border-brand-blue focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all cursor-pointer"
        />
        <div className="absolute h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
      </div>
      <span className={`ml-3 text-sm font-medium transition-colors ${checked ? 'text-brand-blue' : 'text-gray-600 dark:text-gray-300 group-hover:text-brand-blue'}`}>
        {label}
      </span>
    </label>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <button 
            className="md:hidden flex items-center justify-center p-3 bg-white dark:bg-brand-cardDark border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm text-gray-900 dark:text-white font-medium"
            onClick={() => setShowFilters(!showFilters)}
        >
            <Filter size={18} className="mr-2"/> Filters & Sort
        </button>

        {/* Filters Sidebar */}
        <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white dark:bg-brand-cardDark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                <div className="flex justify-between items-center mb-6 md:hidden">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><X size={20}/></button>
                </div>

                <div className="space-y-8">
                    {/* Sort */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                        <div className="relative">
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className={selectClass}
                            >
                                <option value="newest">Newest Listed</option>
                                <option value="price_low">Lowest Price</option>
                                {currentUser && <option value="nearest">Nearest to Me</option>}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-400">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Category</label>
                        <div className="space-y-1">
                             <RadioOption 
                                label="All Categories" 
                                checked={selectedCategory === 'All'} 
                                onChange={() => setSelectedCategory('All')} 
                             />
                            {Object.values(ListingCategory).map(cat => (
                                <RadioOption 
                                    key={cat}
                                    label={cat}
                                    checked={selectedCategory === cat}
                                    onChange={() => setSelectedCategory(cat)}
                                />
                            ))}
                        </div>
                    </div>

                     {/* Price */}
                     <div>
                        <div className="flex justify-between items-center mb-2">
                             <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Max Price</label>
                             <span className="text-sm font-bold text-brand-blue">₹{priceRange[1]}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="5000" 
                            step="100" 
                            value={priceRange[1]} 
                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>₹0</span>
                            <span>₹5000+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
             <div className="mb-6">
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                    <ListingCard 
                        key={listing.id} 
                        listing={listing} 
                        onChatClick={onChatClick}
                        onClick={onListingClick}
                    />
                ))
                ) : (
                <div className="col-span-full text-center py-20 bg-white dark:bg-brand-cardDark rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-xl text-gray-500 dark:text-gray-400">No books found matching your criteria.</p>
                    <button 
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedTag('All');
                            setSelectedCategory('All');
                            setPriceRange([0, 5000]);
                        }}
                        className="mt-4 text-brand-blue font-medium hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
