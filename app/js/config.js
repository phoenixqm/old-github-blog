(function() {
  window.Config = {
    name: "app",
    uri: {
      base: "/",
      host: "/",
      api: "https://api.github.com/repos/martin-liu/martin-liu.github.io/"
    },
    "default": {
      displayCount: 20
    },
    piwik: {
      enabled: false,
      app: 'appName',
      prod: 'prodName',
      url: '',
      siteId: 0
    },
    intro: {
      enabled: true
    },
    PFSSO: {
      enabled: false
    },
    urlHtml5Mode: true,
    version: "0.0.1"
  };

}).call(this);

(function() {
  Config.intros = [
    {
      intro: "Hello World!",
      position: 'bottom'
    }, {
      intro: "This is the header",
      position: 'bottom'
    }
  ];

}).call(this);

(function() {
  Config.routes = [
    {
      url: "/",
      params: {
        name: "home",
        label: "Home",
        templateUrl: "partials/home.html",
        controller: "HomeCtrl"
      }
    }, {
      url: "/",
      params: {
        name: "home",
        label: "Home",
        templateUrl: "partials/home.html",
        controller: "HomeCtrl"
      }
    }, {
      url: "/about",
      params: {
        name: "about",
        label: "About Us",
        templateUrl: "partials/about.html"
      }
    }
  ];

}).call(this);
