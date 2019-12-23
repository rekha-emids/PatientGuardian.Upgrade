const Realm = require('realm'),
 PersonalDetailCareTeam = {
    name: 'PersonalDetailCareTeam',
    properties: {personalDetailCareTeam: 'string'}
}

export function storePersonalDetailCareTeam(careTeamData) {
    Realm.open({ path: `PersonalDetailCareTeam.realm`, schema: [PersonalDetailCareTeam] })
        .then((realm) => {
            let careTeamObj = realm.objects('PersonalDetailCareTeam');

            realm.write(() => {
                if (careTeamObj[0]) {
                    careTeamObj[0].personalDetailCareTeam = JSON.stringify(careTeamData)
                } else {
                    let newCareTeamObj = realm.create('PersonalDetailCareTeam', {personalDetailCareTeam: JSON.stringify(careTeamData)})
                }
            });
        })

}

export function getOfflinePersonalDetailCareTeam() {
    let realmPromise = Realm.open({ path: `PersonalDetailCareTeam.realm`, schema: [PersonalDetailCareTeam] })
        .then((realm) => {
            let data = realm.objects('PersonalDetailCareTeam');

            return data[0].personalDetailCareTeam ? JSON.parse(data[0].personalDetailCareTeam) : [];
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearPersonalDeailCareTeam(){
    Realm.open({path: `PersonalDetailCareTeam.realm`, schema: [PersonalDetailCareTeam] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('PersonalDetailCareTeam'),
                 deletedObj = realm.delete(obj); // Deletes all books
              });
        })
}