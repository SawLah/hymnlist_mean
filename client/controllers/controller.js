var app = angular.module('hymnapp', []);

app.controller('hymnController', ['$scope', '$http', function($scope, $http){
console.log("greeting from client controller js ");

$scope.hymntitle = "hellow mean and bootstrap"; 

var refresh = function(){

$http.get('/hymns')
    .success(function(response){
    console.log("getting the data  from controller"); 
    $scope.hymns = response;
    $scope.hymn = '';
    }); 
}; //self invoke and save it to a variable for next invoke at add method
 
 refresh();


$scope.AddHymn = function(){
    console.log($scope.hymn.title); 
    if($scope.hymn.title){
        $http.post('hymns', $scope.hymn)
        .success(function(response){
            console.log(response); 
            refresh();
        });
   }
}; 

$scope.removeHymn = function(id){
    console.log(id); 
    $http.delete('/hymns/' + id)
    .success(function(response){
        refresh();
    }); 
};

$scope.editHymn = function(id){
    console.log(id); 
    $http.get('/hymns/' + id)
    .success(function(response){
         $scope.hymn = response;  // putting response to boxes , the model into related boxes
    }); 
};

$scope.UpdateHymn = function(){
    console.log($scope.hymn._id); 
    $http.put('/hymns/' + $scope.hymn._id, $scope.hymn)  // sending to server, req object as params
    .success(function(response){ 
    refresh();
    }); 
};

$scope.clearform = function(){
    $scope.hymn = ""; 
};

}]);


 