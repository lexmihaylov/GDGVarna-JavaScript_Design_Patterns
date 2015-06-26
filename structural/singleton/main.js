var GeoApi = (function() {
  var apiUrl = 'http://freegeoip.net/json/';

  var get = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status !== 200) {
          throw "Cannot execure ajax request.";
        }

        callback(xhr.responseText);
      }
    };

    xhr.open('GET', url, true);
    xhr.send(null);
  };

  var FreeGeoIP = function() {};

  FreeGeoIP.prototype = {
    getLocation: function(host, callback) {
      get(apiUrl + host, function(res) {
        callback(JSON.parse(res));
      });
    }
  };

  var instance = null;
  return {
    instance: function() {
      if(instance === null) {
        instance = new FreeGeoIP();
      }

      return instance;
    }
  }
})();

function show(host) {
  GeoApi.instance().getLocation(host, function(location) {
    window.open('https://www.google.com/maps?q=' +
      location.latitude + ',' + location.longitude,
      'preview', 'width=800,height=600');
  });
};
