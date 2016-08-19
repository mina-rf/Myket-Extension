/**
 * Created by mina on 8/15/16.
 */
angular
    .module('myketAddOn').factory('data' , getData);


function getData($http){
    return {
        getApps : getApps,
        getAppVersion : getAppVersion
    }

    function getApps () {
        return $http.get('http://myket.ir/api/v1/layouts/home?fields=app(application(packageName,title,iconPath,isFree,hasIAP,rating,price,versionCode,realPrice,isIncompatible,supportMoneyBack,hasBanner,palette,aparatVideoId,developerName,developerId,categoryName),bgColors,index,text),apps(eol,index,title,packageKey,apps(packageName,title,iconPath,isFree,hasIAP,rating,price,versionCode,realPrice,isIncompatible,supportMoneyBack,hasBanner,palette,aparatVideoId,developerName,developerId,categoryName)),banners&lang=fa');
    }
    function getAppVersion(app) {
        return $http.get('https://myket.ir/api/v1/applications/'+app.packageName +'/?fields=versionCode');
    }
};

// function getData() {
//     {
//     return $http.get('http://myket.ir/api/v1/layouts/home?fields=app(application(packageName,title,iconPath,isFree,hasIAP,rating,price,versionCode,realPrice,isIncompatible,supportMoneyBack,hasBanner,palette,aparatVideoId,developerName,developerId,categoryName),bgColors,index,text),apps(eol,index,title,packageKey,apps(packageName,title,iconPath,isFree,hasIAP,rating,price,versionCode,realPrice,isIncompatible,supportMoneyBack,hasBanner,palette,aparatVideoId,developerName,developerId,categoryName)),banners&lang=fa');
// };
// var getVersion = function (app) {
//     return $http.get('https://myket.ir/api/v1/applications/'+app.packageName +'/?fields=versionCode');
// };
// return {
//     getApps: sendReqFunc ,
//     getVersion : getVersion
// }
// }