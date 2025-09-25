import { useAuth } from "@/src/context/authContext";
import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";


export default function SignupScreen() {
  const { login } = useAuth(); // simulate login after signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // In a real app, create account before logging in
    console.log("Signing up with:", { email, password });
    login();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20, textAlign: "center" }}>
        Create an Account
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

      <Button mode="contained" onPress={handleSignup} style={{ marginBottom: 10 }}>
        Sign Up
      </Button>

      <Link href="/login" style={{ alignSelf: "center", marginTop: 10 }}>
        <Text>Already have an account? Log In</Text>
      </Link>
    </View>
  );
}
