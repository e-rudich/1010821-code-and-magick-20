'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var FONT_GAP = 20;
var TEXT_HEIGHT = 35;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandom = function (max) {
  return Math.round(Math.random() * Math.floor(max));
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - barHeight - TEXT_HEIGHT - FONT_GAP);
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP);

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + getRandom(100) + '%, 50%)';

    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - barHeight - TEXT_HEIGHT, BAR_WIDTH, barHeight);
  }
};

// window.renderStatistics = function (ctx) {
//   ctx.fillStyle = '#fff';
//   ctx.beginPath();
//   ctx.lineTo(110, 20);
//   ctx.lineTo(110, 290);
//   ctx.lineTo(530, 290);
//   ctx.lineTo(530, 20);
//   ctx.bezierCurveTo(530, 20, 470, 0, 410, 20);
//   ctx.bezierCurveTo(410, 20, 360, 0, 310, 20);
//   ctx.bezierCurveTo(310, 20, 210, 0, 110, 20);
//   ctx.lineTo(400, 20);
//   ctx.closePath();
//   ctx.fill();
// };
// не придумала как это записать в renderCloud
