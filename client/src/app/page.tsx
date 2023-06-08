"use client"
import Loading from "@/components/Loading";
import { start, stop } from "@/redux/features/loading/loadingSlice";
import { RootState } from "@/redux/store";
import { useSession, signIn, signOut } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const loading = useSelector((state:RootState) => state.loading.value);
  return (
    <>
    <h1 className="text-4xl">Home Page</h1> 
    I am Rishabh. I am a full stack developer.
    this is e commerce website named ShopWise!.
    <br></br>
    
    {session ? (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    ) : (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )}
    <br></br>
    {loading? "1" : "0"}
    <br></br>
    <button onClick={()=> dispatch(start()) }>Start Loading</button>
    <br></br>
    <button onClick={()=> dispatch(stop())}>Stop Loading</button>

    <Loading/>
    </>

  )
}
