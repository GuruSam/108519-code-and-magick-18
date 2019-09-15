'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var TEXT_HEIGHT = 42;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = 0;

  for (var i = 0; i < arr.length; i++) {
    if (Math.ceil(arr[i]) > maxElement) {
      maxElement = Math.ceil(arr[i]);
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var newHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var barHeightGap = BAR_HEIGHT - newHeight;

    ctx.fillText(Math.ceil(times[i]), CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP * 3 + TEXT_HEIGHT + barHeightGap);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = Math.floor(Math.random() * 100);
      ctx.fillStyle = 'hsl(250, ' + saturation + '%, 50%)';
    }

    ctx.fillRect(CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP * 4 + TEXT_HEIGHT + barHeightGap, BAR_WIDTH, newHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP * 6 + TEXT_HEIGHT + BAR_HEIGHT);
  }
};
