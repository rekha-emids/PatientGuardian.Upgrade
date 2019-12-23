import { SELECTED_LANGUAGES, TABLE_NAME } from '../../../constants/constants';

const Realm = require('realm');
const selectedLanguages = {
    name: SELECTED_LANGUAGES,
    primaryKey: 'id',
    properties: {
        selectedLanguages: 'string',
        id: 'int'

    }
}

export function storeSelectedLanguages(selectedLanguagesData, id) {
    return Realm.open({ path: TABLE_NAME.SELECTED_LANGUAGES_TABLE, schema: [selectedLanguages] })
        .then((realm) => {
            if (id) {
                const selectedLanguagesObj = realm.objectForPrimaryKey(SELECTED_LANGUAGES, id);

                realm.write(() => {
                    if (selectedLanguagesObj) {
                        selectedLanguagesObj.selectedLanguages = JSON.stringify(selectedLanguagesData)
                    } else {
                        realm.create(SELECTED_LANGUAGES, {
                            selectedLanguages: JSON.stringify(selectedLanguagesData),
                            id
                        })
                    }
                });
                return selectedLanguagesObj;
            }

        }).catch((err) => {
            throw err;
        })
}
export function getOfflineSelectedLanguages(id) {
    return Realm.open({ path: TABLE_NAME.SELECTED_LANGUAGES_TABLE, schema: [selectedLanguages] })
        .then((realm) => {
            const data = realm.objectForPrimaryKey(SELECTED_LANGUAGES, id);

            return data ? JSON.parse(data.selectedLanguages) : null;
        })
        .catch((err) => {
            throw err;
        })
}

export function clearOfflineSelectedLanguages(){
    Realm.open({path: TABLE_NAME.SELECTED_LANGUAGES_TABLE,  schema: [selectedLanguages] })
        .then((realm) => {
            realm.write(() => {
                const obj = realm.objects(SELECTED_LANGUAGES);

                realm.delete(obj); 
              });
        })
.catch((err) => {
            throw err;
        })
}