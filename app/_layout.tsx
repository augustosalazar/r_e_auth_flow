import { AuthProvider, useAuth } from "@/src/context/authContext";
import { ProductProvider } from "@/src/features/products/presentation/context/productContext";
import { Stack } from "expo-router";


function RootLayout() {
  const { user } = useAuth();

  return (
    <Stack>
      {/* Show login screen if not logged in */}
      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Show profile screen if logged in */}
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="products" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutWithProvider() {
  return (
    <AuthProvider>
      <ProductProvider>
        <RootLayout />
      </ProductProvider>
    </AuthProvider>
  );
}
