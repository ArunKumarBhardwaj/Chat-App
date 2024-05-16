import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useChatContext } from "stream-chat-expo";
import { useAuth } from "../providers/AuthProvider";
import { router } from "expo-router";

const UserListItem = ({ user }: any) => {
  const { client } = useChatContext();
  const { user: me } = useAuth();

  const onPress = async () => {
    //start a chat with him
    const channel = client.channel("messaging", {
      members: [me?.id, user.id],
    });
    await channel.watch();
    router.replace(`/(home)/channel/${channel.cid}`);
  };
  return (
    <Pressable onPress={onPress} style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{user.full_name ?? "User"}</Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },

  textContainer: {
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
