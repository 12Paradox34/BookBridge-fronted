
import React, { useState } from 'react';
import { Upload, X, Loader, Plus } from 'lucide-react';
import { listingService } from '../services/listingService';

interface ImageUploaderProps {
  images: string[];
  setImages: (images: string[]) => void;
  maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, maxImages = 5 }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (images.length + files.length > maxImages) {
        alert(`You can only upload up to ${maxImages} images`);
        return;
      }

      setUploading(true);
      try {
        const uploadPromises = files.map(file => listingService.uploadImage(file));
        const newUrls = await Promise.all(uploadPromises);
        setImages([...images, ...newUrls]);
      } catch (error) {
        alert('Failed to upload images');
      } finally {
        setUploading(false);
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-[3/4] group rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <img 
              src={url} 
              alt={`Upload ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-md opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:bg-red-600 focus:outline-none"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        ))}
        
        {images.length < maxImages && (
          <label className={`
            flex flex-col items-center justify-center aspect-[3/4] 
            border-2 border-dashed border-gray-300 dark:border-gray-700 
            rounded-xl cursor-pointer 
            bg-white dark:bg-gray-800 
            hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-brand-blue dark:hover:border-brand-blue
            transition-all duration-200 group
          `}>
             {uploading ? (
                <Loader className="animate-spin text-brand-blue" />
             ) : (
                <>
                    <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform duration-200 group-hover:bg-blue-100 dark:group-hover:bg-gray-600">
                        <Plus className="w-6 h-6 text-brand-blue" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-brand-blue">Add Photo</span>
                    <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">{images.length}/{maxImages}</span>
                </>
             )}
            <input 
              type="file" 
              className="hidden" 
              accept="image/png, image/jpeg, image/jpg"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        )}
      </div>
    </div>
  );
};
