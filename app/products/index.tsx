import { useAuth } from "@/src/context/authContext";
import { useProducts } from "@/src/context/productContext";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { Appbar, Button, FAB, List } from "react-native-paper";

export default function ProductList() {
  const { products, addProduct, removeProduct } = useProducts();
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`$${item.price}`}
            right={() => (
              <Button onPress={() => removeProduct(item.id)}>Delete</Button>
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
        onPress={() =>
          addProduct("New Item", Math.floor(Math.random() * 100))
        }
      />
    </View>
  );
}
