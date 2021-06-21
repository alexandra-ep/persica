// featured toggle
let featured = document.querySelector("#featured");

featured.addEventListener("click", checkFeature);

export function checkFeature() {
  if (featured.checked) {
    featured.value = true;
  } else {
    featured.value = false;
  }
}

checkFeature();

// image from an external URL
const image = document.querySelector("#image");
const imageBtn = document.querySelector(".image-btn");

imageBtn.addEventListener("click", submitImage);

export function submitImage() {
  image.innerHTML = `<img class="img-product" src="` + imageUrl.value + `"/>`;
}

submitImage();
