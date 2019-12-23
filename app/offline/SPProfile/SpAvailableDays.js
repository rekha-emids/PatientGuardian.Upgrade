

  const Realm = require('realm'),
 spAvailableDays = {
    name: 'spAvailableDays',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        spAvailableDaysArr: 'SpAvailableDaysArr[]'

    }
},

 spAvailableDaysArr = {
    name: 'SpAvailableDaysArr',
    properties: {
        serviceProviderId: 'int?',
        days: 'Days[]'

    }
},

 Days = {
    name: 'Days',
    properties: {
        dayId: 'int?',
        dayName: 'string?',
        slots: 'Slots[]'
    }
},
 Slots = {
    name: 'Slots',
    properties: {
        availabilityId: 'int?',
        slotId: 'int?',
        slotName: 'string?',
        isActive: 'bool?'
    }
}

export function storeSpAvailableDays(spId, availableDaysObj) {
    return Realm.open({
 path: `spAvailableDays.realm`, schema: [
spAvailableDays,
Days,
Slots,
spAvailableDaysArr
] 
})
        .then((realm) => {
            let dbAvailableDays = realm.objectForPrimaryKey('spAvailableDays', spId);

            __DEV__ && console.log("storeSpAvailableDays: ", dbAvailableDays)
            realm.write(() => {
                if (dbAvailableDays) {
                    dbAvailableDays.spAvailableDaysArr = availableDaysObj
                } else {
                    let newDbAvailableDays = realm.create('spAvailableDays', {
                        serviceProviderId: spId,
                        spAvailableDaysArr: availableDaysObj
                    })

                    __DEV__ && console.log("newDbAvailableDays: ", newDbAvailableDays);
                }
            });
            return dbAvailableDays;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpAvailableDays(id) {
    __DEV__ && console.log("getOfflineSpAvailableDays id: ", id)
    let realmPromise = Realm.open({
 path: `spAvailableDays.realm`, schema: [
spAvailableDays,
Days,
Slots,
spAvailableDaysArr
] 
})
        .then((realm) => {
            let data = realm.objectForPrimaryKey('spAvailableDays', id);

            __DEV__ && console.log("getOfflineSpAvailableDays is: ", data)
            return data ? data.spAvailableDaysArr : [];
        })
        .catch((err) => {
            __DEV__ && console.log("Err is: ", err)
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpAvailableDays(){
    Realm.open({
path: `spAvailableDays.realm`, schema: [
spAvailableDays,
Days,
Slots,
spAvailableDaysArr
] 
})
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('spAvailableDays'),
                 deletedObj = realm.delete(obj); // Deletes all spAvailableDays
              });
        })
.catch((err) => {
            throw err;
        })
}