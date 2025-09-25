import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { useAuth } from "@/src/context/authContext";
import { Link } from "expo-router";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // In a real app, validate credentials before logging in
    console.log("Logging in with:", { email, password });
    login();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20, textAlign: "center" }}>
        Welcome! Please log in
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 12 }}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20 }}
      />

      <Button mode="contained" onPress={handleLogin} style={{ marginBottom: 10 }}>
        Log In
      </Button>

      <Link href="/signup" style={{ alignSelf: "center", marginTop: 10 }}>
        <Text>Don’t have an account? Sign Up</Text>
      </Link>
    </View>
  );
}
