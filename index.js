const popup = document.querySelector(".popup"); // Модальное окно
// Контейнер для изображения в модалке
const imagePopupContainer = document.querySelector(".popup__img-wrapper");
// Картинка в модалке
let imagePopup;
// Контейнер для селектов
const popupSize = document.querySelector(".popup__size");
// тег <option></option>
let option;
// Значения размеров для модалки
let sizes = [];
// Запоминаю выбранный размер для модалки
let optionActive;

// Выбор категории товаров
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

// Функция для блокировки модального окна
const disableScrolling = () => {
  let x = window.scrollX;
  let y = window.scrollY;
  window.onscroll = () => {
    window.scrollTo(x, y);
  };
};

// Открытие модального окна
const openModalWindow = () => {
  popup.classList.add("popup__active");
};

// Закрытие модального окна
popup.addEventListener("click", (e) => {
  target = e.target;
  if (
    target.classList.contains("popup__active") ||
    target.classList.contains("popup__close")
  ) {
    popup.classList.remove("popup__active");
    window.onscroll = () => {};
    // Удалить картинку товара после закрытия
    imagePopupContainer.removeChild(imagePopup);
    //
    let optionsInModal = popupSize.querySelectorAll("option");
    optionsInModal.forEach((option) => {
      popupSize.removeChild(option);
    });
    sizes = [];
  }
});

// Слушатель событий внутри карточки
const cardListener = () => {
  const cards = document.querySelectorAll(".card");
  // Циклю для перебора всех карточек с товарами
  cards.forEach((card) => {
    // Слушатель на каждой карточке, который обрабатывает все события
    card.addEventListener("click", (e) => {
      let target = e.target;
      const photos = card.querySelectorAll(".card__image");

      // фильтрация выбора цвета
      if (target.checked && target.name === "color") {
        photos.forEach((photo) => {
          // Удаляю активный класс перед тем как установить новый
          photo.classList.remove("card__image-active");
          if (
            // фильтрую красную фотографию
            target.value === "red" &&
            photo.getAttribute("data-color") === "red"
          ) {
            photo.classList.add("card__image-active");
          } else if (
            // фильтрую черную фотографию
            target.value === "black" &&
            photo.getAttribute("data-color") === "black"
          ) {
            photo.classList.add("card__image-active");
          }
        });
        // Открыть модальное окно по кнопке
      } else if (target.classList.contains("card__order")) {
        const inputs = card.querySelectorAll(".card__size-input");
        // Добавляю варианты размеров в модалку
        // Перебираю все варианты размеров
        inputs.forEach((input) => {
          // Записываю только активные размеры
          if (!input.disabled) {
            sizes.push(input.value);
          }
          // Сохраняю выбранный размер
          if (input.checked) {
            optionActive = input;
          }
        });
        // Перебираю массив размеров и создаю <option></option> для каждого
        sizes.forEach((size) => {
          option = document.createElement("option");
          option.innerHTML = size;
          // Вставляю сохраненный выбранный рамер в модалку
          if (optionActive && optionActive.value === size) {
            option.selected = true;
          }
          popupSize.appendChild(option);
        });

        // Перебор картинок товара, для выбора активной
        photos.forEach((photo) => {
          if (photo.classList.contains("card__image-active")) {
            // Создаю копию картинки для модального окна
            imagePopup = photo.cloneNode(true);
            // Добавить картинку выбранного товара в модалку
            imagePopupContainer.appendChild(imagePopup);
          }
        });

        // Вставка имени товара в модальное окно
        let cardName = card.querySelector(".card__title");
        let popupTitle = document.querySelector(".popup__title");
        // innerHTML использовал намеренно для затирки предыдущего значения
        popupTitle.innerHTML = cardName.textContent;

        // Вставка цены на товар в модальное окно
        let oldPrice = card.querySelector(".card__price-old");
        let newPrice = card.querySelector(".card__price-new");
        let popupNewPrice = document.querySelector(".popup__price-new");
        let popupOldPrice = document.querySelector(".popup__price-old");
        // innerHTML использовал намеренно для затирки предыдущего значения
        popupNewPrice.innerHTML = newPrice.textContent;
        popupOldPrice.innerHTML = oldPrice.textContent;
        openModalWindow();
        disableScrolling();
      }
    });
  });
};
cardListener();
