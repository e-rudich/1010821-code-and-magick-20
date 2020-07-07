'use strict';

(function () {
  var WIZARDS_NUMBER = 4;

  // Функция отрисовки одного волшебника
  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // Функция отрисовки массива похожих волшебников
  var renderWizards = function (wizards) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    wizards.slice(0, WIZARDS_NUMBER).forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
    similarListElement.appendChild(fragment);
  };

  window.generateWizards = renderWizards;
})();
