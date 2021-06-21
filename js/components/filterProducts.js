import renderProducts from "./renderProducts.js";

export default function filterProducts(products) {
  const search = document.querySelector("input#products");

  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
      if (product.title.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });
    renderProducts(filteredProducts);
  };
}
