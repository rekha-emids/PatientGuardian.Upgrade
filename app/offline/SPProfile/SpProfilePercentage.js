const Realm = require('realm'),
 ProfilePercentage = {
    name: 'SpProfilePercentage',
    primaryKey: 'id',
    properties: {
        id: 'int?',
        percentage: 'int?'

    }
}

export function storeProfilePercentage(id, percentage) {
    return Realm.open({ path: `SpProfilePercentage.realm`, schema: [ProfilePercentage] })
        .then((realm) => {
            let percentageObj = realm.objectForPrimaryKey('SpProfilePercentage', id);

            __DEV__ && console.log("percentageObj: ", percentageObj)
            realm.write(() => {
                if (percentageObj) {
                    percentageObj.percentage = percentage
                } else {
                    let newPercentage = realm.create('SpProfilePercentage', {
                        id,
                        percentage
                    })
                }
            });
            return percentageObj;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpProfilePercentage(id) {
    let realmPromise = Realm.open({ path: `SpProfilePercentage.realm`, schema: [ProfilePercentage] })
        .then((realm) => {
            let data = realm.objectForPrimaryKey('SpProfilePercentage', id);

            __DEV__ && console.log("getOfflineSpProfilePercentage is: ", data)
            return data ? data.percentage : {};
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpProfilePercentage(){
    Realm.open({path: `SpProfilePercentage.realm`, schema: [ProfilePercentage] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('SpProfilePercentage'),
                 deletedObj = realm.delete(obj); // Deletes all percentage
              });
        })
.catch((err) => {
            throw err;
        })
}