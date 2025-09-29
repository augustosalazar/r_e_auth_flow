// app/products/update.tsx
import { useProducts } from "@/src/context/productContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function UpdateProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getProduct, updateProduct } = useProducts();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const product = await getProduct(id);
          if (product) {
            setName(product.name);
            setDescription(product.description);
            setQuantity(product.quantity.toString());
          } else {
            setNotFound(true);
          }
        } catch (err) {
          setNotFound(true);
        }
      }
    })();
  }, [id]);

  const handleUpdate = async () => {
    if (!id) return;
    await updateProduct({
      _id: id,
      name,
      description,
      quantity: Number(quantity),
    });
    router.back();
  };

  if (notFound) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
          Product not found
        </Text>
        <Button mode="contained" onPress={() => router.back()}>
          Go Back
        </Button>
      </View>
    );
  }

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
        Save Changes
      </Button>
    </View>
  );
}
