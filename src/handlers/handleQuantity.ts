import {
  updateQuantity,
  updatePrice,
  getCurrentPrice,
  updateButton,
  getElement,
  getItemValue,
  setItemValue,
} from '../utils/dom';

export function handleQuantity(event: Event) {
  const target = event.target;
  let factor = 0;
  if (target instanceof HTMLElement) {
    const qtyBtn = target.closest('button');
    if (qtyBtn) {
      factor = qtyBtn.classList.contains('cart-item-decr') ? -1 : 1;
      const { productId, unitPrice } = qtyBtn.dataset;
      if (productId) {
        const updatedQty = updateQuantity(productId, factor);
        const currentPrice = getCurrentPrice(productId);
        const updatedPrice = updatePrice(
          productId,
          +(unitPrice as string),
          updatedQty
        );
        updateButton(
          getElement(
            '.cart-item-decr',
            qtyBtn.parentElement
          ) as HTMLButtonElement | null,
          updatedQty
        );
        const totalQty = getItemValue('.cart-total-value');
        setItemValue(
          '.cart-total-value',
          totalQty - currentPrice + updatedPrice
        );
      }
    }
  }
}
