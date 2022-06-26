const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const commandId = urlParams.get('commande');
let orderId = document.getElementById("orderId");
orderId.textContent = commandId;