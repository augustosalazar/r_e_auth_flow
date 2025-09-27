import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { ProductLocalDataSource } from "../../src/features/products/data/datasources/ProductLocalDataSource";
import { ProductRepositoryImpl } from "../../src/features/products/data/repositories/ProductRepositoryImpl";
import { AddProductUseCase } from "../../src/features/products/domain/usecases/AddProductUseCase";

const repo = new ProductRepositoryImpl(new ProductLocalDataSource());
const addProduct = new AddProductUseCase(repo);

export default function AddProductScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAdd = async () => {
    await addProduct.execute({
      name,
      description,
      quantity: Number(quantity),
    });
    router.back();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Add Product
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

      <Button mode="contained" onPress={handleAdd}>
        Save
      </Button>
    </View>
  );
}
