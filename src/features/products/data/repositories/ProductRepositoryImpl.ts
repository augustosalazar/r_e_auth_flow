import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { ProductLocalDataSource } from "../datasources/ProductLocalDataSource";

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private local: ProductLocalDataSource) {}

  getProducts(): Promise<Product[]> {
    return this.local.getProducts();
  }

  getProductById(id: string): Promise<Product | null> {
    return this.local.getProductById(id);
  }

  addProduct(product: Omit<Product, "_id">): Promise<Product> {
    return this.local.addProduct(product);
  }

  updateProduct(product: Product): Promise<Product> {
    return this.local.updateProduct(product);
  }

  deleteProduct(id: string): Promise<void> {
    return this.local.deleteProduct(id);
  }
}
