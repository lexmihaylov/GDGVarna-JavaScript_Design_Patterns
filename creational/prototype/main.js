var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  // we don't have attribute accessors in javascript so we need to implement it
  // ourselves
  // private variable capsulated in the constructor function;
  this.__isSingle = false;

  // another way to implement private variables
  this.__isEmployed = false;
};

Person.prototype = {
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  },

  isSingle: function() {
    return this.__isSingle;
  },

  isEmployed: function() {
    return this.__isEmployed;
  },

  setEmployed: function(val) {
    this.__isEmployed = val;
  },

  setSingle: function(val) {
    this.__isSingle = val;
  }
};

var me = new Person("Alexander", "Mihaylov");

function main() {

  if(me.isEmployed()) {
    alert('I\'ve seen you working.');
    window.open('http://ccurgent.com/IndustrialBlog/wp-content/uploads/2014/09/sleeping-on-the-job.jpg',
      'popup',
      'width='+screen.width+',height='+screen.height);
  }
};

// Inheritance
var Employee = function(firstName, lastName, company, jobTitle) {
  Person.call(this, firstName, lastName);
  this.setEmployed(true);

  this.jobTitle = jobTitle;
  this.company = company;
};

Employee.prototype = Object.create(Person.prototype);

Employee.prototype.description = function() {
    return this.jobTitle + " @ " + this.company;
};

// override isSingle method
Employee.prototype.isSingle = function() {
    console.log(Person.prototype.isSingle.call(this));
    throw 'Irrelevant';
};

me = new Employee('Alexander', 'Mihaylov', 'MentorMate', 'Javascript Developer');
