
var app = angular.module("app", [ "xeditable" ])
app.controller('EditableRowCtrl', function($scope, $filter, $http, $q) {

	//$scope.isNewCreatedRow = false;
	//Get the employeeList
	getEmployeeList();

	//Generate the list from db
	function getEmployeeList()
	{
		$http.get('http://localhost:9999/employee/list').success(
				function(data) {
					$scope.employees = data;
				});
	}

	//Save user
	$scope.saveUser = function(data, id, age, name, location) {

		angular.extend(data, {
			id : id,
			age : age,
			name : name,
			location : location
		});

		// Is Newly created row or modified row?
		if($scope.isNewCreatedRow)
		{
			$scope.isNewCreatedRow = false
			console.log("nre="+$scope.isNewCreatedRow);
			return $http.post('http://localhost:9999/employee/create', data);
		}
		else
		{
			//Modifying the existing row
			return $http.put('http://localhost:9999/employee/modify', data);
		}


	};

	//Cancel user
	$scope.cancel = function() {
		console.log("test"+$scope.isNewCreatedRow);
		getEmployeeList();
	}

	  
	// add user
	$scope.addUser = function() {
		$scope.inserted = {
				id: '',
				age: '',
				name: null,
				location: null
		}
		$scope.isNewCreatedRow = true;
		$scope.employees.splice(0,0,$scope.inserted);
		

	};



	// remove user
	$scope.removeUser = function(index) {
		var emp = $scope.employees[index];
		console.log(emp);
		$http.delete('http://localhost:9999/employee/delete/'+emp.id).success(function (data) {
			//reload the list after delete
			getEmployeeList();

		})
	};

	$scope.sortField = 'id';
	$scope.reverse = true;

});

