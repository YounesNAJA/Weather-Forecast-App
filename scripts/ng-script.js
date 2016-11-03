/*
 * MODULE
 */
var weather = angular.module("weather", ["ngRoute", "ngResource"]);

/*
 * ROUTE
 */
weather.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when("/forecast", {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        });
});

/*
 * SERVICE
 */
weather.service("dataShare", function () {
    this.city = "Marrakech";
})

/* 
 * CONTROLLERS
 */
weather.controller("homeController", ['$scope', 'dataShare', function ($scope, dataShare) {
    $scope.city = dataShare.city;

    $scope.$watch('city', function () {
        dataShare.city = $scope.city;
    });
}]);


weather.controller("forecastController", ["$scope", "$resource", "dataShare", function ($scope, $resource, dataShare) {
    $scope.city = dataShare.city;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast", {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "JSONP"
        }
    });

    $scope.weatherData = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: 2,
        appid: '7661df8e5737e8855c66e396f40b3318'
    });

    $scope.convertToCelcius = function(degK){
        return Math.round(degK - 273.15);
    };
    
    $scope.convertToDate = function(dt){
    };
}]);