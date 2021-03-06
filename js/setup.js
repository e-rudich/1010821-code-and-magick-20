'use strict';

(function () {

  var fireballColorSetup = window.dialog.setup.querySelector('.setup-fireball-wrap');
  var fireColorInput = window.dialog.setup.querySelector('input[name="fireball-color"]');

  var coatColorSetup = window.dialog.setup.querySelector('.wizard-coat');
  var coatColorInput = window.dialog.setup.querySelector('input[name="coat-color"]');

  var eyesColorSetup = window.dialog.setup.querySelector('.wizard-eyes');
  var eyesColorInput = window.dialog.setup.querySelector('input[name="eyes-color"]');

  // Функция выбора цвета фаербола по клику
  var fireballClickHandler = function () {
    var fireColor = window.utils.getRandomElement(window.data.fireballColors);
    fireballColorSetup.style.backgroundColor = fireColor;
    fireColorInput.value = fireColor;
  };

  // Функция выбора цвета мантии по клику
  var coatClickHandler = function () {
    var coatColor = window.utils.getRandomElement(window.data.coatColors);
    coatColorSetup.style.fill = coatColor;
    coatColorInput.value = coatColor;
    window.debounce(function () {
      window.wizards.update(window.form.wizards);
    })();
  };

  // Функция выбора цвета глаз по клику
  var eyesClickHandler = function () {
    var eyesColor = window.utils.getRandomElement(window.data.eyesColors);
    eyesColorSetup.style.fill = eyesColor;
    eyesColorInput.value = eyesColor;
    window.debounce(function () {
      window.wizards.update(window.form.wizards);
    })();
  };

  fireballColorSetup.addEventListener('click', fireballClickHandler);
  coatColorSetup.addEventListener('click', coatClickHandler);
  eyesColorSetup.addEventListener('click', eyesClickHandler);

})();
