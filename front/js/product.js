let params = new URL(document.location).searchParams;
let id = params.get("id");
let apiUrl = "http://localhost:3000/api/products/" + id;
console.log(apiUrl);

/* Fonction d'affichage de l'image produit */
function createImg(value) {
  let imgDiv = document.querySelector("section.item div.item__img");
  let img = document.createElement("img");
  img.setAttribute("src", value.imageUrl);
  img.setAttribute("alt", value.altTxt);
  imgDiv.appendChild(img);
}

/* Fonction d'affichage titre produit */
function createTitle(value) {
  let title = document.getElementById("title");
  title.innerHTML = value.name;
}

/* Fonction d'affichage prix produit */
function showPrice(value) {
  let price = document.getElementById("price");
  price.innerHTML = value.price;
}

/* Fonction d'affichage de la description du produit */
function showDescription(value) {
  let description = document.getElementById("description");
  description.innerHTML = value.description;
}

/* Fonction d'affichage des couleurs */
function showColor(value) {
  let colors = document.getElementById("colors");
  for (let color of value.colors) {
    let option = document.createElement("option");
    option.setAttribute("value", color)
    option.innerHTML = color;
    colors.appendChild(option);
  }
}

/* Function de création de la fiche produit */
function productCard(value) {
  createImg(value);
  createTitle(value);
  showPrice(value);
  showDescription(value);
  showColor(value);
}

/* Appel API */
fetch(apiUrl)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value);
    productCard(value);
  })

  .catch(function (err) {
    console.error(err);
  });
