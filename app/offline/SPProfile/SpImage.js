const Realm = require('realm'),
 spProfileImage = {
    name: 'SpImage',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        image: 'string?'

    }
}

export function storeSpProfileImage(imageObj) {
    return Realm.open({ path: `SpImage.realm`, schema: [spProfileImage] })
        .then((realm) => {
            let dbImageObj = realm.objectForPrimaryKey('SpImage', imageObj.serviceProviderId);

            __DEV__ && console.log("storeSpProfileImage: ", dbImageObj)
            realm.write(() => {
                if (dbImageObj) {
                    dbImageObj.image = imageObj.image
                } else {
                    let newDbImageObj = realm.create('SpImage', {
                        serviceProviderId: imageObj.serviceProviderId,
                        image: imageObj.image
                    })

                    __DEV__ && console.log("newDbImageObj: ", newDbImageObj);
                }
            });
            return dbImageObj;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpImage(id) {
    __DEV__ && console.log("getOfflineSpImage: ", id)
    let realmPromise = Realm.open({ path: `SpImage.realm`, schema: [spProfileImage] })
        .then((realm) => {
            let data = realm.objectForPrimaryKey('SpImage', id);

            __DEV__ && console.log("getOfflineSpImage is: ", data)
            return data ? data : {};
        })
        .catch((err) => {
            __DEV__ && console.log("Err is: ", err)
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpProfileImage(){
    Realm.open({path: `SpImage.realm`, schema: [spProfileImage] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('SpImage'),
                 deletedObj = realm.delete(obj); // Deletes all SpImage
              });
        })
.catch((err) => {
            throw err;
        })
}