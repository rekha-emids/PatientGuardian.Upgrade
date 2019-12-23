const Realm = require('realm'),
 ServiceRequestDetail = {
    name: 'ServiceRequestDetail',
    properties: {serviceReqDetail: 'string'}
}

export function storeServiceReqDetailData(serviceRequestDetail) {
    Realm.open({ path: `ServiceRequestDetail.realm`, schema: [ServiceRequestDetail] })
        .then((realm) => {
            let serviceReqDetailObj = realm.objects('ServiceRequestDetail');

            realm.write(() => {
                if (serviceReqDetailObj[0]) {
                    serviceReqDetailObj[0].serviceReqDetail = JSON.stringify(serviceRequestDetail)
                } else {
                    let newServiceReqDetailObj = realm.create('ServiceRequestDetail', {serviceReqDetail: JSON.stringify(serviceRequestDetail)})
                }
            });
        })
}

export function getOfflineServiceReqDetail() {
    let realmPromise = Realm.open({ path: `ServiceRequestDetail.realm`, schema: [ServiceRequestDetail] })
        .then((realm) => {
            let data = realm.objects('ServiceRequestDetail');

            return JSON.parse(data[0].serviceReqDetail);
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function getOfflineServiceReqDetailByStatusId(statusId) {
    let realmPromise = Realm.open({ path: `ServiceRequestDetail.realm`, schema: [ServiceRequestDetail] })
        .then((realm) => {
            let data = realm.objects('ServiceRequestDetail'),
             patientServiceReqArr = JSON.parse(data[0].serviceReqDetail),
             filteredPatientServiceReqArr = [];

                patientServiceReqArr.map((patientServiceReqObj) => {
                    if (patientServiceReqObj.statusId === statusId || statusId === 0){
                        filteredPatientServiceReqArr.push(patientServiceReqObj)
                    }
                })
                return filteredPatientServiceReqArr;
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}


export function clearOfflineServiceReqDetail(){
    Realm.open({path: `ServiceRequestDetail.realm`, schema: [ServiceRequestDetail] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('ServiceRequestDetail'),
                 deletedObj = realm.delete(obj); // Deletes all books
              });
        })
.catch((err) => {
throw err; 
})
}