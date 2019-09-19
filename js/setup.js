'use strict';

var WIZARD_AMOUNT = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var randomArrayItem = function (arr) {
  var i = Math.floor(Math.random() * arr.length);
  return arr[i];
};

var genWizards = function (names, surnames, coats, eyes, total) {
  var arr = [];

  for (var i = 0; i < total; i++) {
    var wizard = {};

    wizard.name = randomArrayItem(names) + ' ' + randomArrayItem(surnames);
    wizard.coatColor = randomArrayItem(coats);
    wizard.eyesColor = randomArrayItem(eyes);

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

var wizards = genWizards(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS, WIZARD_AMOUNT);

setupDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

renderWizardList(wizards);
