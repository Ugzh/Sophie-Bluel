const submitButton = document.getElementById("submitButton")
const email = document.getElementById("email") 
const password = document.getElementById("password")
let token = []

submitButton.addEventListener("click", () => {
    if (email.value == "sophie.bluel@test.tld" && password.value == "S0phie"){
    fetch("http://localhost:5678/api/users/login", {
     method : "POST",
     headers : { "Content-Type": "application/json"},
     body : JSON.stringify({
        "email":email.value,
        "password":password.value
    })
    })
        .then((response) => response.json())
        .then((data) => {
            if (token.length >= 1) {
                alert("Vous êtes déjà connecté")
            } else {
                token.push(data.token)
                localStorage.setItem("token", JSON.stringify(token))
            }
// sert à avoir assez de temps pour récupérer le token
        setTimeout(() => {window.location.href="../FrontEnd/index.html"}, 100)
    })
    } else {
        alert("Vous avez saisi les mauvais identifiants")
    }
    event.preventDefault()
}) 