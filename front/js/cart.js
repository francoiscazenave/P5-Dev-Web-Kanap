/* Variables */

let cart = JSON.parse(localStorage.getItem("cart"));
/* Variable pour stocker le résultat de l'API */
let products = null;

/* Function de recherche dans l'API */

function searchAPI(id) {
  return products.find(product => product._id === id);
}

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
      prix.innerText = apiResult['price'];
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
  let foundProduct = cart.find(p => p.id == product.getAttribute("data-id"));
  if (foundProduct != undefined) {
    let parseQuantity = parseInt(foundProduct.quantity);
    let parseQuantityUser = parseInt(quantity);
    parseQuantity += parseQuantityUser;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

/* Fonction d'écoute d'événement pour le changement de la quantité */

function ModifQuantityEvent() {
  let elements = document.querySelectorAll('input[name="itemQuantity"]');
  document.querySelectorAll(".cart__item").forEach((item) => {
    item.addEventListener('change', (event) => {
      for (let element of elements) {
        if (event.target === element) {
          changeQuantity(item, event.target.value);
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

/* Fonction de calcul du nombre de produits */

function productNumber(cart) {
  let totalQuantity = document.getElementById("totalQuantity");
  let cartQuantity = 0;
  for (const item in cart) {
    cartQuantity += item.quantity + 1;
  }
  totalQuantity.innerText = cartQuantity;
}

/* Fonction de calcul du total des produits */

function productTotal(cart) {
  let totalPrice = document.getElementById("totalPrice");
  let price = 0;
  for (const item in cart) {
    itemPrice = parseInt(item.price)
    price += itemPrice;
  }
  totalPrice.innerText = price;
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
    productNumber(cart);
    productTotal(cart);
  })
  .catch(function (err) {
    console.error(err);
  });