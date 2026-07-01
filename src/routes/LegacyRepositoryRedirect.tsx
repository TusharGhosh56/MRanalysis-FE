import { Navigate, useParams } from 'react-router-dom'

export function LegacyRepositoryRedirect() {
  const { id } = useParams<{ id: string }>()
  return <Navigate to={`/reports/${id}`} replace />
}
