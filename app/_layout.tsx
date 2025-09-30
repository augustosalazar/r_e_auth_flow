import { AuthProvider, useAuth } from "@/src/context/authContext";
import { ProductProvider } from "@/src/features/products/presentation/context/productContext";
import { darkTheme, lightTheme } from "@/theme/theme";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";


export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <ProductProvider>
          <AppLayout />
        </ProductProvider>
      </AuthProvider>
    </PaperProvider>
  );
}


function AppLayout() {
  const { isLoggedIn } = useAuth();

  console.log("User in AppLayout:", isLoggedIn);

  return (
    <Stack initialRouteName="(auth)/login" screenOptions={{ headerShown: false }}>
      {/* Show profile screen if logged in */}
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(protected)/(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(protected)/add" options={{ headerShown: true, headerTitle: "Add Product" }} />
        <Stack.Screen name="(protected)/[id]" options={{ headerShown: true, headerTitle: "Update Product" }} />
      </Stack.Protected>

      {/* Show login screen if not logged in */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
      </Stack.Protected>



    </Stack>
  );
}


