const Realm = require('realm'),
 GenderDetail = {
    name: 'GenderDetail',
    properties: {genderDetail: 'string'}
}

export function storeGenderDetailData(genderDetailData) {
    return Realm.open({ path: `GenderDetail.realm`, schema: [GenderDetail] })
        .then((realm) => {
            let genderDetailObj = realm.objects('GenderDetail');

            realm.write(() => {
                if (genderDetailObj[0]) {
                    genderDetailObj[0].genderDetail = JSON.stringify(genderDetailData)
                } else {
                    let newGenderDetailObj = realm.create('GenderDetail', {genderDetail: JSON.stringify(genderDetailData)})
                }
            });
            return genderDetailObj;
        })
.catch((err) => {
            throw err;
        })
}
export function getOfflineGenderDetails() {
    let realmPromise = Realm.open({ path: `GenderDetail.realm`, schema: [GenderDetail] })
        .then((realm) => {
            let data = realm.objects('GenderDetail');

            return JSON.parse(data[0].genderDetail);
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflineGenderDetails(){
    Realm.open({path: `GenderDetail.realm`, schema: [GenderDetail] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('GenderDetail'),
                 deletedObj = realm.delete(obj); // Deletes all books
              });
        })
.catch((err) => {
 throw err; 
})
}