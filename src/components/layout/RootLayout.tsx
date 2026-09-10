import { Outlet } from 'react-router-dom'
import { TopProgressBar } from '@/components/ui/TopProgressBar'

export function RootLayout() {
  return (
    <>
      <TopProgressBar />
      <Outlet />
    </>
  )
}
