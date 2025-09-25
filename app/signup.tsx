import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function SignupScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Create an Account
      </Text>

      {/* Here you'd put TextInput fields for email/password */}
      <Button mode="contained" style={{ marginBottom: 10 }}>
        Sign Up
      </Button>

      {/* Simple navigation back to login */}
      <Link href="/login">
        <Text>Already have an account? Log in</Text>
      </Link>
    </View>
  );
}
