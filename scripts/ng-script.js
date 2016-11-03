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
        })
        .when("/forecast/:days", {
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

/*
 * CUSTOM DIRECTIVE
 */
weather.directive("weatherData", function () {
    return {
        templateUrl: 'directives/weatherData.html',
        replace: true,
        scope: {
            weatherObject: '=',
            convertToDate: '&',
            convertToC: '&',
            dateFormat: '@'
        }
    };
});

weather.controller("forecastController", ["$scope", "$resource", "$routeParams", "dataShare", function ($scope, $resource, $routeParams, dataShare) {
    $scope.city = dataShare.city;
    $scope.days = $routeParams.days;

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "JSONP"
        }
    });

    $scope.weatherData = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: $scope.days || 2,
        appid: '7661df8e5737e8855c66e396f40b3318'
    });

    $scope.convertToCelcius = function (degK) {
        return Math.round(degK - 273.15);
    };

    $scope.convertToDate = function (dt) {
        return dt * 1000;
    };
}]);