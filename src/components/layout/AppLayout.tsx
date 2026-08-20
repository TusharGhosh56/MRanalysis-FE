import { Outlet } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'
import { AppFooter } from '@/components/layout/AppFooter'

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-[#05070c] text-slate-100">
      <AppHeader />
      <main className="w-full flex-1 px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}
