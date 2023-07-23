"use strict";
import { saveToStorage, getFromStorage } from "../scripts/storage.js";
import { User, parseUser } from "../models/User.js";
import { currentUserStorage } from "./common.js";

// ----------------- Global variables -----------------
const loginModal = document.querySelector("#login-modal");
const contentContainer = document.querySelector("#main-content");
const welcomeMessage = document.querySelector("#welcome-message");
const btnLogout = document.querySelector("#btn-logout");

// ----------------- Global function -----------------

// ----------------- Event handler -----------------
// Initially render page
function initialize() {
  if (currentUserStorage !== "") {
    loginModal.style.display = "none";
    welcomeMessage.textContent = `Welcome ${currentUserStorage.firstName}`;
  } else {
    contentContainer.style.display = "none";
  }
}
initialize();

// Logout button
btnLogout.addEventListener("click", function () {
  // Delete current user on local storage
  localStorage.removeItem("CURRENT_USER");
  document.querySelector("#logout-message").textContent = "Logging out!";

  // Back to login
  setTimeout(() => {
    window.location.href = "../pages/login.html";
  }, 2000);
});
