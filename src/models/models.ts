// models.ts
// Data model for CartData
export type RawCartItem = {
  productId: number;
  quantity: number;
};

interface ICartData {
  products: RawCartItem[];
}

export class CartData implements ICartData {
  public products: RawCartItem[];
  constructor(data: ICartData) {
    this.products = data.products;
  }
}

// Data model for error
export class DataError {
  constructor(public error: string, public reason: string) {}
}
