"use strict";
import { saveToStorage, getFromStorage } from "../scripts/storage.js";
import { User, parseUser, parseUserAdvance } from "../models/User.js";
import { currentUserStorage, checkCurrentUser, currentUser } from "./common.js";

// ----------------- Global variables -----------------
const newsContainer = document.querySelector("#news-container");
const pageNum = document.querySelector("#page-num");
const btnPrevious = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnSearch = document.querySelector("#btn-submit");
const searchInput = document.querySelector("#input-query");

let currentPage = 1;

let keyword = "";
/* ----------------- Check if user is logged in -----------------
- If user is not logged in => undefined and not render data
+ If user is logged in => define as instance of User class
*/
checkCurrentUser();

let pageSize = currentUser._pageSize;
// ----------------- Global function -----------------

function renderPageData(element) {
  const html = `
  <div class="card flex-row flex-wrap">
  <div class="card mb-3" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src=${element.urlToImage}
          class="card-img"
          alt="">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.description}</p>
          <a href=${element.url}
            class="btn btn-primary" target="_blank">View</a>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  newsContainer.innerHTML += html;
}

function renderPageNum() {
  pageNum.textContent = currentPage;
}

// Render news
const renderNews = function (data, page) {
  const data1 = data.slice(pageSize * page - pageSize, pageSize * page);
  data1.forEach((el) => renderPageData(el));
};
// Toggle Previous, Next button display
function togglePrevNextDisplay(data) {
  btnPrevious.style.display = currentPage === 1 ? "none" : "";
  btnNext.style.display = currentPage >= data.length / pageSize ? "none" : "";
}
// ----------------- Event handler -----------------
btnSearch.addEventListener("click", function () {
  if (searchInput.value === "") {
    alert("Cannot search without keyword!");
  } else {
    (async function () {
      try {
        // Click Search with unchanged keyword
        if (keyword !== searchInput.value) {
          newsContainer.innerHTML = "";
          currentPage = 1;
          renderPageNum();
        }

        // Click search with other keyword
        newsContainer.innerHTML = "";
        keyword = searchInput.value;
        renderPageNum();
        const data = await currentUser.search(keyword);
        renderNews(data, currentPage);
        togglePrevNextDisplay(data);
      } catch (err) {
        console.log("Error while rendering data.", err);
      }
    })();
  }
});

// Previous, Next button event handler
btnPrevious.addEventListener("click", function () {
  (async function () {
    const data = await currentUser.search(keyword);
    currentPage -= 1;
    renderPageNum();
    togglePrevNextDisplay(data);
    newsContainer.innerHTML = "";
    renderNews(data, currentPage);
  })();
});

btnNext.addEventListener("click", function () {
  (async function () {
    const data = await currentUser.search(keyword);
    currentPage += 1;
    renderPageNum();
    togglePrevNextDisplay(data);
    newsContainer.innerHTML = "";
    renderNews(data, currentPage);
  })();
});
