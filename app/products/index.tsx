import { useAuth } from "@/src/context/authContext";
import { useProducts } from "@/src/context/productContext";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { Appbar, Button, FAB, List } from "react-native-paper";

export default function ProductList() {
  const { products, removeProduct } = useProducts();
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* AppBar with Logout */}
      <Appbar.Header>
        <Appbar.Content title="Products" />
        <Appbar.Action
          icon="logout"
          onPress={() => {
            logout();
            router.replace("/login");
          }}
        />
      </Appbar.Header>

      {/* Product list */}
      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <List.Item
            title={item._id + ": " + item.name}
            description={`Qty: ${item.quantity}`}
            onPress={() => router.push(`/products/${item._id}`)} // 👈 navigate to update
            right={() => (
              <Button onPress={() => removeProduct(item._id)}>Delete</Button>
            )}
          />
        )}
      />

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
        }}
        onPress={() => router.push("/products/add")} // 👈 navigate to add
      />
    </View>
  );
}
