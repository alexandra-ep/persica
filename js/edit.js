import menu from "./components/common/menu.js";
import displayMessage from "./components/common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { api } from "./constants/api.js";
import { checkFeature, submitImage } from "./utils/productFunctions.js";
import deleteProduct from "./components/deleteProduct.js";

const token = getToken();

if (!token) {
  location.href = "index.html";
}

menu();
checkFeature();
submitImage();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "admin.html";
}

const url = api + "/products/" + id;

const form = document.querySelector("form");
const imageUrl = document.querySelector("#imageUrl");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured");
const inputId = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loader = document.querySelector(".lds-circle");

(async function () {
  try {
    const response = await fetch(url);
    const properties = await response.json();

    imageUrl.value = properties.image_url;
    title.value = properties.title;
    price.value = properties.price;
    description.value = properties.description;
    inputId.value = properties.id;

    if (properties.featured === true) {
      featured.checked = true;
    }

    deleteProduct(properties.id);
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const imageValue = imageUrl.value.trim();
  const featuredValue = featured.value;
  const idValue = inputId.value;

  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0 ||
    imageValue.length === 0
  ) {
    return displayMessage(
      "error",
      "Please fill out the whole form",
      ".message-container"
    );
  }
  updateProduct(
    titleValue,
    priceValue,
    descriptionValue,
    imageValue,
    featuredValue,
    idValue
  );
}

async function updateProduct(
  title,
  price,
  description,
  image_url,
  featured,
  id
) {
  const data = JSON.stringify({
    title,
    price,
    description,
    image_url,
    featured,
    id,
  });

  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage(
        "success",
        "Product successfully updated!",
        ".message-container"
      );
    }

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occurred", ".message-container");
  }
}
