import { getUserEmail } from "../../utils/storage.js";

export default function menu() {
  const container = document.querySelector(".menu-container");
  const userEmail = getUserEmail();

  let authLink = ``;

  if (userEmail) {
    authLink = `<div class="user-links"> 
                    <a href="admin.html">Admin</a>
                    <a class="logout-link" href="#">Log Out</a>
                </div>`;
  }

  container.innerHTML = `<div class="nav-left">
                            <a class="navbar-brand" href="index.html"><img src="images/logo.png" class="logo" alt="Persica Logo"></a>
                        </div>
                        <div class="nav-right">
                            <div class="dropdown">
                                <button class="dropbtn"><img class="nav-toggler-icon" src="images/menu.svg"></button>
                                <div class="dropdown-content">
                                    <a class="nav-link" href="products.html">All Products</a>
                                    <a class="nav-link" href="#">About Us</a>
                                    <a class="nav-link" href="#">Contact</a>
                                </div>
                            </div>
                            <a href="login.html"><img class="nav-icon" src="images/user.svg"></a>
                            <a href="cart.html"><img class="nav-icon" src="images/shopping-cart.svg"></a>
                            ${authLink}
                        </div>
                        `;

  logOutLink();
}

menu();

function logOutLink() {
  const link = document.querySelector(".logout-link");

  if (link) {
    link.onclick = function () {
      const logOut = confirm("Are you sure you want to log out?");

      if (logOut) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        location.href = "index.html";
      }
    };
  }
}
