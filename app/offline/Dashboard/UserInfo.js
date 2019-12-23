const Realm = require('realm'),
 UserInfo = {
    name: 'UserInfo',
    properties: {userInfo: 'string'}
}

export function storeUserInfoData(userInfoData) {
    Realm.open({ path: `UserInfo.realm`, schema: [UserInfo] })
        .then((realm) => {
            let userInfoObj = realm.objects('UserInfo');

            realm.write(() => {
                if (userInfoObj[0]) {
                    userInfoObj[0].userInfo = JSON.stringify(userInfoData)
                } else {
                    let newUserInfoObj = realm.create('UserInfo', {userInfo: JSON.stringify(userInfoData)})
                }
            });
        })

}

export function getOfflineUserInfoData() {
    let realmPromise = Realm.open({ path: `UserInfo.realm`, schema: [UserInfo] })
        .then((realm) => {
            let data = realm.objects('UserInfo');

            return JSON.parse(data[0].userInfo);
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflineUserInfoData(){
    Realm.open({path: `UserInfo.realm`, schema: [UserInfo] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('UserInfo'),
                 deletedObj = realm.delete(obj); // Deletes all books
              });
        })
.catch((err) => {
 throw err; 
})
}