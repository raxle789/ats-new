"use client";

import { useContext, useState, createContext, useEffect } from "react";
import { getUserSession } from ".";
// import { JwtPayload } from "jsonwebtoken";

type AppSession = {
  session: { name?: string, value?: string }[];
  fetchSession?: () => Promise<void>;
}

const SessionContext = createContext<any>(undefined);

export default function AppSession({ children } : { children: React.ReactNode }) {
  const [session, setSession] = useState(undefined);

  /* FETCH TO GET SESSION */
  // const getSession = async () => {
  //   const response = await fetch('api/sessions', {
  //     method: 'GET'
  //   });

  //   const body = await response.json();
  //   console.log('body server-side', body);

  //   setSession(body);
  // };

  // useEffect(() => {
  //   getSession();
  // }, []);

  return (
    <SessionContext.Provider value={{
      session,
      // getSession
    }
    }>
      {children}
    </SessionContext.Provider>
  );
};

export function useAppSessionContext() {
  return useContext(SessionContext);
}