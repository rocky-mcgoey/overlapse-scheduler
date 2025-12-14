import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const signUp = (email, password, displayName) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({
      email,
      password,
    });

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ session, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
