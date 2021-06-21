import menu from "./components/common/menu.js";
import { api } from "./constants/api.js";
import { getToken } from "./utils/storage.js";

const token = getToken();

if (!token) {
  location.href = "index.html";
}

menu();

async function fetchProductsAdmin() {
  const url = api + "/products";

  try {
    const response = await fetch(url);
    const json = await response.json();
    const products = json;

    function renderProductsAdmin(productsToRender) {
      const container = document.querySelector(".products-admin-row");

      container.innerHTML = "";

      productsToRender.forEach(function (product) {
        container.innerHTML += `<div class="col-auto">
                                  <div class="card">
                                    <div class="img-product">
                                      <a class="product-img-link" href="product.html?id=${product.id}"><img src=${product.image_url} class="card-img-top product-image" alt="${product.title}"></a>
                                    </div>
                                    <div class="card-body">
                                      <h5 class="card-title">${product.title}</h5>
                                      <p class="product-price">${product.price} £</p>
                                      <a href="edit.html?id=${product.id}">Edit or Delete</a>
                                    </div>
                                  </div>
                                </div>`;
      });
    }
    renderProductsAdmin(products);
  } catch (error) {
    console.log(error);
  }
}

fetchProductsAdmin();
