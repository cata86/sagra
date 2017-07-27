// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'App' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('App', ['ionic', 'ngCordova', 'ngAnimate','ngLodash', 'tabSlideBox'])

.run(['$ionicPlatform', '$sqliteService',
  function($ionicPlatform, $sqliteService) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
      //Load the Pre-populated database, debug = true
      $sqliteService.preloadDataBase(true);
    });
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$compileProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\/|img\//);
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
      $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());
      $ionicConfigProvider.backButton.previousTitleText(false).text('');
      $stateProvider
        .state('home', {
          url: "/home",
          templateUrl: "templates/home.html",
          controller: 'HomeController'
        })
        .state('app', {
          url: '/app',
          abstract: true,
          controller: 'AppController',
          templateUrl: 'templates/menu.html'
        })
        .state('app.gallery', {
          url: "/gallery",
          cache: false,
          views: {
            viewContent: {
              templateUrl: "templates/gallery.html",
              controller: 'GalleryController'
            }
          }
        })
        .state('app.item', {
          url: "/item/{title}",
          params: {
              color: null,
              icon: null
          },
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/item.html",
                  controller: 'ItemController'
              }
          }
        })
		    .state('app.accompagnatore', {
          url: "/accompagnatore",
          params: {
              color: null,
              icon: null
          },
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/accompagnatore.html",
                  controller: 'AccompagnatoreController'
              }
          }
        })
        .state('app.accompagnatoreTavolo', {
          url: "/accompagnatore/tavolo",
			    params: {
            tavoloReale: null
          },
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/accompagnatore-tavolo.html",
                  controller: 'AccompagnatoreTavoloController'
              }
          }
        })
		    .state('app.cassa', {
          url: "/cassa",
          params: {
              color: null,
              icon: null
          },
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/cassa.html",
                  controller: 'ItemController'
              }
          }
        })
	  	 .state('app.ordini', {
          url: "/ordini",
          params: {
              color: null,
              icon: null,
              title: null
          },
          cache: false,
          views: {
              viewContent: {
                  templateUrl: "templates/ordini.html",
                  controller: 'OrdiniController'
              }
            }
        })
		    .state('app.tavolo', {
            url: "/tavolo",
			      params: {
                idTavolo: null
            },
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/ordini-tavolo.html",
                    controller: 'TavoloController'
                }
            }
        })
		    .state('app.sequenza', {
            url: "/sequenza",
			      params: {
                idSequenza: null
            },
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/sequenza.html",
                    controller: 'SequenzaController'
                }
            }
        })
		    .state('app.cucina', {
            url: "/cucina",
            params: {
                color: null,
                icon: null
            },
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/cucina.html",
                    controller: 'ItemController'
                }
            }
        });

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("home");
        });
  }]);

