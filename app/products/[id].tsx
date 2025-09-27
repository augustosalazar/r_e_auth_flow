import { useProducts } from "@/src/context/productContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function UpdateProductScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getProduct, updateProduct } = useProducts();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (id) {
      const product = getProduct(id);
      if (product) {
        setName(product.name);
        setDescription(product.description);
        setQuantity(product.quantity.toString());
      }
    }
  }, [id]);

  const handleUpdate = () => {
    updateProduct({
      id: id!,
      name,
      description,
      quantity: Number(quantity),
    });
    router.back();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Update Product
      </Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 12 }}
      />

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={{ marginBottom: 12 }}
      />

      <TextInput
        label="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={{ marginBottom: 12 }}
      />

      <Button mode="contained" onPress={handleUpdate}>
        Update
      </Button>
    </View>
  );
}
