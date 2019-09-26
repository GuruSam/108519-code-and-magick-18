'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizardParams = {
  amount: 4,
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
  fireballColors: ['rgb(238, 72, 48)', 'rgb(48, 168, 238)', 'rgb(92, 230, 192)', 'rgb(232, 72, 213)', 'rgb(230, 232, 72)'],
  someColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var getRandomArrayItem = function (arr) {
  var i = Math.floor(Math.random() * arr.length);
  return arr[i];
};

var genWizards = function (params) {
  var arr = [];

  for (var i = 0; i < params.amount; i++) {
    var wizard = {};

    wizard.name = getRandomArrayItem(params.names) + ' ' + getRandomArrayItem(params.surnames);
    wizard.coatColor = getRandomArrayItem(params.coatColors);
    wizard.eyesColor = getRandomArrayItem(params.eyesColors);

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

var changeColor = function (el, colors) {
  if (el.classList.contains('setup-fireball-wrap')) {
    var hiddenInput = el.querySelector('input[name="fireball-color"]');
    var color = getNextColor(hiddenInput.value, colors);

    el.style.backgroundColor = color;
    hiddenInput.value = color;
  }

  if (el.classList.contains('wizard-coat')) {
    el.style.fill = getNextColor(el.style.fill, colors);
    document.querySelector('input[name="coat-color"]').value = el.style.fill;
  }

  if (el.classList.contains('wizard-eyes')) {
    el.style.fill = getNextColor(el.style.fill, colors);
    document.querySelector('input[name="eyes-color"]').value = el.style.fill;
  }
};

var getNextColor = function (current, colors) {
  var currentColor = colors.indexOf(current);
  var nextColor = currentColor === colors.length - 1 ? 0 : currentColor + 1;

  return colors[nextColor];
};

var openSetup = function () {
  setupDialog.classList.remove('hidden');
  document.addEventListener('keydown', setupEscPressHandler);
};

var closeSetup = function () {
  setupDialog.classList.add('hidden');
  document.removeEventListener('keydown', setupEscPressHandler);
};

var setupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
};

var setupDialog = document.querySelector('.setup');
var wizardNameInput = setupDialog.querySelector('.setup-user-name');

var similarListElement = setupDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = genWizards(wizardParams);

var setupOpen = document.querySelector('.setup-open');
var setupClose = setupDialog.querySelector('.setup-close');

var wizardCoatElement = setupDialog.querySelector('.setup-wizard .wizard-coat');
var wizardEyesElement = setupDialog.querySelector('.setup-wizard .wizard-eyes');
var fireballElement = setupDialog.querySelector('.setup-fireball-wrap');

setupOpen.addEventListener('click', function () {
  openSetup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});
wizardNameInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});
wizardCoatElement.addEventListener('click', function () {
  changeColor(wizardCoatElement, wizardParams.coatColors);
});
wizardEyesElement.addEventListener('click', function () {
  changeColor(wizardEyesElement, wizardParams.eyesColors);
});
fireballElement.addEventListener('click', function () {
  changeColor(fireballElement, wizardParams.someColors);
});

document.querySelector('.setup-similar').classList.remove('hidden');

renderWizardList(wizards);
