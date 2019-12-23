const Realm = require('realm'),
 UserRoles = {
    name: 'UserRoles',
    properties: {userRoles: 'string'}
}

export function storeUserRolesData(userRolesData) {
    Realm.open({ path: `UserRoles.realm`, schema: [UserRoles] })
        .then((realm) => {
            let userRolesObj = realm.objects('UserRoles');

            realm.write(() => {
                if (userRolesObj[0]) {
                    userRolesObj[0].userRoles = JSON.stringify(userRolesData)
                } else {
                    let newUserRolesObj = realm.create('UserRoles', {userRoles: JSON.stringify(userRolesData)})
                }
            });
        })

}

export function getOfflineUserRolesData() {
    let realmPromise = Realm.open({ path: `UserRoles.realm`, schema: [UserRoles] })
        .then((realm) => {
            let data = realm.objects('UserRoles');

            return JSON.parse(data[0].userRoles);
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflineUserRolesData(){
    Realm.open({path: `UserRoles.realm`, schema: [UserRoles] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('UserRoles'),
                 deletedObj = realm.delete(obj); // Deletes all books
              });
        })
}