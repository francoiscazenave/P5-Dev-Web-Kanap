/* Variables */

let params = new URL(document.location).searchParams;
let id = params.get("id");
let apiUrl = "http://localhost:3000/api/products/" + id;
let cart = [];

let color;
let quantity;


/* Classe */

class Produit {
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

/* Fonction d'ajout au panier */

function addToCart() {
  checkUserInput();
  let product = new Produit(id, color, quantity);
    console.log(product);
    cart.push(product);
    console.log(cart);
    let panier = JSON.stringify(cart);
    /* console.log(panier); */
    localStorage.setItem("cart", panier);
    
  /* if (getCart().id === id && getCart().color === color) {
    console.log("Produit déjà dans le panier"); */
/*     let updateCart = getCart();
    updateCart.quantity++;
    const panier = JSON.stringify(updateCart);
    console.log(panier);
    localStorage.setItem("cart", panier); */

 /*  } else {
    let product = new Produit(id, color, quantity);
    console.log(product);
    cart.push(product);
    console.log(cart);
    let panier = JSON.stringify(cart);
    /* console.log(panier); */
   /* localStorage.setItem("cart", panier);
    checkCart();
  } */
}

/*Fonction de test de l'écriture dans le LocalStorage */

function checkCart() {
  let userCartJson = localStorage.getItem("cart");
  let userCartToCheck = JSON.parse(userCartJson);
  for (let info of userCartToCheck) {
    console.log("Resultat de la récupération du LocalStorage");
    console.log(info);
    console.log(info.id);
  }
}

/* Fonction pour debug */

function getCart() {
  let userCartJson = localStorage.getItem("cart");
  let userCartToCheck = JSON.parse(userCartJson);
  return {
    id: userCartToCheck[0].id,
    color: userCartToCheck[0].color,
    quantity: userCartToCheck[0].quantity,
  }
}

/* Fonction pour debug */

function errorMessage(erreur) {
  /* let conteneur = document.getElementsByClassName("item__content__settings__color");
  let messageErreur = document.createElement("p");
  conteneur.appendChild(messageErreur);
  messageErreur.innerHTML = erreur; */
  console.log(erreur);
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
button.addEventListener('click', addToCart);

/* console.log(getCart()); */

if (typeof (Storage) !== "undefined") {
  console.log("Storage OK");
  for (let element in Storage) {
    console.log(element);
  }
} else {
  console.log("You're Browser don't support LocalStorage Javascript API.");
}
