import { api } from "../constants/api.js";
import { getToken } from "../utils/storage.js";

export default function deleteProduct(id) {
  const container = document.querySelector(".delete-container");

  container.innerHTML = `<button class="btn delete-btn" type="button">Delete Product</button>`;

  const button = document.querySelector(".delete-btn");

  button.onclick = async function () {
    const url = api + "/products/" + id;

    const confirmation = confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmation) {
      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "admin.html";
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };
}
