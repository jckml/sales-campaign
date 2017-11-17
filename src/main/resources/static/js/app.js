var app = angular.module('CampaignManagement', []);
//service
	app.factory('CampaignService', ['$http', '$q', function($http, $q){
		 
	    var REST_SERVICE_URI = 'http://localhost:8080/sales/campaign/';
	 
	    var factory = {
	        fetchAllCampaigns: fetchAllCampaigns,
	        createCampaign: createCampaign,
	        updateCampaign:updateCampaign,
	        deleteCampaign:deleteCampaign,
	        fetchAccoutBalance:fetchAccountBalance
	    };
	 
	    return factory;
	 
	    function fetchAllCampaigns() {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI)
	            .then(
	            function (response) {
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
	        $http.post(REST_SERVICE_URI, form)
	            .then(
	            function (response) {
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
	        $http.get(REST_SERVICE_URI + "account")
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
	app.controller('CampaignController', ['$scope', 'CampaignService', function($scope, CampaignService) {
		$scope.campaigns = [];
		$scope.form = {
			id : -1,
			name : "",
			keyword : "",
			bidAmount : 0,
			campaignFunds : 0,
			status : false,
			town : "",
			radius : 0
		};

		$scope.accountBalance = 0.0;

		_refreshPageData();
		
		$scope.submitCampaign = function() {

			var method = "";
			var url = "";
			if ($scope.form.id == -1) {
				console.log('Saving New Campaign');
				CampaignService.createCampaign($scope.form)
            		.then(
            			_refreshPageData(),
            			function(errResponse){
                			console.error('Error while creating Campaign');
            			}
					);
			} else {
				CampaignService.updateCampaign($scope.form, $scope.form.id)
            		.then(
            			_refreshPageData(),
            			function(errResponse){
                			console.error('Error while updating Campaign');
            			}
        			);
	            console.log('Campaign updated');
			}
			_refreshPageData();
			_clearForm()
		};


		$scope.removeCampaign = function(id) {
	         if($scope.form.id === id) {
	        	_clearForm();
	        }
			CampaignService.deleteCampaign(id)
            .then(
            	_refreshPageData(),
            	function(errResponse){
                	console.error('Error while deleting User');
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

		/* Private Methods */
		 function _refreshPageData() {
			CampaignService.fetchAllCampaigns()
				.then(function (d) {
				$scope.campaigns = d;
			}, function (errResponse) {
				console.log(response.statusText);
			});
			
		}
		
		 function _refreshAccountBalance() {
				CampaignService.fetchAccountBalance()
					.then(function (d) {
					$scope.accountBalance = d;
				}, function (errResponse) {
					console.log(response.statusText);
				});
			}

		function _clearForm() {
			$scope.form.name = "";
			$scope.form.keyword = "";
			$scope.form.bidAmount = 0;
			$scope.form.campaignFunds = 0;
			$scope.form.status = false;
			$scope.form.town = "";
			$scope.form.radius = 0;
		}
		;
	}]);