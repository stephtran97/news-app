"use strict";
// ----------- Store data in LocalStorage -----------

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key, defaultValue = null) {
  return localStorage.getItem(key) ?? defaultValue;
}

export { saveToStorage, getFromStorage };
/* Syntax:
  JSON.parse(getFromStorage("KEY"))
  saveToStorage('KEY',JSON.stringify(object))
 */
