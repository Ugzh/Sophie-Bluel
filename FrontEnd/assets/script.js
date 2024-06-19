const reponse = await fetch("http://localhost:5678/api/works");
const pictures = await reponse.json();

function galleryCreation() {
  for (let i = 0; i < pictures.length; i++) {
    // const pour remplissage
    const img = document.createElement("img");
    const figure = document.createElement("figure");
    const figCaption = document.createElement("figcaption");
    const gallery = document.querySelector(".gallery");

    // Remplissage de la grid
    img.src = pictures[i].imageUrl;
    figCaption.innerText = pictures[i].title;
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figCaption);
  }
}
galleryCreation();

function galleryCategorie() {
  //Creation div Filtre
  const filter = document.createElement("div");
  filter.setAttribute("id", "filter");
  const filterIncrementation = document.querySelector("#portfolio .gallery");
  filterIncrementation.before(
    document.getElementById("portfolio").appendChild(filter)
  );

  // recuperer catégorie
  let categoryArray = ["Tous"];
  for (let i = 0; i < pictures.length; i++) {
    const categoryTerme = pictures[i].category.name;
    const categoryList = categoryArray;
    categoryList.push(categoryTerme);
    categoryArray = [...new Set(categoryArray)];
  }
  // ajouter boutons
  for (let i = 0; i < categoryArray.length; i++) {
    const categoryButton = document.createElement("button");
    categoryButton.innerText = categoryArray[i];
    filter.appendChild(categoryButton);
  }
}

galleryCategorie();

const filterObject = document.querySelectorAll("#filter button");

// Maj boutons couleurs
function classCheck(nbr) {
  for (let i = 0; i < filterObject.length; i++) {
    if (filterObject[i].className === "active") {
      filterObject[i].classList.remove("active");
    }
    filterObject[nbr].classList.add("active");
  }
}

// Creation des filtres par type
function filterGeneration(strType, nbr) {
  for (let i = 0; i < pictures.length; i++) {
    if (pictures[i].category.name === strType) {
      const img = document.createElement("img");
      const figure = document.createElement("figure");
      const figCaption = document.createElement("figcaption");
      const gallery = document.querySelector(".gallery");

      img.src = pictures[i].imageUrl;
      figCaption.innerText = pictures[i].title;
      gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(figCaption);
      filterObject[nbr].classList.add("active");
    }
  }
}

function galleryFilter() {
  filterObject[0].addEventListener("click", function () {
    classCheck(0);
    document.querySelector(".gallery").innerHTML = "";
    galleryCreation();
  });

  filterObject[1].addEventListener("click", function () {
    classCheck(1);
    document.querySelector(".gallery").innerHTML = "";
    filterGeneration("Objets", 1);
  });

  filterObject[2].addEventListener("click", function () {
    classCheck(2);
    document.querySelector(".gallery").innerHTML = "";
    filterGeneration("Appartements", 2);
  });

  filterObject[3].addEventListener("click", function () {
    classCheck(3);
    document.querySelector(".gallery").innerHTML = "";
    filterGeneration("Hotels & restaurants", 3);
  });
}

galleryFilter();

function isLogged() {
  let token = localStorage.getItem("token");
  if (token !== 0 && token !== null && token !== undefined) {
    return true;
  } else {
    return false;
  }
}

function logoutDisplay() {
  if (isLogged() == true) {
    const logButton = (document.getElementById("logButton").innerText =
      "logout");
  }
  logButton.addEventListener("click", function () {
    window.localStorage.removeItem("token");
  });
}
logoutDisplay();

function editArea() {
  if (isLogged() == true) {
    const edit = document.querySelector(".edit");
    edit.innerHTML = `
    <h2>Mes Projets</h2>
    <button id="btn-modal">
        <i class="fa-regular fa-pen-to-square"></i>
        <span>modifier</span>
    </button>`;
    document.getElementById("filter").style.display = "none";
    document.querySelector(".edit").style.marginBottom = "80px";

    const toggleModal = document.getElementById("btn-modal");
    const modal = document.querySelector(".modal-state");
    const main = document.querySelector("body > main");
    const header = document.querySelector("body > header");
    const footer = document.querySelector("body > footer");

    toggleModal.addEventListener("click", () => {
      header.classList.add("modalFilterElement");
      footer.classList.add("modalFilterElement");
      main.classList.add("modalFilterElement");
      modal.classList.add("showModal");
    });

    const closeIconModal = document.getElementById("modal-close");

    closeIconModal.addEventListener("click", () => {
      header.classList.remove("modalFilterElement");
      footer.classList.remove("modalFilterElement");
      main.classList.remove("modalFilterElement");
      modal.classList.remove("showModal");
    });
  }
}

editArea();

const testIcon = document.querySelector(".modal-state div div div");

const modal = document.querySelector(".modal-state");
console.log(testIcon);
