const Realm = require('realm'),
 PatientImage = {
    name: 'PatientImage',
    properties: {patientImage: 'string'}
}

export function storePatientImageData(patientImageData) {
    Realm.open({ path: `PatientImage.realm`, schema: [PatientImage] })
        .then((realm) => {
            let patientImageObj = realm.objects('PatientImage');

            realm.write(() => {
                if (patientImageObj[0]) {
                    patientImageObj[0].patientImage = JSON.stringify(patientImageData)
                } else {
                    let newPatientImageObj = realm.create('PatientImage', {patientImage: JSON.stringify(patientImageData)})
                }
            });
        })

}

export function getOfflinePatientImageData() {
    let realmPromise = Realm.open({ path: `PatientImage.realm`, schema: [PatientImage] })
        .then((realm) => {
            let data = realm.objects('PatientImage');

            return JSON.parse(data[0].patientImage);
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflinePatientImageData(){
    return Realm.open({path: `PatientImage.realm`, schema: [PatientImage] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('PatientImage'),
                 deletedObj = realm.delete(obj); // Deletes all books
              });
        })
.catch((err) => {
 throw err 
})
}