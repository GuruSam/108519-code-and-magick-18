'use strict';

(function () {
  var lastTimeout;

  var getRank = function (wizard, coatColor, eyesColor) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    var wizards = window.wizard.similar.slice();
    var coatColor = document.querySelector('input[name="coat-color"]').value;
    var eyesColor = document.querySelector('input[name="eyes-color"]').value;

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(function () {
      wizards.sort(function (left, right) {
        return getRank(right, coatColor, eyesColor) - getRank(left, coatColor, eyesColor);
      });

      window.wizard.renderList(wizards);
    }, 600);
  };

  window.backend.load(function (data) {
    window.wizard.similar = data;
    window.wizard.renderList(data);
    updateWizards();
  });

  window.updateWizards = updateWizards;
})();
