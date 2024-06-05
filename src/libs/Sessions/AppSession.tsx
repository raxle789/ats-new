'use client';

import { useContext, createContext } from 'react';
// import { getUserSession } from ".";
import { getCookies } from 'cookies-next';

const SessionContext = createContext<any>(undefined);

export default function AppSession({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [session, setSession] = useState<any>();

  /* GET BOTH -> Server and Client Session */
  /**
   * Code here
   */
  const cookies = getCookies(); // getting all cookies.

  return (
    <SessionContext.Provider value={cookies}>
      {children}
    </SessionContext.Provider>
  );
}

export function useAppSessionContext() {
  return useContext(SessionContext);
}
