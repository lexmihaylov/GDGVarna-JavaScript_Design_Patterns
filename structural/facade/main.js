var Http = (function() {
  //
  //
  // NONE OF THIS MODULES INTERNALS WILL BE EXPOSED
  //
  //


  var requestReady = function() {
    if(this.req.readyState === 4) {
      if(this.req.status !== 200) {
        throw "Cannot execure ajax request.";
      }

      this._handler(this.req.responseText);
    }
  };

  var object2UrlParams = function(object) {
    var params = [];
    for(var i in object) {
      params.push(encodeURIComponent(i) + '=' + encodeURIComponent(object[i]));
    }

    return params.join('&');
  };

  // Base http class
  var HttpRequest = function(method, url, data) {
    this.req = new XMLHttpRequest();
    this._handler;
    this._method = method;
    this._url = url;
    if(data) {
      this._data = object2UrlParams(data);
    }
  };

  HttpRequest.prototype.send = function() {
    this.req.onreadystatechange = requestReady.bind(this);

    this.req.open(this._method, this._url, true);

    if(this._data) {
      this.req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }

    this.req.send(this._data || null);
  };

  HttpRequest.prototype.onSuccess = function(callback) {
    this._handler = callback;
  };

  // Get request class
  var GetRequest = function(url) {
    HttpRequest.call(this, 'GET', url);
  };
  GetRequest.prototype = Object.create(HttpRequest.prototype);

  // Post request class
  PostRequest = function(url, data) {
    HttpRequest.call(this, 'POST', url, data);
  };
  PostRequest.prototype = Object.create(HttpRequest.prototype);

  // exposing GET and POST classes via facade functions
  return {
    get: function(url, callback) {
      var request = new GetRequest(url);
      request.onSuccess(callback);
      request.send();
    },
    post: function(url, data, callback) {
      var request = new PostRequest(url, data);
      request.onSuccess(callback);
      request.send();
    }
  }
})();
