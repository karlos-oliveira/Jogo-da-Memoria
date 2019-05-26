app.controller('loginController', ["$scope", "$location", "userService", function($scope, $location, userService) {
    $scope.init = function(){
        $scope.user = {name: "", turns: 0};
        $scope.Register = Register;
    }

    function Register(user){
        if(user.name == "")
            document.querySelector("#btnShowModalValidacao").click();
        else
        {
            userService.addUser(user);
            $location.path("/board");
        }
        
    };
}]);

