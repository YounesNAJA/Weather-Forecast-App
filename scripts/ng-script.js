/*
 * MODULE
 */
var weather = angular.module("weather", ["ngRoute", "ngResource"]);

/*
 * ROUTE
 */
weather.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: 'pages/main.html',
        controller: 'homeController'
    })
    .when("/forecast", {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    });
});

/* 
 * CONTROLLERS
 */
weather.controller("homeController", ['$scope', function($scope){
    $scope.city = city;
}]);

weather.controller("forecastController", ["$scope", function($scope){
    
}]);