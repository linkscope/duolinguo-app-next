import dynamic from 'next/dynamic'
import { isAdmin } from '@/lib/admin'
import { redirect } from 'next/navigation'

const AdminApp = dynamic(() => import('./app'), { ssr: false })

export default async function AdminPage() {
  if (!isAdmin()) {
    redirect('/')
  }

  return <AdminApp />
}
