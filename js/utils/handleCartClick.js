import { getCart, saveCart } from "./storage.js";

export default function handleCartClick(event) {
  event.target.classList.toggle("add");
  event.target.classList.toggle("added");

  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const image = this.dataset.image;

  const cart = getCart();

  const inCart = cart.find(function (item) {
    return item.id === id;
  });

  if (!inCart) {
    const newItem = { id, title, price, image };
    cart.push(newItem);
    saveCart(cart);
  } else {
    const newCart = cart.filter((item) => item.id !== id);
    saveCart(newCart);
  }
}
