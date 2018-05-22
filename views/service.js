var bashoHaiku = angular.module('basho-haiku', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/v1/haikus')
		.success(function(data) {
			$scope.haikus = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createHaiku = function() {
		$http.post('/api/v1/haiku', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.haikus = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.deleteHaiku = function(id) {
		$http.delete('/api/v1/haiku/' + id)
			.success(function(data) {
				$scope.haikus = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
