(function(){

	var myLottery = angular.module('myLottery',[]);
	myLottery.controller('lotteryController',['$scope','$timeout','$interval',function($scope,$timeout,$interval){
				
		$scope.items=[{
				"id":"01",
				"name":"Macbook Pro",
				"status":0
			},
			{
				"id":"02",
				"name":"Apple TV",
				"status":0
			},
			{
				"id":"03",
				"name":"Macbook Air",
				"status":0
			},
			{
				"id":"04",
				"name":"iPhone",
				"status":0
			},
			{
				"id":"05",
				"name":"iPad Mini",
				"status":0
			},
			{
				"id":"06",
				"name":"iPad",
				"status":0
			}];
	

	$scope.$$ = function(ele){
		return document.getElementById(ele);
	};

	$scope.showSection = function(section){	
		$scope.$$(section).style.display='block';
	};
	$scope.hideSection = function(section){	
		$scope.$$(section).style.display='none';
	};

	$scope.start = function(){
		$scope.hideSection('start');
		$scope.showSection('process');
		var times = 5;
		var pkey = Math.floor(Math.random()*$scope.items.length);
		console.log(pkey);
		var next = function(key){
			$scope.items[key].status = true;

			var timer = $timeout(function(){
				if($scope.items[key-1]){
				$scope.items[key-1].status = false;
			}
			if(key == 0){
				$scope.items[$scope.items.length-1].status = false;
			}
			if(key == $scope.items.length -1){
				times--;
			}
			if(times ==0){
				$scope.result = $scope.items[pkey].name;
				$scope.hideSection('process');
				$scope.showSection('result');
				return;
			}
			if($scope.items[key+1]){
				next(key+1)
			}else{
				next(0);
			}
		},200)
	};
		next(0);
	};
	$scope.restart =function(){
		$scope.showSection('start');

	};
	$scope.edit = function(){
		$scope.showSection('edit');
		$scope.hideSection('result');
	}
	$scope.delete = function(id){

		angular.forEach($scope.items,function(value,key){
			if(id==value.id){
				$scope.items.splice(key,1);
			}
		})
	}
	$scope.add = function(item){
		var last_id = lastid();
		$scope.items.push({id:last_id,name:$scope.name,status:0})
	}
	$scope.return = function(){
		$scope.showSection('start');
		$scope.hideSection('edit');
	}

	function lastid(){
		var id=0;
		angular.forEach($scope.items,function(value,key){
			if(id<value.id){
				id = value.id
			}
		})
		return ++id;
	}
	

}]);

})()