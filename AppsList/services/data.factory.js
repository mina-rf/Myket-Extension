/**
 * Created by mina on 8/15/16.
 */
// angular
//     .module('myketAddOn').factory('data' , getData);
//
//
// function getData($http){
//     return {
//         getApps : getApps,
//         getAppVersion : getAppVersion
//     }
//
//     function getApps () {
//         return $http.get('http://myket.ir/api/v1/layouts/home?fields=app(application(packageName,title,iconPath,isFree,hasIAP,rating,price,versionCode,realPrice,isIncompatible,supportMoneyBack,hasBanner,palette,aparatVideoId,developerName,developerId,categoryName),bgColors,index,text),apps(eol,index,title,packageKey,apps(packageName,title,iconPath,isFree,hasIAP,rating,price,versionCode,realPrice,isIncompatible,supportMoneyBack,hasBanner,palette,aparatVideoId,developerName,developerId,categoryName)),banners&lang=fa');
//     }
//     function getAppVersion(app) {
//         return $http.get('https://myket.ir/api/v1/applications/'+app.packageName +'/?fields=versionCode');
//     }
// };

(function () {
    'use strict';

    angular
        .module('myketAddOn')
        .factory('data', getData);


    /* @ngInject */
    function getData($http) {
        var service = {
            getApps : getApps,
            getAppVersion : getAppVersion ,
            getTopNew : getTopNew ,
            getBestSelling : getBestSelling ,
            getAllNew : getAllNew ,
            getProgressing : getProgressing
        };
        return service;

        ////////////////

        function getApps () {
            return $http.get('http://myket.ir/api/v1/layouts/home?fields=app(application(packageName,title,iconPath,isFgetree,hasIAP,rating,price,versionCode,realPrice,isIncompatible,supportMoneyBack,hasBanner,palette,aparatVideoId,developerName,developerId,categoryName),bgColors,index,text),apps(eol,index,title,packageKey,apps(packageName,title,iconPath,isFree,hasIAP,rating,price,versionCode,realPrice,isIncompatible,supportMoneyBack,hasBanner,palette,aparatVideoId,developerName,developerId,categoryName)),banners&lang=fa');
        }
        function getAppVersion(app) {
            return $http.get('https://myket.ir/api/v1/applications/'+app.packageName +'/?fields=versionCode');
        }
        function getTopNew(){
            return $http.get('https://myket.ir/api/v1/applications/package/All_TopNew/?fields=Eol,Title,IconPath,Banner,Bg,MetaData,AppPlusMetaDataList(packageName,iconPath,title,hasIAP,price,realPrice,rating,rates,versionCode,isIncompatible,hasMediaReview,developerName)&lang=fa&limit=24&offset=24');
        }
        function getBestSelling(){
            return $http.get('https://myket.ir/api/v1/applications/package/All_WeekBestSelling/?fields=Eol,Title,IconPath,Banner,Bg,MetaData,AppPlusMetaDataList(packageName,iconPath,title,hasIAP,price,realPrice,rating,rates,versionCode,isIncompatible,hasMediaReview,developerName)&lang=fa&limit=24&offset=24');
        }
        function getAllNew() {
            return $http.get('https://myket.ir/api/v1/applications/package/All_New/?fields=Eol,Title,IconPath,Banner,Bg,MetaData,AppPlusMetaDataList(packageName,iconPath,title,hasIAP,price,realPrice,rating,rates,versionCode,isIncompatible,hasMediaReview,developerName)&lang=fa&limit=24&offset=24');
        }
        function getProgressing() {
            return $http.get('https://myket.ir/api/v1/applications/package/All_Grossing/?fields=Eol,Title,IconPath,Banner,Bg,MetaData,AppPlusMetaDataList(packageName,iconPath,title,hasIAP,price,realPrice,rating,rates,versionCode,isIncompatible,hasMediaReview,developerName)&lang=fa&limit=24&offset=24');
        }

    }

})();

