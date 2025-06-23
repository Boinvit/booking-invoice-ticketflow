import React from 'react';

export const SERVICE_CATEGORIES = [
  // Beauty & Personal Care
  { value: 'hair-salon', label: 'Hair Salon', icon: '✂️' },
  { value: 'barber', label: 'Barber Shop', icon: '💈' },
  { value: 'nail-salon', label: 'Nail Salon', icon: '💅' },
  { value: 'beauty-spa', label: 'Beauty & Spa', icon: '💆‍♀️' },
  { value: 'massage', label: 'Massage Therapy', icon: '🤲' },
  { value: 'skincare', label: 'Skincare Clinic', icon: '✨' },
  
  // Health & Medical
  { value: 'medical', label: 'Medical Services', icon: '🏥' },
  { value: 'dental', label: 'Dental Care', icon: '🦷' },
  { value: 'physiotherapy', label: 'Physiotherapy', icon: '🏃‍♂️' },
  { value: 'mental-health', label: 'Mental Health', icon: '🧠' },
  { value: 'veterinary', label: 'Veterinary Care', icon: '🐕' },
  { value: 'optometry', label: 'Eye Care', icon: '👁️' },
  
  // Fitness & Wellness
  { value: 'gym', label: 'Gym & Fitness', icon: '💪' },
  { value: 'yoga', label: 'Yoga Studio', icon: '🧘‍♀️' },
  { value: 'personal-training', label: 'Personal Training', icon: '🏋️‍♂️' },
  { value: 'nutrition', label: 'Nutrition Counseling', icon: '🥗' },
  
  // Professional Services
  { value: 'consulting', label: 'Business Consulting', icon: '💼' },
  { value: 'legal', label: 'Legal Services', icon: '⚖️' },
  { value: 'accounting', label: 'Accounting', icon: '📊' },
  { value: 'photography', label: 'Photography', icon: '📸' },
  { value: 'tutoring', label: 'Tutoring & Education', icon: '📚' },
  
  // Hospitality & Accommodation
  { value: 'hotel', label: 'Hotel Services', icon: '🏨' },
  { value: 'restaurant', label: 'Restaurant & Dining', icon: '🍽️' },
  { value: 'event-planning', label: 'Event Planning', icon: '🎉' },
  { value: 'catering', label: 'Catering Services', icon: '🍴' },
  { value: 'conference-rooms', label: 'Conference Rooms', icon: '🏢' },
  { value: 'banquet-halls', label: 'Banquet Halls', icon: '🎊' },
  
  // Transport Services
  { value: 'taxi', label: 'Taxi Services', icon: '🚕' },
  { value: 'bus', label: 'Bus Services', icon: '🚌' },
  { value: 'train', label: 'Train Services', icon: '🚆' },
  { value: 'ride-sharing', label: 'Ride Sharing', icon: '🚗' },
  { value: 'courier', label: 'Courier & Delivery', icon: '📦' },
  { value: 'car-rental', label: 'Car Rental', icon: '🚙' },
  
  // Home Services
  { value: 'cleaning', label: 'Cleaning Services', icon: '🧹' },
  { value: 'repair', label: 'Repair Services', icon: '🔧' },
  { value: 'plumbing', label: 'Plumbing', icon: '🚰' },
  { value: 'electrical', label: 'Electrical Services', icon: '⚡' },
  { value: 'gardening', label: 'Gardening & Landscaping', icon: '🌱' },
  
  // Other
  { value: 'other', label: 'Other Services', icon: '🔧' }
];

export const getCategoryIcon = (category: string) => {
  const categoryData = SERVICE_CATEGORIES.find(cat => cat.value === category);
  return categoryData?.icon || '🔧';
};

export const getCategoryLabel = (category: string) => {
  const categoryData = SERVICE_CATEGORIES.find(cat => cat.value === category);
  return categoryData?.label || category;
};
