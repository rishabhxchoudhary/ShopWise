"use client"
import Link from 'next/link'
import Image from 'next/image'
import style from '../style/navbar.module.css'
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"


import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function Navbar() {

    const { data: session } = useSession()
    const [searchActive, setSearchActive] = useState(false)
    const [categoryActive, setCategoryActive] = useState(false)
    const [accountActive, setAccountActive] = useState(false)

    const categories = [
        {
            name: "Electronics",
            photo: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2402&q=80"
        },
        {
            name: "Clothing",
            photo: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2402&q=80"
        },
        {
            name: "Home",
            photo: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2402&q=80"
        },
        {
            name: "Toys",
            photo: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2402&q=80"
        },
        {
            name: "Sports",
            photo: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2402&q=80"
        },
        {
            name: "Books",
            photo: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2402&q=80"
        },
    ]

    const searchFocus = () => {
        setSearchActive(true)
        setCategoryActive(false)
        setAccountActive(false)
    }

    const categoryFocus = () => {
        setCategoryActive(!categoryActive)
    }

    const accountFocus = () => {
        setAccountActive(!accountActive)
    }

    const searchBlur = () => {
        setSearchActive(false)
    }

    const categoryBlur = () => {
        setCategoryActive(false)
    }

    const accountBlur = () => {
        setAccountActive(false)
    }

    return (
        <>

            <div className={style.navbar}>
                <div className={style.navbarContainer}>
                    <div className={style.navSection}>
                        <Link href="/" className={style.navLogo}>
                            <span>ShopWise</span>
                        </Link>
                    </div>
                    <div className={style.navSection}>
                        <Link onClick={categoryFocus} onBlur={categoryBlur} href="/" className={searchActive ? style.navHide : style.navLink}>
                            <span>Categories</span>
                            <KeyboardArrowDownIcon />
                            <div className={categoryActive ? style.categoryDrop : style.navHide}>
                                {
                                    categories.map((category, index) => (

                                        <div className={style.categoryDropItem} key={index}>
                                            <Image src={category.photo} alt={category.name} width={70} height={70} />
                                            <span>{category.name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </Link>
                        <Link href="/" className={searchActive ? style.navHide : style.navLink}>
                            <span>Link 1</span>
                        </Link>
                        <Link href="/" className={searchActive ? style.navHide : style.navLink}>
                            <span>Link 2</span>
                        </Link>
                        <Link href="/" className={searchActive ? style.navHide : style.navLink}>
                            <span>Link 3</span>
                        </Link>
                        {/* search box with logo */}
                        <div className={style.navSearch}>
                            <input onFocus={searchFocus} onBlur={searchBlur} className={searchActive ? style.searchBoxFocus : style.searchBoxBlur} type="text" placeholder="Search Products" name="search" autoComplete='off' />
                            <button type="submit"><SearchIcon />
                            </button>
                        </div>
                        <Link onClick={accountFocus} onBlur={accountBlur} href="/" className={style.navLink}>
                            <PersonIcon />
                            <span>Account</span>
                            <div className={accountActive ? style.accountTab : style.navHide}>
                                {
                                    session ? (
                                        <div>
                                        <div className={style.accountTabItem}>
                                            <span>Your Orders</span>
                                        </div>
                                        <div className={style.accountTabItem}>
                                            <div onClick={()=>signOut()}>Sign Out</div>
                                        </div>
                                        </div>
                                    ) : (
                                        <div>
                                        <div className={style.accountTabItem}>
                                            <div onClick={()=>signIn()}>Sign In</div>
                                        </div>
                                        </div>
                                    )
                                }

                            </div>
                        </Link>
                        <Link href="/" className={style.navLink}>
                            <ShoppingCartIcon />
                            <span>Cart</span>
                        </Link>
                    </div>
                </div>

            </div>


        </>
    )
}