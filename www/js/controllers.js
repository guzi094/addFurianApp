angular.module('starter.controllers', [])
.controller('WriteCtrl', function ($scope, $cordovaFacebook) {
  $scope.webView = function () {
    var url = "http://trans.hiragana.jp/ruby/http://m." + $scope.user.value;
    window.open(url, '_self')
  }

  $scope.loginFacebook = function(){
    $cordovaFacebook.login(["public_profile", "email", "user_friends"])
    .then(function(success) {

    }, function (error) {

    });
  }
})

.controller('FuriganaCtrl', function ($scope, $http) {
  $scope.grade = '1';
  $scope.selectables = ['1', '2', '3', '4', '5', '6' , '7', '8'];
  $scope.convert = function () {
    // textara에서 데이터를 입력받음
    var link = "http://mikeiken.labdev.net/jeon/ionic/convertChinese.php";
    var data = {txtData : $scope.japaness, grade : $scope.grade};
    //console.log(data);

    // yahoo api 이용 한자를 후리가나로 변환
    $http.post(link,  data).then(function(res) {
          console.log(res.data.Result.WordList.Word);
          $scope.result = res.data.Result.WordList.Word;
    });
  }

  $scope.addWord = function () {
      console.log("tst");
  }

  $scope.clear = function () {
    $scope.grade = '1';
    $scope.japaness = "";
    $scope.result = {};
  }
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});
