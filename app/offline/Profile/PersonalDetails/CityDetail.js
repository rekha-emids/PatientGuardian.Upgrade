const Realm = require('realm'),
 CityDetail = {
    name: 'CityDetail',
    properties: {cityDetail: 'string'}
}

export function storeCityDetailData(cityDetailData) {
    return Realm.open({ path: `CityDetail.realm`, schema: [CityDetail] })
        .then((realm) => {
            let cityDetailObj = realm.objects('CityDetail');

            realm.write(() => {
                if (cityDetailObj[0]) {
                    cityDetailObj[0].cityDetail = JSON.stringify(cityDetailData)
                } else {
                    let newCityDetailObj = realm.create('CityDetail', {cityDetail: JSON.stringify(cityDetailData)})
                }
            });
            return cityDetailObj;
        })
.catch((err) => {
            throw err;
        })
}
export function getOfflineCityDetails() {
    let realmPromise = Realm.open({ path: `CityDetail.realm`, schema: [CityDetail] })
        .then((realm) => {
            let data = realm.objects('CityDetail');

            return JSON.parse(data[0].cityDetail);
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflineCityDetails(){
    Realm.open({path: `CityDetail.realm`, schema: [CityDetail] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('CityDetail'),
                 deletedObj = realm.delete(obj); // Deletes all books
              });
        })
.catch((err) => {
 throw err; 
})
}