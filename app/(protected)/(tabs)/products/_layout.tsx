// app/(protected)/(tabs)/products/_layout.tsx
import { Stack } from "expo-router";

export default function ProductsStackLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            {/* Root: /products */}
            <Stack.Screen
                name="index"
                options={{ title: "Products", headerShown: false }}
            />

            {/* /products/add */}
            <Stack.Screen
                name="add"
                options={{ title: "Add Product", headerShown: false }}
            />

            {/* /products/[id] */}
            <Stack.Screen
                name="[id]"
                options={{ title: "Product Details", headerShown: false }}
            />
        </Stack>
    );
}
