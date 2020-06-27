'use strict';

(function () {
// Валидация имени персонажа
  window.dialog.userNameSetup.addEventListener('input', function () {
    if (window.dialog.userNameSetup.validity.tooShort) {
      window.dialog.userNameSetup.setCustomValidity('Имя слишком короткое. Введите не меньше 2 символов');
    } else if (window.dialog.userNameSetup.validity.tooLong) {
      window.dialog.userNameSetup.setCustomValidity('Имя сдишклм длинное. Введите не больше 25 символов');
    } else if (window.dialog.userNameSetup.validity.valueMissing) {
      window.dialog.userNameSetup.setCustomValidity('Введите имя персонажа');
    } else {
      window.dialog.userNameSetup.setCustomValidity('');
    }
  });
})();
