"use client"

import { store } from "../redux/store"
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
        </>
    )
}