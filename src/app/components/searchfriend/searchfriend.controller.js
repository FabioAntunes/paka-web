'use strict';

angular.module('pakaWeb')
.controller('SearchFriendCtrl', function (Friends, $scope) {
  $scope.friends = Friends.query();
  
  $scope.friendSelected = undefined;
  $scope.view.equal = true;

  $scope.$watch('expense.value', function() {
    if($scope.expense.friends.length){
      $scope.recalcTotal(0);
    }
  });

  $scope.onSelect = function ($item, $model, $label) {
    var friend = $item;
    friend.value = 0;
    $scope.expense.friends.push(friend);
    $scope.friendSelected = undefined;
    $scope.recalcTotal(0);
  };

  $scope.removeFriend = function($index){
    $scope.expense.friends.splice($index, 1);
    $scope.recalcTotal(0);
  };

  $scope.calcEqual = function(){
    var i = 0;
    var length = $scope.expense.friends.length;
    var max = $scope.expense.value;
    var equalExpense = $scope.expense.value / length;


    for(i = 0; i < length; i++){
      $scope.expense.friends[i].value = _roundToTwo(equalExpense);
      max = _roundToTwo(max - $scope.expense.friends[i].value);
    }

    $scope.expense.friends[0].value = _roundToTwo(max + $scope.expense.friends[0].value);
  };

  $scope.recalcTotal = function(index){
    
    
    if($scope.view.equal){

      $scope.calcEqual();
      
    }else{
      $scope.calcDiff(index);
    }
  };

  $scope.calcDiff = function(index){
    var length = $scope.expense.friends.length;
    var max = $scope.expense.value;
    var equalExpense = $scope.expense.value / length;
    var delta = 0;
    var i = 0;
    var leftovers = 0;
    var total = 0;
    


    for (i = 0; i < length; i++) {
      $scope.expense.friends[i].value = parseFloat($scope.expense.friends[i].value) * 100;
      total += $scope.expense.friends[i].value;
    }

    delta = ($scope.expense.value * 100 - total)/length;

    for (i = 0; i < length; i++) {
      
      if(i !== index){
        $scope.expense.friends[i].value = _calcNewValue(delta, $scope.expense.friends[index].value, $scope.expense.friends[i].value);
        max = _roundToTwo(max - $scope.expense.friends[i].value);
      }
      
    }

    $scope.expense.friends[index].value = _roundToTwo($scope.expense.friends[index].value / 100);
    max = _roundToTwo(max - $scope.expense.friends[index].value);


    for (i = 0; i < length; i++) {
      leftovers = _roundToTwo($scope.expense.friends[i].value + max);
      if(leftovers >= 0 && leftovers <= $scope.expense.value && i !== index){
        $scope.expense.friends[i].value = leftovers;
        break;
      }
    }
  };

  function _calcNewValue(delta, value, userExpense){
    
    var newValue =  userExpense + delta;
    
    
    if (newValue < 0 || value === $scope.expense.value * 100){
      return 0;
    }
    else if (newValue > $scope.expense.value * 100){
      return $scope.expense.value * 100;
    }

    return _roundToTwo(newValue / 100);
  }

  function _roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
  }

});
