import React, { useState } from 'react';
import { X, Loader, Plus } from 'lucide-react';
import { listingService } from '../services/listingService';

// --- Type Definitions ---

// Define the expected return type for the upload service
// Assuming it returns the URL as a string
interface ListingService {
    uploadImage: (file: File) => Promise<string>;
}

// Ensure listingService is correctly typed to avoid issues if it's not defined elsewhere
// NOTE: You must ensure 'listingService' object imported above matches this structure.
const listingServiceTyped: ListingService = listingService as ListingService;

interface ImageUploaderProps {
  images: string[];
  setImages: (images: string[]) => void;
  maxImages?: number;
}

// --- Component Implementation ---

export const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, maxImages = 5 }) => {
  const [uploading, setUploading] = useState(false);
  const [filesToProcess, setFilesToProcess] = useState(0); 

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Get files and ensure correct TypeScript type
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    // FIX: Explicitly cast Array.from result to File[] to satisfy TypeScript
    const files: File[] = Array.from(fileList);

    // 2. Check maximum limit
    if (images.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images. You tried to upload ${images.length + files.length}.`);
      e.target.value = ''; // Clear input field
      return;
    }

    setUploading(true);
    setFilesToProcess(files.length);
    
    try {
      const uploadPromises = files.map(file => listingServiceTyped.uploadImage(file));
      
      // Use Promise.allSettled to handle partial failures without stopping the whole batch
      const results = await Promise.allSettled(uploadPromises);

      const newUrls: string[] = [];
      const failedUploads: string[] = [];
      let successCount = 0;

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          // The result.value is guaranteed to be the string URL (Promise<string>)
          newUrls.push(result.value);
          successCount++;
        } else {
          // result.reason holds the error object/message
          failedUploads.push(files[index].name);
          console.error(`Upload failed for ${files[index].name}:`, result.reason);
        }
      });

      // Update state with all successful uploads
      setImages([...images, ...newUrls]);

      // Provide feedback for failed uploads
      if (failedUploads.length > 0) {
        alert(`Successfully uploaded ${successCount} images. Failed to upload ${failedUploads.length} image(s): ${failedUploads.join(', ')}. Check the browser console for error details.`);
      }

    } catch (error: any) {
      // This catch is for errors *during* the Promise.allSettled execution, not within an individual promise
      console.error('Critical upload process failure:', error);
      alert(`A critical error occurred: ${error.message || 'Unknown network error'}`);
    } finally {
      setUploading(false);
      setFilesToProcess(0);
      e.target.value = ''; // Clear input field again
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Render existing images */}
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
        
        {/* Render the upload button/area */}
        {images.length < maxImages && (
          <label className={`
            flex flex-col items-center justify-center aspect-[3/4] 
            border-2 border-dashed border-gray-300 dark:border-gray-700 
            rounded-xl cursor-pointer 
            bg-white dark:bg-gray-800 
            hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-500
            transition-all duration-200 group
          `}>
              {uploading ? (
                <div className='flex flex-col items-center text-gray-600 dark:text-gray-300'>
                    <Loader className="animate-spin text-blue-500 w-6 h-6" />
                    <span className="text-sm mt-3">Uploading ({filesToProcess})...</span>
                    <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
                        {images.length}/{maxImages}
                    </span>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform duration-200 group-hover:bg-blue-100 dark:group-hover:bg-gray-600">
                      <Plus className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-blue-500">Add Photo</span>
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
}
