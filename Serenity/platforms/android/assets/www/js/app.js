angular.module('starter', ['ionic'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.controller('MediaCtrl', function ($scope, $ionicPopup, $timeout) {
	/** Get Device Platform **/
	document.addEventListener("deviceready", getDevicePlatform, false);
	function getDevicePlatform() {
		$scope.devicePlatform = device.platform;
	}

	/** Override Android Back Button **/
	document.addEventListener("backbutton", function (e) {
		e.preventDefault();
	});

    /** Song Controls **/
	$scope.songState = "stopped";
	$scope.songStart = function () {
	    if ($scope.devicePlatform == "Android") {
	    	var songFilePath = '/android_asset/www/audio/Impromptu.mp3';
	    }
	    else {
	    	var songFilePath = 'audio/Impromptu.mp3';
	    }
        //Uncomment below if running in web emulator
        //songFilePath = 'audio/Impromptu.mp3';
	    $scope.song = new Media(songFilePath);
	    $scope.songState = "playing";
	    $scope.song.play();

	    $scope.instructions();
	}
	$scope.songPausePlay = function () {
	    if ($scope.songState == 'playing') {
	        $scope.song.getCurrentPosition(function (position) {
	            $scope.songPosition = position * 1000;
	        });
	        $scope.song.pause();
	        $scope.songState = 'paused';
	    }
	    else if ($scope.songState == 'paused') {
	        $scope.song.play();
	        $scope.song.seekTo($scope.songPosition);
	        $scope.songState = 'playing';
	    }
	}
	$scope.songStop = function () {
	    $scope.songState = "stopped";
	    $scope.song.stop();

	    $scope.currentMessage = "Through Serenity, we hope to help you disconnect from the busyness of your life and connect with God using a simple prayer and calming music.";
	}

	$scope.currentMessage = "Through Serenity, we hope to help you disconnect from the busyness of your life and connect with God using a simple prayer and calming music.";


	//Instructions
	$scope.instructions = function () {
	    $scope.currentMessage = "Be simply present in openness to God.";
	    $timeout(function () {
	        $scope.currentMessage = "Pray: 'Lord, teach me to know how to seek you in silence. From time to time, let me withdraw from the troubles of life and rest quietly in your presence.'";
		}, 30000);
	    $timeout(function () {
	        $scope.currentMessage = "Empty your mind and listen to the voice of God.";
		}, 60000);
	    $timeout(function () {
	        $scope.currentMessage = "Breathe slowly and easily, focusing on your breathing.";
		}, 90000);
	    $timeout(function () {
	        $scope.currentMessage = "Continue until you feel completely at peace and refreshed.";
		}, 120000);
	}

	//Help Icon Popup
	$scope.startHelp = function () {
		var popupHelp = $ionicPopup.show({
		    title: 'To get started please click the blue "Start Session" button on your screen!',
			buttons: [
                {
                	text: 'Close',
                	type: 'button-positive',
                	onTap: function () {
                		popupHelp.close();
                	}
                }
			]
		});
	}
});