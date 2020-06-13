'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_NUMBER = 4;

var setupDialog = document.querySelector('.setup');
var setupOpenIcon = document.querySelector('.setup-open');
var setupCloseIcon = setupDialog.querySelector('.setup-close');

var userNameSetup = setupDialog.querySelector('.setup-user-name');

var fireballColorSetup = setupDialog.querySelector('.setup-fireball-wrap');
var fireColorInput = setupDialog.querySelector('input[name="fireball-color"]');

var coatColorSetup = setupDialog.querySelector('.wizard-coat');
var coatColorInput = setupDialog.querySelector('input[name="coat-color"]');

var eyesColorSetup = setupDialog.querySelector('.wizard-eyes');
var eyesColorInput = setupDialog.querySelector('input[name="eyes-color"]');

// Функция получения случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Функция получения случайного элемента массива
var getRandomElement = function (items) {
  var randomIndex = getRandomNumber(0, items.length - 1);
  return items[randomIndex];
};

// Функция генерации числа волшебников со случайными характеристиками
var generateWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    var wizard = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_LASTNAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    };
    wizards.push(wizard);
  }
  return wizards;
};

// Функции для слушателей событий
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== userNameSetup) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setupDialog.classList.remove('hidden');
  setupDialog.querySelector('.setup-similar').classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupDialog.classList.add('hidden');
  setupDialog.querySelector('.setup-similar').classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

// Функция показа и закрытия окна при помощи слушателей
var showSetupWindow = function () {
  setupOpenIcon.addEventListener('click', function () {
    openPopup();
  });

  setupCloseIcon.addEventListener('click', function () {
    closePopup();
  });

  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });
};

// Функция отрисовки одного волшебника
var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Функция отрисовки массива похожих волшебников
var renderWizards = function (wizards) {
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });
  similarListElement.appendChild(fragment);
};

// Функция выбора цвета фаербола по клику
var fireballClickHandler = function () {
  var fireColor = getRandomElement(FIREBALL_COLORS);
  fireballColorSetup.style.backgroundColor = fireColor;
  fireColorInput.value = fireColor;
};

// Функция выбора цвета мантии по клику
var coatClickHandler = function () {
  var coatColor = getRandomElement(COAT_COLORS);
  coatColorSetup.style.fill = coatColor;
  coatColorInput.value = coatColor;
};

// Функция выбора цвета глаз по клику
var eyesClickHandler = function () {
  var eyesColor = getRandomElement(EYES_COLORS);
  eyesColorSetup.style.fill = eyesColor;
  eyesColorInput.value = eyesColor;
};

// Валидация имени персонажа
userNameSetup.addEventListener('input', function () {
  if (userNameSetup.validity.tooShort) {
    userNameSetup.setCustomValidity('Имя слишком короткое. Введите не меньше 2 символов');
  } else if (userNameSetup.validity.tooLong) {
    userNameSetup.setCustomValidity('Имя сдишклм длинное. Введите не больше 25 символов');
  } else if (userNameSetup.validity.valueMissing) {
    userNameSetup.setCustomValidity('Введите имя персонажа');
  } else {
    userNameSetup.setCustomValidity('');
  }
});

var wizards = generateWizards(WIZARDS_NUMBER);
renderWizards(wizards);
showSetupWindow();

fireballColorSetup.addEventListener('click', fireballClickHandler);
coatColorSetup.addEventListener('click', coatClickHandler);
eyesColorSetup.addEventListener('click', eyesClickHandler);
