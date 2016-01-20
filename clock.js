var clock = {
  minute: 0,
  init: function () {
    this.generateClock();
    this.runClock();
  },
  generateClock: function () {
    this.$clock = $('<div class="clock">' +
        '<div class="hour"/>' +
        '<div class="minute"/>' +
        '<div class="second"/>' +
       '</div>');
    this.$clock.appendTo('body');
    this.addDashes();
  },
  addDashes: function () {
    var i, dash = $('<div class="dash">');
    for (i = 0; i < 12 ; i++) {
      dash
        .clone()
        .appendTo(this.$clock)
        .css({
          'transform': 'rotate('+ (i * 30) +'deg)'
        });
    }
  },
  runClock: function () {
    setInterval(this.setClockFace.bind(this), 1000);
  },
  setClockFace: function() {
    this.setSecondHand();
    this.setMinuteHand();
    this.setHourHand();
  },
  setHandAngle: function ($hand, number, max) {
    var rotationAngle = number / max * 360;
    if (max === 12) { // if it is hour
      rotationAngle += this.minute / 60 * 30;
    }
    $hand.css({
      'transform': 'rotate('+rotationAngle+'deg)'
    });
  },
  setHourHand: function () {
    var hour = moment().format('h'),
        $hand = $('.hour');
    this.setHandAngle($hand, hour, 12);
  },
  setMinuteHand: function () {
    var $minute = $('.minute');
    this.minute = moment().minute();
    this.setHandAngle($minute, this.minute, 60);
  },
  setSecondHand: function () {
    var second = moment().second(),
        $second = $('.second');
    this.setHandAngle($second, second, 60);
  }
};

clock.init();