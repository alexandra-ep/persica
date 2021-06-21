import { api } from "./constants/api.js";
import displayMessage from "./components/common/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import menu from "./components/common/menu.js";

menu();

const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (validateEmail(emailValue) === false || passwordValue.length === 0) {
    displayMessage("error", "Invalid login details", ".message-container");
  }
  logIn(emailValue, passwordValue);
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

async function logIn(email, password) {
  const url = api + "/auth/local";

  const data = JSON.stringify({ identifier: email, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "admin.html";
    }

    if (json.error) {
      displayMessage("error", "Invalid login details", ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
