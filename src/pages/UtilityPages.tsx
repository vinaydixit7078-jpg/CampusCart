import { Heart, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { useShop } from '../context/ShopContext'
import { ProductCard } from '../components/ProductCard'

export function SavedPage() {
  const { wishlist } = useShop()
  const items = products.filter((product) => wishlist.includes(product.id))
  return <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="flex items-center gap-3"><div className="grid size-12 place-items-center rounded-2xl bg-[#e5eee4]"><Heart size={22} /></div><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#7c8b80]">Your space</p><h1 className="font-['Space_Grotesk'] text-4xl font-bold">Saved finds</h1></div></div>{items.length ? <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:gap-x-6">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-12 rounded-[28px] bg-white px-6 py-20 text-center shadow-sm"><Heart className="mx-auto text-[#b2beb4]" size={34} /><h2 className="mt-5 font-['Space_Grotesk'] text-2xl font-bold">Nothing saved yet.</h2><p className="mx-auto mt-2 max-w-sm text-sm text-[#78857c]">Tap the heart on anything that catches your eye.</p><Link to="/marketplace" className="mt-6 inline-block rounded-full bg-[#17221f] px-6 py-3 text-sm font-bold text-white">Explore marketplace</Link></div>}</section>
}

export function Profile() { return <section className="mx-auto max-w-2xl px-5 py-20 text-center"><div className="mx-auto grid size-20 place-items-center rounded-full bg-[#d9f15b]"><UserRound size={34} /></div><h1 className="mt-6 font-['Space_Grotesk'] text-4xl font-bold">Your campus profile</h1><p className="mt-3 text-[#78857c]">A friendly home for your listings, swaps, and saved finds.</p><button className="mt-8 rounded-full bg-[#17221f] px-6 py-3 text-sm font-bold text-white">Sign in to continue</button></section> }
export function Login() { return <Profile /> }
export function Sell() { return <Profile /> }