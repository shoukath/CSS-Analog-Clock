var clock = {
  minute: 0,
  animLength: 0,
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

    // Initialize the animation
    this.$clock.children().addClass('normal-anim');
    this.getAnimLength();
  },
  addDashes: function () {
    var i, dash = $('<div class="dash">');
    for (i = 0; i < 12 ; i++) {
      dash
        .clone()
        .appendTo(this.$clock)
        .css({
          'transform': 'rotate(' + (i * 30) + 'deg)'
        });
    }
  },
  getAnimLength: function() {
    // Get the animation length and convert to ms
    var length = this.$clock.children().css('transition-duration');
    length = length.replace(/\D+/g, '');
    this.animLength = length * 1000;
  },
  runClock: function () {
    setInterval(this.setClockFace.bind(this), 1000);
  },
  setClockFace: function() {
    this.setSecondHand();
    this.setMinuteHand();
    this.setHourHand();
  },
  resetHandToZero: function($hand) {
    // Switch animation properties
    this.toggleAnimation($hand);
    
    // Invisibly move the hand to 0 degrees
    this.rotateHand($hand, 0);
    
    // Wait for this to render and then
    // switch the properties back
    var delay = this.animLength * 0.05;
    setTimeout(this.toggleAnimation.bind(this), delay, $hand);
  },
  toggleAnimation: function($hand) {
    $hand.toggleClass('normal-anim');
    $hand.toggleClass('invis-anim');
  },
  rotateHand: function($hand, angle) {
    $hand.css({
      'transform': 'rotate(' + angle + 'deg)'
    });
  },
  setHandAngle: function ($hand, number, max) {
    var rotationAngle = number / max * 360;
    if (max === 12) { // if it is hour
      rotationAngle += this.minute / 60 * 30;
    }
    
    // Animate all the way to 360 instead of 0
    // for smooth appearance
    if (rotationAngle === 0) {
      rotationAngle = 360;
    }
    
    this.rotateHand($hand, rotationAngle);
    
    // Need to invisibly reset hand to 0 degrees to avoid
    // counter-clockwise animation
    if(rotationAngle === 360) {
      // Wait for previous animation to finish
      var delay = this.animLength * 0.9;
      setTimeout(this.resetHandToZero.bind(this), delay, $hand);
    }
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