'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomArray = function (arr, length) {
    var newArr = [];
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      newArr.push(arr[i]);
    }

    for (var j = 0; j < length; j++) {
      var index = Math.floor(Math.random() * newArr.length);
      var item = newArr[index];
      newArr.splice(newArr.indexOf(item), 1);
      result.push(item);
    }

    return result;
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomArray: getRandomArray
  };
})();
