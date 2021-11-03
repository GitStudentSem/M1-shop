// Выбор категории
const categorySelection = () => {
  const inputs = document.querySelector(".catalog__inputs");
  const everyday = document.querySelector(".everyday");
  const erotic = document.querySelector(".erotic");
  inputs.addEventListener("click", (e) => {
    if (e.target.checked && e.target.id === "everyday") {
      erotic.style.display = "none";
      everyday.style.display = "flex";
    } else if (e.target.checked && e.target.id === "erotic") {
      erotic.style.display = "flex";
      everyday.style.display = "none";
    }
  });
};
categorySelection();
// let black = photos.querySelector('[data-color="black"]');
const cardListener = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      let target = e.target;
      const photos = card.querySelectorAll(".card__image");
      // фильтрация выбора цвета
      if (target.checked && target.name === "color") {
        photos.forEach((photo) => {
          // Удаляю активный класс перед тем как установить новый
          photo.classList.remove("card__image-active");
          if (
            // фильтрую лишние puctire
            target.value === "red" &&
            photo.getAttribute("data-color") === "red"
          ) {
            photo.classList.add("card__image-active");
          } else if (
            // фильтрую лишние puctire
            target.value === "black" &&
            photo.getAttribute("data-color") === "black"
          ) {
            photo.classList.add("card__image-active");
          }
        });
      }
    });
  });
};
cardListener();
