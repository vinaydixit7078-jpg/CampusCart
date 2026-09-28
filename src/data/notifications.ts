import type { CampusNotification } from '../types'

export const mockNotifications: CampusNotification[] = [
  { id: 'notice-01', kind: 'Listing approved', title: 'Your listing is live', message: 'Study Lamp with Warm Light was approved and is now visible to campus.', createdAt: '2026-09-17T08:30:00.000Z', read: false },
  { id: 'notice-02', kind: 'Exchange request received', title: 'New exchange request', message: 'Someone wants to swap their Statistics Notes for your DAA Book.', createdAt: '2026-09-16T15:20:00.000Z', read: false },
  { id: 'notice-03', kind: 'Order confirmed', title: 'Order confirmed', message: 'Your CampusCart order CC-2026-7K2L has been confirmed.', createdAt: '2026-09-15T13:10:00.000Z', read: false },
  { id: 'notice-04', kind: 'Rental reminder', title: 'Rental return tomorrow', message: 'Your DSLR Camera rental is due back at the Arts Campus desk tomorrow.', createdAt: '2026-09-14T09:00:00.000Z', read: true },
  { id: 'notice-05', kind: 'Exchange accepted', title: 'Exchange accepted', message: 'Sana K. accepted your Mechanical Keyboard exchange request.', createdAt: '2026-09-13T18:40:00.000Z', read: true },
  { id: 'notice-06', kind: 'Service booking confirmed', title: 'Booking confirmed', message: 'Maya Creates confirmed your Poster & Graphic Design appointment.', createdAt: '2026-09-12T11:45:00.000Z', read: true },
  { id: 'notice-07', kind: 'Listing rejected', title: 'Listing needs an update', message: 'Your Weekend Camera Kit needs clearer pickup details before approval.', createdAt: '2026-09-10T16:05:00.000Z', read: true },
]