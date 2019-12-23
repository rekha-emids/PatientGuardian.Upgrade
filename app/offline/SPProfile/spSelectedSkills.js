

const Realm = require('realm'),
 spSelectedSkills = {
    name: 'spSelectedSkills',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        skills: 'Skills[]'

    }
},

 Skills = {
    name: 'Skills',
    properties: {
        id: 'int?',
        name: 'string?'

    }
}

export function storeSpSelectedSkills(skillsObj) {
    __DEV__ && console.log("skillsObj is: ", skillsObj)
    return Realm.open({
 path: `spSelectedSkills.realm`, schema: [
spSelectedSkills,
Skills
] 
})
        .then((realm) => {
            let dbSelectedSkills = realm.objectForPrimaryKey('spSelectedSkills', skillsObj.serviceProviderId);

            __DEV__ && console.log("storeSpSelectedSkills: ", dbSelectedSkills)
            realm.write(() => {
                if (dbSelectedSkills) {
                    dbSelectedSkills.skills = skillsObj.skills
                } else {
                    let newDbSelectedSkills = realm.create('spSelectedSkills', {
                        serviceProviderId: skillsObj.serviceProviderId,
                        skills: skillsObj.skills
                    })

                    __DEV__ && console.log("newDbSelectedSkills: ", newDbSelectedSkills);
                }
            });
            return dbSelectedSkills;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpSelectedSkills(id) {
    __DEV__ && console.log("getOfflineSpSelectedSkills: ", id)
    let realmPromise = Realm.open({
 path: `spSelectedSkills.realm`, schema: [
spSelectedSkills,
Skills
] 
})
        .then((realm) => {
            let data = realm.objectForPrimaryKey('spSelectedSkills', id);

            __DEV__ && console.log("getOfflineSpSelectedSkills is: ", data)
            return data ? data : {};
        })
        .catch((err) => {
            __DEV__ && console.log("Err is: ", err)
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpSelectedSkills(){
    Realm.open({
path: `spSelectedSkills.realm`, schema: [
spSelectedSkills,
Skills
] 
})
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('spSelectedSkills'),
                 deletedObj = realm.delete(obj); // Deletes all spSelectedSkills
              });
        })
.catch((err) => {
            throw err;
        })
}