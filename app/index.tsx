import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router } from "expo-router";

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  return <Redirect href={"/(auth)/login"} />;
};

export default WelcomeScreen;
