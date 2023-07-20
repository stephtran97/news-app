"use strict";
import { saveToStorage, getFromStorage } from "../scripts/storage.js";
import { User, parseUser, parseUserAdvance } from "../models/User.js";

// ----------------- Global variables -----------------
const pageSizeInput = document.querySelector("#input-page-size");
const categoryInput = document.querySelector("#input-category");
const btnSaveSetting = document.querySelector("#btn-submit");

let currentUserStorage = JSON.parse(getFromStorage("CURRENT_USER")) || "";
let currentUser;

/* ----------------- Check if user is logged in -----------------
- If user is not logged in => undefined and not render data
+ If user is logged in => define as instance of User class
*/

currentUser =
  currentUserStorage === "" ? "" : parseUserAdvance(currentUserStorage);

// ----------------- Global function -----------------

// Render current setting base on currentUser settings
function renderCurrentSetting() {
  pageSizeInput.value = currentUser._pageSize;
  categoryInput.value = currentUser._category;
}

// ----------------- Event handler -----------------
renderCurrentSetting();

btnSaveSetting.addEventListener("click", function () {
  if (pageSizeInput.value !== "0" && pageSizeInput.value !== "") {
    const data = {
      pageSize: Number(pageSizeInput.value),
      category: categoryInput.value,
    };
    // Set instance property
    currentUser._pageSize = data.pageSize;
    currentUser._category = data.category;

    // Save to storage
    saveToStorage("CURRENT_USER", JSON.stringify(currentUser));

    // Display save message
    document.querySelector("#save-message").textContent = "Settings saved!";
    setTimeout(() => {
      document.querySelector("#save-message").style.display = "none";
    }, 1000);

    renderCurrentSetting();
  } else {
    alert("Please fill the valid Page Size before save settings!");
  }
});
