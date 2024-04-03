"use client";

import { useContext, useState, createContext, useEffect } from "react";
import { getUserSession } from ".";
// import { JwtPayload } from "jsonwebtoken";

type AppSession = {
  name?: string;
  value?: string;
}

const SessionContext = createContext({});

export default function AppSession({ children } : { children: React.ReactNode }) {
  const [session, setSession] = useState<any>();

  /* FETCH TO GET SESSION */
  // const getSession = async () => {
  //   const response = await fetch('api/sessions', {
  //     method: 'GET'
  //   });

  //   const body = await response.json();
  //   console.log(body);
  //   debugger;
  // };

  // useEffect(() => {
  //   getSession();
  // }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export function useAppSessionContext() {
  return useContext(SessionContext);
}