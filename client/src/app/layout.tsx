import Loading from '@/components/Loading'
import Providers from './Providers'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer/Footer";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShopWise',
  description: 'Shopping made easier',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true} >
        <Providers>
          <Loading/>
          <Navbar/>
          {children}
          <Footer/>
        </Providers>

        </body>
    </html>
  )
}