import { Deserializable } from "./deserializable";

export class Product implements Deserializable {

  productId: number;
  productName: string;
  categoryId: number;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}
