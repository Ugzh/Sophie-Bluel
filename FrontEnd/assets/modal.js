const reponse = await fetch("http://localhost:5678/api/works");
const pictures = await reponse.json();

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
