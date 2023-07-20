"use strict";

class User {
  constructor(firstName, lastName, username, password, pageSize, category) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize === undefined ? 5 : pageSize;
    this.category = category === undefined ? "General" : category;
  }
  get apiKey() {
    return "a16fdbfce4b643bf825adfb290adc30c";
  }
  getNewsData = async function () {
    try {
      const data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${this._category}&apiKey=${this.apiKey}`
      );
      const response = await data.json();
      const articles = await response.articles;
      return articles;
    } catch (err) {
      console.log("Error while fetching data.", err);
    }
  };
  search = async function (keyword) {
    try {
      if (keyword !== "") {
        const data = await fetch(
          `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${this.apiKey}`
        );
        const response = await data.json();
        const articles = await response.articles;
        return articles;
      } else {
        return;
      }
    } catch (err) {
      console.log("Error while fetching data.", err);
    }
  };
  // Page size
  set pageSize(page) {
    this._pageSize = Number(page);
  }
  get pageSize() {
    return this._pageSize;
  }
  // Category
  set category(category) {
    this._category = category;
  }
  get category() {
    return this._category;
  }
}

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// Convert JS Object to Class instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );
  return user;
}
function parseUserAdvance(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    userData._pageSize,
    userData._category
  );
  return user;
}
export { User, parseUser, parseUserAdvance, Task };
