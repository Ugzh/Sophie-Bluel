const response = await fetch("http://localhost:5678/api/works");
const pictures = await response.json();
let category = [];

function getCategories() {
  for (let i = 0; i < pictures.length; i++) {
    category.push(pictures[i].category);
  }
  const mapCategory = new Map(category.map((data) => [data.id, data]));
  category = [...mapCategory.values()];
  return category;
}

getCategories();

function createFilter() {
  const filter = document.createElement("div");
  filter.setAttribute("id", "filter");
  const filterIncrementation = document.querySelector("#portfolio .gallery");
  filterIncrementation.before(
    document.getElementById("portfolio").appendChild(filter)
  );
  category.unshift({ id: 0, name: "Tous" });
  // Permet de trier les ID des catégories du plus petit au plus grand
  category.sort((a, b) => a.id - b.id);

  for (let i = 0; i < category.length; i++) {
    const categoryButton = document.createElement("button");
    categoryButton.innerText = category[i].name;
    filter.appendChild(categoryButton);
  }
}

createFilter();

function createGallery() {
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

createGallery();

function classCheck(nbr) {
  for (let i = 0; i < filterObject.length; i++) {
    if (filterObject[i].className === "active") {
      filterObject[i].classList.remove("active");
    }
    filterObject[nbr].classList.add("active");
  }
}
const filterObject = document.querySelectorAll("#filter button");

function isGalleryActive() {
  for (let i = 0; i < filterObject.length; i++) {
    filterObject[i].addEventListener("click", () => {
      classCheck(i);
      const categoryName = category[i].name;
      console.log(categoryName);
      if (categoryName !== "Tous") {
        const cleanGallery = document.querySelector("#portfolio > div.gallery");
        cleanGallery.innerHTML = " ";
        for (let i = 0; i < pictures.length; i++) {
          if (pictures[i].category.name === categoryName) {
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
      } else {
        const cleanGallery = document.querySelector("#portfolio > div.gallery");
        cleanGallery.innerHTML = " ";
        createGallery();
      }
    });
  }
}
isGalleryActive();

function isLogged() {
  if (localStorage.getItem("token").length > 0) {
    return true;
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

function showEditArea() {
  if (isLogged()) {
    const edit = document.querySelector(".edit");
    edit.innerHTML = `
    <h2>Mes Projets</h2>
    <button id="btn-modal" class="test">
        <i class="fa-regular fa-pen-to-square"></i>
        <span>modifier</span>
    </button>`;
    document.getElementById("filter").style.display = "none";
    document.querySelector(".edit").style.marginBottom = "80px";
  }
}

showEditArea();
