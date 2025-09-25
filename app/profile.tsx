import { useAuth } from "@/src/context/authContext";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";


export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Profile Page
      </Text>
      <Button mode="contained" onPress={logout}>
        Log Out
      </Button>
    </View>
  );
}
