import handleCartClick from "../utils/handleCartClick.js";
import { getCart } from "../utils/storage.js";

export default function renderProductDetails(product) {
  const cart = getCart();

  const image = document.querySelector(".product-img");
  image.src = product.image_url;
  image.alt = product.title;

  const name = document.querySelector(".product-title");
  name.innerHTML = product.title;

  const description = document.querySelector(".product-description");
  description.innerHTML = product.description;

  const price = document.querySelector(".product-price");
  price.innerHTML = product.price + " £";

  document.title = document.title + " | " + product.title;

  const breadcrumb = document.querySelector("#breadcrumbDetail");
  breadcrumb.innerHTML = product.title;

  let cssClass = "add";

  const doesProductExist = cart.find(function (item) {
    return item.id === product.id;
  });

  if (doesProductExist) {
    cssClass = "added";
  }

  let addToCart = document.querySelector(".btn");
  addToCart.classList = cssClass;
  addToCart.dataset.id = product.id;
  addToCart.dataset.title = product.title;
  addToCart.dataset.image = product.image_url;
  addToCart.dataset.price = product.price;

  addToCart.addEventListener("click", handleCartClick);
}
