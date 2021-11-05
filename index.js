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
// Блоки категорий
const everyday = document.querySelector(".everyday");
const erotic = document.querySelector(".erotic");

// Показать блок категории
const showCategoryBlock = (showBlock, hideBlock) => {
  showBlock.classList.add("catalog__type-active");
  hideBlock.classList.remove("catalog__type-active");
};

// Выбор категории товаров
const categorySelection = () => {
  const inputs = document.querySelector(".catalog__inputs");
  inputs.addEventListener("click", (e) => {
    let target = e.target;
    if (target.checked && target.id === "everyday-input") {
      showCategoryBlock(everyday, erotic);
    } else if (target.checked && target.id === "erotic-input") {
      showCategoryBlock(erotic, everyday);
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

// Функция для плавного скролла
const smoothScroll = (scrollLink) => {
  const id = scrollLink.getAttribute("href");
  console.log(document.querySelector(id));
  document.querySelector(id).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

// Отправка в разные секции из шапки
const navMenu = document.querySelector(".header__nav");
navMenu.addEventListener("click", (e) => {
  let target = e.target;
  e.preventDefault();
  if (target.getAttribute("href") === "#catalog") {
    smoothScroll(target);
  } else if (target.getAttribute("href") === "#description") {
    smoothScroll(target);
  } else if (target.getAttribute("href") === "#order") {
    smoothScroll(target);
  }
});

// Отправление в каталог из главной секции
const mainButtons = document.querySelector(".main__button-wrapper");
mainButtons.addEventListener("click", (e) => {
  let target = e.target;
  e.preventDefault();
  const everyDayInput = document.getElementById("everyday-input");
  const eroticInput = document.getElementById("erotic-input");
  if (target.getAttribute("href") === "#everyday") {
    showCategoryBlock(everyday, erotic);
    everyDayInput.checked = true;
  } else if (target.getAttribute("href") === "#erotic") {
    showCategoryBlock(erotic, everyday);
    eroticInput.checked = true;
  }
  smoothScroll(target);
});

// Открытие модального окна
const openModalWindow = () => {
  popup.classList.add("popup__active");
};

// Закрытие модального окна
const closeModal = () => {
  popup.classList.remove("popup__active");
  window.onscroll = () => {};
  // Удалить картинку товара после закрытия
  // Проверка на наличие картинки (для маленьких экранов она удаляетя)
  if (imagePopup) {
    imagePopupContainer.removeChild(imagePopup);
  }
  // Очистка <select></select>
  let optionsInModal = popupSize.querySelectorAll("option");
  optionsInModal.forEach((option) => {
    popupSize.removeChild(option);
  });
  // Очистка массива размеров
  sizes = [];
};

// Обработка событий внутри модального окна
popup.addEventListener("click", (e) => {
  target = e.target;
  if (
    target.classList.contains("popup__active") ||
    target.classList.contains("popup__close")
  ) {
    closeModal();
  } else if (target.classList.contains("popup__order")) {
    return;
  }
});

// Слушатель событий внутри карточки
const cardListener = () => {
  const cards = document.querySelectorAll(".card");
  // Цикл для перебора всех карточек с товарами
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
          option.value = size;
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

//Работа с формой
const formSubmit = () => {
  const name = document.querySelector(".popup__name");
  const phone = document.querySelector(".popup__phone");
  const form = document.querySelector("form");
  // Кнопка заказать
  const orderButton = document.querySelector(".popup__order");

  const validation = (input) => {
    if (!input.value.trim()) {
      input.classList.add("popup__error");
      return false;
    }
    input.classList.remove("popup__error");
    return true;
  };

  // Блокировка кнопки отправить при не валидных полях
  form.addEventListener("input", () => {
    if (validation(name) && validation(phone)) {
      orderButton.disabled = false;
    } else {
      orderButton.disabled = true;
    }
  });
  // Отправка формы на сервер
  const textStatus = document.createElement("p");
  textStatus.classList.add("popup__status");
  const errorMessage = "Что-то пошло не так...";
  const loadMessage = "Секунду...";
  const successMessage = "Ваш заказ формлен";
  // Через 2 секунды сообщение статуса удаляется
  // И модальное окно закрывается
  const deleteMessage = () => {
    setTimeout(() => {
      form.removeChild(textStatus);
      closeModal();
    }, 3000);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.appendChild(textStatus);

    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      textStatus.textContent = loadMessage;
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        textStatus.textContent = successMessage;
        deleteMessage();
      } else {
        textStatus.textContent = errorMessage;
        deleteMessage();
      }
    });
    request.open("POST", "./server.php");
    request.setRequestHeader("Content-Type", "multipart/form-data");
    const formData = new FormData(form);
    request.send(formData);
  });
};
formSubmit();
