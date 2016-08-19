/**
 * Created by mina on 8/15/16.
 */

angular.module('backgroundApp' , ['myketAddOn'])
    .run(['notification' ,function (notification) {
        notification.pushNotif();
    }]);
