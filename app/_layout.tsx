import { AuthProvider, useAuth } from "@/src/context/authContext";
import { ProductProvider } from "@/src/features/products/presentation/context/productContext";
import { darkTheme, lightTheme } from "@/theme/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { PaperProvider } from "react-native-paper";



export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;

  console.log("🎨 Renderizando RootLayout");

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

  console.log("🔍 Layout cargado - isLoggedIn:", isLoggedIn);

  if (isLoggedIn === null || isLoggedIn === undefined) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="(protected)/(tabs)" />
            <Stack.Screen name="(protected)/add" />
            <Stack.Screen name="(protected)/[id]" />
          </>
        ) : (
          <>
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/signup" />
          </>
        )}
      </Stack>
    </>
  );
}
