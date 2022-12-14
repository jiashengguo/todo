import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NavBar from "components/NavBar";
import { useCurrentUser, UserContext } from "@lib/context";
import AuthGuard from "components/AuthGuard";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";

function AppContent(props: { children: JSX.Element | JSX.Element[] }) {
  const user = useCurrentUser();
  return (
    <AuthGuard>
      <UserContext.Provider value={user}>
        <div className="h-screen flex flex-col">
          <NavBar user={user} />
          {props.children}
        </div>
      </UserContext.Provider>
    </AuthGuard>
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <AppContent>
        <div className="flex-grow h-100">
          <Component {...pageProps} />
          {/* <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} /> */}
        </div>
      </AppContent>
    </SessionProvider>
  );
}

export default MyApp;
