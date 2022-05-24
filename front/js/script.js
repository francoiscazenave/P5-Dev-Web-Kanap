
function createItem(element) {
  let items = document.getElementById("items");
  let item = document.createElement("a");
  item.setAttribute("href", "./product.html?id=" + element._id);
  let article = document.createElement("article");
  let image = document.createElement("img");
  image.setAttribute("src", element.imageUrl);
  image.setAttribute("alt", element.altTxt);
  let titre = document.createElement("h3");
  titre.classList.add("productName");
  titre.innerHTML = element.name;
  let paragraphe = document.createElement("p");
  paragraphe.classList.add("productDescription");
  paragraphe.innerHTML = element.description;
  article.appendChild(image);
  article.appendChild(titre);
  article.appendChild(paragraphe);
  item.appendChild(article);
  items.appendChild(item);
}

fetch("http://localhost:3000/api/products/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    for (let tab of value) {
      createItem(tab);
    }
  })

  .catch(function (err) {
    console.error(err);
  });

