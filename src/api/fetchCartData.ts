import { fetchData } from '../utils/fetchData';
import { CartItem } from '../ui/mapDataToHtml';
import { CartData, DataError } from '../models/models';

export const fetchCartData = async (): Promise<CartItem[]> => {
  try {
    const data = await fetchData<CartData>('https://fakestoreapi.com/carts/2');
    if (data instanceof DataError) {
      throw new Error(data.reason);
    }
    const cartData = new CartData(data);
    const cartItems: CartItem[] = await Promise.all(
      cartData.products.map(async (product) => {
        const data = await fetchData<CartItem>(
          `https://fakestoreapi.com/products/${product.productId}`
        );
        if (data instanceof DataError) {
          throw new Error(data.reason);
        }
        return { ...product, ...data };
      })
    );
    return cartItems;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
