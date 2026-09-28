import type { Product, ProductDetails } from '../types'

export const products: Product[] = [
  { id: 'java-book', name: 'Java Programming Book', price: 450, category: 'Books', condition: 'Excellent', seller: 'Priya S.', location: 'Library', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85', accent: '#f3d7c4', rating: 4.9, currency: '₹', badge: 'Best seller' },
  { id: 'calculator', name: 'Scientific Calculator', price: 850, category: 'Stationery', condition: 'Like new', seller: 'Arjun M.', location: 'Engineering Block', image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=900&q=85', accent: '#dce8f1', rating: 4.8, currency: '₹', badge: 'Exam essential' },
  { id: 'laptop-stand', name: 'Aluminium Laptop Stand', price: 1200, category: 'Electronics', condition: 'Good', seller: 'Maya R.', location: 'North Quad', image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=900&q=85', accent: '#dcebdc', rating: 4.7, currency: '₹' },
  { id: 'keyboard', name: 'Mechanical Keyboard', price: 2400, category: 'Gaming', condition: 'Like new', seller: 'Leo P.', location: 'Arts District', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85', accent: '#e4def2', rating: 4.9, currency: '₹', badge: 'New listing' },
  { id: 'backpack', name: 'Everyday Campus Backpack', price: 900, category: 'Accessories', condition: 'Good', seller: 'Amara K.', location: 'West Village', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', accent: '#cfe0ed', rating: 4.6, currency: '₹' },
  { id: 'desk-lamp', name: 'Mushroom Desk Lamp', price: 650, category: 'Hostel Essentials', condition: 'Like new', seller: 'Maya R.', location: 'North Quad', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', accent: '#f2c96d', rating: 4.8, currency: '₹', badge: 'Popular' },
  { id: 'headphones', name: 'Noise-Cancelling Headphones', price: 1800, category: 'Electronics', condition: 'Excellent', seller: 'Theo B.', location: 'Maple Hall', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', accent: '#f3dfcf', rating: 4.7, currency: '₹' },
  { id: 'drawing-kit', name: 'Engineering Drawing Kit', price: 700, category: 'Lab Equipment', condition: 'Excellent', seller: 'Nikhil D.', location: 'Design Studio', image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=900&q=85', accent: '#e7c8b8', rating: 4.8, currency: '₹' },
]

export const categories = [
  { label: 'Books', icon: '📚', color: '#dcebdc' }, { label: 'Electronics', icon: '💻', color: '#dce8f1' }, { label: 'Stationery', icon: '✏️', color: '#f5e5c4' }, { label: 'Hostel Essentials', icon: '🏠', color: '#f0dce3' }, { label: 'Gaming', icon: '🎮', color: '#e4def2' }, { label: 'Accessories', icon: '🎒', color: '#e1ebdc' }, { label: 'Lab Equipment', icon: '🔬', color: '#e8dfd5' }, { label: 'Clothing', icon: '👕', color: '#dce5ef' },
]

export const rentalProducts: Product[] = [
  { id: 'rental-dslr', name: 'DSLR Camera', price: 450, category: 'Rentals', condition: 'Pro kit', seller: 'Campus Media', location: 'Student Center', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85', accent: '#d5e5dc', rating: 4.9, currency: '₹', rental: 'day' },
  { id: 'rental-calculator', name: 'Scientific Calculator', price: 150, category: 'Rentals', condition: 'Exam ready', seller: 'Library Desk', location: 'Central Library', image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=900&q=85', accent: '#dce8f1', rating: 4.8, currency: '₹', rental: 'day' },
  { id: 'rental-projector', name: 'HD Projector', price: 350, category: 'Rentals', condition: 'Bright image', seller: 'Events Club', location: 'Student Center', image: 'https://images.unsplash.com/photo-1601944177325-f8867652837f?auto=format&fit=crop&w=900&q=85', accent: '#e8d9c8', rating: 4.7, currency: '₹', rental: 'day' },
  { id: 'rental-tripod', name: 'Camera Tripod', price: 120, category: 'Rentals', condition: 'Stable', seller: 'Frame Society', location: 'Arts District', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=85', accent: '#f3dfcf', rating: 4.6, currency: '₹', rental: 'day' },
  { id: 'rental-lab', name: 'Lab Equipment Set', price: 250, category: 'Rentals', condition: 'Checked', seller: 'Science Club', location: 'Science Block', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=85', accent: '#dcebdc', rating: 4.8, currency: '₹', rental: 'day' },
]

export const productDetails: Record<string, ProductDetails> = {
  'java-book': { description: 'A clear, well-loved guide for building your Java fundamentals and surviving the next coding assignment.', originalPrice: 650, campus: 'North Campus', availability: 'Available', createdAt: '2026-08-12' },
  calculator: { description: 'Reliable scientific calculator with a clean display, ideal for engineering, maths, and exam season.', originalPrice: 1100, campus: 'Engineering Campus', availability: 'Available', createdAt: '2026-09-04' },
  'laptop-stand': { description: 'Lightweight aluminium stand that lifts your screen to a more comfortable study height.', originalPrice: 1700, campus: 'North Campus', availability: 'Available', createdAt: '2026-08-25' },
  keyboard: { description: 'Tactile mechanical keyboard with a satisfying click and compact footprint for late-night study sessions.', originalPrice: 3200, campus: 'Arts Campus', availability: 'Available', createdAt: '2026-09-10' },
  backpack: { description: 'Roomy everyday backpack with a padded laptop sleeve and enough space for a full day on campus.', campus: 'West Campus', availability: 'Available', createdAt: '2026-07-28' },
  'desk-lamp': { description: 'Warm, compact lamp to make a dorm desk feel calmer during long reading nights.', originalPrice: 900, campus: 'North Campus', availability: 'Available', createdAt: '2026-08-03' },
  headphones: { description: 'Comfortable over-ear headphones with rich sound for study playlists and commutes between classes.', originalPrice: 2400, campus: 'Maple Campus', availability: 'Reserved', createdAt: '2026-08-19' },
  'drawing-kit': { description: 'Complete precision drawing set with compass, rulers, triangles, and a protective case.', campus: 'Design Campus', availability: 'Available', createdAt: '2026-06-16' },
  'rental-dslr': { description: 'A dependable DSLR kit for club events, projects, portraits, and weekend shoots.', campus: 'Student Center', availability: 'Available', createdAt: '2026-09-01' },
  'rental-calculator': { description: 'Exam-ready calculator available for short-term borrowing from the library desk.', campus: 'Central Library', availability: 'Available', createdAt: '2026-08-29' },
  'rental-projector': { description: 'Bright HD projector for presentations, movie nights, and society events.', campus: 'Student Center', availability: 'Available', createdAt: '2026-08-22' },
  'rental-tripod': { description: 'Stable adjustable tripod for cameras, phones, and quick campus shoots.', campus: 'Arts District', availability: 'Available', createdAt: '2026-08-16' },
  'rental-lab': { description: 'Checked lab equipment set for practicals, demos, and short-term coursework.', campus: 'Science Block', availability: 'Reserved', createdAt: '2026-07-30' },
}

export function getProductDetails(product: Product): ProductDetails {
  return productDetails[product.id] ?? { description: `${product.name} shared by a member of your student community.`, campus: product.location, availability: 'Available', createdAt: '2026-01-01' }
}

export const allProducts = [...products, ...rentalProducts]