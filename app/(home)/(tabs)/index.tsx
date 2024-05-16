import { View } from "react-native";
import React from "react";
import { ChannelList } from "stream-chat-expo";
import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/app/providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";

const Chat = () => {
  const { user }: any = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={"/(home)/users"} asChild>
              <FontAwesome5
                name="users"
                size={24}
                color="gray"
                style={{ marginHorizontal: 15 }}
              />
            </Link>
          ),
        }}
      />
      <StatusBar style="dark" />
      <ChannelList
        filters={{ members: { $in: [user.id] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </View>
  );
};

export default Chat;
