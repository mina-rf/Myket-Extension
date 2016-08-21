/**
 * Created by mina on 8/21/16.
 */
(function () {
    'use strict';

    angular
        .module('myketAddOn')
        .controller('UIController', UIController);

    UIController.$inject = ['$mdSidenav'];

    /* @ngInject */
    function UIController($mdSidenav) {
        var vm = this;
        vm.title = 'uiController';

        vm.toggleLeft = buildToggler('left');
        vm.toggleRight = buildToggler('right');
        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            }
        };

    }

})();

