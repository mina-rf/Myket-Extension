/**
 * Created by mina on 8/15/16.
 */
angular
    .module('myketAddOn').controller('AddOnController' ,AddOnController);

AddOnController.$inject=[ 'data' , 'notification'];

function AddOnController( data ,notification) {
    vm = this;
    vm.test='test';
    vm.start = function () {
         data.getApps().then(function (response) {

            vm.newBest = notification.checkIfFollowed(notification.checkIfNew(response.data['apps'][0]['apps']));
            vm.progressing = notification.checkIfFollowed(notification.checkIfNew(response.data['apps'][1]['apps']));
            vm.bestInnerPayment = notification.checkIfFollowed(notification.checkIfNew(response.data['apps'][2]['apps']));
            vm.bestNotFree = notification.checkIfFollowed(notification.checkIfNew(response.data['apps'][3]['apps']));
            // response.data['apps'][1]['apps'].push($scope.newApp);
            vm.followings = notification.checkIfFollowed(notification.checkIfNew(JSON.parse(localStorage.getItem('updateReminders'))));

            console.log(vm.newBest)
        });


    };
    window.onload = vm.start();

};



