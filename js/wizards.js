'use strict';

(function () {
  var WIZARDS_NUMBER = 4;

  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var wizardsAll = [];

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var similarListElement = document.querySelector('.setup-similar-list');

  // Функция отрисовки одного волшебника
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // Функция отрисовки похожих волшебников
  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    wizards.slice(0, WIZARDS_NUMBER).forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
    similarListElement.appendChild(fragment);
  };

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderWizards(wizardsAll.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizards = {
    render: renderWizards,
    update: updateWizards
  };
})();
