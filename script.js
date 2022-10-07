let searchInput = document.querySelector("#searchText");
let searchBtn = document.getElementById("button");
let mainDiv = document.getElementById("cards");

const createElem = (item) => {
  //   let myElem = `<div class="col">
  //       <div class="card">
  //         <img src="${item.avatar_url}" class="card-img-top" alt="...">
  //         <div class="card-body">
  //           <h5 class="card-title">${item.login}</h5>
  //           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
  //         </div>
  //       </div>
  //   </div>`;

  //   mainDiv.innerHTML += myElem;

  const { avatar_url, login, html_url } = item;

  let cardCol = document.createElement("div");
  cardCol.className = "col";
  let cardDiv = document.createElement("div");
  cardDiv.className = "card";
  let cardImg = document.createElement("img");
  cardImg.src = avatar_url;
  cardImg.className = "card-img-top";
  cardImg.alt = login;
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerText = login;
  let cardBtn = document.createElement("a");
  cardBtn.className = "btn btn-dark";
  cardBtn.innerText = "View Profile";
  cardBtn.target = "_blank";
  cardBtn.setAttribute("href", html_url);

  cardCol.appendChild(cardDiv);
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardBtn);

  mainDiv.appendChild(cardCol);
};

searchBtn.addEventListener("click", async () => {
  let url = `https://api.github.com/users/${searchInput.value}/followers?per_page=100`;
  mainDiv.innerHTML = "";

  if (searchInput) {
    try {
      let response = await fetch(url);
      if (response.ok) {
        let myData = await response.json();
        myData.map((item) => createElem(item));
      } else {
        let message = "Kullanıcı bulunamadı";
        mainDiv.innerHTML = `<h1 class="text-align text-danger"> 😦${message}😦</h1>`;
      }
    } catch (error) {
      console.log(error);
    }
  }
});
