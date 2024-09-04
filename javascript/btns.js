function scaleImageOnHover() {
  const img = document.querySelector(".room img");
  const buttons = document.querySelectorAll(".green-button");

  let lastButton = null; 

  img.style.transform = "translateX(-50%)";
  img.style.transition = "transform 0.3s ease"; 

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      buttons.forEach((btn) => {
        if (btn !== button) {
          btn.style.opacity = "0";
        }
      });

      const buttonRect = button.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      const offsetX = buttonRect.left - imgRect.left + buttonRect.width / 2;
      const offsetY = buttonRect.top - imgRect.top + buttonRect.height / 2;

      const percentX = (offsetX / imgRect.width) * 100;
      const percentY = (offsetY / imgRect.height) * 100;

      lastButton = button;

      img.style.transformOrigin = `${percentX}% ${percentY}%`;

      img.style.transform = `translateX(-50%) scale(1.3)`;
    });

    button.addEventListener("mouseleave", () => {
      if (lastButton === button) {
        buttons.forEach((btn) => {
          btn.style.opacity = "1";
        });

        const buttonRect = button.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        const offsetX = buttonRect.left - imgRect.left + buttonRect.width / 2;
        const offsetY = buttonRect.top - imgRect.top + buttonRect.height / 2;

        const percentX = (offsetX / imgRect.width) * 100;
        const percentY = (offsetY / imgRect.height) * 100;

        img.style.transformOrigin = `${percentX}% ${percentY}%`;

        img.style.transform = "translateX(-50%) scale(1)";
      }
    });
  });
}

window.addEventListener("load", () => {
  adjustButtonContainers();
  scaleImageOnHover(); 
});

