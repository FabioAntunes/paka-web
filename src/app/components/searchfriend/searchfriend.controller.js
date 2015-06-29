'use strict';

angular.module('pakaWeb')
.controller('SearchFriendCtrl', function (Friends, $scope) {
  $scope.friends = Friends.query();
  
  $scope.friendSelected = undefined;
  $scope.view.equal = true;

  $scope.$watch('expense.value', function() {
    if($scope.expense.shared && $scope.expense.shared.length){
      $scope.recalcTotal(0);
    }
  });

  $scope.onSelect = function ($item, $model, $label) {
    var friend = $item;
    friend.value = 0;
    friend.friend_id = friend._id;
    $scope.expense.shared.push(friend);
    $scope.friendSelected = undefined;
    $scope.recalcTotal(0);
  };

  $scope.removeFriend = function($index){
    $scope.expense.shared.splice($index, 1);
    $scope.recalcTotal(0);
  };

  $scope.calcEqual = function(){
    var i = 0;
    var length = $scope.expense.shared.length;
    var max = $scope.expense.value;
    var equalExpense = $scope.expense.value / length;


    for(i = 0; i < length; i++){
      $scope.expense.shared[i].value = _roundToTwo(equalExpense);
      max = _roundToTwo(max - $scope.expense.shared[i].value);
    }

    $scope.expense.shared[0].value = _roundToTwo(max + $scope.expense.shared[0].value);
  };

  $scope.recalcTotal = function(index){
    
    
    if($scope.view.equal){

      $scope.calcEqual();
      
    }else{
      $scope.calcDiff(index);
    }
  };

  $scope.calcDiff = function(index){
    var length = $scope.expense.shared.length;
    var max = $scope.expense.value;
    var equalExpense = $scope.expense.value / length;
    var delta = 0;
    var i = 0;
    var leftovers = 0;
    var total = 0;
    


    for (i = 0; i < length; i++) {
      $scope.expense.shared[i].value = parseFloat($scope.expense.shared[i].value) * 100;
      total += $scope.expense.shared[i].value;
    }

    delta = ($scope.expense.value * 100 - total)/length;

    for (i = 0; i < length; i++) {
      
      if(i !== index){
        $scope.expense.shared[i].value = _calcNewValue(delta, $scope.expense.shared[index].value, $scope.expense.shared[i].value);
        max = _roundToTwo(max - $scope.expense.shared[i].value);
      }
      
    }

    $scope.expense.shared[index].value = _roundToTwo($scope.expense.shared[index].value / 100);
    max = _roundToTwo(max - $scope.expense.shared[index].value);


    for (i = 0; i < length; i++) {
      leftovers = _roundToTwo($scope.expense.shared[i].value + max);
      if(leftovers >= 0 && leftovers <= $scope.expense.value && i !== index){
        $scope.expense.shared[i].value = leftovers;
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
