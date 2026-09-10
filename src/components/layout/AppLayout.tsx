import { Outlet } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'
import { AppFooter } from '@/components/layout/AppFooter'

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-[#07090e] text-slate-100">
      <AppHeader />
      <main className="w-full flex-1 pb-12">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}
