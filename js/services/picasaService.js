app.factory('api', function ($scope,$http,$q
        ) {
                $http.defaults.useXDomain = true;

        var api = api || {},
            relativeUrl = 'https://picasaweb.google.com/data/feed/api/user/',
            url;
//        var matesData = {
//            "list": [{"id":0,"name" : "Adam","company":"TCS"},
//                {"id":1,"name" : "Mathews","company":"Info"}
//            ]
//        };

    $scope.processUserInfo = function(userInfo) {

//        console.log(userInfo);
        api.getAlbumList(userInfo.id);

    };

// When callback is received, process user info.
    $scope.userInfoCallback = function(userInfo) {
        $scope.$apply(function() {
            $scope.processUserInfo(userInfo);
        });
    };

// Request user info.
    api.getUserInfo = function() {
        gapi.client.request(
            {
                'path':'/plus/v1/people/me',
                'method':'GET',
                'callback': $scope.userInfoCallback
            }
        );
    };

        api.getAlbumList = function (userId) {
             ///<summary>
            /// Get method for api services
            ///</summary>

            url = relativeUrl + userId;
            get(url);
        };

        api.getAlbumPhotos = function (method, id, query, postData) {
            ///<summary>
            /// Get method for api services
            ///</summary>
            url = relativeUrl + method + (!!id ? id : "") + (!!query ? query : "");
            return $http.post(url, postData);
        };

        api.postComment = function (method, id, query, postData) {
            ///<summary>
            /// Post method for api services
            ///</summary>
            url = relativeUrl + method + (!!id ? id : "") + (!!query ? query : "");
            return $http.post(url, postData);
        };

//        api.resource = function (jsonPath) {
//            /// <summary>
//            ///     Return parsed JSON from give json path
//            /// </summary>
//            /// <param name="jsonPath"> The given path(url) for json file </param>
//            /// <returns type="Object"> Parsed object </returns>
//            jsonPath = 'http://dev-atom.azurewebsites.net/data/' + jsonPath;
//
//            return $resource(jsonPath, {});
//        };

//        // userInfo is a JSON object.
//        $scope.processUserInfo = function (userInfo) {
//
//
//            var userId = userInfo.id;
//
//            return userId;
//        };
//
//        // When callback is received, process user info.
//        $scope.userInfoCallback = function (userInfo) {
//            $scope.$apply(function () {
//            $scope.processUserInfo(userInfo);
//        });
//        };




        function parsePhoto(entry) {
            var photo = {
                url: entry.media$group.media$content[0].url
            };
            console.log(photo.url);
            console.log("returned from parsePhoto");
            return photo;
        }

        function parsePhotos(url) {
            var d = $q.defer();
            var photo;
            var photos = [];
            loadPhotos(url).then(function (data) {
                if (!data.feed) {
                    photos.push(parsePhoto(data.entry));
                } else {
                    var entries = data.feed.entry;
                    for (var i = 0; i < entries.length; i++) {
                        photos.push(parsePhoto(entries[i]));
                    }
                }
                d.resolve(photos);

            });
            console.log("returned from ParsePhotos");
            return d.promise;

        }

        function loadPhotos(url) {
            var d = $q.defer();
            $http.jsonp(url + '?alt=json&kind=photo&hl=pl&imgmax=912&callback=JSON_CALLBACK').success(function (data, status) {
                d.resolve(data);
            });
            return d.promise;
        }

        // Public API here
        function get(url) {
            return parsePhotos(url);
        }

        return api;
    }
);