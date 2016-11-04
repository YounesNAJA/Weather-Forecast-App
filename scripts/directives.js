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