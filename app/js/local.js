'use strict';

// This is used for local env
App.run(function($http, $rootScope) {
  // Init user
  var user = {
    nt : 'phoenixqm',
    firstName : 'Qi',
    lastName : 'Ming',
    displayName : 'Qi Ming',
    label : 'Qi Ming(phoenixqm)'
  };
  $rootScope.user = user;
  $rootScope.initiated = true;


  // Init debug information
  window.scope = $rootScope;
});
