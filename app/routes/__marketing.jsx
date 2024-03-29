import { Outlet } from '@remix-run/react'
import marketingStyles from '~/styles/marketing.css'
import MainHeader from '~/components/navigation/MainHeader'
import { getUserFromSession } from '~/data/auth.server'

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  )
}

export async function loader({ request }) {
  return await getUserFromSession(request)
}

export function links() {
  return [{ rel: 'stylesheet', href: marketingStyles }]
}

export function headers() {
  return {
    'Cache-Control': 'max-age=3600' // 60 minutes
  }
}
