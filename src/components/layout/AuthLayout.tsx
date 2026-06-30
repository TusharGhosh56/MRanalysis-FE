import { Outlet } from 'react-router-dom'
import { AuthHeroPanel } from '@/features/auth/components/AuthHeroPanel'

export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <div className="relative lg:w-[45%] xl:w-[42%]">
        <AuthHeroPanel />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 lg:py-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
