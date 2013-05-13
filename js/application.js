/*global angular */
'use strict';

var rollflowApp = angular.module('rollflowApp', ['ui.bootstrap']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/home', {templateUrl: 'views/home.html', controller: 'HomeController'})
      .when('/current', {templateUrl: 'views/current.html', controller: 'CurrentController'})
      .otherwise({redirectTo: '/home'});
  }]);