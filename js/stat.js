'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.3)';
var TEXT_COLOR = '#000';
var TEXT_STYLE = '16px PT Mono';

var FONT_GAP = 20;
var TEXT_HEIGHT = 35;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, font, color, text, x, y) {
  ctx.font = font;
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (items) {
  return items.reduce(function (accumulator, currentValue) {
    return currentValue > accumulator ? currentValue : accumulator;
  }, -Infinity);
};

var getRandom = function (max) {
  return Math.round(Math.random() * Math.floor(max));
};

var renderBar = function (ctx, barCoordinateX, barCoordinateY, barWidth, barHeight) {
  ctx.fillRect(barCoordinateX, barCoordinateY, barWidth, barHeight);
};

var renderChart = function (ctx, arrayPlayers, arrayTimes) {
  var maxTime = getMaxElement(arrayTimes);

  arrayPlayers.forEach(function (item, i, players) {
    var barHeight = (BAR_MAX_HEIGHT * arrayTimes[i]) / maxTime;
    var barWidth = BAR_WIDTH;
    var coordinateX = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
    var coordinateY = CLOUD_HEIGHT - barHeight - TEXT_HEIGHT;

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(arrayTimes[i]), coordinateX, coordinateY - FONT_GAP);
    ctx.fillText(players[i], coordinateX, CLOUD_HEIGHT - FONT_GAP);

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + getRandom(100) + '%, 50%)';

    renderBar(ctx, coordinateX, coordinateY, barWidth, barHeight);
  });
};



window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  renderText(ctx, TEXT_STYLE, TEXT_COLOR, 'Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  renderText(ctx, TEXT_STYLE, TEXT_COLOR, 'Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  renderChart(ctx, players, times);
};
