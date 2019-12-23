const Realm = require('realm'),
 spBlockOutDays = {
    name: 'spBlockOutDays',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        blockOutDates: 'string?'

    }
}

export function storeSpBlockOutDays(spId, BlockOutDaysObj) {
    return Realm.open({ path: `spBlockOutDays.realm`, schema: [spBlockOutDays] })
        .then((realm) => {
            let dbBlockoutDaysObj = realm.objectForPrimaryKey('spBlockOutDays', spId);

            __DEV__ && console.log("storeSpBlockOutDays: ", dbBlockoutDaysObj)
            realm.write(() => {
                if (dbBlockoutDaysObj) {
                    dbBlockoutDaysObj.blockOutDates = JSON.stringify(BlockOutDaysObj.blockOutDates)
                } else {
                    let newBlockOutDaysObj = realm.create('spBlockOutDays', {
                        serviceProviderId: BlockOutDaysObj.serviceProviderId,
                        blockOutDates: JSON.stringify(BlockOutDaysObj.blockOutDates)
                    })

                    __DEV__ && console.log("newBlockOutDaysObj: ", newBlockOutDaysObj);
                }
            });
            return dbBlockoutDaysObj;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpBlockoutDays(id) {
    __DEV__ && console.log("getOfflineSpBlockoutDays: ", id)
    let realmPromise = Realm.open({ path: `spBlockOutDays.realm`, schema: [spBlockOutDays] })
        .then((realm) => {
            let data = realm.objectForPrimaryKey('spBlockOutDays', id),
             blockOutDays = { ...data}

            __DEV__ && console.log("getOfflineSpBlockoutDays is: ", data)
            if (data){
                blockOutDays.blockOutDates = JSON.parse(blockOutDays.blockOutDates)
                __DEV__ && console.log("data in offline BOD: ", blockOutDays)
                return blockOutDays;
            }
            return {};
        })
        .catch((err) => {
            __DEV__ && console.log("Err is: ", err)
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpBlockoutDays(){
    Realm.open({path: `spBlockOutDays.realm`, schema: [spBlockOutDays] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('spBlockOutDays'),
                 deletedObj = realm.delete(obj); // Deletes all spBlockOutDays
              });
        })
.catch((err) => {
            throw err;
        })
}