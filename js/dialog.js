'use strict';

(function () {
  var setupDialog = document.querySelector('.setup');
  var userNameSetup = setupDialog.querySelector('.setup-user-name');
  var setupOpenIcon = document.querySelector('.setup-open');
  var setupCloseIcon = setupDialog.querySelector('.setup-close');
  var dialogHandle = setupDialog.querySelector('.upload');

  window.dialog = {
    setupDialog: setupDialog,
    userNameSetup: userNameSetup
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

    setupDialog.style.top = '';
    setupDialog.style.left = '';

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

  // Перетаскивание окна
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialog.style.top = (setupDialog.offsetTop - shift.y) + 'px';
      setupDialog.style.left = (setupDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  showSetupWindow();
})();
