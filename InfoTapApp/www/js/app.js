angular.module('infotap', ['ionic', 'infotap.controllers', 'infotap.services','ngCordova'])
.run(function($ionicPlatform,$location,$rootScope,Globals,$localstorage,$cordovaPush) {
  if($localstorage.get('isLoggedIn') == 'true' && Globals.isLoggedIn == false){
    Globals.isLoggedIn=true;
    Globals.user=$localstorage.getObject('user');
  }
  $rootScope.location=$location;
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
    var androidConfig = {
      "senderID": "509822975771",
      "ecb": "notificationReceived"
    };
    document.addEventListener("deviceready", function(){
      $cordovaPush.register(androidConfig).then(function(result) {}, function(err) {});
    }, false);
    window.notificationReceived = function(notification) {
      switch(notification.event) {
        case 'registered':
          if(notification.regid.length > 0 ){
            Globals.appRegistrationId=notification.regid;
          }
          break;
        case 'message':
          if(notification.payload.source == 'INFOTAP'){
            if(notification.payload.type == 'NEW_FEED'){
              navigator.notification.confirm(
                  notification.message,
                  function(buttonIndex){
                    var id=notification.payload.feed_id;
                    /*if(buttonIndex == 1){
                      Globals.goToState('base.feed-detail',{ feedId:id });
                    }
                    if(buttonIndex == 2){*/
                      $state.go('base.feeds');
                    //}
                  },                  
                  notification.payload.title,
                  [notification.payload.button,'Cancel']
              );
            }
          }
        break;
        case 'error':
          navigator.notification.alert('GCM error = ' + notification.msg);
          break;
        default:
          navigator.notification.alert('An unknown GCM event has occurred');
          break;
      }
    };
  });
})
.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider,$httpProvider,$compileProvider) {
  
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $ionicConfigProvider.views.maxCache(5);
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile):|data:image\//);


  $stateProvider
  .state('base', {
    abstract: true,
    templateUrl: "templates/base.html",
    controller: 'BaseCtrl'
  })
  .state('base.home', {
    url: "/home",
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('base.about', {
    url: "/about",
    views: {
      'mainContent': {
        templateUrl: 'templates/about.html'
      }
    }
  })
  .state('base.feeds', {
    url: "/feeds",
    views: {
      'mainContent': {
        templateUrl: 'templates/feeds.html',
        controller: 'FeedsCtrl'
      }
    }
  })
  .state('base.refreshfeeds', {
    url: "/feeds/:timestamp",
    views: {
      'mainContent': {
        templateUrl: 'templates/feeds.html',
        controller: 'FeedsCtrl'
      }
    }
  })
  .state('base.deptfeeds', {
    url: "/feeds/:deptid",
    views: {
      'mainContent': {
        templateUrl: 'templates/feeds.html',
        controller: 'FeedsCtrl'
      }
    }
  })
  .state('base.feed-detail', {
      url: '/feed/:feedId',
      views: {
        'mainContent': {
          templateUrl: 'templates/feed-detail.html',
          controller: 'FeedDetailCtrl'
        }
      }
    })
  .state('base.departments', {
    url: "/departments",
    views: {
      'mainContent': {
        templateUrl: 'templates/departments.html',
        controller: 'DepartmentsCtrl'
      }
    }
  })
  .state('base.register1', {
    url: '/register1',
    views: {
      'mainContent': {
        templateUrl: 'templates/register1.html',
        controller: 'Register1Ctrl'
      }
    }
  })
  .state('base.register2', {
    url: '/register2',
    views: {
      'mainContent': {
        templateUrl: 'templates/register2.html',
        controller: 'Register2Ctrl'
      }
    }
  })
  .state('base.register3', {
    url: '/register3',
    views: {
      'mainContent': {
        templateUrl: 'templates/register3.html',
        controller: 'Register3Ctrl'
      }
    }
  })
  .state('base.categories', {
    url: "/categories",
    views: {
      'mainContent': {
        templateUrl: 'templates/categories.html',
        controller: 'CategoriesCtrl'
      }
    }
  })
  ;
  $urlRouterProvider.otherwise('/home');
});
