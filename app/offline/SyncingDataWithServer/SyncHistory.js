// import { hashData } from '../utils/saltCredential';
import { key } from '../../constants/config';


const Realm = require('realm'),
 SyncHistory = {
    name: 'SyncHistory',
    primaryKey: 'date',
    properties: {
        date: 'string',
        status: 'int?'
    }
}

export function storeSyncHistory (syncObj){
    return Realm.open({ path: `SP_SyncHistory.realm`, schema: [SyncHistory], encryptionKey: key })
        .then((realm) => {
            let {date} = syncObj,
             {status} = syncObj,
             retrievedSyncObj = realm.objectForPrimaryKey('SyncHistory', date);

            realm.write(() => {
                if (!retrievedSyncObj){
                    let newSyncObj = realm.create('SyncHistory', {
                        date,
                        status
                    })
                } else {
                    retrievedSyncObj.status = status;
                }
            })
            return 1;

        })
.catch((err) => {
            throw err;
        })
}

export function getSyncData(date){
    Realm.open({ path: `SP_SyncHistory.realm`, schema: [SyncHistory], encryptionKey: key })
        .then((realm) => {
            let retrievedSyncObj = realm.objectForPrimaryKey('SyncHistory', date);

            return retrievedSyncObj.status;
        })
}

export function createRecordIfNotExist(date){
    return Realm.open({ path: `SP_SyncHistory.realm`, schema: [SyncHistory], encryptionKey: key })
        .then((realm) => {
            let retrievedSyncObj = realm.objectForPrimaryKey('SyncHistory', date);

            if (!retrievedSyncObj){
                createNewRecord(date).then((res) => res)
.catch((err) => {
                    throw err;
                })
            } else {
                return retrievedSyncObj;
            }
        })
.catch((err) => {
            throw err;
        })
}

function createNewRecord(date){
    let syncHistoryObj = {
        date,
        status: 1
    }

    return storeSyncHistory(syncHistoryObj).then((res) => res)
.catch((err) => {
        throw err;
    })
}