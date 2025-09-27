import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export class AddProductUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(data: Omit<Product, "_id">): Promise<Product> {
    return this.repo.addProduct(data);
  }
}
