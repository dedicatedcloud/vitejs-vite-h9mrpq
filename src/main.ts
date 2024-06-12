import './style.css';
import { fetchCartData } from './api/fetchCartData';
import { mapDataToHtml } from './ui/mapDataToHtml';
import { handleQuantity } from './handlers/handleQuantity';

export const renderCart = async () => {
  const target = document.getElementById('app')!;
  try {
    const cartItems = await fetchCartData();
    const { htmlString, totalPrice } = mapDataToHtml(cartItems);
    target.innerHTML = `
      <h1>Shopping Cart</h1>
      <ul class="cart-list">
        ${htmlString}
      </ul>
      <section class="cart-total">
        <div>
          Total Price: GBP £ <span class="cart-total-value">${totalPrice}</span>
        </div>
      </section>
    `;
  } catch (e) {
    target.innerHTML = `
      <h1>Shopping Cart</h1>
      <div class="error-msg" role="alert">
        Some error occurred while fetching the cart
      </div>
    `;
  }
};

(async () => {
  await renderCart();
  // bind events post render
  document.addEventListener('click', handleQuantity);
})();
