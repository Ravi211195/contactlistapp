angular.module('myApp', []).controller('AppCtrl', function($scope,$http) {
    console.log("AppCtrl");

    var refresh = function() {
        $http.get('/contactlist').success(function(response) {
            console.log("I got data i requested");
            $scope.contactlist = response;
            $scope.contact = "";
        });
    };
    
    refresh();

    $scope.addContact = function() {
       // console.log($scope.contact);
        $http.post('/contactlist',$scope.contact).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.removeContact = function(id) {
        console.log(id);
        $http.delete('/contactlist/'+id).success(function(response) {
            refresh();
        });
    };

    $scope.editContact = function(id) {
        $http.get('/contactlist/'+id).success(function(response){
            $scope.contact = response;
        })
    };

    $scope.updateContact = function() {
        $http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response) {
            refresh();
        });
    };

    $scope.clear = function() {
        $scope.contact = "";
    }

});