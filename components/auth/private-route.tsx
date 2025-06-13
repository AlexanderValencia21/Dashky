'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login')
    } else {
      setChecking(false)
    }
  }, [])

  if (checking) return null // O spinner opcional

  return <>{children}</>
}
