"use client"
import { start, stop } from "@/redux/features/loading/loadingSlice";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { useDispatch } from "react-redux";
import HomePageCarousel from "@/components/HomePage/HomePageCarousel";
import ProductSection from "@/components/HomePage/ProductSection";


export default function Home() {
  const { data: session } = useSession()
  const banners = [
    { link: '/', image: '/homePageCarousel/banner1.jpeg' },
    { link: '/', image: '/homePageCarousel/banner2.webp' },
    { link: '/', image: '/homePageCarousel/banner3.webp' },
    
  ];

  const products = [
    {
      id: 1,
      name: "Product 1",
      image: "/shopwise.png",
      category: "Category 1",
      price: 10,
      discount: 5,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Product 2",
      image: "/shopwise.png",
      category: "Category 1",
      price: 20,
      rating: 3.5,
    },
    {
      id: 3,
      name: "Product 3",
      image: "/shopwise.png",
      category: "Category 2",
      price: 15,
      discount: 12,
      rating: 4.0,
    },
    {
      id: 4,
      name: "Product 4",
      image: "/shopwise.png",
      category: "Category 2",
      price: 25,
      rating: 2.5,
    },
    {
      id: 5,
      name: "Product 5",
      image: "/shopwise.png",
      category: "Category 3",
      price: 30,
      rating: 4.5,
    },
    {
      id: 6,
      name: "Product 6",
      image: "/shopwise.png",
      category: "Category 3",
      price: 18,
      rating: 3.0,
    },
    {
      id: 7,
      name: "Product 7",
      image: "/shopwise.png",
      category: "Category 3",
      price: 12,
      rating: 4.0,
    },
    {
      id: 8,
      name: "Product 8",
      image: "/shopwise.png",
      category: "Category 4",
      price: 22,
      rating: 4.5,
    },
    {
      id: 9,
      name: "Product 9",
      image: "/shopwise.png",
      category: "Category 4",
      price: 16,
      rating: 3.5,
    },
    {
      id: 10,
      name: "Product 10",
      image: "/shopwise.png",
      category: "Category 5",
      price: 28,
      discount: 8,
      rating: 4.0,
    },
    {
      id: 11,
      name: "Product 11",
      image: "/shopwise.png",
      category: "Category 5",
      price: 14,
      rating: 3.0,
    },
    {
      id: 12,
      name: "Product 12",
      image: "/shopwise.png",
      category: "Category 5",
      price: 32,
      rating: 4.5,
    },
    {
      id: 13,
      name: "Product 13",
      image: "/shopwise.png",
      category: "Category 5",
      price: 26,
      rating: 4.5,
    },
    {
      id: 14,
      name: "Product 14",
      image: "/shopwise.png",
      category: "Category 6",
      price: 19,
      rating: 3.5,
    },
    {
      id: 15,
      name: "Product 15",
      image: "/shopwise.png",
      category: "Category 6",
      price: 17,
      rating: 3.0,
    },
    {
      id: 16,
      name: "Product 16",
      image: "/shopwise.png",
      category: "Category 6",
      price: 24,
      discount: 10,
      rating: 4.5,
    },
    {
      id: 17,
      name: "Product 17",
      image: "/shopwise.png",
      category: "Category 7",
      price: 31,
      rating: 4.0,
    },
    {
      id: 18,
      name: "Product 18",
      image: "/shopwise.png",
      category: "Category 7",
      price: 23,
      rating: 3.5,
    },
    {
      id: 19,
      name: "Product 19",
      image: "/shopwise.png",
      category: "Category 7",
      price: 29,
      rating: 4.5,
    },
    {
      id: 20,
      name: "Product 20",
      image: "/shopwise.png",
      category: "Category 8",
      price: 13,
      rating: 3.5,
    },
    {
      id: 21,
      name: "Product 21",
      image: "/shopwise.png",
      category: "Category 8",
      price: 27,
      rating: 4.0,
    },
    {
      id: 22,
      name: "Product 22",
      image: "/homePageCarousel/banner1.jpeg",
      category: "Category 1",
      price: 21,
      discount: 15,
      rating: 4.5,
    },
    {
      id: 23,
      name: "Product 23",
      image: "/shopwise.png",
      category: "Category 1",
      price: 11,
      rating: 3.5,
    },
    {
      id: 24,
      name: "Product 24",
      image: "/shopwise.png",
      category: "Category 1",
      price: 33,
      rating: 4.0,
    },
    {
      id: 25,
      name: "Product 25",
      image: "/shopwise.png",
      category: "Category 1",
      price: 9,
      rating: 3.5,
    },
  ];

  const groupedProducts: { [key: string]: any[] } = products.reduce((result, product) => {
    if (!result[product.category]) {
      result[product.category] = [];
    }
    result[product.category].push(product);
    return result;
  }, {} as { [key: string]: any[] });
  
  
  
  
  const dispatch = useDispatch()
  function load(){
    dispatch(start())
    setTimeout(() => {
      dispatch(stop())
    }, 2000);
  }
  return (
    <>
    <div className="flex flex-col h-screen justify-between">
      <div>
        <HomePageCarousel  products={banners} />
      
        <div className="container mx-auto py-8">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold uppercase">Our Featured Products</h1>
          </div>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <ProductSection key={category} title={category} products={products} />
      ))}
    </div>


    {/* Extra Stuff */}

        <Link href={"/product/123"} className="border p-1">Product Page Here</Link><br/>
        <br></br>
        {session ? (
          <>
            Signed in as {session?.user?.email} <br />
            <button className="border p-1" onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button className="border p-1" onClick={() => signIn()}>Sign in</button>
          </>
        )}
        <br></br>
        <br></br>
        <button className="border p-1" onClick={()=> load() }>Loading for 2s</button>
        <br></br>
      </div>
    </div>
    </>

  )
}
