angular.module('infotap.controllers', ['ngResource', 'ngCordova'])
.controller('BaseCtrl', function($state,Globals,$rootScope,$scope,$ionicSideMenuDelegate,$ionicHistory) {
  $rootScope.Globals = Globals;
  $scope.toggleSlideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
  if (Globals.isLoggedIn == true) {
      $state.go('base.feeds');
  }
})
.filter('currentdate',['$filter',  function($filter) {
    return function() {
        return Date.now();
    };
}])
.controller('FeedsCtrl', function($scope, Feeds,$stateParams,Globals) {
  $scope.isLoading=true;
  $scope.isLoadMore = true;
  $scope.loadMoreText = "Load more"
  Feeds.all().$promise.then(function(response) {
      if (response.success == true) {
          //$scope.isLoading=false;
          $scope.loadMoreText = "Loading...";
          $scope.feeds = response.feeds; //for view
          Globals.feeds = response.feeds; //for single feed 
          $scope.total_feeds = response.total_count;
          $scope.total_pages = response.total_pages;
          $scope.current_page = response.current_page;
          if ($scope.current_page != $scope.total_pages) {
              Globals.feedNxtPtr = parseInt($scope.current_page) + 1;
          } else {
              $scope.isLoadMore = false;
          }
          $scope.isLoading = false;
          $scope.loadMoreText = "Load more";
      } else {
          Globals.showNativePopupMessage('Please try again','Error');
      }
  });
  $scope.add = function() {
      $scope.loadMoreText = "Loading..."
      Feeds.getNextFeeds(Globals.feedNxtPtr).$promise.then(function(response) {
          if (response.success == true) {
              $scope.feeds =  $scope.feeds.concat(response.feeds);
              Globals.feeds = $scope.feeds;
              if (Globals.feedNxtPtr != $scope.total_pages) {
                  Globals.feedNxtPtr = Globals.feedNxtPtr + 1;
              } else {
                  $scope.isLoadMore = false;
              }
              $scope.isLoading = false;
              $scope.loadMoreText = "Load more";
          } else {
             Globals.showNativePopupMessage('Please try again','Error');   
          }
      });
    };
})
.controller('FeedDetailCtrl', function($scope, $stateParams, Feeds) {
  $scope.feed = Feeds.get($stateParams.feedId);
})
.controller('DepartmentsCtrl', function($ionicScrollDelegate,$scope, $stateParams,Globals, Departments,$http) {
    $scope.isLoading=true;
    $scope.isSaveButtonDisabled=false;
    Departments.all().$promise.then(function(response) {
      if (response.success == true) {
        $scope.isLoading=false;
        $scope.departments  = response.departments;
      } else {
          Globals.showNativePopupMessage('Please try again','Error');
      }
    });
    $scope.updateSettings=function(checkboxes){
      $scope.isSaveButtonDisabled=true;
      var prefStr= "";
      for(var i = 0; i < checkboxes.length; i++) {
          var obj = checkboxes[i];
          if(obj.enabled){
            prefStr+= ","+obj.id;
          }
        }
        $http.get(Globals.apiBaseUrl + 'preferences?token='+Globals.user.token+'&departments='+prefStr.substring(1)).
        success(function(data, status, headers, config) {
          $scope.isSaveButtonDisabled=false;
            if (data.success == true) {
              Globals.showNativePopupMessage(data.message,'Success');
              $ionicScrollDelegate.scrollTop(true);
            }else{
              Globals.showNativePopupMessage(data.message,'Error');
            }
        });
    };
})
.controller('CategoriesCtrl', function($scope, $stateParams, Departments,$state) {
  $scope.isLoading=true;
  Departments.all().$promise.then(function(response) {
    if (response.success == true) {
      $scope.isLoading=false;
      $scope.categories  = response.departments;
    } else {
        Globals.showNativePopupMessage('Please try again','Error');
    }
  });
  $scope.gotoCategories=function(catid){
    $state.go('base.deptfeeds',{deptid:catid});
  }
})
.controller('Register1Ctrl', function($scope,$http,$localstorage,Globals,$state,Auth) {
  $scope.isSaveButtonDisabled=false;
  $scope.genderOptions = [{label: 'Female',value: 0}, {label: 'Male',value: 1}];
  $scope.day = [{label: '1',value: '01'}, {label: '2',value: '02'}, {label: '3',value: '03'}, {label: '4',value: '04'}, {label: '5',value: '05'}, {label: '6',value: '06'}, {label: '7',value: '07'}, {label: '8',value: '08'}, {label: '9',value: '09'}, {label: '10',value: '10'}, {label: '11',value: '11'}, {label: '12',value: '12'}, {label: '13',value: '13'}, {label: '14',value: '14'}, {label: '15',value: '15'}, {label: '16',value: '16'}, {label: '17',value: '17'}, {label: '18',value: '18'}, {label: '19',value: '19'}, {label: '20',value: '20'}, {label: '21',value: '21'}, {label: '22',value: '22'}, {label: '23',value: '23'}, {label: '24',value: '24'}, {label: '25',value: '25'}, {label: '26',value: '26'}, {label: '27',value: '27'}, {label: '28',value: '28'}, {label: '29',value: '29'}, {label: '30',value: '30'}, {label: '31',value: '31'}];
  $scope.month = [{label: 'JAN',value: '01'}, {label: 'FEB',value: '02'}, {label: 'MAR',value: '03'}, {label: 'APR',value: '04'}, {label: 'MAY',value: '05'}, {label: 'JUN',value: '06'}, {label: 'JUL',value: '07'}, {label: 'AUG',value: '08'}, {label: 'SEP',value: '09'}, {label: 'OCT',value: '10'}, {label: 'NOV',value: '11'}, {label: 'DEC',value: '12'}];
  $scope.year = [{label: '2015',value: 2015},{label: '2014',value: 2014},{label: '2013',value: 2013}, {label: '2012',value: 2012},{label: '2011',value: 2011},{label: '2010',value: 2010}, {label: '2009',value: 2009},{label: '2008',value: 2008},{label: '2007',value: 2007}, {label: '2006',value: 2006},{label: '2005',value: 2005},{label: '2004',value: 2004}, {label: '2003',value: 2003},{label: '2002',value: 2002},{label: '2001',value: 2001}, {label: '2000',value: 2000},{label: '1999',value: 1999},{label: '1998',value: 1998}, {label: '1997',value: 1997},{label: '1996',value: 1996},{label: '1995',value: 1995}, {label: '1994',value: 1994},{label: '1993',value: 1993},{label: '1992',value: 1992}, {label: '1991',value: 1991},{label: '1990',value: 1990},{label: '1989',value: 1989}, {label: '1988',value: 1988},{label: '1987',value: 1987},{label: '1986',value: 1986}, {label: '1985',value: 1985},{label: '1984',value: 1984},{label: '1983',value: 1983}, {label: '1982',value: 1982},{label: '1981',value: 1981},{label: '1980',value: 1980}, {label: '1979',value: 1979},{label: '1978',value: 1978},{label: '1977',value: 1977}, {label: '1976',value: 1976},{label: '1975',value: 1975},{label: '1974',value: 1974}, {label: '1973',value: 1973},{label: '1972',value: 1972},{label: '1971',value: 1971},{label: '1970',value: 1970},{label: '1969',value: 1969},{label: '1968',value: 1968},{label: '1967',value: 1967},{label: '1966',value: 1966},{label: '1965',value: 1965},{label: '1964',value: 1964},{label: '1963',value: 1963},{label: '1962',value: 1962},{label: '1961',value: 1961},{label: '1960',value: 1960},{label: '1959',value: 1959},{label: '1958',value: 1958},{label: '1957',value: 1957},{label: '1956',value: 1956},{label: '1955',value: 1955},{label: '1954',value: 1954},{label: '1953',value: 1953},{label: '1952',value: 1952},{label: '1951',value: 1951},{label: '1950',value: 1950},{label: '1949',value: 1949},{label: '1948',value: 1948},{label: '1947',value: 1947},{label: '1946',value: 1946},{label: '1945',value: 1945},{label: '1944',value: 1944},{label: '1943',value: 1943},{label: '1942',value: 1942},{label: '1941',value: 1941},{label: '1940',value: 1940}];
  $scope.register = function(formdata) {
    var currentLocObj = Globals.searchLocationObj;
    if(formdata){
    //if ((Globals.isOnline() && Globals.envIs == "app") || Globals.envIs == "web") {
      var paramdata={};
      if(formdata.uid){
        $scope.isSaveButtonDisabled=true;
        paramdata.uid=formdata.uid;
        if(formdata.name){paramdata.name=formdata.name;}
        if(formdata.email){paramdata.email=formdata.email;}
        if(formdata.mobile){paramdata.mobile=formdata.mobile;}
        if(formdata.gender){paramdata.gender=formdata.gender;}
        if(formdata.day){paramdata.day=formdata.day;}
        if(formdata.month){paramdata.month=formdata.month;}
        if(formdata.year){paramdata.year=formdata.year;}
        //if(formdata.location){paramdata.location=formdata.location;}
        if(currentLocObj.city){paramdata.city=currentLocObj.city;}
        if(currentLocObj.area){paramdata.area=currentLocObj.area;}
        if(currentLocObj.state){paramdata.state=currentLocObj.state;}
        Globals.paramdata=paramdata;
        $http.get(Globals.apiBaseUrl + 'register1?'+Globals.serialize(Globals.paramdata)).
          success(function(responsedata, status, headers, config) {
            $scope.isSaveButtonDisabled=false;
            if (responsedata.success == true) {
                $state.go('base.register2');
            }else{
                Globals.showNativePopupMessage(responsedata.message,'Error');
            }
          }).
          error(function(responsedata, status, headers, config) {
            console.log(JSON.stringify(status));//+JSON.stringify(status)+JSON.stringify(headers)+JSON.stringify(config));
          });
      }
    //}
    }
  };
})
.controller('Register2Ctrl', function($scope,$http,Globals,$localstorage,$state) {
  $scope.isSaveButtonDisabled=false;
  $scope.registerSubmit = function(formdata){
    if(formdata){
      Globals.paramdata.code=formdata.code;
      if(Globals.appRegistrationId){
        Globals.paramdata.androidRegId=Globals.appRegistrationId;
      }
      $scope.isSaveButtonDisabled=true;
      $http.get(Globals.apiBaseUrl + 'register2?'+Globals.serialize(Globals.paramdata)).
        success(function(data, status, headers, config) {
          $scope.isSaveButtonDisabled=false;
          if(data.success == true){
              var user = data.user;
              $localstorage.setObject('user', user);
              Globals.user = user;
              $localstorage.set('isLoggedIn', true);
              Globals.isLoggedIn = true;
              $state.go('base.departments');
          }else{
              Globals.showNativePopupMessage(data.message,'Error');
          }
        });
    }
  };
})
.controller('Register3Ctrl', function($scope) {
  
})
.controller('HomeCtrl', function($scope) {

})
.directive('ionGooglePlace', [
    '$ionicTemplateLoader',
    '$ionicBackdrop',
    '$ionicPlatform',
    '$q',
    '$timeout',
    '$rootScope',
    '$document',
    'Globals',
    function($ionicTemplateLoader, $ionicBackdrop, $ionicPlatform, $q, $timeout, $rootScope, $document,Globals) {
        return {
            require: '?ngModel',
            restrict: 'E',
            template: '<input type="text" class="ion-google-place" autocomplete="off">',
            replace: true,
            scope: {
                ngModel: '=?',
                geocodeOptions: "="//{types: ['(cities)']}"
            },
            link: function(scope, element, attrs, ngModel) {
                if(attrs.prefill){
                  attrs.$set('value',attrs.prefill);
                }else{
                  attrs.$set('value','');
                }
                var unbindBackButtonAction;

                scope.locations = [];
                var geocoder = new google.maps.Geocoder();
                var searchEventTimeout = undefined;

                var POPUP_TPL = [
                    '<div class="ion-google-place-container modal">',
                        '<div class="bar bar-header item-input-inset">',
                            '<label class="item-input-wrapper">',
                                '<i class="icon ion-ios7-search placeholder-icon"></i>',
                                '<input class="google-place-search" type="search" ng-model="searchQuery" placeholder="' + (attrs.searchPlaceholder || 'Enter an area / city') + '">',
                            '</label>',
                            '<a class="button button-clear btn-1">',
                                attrs.labelCancel || 'Cancel',
                            '</a><br>',
                            '<span class="button button-clear btn-2">',
                                attrs.labelClose || 'Clear',
                            '</span>',
                        '</div>',
                        '<ion-content class="has-header has-header">',
                            '<ion-list>',
                                /*'<ion-item type="item-text-wrap" ng-click="selectLocation(location)">',
                                    'Get Current Location',
                                '</ion-item>',*/
                                '<ion-item ng-repeat="location in locations" type="item-text-wrap" ng-click="selectLocation(location)">',
                                    '{{location.formatted_address}}',
                                '</ion-item>',
                            '</ion-list>',
                        '</ion-content>',
                    '</div>'
                ].join('');

                var popupPromise = $ionicTemplateLoader.compile({
                    template: POPUP_TPL,
                    scope: scope,
                    appendTo: $document[0].body
                });

                popupPromise.then(function(el){
                    scope.searchQuery = '';
                    $ionicBackdrop.release();
                    el.element.css('display', 'none');

                    var searchInputElement = angular.element(el.element.find('input'));

                    scope.selectLocation = function(location){
                        var searchLocationObj={city:null,area:null,state:null,address:null};
                        var templocation=location.address_components;
                        //console.log(JSON.stringify(location));
                        for (var i = 0; i < templocation.length; i++) {
                          if (templocation[i].types[0] === "locality"){
                            searchLocationObj.city=templocation[i].long_name;
                          }
                          if (templocation[i].types[0] === "administrative_area_level_1"){
                            searchLocationObj.state=templocation[i].long_name;
                          }
                          if(templocation[i].types[0] === "sublocality_level_1") {
                            searchLocationObj.area=templocation[i].long_name;
                            searchLocationObj.latitude=location.geometry.location.A;
                            searchLocationObj.longitude=location.geometry.location.F;
                          }
                        }
                        searchLocationObj.address=(searchLocationObj.area?searchLocationObj.area+',':'')+searchLocationObj.city;
                        Globals.searchLocationObj=searchLocationObj;
                        //$rootScope.searchLocation=searchLocationObj;
                        // Globals.searchLocation=location;
                        //$rootScope.searchLocation=location;
                        ngModel.$setViewValue(location);
                        ngModel.$render();
                        el.element.css('display', 'none');
                        $ionicBackdrop.release();
                        if (unbindBackButtonAction) {
                            unbindBackButtonAction();
                            unbindBackButtonAction = null;
                        }
                    };

                    scope.$watch('searchQuery', function(query){
                        if (searchEventTimeout) $timeout.cancel(searchEventTimeout);
                        searchEventTimeout = $timeout(function() {
                            if(!query) return;
                            if(query.length < 3);
                            var req = scope.geocodeOptions || {};
                            req.componentRestrictions= {country:'in'};
                            req.address = query;
                            geocoder.geocode(req, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    scope.$apply(function(){
                                      var templocations=[];
                                      if (results[0]) {
                                        for (var i = 0; i < results.length; i++) {
                                          if (results[i].types[0] === "locality"||results[i].types[0] === "sublocality_level_1") {
                                            templocations.push(results[i]);
                                          }
                                        }
                                      }
                                      scope.locations = templocations;
                                    });
                                } else {
                                    // @TODO: Figure out what to do when the geocoding fails
                                }
                            });
                        }, 350); // we're throttling the input by 350ms to be nice to google's API
                    });

                    var onClick = function(e){
                        e.preventDefault();
                        e.stopPropagation();

                        $ionicBackdrop.retain();
                        unbindBackButtonAction = $ionicPlatform.registerBackButtonAction(closeOnBackButton, 250);

                        el.element.css('display', 'block');
                        searchInputElement[0].focus();
                        setTimeout(function(){
                            searchInputElement[0].focus();
                        },0);
                    };

                    var onCancel = function(e){
                        scope.searchQuery = '';
                        $ionicBackdrop.release();
                        el.element.css('display', 'none');

                        if (unbindBackButtonAction){
                            unbindBackButtonAction();
                            unbindBackButtonAction = null;
                        }
                    };

                    var onClear = function(e){
                        //Globals.searchLocation={};
                        Globals.searchLocationObj={city:null,area:null,address:null};
                        $rootScope.preFillLocation=" ";
                        //scope.details=null;
                        scope.searchQuery = '';
                        ngModel.$setViewValue(" ");
                        ngModel.$render();
                        $ionicBackdrop.release();
                        el.element.css('display', 'none');
                        if (unbindBackButtonAction){
                            unbindBackButtonAction();
                            unbindBackButtonAction = null;
                        }
                    };

                    closeOnBackButton = function(e){
                        e.preventDefault();

                        el.element.css('display', 'none');
                        $ionicBackdrop.release();

                        if (unbindBackButtonAction){
                            unbindBackButtonAction();
                            unbindBackButtonAction = null;
                        }
                    }

                    element.bind('click', onClick);
                    element.bind('touchend', onClick);
                    el.element.find('span').bind('click', onClear);
                    el.element.find('a').bind('click', onCancel);
                });

                if(attrs.placeholder){
                    element.attr('placeholder', attrs.placeholder);
                }


                ngModel.$formatters.unshift(function (modelValue) {
                    if (!modelValue) return '';
                    return modelValue;
                });

                ngModel.$parsers.unshift(function (viewValue) {
                    return viewValue;
                });

                ngModel.$render = function(){
                    if(ngModel.$viewValue){
                      element.val(ngModel.$viewValue.formatted_address || '');
                    }
                };

                scope.$on("$destroy", function(){
                    if (unbindBackButtonAction){
                        unbindBackButtonAction();
                        unbindBackButtonAction = null;
                    }
                });
            }
        };
    }
])
;
