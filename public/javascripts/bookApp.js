var app = angular.module('bookApp',['ngRoute','ngResource']).run(function($rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

app.config(function($routeProvider){
$routeProvider
	.when('/',{
		templateUrl:'main/main.html',
		controller:'mainController'
	})
	.when('/login', {
			templateUrl: 'main/login.html',
			controller: 'authController'
		})
		//the signup display
	.when('/signup', {
			templateUrl: 'main/register.html',
			controller: 'authController'
		})
	.when('/add-event', {
			templateUrl: 'admin/add-event.html',
			controller: 'adminController'
		});
});

app.factory('postService', function($resource){
	return $resource('/api/books/:id');
});


app.controller('mainController', function(postService, $scope,$http){
	// decalre an empty list of book collection 
	$scope.books = postService.query();
	$scope.newbook = {coverImage:'', title:'',author:'',releaseDate:'',keywords:'' };

	$scope.delete = function (book) {
		console.log(book._id);
		$http.post('/admin/delete-item',book).success(function (data) {
			alert(' ');
			console.log(data);
		})
	}

	$scope.edit = function () {
		console.log('item edited');
	}
});


app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});

app.controller('adminController', function(postService, $scope){
	// decalre an empty list of book collection 
	$scope.books = postService.query();
	$scope.newbook = {coverImage:'', title:'',author:'',releaseDate:'',keywords:'' };

	$scope.post = function () {
		$scope.newbook.coverImage='images/placeholder.png'
		postService.save($scope.newbook, function(){
	    $scope.books = postService.query();
	    $scope.newbook = {coverImage:'', title:'',author:'',releaseDate:'',keywords:'' };
	  });
	}
});
