const Realm = require('realm'),
 IndividualsData = {
    name: 'IndividualsData',
    properties: {individualsData: 'string'}
}

export function storeOfflineIndividualData(individualsData) {
    Realm.open({ path: `IndividualsData.realm`, schema: [IndividualsData] })
        .then((realm) => {
            let individualsObj = realm.objects('IndividualsData');

            realm.write(() => {
                if (individualsObj[0]) {
                    individualsObj[0].individualsData = JSON.stringify(individualsData)
                } else {
                    let newIndividualsObj = realm.create('IndividualsData', {individualsData: JSON.stringify(individualsData)})
                }
            });
        })

}

export function getOfflineIndividualData() {
    let realmPromise = Realm.open({ path: `IndividualsData.realm`, schema: [IndividualsData] })
        .then((realm) => {
            let data = realm.objects('IndividualsData');

            return data[0].individualsData ? JSON.parse(data[0].individualsData) : [];
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}