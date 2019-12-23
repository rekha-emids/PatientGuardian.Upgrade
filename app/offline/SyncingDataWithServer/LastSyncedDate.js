import { key } from '../../constants/config';
import { LAST_SYNCED_DATE, TABLE_NAME } from '../../constants/constants';

 const Realm = require('realm');
const lastSyncedDate = {
    name: LAST_SYNCED_DATE,
    properties: {dateTime: 'string'}
}


 export function storeLastSyncedDate (syncedDateTime){
    return Realm.open({ path: TABLE_NAME.LAST_SYNCED_DATE_TABLE, schema: [lastSyncedDate], encryptionKey: key })
        .then((realm) => {
            const retrievedSyncObj = realm.objects(LAST_SYNCED_DATE);

            realm.write(() => {
                if (!retrievedSyncObj[0]){
                    realm.create(LAST_SYNCED_DATE, {dateTime: syncedDateTime})
                } else {
                    __DEV__ && console.log("before update3: ", retrievedSyncObj[0])
                    retrievedSyncObj[0].dateTime = syncedDateTime;
                }
            })
            __DEV__ && console.log("retrievedSyncObj: ", retrievedSyncObj)
            return retrievedSyncObj

         }).catch((err) => {
            __DEV__ &&  console.log("err is: ", err)
            throw err;
        })
}

 export function getLastSyncedDateTime(){
    return Realm.open({ path: TABLE_NAME.LAST_SYNCED_DATE_TABLE, schema: [lastSyncedDate], encryptionKey: key })
        .then((realm) => {
            const retrievedLastSyncedDate = realm.objects(LAST_SYNCED_DATE);

            __DEV__ && console.log("retrievedLastSyncedDate: ", typeof retrievedLastSyncedDate, " ", retrievedLastSyncedDate[0])
            return retrievedLastSyncedDate[0] ? retrievedLastSyncedDate[0].dateTime : null;
        }).catch((err) => {
 __DEV__ && console.log("err retrievedLastSyncedDate is: ", err); throw err; 
})
}