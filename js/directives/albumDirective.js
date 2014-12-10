app.directive('albumDir', ['picasaService', function() {
    return {
        restrict: 'E',
        scope: {
            url: '@'
        },
        controller: function($scope, picasaService){
            $scope.photos = picasaService.get($scope.url).then(function(photos){
                $scope.photos = photos;
            });

        },
        templateUrl: 'photoBlock.html'
    };
}
]);