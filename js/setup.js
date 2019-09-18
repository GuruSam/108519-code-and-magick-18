'use strict';

var WIZARD_AMOUNT = 4;

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var genNumber = function (n) {
  return Math.floor(Math.random() * n);
};

var genWizards = function () {
  var arr = [];

  for (var i = 0; i < WIZARD_AMOUNT; i++) {
    var wizard = {};

    wizard.name = names[genNumber(names.length)] + ' ' + surnames[genNumber(surnames.length)];
    wizard.coatColor = coatColors[genNumber(coatColors.length)];
    wizard.eyesColor = eyesColors[genNumber(eyesColors.length)];

    arr.push(wizard);
  }

  return arr;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizardList = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

var setupDialog = document.querySelector('.setup');
var similarListElement = setupDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = genWizards();

setupDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

renderWizardList(wizards);
