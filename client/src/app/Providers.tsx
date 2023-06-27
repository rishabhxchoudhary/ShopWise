"use client";

import { store } from "../redux/store";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";
import { useCookies } from "react-cookie";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <SessionProvider>
          <SessionProvider2>{children}</SessionProvider2>
        </SessionProvider>
      </Provider>
    </>
  );
}

const SessionContext = React.createContext(null);

export const SessionProvider2 = ({ children }: any) => {
  const { data: session, status } = useSession();

  const [cookies, setCookie, removeCookie] = useCookies(["uuid"]);

  React.useEffect(() => {
    const getCart = async () => {
      const data = await fetch("/api/cart/create", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await data.json();
      setCookie("uuid", json.data, { path: "/" });
    };

    if (status == "unauthenticated") {
      if (cookies.uuid) {
        // do nothing
      } else {
        getCart();
      }
    } else if (status == "authenticated") {
      if (cookies.uuid) {
        // merge the card and remove this uuid.

        removeCookie("uuid", { path: "/" });
      } else {
        // do nothing.
      }
    }
    console.log("UUID: ", cookies.uuid);
  }, [session, status, setCookie, cookies.uuid, removeCookie]);

  return (
    <SessionContext.Provider value={null}>{children}</SessionContext.Provider>
  );
};
