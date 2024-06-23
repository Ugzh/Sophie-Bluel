import { createGallery } from "./refactor.js";

// const reponse = await fetch("http://localhost:5678/api/works");
// const pictures = await reponse.json();
const modal = document.querySelector(".modal-state");
const body = document.querySelector("body");
const main = document.querySelector("body > main");
const header = document.querySelector("body > header");
const footer = document.querySelector("body > footer");
const closeIconModal = document.querySelector(".modal-close");
const toggleModal = document.getElementById("btn-modal");

closeIconModal.addEventListener("click", closeModal);
toggleModal.addEventListener("click", showModal);

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

async function generateTrashCan() {
  await loadAndDisplayPictures();

  async function loadAndDisplayPictures() {
    const response = await fetch("http://localhost:5678/api/works");
    const pictures = await response.json();
    const gallery = document.querySelector(".modal-gallery");
    gallery.innerHTML = ""; // Vider la galerie avant de la remplir

    pictures.forEach((picture) => {
      const figure = document.createElement("figure");
      figure.classList.add("modal-gallery-card");
      figure.innerHTML = `
          <img src="${picture.imageUrl}" alt="${picture.title}">
          <i class="fa-solid fa-trash-can" data-id="${picture.id}"></i>
        `;
      gallery.appendChild(figure);
    });

    attachDeleteEventListeners();
  }

  function attachDeleteEventListeners() {
    const trashCans = document.querySelectorAll(
      "#modal > div > div > figure > i"
    );
    trashCans.forEach((trashCan) => {
      trashCan.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        const id = e.target.dataset.id;
        await fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        await loadAndDisplayPictures();
        createGallery();
      });
    });
  }
}

generateTrashCan();
