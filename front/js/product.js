let params = new URL(document.location).searchParams;
let id = params.get("id");
let apiUrl = "http://localhost:3000/api/products/" + id;
console.log(apiUrl);

/* Appel API */
fetch(apiUrl)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value);
  })

  .catch(function (err) {
    console.error(err);
  });
