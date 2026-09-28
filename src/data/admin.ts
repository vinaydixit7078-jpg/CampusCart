export type AdminUser = { id: string; name: string; email: string; studentId: string; college: string; status: 'Active' | 'Suspended'; joined: string }
export type AdminOrder = { id: string; student: string; items: number; total: number; status: 'Confirmed' | 'Processing' | 'Completed'; date: string }

export const mockAdminUsers: AdminUser[] = [
  { id: 'USR-1042', name: 'Aarav Mehta', email: 'aarav.mehta@campus.edu', studentId: 'CC-2026-1042', college: 'Riverview Institute', status: 'Active', joined: 'Jan 2026' },
  { id: 'USR-1038', name: 'Priya Sharma', email: 'priya.sharma@campus.edu', studentId: 'CC-2026-1038', college: 'Northbridge College', status: 'Active', joined: 'Jan 2026' },
  { id: 'USR-0984', name: 'Kabir Nair', email: 'kabir.nair@campus.edu', studentId: 'CC-2025-0984', college: 'Riverview Institute', status: 'Active', joined: 'Aug 2025' },
  { id: 'USR-0912', name: 'Sana Kapoor', email: 'sana.kapoor@campus.edu', studentId: 'CC-2025-0912', college: 'Eastlake University', status: 'Suspended', joined: 'Jul 2025' },
]

export const mockAdminOrders: AdminOrder[] = [
  { id: 'CC-2026-7K2L', student: 'Aarav Mehta', items: 2, total: 2450, status: 'Confirmed', date: 'Sep 17, 2026' },
  { id: 'CC-2026-5P8D', student: 'Priya Sharma', items: 1, total: 850, status: 'Processing', date: 'Sep 16, 2026' },
  { id: 'CC-2026-3M1R', student: 'Kabir Nair', items: 3, total: 3200, status: 'Completed', date: 'Sep 14, 2026' },
  { id: 'CC-2026-2F6Q', student: 'Sana Kapoor', items: 1, total: 450, status: 'Completed', date: 'Sep 12, 2026' },
]

export const monthlyOrders = [68, 82, 96, 88, 124, 148, 176, 205, 238]
export const monthlyRevenue = [42, 55, 61, 73, 81, 94, 112, 128, 146]
export const userGrowth = [420, 510, 680, 790, 940, 1180, 1410, 1780, 2140]
export const rentalActivity = [32, 44, 38, 58, 64, 76, 82, 91, 108]
export const categoryBreakdown = [{ label: 'Books', value: 28, color: '#d9f15b' }, { label: 'Electronics', value: 22, color: '#b9d7e3' }, { label: 'Home', value: 18, color: '#f3c9a9' }, { label: 'Fashion', value: 14, color: '#d8c6e7' }, { label: 'Other', value: 18, color: '#cfd9cd' }]