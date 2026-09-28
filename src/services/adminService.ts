import { mockAdminUsers } from '../data/admin'
import { products } from '../data/products'
import { serviceCatalog } from '../data/services'
import type { ExchangeRequest, Listing, Order, Product, RentalBooking, ServiceBooking } from '../types'

export type AdminDataSnapshot = {
  listings: Listing[]
  orders: Order[]
  rentals: RentalBooking[]
  exchangeRequests: ExchangeRequest[]
  serviceBookings: ServiceBooking[]
}

export type AdminOrderRow = {
  id: string
  student: string
  items: number
  amount: number
  status: Order['status']
  time: string
}

export type AdminActivity = {
  id: string
  label: string
  detail: string
  time: string
  color: string
}

type ActivityRecord = Omit<AdminActivity, 'time'> & { date: string }

const categoryColors = ['#d9f15b', '#b9d7e3', '#f3c9a9', '#d8c6e7', '#cfd9cd', '#f0dce3', '#cfe1e7', '#f2d38d']
const productCategories = ['Books', 'Electronics', 'Stationery', 'Hostel Essentials', 'Gaming', 'Accessories', 'Lab Equipment', 'Clothing'] as const

function approvedProducts(listings: Listing[]): Product[] {
  return listings.filter((listing) => listing.status === 'Approved').map((listing) => ({
    id: listing.id,
    name: listing.name,
    price: listing.price,
    category: listing.category as Product['category'],
    condition: listing.condition,
    seller: listing.college,
    location: listing.pickupLocation,
    image: listing.images[0] ?? '',
    accent: '#e5eee4',
    rating: 0,
  }))
}

function ageLabel(date: string): string {
  const minutes = Math.max(1, Math.floor((Date.now() - new Date(date).getTime()) / 60000))
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

function inRange(date: string, start: Date): boolean {
  return new Date(date).getTime() >= start.getTime()
}

function startOfToday(): Date {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

export function getDashboardStats(snapshot: AdminDataSnapshot) {
  const catalog = [...products, ...approvedProducts(snapshot.listings)]
  return {
    totalStudents: mockAdminUsers.length,
    totalProducts: catalog.length,
    totalOrders: snapshot.orders.length,
    totalRevenue: snapshot.orders.reduce((total, order) => total + order.total, 0),
    activeRentals: snapshot.rentals.filter((rental) => rental.status === 'Rented').length,
    exchangeRequests: snapshot.exchangeRequests.filter((request) => request.status === 'Pending').length,
    campusServices: serviceCatalog.length,
    pendingApprovals: snapshot.listings.filter((listing) => listing.status === 'Pending Approval').length,
  }
}

export function getRecentOrders(snapshot: AdminDataSnapshot): AdminOrderRow[] {
  return [...snapshot.orders]
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .slice(0, 6)
    .map((order) => ({
      id: order.id,
      student: order.customer.studentName,
      items: order.items.reduce((count, item) => count + item.quantity, 0),
      amount: order.total,
      status: order.status,
      time: ageLabel(order.date),
    }))
}

export function getPendingListings(snapshot: AdminDataSnapshot): Listing[] {
  return snapshot.listings.filter((listing) => listing.status === 'Pending Approval').sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
}

export function getRecentActivity(snapshot: AdminDataSnapshot): AdminActivity[] {
  const activity: ActivityRecord[] = [
    ...snapshot.orders.map((order) => ({ id: `order-${order.id}`, label: 'New order placed', detail: order.id, date: order.date, color: '#d9f15b' })),
    ...snapshot.listings.map((listing) => ({ id: `listing-${listing.id}`, label: listing.status === 'Pending Approval' ? 'Product listing submitted' : 'New product listed', detail: listing.name, date: listing.createdAt, color: '#b9d7e3' })),
    ...snapshot.rentals.map((rental) => ({ id: `rental-${rental.id}`, label: 'Rental booked', detail: rental.rentalName, date: rental.createdAt, color: '#f3c9a9' })),
    ...snapshot.exchangeRequests.map((request) => ({ id: `exchange-${request.id}`, label: 'Exchange request created', detail: request.offeredItem, date: request.createdAt, color: '#d8c6e7' })),
    ...snapshot.serviceBookings.map((booking) => ({ id: `service-${booking.id}`, label: 'Service booked', detail: booking.serviceName, date: booking.createdAt, color: '#cfd9cd' })),
  ]
  return activity.sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime()).slice(0, 7).map(({ date, ...item }) => ({ ...item, time: ageLabel(date) }))
}

export function getRevenueData(snapshot: AdminDataSnapshot) {
  const today = startOfToday()
  const week = new Date(today)
  week.setDate(week.getDate() - 6)
  const month = new Date(today)
  month.setDate(month.getDate() - 29)
  return [
    { label: 'Today', value: snapshot.orders.filter((order) => inRange(order.date, today)).reduce((total, order) => total + order.total, 0) },
    { label: 'This Week', value: snapshot.orders.filter((order) => inRange(order.date, week)).reduce((total, order) => total + order.total, 0) },
    { label: 'This Month', value: snapshot.orders.filter((order) => inRange(order.date, month)).reduce((total, order) => total + order.total, 0) },
  ]
}

export function getOrderAnalytics(snapshot: AdminDataSnapshot) {
  const statuses: Order['status'][] = ['Confirmed', 'Processing', 'Ready for Pickup', 'Completed', 'Cancelled']
  return statuses.map((status) => ({ label: status, value: snapshot.orders.filter((order) => order.status === status).length }))
}

export function getProductCategoryData(snapshot: AdminDataSnapshot) {
  const catalog = [...products, ...approvedProducts(snapshot.listings)]
  return productCategories.map((label, index) => ({ label, value: catalog.filter((product) => product.category === label).length, color: categoryColors[index] }))
}

export function getUserActivity(snapshot: AdminDataSnapshot) {
  const today = startOfToday()
  const week = new Date(today)
  week.setDate(week.getDate() - 6)
  const activeSellers = new Set(snapshot.listings.filter((listing) => inRange(listing.createdAt, week)).map((listing) => listing.college)).size
  const activeRenters = new Set(snapshot.rentals.filter((rental) => inRange(rental.createdAt, week)).map((rental) => rental.id)).size
  const serviceProviders = new Set(snapshot.serviceBookings.filter((booking) => inRange(booking.createdAt, week)).map((booking) => booking.provider)).size
  const recentUsers = mockAdminUsers.filter((user) => inRange(user.joined, week)).length
  return { totalStudents: mockAdminUsers.length, newStudentsToday: mockAdminUsers.filter((user) => inRange(user.joined, today)).length, newStudentsThisWeek: recentUsers, activeSellers, activeRenters, serviceProviders }
}
