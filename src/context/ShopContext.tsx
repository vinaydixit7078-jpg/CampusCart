import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { mockListings } from '../data/listings'
import { mockRentalBookings } from '../data/rentals'
import { mockExchanges, mockExchangeRequests } from '../data/exchanges'
import { mockServiceBookings } from '../data/services'
import { mockNotifications } from '../data/notifications'
import type { CampusNotification, ExchangeListing, ExchangeListingInput, ExchangeRequest, ExchangeStatus, Listing, ListingInput, ListingStatus, Order, OrderCustomer, OrderItem, PaymentMethod, Profile, RentalBooking, ServiceBooking } from '../types'

export type CartItem = { id: string; quantity: number }
type StoredCart = CartItem[] | string[]
type OrderInput = { customer: OrderCustomer; payment: PaymentMethod; items: OrderItem[]; subtotal: number; fee: number; discount: number; total: number }
type RentalBookingInput = Omit<RentalBooking, 'id' | 'status' | 'createdAt'>
type ExchangeRequestInput = Omit<ExchangeRequest, 'id' | 'createdAt' | 'status'>
type ServiceBookingInput = Omit<ServiceBooking, 'id' | 'status' | 'createdAt'>
type ShopContextValue = { cart: CartItem[]; wishlist: string[]; orders: Order[]; listings: Listing[]; rentals: RentalBooking[]; exchanges: ExchangeListing[]; exchangeRequests: ExchangeRequest[]; serviceBookings: ServiceBooking[]; profile: Profile; notifications: CampusNotification[]; addToCart: (id: string, quantity?: number) => void; removeFromCart: (id: string) => void; updateQuantity: (id: string, quantity: number) => void; clearCart: () => void; createOrder: (input: OrderInput) => Order; createListing: (input: ListingInput) => Listing; updateListing: (id: string, input: ListingInput) => void; updateListingStatus: (id: string, status: ListingStatus) => void; deleteListing: (id: string) => void; createRentalBooking: (input: RentalBookingInput) => RentalBooking; createExchange: (input: ExchangeListingInput) => ExchangeListing; createExchangeRequest: (input: ExchangeRequestInput) => ExchangeRequest; updateExchangeRequest: (id: string, status: ExchangeStatus) => void; deleteExchange: (id: string) => void; createServiceBooking: (input: ServiceBookingInput) => ServiceBooking; updateProfile: (profile: Profile) => void; markNotificationRead: (id: string) => void; markAllNotificationsRead: () => void; deleteNotification: (id: string) => void; toggleWishlist: (id: string) => void; cartCount: number; wishlistCount: number; unreadNotificationCount: number }
const ShopContext = createContext<ShopContextValue | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [storedCart, setStoredCart] = useLocalStorage<StoredCart>('campus-cart', [])
  const [wishlist, setWishlist] = useLocalStorage<string[]>('campus-wishlist', [])
  const [orders, setOrders] = useLocalStorage<Order[]>('campus-orders', [])
  const [listings, setListings] = useLocalStorage<Listing[]>('campus-listings', mockListings)
  const [rentals, setRentals] = useLocalStorage<RentalBooking[]>('campus-rentals', mockRentalBookings)
  const [exchanges, setExchanges] = useLocalStorage<ExchangeListing[]>('campus-exchanges', mockExchanges)
  const [exchangeRequests, setExchangeRequests] = useLocalStorage<ExchangeRequest[]>('campus-exchange-requests', mockExchangeRequests)
  const [serviceBookings, setServiceBookings] = useLocalStorage<ServiceBooking[]>('campus-service-bookings', mockServiceBookings)
  const [profile, setProfile] = useLocalStorage<Profile>('campus-profile', { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=85', studentName: 'Aarav Mehta', email: 'aarav.mehta@campus.edu', studentId: 'CC-2026-1042', college: 'Riverview Institute', course: 'B.Tech Computer Science', year: '3rd Year', campus: 'North Campus' })
  const [notifications, setNotifications] = useLocalStorage<CampusNotification[]>('campus-notifications', mockNotifications)
  const cart = useMemo<CartItem[]>(() => storedCart.map((item) => typeof item === 'string' ? { id: item, quantity: 1 } : item), [storedCart])

  useEffect(() => {
    if (storedCart.some((item) => typeof item === 'string')) setStoredCart(cart)
  }, [cart, setStoredCart, storedCart])

  const value = useMemo(() => ({
    cart,
    wishlist,
    addToCart: (id: string, quantity = 1) => setStoredCart((items) => {
      const normalized = items.map((item) => typeof item === 'string' ? { id: item, quantity: 1 } : item)
      const existing = normalized.find((item) => item.id === id)
      return existing ? normalized.map((item) => item.id === id ? { ...item, quantity: item.quantity + quantity } : item) : [...normalized, { id, quantity }]
    }),
    removeFromCart: (id: string) => setStoredCart((items) => items.map((item) => typeof item === 'string' ? { id: item, quantity: 1 } : item).filter((item) => item.id !== id)),
    updateQuantity: (id: string, quantity: number) => setStoredCart((items) => items.map((item) => typeof item === 'string' ? { id: item, quantity: 1 } : item).map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)),
    clearCart: () => setStoredCart([]),
    createOrder: (input: OrderInput) => {
      const order: Order = { ...input, id: `CC-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, date: new Date().toISOString(), status: 'Confirmed' }
      setOrders((items) => [order, ...items])
      return order
    },
    createListing: (input: ListingInput) => {
      const listing: Listing = { ...input, id: `LIST-${Date.now().toString(36).toUpperCase()}`, createdAt: new Date().toISOString(), status: 'Pending Approval' }
      setListings((items) => [listing, ...items])
      return listing
    },
    updateListing: (id: string, input: ListingInput) => setListings((items) => items.map((item) => item.id === id ? { ...item, ...input, status: 'Pending Approval' } : item)),
    updateListingStatus: (id: string, status: ListingStatus) => setListings((items) => items.map((item) => item.id === id ? { ...item, status } : item)),
    deleteListing: (id: string) => setListings((items) => items.filter((item) => item.id !== id)),
    createRentalBooking: (input: RentalBookingInput) => {
      const booking: RentalBooking = { ...input, id: `RENT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, createdAt: new Date().toISOString(), status: 'Reserved' }
      setRentals((items) => [booking, ...items])
      return booking
    },
    createExchange: (input: ExchangeListingInput) => {
      const exchange: ExchangeListing = { ...input, id: `EX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, student: 'You', createdAt: new Date().toISOString(), status: 'Pending' }
      setExchanges((items) => [exchange, ...items])
      return exchange
    },
    createExchangeRequest: (input: ExchangeRequestInput) => {
      const request: ExchangeRequest = { ...input, id: `REQ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, createdAt: new Date().toISOString(), status: 'Pending' }
      setExchangeRequests((items) => [request, ...items])
      return request
    },
    updateExchangeRequest: (id: string, status: ExchangeStatus) => setExchangeRequests((items) => items.map((item) => item.id === id ? { ...item, status } : item)),
    deleteExchange: (id: string) => setExchanges((items) => items.filter((item) => item.id !== id)),
    createServiceBooking: (input: ServiceBookingInput) => {
      const booking: ServiceBooking = { ...input, id: `SERVICE-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, createdAt: new Date().toISOString(), status: 'Requested' }
      setServiceBookings((items) => [booking, ...items])
      return booking
    },
    updateProfile: (nextProfile: Profile) => setProfile(nextProfile),
    markNotificationRead: (id: string) => setNotifications((items) => items.map((item) => item.id === id ? { ...item, read: true } : item)),
    markAllNotificationsRead: () => setNotifications((items) => items.map((item) => ({ ...item, read: true }))),
    deleteNotification: (id: string) => setNotifications((items) => items.filter((item) => item.id !== id)),
    toggleWishlist: (id: string) => setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]),
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
    wishlistCount: wishlist.length,
    orders,
    listings,
    rentals,
    exchanges,
    exchangeRequests,
    serviceBookings,
    profile,
    notifications,
    unreadNotificationCount: notifications.filter((item) => !item.read).length,
  }), [cart, exchangeRequests, exchanges, listings, notifications, orders, profile, rentals, serviceBookings, setExchangeRequests, setExchanges, setListings, setNotifications, setOrders, setProfile, setRentals, setServiceBookings, setStoredCart, wishlist, setWishlist])
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
export function useShop() { const context = useContext(ShopContext); if (!context) throw new Error('useShop must be used inside ShopProvider'); return context }