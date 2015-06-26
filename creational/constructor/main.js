var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  // we don't have attribute accessors in javascript so we need to implement it
  // ourselves
  // private variable capsulated in the constructor function;
  var isSingle = false;

  // another way to implement private variables
  this.__isEmployed = false;

  this.fullName = function() {
    return this.firstName + ' ' + this.lastName;
  };

  this.isSingle = function() {
    return isSingle;
  };

  this.isEmployed = function() {
    return this._isEmployed;
  }

  this.setEmployed = function(val) {
    this._isEmployed = val;
  };

  this.setSingle = function(val) {
    isSingle = val;
  };
};

var me = new Person("Alexander", "Mihaylov");

function main() {

  if(me.isEmployed()) {
    alert(me.fullName() + ', a miracle happened and you got a job!');
  }

  if(me.isSingle()) {
    if(confirm('View why?')) {
      window.open('http://weknowmemes.com/wp-content/uploads/2012/02/why-im-single-paladin.jpg',
        'popup',
        'width=800,height=600');
    }
  }
};

// Inheritance
var Employee = function(firstName, lastName, company, jobTitle) {
  Person.call(this, firstName, lastName);
  this.setEmployed(true);

  this.company = company;
  this.jobTitle = jobTitle;

  this.description = function() {
    return this.jobTitle + " @ " + this.company;
  };

  // override isSingle method
  var baseMethod = this.isSingle;
  this.isSingle = function() {
    baseMethod.call(this));
    throw 'Irrelevant'
  }
};

me = new Employee('Alexander', 'Mihaylov', 'MentorMate', 'JavaScript Developer');
