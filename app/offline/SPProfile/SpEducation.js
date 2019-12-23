
 

const Realm = require('realm'),
 spEducation = {
    name: 'spEducation',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        educationArr: 'EducationArr[]'

    }
},

 EducationArr = {
    name: 'EducationArr',
    properties: {
        educationId: 'int?',
        serviceProviderId: 'int?',
        school: 'string?',
        degree: 'string?',
        fieldOfStudy: 'string?',
        startYear: 'string?',
        endYear: 'string?',
        isActive: 'bool?',
        rowversionId: 'string?',
        educationExternalId: 'int?'

    }
}

export function storeSpEducation(spId, educationObj) {
    __DEV__ && console.log("storeSpEducation is: ", educationObj)
    return Realm.open({
 path: `spEducation.realm`, schema: [
spEducation,
EducationArr
] 
})
        .then((realm) => {
            let dbCert = realm.objectForPrimaryKey('spEducation', spId);

            __DEV__ && console.log("storeSpEducation: ", dbCert)
            realm.write(() => {
                if (dbCert) {
                    dbCert.educationArr = educationObj
                } else {
                    let newDbEducation = realm.create('spEducation', {
                        serviceProviderId: spId,
                        educationArr: educationObj
                    })

                    __DEV__ && console.log("newDbEducation: ", newDbEducation);
                }
            });
            return dbCert;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpEducation(id) {
    __DEV__ && console.log("getOfflineSpEducation: ", id)
    let realmPromise = Realm.open({
 path: `spEducation.realm`, schema: [
spEducation,
EducationArr
] 
})
        .then((realm) => {
            let data = realm.objectForPrimaryKey('spEducation', id);

            __DEV__ && console.log("getOfflineSpEducation is: ", data)
            return data ? data.educationArr : [];
        })
        .catch((err) => {
            __DEV__ && console.log("Err is: ", err)
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpEducation(){
    Realm.open({
path: `spEducation.realm`, schema: [
spEducation,
EducationArr
] 
})
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('spEducation'),
                 deletedObj = realm.delete(obj); // Deletes all spEducation
              });
        })
.catch((err) => {
            throw err;
        })
}