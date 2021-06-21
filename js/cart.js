import { getCart } from "./utils/storage.js";
import displayMessage from "./components/common/displayMessage.js";
import { EMPTY_CART } from "./constants/messages.js";
import menu from "./components/common/menu.js";

menu();

export default function createCartItems() {
  const cartItems = getCart();
  const container = document.querySelector(".cart");

  if (cartItems.length === 0) {
    displayMessage("", EMPTY_CART, ".cart");
  }

  cartItems.forEach((product) => {
    container.innerHTML += `<div class="row cart-row">
                                <div class="col-auto">
                                    <div class="img-product">
                                    <a class="product-img-link" href="product.html?id=${product.id}"><img src=${product.image} class="card-img-top product-img" alt="${product.title}"></a>
                                </div>
                            </div>
                                <div class="col-auto">
                                    <h2 class="product-title">${product.title}</h2>
                                </div>
                                <div class="col-auto">
                                    <h2 class="product-price">${product.price} £</h2>
                                </div>
                            </div>
                            <hr>`;
  });
}

function subtotal() {
  // subtotal
  let cartItems = getCart();
  let subtotal = document.querySelector(".subtotal");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    let price = parseFloat(cartItems[i].price);

    total += price;
  }
  subtotal.innerHTML = total + " £";

  // total
  const shippingPrice = 5;
  let shipping = document.querySelector(".shipping");
  shipping.innerHTML = shippingPrice + " £";

  let totalPrice = document.querySelector(".total");

  if (total === 0) {
    shipping.innerHTML = 0 + " £";
  } else {
    totalPrice.innerHTML = total + shippingPrice + " £";
  }
}

subtotal();
createCartItems();
