import { useAuth } from "@/src/context/authContext";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";


export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Welcome! Please log in
      </Text>
      <Button mode="contained" onPress={login}>
        Log In
      </Button>
    </View>
  );
}
