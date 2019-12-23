import { POINT_SERVICE_IDENTIFIER, TABLE_NAME } from '../../../constants/constants';

const Realm = require('realm');
const pointService = {
    name: POINT_SERVICE_IDENTIFIER,
    primaryKey: 'id',
    properties: {
        pointService: 'string',
        id: 'int'

    }
}

export function storePointService(pointServiceData, id) {
    return Realm.open({ path: TABLE_NAME.POINT_SERVICE_TABLE, schema: [pointService] })
        .then((realm) => {
            const pointServiceObj = realm.objectForPrimaryKey(POINT_SERVICE_IDENTIFIER, id);

            realm.write(() => {
                if (pointServiceObj) {
                    pointServiceObj.pointService = JSON.stringify(pointServiceData)
                } else {
                    realm.create(POINT_SERVICE_IDENTIFIER, {
                        pointService: JSON.stringify(pointServiceData),
                        id
                    })
                }
            });
            return pointServiceObj;
        })
.catch((err) => {
            throw err;
        })
}
export function getOfflinePointService(id) {
    return Realm.open({ path: TABLE_NAME.POINT_SERVICE_TABLE, schema: [pointService] })
        .then((realm) => {
            const data = realm.objectForPrimaryKey(POINT_SERVICE_IDENTIFIER, id);

            return data ? JSON.parse(data.pointService) : null;
        })
        .catch((err) => {
            throw err;
        })
}

export function clearOfflinePointService(){
    Realm.open({path: TABLE_NAME.POINT_SERVICE_TABLE,  schema: [pointService] })
        .then((realm) => {
            realm.write(() => {
                const obj = realm.objects(POINT_SERVICE_IDENTIFIER);

                realm.delete(obj); // Deletes all books
              });
        })
.catch((err) => {
            throw err;
        })
}