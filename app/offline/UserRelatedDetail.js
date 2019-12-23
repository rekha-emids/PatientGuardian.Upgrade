const Realm = require('realm'),
 UserRelatedDetails = {
    name: 'UserRelatedDetails',
    properties: {userRelatedData: 'string'}
}

export function storeUserRelatedData(userRelatedData) {
    Realm.open({ path: `UserRelatedDetails.realm`, schema: [UserRelatedDetails] })
        .then((realm) => {
            let userRelatedObj = realm.objects('UserRelatedDetails');

            realm.write(() => {
                if (userRelatedObj[0]) {
                    userRelatedObj[0].userRelatedData = JSON.stringify(userRelatedData)
                } else {
                    let newUserRelatedObj = realm.create('UserRelatedDetails', {userRelatedData: JSON.stringify(userRelatedData)})
                }
            });
        })

}

export function getOfflineUserRelatedData() {
    let realmPromise = Realm.open({ path: `UserRelatedDetails.realm`, schema: [UserRelatedDetails] })
        .then((realm) => {
            let data = realm.objects('UserRelatedDetails');

            return data;
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearUserRelatedData(){
    Realm.open({path: `UserRelatedDetails.realm`, schema: [UserRelatedDetails] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('UserRelatedDetails'),
                 deletedObj = realm.delete(obj); // Deletes all books
              });
        })
}