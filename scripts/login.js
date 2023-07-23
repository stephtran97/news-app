"use strict";
import { saveToStorage, getFromStorage } from "../scripts/storage.js";
import { User, parseUser } from "../models/User.js";
import { userArr } from "./common.js";

// ----------------- Global variables -----------------
const userNameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");
const btnLogin = document.querySelector("#btn-submit");

let currentUserStorage = JSON.parse(getFromStorage("CURRENT_USER")) || "";
// ----------------- Global function -----------------
// Login validate function
function loginValidate(id, pw) {
  let validateMsg = "",
    currentUser;
  if (userArr.some((el) => el.username === id)) {
    switch (pw) {
      case userArr.find((el) => el.username === id).password:
        currentUser = userArr.find((el) => el.username === id);
        validateMsg = "SUCCESS";
        break;
      default:
        validateMsg = "Wrong password!";
        break;
    }
  } else {
    validateMsg = "Invalid username";
  }
  return {
    message: validateMsg,
    current: currentUser,
  };
}

// Login
function login(currentUser) {
  if (currentUserStorage.username === currentUser.username) {
    return;
  } else {
    currentUserStorage = currentUser;
    saveToStorage("CURRENT_USER", JSON.stringify(currentUser));
  }
}

// ----------------- Event handler -----------------
btnLogin.addEventListener("click", function () {
  // OK 1. Login Validate
  const validateStatus = loginValidate(
    userNameInput.value,
    passwordInput.value
  ); //{ message: validateMsg, current: currentUser }

  const currentUser = validateStatus.current;

  if (validateStatus.message === "SUCCESS") {
    login(currentUser);

    document.querySelector("#login-message").textContent = "Logging In!";
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2000);
  } else {
    alert(validateStatus.message);
  }
  // OK 2. Check if logged in then Save current user data to LocalStorage
  // OK 3. Back to home
});
