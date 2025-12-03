import { Listing, BookCondition, ExamTag, User, ListingCategory, ListingStatus } from './types';

export const APP_NAME = "BookBridge";

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Rahul Kumar',
  email: 'rahul.kumar@example.com',
  avatar: 'https://picsum.photos/id/1005/100/100',
  location: 'Koramangala, Bangalore',
  rating: 4.8
};

export const SAMPLE_LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'Concepts of Physics (Vol 1 & 2) - HC Verma',
    author: 'H.C. Verma',
    price: 450,
    originalPrice: 900,
    description: 'Bible for JEE aspirants. Both volumes available. Slightly marked with pencil but good condition.',
    images: ['https://picsum.photos/id/24/400/600', 'https://picsum.photos/id/25/400/600'],
    condition: BookCondition.GOOD,
    tags: [ExamTag.JEE, ExamTag.CBSE_12],
    category: ListingCategory.EXAM_PREP,
    location: 'Indiranagar, Bangalore',
    pincode: '560038',
    seller: { id: 's1', name: 'Amit S.', email: 'amit.s@example.com', avatar: 'https://picsum.photos/id/1012/50/50', location: 'Indiranagar', rating: 4.5 },
    postedAt: '2023-10-25T10:00:00Z',
    status: ListingStatus.AVAILABLE,
    distanceKm: 2.5
  },
  {
    id: 'l2',
    title: 'Indian Polity - 6th Edition',
    author: 'M. Laxmikanth',
    price: 300,
    originalPrice: 650,
    description: 'Must have for UPSC. Highlighted important sections for quick revision.',
    images: ['https://picsum.photos/id/20/400/600'],
    condition: BookCondition.FAIR,
    tags: [ExamTag.UPSC],
    category: ListingCategory.EXAM_PREP,
    location: 'Mukherjee Nagar, Delhi',
    pincode: '110009',
    seller: { id: 's2', name: 'Priya M.', email: 'priya.m@example.com', avatar: 'https://picsum.photos/id/1027/50/50', location: 'Delhi', rating: 4.9 },
    postedAt: '2023-10-24T14:30:00Z',
    status: ListingStatus.AVAILABLE,
    distanceKm: 1200
  },
  {
    id: 'l3',
    title: 'Biology NCERT Class 11 & 12',
    author: 'NCERT',
    price: 150,
    originalPrice: 350,
    description: 'Clean copies, no markings. Essential for NEET 2024.',
    images: ['https://picsum.photos/id/30/400/600'],
    condition: BookCondition.NEW,
    tags: [ExamTag.NEET, ExamTag.CBSE_11],
    category: ListingCategory.SCHOOL,
    location: 'Kota, Rajasthan',
    pincode: '324005',
    seller: { id: 's3', name: 'Sohan V.', email: 'sohan.v@example.com', avatar: 'https://picsum.photos/id/1001/50/50', location: 'Kota', rating: 4.2 },
    postedAt: '2023-10-26T09:15:00Z',
    status: ListingStatus.AVAILABLE,
    distanceKm: 800
  },
  {
    id: 'l4',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 200,
    originalPrice: 500,
    description: 'Best seller. Great read for productivity.',
    images: ['https://picsum.photos/id/42/400/600'],
    condition: BookCondition.GOOD,
    tags: [ExamTag.NONE],
    category: ListingCategory.NOVEL,
    location: 'Jayanagar, Bangalore',
    pincode: '560041',
    seller: { id: 's4', name: 'Sneha R.', email: 'sneha.r@example.com', avatar: 'https://picsum.photos/id/1011/50/50', location: 'Bangalore', rating: 5.0 },
    postedAt: '2023-10-22T18:00:00Z',
    status: ListingStatus.AVAILABLE,
    distanceKm: 4.2
  },
  {
    id: 'l5',
    title: 'RD Sharma Mathematics Class 10',
    author: 'R.D. Sharma',
    price: 250,
    originalPrice: 595,
    description: 'Solved examples and exercises. Cover slightly torn.',
    images: ['https://picsum.photos/id/55/400/600'],
    condition: BookCondition.FAIR,
    tags: [ExamTag.CBSE_10],
    category: ListingCategory.SCHOOL,
    location: 'Whitefield, Bangalore',
    pincode: '560066',
    seller: { id: 's5', name: 'Vikram', email: 'vikram.k@example.com', avatar: 'https://picsum.photos/id/1003/50/50', location: 'Bangalore', rating: 4.0 },
    postedAt: '2023-10-27T08:00:00Z',
    status: ListingStatus.AVAILABLE,
    distanceKm: 15.0
  }
];

export const SUGGESTED_QUERIES = [
  "Books for JEE Advanced",
  "UPSC Prelims History",
  "Second hand novels near me",
  "Class 10 Reference Books"
];