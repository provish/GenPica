var app = angular.module("app_main",[
    'ngRoute'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/views/album.html',{
            templateUrl: 'views/album.html',
            controller: 'albumCtrl'

        }
    )
        .when('/views/login.html',{
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'

        }
    )
        .when('/views/photos.html', {
            templateUrl: 'views/photos.html',
            controller: 'photosCtrl'

        }
    )
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'

        }
    )

        .otherwise({
            redirectTo: '/'
        });

});
