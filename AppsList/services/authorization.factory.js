/**
 * Created by mina on 8/15/16.
 */
angular
    .module('myketAddOn').factory('authorization', authorize);
angular
    .module('myketAddOn').config(['$httpProvider', pushAuthorizeCode]);


function authorize(){
    var sessionInjector = {
        request: function (config) {
            config.headers['Authorization'] = 'eyJhY2MiOiIiLCJhZyI6IjRkNmY3YTY5NmM2YzYxMmYzNSIsImR0IjoxOTY1MTY2MiwiaHNoIjoiZ1ZVRjRNRjUxTXhjWld2Yi8rSVFKQjNKVzc4PSIsInQiOiJCcm93c2VyIn0';
            config.headers['Myket-Version'] = 562;
            return config;
        }
    };
    return sessionInjector;
};


function pushAuthorizeCode($httpProvider){
    $httpProvider.interceptors.push('authorization');
};

// (function () {
//     'use strict';
//
//     angular
//         .module('myketAddOn')
//         .factory('authorization', authorize);
//
//     // factoryName.$inject = ['dependency'];
//
//     /* @ngInject */
//     function authorize() {
//         var sessionInjector = {
//             request: function (config) {
//                 config.headers['Authorization'] = 'eyJhY2MiOiIiLCJhZyI6IjRkNmY3YTY5NmM2YzYxMmYzNSIsImR0IjoxOTY1MTY2MiwiaHNoIjoiZ1ZVRjRNRjUxTXhjWld2Yi8rSVFKQjNKVzc4PSIsInQiOiJCcm93c2VyIn0';
//                 config.headers['Myket-Version'] = 562;
//
//                 console.log('configgg');
//                 return config;
//             }
//         };
//         return sessionInjector;
//     }
//
// })();
//


