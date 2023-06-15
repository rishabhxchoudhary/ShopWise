"use client"
import { start, stop } from "@/redux/features/loading/loadingSlice";
// import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux";
import HomePageCarousel from "@/components/HomePage/HomePageCarousel";
import ProductSection from "@/components/HomePage/ProductSection";
import { useEffect, useState } from "react";


export default function Home() {
  // const { data: session } = useSession()
  const banners = [
    { link: '/', image: '/homePageCarousel/banner1.jpeg' },
    { link: '/', image: '/homePageCarousel/banner2.webp' },
    { link: '/', image: '/homePageCarousel/banner3.webp' },
    
  ];
  const dispatch = useDispatch()

  const [groupedProducts, setGroupedProducts] = useState<{ [key: string]: any[] }>({})
  useEffect(() => {
    async function getData(){
      dispatch(start());
      const res = await fetch('/api/home');
      const data = await res.json();
      const products = data.data;
      setGroupedProducts(products);
      dispatch(stop());
    }
    getData();
  },[])


  return (
      <div className="flex flex-col justify-between">
        <div>
          <HomePageCarousel  products={banners} />
        
          <div className="container mx-auto py-8">
            <div className="flex justify-center">
              <h1 className="text-2xl font-bold uppercase">Our Featured Products</h1>
            </div>
        {groupedProducts && Object.entries(groupedProducts).map(([category, products]) => (
          <ProductSection key={category} title={category} products={products} />
        ))}
      </div>
        </div>
      </div>
  )
}
