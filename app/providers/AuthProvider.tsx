import { View, Text } from "react-native";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContext = {
  session: Session | null;
  user: User | undefined;
  profile: any;
};

const AuthContext = createContext<AuthContext>({
  session: null,
  user: undefined,
  profile: null,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (!session?.user) {
      setProfile(undefined);
      return;
    }

    const fetchProfile = async () => {
      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      setProfile(data);
    };

    fetchProfile();
  }, [session?.user]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, user: session?.user, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
