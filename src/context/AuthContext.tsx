import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { AuthUser } from '../types'

const demoUser: AuthUser = { name: 'Aarav Mehta', email: 'aarav.mehta@campus.edu', studentId: 'CC-2026-1042', college: 'Riverview Institute', course: 'B.Tech Computer Science', year: '3rd Year', campus: 'North Campus', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=85' }
type RegisterInput = Omit<AuthUser, 'image'>
type AuthContextValue = { user: AuthUser | null; isAuthenticated: boolean; loginDemo: () => void; register: (input: RegisterInput) => void; updateUser: (user: AuthUser) => void; logout: () => void }
const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) { const [user, setUser] = useLocalStorage<AuthUser | null>('campus-auth-user', null); const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), loginDemo: () => setUser(demoUser), register: (input: RegisterInput) => setUser({ ...input, image: demoUser.image }), updateUser: (nextUser: AuthUser) => setUser(nextUser), logout: () => setUser(null) }), [setUser, user]); return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> }
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used inside AuthProvider'); return context }