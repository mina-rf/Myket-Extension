/**
 * Created by mina on 8/15/16.
 */
angular
    .module('myketAddOn').factory('notification' ,notification);

notification.$inject=['$interval' , 'data'];
function notification($interval , data) {
    return{
        setForUpdateReminder : setForUpdateReminder,
        removeFromUpdateReminder : removeFromUpdateReminder,
        checkIfNew : checkIfNew,
        checkIfFollowed : checkIfFollowed,
        pushNotif : pushNotif


    };

    function setForUpdateReminder(app) {

        if (localStorage.getItem('updateReminders')) {
            arr = JSON.parse(localStorage.getItem('updateReminders'));
            arr.push(app);
            localStorage.setItem('updateReminders', JSON.stringify(arr));
        }
        else {
            arr = [];
            arr.push(app);
            localStorage.setItem('updateReminders', JSON.stringify(arr));

        }
    };

    function removeFromUpdateReminder(app) {
        updates = JSON.parse(localStorage.getItem('updateReminders'));
        result = [];
        for (var i =0 ; i<updates.length ; i++){
            if (updates[i].title != app.title){
                result.push(updates[i]);
            }
        }
        localStorage.setItem('updateReminders' , JSON.stringify(result));
    };

    function checkIfNew(apps) {
        //TODO
        if (!localStorage.getItem('apps')){
            angular.forEach(apps,function (item) {
                item.isNew = true;
            });
        }
        else{
            savedApps = JSON.stringify(localStorage.getItem('apps'));
            angular.forEach(apps,function (item) {
                item.isNew = savedApps.indexOf(item.title) == -1 ? true : false;
            });
        }

        return apps;
    };

    function checkIfFollowed(apps) {
        result = [];
        if (!localStorage.getItem('updateReminders')) {
            for (var i = 0; i < apps.length; i++) {
                apps[i].isFollowed = false;
                result[i] = apps[i];
            }
        }
        else {
            updates = JSON.parse(localStorage.getItem('updateReminders'));
            for (var i = 0; i < apps.length; i++) {
                apps[i].isFollowed = false;
                for (var j = 0; j < updates.length; j++) {
                    if (apps[i].title == updates[j].title) {
                        apps[i].isFollowed = true;
                    }
                }
                result[i] = apps[i];
            }
        }
        return result;
    };

    function pushNotif() {
        checkForNewApp();
        checkForNewVersion() ;
        // $interval(checkForNewApp , 15*60*1000);
        // $interval(checkForNewVersion , 15*60*1000);
    }

    function checkForNewApp() {
       data.getApps().then(function (response) {
           searchNewApp(response);
       });
    }
    function searchNewApp(response) {
        if (!localStorage.getItem('apps')){
            result = []
            for (var i = 0; i < response.data['apps'].length; i++) {
                for (var j = 0; j < response.data['apps'][i]['apps'].length; j++) {
                    var appName = response.data['apps'][i]['apps'][j]['title'];
                    result.push(appName);
                }
            }
            localStorage.setItem('apps',JSON.stringify(result));

        }
        else{
            apps = JSON.parse(localStorage.getItem('apps'));
            console.log(apps);
            for (var i = 0; i < response.data['apps'].length; i++) {
                for (var j = 0; j < response.data['apps'][i]['apps'].length; j++) {
                    var appName = response.data['apps'][i]['apps'][j]['title'];
                    if (apps.indexOf(appName) == -1){
                        console.log('new app');
                        notifForNewApp(response.data['apps'][i]['apps'][j]);
                        apps.push(appName);
                    }
                }
            }
            localStorage.setItem('apps',JSON.stringify(apps));
        }

    };


    function checkForNewVersion(){
        console.log('checking for new updates');
        if (!localStorage.getItem('updateReminders'))
            return;
        updateReminders = JSON.parse(localStorage.getItem('updateReminders'));
        angular.forEach(updateReminders , function (app) {
            data.getAppVersion(app).then(function (response) {
                console.log(response.data['versionCode']  + " ? " + app.versionCode);
                if (response.data['versionCode'] > app.versionCode){
                    notifForNewVersion(app , response.data['versionCode']);
                }
            })
        });
    }

    function notifForNewApp(app) {
        var options = {
            body: app.title,
            icon: "icon.png"
        };
        var n = new Notification("اپلیکیشن جدید", options);
        setTimeout(n.close.bind(n), 3000);
    };

    function notifForNewVersion(app) {
        var options = {
            body: 'نسخه جدید اپلیکیشن '+ app.title +'موجود است.',
            icon: "icon.png"
        };
        var n = new Notification("به روز رسانی! ", options);
        setTimeout(n.close.bind(n), 3000);
    };


};

