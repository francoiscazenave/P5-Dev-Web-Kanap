/* Variables */

let params = new URL(document.location).searchParams;
let id = params.get("id");
let apiUrl = "http://localhost:3000/api/products/" + id;

let color = null;
let quantity = null;

/* Classe */

class Product {
  constructor(idProduct, colorProduct, quantityProduct) {
    this.id = idProduct;
    this.color = colorProduct;
    this.quantity = quantityProduct;
  }
}

/* Fonctions */

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

/* Fonction d'affichage du prix produit */

function showPrice(value) {
  let price = document.getElementById("price");
  price.innerHTML = value.price;
}

/* Fonction d'affichage de la description du produit */

function showDescription(value) {
  let description = document.getElementById("description");
  description.innerHTML = value.description;
}

/* Fonction d'affichage du choix des couleurs */

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

/* Fonction d'enregistrement du choix de la couleur */

function changeEventHandlerColor(event) {
  color = event.target.value;
}

/* Fonction d'enregistrement du choix de la quantité */

function changeEventHandlerQuantity(event) {
  quantity = event.target.value;
}

/* Fonction d'affichage d'erreur si aucun choix n'est fait */

function errorMessage(erreur) {
  /* let conteneur = document.getElementsByClassName("item__content__settings__color");
  let messageErreur = document.createElement("p");
  conteneur.appendChild(messageErreur);
  messageErreur.innerHTML = erreur; */
  alert(erreur);
}

/* Fonction de vérification du choix de la couleur et de la quantité */

function checkUserInput() {
  if (color === undefined && quantity === undefined) {
    errorMessage("Vous n'avez pas sélectionner de couleurs ni de quantité.");
  } else if (color === undefined) {
    errorMessage("Choisir une couleur avant de valider");
  } else if (quantity === undefined) {
    errorMessage("Choisir une quantité");
  }
}

/* Fonction de sauvegarde du panier dans le LocalStorage */

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Fonction de récupération du LocalStorage */

function getCart() {
  if (typeof (Storage) !== "undefined") {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
      return [];
    } else {
      return JSON.parse(cart);
    }
  } else {
    alert("You're Browser don't support LocalStorage Javascript API.");
  }
}

/* Fonction d'ajout au panier */

function addCart() {
  let cart = getCart();
  let duplicateId = cart.find(element => element.id == id);
  let duplicateColor = cart.find(element => element.color == color);
  if ((duplicateId != undefined) && (duplicateColor != undefined)) {
    duplicateIdQuantity = parseInt(duplicateId.quantity, 10);
    quantityNum = parseInt(quantity, 10);
    duplicateIdQuantity += quantityNum;
    duplicateId.quantity = duplicateIdQuantity;
  } else {
    let product = new Product(id, color, quantity);
    cart.push(product);
  }
  saveCart(cart);
  alert("Canapé ajouté au panier");
  setTimeout((document.location.href = './index.html'), 10000);
}

/* Appel API */

fetch(apiUrl)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    productCard(value);
  })
  .catch(function (err) {
    console.error(err);
  });

/* Ecoute du choix de la couleur */

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('select[name="color-select"]').onchange = changeEventHandlerColor;
}, false);

/* Ecoute du choix de la quantité */

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('input[name="itemQuantity"]').onchange = changeEventHandlerQuantity;
}, false);

/* Ecoute du click sur le bouton */

let button = document.getElementById("addToCart");
button.addEventListener('click', addCart);