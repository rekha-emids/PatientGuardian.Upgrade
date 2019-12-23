

const Realm = require('realm'),
 spCertifications = {
    name: 'spCertifications',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        certifications: 'Certifications[]'

    }
},

 Certifications = {
    name: 'Certifications',
    properties: {
        certificationId: 'int?',
        serviceProviderId: 'int?',
        certificationName: 'string?',
        authority: 'string?',
        licenceNumber: 'string?',
        isActive: 'bool?',
        rowversionId: 'string?',
        certificationExternalId: 'int?'

    }
}

export function storeSpCertification(spId, certificationsObj) {
    __DEV__ && console.log("storeSpCertification is: ", certificationsObj)
    return Realm.open({
 path: `spCertifications.realm`, schema: [
spCertifications,
Certifications
] 
})
        .then((realm) => {
            let dbCert = realm.objectForPrimaryKey('spCertifications', spId);

            __DEV__ && console.log("storeSpCertification: ", dbCert)
            realm.write(() => {
                if (dbCert) {
                    dbCert.certifications = certificationsObj
                } else {
                    let newDbCertifications = realm.create('spCertifications', {
                        serviceProviderId: spId,
                        certifications: certificationsObj
                    })

                    __DEV__ && console.log("newDbCertifications: ", newDbCertifications);
                }
            });
            return dbCert;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpCertifications(id) {
    __DEV__ && console.log("getOfflineSpCertifications: ", id)
    let realmPromise = Realm.open({
 path: `spCertifications.realm`, schema: [
spCertifications,
Certifications
] 
})
        .then((realm) => {
            let data = realm.objectForPrimaryKey('spCertifications', id);

            __DEV__ && console.log("getOfflineSpCertifications is: ", data)
            return data ? data.certifications : [];
        })
        .catch((err) => {
            __DEV__ && console.log("Err is: ", err)
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpCertifications(){
    Realm.open({
path: `spCertifications.realm`, schema: [
spCertifications,
Certifications
] 
})
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('spCertifications'),
                 deletedObj = realm.delete(obj); // Deletes all spCertifications
              });
        })
.catch((err) => {
            throw err;
        })
}