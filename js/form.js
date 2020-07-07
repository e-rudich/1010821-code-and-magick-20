'use strict';

(function () {
  var form = document.querySelector('.setup-wizard-form');

  var showError = function (message) {
    var errorMessage = document.createElement('div');
    errorMessage.style = 'padding: 20px; margin: 0 auto; border: 5px solid red; background-color: white; position: absolute; left: 10px; right: 10px; top: 200px; text-align: center;';
    errorMessage.textContent = message;
    form.appendChild(errorMessage);
  };

  var onSuccessLoad = function (data) {
    window.generateWizards(data);
  };

  var onErrorLoad = function (message) {
    showError(message);
  };

  var onSuccessUpload = function () {
    window.dialog.closePopup();
  };

  var onErrorUpload = function (message) {
    showError(message);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessUpload, onErrorUpload);
  });

  window.backend.load(onSuccessLoad, onErrorLoad);
})();
