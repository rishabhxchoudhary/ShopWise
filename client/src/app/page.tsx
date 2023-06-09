"use client"
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading";
import { start, stop } from "@/redux/features/loading/loadingSlice";
import { RootState } from "@/redux/store";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { useDispatch } from "react-redux";


export default function Home() {
  const { data: session } = useSession()
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
        <h1 className="text-4xl">Home Page</h1> 
        I am Rishabh. I am a full stack developer.
        this is e commerce website named ShopWise!.
        <br></br>
        <br></br>

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
