import { AuthProvider, useAuth } from "@/src/context/authContext";
import { Stack } from "expo-router";


function RootLayout() {
  const { user } = useAuth();

  return (
    <Stack>
      {/* Show login screen if not logged in */}
      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      </Stack.Protected>

      {/* Show profile screen if logged in */}
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="profile" options={{ title: "My Profile" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutWithProvider() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
