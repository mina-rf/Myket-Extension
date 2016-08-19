/**
 * Created by mina on 8/15/16.
 */

(function () {
    'use strict';

    angular
        .module('myketAddOn')
        .controller('AddOnController', AddOnController);

    AddOnController.$inject = [ 'data' , 'notification'];

    /* @ngInject */
    function AddOnController(data ,notification) {
        var vm = this;
        vm.title = 'ControllerName';

        vm.test='test';
        vm.start = function () {
            data.getApps().then(function (response) {

                vm.newBest = notification.checkIfFollowed(notification.checkIfNew(response.data['apps'][0]['apps']));
                vm.progressing = notification.checkIfFollowed(notification.checkIfNew(response.data['apps'][1]['apps']));
                vm.bestInnerPayment = notification.checkIfFollowed(notification.checkIfNew(response.data['apps'][2]['apps']));
                vm.bestNotFree = notification.checkIfFollowed(notification.checkIfNew(response.data['apps'][3]['apps']));
                // response.data['apps'][1]['apps'].push($scope.newApp);
                if (localStorage.getItem('updateReminders'))
                    vm.followings = notification.checkIfFollowed(notification.checkIfNew(JSON.parse(localStorage.getItem('updateReminders'))));

                console.log(vm.newBest)
            });


        };
        activate();

        ////////////////

        function activate() {
            vm.start();
        }
    }

})();





