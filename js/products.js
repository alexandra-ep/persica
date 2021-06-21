import { api } from "./constants/api.js";
import displayMessage from "./components/common/displayMessage.js";
import renderProducts from "./components/renderProducts.js";
import filterProducts from "./components/filterProducts.js";
import menu from "./components/common/menu.js";

menu();

async function fetchProducts() {
  const url = api + "/products";

  try {
    const response = await fetch(url);
    const json = await response.json();
    const products = json;

    renderProducts(products);
    filterProducts(products);
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occurred", ".products");
  }
}

fetchProducts();
