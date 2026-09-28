import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
export function MainLayout() { return <div className="min-h-screen overflow-x-hidden"><Navbar /><main><Outlet /></main><Footer /></div> }