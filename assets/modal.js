import { createGallery, response, editHeader } from "./refactor.js";

const modal = document.querySelector(".modal-state");
const body = document.querySelector("body");
const main = document.querySelector("body > main");
const header = document.querySelector("body > header");
const footer = document.querySelector("body > footer");
const closeIconModal = document.querySelector(".modal-close");
const toggleModal = document.getElementById("btn-modal");
const closeSecondIconModal = document.querySelector(
  "#add-pictures > i.fa-solid.fa-xmark.modal-close"
);
const precedentModal = document.querySelector(
  "#add-pictures > i.fa-solid.fa-arrow-left.modal-back"
);
const nextModal = document.querySelector(".modal-btn-photo");
const modalPicture = document.querySelector("#add-pictures");

async function categoryModal() {
  const category = document.querySelector("#category");
  const response = await fetch("http://localhost:5678/api/categories");
  const categoryList = await response.json();
  if (response.status !== 200) {
    alter(` status: ${response.status}`);
  }
  let options = "";
  categoryList.forEach((data) => {
    options += `<option value="${data.id}">${data.name}</option> `;
  });
  category.innerHTML = options;
}

categoryModal();
async function followingModal() {
  modalPicture.style.visibility = "visible";
}

editHeader.addEventListener("click", showModal);
nextModal.addEventListener("click", followingModal);

function previousModal() {
  modalPicture.style.visibility = "hidden";
  const messageAlert = document.querySelector("#form-area > div > p");
  if (messageAlert !== null) {
    console.log(messageAlert);
    messageAlert.style.display = "none";
  }
}

precedentModal.addEventListener("click", previousModal);

closeSecondIconModal.addEventListener("click", closeModal);
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

const uploadArea = document.querySelector("#add-pictures > form > div > div");
const form = document.getElementById("form-area");

uploadArea.addEventListener("click", () => {
  const skeletonPicture = document.querySelector(".upload-area i");
  const btnArea = document.querySelector(".btn-area");
  const textArea = document.querySelector(".upload-area p");
  const imageArea = document.querySelector(".input-image");
  const addFile = document.querySelector(".input-upload-area");
  addFile.click();

  btnArea.classList.add("hide-area");
  textArea.classList.add("hide-area");
  addFile.onchange = () => {
    const [file] = addFile.files;
    if (file) {
      skeletonPicture.style.display = "none";
      const trashPadding = document.querySelector(".upload-area");
      imageArea.src = URL.createObjectURL(file);
      trashPadding.classList.add("cancel-padding");
      imageArea.style.display = "block";
    }
  };
});

async function sendData() {
  const formData = new FormData();
  const addInput = document.querySelector(".input-upload-area");
  const titleInput = document.querySelector("#title");
  const categoryInput = document.querySelector("#category");

  formData.append("image", addInput.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", categoryInput.value);
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    if (response.status === 201) {
      const trashPadding = document.querySelector(".upload-area");

      const skeletonPicture = document.querySelector(".upload-area i");
      const imageArea = document.querySelector(".input-image");
      const btnArea = document.querySelector(".btn-area");
      const textArea = document.querySelector(".upload-area p");
      trashPadding.classList.remove("cancel-padding");
      titleInput.value = "";
      skeletonPicture.style.display = "block";
      imageArea.style.display = "none";
      btnArea.classList.remove("hide-area");
      textArea.classList.remove("hide-area");
      createGallery();
      generateTrashCan();
      previousModal();
    } else if (response.status === 400) {
      alert("Veuillez vérifier que tous les champs sont remplis");
    } else if (response.status === 401) {
      alert("Vous n'avez pas l'authorisation de publier");
    } else if (response.status === 500) {
      alert("Une erreur s'est produite, veuillez réessayer");
    }
  } catch (error) {
    console.log(response);
    console.error(error);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});
