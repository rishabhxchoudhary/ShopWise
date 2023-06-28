import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, Close, Person, ShoppingCart } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';


const MobileNavbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const { data: session } = useSession()

    const router = useRouter()

    const handleOpen = () => {
        setIsOpen(!isOpen);
        setIsAccountOpen(false);
    };

    const handleSearchOpen = () => {
        setIsSearchOpen(true);
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
    };

    const handleAccountOpen = () => {
        setIsAccountOpen(!isAccountOpen);
    };

    const handleAccountClose = () => {
        setIsAccountOpen(false);
    };

    const searchHandler = (e: any) => {
        setSearchQuery(e.target.value)
    }

    const handleSubmit = (e: any) => {
        // console.log(searchQuery)
        e.preventDefault()
        router.push(`/searchresults/${searchQuery}`)
    }

    return (
        <div className="relative">
            <div className="flex items-center gap-3 p-4 text-xl">
                {isSearchOpen ? (
                    <div className="flex items-center w-full bg-white rounded-md px-2">
                        <form onSubmit={handleSubmit} className="flex items-center w-full bg-white rounded-md px-2">
                        <input
                            type="text"
                            placeholder="Search Products"
                            className="w-full outline-none bg-transparent"
                            onChange={searchHandler}
                            autoComplete='off'
                        />
                        <button className="ml-2" type='submit'>
                            <Search />
                        </button>
                        </form>
                        <button className="ml-2" onClick={handleSearchClose}>
                            <Close />
                        </button>
                    </div>
                ) : (
                    <>
                        <Link href="/" className="text-lg font-bold flex-1">ShopWise</Link>
                        <button className="text-xl" onClick={handleSearchOpen} >
                            <Search />
                        </button>
                    </>
                )}
                <button className="text-xl" onClick={handleOpen}>
                    <Menu />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute top-full left-0 right-0 bg-white rounded-lg p-4 shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col gap-6">
                            <Link href='/sell' className="flex items-center gap-2">
                                <ShoppingCart />
                                Sell
                            </Link>
                            <button className="flex items-center gap-2" onClick={handleAccountOpen}>
                                <Person />
                                Account
                            </button>
                            <Link href='/cart' className="flex items-center gap-2">
                                <ShoppingCart />
                                Cart
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isAccountOpen && (
                    <motion.div
                        className="absolute top-full left-0 right-0 bg-white rounded-lg p-4 shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col gap-4">
                            <button onClick={handleAccountClose} className="flex items-center gap-2">
                                <Close />
                                Back
                            </button>{
                                session ? (
                                    <>
                                        <Link href="/orders">Your Orders</Link>
                                        <button onClick={()=>signOut()}>Sign Out</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={()=>signIn()}>Sign In</button>
                                    </>
                                )
                            }
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileNavbar;
