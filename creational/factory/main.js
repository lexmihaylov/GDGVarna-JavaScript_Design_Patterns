var Hosting = function(name, languages) {
  this.__name = name;
  this.__languages = languages;
};

Hosting.prototype = {
  getName: function() {
    return this.__name;
  },

  getLanguages: function() {
    return this.__languages.join(', ');
  }
};


var HostingFactory = (function() {
  var hostings = {
    google: {
      fullName: 'GoogleAppEngine',
      languages: [
        'php',
        'java',
        'python',
        'go'
      ]
    },
    amazon: {
      fullName: 'AmazonCloudServices',
      languages: [
        'ruby',
        'python',
        'nodejs',
        'erlang'
      ]
    },
    windows: {
      fullName: 'MicrosoftAzure',
      languages: [
        '.NET'
      ]
    }
  };

  return {
    create: function(name) {
      if(hostings[name]) {
        return new Hosting(hostings[name].fullName, hostings[name].languages);
      } else {
          throw "Undefined hosting provider";
      }
    },
  };
})();


var googleHosting = HostingFactory.create('google');
console.log('Provider: ' + googleHosting.getName() + '; Supported Languages:' + googleHosting.getLanguages());

var amazonHosting = HostingFactory.create('amazon');
console.log('Provider: ' + amazonHosting.getName() + '; Supported Languages:' + amazonHosting.getLanguages());

var windowsHosting = HostingFactory.create('windows');
console.log('Provider: ' + windowsHosting.getName() + '; Supported Languages:' + windowsHosting.getLanguages());
