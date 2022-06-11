/* Variables */

let cart = JSON.parse(localStorage.getItem("cart"));
/* Variable pour stocker le résultat de l'API */
let products = null;

/* Fonction de récupération du panier */

function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
}

/* Function de recherche dans l'API */

function searchAPI(id) {
  return products.find(product => product._id === id);
}

/* Fonction de recherche de prix par rapport à un id */

function findPrice(id) {
  if (products.find(product => product._id === id)) {
    return products.price;
  }
}

/* Fonction d'affichage du panier */

function userCart() {
  /* Si le panier n'est pas vide afficher les produits */
  if (cart !== null) {
    for (let item of cart) {
      let apiResult = searchAPI(item.id);
      let section = document.getElementById("cart__items");
      let display = document.createElement("article");
      display.setAttribute("data-id", item.id);
      display.setAttribute("data-color", item.color);
      display.classList.add("cart__item");
      section.appendChild(display);

      let imgDiv = document.createElement("div");
      imgDiv.classList.add("cart__item__img");
      let img = document.createElement("img");
      img.setAttribute("src", apiResult['imageUrl']);
      img.setAttribute("alt", apiResult['altTxt']);
      imgDiv.appendChild(img);
      display.appendChild(imgDiv);

      let cartItemContent = document.createElement("div");
      cartItemContent.classList.add("cart__item__content");
      let cartItemContentDescription = document.createElement("div");
      cartItemContentDescription.classList.add("cart__item__content__description");
      let titre = document.createElement("h2");
      titre.innerText = apiResult['name'];
      cartItemContentDescription.appendChild(titre);
      let paragrapheDescription = document.createElement("p");
      paragrapheDescription.innerText = item.color;
      cartItemContentDescription.appendChild(paragrapheDescription);
      let prix = document.createElement("p");
      prix.innerText = apiResult['price'] + " €";
      cartItemContentDescription.appendChild(prix);
      cartItemContent.appendChild(cartItemContentDescription);
      display.appendChild(cartItemContent);

      let cartItemContentSettings = document.createElement("div");
      cartItemContentSettings.classList.add("cart__item__content__settings");
      display.appendChild(cartItemContentSettings);

      let cartItemContentSettingsQuantity = document.createElement("div");
      cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

      let cartItemContentSettingsParagraphe = document.createElement("p");
      cartItemContentSettingsParagraphe.innerText = "Qté : ";
      cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsParagraphe);

      let input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      input.setAttribute("value", item.quantity);
      input.classList.add("itemQuantity");
      cartItemContentSettingsQuantity.appendChild(input);

      let cartItemContentDelete = document.createElement("div");
      cartItemContentDelete.classList.add("cart__item__content__settings__delete");
      cartItemContentSettings.appendChild(cartItemContentDelete);

      let cartItemContentDeleteParagraphe = document.createElement("p");
      cartItemContentDeleteParagraphe.classList.add("deleteItem");
      cartItemContentDeleteParagraphe.innerText = "Supprimer";
      cartItemContentDelete.appendChild(cartItemContentDeleteParagraphe);
    }
  } else {
    let section = document.getElementById("cart__items");
    let display = document.createElement("article");
    display.classList.add("cart__item");
    let emptyCart = document.createElement("p");
    emptyCart.innerText = "Votre panier est vide";
    display.appendChild(emptyCart);
    section.appendChild(display);
  }
}

/* Fonction pour changer la quantité du panier */

function changeQuantity(product, quantity) {
  let panier = getCart();
  let foundProduct = panier.find(p => p.id == product.getAttribute("data-id"));
  if (foundProduct != undefined) {
    foundProductQuantity = parseInt(foundProduct.quantity, 10);
    userQuantity = parseInt(quantity, 10);
    foundProductQuantity = userQuantity;
    foundProduct.quantity = foundProductQuantity;
  }
  localStorage.setItem("cart", JSON.stringify(panier));
}

/* Fonction d'écoute d'événement pour le changement de la quantité */

function ModifQuantityEvent() {
  let elements = document.querySelectorAll('input[name="itemQuantity"]');
  document.querySelectorAll(".cart__item").forEach((item) => {
    item.addEventListener('change', (event) => {
      for (let element of elements) {
        if (event.target === element) {
          changeQuantity(item, event.target.value);
          setTimeout(() => location.reload(), 500);
        }
      }
    })
  });
}

/* Fonction de suppression d'un produit */

function productDelete(product) {
  cart = cart.filter(p => p.id != product.getAttribute("data-id"));
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Function d'écoute d'événement pour la suppression de produit */

function DeleteEvent() {
  let elements = document.querySelectorAll(".deleteItem");
  document.querySelectorAll(".cart__item").forEach((item) => {
    item.addEventListener('click', (event) => {
      for (let element of elements) {
        if (event.target === element) {
          productDelete(item);
          setTimeout(() => location.reload(), 500);
        }
      }
    })
  });
}

/* Fonction de calcul de la quantité de produits */

function calcQuantity() {
  let panier = getCart();
  let allProduct = 0;
  for (let item of panier) {
    itemQuantity = parseInt(item.quantity, 10);
    allProduct += itemQuantity;
  }
  return allProduct;
}

/* Fonction d'affichage de la quantité de produit */

function displayTotal() {
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = calcQuantity();
}

/* Fonction de calcul du total des produits */

function calcTotal() {
  let panier = getCart();
  let total = 0;

  for (let item of panier) {
    let foundProduct = searchAPI(item.id);
    total += foundProduct.price * item.quantity;
    }
    return total;
  }

/* Fonction de calcul du total des produits */

function displayPrice() {
  let totalPrice = document.getElementById("totalPrice");
  totalPrice.innerText = calcTotal();
}

/* Classes */

class Contact {
  constructor(firstName, name, adress, town, mail) {
    this.firstName = firstName;
    this.name = name;
    this.adress = adress;
    this.town = town;
    this.mail = mail;
  }
}

/* Appel API */
fetch("http://localhost:3000/api/products/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    return products = value;
  })
  .then(function () {
    userCart();
    DeleteEvent();
    ModifQuantityEvent();
  })
  .then(function () {
    displayTotal();
    displayPrice();
  })
  .catch(function (err) {
    console.error(err);
  });