import "./globals.css";
import type { Metadata } from "next";
import {Inter} from 'next/font/google'

const inter =Inter({subsets:['latin']})

export const metadata:Metadata={
  title: 'Dahsky',
  description:'App Dashky'
}

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="es">
      <body className={inter.className+'bg-gray-100 text-gray-900'}>
        {children}
      </body>
    </html>
  )
}