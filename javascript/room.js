const hoverInSound = new Audio("../assets/click.mp3");

function playHoverInSound() {
  hoverInSound.currentTime = 0; 
  hoverInSound.play();
}

function calculateImageOverflowPercentage() {
  const img = document.querySelector(".room img");
  const imgRect = img.getBoundingClientRect();

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const imgWidth = imgRect.width;
  const imgHeight = imgRect.height;

  const visibleLeft = Math.max(
    0,
    Math.min(imgRect.right, viewportWidth) - Math.max(imgRect.left, 0)
  );
  const visibleTop = Math.max(
    0,
    Math.min(imgRect.bottom, viewportHeight) - Math.max(imgRect.top, 0)
  );
  const visibleWidth = Math.max(0, visibleLeft);
  const visibleHeight = Math.max(0, visibleTop);

  const visibleArea = visibleWidth * visibleHeight;
  const totalArea = imgWidth * imgHeight;

  const notVisibleArea = totalArea - visibleArea;

  const notVisiblePercentage = (notVisibleArea / totalArea) * 100;

/*   console.log(
    `Porcentaje de la imagen NO visible: ${notVisiblePercentage.toFixed(2)}%`
  ); */

  return {
    notVisiblePercentage,
    imgWidth,
    imgHeight,
  };
}

function adjustButtonContainers() {
  const img = document.querySelector(".room img");
  const buttonContainers = document.querySelectorAll(".button-container");
  const { notVisiblePercentage, imgWidth, imgHeight } =
    calculateImageOverflowPercentage();

  const initialGap = 100;

  const maxAdjustment = 60; 
  const gapAdjustment =
    (Math.max(imgWidth, imgHeight) * (notVisiblePercentage / 100)) / 2;

  const adjustedGap = Math.min(
    Math.max(initialGap, initialGap + gapAdjustment),
    initialGap + maxAdjustment
  );

  buttonContainers.forEach((container) => {
    container.style.width = `${imgWidth}px`; 
    container.style.height = `${imgHeight}px`; 
    container.style.top = `${
      img.getBoundingClientRect().top + window.scrollY
    }px`; 
    container.style.left = `${
      img.getBoundingClientRect().left + window.scrollX
    }px`; 

    container.style.gap = `${adjustedGap}px`;

    const buttons = container.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", playHoverInSound);
    });
  });
}

window.addEventListener("load", adjustButtonContainers);
window.addEventListener("resize", adjustButtonContainers);
