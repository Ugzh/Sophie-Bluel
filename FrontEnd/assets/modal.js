const reponse = await fetch("http://localhost:5678/api/works");
const pictures = await reponse.json();
const modal = document.querySelector(".modal-state");
const body = document.querySelector("body");
const main = document.querySelector("body > main");
const header = document.querySelector("body > header");
const footer = document.querySelector("body > footer");
const closeIconModal = document.getElementById("modal-close");
const toggleModal = document.getElementById("btn-modal");

closeIconModal.addEventListener("click", closeModal);
toggleModal.addEventListener("click", showModal);

function galleryCreation() {
  for (let i = 0; i < pictures.length; i++) {
    // const pour remplissage
    const img = document.createElement("img");
    const figure = document.createElement("figure");
    const gallery = document.querySelector(".modal-gallery");
    const trashCan = document.createElement("i");

    // Remplissage de la grid
    img.src = pictures[i].imageUrl;
    trashCan.classList.add("fa-trash-can", "fa-solid");
    // trashCan.setAttribute("id", "trashCan");
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(trashCan);
    figure.classList.add("modal-gallery-card");
  }
}

galleryCreation();
let isModalOpen = false;

function closeModal() {
  body.style.backgroundColor = "";
  header.classList.remove("modalFilterElement");
  footer.classList.remove("modalFilterElement");
  main.classList.remove("modalFilterElement");
  modal.classList.remove("showModal");

  isModalOpen = false;
  header.removeEventListener("click", closeModalOnClick);
  footer.removeEventListener("click", closeModalOnClick);
  main.removeEventListener("click", closeModalOnClick);
}

function showModal() {
  body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  header.classList.add("modalFilterElement");
  footer.classList.add("modalFilterElement");
  main.classList.add("modalFilterElement");
  modal.classList.add("showModal");

  isModalOpen = true;
  setTimeout(() => {
    header.addEventListener("click", closeModalOnClick);
    footer.addEventListener("click", closeModalOnClick);
    main.addEventListener("click", closeModalOnClick);
  }, 0);
}

function closeModalOnClick(event) {
  if (isModalOpen) {
    closeModal();
  }
}

function removeItem() {
  for (let i = 1; i <= pictures.length; i++) {
    const trashCan = document.querySelector(
      `#modal > div > div > figure:nth-child(${[i]}) > i`
    );

    trashCan.addEventListener("click", (event) => {
      event.preventDefault();
      const id = pictures[i - 1].id;
      fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
    });
  }
}

removeItem();
