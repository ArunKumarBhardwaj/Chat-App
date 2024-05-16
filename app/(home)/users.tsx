import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import UserListItem from "../components/UserListItem";

export default function UsersScreen() {
  const [users, setUsers] = useState();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error }: any = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user?.id); // exclude me

      setUsers(profiles);
    };
    fetchUsers();
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
}
