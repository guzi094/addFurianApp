angular.module('starter.controllers', [])
.controller('WriteCtrl', function ($scope, $cordovaFacebook) {
  $scope.webView = function () {
    var url = "http://trans.hiragana.jp/ruby/http://m." + $scope.user.value;
    window.open(url, '_self')
  }
})

.controller('FuriganaCtrl', function ($scope, $http) {
  // ユーザーのレベルの初期値は1
  $scope.grade = '1';
  $scope.selectables = ['1', '2', '3', '4', '5', '6' , '7', '8'];

  //　漢字に読み方をつける関数
  $scope.convert = function () {
    // textaraからデータをもらう
    var link = "http://mikeiken.labdev.net/jeon/ionic/convertChinese.php";
    var data = {txtData : $scope.japaness, grade : $scope.grade};
    //console.log(data);
    console.log(data);
    // yahoo api 利用漢字に読み方を追加
    $http.post(link, data).then(function(res) {
          console.log(res.data.Result.WordList.Word);
          $scope.result = res.data.Result.WordList.Word;
    });
  }
  // 翻訳する関数(韓国語、日本語両方可能)
  $scope.translation = function () {
    // 단어를 입력받는다

    // 서버상에 있는 php파일과 통신하기 위해 데이터 형을 변경한다(json or xml)
    var link = "http://mikeiken.labdev.net/jeon/ionic/translation.php";
    var data = {txtData : $scope.japaness, from: 'ja', to:'ko'};
    console.log(data);
    $http.post(link, data).then(function(res) {
          console.log(res.data.message.result.translatedText);
          $scope.transText = res.data.message.result.translatedText
    });
    // 번역된 단어를 받는다

    // 실제 유저 화면에 출력한다

  }
  // 入力した文字を初期化
  $scope.clear = function () {
    $scope.grade = '1';
    $scope.japaness = "";
    $scope.result = {};
  }
})
