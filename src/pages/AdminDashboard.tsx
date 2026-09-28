import { Activity, ArrowUpRight, Banknote, Boxes, Check, ClipboardList, FileWarning, PackageCheck, RefreshCw, Users, Wrench, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AdminShell } from '../components/AdminShell'
import { useShop } from '../context/ShopContext'
import { getDashboardStats, getOrderAnalytics, getPendingListings, getProductCategoryData, getRecentActivity, getRecentOrders, getRevenueData, getUserActivity, type AdminActivity, type AdminOrderRow } from '../services/adminService'

const statStyles = [
  { label: 'Total Students', icon: Users, color: '#d9f15b' },
  { label: 'Total Products', icon: Boxes, color: '#cfe1e7' },
  { label: 'Total Orders', icon: ClipboardList, color: '#f3d9c5' },
  { label: 'Total Revenue', icon: Banknote, color: '#ddd2ea' },
  { label: 'Active Rentals', icon: PackageCheck, color: '#dcebdc' },
  { label: 'Exchange Requests', icon: RefreshCw, color: '#f0dce3' },
  { label: 'Campus Services', icon: Wrench, color: '#dce8f1' },
  { label: 'Pending Approvals', icon: FileWarning, color: '#fff1cc' },
]

export function AdminDashboard() {
  const { listings, orders, rentals, exchangeRequests, serviceBookings, updateListingStatus } = useShop()
  const snapshot = { listings, orders, rentals, exchangeRequests, serviceBookings }
  const stats = getDashboardStats(snapshot)
  const recentOrders = getRecentOrders(snapshot)
  const pendingListings = getPendingListings(snapshot)
  const activity = getRecentActivity(snapshot)
  const revenue = getRevenueData(snapshot)
  const orderAnalytics = getOrderAnalytics(snapshot)
  const categories = getProductCategoryData(snapshot)
  const userActivity = getUserActivity(snapshot)

  const statValues: Record<string, string> = {
    'Total Students': stats.totalStudents.toLocaleString(),
    'Total Products': stats.totalProducts.toLocaleString(),
    'Total Orders': stats.totalOrders.toLocaleString(),
    'Total Revenue': `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
    'Active Rentals': stats.activeRentals.toLocaleString(),
    'Exchange Requests': stats.exchangeRequests.toLocaleString(),
    'Campus Services': stats.campusServices.toLocaleString(),
    'Pending Approvals': stats.pendingApprovals.toLocaleString(),
  }

  return <AdminShell title="Admin Dashboard" subtitle="Keep the student marketplace healthy, useful, and moving.">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#d9e6d5] bg-[#eef6e9] px-4 py-3 text-sm text-[#526d58]">
      <div className="flex items-center gap-2 font-bold"><span className="size-2.5 animate-pulse rounded-full bg-[#5a9a61]" /> Demo Live Data</div>
      <span className="text-xs font-semibold">Data updates automatically from the current demo data source.</span>
    </div>

    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
      {statStyles.map(({ label, icon: Icon, color }) => <StatCard key={label} label={label} value={statValues[label]} icon={Icon} color={color} />)}
    </div>

    <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.85fr]">
      <RevenueCard data={revenue} />
      <AnalyticsCard title="Order analytics" detail="Current orders by status"><HorizontalBars data={orderAnalytics} /></AnalyticsCard>
    </div>

    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr_.9fr]">
      <AnalyticsCard title="Product categories" detail="Published products by category"><HorizontalBars data={categories} /></AnalyticsCard>
      <UserActivityCard data={userActivity} />
      <ActivityCard activity={activity} />
    </div>

    <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.95fr]">
      <OrdersCard orders={recentOrders} />
      <PendingListings listings={pendingListings} onStatusChange={updateListingStatus} />
    </div>
  </AdminShell>
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: typeof Users; color: string }) {
  return <div className="rounded-2xl p-4 shadow-sm" style={{ backgroundColor: color }}><div className="flex items-start justify-between"><Icon size={18} /><ArrowUpRight size={15} className="opacity-40" /></div><p className="mt-5 font-['Space_Grotesk'] text-xl font-bold sm:text-2xl">{value}</p><p className="mt-1 text-xs font-semibold text-[#526159]">{label}</p></div>
}

function Panel({ title, detail, children, action }: { title: string; detail: string; children: React.ReactNode; action?: React.ReactNode }) {
  return <section className="rounded-[26px] bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-3"><div><h2 className="font-['Space_Grotesk'] text-xl font-bold">{title}</h2><p className="mt-1 text-sm text-[#78857c]">{detail}</p></div>{action}</div><div className="mt-6">{children}</div></section>
}

function RevenueCard({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((item) => item.value), 1)
  return <Panel title="Revenue analytics" detail="Calculated from current orders" action={<Banknote size={19} className="text-[#66826d]" />}>
    {data.every((item) => item.value === 0) ? <EmptyState text="No sales data available yet." /> : <div className="grid gap-5 sm:grid-cols-3">{data.map((item) => <div key={item.label}><div className="flex items-end justify-between gap-2"><span className="text-xs font-semibold text-[#78857c]">{item.label}</span><strong className="font-['Space_Grotesk'] text-lg">₹{item.value.toLocaleString('en-IN')}</strong></div><div className="mt-3 h-3 rounded-full bg-[#eef1ec]"><div className="h-3 rounded-full bg-[#17221f] transition-all" style={{ width: `${Math.max((item.value / max) * 100, item.value ? 8 : 0)}%` }} /></div></div>)}</div>}
  </Panel>
}

function AnalyticsCard({ title, detail, children }: { title: string; detail: string; children: React.ReactNode }) { return <Panel title={title} detail={detail}><div className="max-h-64 overflow-y-auto pr-1">{children}</div></Panel> }

function HorizontalBars({ data }: { data: { label: string; value: number; color?: string }[] }) {
  const max = Math.max(...data.map((item) => item.value), 1)
  return <div className="space-y-3">{data.map((item) => <div key={item.label}><div className="mb-1 flex items-center justify-between gap-3 text-xs"><span className="truncate text-[#526159]">{item.label}</span><strong>{item.value}</strong></div><div className="h-2 rounded-full bg-[#eef1ec]"><div className="h-2 rounded-full transition-all" style={{ width: `${item.value ? Math.max((item.value / max) * 100, 5) : 0}%`, backgroundColor: item.color ?? '#17221f' }} /></div></div>)}</div>
}

function UserActivityCard({ data }: { data: ReturnType<typeof getUserActivity> }) {
  const rows = [['Total students', data.totalStudents], ['New students today', data.newStudentsToday], ['New students this week', data.newStudentsThisWeek], ['Active sellers', data.activeSellers], ['Active renters', data.activeRenters], ['Service providers', data.serviceProviders]]
  return <Panel title="Student Activity" detail="Signals from current demo records"><div className="grid grid-cols-2 gap-3">{rows.map(([label, value]) => <div className="rounded-xl bg-[#f4f6f2] p-3" key={label as string}><p className="font-['Space_Grotesk'] text-xl font-bold">{value}</p><p className="mt-1 text-[11px] leading-4 text-[#78857c]">{label}</p></div>)}</div></Panel>
}

function ActivityCard({ activity }: { activity: AdminActivity[] }) {
  return <Panel title="Live Campus Activity" detail="Most recent platform events" action={<Activity size={19} className="text-[#66826d]" />}>
    {activity.length ? <div className="space-y-4">{activity.slice(0, 5).map((item) => <div className="flex gap-3" key={item.id}><span className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} /><div className="min-w-0"><p className="truncate text-sm font-bold">{item.label}</p><p className="truncate text-xs text-[#65736a]">{item.detail}</p><p className="mt-1 text-[11px] text-[#9aa59e]">{item.time}</p></div></div>)}</div> : <EmptyState text="No activity recorded yet." />}
  </Panel>
}

function OrdersCard({ orders }: { orders: AdminOrderRow[] }) {
  return <Panel title="Recent Orders" detail="Updates whenever order data changes" action={<Link to="/admin/orders" className="text-xs font-bold text-[#526d58]">View all</Link>}>
    {orders.length ? <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="border-b border-[#e7ebe4] text-[10px] uppercase tracking-wider text-[#7c8b80]"><tr><th className="pb-3">Order</th><th className="pb-3">Student</th><th className="pb-3">Items</th><th className="pb-3">Amount</th><th className="pb-3">Status</th><th className="pb-3">Time</th></tr></thead><tbody>{orders.map((order) => <tr className="border-b border-[#eef1ec] last:border-0" key={order.id}><td className="py-3 font-bold">{order.id}</td><td className="py-3">{order.student}</td><td className="py-3 text-[#65736a]">{order.items}</td><td className="py-3 font-bold">₹{order.amount.toLocaleString('en-IN')}</td><td className="py-3"><Status label={order.status} /></td><td className="py-3 text-xs text-[#78857c]">{order.time}</td></tr>)}</tbody></table></div> : <EmptyState text="No orders available yet." />}
  </Panel>
}

function PendingListings({ listings, onStatusChange }: { listings: ReturnType<typeof getPendingListings>; onStatusChange: (id: string, status: 'Approved' | 'Rejected') => void }) {
  return <Panel title="Pending Listings" detail="Review before products go live" action={<span className="rounded-full bg-[#fff1cc] px-2.5 py-1 text-[10px] font-bold text-[#80652a]">{listings.length} pending</span>}>
    {listings.length ? <div className="space-y-3">{listings.map((listing) => <article className="flex gap-3 border-b border-[#eef1ec] pb-3 last:border-0 last:pb-0" key={listing.id}><img src={listing.images[0]} alt="" className="size-14 shrink-0 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{listing.name}</p><p className="mt-1 truncate text-xs text-[#65736a]">{listing.college} · {listing.category}</p><p className="mt-1 text-xs font-bold">₹{listing.price.toLocaleString('en-IN')} <span className="font-normal text-[#78857c]">· {listing.condition}</span></p><div className="mt-2 flex gap-2"><button type="button" onClick={() => onStatusChange(listing.id, 'Approved')} className="flex items-center gap-1 rounded-full bg-[#d9f15b] px-3 py-1.5 text-[11px] font-bold"><Check size={13} />Approve</button><button type="button" onClick={() => onStatusChange(listing.id, 'Rejected')} className="flex items-center gap-1 rounded-full bg-[#fff0ed] px-3 py-1.5 text-[11px] font-bold text-[#a45142]"><X size={13} />Reject</button></div></div></article>)}</div> : <EmptyState text="No pending listings." />}
  </Panel>
}

function Status({ label }: { label: string }) { return <span className={`whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold ${label === 'Completed' ? 'bg-[#e2ecdd] text-[#526d58]' : label === 'Cancelled' ? 'bg-[#fff0ed] text-[#a45142]' : 'bg-[#fff1cc] text-[#80652a]'}`}>{label}</span> }
function EmptyState({ text }: { text: string }) { return <p className="rounded-xl bg-[#f4f6f2] px-4 py-8 text-center text-sm font-semibold text-[#78857c]">{text}</p> }
