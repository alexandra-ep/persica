import displayMessage from "./common/displayMessage.js";
import { NO_RESULTS } from "../constants/messages.js";

export default function renderProducts(productsToRender) {
  const container = document.querySelector(".products-row");

  container.innerHTML = "";

  if (productsToRender.length === 0) {
    displayMessage("", NO_RESULTS, ".products-row");
  }

  productsToRender.forEach(function (product) {
    container.innerHTML += `<div class="col-auto">
                                    <div class="card">
                                        <div class="img-product">
                                            <a class="product-img-link" href="product.html?id=${product.id}"><img src=${product.image_url} class="card-img-top product-image" alt="${product.title}"></a>
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title">${product.title}</h5>
                                            <p class="product-price">${product.price} £</p>
                                        </div>
                                    </div>
                                </div>`;
  });
}
