import { SELECTED_CLINICAL_CONDITION, TABLE_NAME } from '../../../constants/constants';

const Realm = require('realm');
const selectedClinicalCondition = {
    name: SELECTED_CLINICAL_CONDITION,
    primaryKey: 'id',
    properties: {
        selectedClinicalCondition: 'string',
        id: 'int'

    }
}

export function storeSelectedClinicalCondition(selectedClinicalConditionData, id) {
    return Realm.open({ path: TABLE_NAME.SELECTED_CLINICAL_CONDITION_TABLE, schema: [selectedClinicalCondition] })
        .then((realm) => {
            const selectedClinicalConditionObj = realm.objectForPrimaryKey(SELECTED_CLINICAL_CONDITION, id);

            realm.write(() => {
                if (selectedClinicalConditionObj) {
                    selectedClinicalConditionObj.selectedClinicalCondition = JSON.stringify(selectedClinicalConditionData)
                } else {
                    realm.create(SELECTED_CLINICAL_CONDITION, {
                        selectedClinicalCondition: JSON.stringify(selectedClinicalConditionData),
                        id
                    })
                }
            });
            return selectedClinicalConditionObj;
        })
.catch((err) => {
            throw err;
        })
}
export function getOfflineSelectedClinicalCondition(id) {
    return Realm.open({ path: TABLE_NAME.SELECTED_CLINICAL_CONDITION_TABLE, schema: [selectedClinicalCondition] })
        .then((realm) => {
            const data = realm.objectForPrimaryKey(SELECTED_CLINICAL_CONDITION, id);

            return data ? JSON.parse(data.selectedClinicalCondition) : null;
        })
        .catch((err) => {
            throw err;
        })
}

export function clearOfflineSelectedClinicalCondition(){
    Realm.open({path: TABLE_NAME.SELECTED_CLINICAL_CONDITION_TABLE,  schema: [selectedClinicalCondition] })
        .then((realm) => {
            realm.write(() => {
                const obj = realm.objects(SELECTED_CLINICAL_CONDITION);

                realm.delete(obj); 
              });
        })
.catch((err) => {
 throw err; 
})
}