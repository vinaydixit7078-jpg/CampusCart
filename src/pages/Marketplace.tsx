import { ChevronDown, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { getProductDetails, products } from '../data/products'

const categories = ['All', 'Books', 'Electronics', 'Stationery', 'Hostel Essentials', 'Gaming', 'Accessories', 'Lab Equipment', 'Clothing']
const sortOptions = ['Recommended', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Highest Rated']

export function Marketplace() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') ?? 'All')
  const [condition, setCondition] = useState('All')
  const [campus, setCampus] = useState('All')
  const [minRating, setMinRating] = useState('0')
  const [availability, setAvailability] = useState('All')
  const [maxPrice, setMaxPrice] = useState(5000)
  const [sort, setSort] = useState('Recommended')
  const [showFilters, setShowFilters] = useState(false)

  const conditions = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.condition)))], [])
  const campuses = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => getProductDetails(product).campus)))], [])
  const activeFilterCount = [category !== 'All', condition !== 'All', campus !== 'All', minRating !== '0', availability !== 'All', maxPrice < 5000].filter(Boolean).length

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const results = products.filter((product) => {
      const details = getProductDetails(product)
      const searchText = `${product.name} ${product.category} ${details.description}`.toLowerCase()
      return (!normalizedQuery || searchText.includes(normalizedQuery)) &&
        (category === 'All' || product.category === category) &&
        (condition === 'All' || product.condition === condition) &&
        (campus === 'All' || details.campus === campus) &&
        product.rating >= Number(minRating) &&
        (availability === 'All' || details.availability === availability) &&
        product.price <= maxPrice
    })

    return [...results].sort((first, second) => {
      if (sort === 'Newest') return getProductDetails(second).createdAt.localeCompare(getProductDetails(first).createdAt)
      if (sort === 'Price: Low to High') return first.price - second.price
      if (sort === 'Price: High to Low') return second.price - first.price
      if (sort === 'Highest Rated') return second.rating - first.rating
      return 0
    })
  }, [availability, campus, category, condition, maxPrice, minRating, query, sort])

  function clearFilters() {
    setQuery(''); setCategory('All'); setCondition('All'); setCampus('All'); setMinRating('0'); setAvailability('All'); setMaxPrice(5000); setSort('Recommended')
  }

  const filterPanel = <div className="space-y-7">
    <div><div className="mb-3 flex items-center justify-between"><h2 className="font-['Space_Grotesk'] font-bold">Filters</h2><button type="button" onClick={clearFilters} className="text-xs font-bold text-[#68816e]">Clear all</button></div><div className="h-px bg-[#e7ebe4]" /></div>
    <fieldset><legend className="mb-3 text-sm font-bold">Price range</legend><input type="range" min="0" max="5000" step="50" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full accent-[#17221f]" /><div className="mt-2 flex justify-between text-xs text-[#78857c]"><span>₹0</span><span>Up to ₹{maxPrice.toLocaleString('en-IN')}</span></div></fieldset>
    <fieldset><legend className="mb-3 text-sm font-bold">Category</legend><div className="space-y-2">{categories.slice(1).map((item) => <label key={item} className="flex cursor-pointer items-center gap-2 text-sm text-[#65736a]"><input type="radio" name="filter-category" checked={category === item} onChange={() => setCategory(item)} className="accent-[#17221f]" />{item}</label>)}</div></fieldset>
    <FilterSelect label="Condition" value={condition} options={conditions} onChange={setCondition} />
    <FilterSelect label="Campus" value={campus} options={campuses} onChange={setCampus} />
    <FilterSelect label="Rating" value={minRating} options={['0', '4', '4.5', '4.8']} labels={['Any rating', '4+ stars', '4.5+ stars', '4.8+ stars']} onChange={setMinRating} />
    <FilterSelect label="Availability" value={availability} options={['All', 'Available', 'Reserved']} onChange={setAvailability} />
  </div>

  return <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#7c8b80]">Student community shopping</p><h1 className="mt-2 font-['Space_Grotesk'] text-4xl font-bold sm:text-5xl">Campus Marketplace</h1><p className="mt-3 max-w-xl text-base text-[#78857c]">Find everything you need from your student community.</p></div><div className="rounded-2xl bg-[#d9f15b] px-4 py-3 text-right"><p className="font-['Space_Grotesk'] text-2xl font-bold">{filteredProducts.length}</p><p className="text-xs font-semibold text-[#53613e]">{filteredProducts.length === 1 ? 'listing' : 'listings'} found</p></div></div>
    <div className="mt-8 flex flex-col gap-3"><label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-sm"><Search size={19} className="text-[#7c8b80]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, categories, or descriptions..." className="w-full bg-transparent text-sm outline-none" /><kbd className="hidden rounded-md bg-[#f0f3ee] px-2 py-1 text-[10px] text-[#78857c] sm:block">⌘ K</kbd></label><div className="flex items-center gap-2 overflow-auto pb-1">{categories.map((item) => <button type="button" onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${category === item ? 'bg-[#17221f] text-white' : 'bg-white text-[#65736a] hover:bg-[#edf1eb]'}`} key={item}>{item}</button>)}</div></div>
    <div className="mt-10 lg:grid lg:grid-cols-[220px_1fr] lg:gap-10"><div className="mb-5 flex items-center justify-between lg:hidden"><button type="button" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 rounded-full border border-[#d2dbd1] px-4 py-2.5 text-sm font-bold"><SlidersHorizontal size={16} /> Filters {activeFilterCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-[#d9f15b] text-[11px]">{activeFilterCount}</span>}</button><SortSelect sort={sort} setSort={setSort} /></div><aside className={`${showFilters ? 'block' : 'hidden'} mb-8 rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:mb-0 lg:block lg:h-fit`}>{showFilters && <button type="button" onClick={() => setShowFilters(false)} className="mb-5 ml-auto grid size-8 place-items-center rounded-full bg-[#f0f3ee] lg:hidden" aria-label="Close filters"><X size={16} /></button>}{filterPanel}</aside><div><div className="mb-5 hidden items-center justify-between lg:flex"><p className="text-sm text-[#78857c]">Showing curated campus listings</p><SortSelect sort={sort} setSort={setSort} /></div>{filteredProducts.length > 0 ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-[28px] bg-white px-6 py-24 text-center shadow-sm"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#e5eee4]"><Search /></div><h2 className="mt-5 font-['Space_Grotesk'] text-2xl font-bold">No products found.</h2><p className="mt-2 text-sm text-[#78857c]">Try broadening your search or clearing some filters.</p><button type="button" onClick={clearFilters} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#17221f] px-5 py-3 text-sm font-bold text-white"><RotateCcw size={15} />Clear Filters</button></div>}</div></div></section>
}

function FilterSelect({ label, value, options, labels, onChange }: { label: string; value: string; options: string[]; labels?: string[]; onChange: (value: string) => void }) { return <label className="block"><span className="mb-2 block text-sm font-bold">{label}</span><span className="relative block"><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full appearance-none rounded-xl border border-[#e1e7df] bg-[#fbfcf9] px-3 py-2.5 text-sm text-[#526159] outline-none focus:border-[#7e9b83]">{options.map((option, index) => <option value={option} key={option}>{labels?.[index] ?? option}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-3 text-[#78857c]" /></span></label> }
function SortSelect({ sort, setSort }: { sort: string; setSort: (value: string) => void }) { return <label className="relative flex items-center gap-2 text-sm font-semibold text-[#526159]"><span className="hidden sm:inline">Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="appearance-none rounded-full border border-[#d2dbd1] bg-transparent py-2.5 pl-4 pr-9 text-sm outline-none"><>{sortOptions.map((option) => <option value={option} key={option}>{option}</option>)}</></select><ChevronDown size={15} className="pointer-events-none absolute right-3" /></label> }