'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { validateUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = validateUser(username, password)

    if (user) {
      // Redirigir al dashboard
      localStorage.setItem("user", JSON.stringify(user))
      router.push("/dashboard")
      
    } else {
      setError("Invalid credentials. Try again.")
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block bg-gradient-to-br from-teal-700 to-black">
        <Image
          src="/images/espiral2.png"
          alt="Decoración"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute top-6 left-6">
          <Image src="/images/logoLogin.png" alt="Logo" width={40} height={40} />
        </div>
        <div className="absolute bottom-6 left-6 text-white font-semibold text-xl">
          Dashky
        </div>
      </div>

      <div className="flex items-center justify-center bg-gray-50 p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <p className="text-sm text-gray-500 text-center">
              Access to your Nexchange account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="E-Mail address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-teal-600" />
                  Keep me logged in
                </label>
                <Link href="#" className="text-teal-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
