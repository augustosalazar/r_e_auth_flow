import { useAuth } from "@/src/context/authContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { isLoggedIn } = useAuth();

  console.log("🧭 Index - isLoggedIn:", isLoggedIn);

  // espera inicialización
  if (isLoggedIn == null) return null;

  return <Redirect href={isLoggedIn ? "/(protected)/(tabs)" : "/(auth)/login"} />;
}