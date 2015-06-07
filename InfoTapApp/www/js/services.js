angular.module('infotap.services', ['ngResource'])
.factory('Globals', function($rootScope,$ionicHistory,$state,$ionicPopup,$timeout,$localstorage,$http,$window) {
    return {
        isLoggedIn:false,
        user:{},
        envIs:"app",
        apiBaseUrl:"http://doparttime.cloudapp.net/api/",
        //apiBaseUrl:"http://localhost/infotap.web/web/api/",
        paramdata:{},
        feeds : [],
        feedNxtPtr:0,
        appRegistrationId:null,
        searchLocationObj:{city:null,area:null,state:null,address:null},
        logout:function(){
          $localstorage.setObject('user',null);
          this.user = null;
          $localstorage.set('isLoggedIn', false);
          this.isLoggedIn = false;
          $state.go('base.home');
        },
        goToState:function(state,params,isNextView){
          if(isNextView){
            $ionicHistory.nextViewOptions({disableBack: true});
          }
           $state.go(state,params);
        },
        /*isOnline:function(){
          var self = this;
          // document.addEventListener("deviceready", function(){
          if(self.envIs == "app"){
            if (!$cordovaNetwork.isOnline()) {
              navigator.notification.alert('Not able to connect with internet. Please check your internet connection and retry.',function(){$state.go('home');},'Internet Connection Error','OK');
              return false;
            }else{
              return true;
            }
          }
          // }, false);
        },*/
        serialize: function(obj, prefix) {
          var str = [];
          for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
              var k = prefix ? prefix + "[]" : p, v = obj[p];
              str.push(typeof v == "object" ?
                this.serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
          }
          return str.join("&");
        },
        showNativePopupMessage:function(msg,title,callback){
          var vm=this;
          if(vm.envIs == 'app'){
            navigator.notification.alert(
            msg,
            callback || function(){},
            title,
            'OK');  
          }else if(vm.envIs == 'web'){
            var myPopup = $ionicPopup.show({
              template: msg,
              title: title,
              subTitle: '',
              buttons: [
                {
                  text: 'OK',
                  type: 'button-positive',
                  onTap: function(e) {
                    myPopup.close();
                  }
                }
              ]
            });
            $timeout(function() {
               myPopup.close();
            }, 15000);
          }
        },
    };
})
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])
.factory('Feeds', function($resource,Globals,$http,$stateParams) {
  var getConfig = {};
  var serverResponse=$resource(Globals.apiBaseUrl+'feeds');
 
  return {
    all: function() {
      getConfig = {};
      serverResponse=$resource(Globals.apiBaseUrl+'feeds?token='+Globals.user.token+($stateParams.deptid?('&department='+$stateParams.deptid):''));
      return serverResponse.get(getConfig);
    },
    getNextFeeds:function(pagenumber){
      getConfig = {};
      serverResponse=$resource(Globals.apiBaseUrl+'feeds?token='+Globals.user.token);
      getConfig.page=pagenumber;
      return serverResponse.get(getConfig);
    },
    get: function(feedId) {
      var feeds = Globals.feeds;
      for (var i = 0; i < feeds.length; i++) {
        if (feeds[i].id === parseInt(feedId)) {
          return feeds[i];
        }
      }
      return null;

    }
  };
})
.factory('Departments', function($resource,Globals,$http) {
  var getConfig = {};
  var serverResponse=$resource(Globals.apiBaseUrl+'departments');

  return {
    all: function() {
      getConfig = {};
      serverResponse=$resource(Globals.apiBaseUrl+'departments?token='+Globals.user.token);
      return serverResponse.get(getConfig);
    },
    get: function(departmentId) {
      getConfig = {};
      serverResponse=$resource(Globals.apiBaseUrl+'departments?token='+Globals.user.token);
      return serverResponse.get(getConfig);
    }
  };
})
.factory('Auth', function($resource,Globals,$http) {
  var getConfig = {};
  var serverResponse=$resource(Globals.apiBaseUrl+'auth');

  return {
    register1: function() {
      getConfig = {};
      serverResponse=$resource(Globals.apiBaseUrl + 'register1?uid='+Globals.paramdata.uid);
      return serverResponse.get(getConfig);
    },
    get: function(departmentId) {
      getConfig = {};
      serverResponse=$resource(Globals.apiBaseUrl+'departments?token='+Globals.user.token);
      return serverResponse.get(getConfig);
    }
  };
})
;