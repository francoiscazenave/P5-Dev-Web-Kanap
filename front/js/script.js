
/* fonction de création de fiche produit */
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
  titre.textContent = element.name;
  let paragraphe = document.createElement("p");
  paragraphe.classList.add("productDescription");
  paragraphe.textContent = element.description;
  article.appendChild(image);
  article.appendChild(titre);
  article.appendChild(paragraphe);
  item.appendChild(article);
  items.appendChild(item);
}

/* Message d'erreur si la base de donnée ne répond pas */
function erreur() {
  let items = document.getElementById("items");
  let divMessage = document.createElement("div");
  items.appendChild(divMessage);
  let message = document.createElement("p");
  message.textContent = "La connexion à la base de donnée ne fonctionne pas.";
  divMessage.appendChild(message);
}

/* Appel API */
function main() {
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
      erreur();
    });
}

/* Appel de la fonction main */

main();