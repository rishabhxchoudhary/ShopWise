"use client"
import Link from 'next/link'
import style from './navbar.module.css'
import { useRouter } from 'next/navigation'

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"


import { Search, Person, ShoppingCart } from '@mui/icons-material'
import MobileNavbar from './MobileNavbar';


export default function Navbar() {

  const { data: session } = useSession()
  const [searchActive, setSearchActive] = useState(false)
  const [categoryActive, setCategoryActive] = useState(false)
  const [accountActive, setAccountActive] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const [groupedProducts, setGroupedProducts] = useState<{ [key: string]: any[] }>({})
  useEffect(() => {
    async function getData(){
      const res = await fetch('/api/home');
      const data = await res.json();
      const products = data.data;
      setGroupedProducts(products);
    }
    getData();
  },[])

  const searchFocus = () => {
    setSearchActive(!searchActive)
  }

  const accountFocus = () => {
    setAccountActive(!accountActive)
  }

  const searchBlur = () => {
    setSearchActive(false)
  }

  const accountBlur = () => {
    setAccountActive(false)
  }

  const searchHandler = (e: any) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e: any) => {
    // console.log(searchQuery)
    e.preventDefault()
    router.push(`/searchresults/${searchQuery}`)
  }


  return (
    <>

      <div className={`${style.navbar} sticky shadow-lg top-0 z-50`}>
        <div className={style.navbarContainer}>
          <div className={style.navSection}>
            <Link href="/" className={style.navLogo}>
              <span>ShopWise</span>
            </Link>
          </div>
          <div className={style.navSection}>
            <Link href="/sell" className={searchActive ? style.navHide : style.navLink}>
              <span>Sell</span>
            </Link>
            {/* search box with logo */}
            <div className={style.navSearch}>
              <form onSubmit={handleSubmit}>
              <input onFocus={searchFocus} onBlur={searchBlur} onChange={(e) => {searchHandler(e)}} className={searchActive ? style.searchBoxFocus : style.searchBoxBlur} type="text" placeholder="Search Products" name="search" autoComplete='off' />
              <button type="submit"><Search /></button>
              </form>
            </div>
            <div onClick={accountFocus} className={style.navLink}>
              <Person />
              <span>Account</span>
              <div className={accountActive ? style.accountTab : style.navHide}>
                {
                  session ? (
                    <div>
                      <Link href="/orders" className={style.accountTabItem}>
                        <span>Your Orders</span>
                      </Link>
                      <div className={style.accountTabItem}>
                        <div onClick={() => signOut()}>Sign Out</div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className={style.accountTabItem}>
                        <div onClick={() => signIn()}>Sign In</div>
                      </div>
                    </div>
                  )
                }

              </div>
            </div>
            <Link href="/cart" className={style.navLink}>
              <ShoppingCart />
              <span>Cart</span>
            </Link>
          </div>
        </div>
        <div className={style.mobNavbarContainer}>
          <MobileNavbar/>
        </div>

      </div>
    </>
  )
}