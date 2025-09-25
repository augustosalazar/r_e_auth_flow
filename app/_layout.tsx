import { AuthProvider, useAuth } from "@/src/context/authContext";
import { Stack } from "expo-router";


function RootLayout() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack>
      {/* Show login screen if not logged in */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Show profile screen if logged in */}
      <Stack.Protected guard={isLoggedIn}>
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
