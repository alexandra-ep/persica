import menu from "./components/common/menu.js";
import displayMessage from "./components/common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { api } from "./constants/api.js";
import { checkFeature, submitImage } from "./utils/productFunctions.js";

const token = getToken();

if (!token) {
  location.href = "index.html";
}

menu();
checkFeature();
submitImage();

const form = document.querySelector("form");
const imageUrl = document.querySelector("#imageUrl");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const imageValue = imageUrl.value.trim();
  const featuredValue = featured.value;

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
  addProduct(
    titleValue,
    priceValue,
    descriptionValue,
    imageValue,
    featuredValue
  );
}

async function addProduct(title, price, description, image_url, featured) {
  const url = api + "/products";

  const data = JSON.stringify({
    title,
    price,
    description,
    image_url,
    featured,
  });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage(
        "success",
        "Product successfully added!",
        ".message-container"
      );
      form.reset();
    }

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occurred", ".message-container");
  }
}
