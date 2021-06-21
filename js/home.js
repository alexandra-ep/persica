import { api } from "./constants/api.js";
import renderFeatured from "./components/renderFeatured.js";
import menu from "./components/common/menu.js";

menu();

async function fetchBanner() {
  const urlHero = api + "/home";

  try {
    const response = await fetch(urlHero);
    const json = await response.json();
    const result = json.hero_banner[0].url;

    const image = document.querySelector(".img-hero");
    image.src = result;
    image.alt = json.hero_banner_alt_text;
  } catch (error) {
    console.log(error);
  }
}

fetchBanner();

async function fetchFeatured() {
  const urlFeatured = api + "/products";

  try {
    const response = await fetch(urlFeatured);
    const json = await response.json();
    const products = json;

    renderFeatured(products);
  } catch (error) {
    console.log(error);
  }
}

fetchFeatured();
