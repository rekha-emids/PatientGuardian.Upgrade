import { PERSONAL_DETAIL_IDENTIFIER, TABLE_NAME } from '../../../constants/constants';

const Realm = require('realm');
const personalDetail = {
    name: PERSONAL_DETAIL_IDENTIFIER,
    primaryKey: 'id',
    properties: {
        personalDetail: 'string',
        id: 'int'

    }
}

export function storePersonalDetailData(personalDetailData, id) {
    return Realm.open({ path: TABLE_NAME.PERSONAL_DETAIL_TABLE, schema: [personalDetail] })
        .then((realm) => {
            const personalDetailObj = realm.objectForPrimaryKey(PERSONAL_DETAIL_IDENTIFIER, id);

            realm.write(() => {
                if (personalDetailObj) {
                    personalDetailObj.personalDetail = JSON.stringify(personalDetailData)
                } else {
                    realm.create(PERSONAL_DETAIL_IDENTIFIER, {
                        personalDetail: JSON.stringify(personalDetailData),
                        id
                    })
                }
            });
            return personalDetailObj;
        })
.catch((err) => {
            throw err;
        })
}

export function getOfflinePersonalDetails(id) {
    return Realm.open({ path: TABLE_NAME.PERSONAL_DETAIL_TABLE, schema: [personalDetail] })
        .then((realm) => {
            const data = realm.objectForPrimaryKey(PERSONAL_DETAIL_IDENTIFIER, id);

            return data ? JSON.parse(data.personalDetail) : null;
        })
        .catch((err) => {
            throw err;
        })
}

export function clearOfflinePersonalDetails(){
    Realm.open({path: TABLE_NAME.PERSONAL_DETAIL_TABLE,  schema: [personalDetail] })
        .then((realm) => {
            realm.write(() => {
                const obj = realm.objects(PERSONAL_DETAIL_IDENTIFIER);

                realm.delete(obj); // Deletes all PersonalDetail
              });
        })
.catch((err) => {
 throw err; 
})
}