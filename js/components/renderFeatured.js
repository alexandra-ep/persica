export default function renderFeatured(productsToRender) {
  const container = document.querySelector(".featured-row");

  let html = "";

  productsToRender.forEach(function (product) {
    if (product.featured === true) {
      html += `<div class="col-auto">
                  <div class="card">
                    <div class="img-featured">
                      <a class="product-img-link" href="product.html?id=${product.id}"><img src=${product.image_url} class="card-img-top product-image" alt="${product.title}"></a>
                    </div>
                      <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="product-price">${product.price} £</p>
                      </div>
                  </div>
                </div>`;
    } else {
      html += "";
    }
  });
  container.innerHTML = html;
}
