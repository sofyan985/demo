const APIkey = "7ab3e7e69be14d97a0a59e4a6af0b980";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Pakistan"));

async function fetchNews(querry) {
  const res = await fetch(`${url}${querry}&apiKey=${APIkey}`);//async await is used so in output response comes and not pending
 const data = await res.json();//for understandable and readable data you convert it into json
  // console.log(data)
  allData(data.articles);//when you won't write this cards and unka data wont come
} 

function allData(articles) {
  const cardsContainer = document.getElementById("card-container");
  const newsCradTempltes = document.querySelector("#template-news-card");

  cardsContainer.innerHTML = "";//Clears the container with cardsContainer.innerHTML = ""; before adding new content to avoid duplication

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardClone = newsCradTempltes.content.cloneNode(true);

    fillDataIntoCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}
/* Loop through the array of articles.
Skip articles without an image (urlToImage).
Clone a predefined HTML template (newsCradTempltes).
Populate the cloned template with data from the current article.
Add the populated card to the page by appending it to the container (cardsContainer).

*/

 function fillDataIntoCard(cardClone, article) {
  const newsImage = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector(".news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImage.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}


let curSelectedClass = null;

function onNavitemClck(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);

  curSelectedClass?.classList.remove("active");
  curSelectedClass = navItem;
  curSelectedClass.classList.add("active");
}

const serchButton = document.getElementById("search-button");
const serchText = document.getElementById("search-text");

serchButton.addEventListener("click", () => {
  const querry = serchText.value;

  if (!querry) return;

  fetchNews(querry);
})
;





