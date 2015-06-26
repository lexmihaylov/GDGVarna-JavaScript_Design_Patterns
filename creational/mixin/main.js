var mixin = function(dst, src) {
  var i;
  for(i in src) {
    if(src.hasOwnProperty(i)) {
      dst[i] = src[i];
    }
  }
};

var Animateable = (function(){
  var animate = function(opt) {
    var newValue = parseInt(this.el.style[opt.prop]) +
      opt.step;

    if(opt.units) {
      newValue = newValue + opt.units;
    }

    this.el.style[opt.prop] = newValue;

    if(parseInt(this.el.style[opt.prop]) >= opt.to) {
      this.el.style[opt.prop] = opt.from;
    }
  };

  return {
    animate: function(prop, from, to, step, units) {
      if(!this.animation) {
        this.animation = [];
      }

      this.animation.push({
        prop: prop,
        from: from,
        to: to,
        step: step,
        units: units
      });
    },

    startAnimation: function() {
      this.animationStopped = false;

      var frame = (function() {
        var i = 0;

        for(; i < this.animation.length; i++) {
          animate.call(this, this.animation[i]);
        }

        if(this.animationStopped) return;

        requestAnimationFrame(frame);
      }).bind(this);

      frame();
    },

    stopAnimation: function() {
      this.animationStopped = true;
    }
  };
})();


var DomEl = function(type) {
  this.el = document.createElement(type);
  document.body.appendChild(this.el);
};

var Square = function() {
  DomEl.call(this, 'div');

  this.el.style.position = 'absolute';
  this.el.style.top = '30%';
  this.el.style.left = '45%';

  this.el.style.width = 100;
  this.el.style.height = 100;
  this.el.style.background = 'red';
};

Square.prototype = Object.create(DomEl.prototype);

mixin(Square.prototype, Animateable);

var Circle = function() {
  DomEl.call(this, 'div');

  this.el.style.width = 100;
  this.el.style.height = 100;
  this.el.style.position = 'absolute';
  this.el.style.top = '10%';
  this.el.style.left = '45%';
  this.el.style.borderRadius = '100px';

  this.el.style.background = 'green';
};

Circle.prototype = Object.create(DomEl.prototype);

mixin(Circle.prototype, Animateable);

window.addEventListener('load', function() {
  var squareEl = new Square();
  var circleEl = new Circle();

  squareEl.animate('left', 0, 100, 1, '%');
  squareEl.startAnimation();

  circleEl.animate('borderRadius', 0, 100, 1, '%');
  console.log(circleEl.el.style.borderRadius)
  circleEl.startAnimation();
});
