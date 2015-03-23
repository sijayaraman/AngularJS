
var app = angular.module("app", [ "xeditable" ])
app.controller('EditableRowCtrl', function($scope, $filter, $http, $q) {

	// $scope.isNewCreatedRow = false;
	// Get the employeeList
	getEmployeeList();

	// Generate the list from db
	function getEmployeeList()
	{
		$http.get('http://localhost:9999/employee/list').success(
				function(data) {
					$scope.employees = data;
				});
	}

	// Save user
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
			// Modifying the existing row
			return $http.put('http://localhost:9999/employee/modify', data);
		}


	};

	  
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
	$scope.removeUser = function(data,id) {
		console.log("ID",id);
		$http.delete('http://localhost:9999/employee/delete/'+id).success(function (data) {
			// reload the list after delete
			getEmployeeList();

		})
	};

	$scope.cancelAdvice = function(rowform, index){
		if($scope.isNewCreatedRow){
			console.log(rowform, index);
			$scope.employees.splice(index,1);
			rowform.$cancel();
		}
		    getEmployeeList();
		}
	
	
	// Validate Id
	 $scope.checkId = function(data,id) {
		 console.log("Id=",data);
		    if(data.length == 0){
		    	return "ID should not be Empty";
		    }
			if(data == 0){
				return "ID should not be zero";
			}
			
			if(data < 0){
				return "ID should not be Negative";
			}
			
			if(isNaN(data)){
				return  "ID should be in Number";
			}
			
			
			
		  };

		  // Validate Age
		  $scope.checkAge = function(data,age) {
			  console.log("Age=",data);
			    if(data.length == 0){
			    	return "Age should not be Empty";
			    }
			    
			  if (isNaN(data)) {
				  return "Age should be in number";
			  }
		  };
				  
	$scope.sortField = 'id';
	$scope.reverse = true;

});

