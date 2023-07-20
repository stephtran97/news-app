"use strict";

import { saveToStorage, getFromStorage } from "../scripts/storage.js";
import { User } from "../models/User.js";

// ----------------- Global variables -----------------
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

const btnRegister = document.querySelector("#btn-submit");
const firstNameInput = document.querySelector("#input-firstname");
const lastNameInput = document.querySelector("#input-lastname");
const userNameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");
const passwordConfirmInput = document.querySelector("#input-password-confirm");

// ----------------- Global function -----------------

// Validate function
function validate() {
  /*
  OK 1. Không có trường nào bị bỏ trống.
  OK 2. Username không được trùng với Username của các người dùng trước đó.
  OK 3. Password và Confirm Password phải giống nhau.
  OK 4. Password phải có nhiều hơn 8 ký tự.
   */
  let validateMsg = "";
  if (
    firstNameInput.value === "" ||
    lastNameInput.value === "" ||
    userNameInput.value === "" ||
    passwordInput.value === "" ||
    passwordConfirmInput.value === ""
  ) {
    validateMsg += "Please input all required fields!\n";
  }
  if (userArr.some((el) => el.username === userNameInput.value)) {
    validateMsg +=
      "User name had already been taken, please choose another user name!\n";
  }
  if (passwordInput.value !== passwordConfirmInput.value) {
    validateMsg += "Password and confirm password must be the same.\n";
  }
  if (passwordInput.value.length < 8) {
    validateMsg += "Password must be more than 8 characters.\n";
  }
  return validateMsg;
}

// ----------------- Event handler -----------------

btnRegister.addEventListener("click", function () {
  /*
  OK 1. Lấy dữ liệu nhập vào từ form 
  OK 2. Gọi hàm validate để kiểm tra form hợp lệ
  OK 3. Khởi tạo user mới với các dữ liệu hợp lệ 
  OK 4. Thêm user vào mảng, lưu mảng vào localStorage
  OK 5. Chuyển trang đến màn hình login
  */
  const data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: userNameInput.value,
    password: passwordInput.value,
  };
  if (validate() === "") {
    const currentUser = new User(
      data.firstName,
      data.lastName,
      data.username,
      data.password
    );
    userArr.push(currentUser);
    saveToStorage(KEY, JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
  } else {
    alert(validate());
  }
});
