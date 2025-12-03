
import { Listing, ListingStatus, User } from '../types';
import { API_URL } from './config';
import { authService } from './authService';

// Helper to normalize backend data to frontend interface
const normalizeListing = (data: any): Listing => {
  return {
    ...data,
    id: data._id || data.id, // Handle MongoDB _id
    tags: data.tags || (data.examType ? [data.examType] : []), // Map examType to tags
    originalPrice: data.mrp || data.originalPrice || 0, // Map mrp to originalPrice
    postedAt: data.created_at || data.postedAt || new Date().toISOString(), // Map created_at
    location: data.location || data.city || 'Unknown', // Fallback for location
    // Ensure nested objects exist if backend sends them partial
    seller: data.seller || { id: 'unknown', name: 'Unknown', avatar: '', location: '' }
  } as Listing;
};

export const listingService = {
  createListing: async (formData: any, user: User): Promise<Listing> => {
    const token = authService.getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/listings/new`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create listing');
    
    return normalizeListing(data);
  },

  getAllListings: async (filters?: any): Promise<Listing[]> => {
    const queryParams = new URLSearchParams();
    if (filters) {
       if (filters.category && filters.category !== 'All') queryParams.append('category', filters.category);
       if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
       if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
       if (filters.sort) queryParams.append('sort', filters.sort);
    }

    try {
      const response = await fetch(`${API_URL}/listings?${queryParams.toString()}`);
      
      // Fallback for initial demo if backend is unavailable
      if (!response.ok) {
          console.warn('Backend unavailable, returning empty list');
          return [];
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data.map(normalizeListing) : [];
    } catch (error) {
      console.error('Error fetching listings:', error);
      return [];
    }
  },

  getMyListings: async (userId: string): Promise<Listing[]> => {
    const token = authService.getToken();
    if (!token) return [];

    try {
      const response = await fetch(`${API_URL}/listings/mine`, {
         headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data) ? data.map(normalizeListing) : [];
    } catch (error) {
       console.error('Error fetching my listings:', error);
       return [];
    }
  },

  updateListingStatus: async (listingId: string, status: ListingStatus): Promise<void> => {
    const token = authService.getToken();
    if (!token) return;

    await fetch(`${API_URL}/listings/${listingId}/status`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
  },

  deleteListing: async (listingId: string): Promise<void> => {
    const token = authService.getToken();
    if (!token) return;

    await fetch(`${API_URL}/listings/${listingId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  uploadImage: async (file: File): Promise<string> => {
    const token = authService.getToken();
    if (!token) throw new Error('Not authenticated');

    const formData = new FormData();
    formData.append('images', file); // API expects array, but we upload one by one in UI loop

    const response = await fetch(`${API_URL}/listings/images`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) throw new Error('Image upload failed');
    
    return data.urls[0]; // Return the first URL
  }
};
