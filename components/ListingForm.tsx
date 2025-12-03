
import React, { useState } from 'react';
import { User, BookCondition, ExamTag, ListingCategory } from '../types';
import { ImageUploader } from './ImageUploader';
import { MapPin, Info, AlertCircle, BookOpen, Tag } from 'lucide-react';

interface ListingFormProps {
  user: User;
  onSubmit: (data: any) => Promise<void>;
}

export const ListingForm: React.FC<ListingFormProps> = ({ user, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: ListingCategory.EXAM_PREP,
    examType: ExamTag.NONE,
    condition: BookCondition.GOOD,
    price: '',
    mrp: '',
    description: '',
    pincode: user.pincode || '',
    city: user.city || '',
    address: user.address || '',
    images: [] as string[]
  });

  // Updated styles according to prompt requirements
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2";
  const inputClass = `
    block w-full px-4 py-3 rounded-xl 
    border border-gray-300 dark:border-gray-700 
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent 
    transition-all duration-200 ease-in-out
  `;
  const selectClass = `${inputClass} appearance-none cursor-pointer`;
  const errorClass = "mt-1.5 text-sm text-red-500 flex items-center font-medium";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = "Book title is required";
    if (!formData.author.trim()) newErrors.author = "Author name is required";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Enter a valid price";
    if (!formData.description.trim()) newErrors.description = "Please provide a description";
    if (formData.description.length < 20) newErrors.description = "Description should be at least 20 characters";
    if (!formData.pincode.match(/^\d{6}$/)) newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Pickup address is required";
    if (formData.images.length === 0) newErrors.images = "Upload at least one photo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector('.text-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
      
      {/* SECTION 1: BOOK DETAILS */}
      <div className="bg-white dark:bg-brand-cardDark p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-brand-blue">
                <BookOpen size={24} />
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Details</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Provide accurate information to help students find your book.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Book Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`${inputClass} ${errors.title ? 'border-red-500 focus:ring-red-200' : ''}`}
              placeholder="e.g. Concepts of Physics Vol 1 by HC Verma"
            />
            {errors.title && <p className={errorClass}><AlertCircle size={14} className="mr-1"/> {errors.title}</p>}
          </div>
          
          <div>
            <label className={labelClass}>Author / Publisher <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`${inputClass} ${errors.author ? 'border-red-500' : ''}`}
              placeholder="e.g. HC Verma"
            />
            {errors.author && <p className={errorClass}><AlertCircle size={14} className="mr-1"/> {errors.author}</p>}
          </div>

          <div>
            <label className={labelClass}>Category <span className="text-red-500">*</span></label>
            <div className="relative">
                <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={selectClass}
                >
                {Object.values(ListingCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-300">
                   <Tag size={16} />
                </div>
            </div>
          </div>

          {formData.category === ListingCategory.EXAM_PREP && (
            <div className="animate-fade-in">
              <label className={labelClass}>Target Exam</label>
              <div className="relative">
                  <select
                    name="examType"
                    value={formData.examType}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    {Object.values(ExamTag).map(tag => <option key={tag} value={tag}>{tag}</option>)}
                  </select>
                   <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-300">
                       <Tag size={16} />
                   </div>
              </div>
            </div>
          )}

          <div>
            <label className={labelClass}>Condition <span className="text-red-500">*</span></label>
            <div className="relative">
                <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className={selectClass}
                >
                {Object.values(BookCondition).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-300">
                    <Info size={16} />
                </div>
            </div>
          </div>

          <div className="relative">
            <label className={labelClass}>Selling Price (₹) <span className="text-red-500">*</span></label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 font-bold">₹</span>
                </div>
                <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className={`${inputClass} pl-8 ${errors.price ? 'border-red-500' : ''}`}
                placeholder="0"
                />
            </div>
            {errors.price && <p className={errorClass}><AlertCircle size={14} className="mr-1"/> {errors.price}</p>}
          </div>

          <div>
            <label className={labelClass}>Original MRP (₹) <span className="text-gray-400 font-normal text-xs ml-1">(Optional)</span></label>
            <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 font-bold">₹</span>
                </div>
                <input
                type="number"
                name="mrp"
                min="0"
                value={formData.mrp}
                onChange={handleChange}
                className={`${inputClass} pl-8`}
                placeholder="0"
                />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Description <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} resize-none ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Describe the book's condition, edition, any highlighting or notes..."
            />
            <div className="flex justify-between mt-1">
                {errors.description && <p className={errorClass}><AlertCircle size={14} className="mr-1"/> {errors.description}</p>}
                <span className="text-xs text-gray-400 ml-auto">{formData.description.length} chars</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: IMAGES */}
      <div className="bg-white dark:bg-brand-cardDark p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Upload Photos</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Add up to 5 clear images. Listings with photos sell 3x faster.</p>
        </div>
        
        <ImageUploader 
            images={formData.images} 
            setImages={(imgs) => {
                setFormData({...formData, images: imgs});
                if(imgs.length > 0 && errors.images) setErrors(prev => ({...prev, images: ''}));
            }} 
        />
        {errors.images && <p className={`${errorClass} mt-3`}><AlertCircle size={14} className="mr-1"/> {errors.images}</p>}
      </div>

      {/* SECTION 3: LOCATION */}
      <div className="bg-white dark:bg-brand-cardDark p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                <MapPin size={24} />
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pickup Location</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Where can the buyer pick up this book?</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                 <label className={labelClass}>Pincode <span className="text-red-500">*</span></label>
                 <div className="relative">
                    <input
                        type="text"
                        name="pincode"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleChange}
                        className={`${inputClass} ${errors.pincode ? 'border-red-500' : ''}`}
                        placeholder="e.g. 560038"
                    />
                 </div>
                 {errors.pincode && <p className={errorClass}><AlertCircle size={14} className="mr-1"/> {errors.pincode}</p>}
            </div>
            <div>
                 <label className={labelClass}>City <span className="text-red-500">*</span></label>
                 <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`${inputClass} ${errors.city ? 'border-red-500' : ''}`}
                    placeholder="e.g. Bangalore"
                />
                {errors.city && <p className={errorClass}><AlertCircle size={14} className="mr-1"/> {errors.city}</p>}
            </div>
             <div className="md:col-span-2">
                 <label className={labelClass}>Area / Colony <span className="text-red-500">*</span></label>
                 <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`${inputClass} ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="e.g. Koramangala 4th Block"
                />
                {errors.address && <p className={errorClass}><AlertCircle size={14} className="mr-1"/> {errors.address}</p>}
            </div>
        </div>
        
        <div className="mt-6 flex items-start p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <Info className="h-5 w-5 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                <span className="font-semibold">Privacy Note:</span> Your exact house number is not shown publicly. We only display the approximate area (e.g., "Koramangala") to potential buyers.
            </p>
        </div>
      </div>

      <div className="flex justify-end pt-4 pb-8">
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full md:w-auto px-10 py-4 
            bg-brand-blue hover:bg-brand-darkBlue 
            text-white font-bold text-lg rounded-xl 
            shadow-lg hover:shadow-xl hover:-translate-y-0.5 
            transition-all duration-200 
            disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
            flex items-center justify-center
          `}
        >
          {loading ? 'Processing...' : 'Post Ad Now'}
        </button>
      </div>
    </form>
  );
};
