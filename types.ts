
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
  preferences?: string; // e.g. "JEE, NEET"
  location: string; // Derived from city for UI
  rating: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export enum BookCondition {
  NEW = 'Like New',
  GOOD = 'Good',
  FAIR = 'Fair',
  POOR = 'Readable'
}

export enum ExamTag {
  JEE = 'JEE Mains/Adv',
  NEET = 'NEET',
  UPSC = 'UPSC/Civil Services',
  SSC = 'SSC CGL',
  CBSE_10 = 'CBSE Class 10',
  CBSE_11 = 'CBSE Class 11',
  CBSE_12 = 'CBSE Class 12',
  GATE = 'GATE',
  NONE = 'General Reading'
}

export enum ListingCategory {
  EXAM_PREP = 'Exam Prep',
  SCHOOL = 'School Textbooks',
  NOVEL = 'Novels/Fiction',
  REFERENCE = 'Reference',
  OTHER = 'Other'
}

export enum ListingStatus {
  AVAILABLE = 'available',
  SOLD = 'sold'
}

export interface Listing {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
  condition: BookCondition;
  tags: ExamTag[];
  category: ListingCategory;
  location: string;
  pincode: string;
  seller: User;
  postedAt: string;
  status: ListingStatus;
  distanceKm?: number;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  isSystem?: boolean;
}

export interface ChatSession {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  lastMessage: string;
  unreadCount: number;
}
