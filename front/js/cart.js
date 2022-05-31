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
      input.setAttribute("value", "42");
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
    section.appendChild(display);
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
  })
  .catch(function (err) {
    erreur();
  });
