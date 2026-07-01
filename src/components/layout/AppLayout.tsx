import { Outlet } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="w-full flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
