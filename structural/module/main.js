(function(root) {
  var SecretIdentity = function(parent, firstName, lastName, jobTitle) {
    this.parent = parent;
    this.firstName = firstName;
    this.lastName = lastName;
    this.jobTitle = jobTitle;
  };

  SecretIdentity.prototype = {
    reveal: function() {
      return this.parent.name + ' is ' +
        this.firstName + ' ' + this.lastName + ' and works as ' +
        this.jobTitle;
    }
  };

  var SuperHero = function(name, superPowers) {
    this.name = name;
    this.superPowers = superPowers;

    this.__secretIdentity = null;
  };

  SuperHero.prototype = {
    secretIdentity: function(firstName, lastName, jobTitle) {
      if (arguments.length === 3) {
        this.__secretIdentity = new SecretIdentity(this, firstName, lastName, jobTitle);
        return;
      }

      return this.__secretIdentity;
    },
  };


  root.SuperHero = SuperHero;
})(this);


var superMan = new SuperHero('Super Man', ['flay', 'xray vision', 'super strength']);
superMan.secretIdentity('Clark', 'Kent', 'a journalist');

var batMan = new SuperHero('Bat Man', ['has a lot of money!!!']);
batMan.secretIdentity('Bruce', 'Wayne', 'a billionaire/playboy');
