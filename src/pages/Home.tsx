import { ArrowRight, BookOpen, Camera, Handshake, MoveUpRight, PackageOpen, Printer, RefreshCw, Search, Sparkles, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { categories, products, rentalProducts } from '../data/products'

const services = [
  { name: 'Laptop Repair', detail: 'Fast fixes from people who know their way around a motherboard.', icon: Wrench, color: '#dce8f1' },
  { name: 'Printing', detail: 'Print notes, posters, and project work without the queue.', icon: Printer, color: '#f5e5c4' },
  { name: 'Tutoring', detail: 'Find a study partner for the subject you are stuck on.', icon: BookOpen, color: '#dcebdc' },
  { name: 'Photography', detail: 'Make your club, portfolio, or graduation moment look great.', icon: Camera, color: '#f0dce3' },
  { name: 'Graphic Design', detail: 'Get a polished poster, logo, or presentation deck.', icon: Sparkles, color: '#e4def2' },
]

const steps = [
  { number: '01', title: 'Find what you need', detail: 'Browse useful things, services, and campus deals.' },
  { number: '02', title: 'Choose a product or service', detail: 'Compare the details, condition, rating, and price.' },
  { number: '03', title: 'Connect with the student/provider', detail: 'Message a real person in your campus community.' },
  { number: '04', title: 'Complete your transaction', detail: 'Meet up, collect your item, and keep campus moving.' },
]

export function Home() {
  return <>
    <section className="bg-[#e9eeea] px-5 pb-10 pt-4 sm:px-8 lg:pb-16">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="grid size-12 place-items-center rounded-full text-[#1b2a27]">
            <Search size={30} strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="mx-auto max-w-5xl font-['Space_Grotesk'] text-[3.4rem] font-bold leading-[0.9] tracking-[-0.07em] text-[#17221f] sm:text-[5rem] lg:text-[7.5rem]">
          Your Campus. Your
          <span className="block">Marketplace.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-[#65736a] sm:text-2xl">
          Find something useful, pass something on, and make campus life feel a little more yours.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/marketplace"
            className="inline-flex w-[min(80vw,18rem)] items-center justify-center rounded-full border border-[#1b302b] bg-white px-6 py-4 text-base font-bold text-[#17221f] shadow-sm transition hover:bg-[#edf3ef] sm:w-auto"
          >
            Explore Marketplace
          </Link>
          <Link
            to="/sell"
            className="inline-flex w-[min(80vw,18rem)] items-center justify-center rounded-full bg-[#1b302b] px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#203d35] sm:w-auto"
          >
            Sell an Item
          </Link>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-7 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#7c8b80]">Browse your way</p><h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold">Shop by Category</h2></div><Link to="/marketplace" className="hidden items-center gap-2 text-sm font-bold text-[#526159] sm:flex">View all <ArrowRight size={16} /></Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{categories.map((category) => <Link to={`/marketplace?category=${encodeURIComponent(category.label)}`} key={category.label} className="group rounded-2xl p-4 transition hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: category.color }}><span className="text-3xl" role="img" aria-label={category.label}>{category.icon}</span><p className="mt-6 text-sm font-bold leading-4">{category.label}</p><MoveUpRight size={15} className="mt-3 opacity-0 transition group-hover:opacity-100" /></Link>)}</div></section>

    <section className="border-y border-[#e7ebe4] bg-white/50"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#7c8b80]">Student favorites</p><h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold">Featured Products</h2></div><Link to="/marketplace" className="flex items-center gap-2 text-sm font-bold text-[#526159]">Explore all products <ArrowRight size={16} /></Link></div><div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="grid items-center gap-10 overflow-hidden rounded-[32px] bg-[#d9f15b] p-8 sm:p-12 lg:grid-cols-[.9fr_1.1fr] lg:p-16"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#65733d]">Built for circular campus life</p><h2 className="mt-4 font-['Space_Grotesk'] text-4xl font-bold leading-none tracking-[-.04em] sm:text-5xl">Give Your Old Stuff a New Home.</h2><p className="mt-5 max-w-md leading-7 text-[#53613e]">That textbook, lamp, or camera you no longer need could be exactly what someone down the hall is looking for.</p><Link to="/sell" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#17221f] px-6 py-3.5 text-sm font-bold text-white">Start Selling <ArrowRight size={17} /></Link></div><div className="grid grid-cols-3 gap-3"><div className="rounded-2xl bg-white/65 p-4 sm:p-6"><PackageOpen size={24} /><p className="mt-12 text-sm font-bold">Sell used<br />products</p></div><div className="mt-8 rounded-2xl bg-[#f2e8c8] p-4 sm:p-6"><RefreshCw size={24} /><p className="mt-12 text-sm font-bold">Exchange<br />products</p></div><div className="rounded-2xl bg-[#e6dff0] p-4 sm:p-6"><Handshake size={24} /><p className="mt-12 text-sm font-bold">Rent<br />items</p></div></div></div></section>

    <section className="bg-[#17221f] text-white"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b8c677]">Borrow for less</p><h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold">Rentals for the moments that matter</h2></div><Link to="/rentals" className="flex items-center gap-2 text-sm font-bold text-[#d9f15b]">View all rentals <ArrowRight size={16} /></Link></div><div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">{rentalProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#7c8b80]">More than products</p><h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold">Campus Services</h2></div><Link to="/services" className="flex items-center gap-2 text-sm font-bold text-[#526159]">Discover services <ArrowRight size={16} /></Link></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{services.map(({ name, detail, icon: Icon, color }) => <Link to="/services" key={name} className="group rounded-[24px] p-5 transition hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: color }}><Icon size={24} /><h3 className="mt-10 font-['Space_Grotesk'] text-lg font-bold">{name}</h3><p className="mt-2 text-sm leading-5 text-[#637168]">{detail}</p><ArrowRight size={16} className="mt-5 transition group-hover:translate-x-1" /></Link>)}</div></section>

    <section className="border-y border-[#e7ebe4] bg-[#f0f3ee]"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mx-auto max-w-xl text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#7c8b80]">Simple by design</p><h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold">How CampusCart Works</h2></div><div className="mt-12 grid gap-8 md:grid-cols-4">{steps.map((step, index) => <div key={step.number} className="relative text-center md:text-left"><div className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#d9f15b] font-['Space_Grotesk'] font-bold md:mx-0">{step.number}</div><h3 className="mt-5 font-['Space_Grotesk'] text-lg font-bold">{step.title}</h3><p className="mt-2 text-sm leading-5 text-[#738078]">{step.detail}</p>{index < steps.length - 1 && <ArrowRight className="absolute -right-5 top-6 hidden text-[#aebcaf] md:block" size={18} />}</div>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="relative overflow-hidden rounded-[32px] bg-[#e5e9f3] px-8 py-16 text-center sm:px-12"><div className="absolute -left-10 top-0 size-36 rounded-full bg-white/50" /><div className="absolute -right-12 bottom-[-50px] size-48 rounded-full bg-[#d9f15b]/60" /><Search className="relative mx-auto text-[#536475]" size={28} /><h2 className="relative mt-5 font-['Space_Grotesk'] text-4xl font-bold tracking-[-.04em] sm:text-5xl">Your Campus. Your Marketplace.</h2><p className="relative mx-auto mt-4 max-w-lg text-[#65736a]">Find something useful, pass something on, and make campus life feel a little more yours.</p><Link to="/marketplace" className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-[#17221f] px-6 py-3.5 text-sm font-bold text-white">Explore CampusCart <ArrowRight size={17} /></Link></div></section>
  </>
}