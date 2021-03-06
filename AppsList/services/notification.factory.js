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

        data.getAllNew().then(function (response) {
            searchForNewApp(response.data['appPlusMetaDataList']);
        });
        data.getTopNew().then(function (response) {
            searchForNewApp(response.data['appPlusMetaDataList']);
        });
        data.getBestSelling().then(function (response) {
            searchForNewApp(response.data['appPlusMetaDataList']);
        });
        data.getProgressing().then(function (response) {
            searchForNewApp(response.data['appPlusMetaDataList']);
        });
    }


    function searchForNewApp(apps) {
        if (!localStorage.getItem('apps')){
            result = []

                for (var j = 0; j < apps.length; j++) {
                    var appName = apps[j]['title'];
                    result.push(appName);
                }

            localStorage.setItem('apps',JSON.stringify(result));

        }
        else{
            savedApp = JSON.parse(localStorage.getItem('apps'));
            console.log(apps);

                for (var j = 0; j < apps.length; j++) {
                    var appName = apps[j]['title'];
                    if (savedApp.indexOf(appName) == -1){
                        console.log('new app');
                        notifForNewApp(apps[j]);
                        savedApp.push(appName);
                    }
                }

            localStorage.setItem('apps',JSON.stringify(savedApp));
        }
    }


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
            icon: app.iconPath
        };
        var n = new Notification("اپلیکیشن جدید!", options);
        n.onclick = function () {
            window.open('https://myket.ir/app/' +app.packageName+'/'+app.title);
        };
        setTimeout(n.close.bind(n), 5000);
    };

    function notifForNewVersion(app) {
        var options = {
            body: 'نسخه جدید اپلیکیشن '+ app.title +'موجود است.',
            icon: app.iconPath
        };
        var n = new Notification("به روز رسانی! ", options);
        n.onclick = function () {
            window.open('https://myket.ir/app/' +app.packageName+'/'+app.title);
        };
        setTimeout(n.close.bind(n), 5000);
    };


};

