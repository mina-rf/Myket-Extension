/**
 * Created by mina on 8/15/16.
 */

(function () {
    'use strict';

    angular
        .module('myketAddOn')
        .controller('AddOnController', AddOnController);

    AddOnController.$inject = [ 'data' , 'notification' , '$mdSidenav'];

    /* @ngInject */
    function AddOnController(data ,notification , $mdSidenav) {
        var vm = this;
        vm.title = 'AddOnController';

        vm.toggleLeft = buildToggler('left');
        vm.toggleRight = buildToggler('right');
        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            }
        };

        vm.test='test';
        vm.start = function () {
            data.getAllNew().then(function (response) {
                vm.newBest = notification.checkIfFollowed(notification.checkIfNew(response.data['appPlusMetaDataList']));
            });
            data.getBestSelling().then(function (response) {
                vm.bestNotFree = notification.checkIfFollowed(notification.checkIfNew(response.data['appPlusMetaDataList']));
            });
            data.getProgressing().then(function (response) {
                vm.progressing = notification.checkIfFollowed(notification.checkIfNew(response.data['appPlusMetaDataList']));
            });
            data.getTopNew().then(function (response) {
                vm.topNew = notification.checkIfFollowed(notification.checkIfNew(response.data['appPlusMetaDataList']));
            });

            if (localStorage.getItem('updateReminders'))
                vm.followings = notification.checkIfFollowed(notification.checkIfNew(JSON.parse(localStorage.getItem('updateReminders'))));



        };

        activate();

        ////////////////

        function activate() {
            vm.start();
        }
    }

})();





