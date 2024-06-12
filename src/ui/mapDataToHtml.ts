export type CartItem = {
  quantity: number;
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export const mapDataToHtml = (cartItems: CartItem[]) => {
  let htmlString = '';
  let totalPrice = 0;
  cartItems.forEach((item) => {
    htmlString += `
      <li role="presentation" class="cart-item">
        <div class="cart-image-wrapper">
          <img 
            src="${item.image}" 
            alt="Image for ${item.title}" 
            class="cart-image" 
          />
        </div>
        <h2 class="cart-item-title">${item.title}</h2>
        <p class="cart-item-description">${item.description}</p>
        <p class="cart-item-price" id="product-price-${item.id}">
          GBP £ <span>${item.price * item.quantity}</span>
        </p>
        <div class="cart-item-btn-group">
          <button 
            type="button" 
            class="cart-item-decr" 
            data-product-id="${item.id}" 
            data-unit-price="${item.price}"
            ${item.quantity === 0 ? 'disabled' : ''}
          >-</button>
          <span id="product-qty-${item.id}">${item.quantity}</span>
          <button 
            type="button" 
            class="cart-item-incr" 
            data-product-id="${item.id}" 
            data-unit-price="${item.price}"
          >+</button>
        </div>
      </li>
    `;
    totalPrice += item.price * item.quantity;
  });
  return { htmlString, totalPrice };
};
