const submitButton = document.getElementById("submitButton");
const email = document.getElementById("email");
const password = document.getElementById("password");
let token = "";
console.log(localStorage.getItem("token"));

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });

  if (response.status === 200) {
    const setToken = await response.json();
    if (typeof token === "string" && localStorage.getItem("token") === null) {
      localStorage.setItem("token", setToken.token);
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 100);
    }
  } else {
    const loginForm = document.querySelector("#login");
    const loginError = document.querySelector("#contact a");
    loginError.classList.add("error-login");
    loginError.innerHTML = `Les identifiants que vous avez saisi sont incorrects`;
    loginForm.appendChild(loginError);
  }
});
