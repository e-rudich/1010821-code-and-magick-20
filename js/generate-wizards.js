'use strict';

(function () {
  var WIZARDS_NUMBER = 4;

  // Функция генерации числа волшебников со случайными характеристиками
  var generateWizards = function (count) {
    var wizards = [];
    for (var i = 0; i < count; i++) {
      var wizard = {
        name: window.utils.getRandomElement(window.data.wizardNames) + ' ' + window.utils.getRandomElement(window.data.wizardLastNames),
        coatColor: window.utils.getRandomElement(window.data.coatColors),
        eyesColor: window.utils.getRandomElement(window.data.eyesColors)
      };
      wizards.push(wizard);
    }
    return wizards;
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

  var wizards = generateWizards(WIZARDS_NUMBER);
  renderWizards(wizards);
})();
