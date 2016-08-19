/**
 * Created by mina on 8/16/16.
 */
angular
    .module('myketAddOn').directive('appMainCard',appMainCard);

appMainCard.$inject=['notification'];

function appMainCard(notification) {
    return{
        restrict: 'AE',
        scope: {
            app: '=app'
        },
        templateUrl: "directives/app.main.card.directive.html",
        link : linkAppMainCard
    };

    function linkAppMainCard(scope, elem, attr) {
        scope.clickOnIcon = function () {
            window.open('https://myket.ir/app/' + scope.app.packageName + '/' + scope.app.title);
        }
        scope.clickOnReminder = function () {
            if (!scope.app.isFollowed){
                scope.app.isFollowed=true;
                notification.setForUpdateReminder(scope.app);
            }
            else{
                scope.app.isFollowed=false;
                notification.removeFromUpdateReminder(scope.app);
            }
        };


    };


};


