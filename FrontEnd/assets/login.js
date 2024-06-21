const submitButton = document.getElementById("submitButton");
const email = document.getElementById("email");
const password = document.getElementById("password");
let token = "";
console.log(localStorage.getItem("token"));

submitButton.addEventListener("click", () => {
  if (email.value === "sophie.bluel@test.tld" && password.value === "S0phie") {
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          typeof token === "string" &&
          localStorage.getItem("token") === null
        ) {
          //   token = data.token;
          //   console.log(data.token);
          localStorage.setItem("token", data.token);
        } else if (localStorage.getItem("token").length > 0) {
          alert(
            "Vous êtes déjà connecté, vous allez être redirigé vers la page d'accueil"
          );
        }
        setTimeout(() => {
          window.location.href = "../FrontEnd/index.html";
        }, 100);
        // sert à avoir assez de temps pour récupérer le token
      });
  } else {
    alert("Vous avez saisi les mauvais identifiants");
  }
  event.preventDefault();
});
