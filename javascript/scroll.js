function adjustButtonContainers() {
  const img = document.querySelector(".room img");
  const buttonContainers = document.querySelectorAll(".button-container");

  buttonContainers.forEach((container) => {
    container.style.width = `${img.offsetWidth}px`;
    container.style.height = `${img.offsetHeight}px`;

    container.style.position = "absolute";
    container.style.left = `${(img.offsetWidth - container.offsetWidth) / 2}px`;
    container.style.top = "0";
  });
}

function centerImage() {
  const img = document.querySelector(".room img");
  const draggableRoom = document.getElementById("draggable-room");

  const imgWidth = img.offsetWidth;
  const imgHeight = img.offsetHeight;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const left = (viewportWidth - imgWidth) / 2;
  const top = (viewportHeight - imgHeight) / 2;

  draggableRoom.style.position = "absolute";
  draggableRoom.style.left = `${left}px`;
  draggableRoom.style.top = `${top}px`;

  adjustButtonContainers();
}

window.addEventListener("load", () => {
  centerImage();
  adjustButtonContainers();
});
window.addEventListener("resize", () => {
  centerImage();
  adjustButtonContainers();
});

let isDragging = false;
let startX, startY, initialLeft, initialTop;

const draggableRoom = document.getElementById("draggable-room");
const img = document.querySelector(".room img");

draggableRoom.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;

  const rect = draggableRoom.getBoundingClientRect();
  initialLeft = rect.left;
  initialTop = rect.top;

  draggableRoom.style.cursor = "grabbing";

  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const roomWidth = draggableRoom.offsetWidth;
  const roomHeight = draggableRoom.offsetHeight;

  const imgWidth = img.offsetWidth;
  const imgHeight = img.offsetHeight;

  const maxLeft = imgWidth - roomWidth;
  const minLeft = Math.min(0, viewportWidth - imgWidth);

  const maxTop = 0;
  const minTop = Math.min(0, viewportHeight - imgHeight);

  const newLeft = Math.max(minLeft, Math.min(maxLeft, initialLeft + deltaX));
  const newTop = Math.max(minTop, Math.min(maxTop, initialTop + deltaY));

  draggableRoom.style.left = `${newLeft}px`;
  draggableRoom.style.top = `${newTop}px`;

  adjustButtonContainers();
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  draggableRoom.style.cursor = "grab";
});

document.addEventListener("mouseleave", () => {
  isDragging = false;
  draggableRoom.style.cursor = "grab";
});
