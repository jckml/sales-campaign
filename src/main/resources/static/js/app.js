var app = angular.module('CampaignManagement', []);
// service
	app.factory('CampaignService', ['$http', '$q', function($http, $q){
		 
	    var REST_SERVICE_URI = 'http://localhost:8080/sales/campaign/';
	 
	    var factory = {
	        fetchAllCampaigns: fetchAllCampaigns,
	        createCampaign: createCampaign,
	        updateCampaign:updateCampaign,
	        deleteCampaign:deleteCampaign,
	        fetchAccountBalance:fetchAccountBalance
	    };
	 
	    return factory;
	 
	    function fetchAllCampaigns() {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI)
	            .then(
	            function (response) {
	            	console.log('campaign fetched');
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Campaigns');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	 
	    function createCampaign(form) {
	        var deferred = $q.defer();
	        console.log('campaign created1');
	        $http.post(REST_SERVICE_URI, form)
	            .then(
	            function (response) {
	            	console.log('campaign created2');
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while creating Campaign');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	 
	 
	    function updateCampaign(form, id) {
	        var deferred = $q.defer();
	        $http.put(REST_SERVICE_URI+id, form)
	            .then(
	            function (response) {
	            	console.log('campaign updated');
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while updating Campaign');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	 
	    function deleteCampaign(id) {
	        var deferred = $q.defer();
	        $http.delete(REST_SERVICE_URI+id)
	            .then(
	            function (response) {
	            	console.log('campaign deleted');
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while deleting Campaign');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	 
	    function fetchAccountBalance() {
	    	var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI + 'account')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching account balance');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	}]);
	// Controller
	app.controller('CampaignController', ['$scope', '$http', 'CampaignService', function($scope, $http, CampaignService) {
		
		$scope.campaigns = [];
		$scope.form = {
			id : -1,
			name : "",
			keyword : "",
			bidAmount : "",
			campaignFunds : "",
			status : false,
			town : "",
			radius : ""
		};

		$scope.accountBalance = 0.0;
		refreshAccountBalance();
		
		$scope.submitCampaign = function() {

			if ($scope.form.id == -1) {
				createCampaign($scope.form);
				console.log('Campaign created');
				success();
				/*$http.post(REST_SERVICE_URI, $scope.form).then(function(response) {
					$scope.form = response.data;
					_refreshAccountBalance();
				});*/
			} else {
				updateCampaign($scope.form, $scope.form.id);
				success();
	            console.log('Campaign updated');
			}
			//success();
		};


		$scope.removeCampaign = function(id) {
	         if($scope.form.id === id) {
	        	clearForm();
	        }
			CampaignService.deleteCampaign(id)
            .then(
            	success(),
            	function(errResponse){
                	console.error('Error while deleting Campaign');
            	}
        	);
		}; 

		 $scope.editCampaign = function(id) {
			for(var i = 0; i < $scope.campaigns.length; i++){
	            if($scope.campaigns[i].id === id) {
	            	$scope.form = angular.copy($scope.campaigns[i]);
	                break;
	            }
	        } 
		};

		function createCampaign(form) {
			CampaignService.createCampaign(form)
    		.then(
    			success(),
    			function(errResponse){
        			console.error('Error while creating Campaign');
    			}
			);
		}
		
		function updateCampaign(form, id) {
			CampaignService.updateCampaign(form, id)
    		.then(
    			success(),
    			function(errResponse){
        			console.error('Error while updating Campaign');
    			}
			);
		}
		
		 function success() {
			 refreshAccountBalance();
             refreshPageData();
             clearForm();
         }
		
		 function refreshPageData() {
			CampaignService.fetchAllCampaigns()
				.then(function (d) {
				$scope.campaigns = d;
			}, function (errResponse) {
				console.log(response.statusText);
			});
			/*$http.get(REST_SERVICE_URI).then(function(response) {
				$scope.campaigns = response.data;
			}, function (response) {
				console.log(response.statusText);
			});*/
		}
		 
		
		 function refreshAccountBalance() {
				CampaignService.fetchAccountBalance()
					.then(function (d) {
					$scope.accountBalance = d;
				}, function (errResponse) {
					console.log(response.statusText);
				});
			 /*$http.get(REST_SERVICE_URI + 'account').then(function(response) {
					$scope.accountBalance = response.data;
				}, function (response) {
					console.log(response.statusText);
				});*/
			}

		function clearForm() {
			$scope.form = {
					id : -1,
					name : "",
					keyword : "",
					bidAmount : "",
					campaignFunds : "",
					status : false,
					town : "",
					radius : ""
				};
			};
	}]);