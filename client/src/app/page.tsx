"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
    <h1 className="text-4xl">Home Page</h1> 
    I am Rishabh. I am a full stack developer.
    this is e commerce website named ShopWise!.
    
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
    </>

  )
}
