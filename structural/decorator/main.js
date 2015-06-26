var Soldier = function(firstName, lastName, rank) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.rank = rank;
};

Soldier.prototype = {
  fullName: function() {
    return this.lastName + ', ' + this.firstName;
  },

  description: function() {
    return this.fullName() + ' (' + this.rank + ')';
  }
};

Soldier.decorate = {
  award: function(soldier, name) {
    if(!soldier.awards) {
      soldier.awards = [];

      var base = soldier.description;
      soldier.description = function() {
        return base.call(this) + '; Awards: ' + this.awards.join(', ');
      };
    }

    soldier.awards.push(name);
  },
  medalOfHonor: function(soldier) {
    this.award(soldier, 'Medal Of Honor');
  },

  navyCross: function(soldier) {
    this.award(soldier, 'Navy Cross');
  },

  airForceCross: function(soldier) {
    this.award(soldier, 'Air Force Cross');
  }
};


var soldier = new Soldier('Peter', 'Griffin', 'General');
