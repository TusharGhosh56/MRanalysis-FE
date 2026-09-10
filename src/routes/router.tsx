import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { AppLayout } from '@/components/layout/AppLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { AnalysisReportDetailPage } from '@/pages/AnalysisReportDetailPage'
import { AnalysisReportsPage } from '@/pages/AnalysisReportsPage'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { LegacyRepositoryRedirect } from '@/routes/LegacyRepositoryRedirect'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <LandingPage /> },
          {
            element: <ProtectedRoute />,
            children: [
              { path: 'reports', element: <AnalysisReportsPage /> },
              { path: 'reports/:id', element: <AnalysisReportDetailPage /> },
              {
                path: 'repositories/:id',
                element: <LegacyRepositoryRedirect />,
              },
            ],
          },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ],
  },
])
