"use strict";
import { saveToStorage, getFromStorage } from "../scripts/storage.js";
import { User, parseUser, parseUserAdvance } from "../models/User.js";

// Export variables

export const userArr = JSON.parse(getFromStorage("USER_ARRAY")) || [];

export const currentUserStorage =
  JSON.parse(getFromStorage("CURRENT_USER")) || "";

// Export function

/* ----------------- Check if user is logged in -----------------
- If user is not logged in => undefined and not render data
+ If user is logged in => define as instance of User class
*/
export let currentUser;
export function checkCurrentUser() {
  currentUser =
    currentUserStorage === "" ? "" : parseUserAdvance(currentUserStorage);
}
