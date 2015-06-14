'use strict';

angular.module('pakaWeb')
.controller('SearchFriendCtrl', function (Friends, $scope) {
	$scope.friends = Friends.query();
	$scope.friendSelected = Friends.query();
	$scope.onSelect = function ($item, $model, $label) {
	    console.log($item);
	};
});
