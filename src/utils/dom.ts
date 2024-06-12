export const getElement = (
  selector: string,
  $ref?: Document | HTMLElement | null
) => ($ref ? $ref : document).querySelector(selector);

export const getItemValue = (selector: string) => {
  const elem = getElement(selector);
  const value = +(elem?.textContent as string);
  return !Number.isNaN(value) ? value : -1;
};

export const setItemValue = (selector: string, value: number) => {
  const elem = getElement(selector);
  if (elem) {
    elem.textContent = `${value}`;
  }
};

export const updateQuantity = (id: string, factor: number) => {
  const $ref = `#product-qty-${id}`;
  const currentQty = getItemValue($ref);
  let newQuantity = currentQty + factor;
  if (newQuantity < 0) {
    newQuantity = 0;
  }
  setItemValue($ref, newQuantity);
  return newQuantity;
};

export const getCurrentPrice = (id: string) => {
  const price = getItemValue(`#product-price-${id} > span`);
  return price > -1 ? price : 0;
};

export const updatePrice = (id: string, unitPrice: number, qty: number) => {
  const newPrice = unitPrice * qty;
  setItemValue(`#product-price-${id} > span`, newPrice);
  return newPrice;
};

export const updateButton = ($btn: HTMLButtonElement | null, qty: number) => {
  if ($btn) {
    if (qty === 1) {
      $btn.setAttribute('disabled', 'disabled');
    } else {
      $btn.removeAttribute('disabled');
    }
  }
};
