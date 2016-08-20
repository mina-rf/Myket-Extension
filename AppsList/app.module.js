/**
 * Created by mina on 8/15/16.
 */


(function () {
    'use strict';

    angular
        .module('myketAddOn', ['ngMaterial']).config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink');
    });

})();