/* global ionic */
(function (angular, ionic) {

	ionic.Platform.isIE = function () {
		return ionic.Platform.ua.toLowerCase().indexOf('trident') > -1;
	};

	if (ionic.Platform.isIE()) {
		angular.module('ionic')
			.factory('$ionicNgClick', ['$parse', '$timeout', function ($parse, $timeout) {
				return function (scope, element, clickExpr) {
					var clickHandler = angular.isFunction(clickExpr) ? clickExpr : $parse(clickExpr);

					element.on('click', function (event) {
						scope.$apply(function () {
							if (scope.clicktimer) return; // Second call
							clickHandler(scope, { $event: (event) });
							scope.clicktimer = $timeout(function () { delete scope.clicktimer; }, 1, false);
						});
					});

					// Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
					// something else nearby.
					element.onclick = function (event) { };
				};
			}]);
	}

	function SelectDirective() {
		'use strict';

		return {
			restrict: 'E',
			replace: false,
			link: function (scope, element) {
				if (ionic.Platform && (ionic.Platform.isWindowsPhone() || ionic.Platform.isIE() || ionic.Platform.platform() === "edge")) {
					element.attr('data-tap-disabled', 'true');
				}
			}
		};
	}

	angular.module('ionic')
    .directive('select', SelectDirective);

	/*angular.module('ionic-datepicker')
	.directive('select', SelectDirective);*/

})(angular, ionic);
window.queries = [
	//Drop tables
   "DROP TABLE IF EXISTS Users;",
	//Create tables
	"CREATE TABLE Users (IdUser integer primary key autoincrement, Name text not null);",
	//Insert Users
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Nicholls Cardona');",
	"INSERT INTO 'Users' ('Name') VALUES ('Khriztian Moreno Zuluaga');",
	"INSERT INTO 'Users' ('Name') VALUES ('Cristian Rivas Buitrago');",
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Sánchez');",
	"INSERT INTO 'Users' ('Name') VALUES ('Nicolas Molina');",
	"INSERT INTO 'Users' ('Name') VALUES ('Miyamoto Musashi FIlander');",
	"INSERT INTO 'Users' ('Name') VALUES ('Didier Hernandez');",
	"INSERT INTO 'Users' ('Name') VALUES ('Luis Eduardo Oquendo Pérez');",
	"INSERT INTO 'Users' ('Name') VALUES ('Carlos Rojas');",
	"INSERT INTO 'Users' ('Name') VALUES ('Levano Castilla Carlos Miguel');"
];
(function () {
  'use strict';

  angular
    .module('App')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope', '$ionicPopover'];
  function AppController($scope, $ionicPopover) {

    $scope.items = [
      {
          color: "#E47500",
          icon: "ion-android-people",
          title: "Accompagnatore",
          view: "accompagnatore"
      },
      {
          color: "#5AD863",
          icon: "ion-ios-compose",
          title: "Ordini",
          view: "ordini"
      },
      {
          color: "#F8E548",
          icon: "ion-cash",
          title: "Cassa",
          view: "cassa"
      },
      {
          color: "#AD5CE9",
          icon: "ion-android-restaurant",
          title: "Cucina",
          view: "cucina"
      }
    ];

    $scope.exitApp = function () {
        ionic.Platform.exitApp();
    };

    $ionicPopover.fromTemplateUrl('templates/modals/popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };

    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
  }
})();
(function() {
'use strict';
    angular
        .module('App')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$scope', '$state'];
    function GalleryController($scope, $state) {

        $scope.openItem = function(item){
            $state.go('app.'+item.view, { title: item.title, icon: item.icon, color: item.color });
        };
    }
})();
(function () {
	'use strict';

	angular
		.module('App')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$ionicPopup', 'Modals', 'Model'];
	function HomeController($scope, $ionicPopup, Modals, Model) {

		$scope.users = [];

		$scope.HelloWorld = function () {
			$ionicPopup.alert({
				title: 'Hello World',
				template: 'This is the best template to start with Ionic Framework!',
     		cssClass: 'animated bounceInDown'
			});
		};

		$scope.showUsers = function () {
			Model.Users.getAll().then(function (users) {
				$scope.users = angular.copy(users);
			});
			Modals.openModal($scope, 'templates/modals/users.html', 'animated rotateInDownLeft');
		};

		$scope.closeModal = function () {
			Modals.closeModal();
			$scope.users = [];
		};

		//Center content
		//1. http://codepen.io/mhartington/pen/gcHeL
		//2. http://codepen.io/anon/pen/meQJvp
	}
})();


(function() {
'use strict';

    angular
        .module('App')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory'];
    function ItemController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory) {

        $scope.item = {
            title: $stateParams.title,
            icon: $stateParams.icon,
            color: $stateParams.color
        };

        if (!$scope.item.color) {
            $ionicViewSwitcher.nextDirection('back');
            $ionicHistory.nextViewOptions({
                disableBack: true,
                disableAnimate : true,
                historyRoot  : true
            });
            $state.go('app.gallery');
        }
    }
})();
(function () {
	'use strict';

	angular
		.module('App')
		.directive('holdList', holdList);

	holdList.$inject = ['$ionicGesture'];
	function holdList($ionicGesture) {

		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$ionicGesture.on('hold', function (e) {

					var content = element[0].querySelector('.item-content');

					var buttons = element[0].querySelector('.item-options');
					var buttonsWidth = buttons.offsetWidth;

					ionic.requestAnimationFrame(function () {
						content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

						if (!buttons.classList.contains('invisible')) {
							content.style[ionic.CSS.TRANSFORM] = '';
							setTimeout(function () {
								buttons.classList.add('invisible');
							}, 250);
						} else {
							buttons.classList.remove('invisible');
							content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
						}
					});


				}, element);
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.directive('ionMultipleSelect', ionMultipleSelect);

	ionMultipleSelect.$inject = ['$ionicModal', '$ionicGesture'];
	function ionMultipleSelect($ionicModal, $ionicGesture) {

		return {
			restrict: 'E',
			scope: {
				options: "="
			},
			controller: function ($scope, $element, $attrs) {
				$scope.multipleSelect = {
					title: $attrs.title || "Select Options",
					tempOptions: [],
					keyProperty: $attrs.keyProperty || "id",
					valueProperty: $attrs.valueProperty || "value",
					selectedProperty: $attrs.selectedProperty || "selected",
					templateUrl: $attrs.templateUrl || 'templates/multipleSelect.html',
					renderCheckbox: $attrs.renderCheckbox ? $attrs.renderCheckbox == "true" : true,
					animation: $attrs.animation || 'slide-in-up'
				};

				$scope.OpenModalFromTemplate = function (templateUrl) {
					$ionicModal.fromTemplateUrl(templateUrl, {
						scope: $scope,
						animation: $scope.multipleSelect.animation
					}).then(function (modal) {
						$scope.modal = modal;
						$scope.modal.show();
					});
				};

				$ionicGesture.on('tap', function (e) {
					$scope.multipleSelect.tempOptions = $scope.options.map(function (option) {
						var tempOption = {};
						tempOption[$scope.multipleSelect.keyProperty] = option[$scope.multipleSelect.keyProperty];
						tempOption[$scope.multipleSelect.valueProperty] = option[$scope.multipleSelect.valueProperty];
						tempOption[$scope.multipleSelect.selectedProperty] = option[$scope.multipleSelect.selectedProperty];

						return tempOption;
					});
					$scope.OpenModalFromTemplate($scope.multipleSelect.templateUrl);
				}, $element);

				$scope.saveOptions = function () {
					for (var i = 0; i < $scope.multipleSelect.tempOptions.length; i++) {
						var tempOption = $scope.multipleSelect.tempOptions[i];
						for (var j = 0; j < $scope.options.length; j++) {
							var option = $scope.options[j];
							if (tempOption[$scope.multipleSelect.keyProperty] == option[$scope.multipleSelect.keyProperty]) {
								option[$scope.multipleSelect.selectedProperty] = tempOption[$scope.multipleSelect.selectedProperty];
								break;
							}
						}
					}
					$scope.closeModal();
				};

				$scope.closeModal = function () {
					$scope.modal.remove();
				};
				$scope.$on('$destroy', function () {
					if ($scope.modal) {
						$scope.modal.remove();
					}
				});
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.directive('ionSearchSelect', ionSearchSelect);

	ionSearchSelect.$inject = ['$ionicModal', '$ionicGesture'];
	function ionSearchSelect($ionicModal, $ionicGesture) {

		return {
			restrict: 'E',
			scope: {
				options: "=",
				optionSelected: "="
			},
			controller: function ($scope, $element, $attrs) {
				$scope.searchSelect = {
					title: $attrs.title || "Search",
					keyProperty: $attrs.keyProperty,
					valueProperty: $attrs.valueProperty,
					templateUrl: $attrs.templateUrl || 'templates/searchSelect.html',
					animation: $attrs.animation || 'slide-in-up',
					option: null,
					searchvalue: "",
					enableSearch: $attrs.enableSearch ? $attrs.enableSearch == "true" : true
				};

				$ionicGesture.on('tap', function (e) {

					if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
						if ($scope.optionSelected) {
							$scope.searchSelect.option = $scope.optionSelected[$scope.searchSelect.keyProperty];
						}
					}
					else {
						$scope.searchSelect.option = $scope.optionSelected;
					}
					$scope.OpenModalFromTemplate($scope.searchSelect.templateUrl);
				}, $element);

				$scope.saveOption = function () {
					if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
						for (var i = 0; i < $scope.options.length; i++) {
							var currentOption = $scope.options[i];
							if (currentOption[$scope.searchSelect.keyProperty] == $scope.searchSelect.option) {
								$scope.optionSelected = currentOption;
								break;
							}
						}
					}
					else {
						$scope.optionSelected = $scope.searchSelect.option;
					}
					$scope.searchSelect.searchvalue = "";
					$scope.modal.remove();
				};

				$scope.clearSearch = function () {
					$scope.searchSelect.searchvalue = "";
				};

				$scope.closeModal = function () {
					$scope.modal.remove();
				};
				$scope.$on('$destroy', function () {
					if ($scope.modal) {
						$scope.modal.remove();
					}
				});

				$scope.OpenModalFromTemplate = function (templateUrl) {
					$ionicModal.fromTemplateUrl(templateUrl, {
						scope: $scope,
						animation: $scope.searchSelect.animation
					}).then(function (modal) {
						$scope.modal = modal;
						$scope.modal.show();
					});
				};
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Modals', Modals);

	Modals.$inject = ['$ionicModal'];
	function Modals($ionicModal) {

		var modals = [];

		var _openModal = function ($scope, templateUrl, animation) {
			return $ionicModal.fromTemplateUrl(templateUrl, {
				scope: $scope,
				animation: animation || 'slide-in-up',
				backdropClickToClose: false
			}).then(function (modal) {
				modals.push(modal);
				modal.show();
			});
		};

		var _closeModal = function () {
			var currentModal = modals.splice(-1, 1)[0];
			currentModal.remove();
		};

		var _closeAllModals = function () {
			modals.map(function (modal) {
				modal.remove();
			});
			modals = [];
		};

		return {
			openModal: _openModal,
			closeModal: _closeModal,
			closeAllModals: _closeAllModals
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Model', Model);

	Model.$inject = ['Users'];
	function Model(Users) {

		return {
			Users: Users
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.service('$sqliteService', $sqliteService);

	$sqliteService.$inject = ['$q', '$cordovaSQLite'];
	function $sqliteService($q, $cordovaSQLite) {

		var self = this;
		var _db;

		self.db = function () {
			if (!_db) {
				if (window.sqlitePlugin !== undefined) {
					_db = window.sqlitePlugin.openDatabase({ name: "pre.db", location: 2, createFromLocation: 1 });
				} else {
					// For debugging in the browser
					_db = window.openDatabase("pre.db", "1.0", "Database", 200000);
				}
			}
			return _db;
		};

		self.getFirstItem = function (query, parameters) {
			var deferred = $q.defer();
			self.executeSql(query, parameters).then(function (res) {

				if (res.rows.length > 0)
					return deferred.resolve(res.rows.item(0));
				else
					return deferred.reject("There aren't items matching");
			}, function (err) {
				return deferred.reject(err);
			});

			return deferred.promise;
		};

		self.getFirstOrDefaultItem = function (query, parameters) {
			var deferred = $q.defer();
			self.executeSql(query, parameters).then(function (res) {

				if (res.rows.length > 0)
					return deferred.resolve(res.rows.item(0));
				else
					return deferred.resolve(null);
			}, function (err) {
				return deferred.reject(err);
			});

			return deferred.promise;
		};

		self.getItems = function (query, parameters) {
			var deferred = $q.defer();
			self.executeSql(query, parameters).then(function (res) {
				var items = [];
				for (var i = 0; i < res.rows.length; i++) {
					items.push(res.rows.item(i));
				}
				return deferred.resolve(items);
			}, function (err) {
				return deferred.reject(err);
			});

			return deferred.promise;
		};

		self.preloadDataBase = function (enableLog) {
			var deferred = $q.defer();

			//window.open("data:text/plain;charset=utf-8," + JSON.stringify({ data: window.queries.join('').replace(/\\n/g, '\n') }));
			if (window.sqlitePlugin === undefined) {
				if(enableLog) console.log('%c ***************** Starting the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
				self.db().transaction(function (tx) {
					for (var i = 0; i < window.queries.length; i++) {
						var query = window.queries[i].replace(/\\n/g, '\n');

						if(enableLog) console.log(window.queries[i]);
						tx.executeSql(query);
					}
				}, function (error) {
					deferred.reject(error);
				}, function () {
					if(enableLog) console.log('%c ***************** Completing the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
					deferred.resolve("OK");
				});
			}
			else {
				deferred.resolve("OK");
			}

			return deferred.promise;
		};

		self.executeSql = function (query, parameters) {
			return $cordovaSQLite.execute(self.db(), query, parameters);
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Users', Users);

	Users.$inject = ['$q', '$sqliteService'];
	function Users($q, $sqliteService) {

		return {
			getAll: function () {
				var query = "Select * FROM Users";
				return $q.when($sqliteService.getItems(query));
			},
			add: function (user) {
				var query = "INSERT INTO Users (Name) VALUES (?)";
				return $q.when($sqliteService.executeSql(query, [user.Name]));
			}
		};
	}
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImlzc3Vlcy5qcyIsInF1ZXJpZXMuanMiLCJjb250cm9sbGVycy9hcHAuanMiLCJjb250cm9sbGVycy9nYWxsZXJ5LmpzIiwiY29udHJvbGxlcnMvaG9tZS5qcyIsImNvbnRyb2xsZXJzL2l0ZW0uanMiLCJkaXJlY3RpdmVzL2hvbGRMaXN0LmpzIiwiZGlyZWN0aXZlcy9tdWx0aXBsZVNlbGVjdC5qcyIsImRpcmVjdGl2ZXMvc2VhcmNoU2VsZWN0LmpzIiwic2VydmljZXMvbW9kYWxzLmpzIiwic2VydmljZXMvbW9kZWwuanMiLCJzZXJ2aWNlcy9zcWxpdGUuanMiLCJzZXJ2aWNlcy91c2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnQXBwJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuYW5ndWxhci5tb2R1bGUoJ0FwcCcsIFsnaW9uaWMnLCAnbmdDb3Jkb3ZhJywgJ25nQW5pbWF0ZSddKVxuXG4ucnVuKFsnJGlvbmljUGxhdGZvcm0nLCBcblx0XHRcdCckc3FsaXRlU2VydmljZScsXG4gICAgICBmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSwgJHNxbGl0ZVNlcnZpY2UpIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuXHRcdFxuICAgIC8vTG9hZCB0aGUgUHJlLXBvcHVsYXRlZCBkYXRhYmFzZSwgZGVidWcgPSB0cnVlXG4gICAgJHNxbGl0ZVNlcnZpY2UucHJlbG9hZERhdGFCYXNlKHRydWUpO1xuICB9KTtcbn1dKVxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJyxcbiAgICAgICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgICAgICAgJyRpb25pY0NvbmZpZ1Byb3ZpZGVyJyxcbiAgICAgICAgICckY29tcGlsZVByb3ZpZGVyJyxcbiAgICAgICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkaW9uaWNDb25maWdQcm92aWRlciwgJGNvbXBpbGVQcm92aWRlcikge1xuXG4gICAgJGNvbXBpbGVQcm92aWRlci5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3QoL15cXHMqKGh0dHBzP3xmdHB8ZmlsZXxibG9ifGNvbnRlbnR8bXMtYXBweHx4LXdtYXBwMCk6fGRhdGE6aW1hZ2VcXC98aW1nXFwvLyk7XG4gICAgJGNvbXBpbGVQcm92aWRlci5hSHJlZlNhbml0aXphdGlvbldoaXRlbGlzdCgvXlxccyooaHR0cHM/fGZ0cHxtYWlsdG98ZmlsZXxnaHR0cHM/fG1zLWFwcHh8eC13bWFwcDApOi8pO1xuICAgIFxuICAgICRpb25pY0NvbmZpZ1Byb3ZpZGVyLnNjcm9sbGluZy5qc1Njcm9sbGluZyhpb25pYy5QbGF0Zm9ybS5pc0lPUygpKTtcbiAgICBcbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICB1cmw6IFwiL2hvbWVcIixcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcidcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICB1cmw6ICcvYXBwJyxcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0FwcENvbnRyb2xsZXInLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbWVudS5odG1sJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FwcC5nYWxsZXJ5Jywge1xuICAgICAgICAgICAgdXJsOiBcIi9nYWxsZXJ5XCIsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9nYWxsZXJ5Lmh0bWxcIixcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0dhbGxlcnlDb250cm9sbGVyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhcHAuaXRlbScsIHtcbiAgICAgICAgICAgIHVybDogXCIvaXRlbS97dGl0bGV9XCIsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBpY29uOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGVudDoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvaXRlbS5odG1sXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdJdGVtQ29udHJvbGxlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgkaW5qZWN0b3IsICRsb2NhdGlvbikge1xuICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmdldChcIiRzdGF0ZVwiKTtcbiAgICAgICAgJHN0YXRlLmdvKFwiaG9tZVwiKTtcbiAgICB9KTtcbn1dKTtcbiIsIi8qIGdsb2JhbCBpb25pYyAqL1xuKGZ1bmN0aW9uIChhbmd1bGFyLCBpb25pYykge1xuXG5cdGlvbmljLlBsYXRmb3JtLmlzSUUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGlvbmljLlBsYXRmb3JtLnVhLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndHJpZGVudCcpID4gLTE7XG5cdH07XG5cblx0aWYgKGlvbmljLlBsYXRmb3JtLmlzSUUoKSkge1xuXHRcdGFuZ3VsYXIubW9kdWxlKCdpb25pYycpXG5cdFx0XHQuZmFjdG9yeSgnJGlvbmljTmdDbGljaycsIFsnJHBhcnNlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRwYXJzZSwgJHRpbWVvdXQpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgY2xpY2tFeHByKSB7XG5cdFx0XHRcdFx0dmFyIGNsaWNrSGFuZGxlciA9IGFuZ3VsYXIuaXNGdW5jdGlvbihjbGlja0V4cHIpID8gY2xpY2tFeHByIDogJHBhcnNlKGNsaWNrRXhwcik7XG5cblx0XHRcdFx0XHRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0c2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNjb3BlLmNsaWNrdGltZXIpIHJldHVybjsgLy8gU2Vjb25kIGNhbGxcblx0XHRcdFx0XHRcdFx0Y2xpY2tIYW5kbGVyKHNjb3BlLCB7ICRldmVudDogKGV2ZW50KSB9KTtcblx0XHRcdFx0XHRcdFx0c2NvcGUuY2xpY2t0aW1lciA9ICR0aW1lb3V0KGZ1bmN0aW9uICgpIHsgZGVsZXRlIHNjb3BlLmNsaWNrdGltZXI7IH0sIDEsIGZhbHNlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Ly8gSGFjayBmb3IgaU9TIFNhZmFyaSdzIGJlbmVmaXQuIEl0IGdvZXMgc2VhcmNoaW5nIGZvciBvbmNsaWNrIGhhbmRsZXJzIGFuZCBpcyBsaWFibGUgdG8gY2xpY2tcblx0XHRcdFx0XHQvLyBzb21ldGhpbmcgZWxzZSBuZWFyYnkuXG5cdFx0XHRcdFx0ZWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7IH07XG5cdFx0XHRcdH07XG5cdFx0XHR9XSk7XG5cdH1cblxuXHRmdW5jdGlvbiBTZWxlY3REaXJlY3RpdmUoKSB7XG5cdFx0J3VzZSBzdHJpY3QnO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRyZXBsYWNlOiBmYWxzZSxcblx0XHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCkge1xuXHRcdFx0XHRpZiAoaW9uaWMuUGxhdGZvcm0gJiYgKGlvbmljLlBsYXRmb3JtLmlzV2luZG93c1Bob25lKCkgfHwgaW9uaWMuUGxhdGZvcm0uaXNJRSgpIHx8IGlvbmljLlBsYXRmb3JtLnBsYXRmb3JtKCkgPT09IFwiZWRnZVwiKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQuYXR0cignZGF0YS10YXAtZGlzYWJsZWQnLCAndHJ1ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdGFuZ3VsYXIubW9kdWxlKCdpb25pYycpXG4gICAgLmRpcmVjdGl2ZSgnc2VsZWN0JywgU2VsZWN0RGlyZWN0aXZlKTtcblxuXHQvKmFuZ3VsYXIubW9kdWxlKCdpb25pYy1kYXRlcGlja2VyJylcblx0LmRpcmVjdGl2ZSgnc2VsZWN0JywgU2VsZWN0RGlyZWN0aXZlKTsqL1xuXG59KShhbmd1bGFyLCBpb25pYyk7Iiwid2luZG93LnF1ZXJpZXMgPSBbXG5cdC8vRHJvcCB0YWJsZXNcbiAgIFwiRFJPUCBUQUJMRSBJRiBFWElTVFMgVXNlcnM7XCIsXG5cdC8vQ3JlYXRlIHRhYmxlc1xuXHRcIkNSRUFURSBUQUJMRSBVc2VycyAoSWRVc2VyIGludGVnZXIgcHJpbWFyeSBrZXkgYXV0b2luY3JlbWVudCwgTmFtZSB0ZXh0IG5vdCBudWxsKTtcIixcblx0Ly9JbnNlcnQgVXNlcnNcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0p1YW4gRGF2aWQgTmljaG9sbHMgQ2FyZG9uYScpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnS2hyaXp0aWFuIE1vcmVubyBadWx1YWdhJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdDcmlzdGlhbiBSaXZhcyBCdWl0cmFnbycpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnSnVhbiBEYXZpZCBTw6FuY2hleicpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnTmljb2xhcyBNb2xpbmEnKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ01peWFtb3RvIE11c2FzaGkgRklsYW5kZXInKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0RpZGllciBIZXJuYW5kZXonKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0x1aXMgRWR1YXJkbyBPcXVlbmRvIFDDqXJleicpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnQ2FybG9zIFJvamFzJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdMZXZhbm8gQ2FzdGlsbGEgQ2FybG9zIE1pZ3VlbCcpO1wiXG5dOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIEFwcENvbnRyb2xsZXIpO1xuXG4gICAgQXBwQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGlvbmljUG9wb3ZlciddO1xuICAgIGZ1bmN0aW9uIEFwcENvbnRyb2xsZXIoJHNjb3BlLCAkaW9uaWNQb3BvdmVyKSB7XG4gICAgICAgIFxuICAgICAgICAkc2NvcGUuaXRlbXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI0U0NzUwMFwiLFxuICAgICAgICAgICAgICAgIGljb246IFwiaW9uLWlvbmljXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSGVsbG8gSW9uaWNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjNUFEODYzXCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWh0bWw1XCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSFRNTDVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjRjhFNTQ4XCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWphdmFzY3JpcHRcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJKU1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNBRDVDRTlcIixcbiAgICAgICAgICAgICAgICBpY29uOiBcImlvbi1zb2NpYWwtc2Fzc1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNhc3NcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjM0RCRUM5XCIsXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWNzczNcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJDU1MzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI0Q4NkI2N1wiLFxuICAgICAgICAgICAgICAgIGljb246IFwiaW9uLXNvY2lhbC1hbmd1bGFyXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQW5ndWxhclwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgJHNjb3BlLmV4aXRBcHAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpb25pYy5QbGF0Zm9ybS5leGl0QXBwKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJGlvbmljUG9wb3Zlci5mcm9tVGVtcGxhdGVVcmwoJ3RlbXBsYXRlcy9tb2RhbHMvcG9wb3Zlci5odG1sJywge1xuICAgICAgICAgICAgc2NvcGU6ICRzY29wZVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChwb3BvdmVyKSB7XG4gICAgICAgICAgICAkc2NvcGUucG9wb3ZlciA9IHBvcG92ZXI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5vcGVuUG9wb3ZlciA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICRzY29wZS5wb3BvdmVyLnNob3coJGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUucG9wb3Zlci5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdHYWxsZXJ5Q29udHJvbGxlcicsIEdhbGxlcnlDb250cm9sbGVyKTtcblxuICAgIEdhbGxlcnlDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGUnXTtcbiAgICBmdW5jdGlvbiBHYWxsZXJ5Q29udHJvbGxlcigkc2NvcGUsICRzdGF0ZSkge1xuICAgICAgICBcbiAgICAgICAgJHNjb3BlLm9wZW5JdGVtID0gZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2FwcC5pdGVtJywgeyB0aXRsZTogaXRlbS50aXRsZSwgaWNvbjogaXRlbS5pY29uLCBjb2xvcjogaXRlbS5jb2xvciB9KTtcbiAgICAgICAgfTtcbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBIb21lQ29udHJvbGxlcik7XG5cblx0SG9tZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRpb25pY1BvcHVwJywgJ01vZGFscycsICdNb2RlbCddO1xuXHRmdW5jdGlvbiBIb21lQ29udHJvbGxlcigkc2NvcGUsICRpb25pY1BvcHVwLCBNb2RhbHMsIE1vZGVsKSB7XG5cblx0XHQkc2NvcGUudXNlcnMgPSBbXTtcblxuXHRcdCRzY29wZS5IZWxsb1dvcmxkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0JGlvbmljUG9wdXAuYWxlcnQoe1xuXHRcdFx0XHR0aXRsZTogJ0hlbGxvIFdvcmxkJyxcblx0XHRcdFx0dGVtcGxhdGU6ICdUaGlzIGlzIHRoZSBiZXN0IHRlbXBsYXRlIHRvIHN0YXJ0IHdpdGggSW9uaWMgRnJhbWV3b3JrIScsXG4gICAgIFx0XHRjc3NDbGFzczogJ2FuaW1hdGVkIGJvdW5jZUluRG93bidcblx0XHRcdH0pO1xuXHRcdH07XG5cdFx0XG5cdFx0JHNjb3BlLnNob3dVc2VycyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdE1vZGVsLlVzZXJzLmdldEFsbCgpLnRoZW4oZnVuY3Rpb24gKHVzZXJzKSB7XG5cdFx0XHRcdCRzY29wZS51c2VycyA9IGFuZ3VsYXIuY29weSh1c2Vycyk7XG5cdFx0XHR9KTtcblx0XHRcdE1vZGFscy5vcGVuTW9kYWwoJHNjb3BlLCAndGVtcGxhdGVzL21vZGFscy91c2Vycy5odG1sJywgJ2FuaW1hdGVkIHJvdGF0ZUluRG93bkxlZnQnKTtcblx0XHR9O1xuXHRcdFxuXHRcdCRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0TW9kYWxzLmNsb3NlTW9kYWwoKTtcblx0XHRcdCRzY29wZS51c2VycyA9IFtdO1xuXHRcdH07XG5cdFx0XG5cdFx0Ly9DZW50ZXIgY29udGVudFxuXHRcdC8vMS4gaHR0cDovL2NvZGVwZW4uaW8vbWhhcnRpbmd0b24vcGVuL2djSGVMXG5cdFx0Ly8yLiBodHRwOi8vY29kZXBlbi5pby9hbm9uL3Blbi9tZVFKdnBcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ0FwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdJdGVtQ29udHJvbGxlcicsIEl0ZW1Db250cm9sbGVyKTtcblxuICAgIEl0ZW1Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnJGlvbmljVmlld1N3aXRjaGVyJywgJyRzdGF0ZScsICckaW9uaWNIaXN0b3J5J107XG4gICAgZnVuY3Rpb24gSXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkc3RhdGVQYXJhbXMsICRpb25pY1ZpZXdTd2l0Y2hlciwgJHN0YXRlLCAkaW9uaWNIaXN0b3J5KSB7XG4gICAgICAgIFxuICAgICAgICAkc2NvcGUuaXRlbSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiAkc3RhdGVQYXJhbXMudGl0bGUsXG4gICAgICAgICAgICBpY29uOiAkc3RhdGVQYXJhbXMuaWNvbixcbiAgICAgICAgICAgIGNvbG9yOiAkc3RhdGVQYXJhbXMuY29sb3JcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGlmICghJHNjb3BlLml0ZW0uY29sb3IpIHtcbiAgICAgICAgICAgICRpb25pY1ZpZXdTd2l0Y2hlci5uZXh0RGlyZWN0aW9uKCdiYWNrJyk7XG4gICAgICAgICAgICAkaW9uaWNIaXN0b3J5Lm5leHRWaWV3T3B0aW9ucyh7XG4gICAgICAgICAgICAgICAgZGlzYWJsZUJhY2s6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZUFuaW1hdGUgOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhpc3RvcnlSb290ICA6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuZ2FsbGVyeScpO1xuICAgICAgICB9XG4gICAgfVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmRpcmVjdGl2ZSgnaG9sZExpc3QnLCBob2xkTGlzdCk7XG5cblx0aG9sZExpc3QuJGluamVjdCA9IFsnJGlvbmljR2VzdHVyZSddO1xuXHRmdW5jdGlvbiBob2xkTGlzdCgkaW9uaWNHZXN0dXJlKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdFx0JGlvbmljR2VzdHVyZS5vbignaG9sZCcsIGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0XHR2YXIgY29udGVudCA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLml0ZW0tY29udGVudCcpO1xuXG5cdFx0XHRcdFx0dmFyIGJ1dHRvbnMgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLW9wdGlvbnMnKTtcblx0XHRcdFx0XHR2YXIgYnV0dG9uc1dpZHRoID0gYnV0dG9ucy5vZmZzZXRXaWR0aDtcblxuXHRcdFx0XHRcdGlvbmljLnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRjb250ZW50LnN0eWxlW2lvbmljLkNTUy5UUkFOU0lUSU9OXSA9ICdhbGwgZWFzZS1vdXQgLjI1cyc7XG5cblx0XHRcdFx0XHRcdGlmICghYnV0dG9ucy5jbGFzc0xpc3QuY29udGFpbnMoJ2ludmlzaWJsZScpKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TRk9STV0gPSAnJztcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnV0dG9ucy5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcblx0XHRcdFx0XHRcdFx0fSwgMjUwKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGJ1dHRvbnMuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TRk9STV0gPSAndHJhbnNsYXRlM2QoLScgKyBidXR0b25zV2lkdGggKyAncHgsIDAsIDApJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXG5cdFx0XHRcdH0sIGVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5kaXJlY3RpdmUoJ2lvbk11bHRpcGxlU2VsZWN0JywgaW9uTXVsdGlwbGVTZWxlY3QpO1xuXG5cdGlvbk11bHRpcGxlU2VsZWN0LiRpbmplY3QgPSBbJyRpb25pY01vZGFsJywgJyRpb25pY0dlc3R1cmUnXTtcblx0ZnVuY3Rpb24gaW9uTXVsdGlwbGVTZWxlY3QoJGlvbmljTW9kYWwsICRpb25pY0dlc3R1cmUpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0b3B0aW9uczogXCI9XCJcblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdFx0XHRcdCRzY29wZS5tdWx0aXBsZVNlbGVjdCA9IHtcblx0XHRcdFx0XHR0aXRsZTogJGF0dHJzLnRpdGxlIHx8IFwiU2VsZWN0IE9wdGlvbnNcIixcblx0XHRcdFx0XHR0ZW1wT3B0aW9uczogW10sXG5cdFx0XHRcdFx0a2V5UHJvcGVydHk6ICRhdHRycy5rZXlQcm9wZXJ0eSB8fCBcImlkXCIsXG5cdFx0XHRcdFx0dmFsdWVQcm9wZXJ0eTogJGF0dHJzLnZhbHVlUHJvcGVydHkgfHwgXCJ2YWx1ZVwiLFxuXHRcdFx0XHRcdHNlbGVjdGVkUHJvcGVydHk6ICRhdHRycy5zZWxlY3RlZFByb3BlcnR5IHx8IFwic2VsZWN0ZWRcIixcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJGF0dHJzLnRlbXBsYXRlVXJsIHx8ICd0ZW1wbGF0ZXMvbXVsdGlwbGVTZWxlY3QuaHRtbCcsXG5cdFx0XHRcdFx0cmVuZGVyQ2hlY2tib3g6ICRhdHRycy5yZW5kZXJDaGVja2JveCA/ICRhdHRycy5yZW5kZXJDaGVja2JveCA9PSBcInRydWVcIiA6IHRydWUsXG5cdFx0XHRcdFx0YW5pbWF0aW9uOiAkYXR0cnMuYW5pbWF0aW9uIHx8ICdzbGlkZS1pbi11cCdcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlVXJsKSB7XG5cdFx0XHRcdFx0JGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKHRlbXBsYXRlVXJsLCB7XG5cdFx0XHRcdFx0XHRzY29wZTogJHNjb3BlLFxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uOiAkc2NvcGUubXVsdGlwbGVTZWxlY3QuYW5pbWF0aW9uXG5cdFx0XHRcdFx0fSkudGhlbihmdW5jdGlvbiAobW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbCA9IG1vZGFsO1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnNob3coKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkaW9uaWNHZXN0dXJlLm9uKCd0YXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdCRzY29wZS5tdWx0aXBsZVNlbGVjdC50ZW1wT3B0aW9ucyA9ICRzY29wZS5vcHRpb25zLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XG5cdFx0XHRcdFx0XHR2YXIgdGVtcE9wdGlvbiA9IHt9O1xuXHRcdFx0XHRcdFx0dGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Qua2V5UHJvcGVydHldID0gb3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5rZXlQcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC52YWx1ZVByb3BlcnR5XSA9IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3QudmFsdWVQcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XSA9IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV07XG5cblx0XHRcdFx0XHRcdHJldHVybiB0ZW1wT3B0aW9uO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdCRzY29wZS5PcGVuTW9kYWxGcm9tVGVtcGxhdGUoJHNjb3BlLm11bHRpcGxlU2VsZWN0LnRlbXBsYXRlVXJsKTtcblx0XHRcdFx0fSwgJGVsZW1lbnQpO1xuXG5cdFx0XHRcdCRzY29wZS5zYXZlT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8ICRzY29wZS5tdWx0aXBsZVNlbGVjdC50ZW1wT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIHRlbXBPcHRpb24gPSAkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnNbaV07XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8ICRzY29wZS5vcHRpb25zLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBvcHRpb24gPSAkc2NvcGUub3B0aW9uc1tqXTtcblx0XHRcdFx0XHRcdFx0aWYgKHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSA9PSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV0gPSB0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkc2NvcGUuY2xvc2VNb2RhbCgpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0JHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKCRzY29wZS5tb2RhbCkge1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmRpcmVjdGl2ZSgnaW9uU2VhcmNoU2VsZWN0JywgaW9uU2VhcmNoU2VsZWN0KTtcblxuXHRpb25TZWFyY2hTZWxlY3QuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnLCAnJGlvbmljR2VzdHVyZSddO1xuXHRmdW5jdGlvbiBpb25TZWFyY2hTZWxlY3QoJGlvbmljTW9kYWwsICRpb25pY0dlc3R1cmUpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0b3B0aW9uczogXCI9XCIsXG5cdFx0XHRcdG9wdGlvblNlbGVjdGVkOiBcIj1cIlxuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdCA9IHtcblx0XHRcdFx0XHR0aXRsZTogJGF0dHJzLnRpdGxlIHx8IFwiU2VhcmNoXCIsXG5cdFx0XHRcdFx0a2V5UHJvcGVydHk6ICRhdHRycy5rZXlQcm9wZXJ0eSxcblx0XHRcdFx0XHR2YWx1ZVByb3BlcnR5OiAkYXR0cnMudmFsdWVQcm9wZXJ0eSxcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJGF0dHJzLnRlbXBsYXRlVXJsIHx8ICd0ZW1wbGF0ZXMvc2VhcmNoU2VsZWN0Lmh0bWwnLFxuXHRcdFx0XHRcdGFuaW1hdGlvbjogJGF0dHJzLmFuaW1hdGlvbiB8fCAnc2xpZGUtaW4tdXAnLFxuXHRcdFx0XHRcdG9wdGlvbjogbnVsbCxcblx0XHRcdFx0XHRzZWFyY2h2YWx1ZTogXCJcIixcblx0XHRcdFx0XHRlbmFibGVTZWFyY2g6ICRhdHRycy5lbmFibGVTZWFyY2ggPyAkYXR0cnMuZW5hYmxlU2VhcmNoID09IFwidHJ1ZVwiIDogdHJ1ZVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRpb25pY0dlc3R1cmUub24oJ3RhcCcsIGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0XHRpZiAoISEkc2NvcGUuc2VhcmNoU2VsZWN0LmtleVByb3BlcnR5ICYmICEhJHNjb3BlLnNlYXJjaFNlbGVjdC52YWx1ZVByb3BlcnR5KSB7XG5cdFx0XHRcdFx0XHRpZiAoJHNjb3BlLm9wdGlvblNlbGVjdGVkKSB7XG5cdFx0XHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Qub3B0aW9uID0gJHNjb3BlLm9wdGlvblNlbGVjdGVkWyRzY29wZS5zZWFyY2hTZWxlY3Qua2V5UHJvcGVydHldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Qub3B0aW9uID0gJHNjb3BlLm9wdGlvblNlbGVjdGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlKCRzY29wZS5zZWFyY2hTZWxlY3QudGVtcGxhdGVVcmwpO1xuXHRcdFx0XHR9LCAkZWxlbWVudCk7XG5cblx0XHRcdFx0JHNjb3BlLnNhdmVPcHRpb24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKCEhJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eSAmJiAhISRzY29wZS5zZWFyY2hTZWxlY3QudmFsdWVQcm9wZXJ0eSkge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgY3VycmVudE9wdGlvbiA9ICRzY29wZS5vcHRpb25zW2ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoY3VycmVudE9wdGlvblskc2NvcGUuc2VhcmNoU2VsZWN0LmtleVByb3BlcnR5XSA9PSAkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbikge1xuXHRcdFx0XHRcdFx0XHRcdCRzY29wZS5vcHRpb25TZWxlY3RlZCA9IGN1cnJlbnRPcHRpb247XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUub3B0aW9uU2VsZWN0ZWQgPSAkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdC5zZWFyY2h2YWx1ZSA9IFwiXCI7XG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0LnNlYXJjaHZhbHVlID0gXCJcIjtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdCRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICgkc2NvcGUubW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCRzY29wZS5PcGVuTW9kYWxGcm9tVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGVVcmwpIHtcblx0XHRcdFx0XHQkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcblx0XHRcdFx0XHRcdHNjb3BlOiAkc2NvcGUsXG5cdFx0XHRcdFx0XHRhbmltYXRpb246ICRzY29wZS5zZWFyY2hTZWxlY3QuYW5pbWF0aW9uXG5cdFx0XHRcdFx0fSkudGhlbihmdW5jdGlvbiAobW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbCA9IG1vZGFsO1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnNob3coKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZmFjdG9yeSgnTW9kYWxzJywgTW9kYWxzKTtcblxuXHRNb2RhbHMuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnXTtcblx0ZnVuY3Rpb24gTW9kYWxzKCRpb25pY01vZGFsKSB7XG5cblx0XHR2YXIgbW9kYWxzID0gW107XG5cblx0XHR2YXIgX29wZW5Nb2RhbCA9IGZ1bmN0aW9uICgkc2NvcGUsIHRlbXBsYXRlVXJsLCBhbmltYXRpb24pIHtcblx0XHRcdHJldHVybiAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcblx0XHRcdFx0c2NvcGU6ICRzY29wZSxcblx0XHRcdFx0YW5pbWF0aW9uOiBhbmltYXRpb24gfHwgJ3NsaWRlLWluLXVwJyxcblx0XHRcdFx0YmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlXG5cdFx0XHR9KS50aGVuKGZ1bmN0aW9uIChtb2RhbCkge1xuXHRcdFx0XHRtb2RhbHMucHVzaChtb2RhbCk7XG5cdFx0XHRcdG1vZGFsLnNob3coKTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHR2YXIgX2Nsb3NlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY3VycmVudE1vZGFsID0gbW9kYWxzLnNwbGljZSgtMSwgMSlbMF07XG5cdFx0XHRjdXJyZW50TW9kYWwucmVtb3ZlKCk7XG5cdFx0fTtcblxuXHRcdHZhciBfY2xvc2VBbGxNb2RhbHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRtb2RhbHMubWFwKGZ1bmN0aW9uIChtb2RhbCkge1xuXHRcdFx0XHRtb2RhbC5yZW1vdmUoKTtcblx0XHRcdH0pO1xuXHRcdFx0bW9kYWxzID0gW107XG5cdFx0fTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRvcGVuTW9kYWw6IF9vcGVuTW9kYWwsXG5cdFx0XHRjbG9zZU1vZGFsOiBfY2xvc2VNb2RhbCxcblx0XHRcdGNsb3NlQWxsTW9kYWxzOiBfY2xvc2VBbGxNb2RhbHNcblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZmFjdG9yeSgnTW9kZWwnLCBNb2RlbCk7XG5cblx0TW9kZWwuJGluamVjdCA9IFsnVXNlcnMnXTtcblx0ZnVuY3Rpb24gTW9kZWwoVXNlcnMpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRVc2VyczogVXNlcnNcblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuc2VydmljZSgnJHNxbGl0ZVNlcnZpY2UnLCAkc3FsaXRlU2VydmljZSk7XG5cblx0JHNxbGl0ZVNlcnZpY2UuJGluamVjdCA9IFsnJHEnLCAnJGNvcmRvdmFTUUxpdGUnXTtcblx0ZnVuY3Rpb24gJHNxbGl0ZVNlcnZpY2UoJHEsICRjb3Jkb3ZhU1FMaXRlKSB7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIF9kYjtcblxuXHRcdHNlbGYuZGIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoIV9kYikge1xuXHRcdFx0XHRpZiAod2luZG93LnNxbGl0ZVBsdWdpbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0X2RiID0gd2luZG93LnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2UoeyBuYW1lOiBcInByZS5kYlwiLCBsb2NhdGlvbjogMiwgY3JlYXRlRnJvbUxvY2F0aW9uOiAxIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEZvciBkZWJ1Z2dpbmcgaW4gdGhlIGJyb3dzZXJcblx0XHRcdFx0XHRfZGIgPSB3aW5kb3cub3BlbkRhdGFiYXNlKFwicHJlLmRiXCIsIFwiMS4wXCIsIFwiRGF0YWJhc2VcIiwgMjAwMDAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9kYjtcblx0XHR9O1xuXG5cdFx0c2VsZi5nZXRGaXJzdEl0ZW0gPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtZXRlcnMpIHtcblx0XHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cdFx0XHRzZWxmLmV4ZWN1dGVTcWwocXVlcnksIHBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuXG5cdFx0XHRcdGlmIChyZXMucm93cy5sZW5ndGggPiAwKVxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKHJlcy5yb3dzLml0ZW0oMCkpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChcIlRoZXJlIGFyZW4ndCBpdGVtcyBtYXRjaGluZ1wiKTtcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLmdldEZpcnN0T3JEZWZhdWx0SXRlbSA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1ldGVycykge1xuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblx0XHRcdHNlbGYuZXhlY3V0ZVNxbChxdWVyeSwgcGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAocmVzKSB7XG5cblx0XHRcdFx0aWYgKHJlcy5yb3dzLmxlbmd0aCA+IDApXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmUocmVzLnJvd3MuaXRlbSgwKSk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZShudWxsKTtcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLmdldEl0ZW1zID0gZnVuY3Rpb24gKHF1ZXJ5LCBwYXJhbWV0ZXJzKSB7XG5cdFx0XHR2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXHRcdFx0c2VsZi5leGVjdXRlU3FsKHF1ZXJ5LCBwYXJhbWV0ZXJzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdFx0dmFyIGl0ZW1zID0gW107XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVzLnJvd3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpdGVtcy5wdXNoKHJlcy5yb3dzLml0ZW0oaSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKGl0ZW1zKTtcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLnByZWxvYWREYXRhQmFzZSA9IGZ1bmN0aW9uIChlbmFibGVMb2cpIHtcblx0XHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cblx0XHRcdC8vd2luZG93Lm9wZW4oXCJkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCxcIiArIEpTT04uc3RyaW5naWZ5KHsgZGF0YTogd2luZG93LnF1ZXJpZXMuam9pbignJykucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpIH0pKTtcblx0XHRcdGlmICh3aW5kb3cuc3FsaXRlUGx1Z2luID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0aWYoZW5hYmxlTG9nKSBjb25zb2xlLmxvZygnJWMgKioqKioqKioqKioqKioqKiogU3RhcnRpbmcgdGhlIGNyZWF0aW9uIG9mIHRoZSBkYXRhYmFzZSBpbiB0aGUgYnJvd3NlciAqKioqKioqKioqKioqKioqKiAnLCAnYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTUnKTtcblx0XHRcdFx0c2VsZi5kYigpLnRyYW5zYWN0aW9uKGZ1bmN0aW9uICh0eCkge1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93LnF1ZXJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciBxdWVyeSA9IHdpbmRvdy5xdWVyaWVzW2ldLnJlcGxhY2UoL1xcXFxuL2csICdcXG4nKTtcblxuXHRcdFx0XHRcdFx0aWYoZW5hYmxlTG9nKSBjb25zb2xlLmxvZyh3aW5kb3cucXVlcmllc1tpXSk7XG5cdFx0XHRcdFx0XHR0eC5leGVjdXRlU3FsKHF1ZXJ5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnJvcik7XG5cdFx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZihlbmFibGVMb2cpIGNvbnNvbGUubG9nKCclYyAqKioqKioqKioqKioqKioqKiBDb21wbGV0aW5nIHRoZSBjcmVhdGlvbiBvZiB0aGUgZGF0YWJhc2UgaW4gdGhlIGJyb3dzZXIgKioqKioqKioqKioqKioqKiogJywgJ2JhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1Jyk7XG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShcIk9LXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKFwiT0tcIik7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuXHRcdH07XG5cblx0XHRzZWxmLmV4ZWN1dGVTcWwgPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtZXRlcnMpIHtcblx0XHRcdHJldHVybiAkY29yZG92YVNRTGl0ZS5leGVjdXRlKHNlbGYuZGIoKSwgcXVlcnksIHBhcmFtZXRlcnMpO1xuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5mYWN0b3J5KCdVc2VycycsIFVzZXJzKTtcblxuXHRVc2Vycy4kaW5qZWN0ID0gWyckcScsICckc3FsaXRlU2VydmljZSddO1xuXHRmdW5jdGlvbiBVc2VycygkcSwgJHNxbGl0ZVNlcnZpY2UpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHF1ZXJ5ID0gXCJTZWxlY3QgKiBGUk9NIFVzZXJzXCI7XG5cdFx0XHRcdHJldHVybiAkcS53aGVuKCRzcWxpdGVTZXJ2aWNlLmdldEl0ZW1zKHF1ZXJ5KSk7XG5cdFx0XHR9LFxuXHRcdFx0YWRkOiBmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0XHR2YXIgcXVlcnkgPSBcIklOU0VSVCBJTlRPIFVzZXJzIChOYW1lKSBWQUxVRVMgKD8pXCI7XG5cdFx0XHRcdHJldHVybiAkcS53aGVuKCRzcWxpdGVTZXJ2aWNlLmV4ZWN1dGVTcWwocXVlcnksIFt1c2VyLk5hbWVdKSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTsiXX0=
