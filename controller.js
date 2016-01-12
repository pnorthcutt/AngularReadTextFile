var app = angular.module('testApp', []);
app.controller('testCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.firstName= "John";
    $scope.lastName= "Doe";
	$scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/fileUpload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
	}
}]);
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
		
        fd.append('file', file);
		readSingleFile(file);
        
    }
}]);
function readSingleFile(file) {
    //Retrieve the first (and only!) File from the FileList object
    var f = file; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      var contents = e.target.result;
		  console.log(contents);
        alert( "Got the file.n" 
              +"name: " + f.name + "n"
              +"type: " + f.type + "n"
              +"size: " + f.size + " bytesn"
              + "starts with: " + contents.substr(1, contents.indexOf("n"))
        );  
      }
	  
      console.log(r.readAsText(f));
    } else { 
      alert("Failed to load file");
    }
  }



