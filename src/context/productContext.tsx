import React, { createContext, ReactNode, useContext, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
};

type ProductContextType = {
  products: Product[];
  addProduct: (name: string, price: number) => void;
  removeProduct: (id: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Bike", price: 1200 },
    { id: "2", name: "Helmet", price: 100 },
  ]);

  const addProduct = (name: string, price: number) => {
    const newProduct = { id: Date.now().toString(), name, price };
    setProducts((prev) => [...prev, newProduct]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProducts must be used inside ProductProvider");
  }
  return ctx;
}
