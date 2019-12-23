import { MANAGE_CONNECTION_TABLE_IDENTIFIER, TABLE_NAME } from '../../../constants/constants';

const Realm = require('realm');
const manageConnection = {
    name: MANAGE_CONNECTION_TABLE_IDENTIFIER,
    primaryKey: 'id',
    properties: {
        manageConnection: 'string',
        id: 'int'

    }
}

export function storeManageConnection(manageConnectionData, id) {
    return Realm.open({ path: TABLE_NAME.MANAGE_CONNECTION_TABLE, schema: [manageConnection] })
        .then((realm) => {
            const manageConnectionObj = realm.objectForPrimaryKey(MANAGE_CONNECTION_TABLE_IDENTIFIER, id);

            realm.write(() => {
                if (manageConnectionObj) {
                    manageConnectionObj.manageConnection = JSON.stringify(manageConnectionData)
                } else {
                    realm.create(MANAGE_CONNECTION_TABLE_IDENTIFIER, {
                        manageConnection: JSON.stringify(manageConnectionData),
                        id
                    })
                }
            });
            return manageConnectionObj;
        })
.catch((err) => {
            throw err;
        })
}
export function getOfflineMangeConnection(id) {
    return Realm.open({ path: TABLE_NAME.MANAGE_CONNECTION_TABLE, schema: [manageConnection] })
        .then((realm) => {
            const data = realm.objectForPrimaryKey(MANAGE_CONNECTION_TABLE_IDENTIFIER, id);

            return data ? JSON.parse(data.manageConnection) : null;
        })
        .catch((err) => {
            throw err;
        })
}

export function clearOfflineManageConnection(){
    Realm.open({path: TABLE_NAME.MANAGE_CONNECTION_TABLE,  schema: [manageConnection] })
        .then((realm) => {
            realm.write(() => {
                const obj = realm.objects(MANAGE_CONNECTION_TABLE_IDENTIFIER);

                realm.delete(obj); // Deletes all books
              });
        })
}