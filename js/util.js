'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomArrayItem = function (arr) {
    var i = Math.floor(Math.random() * arr.length);
    return arr[i];
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomArrayItem: getRandomArrayItem
  };
})();
