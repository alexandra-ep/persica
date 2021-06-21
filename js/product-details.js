import { api } from "./constants/api.js";
import displayMessage from "./components/common/displayMessage.js";
import renderProductDetails from "./components/renderProductDetails.js";
import menu from "./components/common/menu.js";

menu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id;

if (params.has("id")) {
  id = params.get("id");
} else {
  document.location.href = "products.html";
}

const productDetailsUrl = `${api}/products/${id}`;

async function fetchProductDetails() {
  try {
    const response = await fetch(productDetailsUrl);
    const json = await response.json();
    const product = json;

    renderProductDetails(product);
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occurred", ".product");
  }
}

fetchProductDetails();
