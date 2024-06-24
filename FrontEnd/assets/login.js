const submitButton = document.getElementById("submitButton");
const email = document.getElementById("email");
const password = document.getElementById("password");
let token = "";
console.log(localStorage.getItem("token"));

submitButton.addEventListener("click", (event) => {
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
          localStorage.setItem("token", data.token);
        } else if (localStorage.getItem("token").length > 0) {
          alert(
            "Vous êtes déjà connecté, vous allez être redirigé vers la page d'accueil"
          );
        }
        setTimeout(() => {
          window.location.href = "./index.html";
        }, 100);
        // sert à avoir assez de temps pour récupérer le token
      });
  } else {
    const loginForm = document.querySelector("#login");
    const loginError = document.querySelector("#contact a");
    loginError.classList.add("error-login");
    loginError.innerHTML = `Les identifiants que vous avez saisi sont incorrects`;
    loginForm.appendChild(loginError);
    // alert("Vous avez saisi les mauvais identifiants");
  }
  event.preventDefault();
});
