'use strict';

(function () {
  // Функция получения случайного числа
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Функция получения случайного элемента массива
  var getRandomElement = function (items) {
    var randomIndex = getRandomNumber(0, items.length - 1);
    return items[randomIndex];
  };

  window.utils = {
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber
  };
})();
