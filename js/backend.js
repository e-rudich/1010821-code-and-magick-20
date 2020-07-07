'use strict';

(function () {
  var URL_POST = 'https://javascript.pages.academy/code-and-magick';
  var URL_GET = 'https://javascript.pages.academy/code-and-magick/data';

  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка');
      }
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка запроса');
    });

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
