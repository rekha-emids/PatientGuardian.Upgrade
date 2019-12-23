import { isPlanVisit, getServiceVisitId, getServiceRequestId } from '../../utils/appUtils';

const Realm = require('realm'),

 Schedule = {
    name: "Schedule",
    properties: {
        scheduleArr: "string?[]",
        serviceReqId: "int?"
    }
},
 VisitServiceSchedule = {
    name: 'VisitServiceSchedule',
    primaryKey: 'serviceRequestVisitId',
    properties: {
        // visitServiceSchedule: 'Schedule[]'



        billedPerService: 'int?',
        billedTotalDuration: 'string?',
        billedTotalDurationTimeSpan: 'string?',
        createDate: 'string?',
        entityServiceProviderFirstName: 'string?',
        entityServiceProviderId: 'int?',
        entityServiceProviderImage: 'string?',
        entityServiceProviderImageByte: 'string?',
        entityServiceProviderLastName: 'string?',
        estimatedClaim: 'int?',
        hourlyRate: 'int?',
        isActive: 'bool?',
        modifiedDate: 'string?',
        originalTotalDuration: 'string?',
        outOfPocketAmount: 'int?',
        patient: 'string?',
        phoneNumber: 'string?',
        serviceCategoryDescription: 'string?',
        serviceProvider: 'string?',
        serviceProviderFirstName: 'string?',
        serviceProviderId: 'int?',
        serviceProviderImage: "string?",
        serviceProviderImageByte: 'string?',
        serviceProviderLastName: 'string?',
        serviceRequestId: 'int?',
        serviceRequestTypeVisits: 'string?',
        serviceRequestVisitId: 'int?',
        signature: 'string?',
        signatureArray: 'string?',
        slot: 'string?',
        slotDescription: 'string?',
        slotId: 'int?',
        taxAmount: 'int?',
        taxPaid: 'int?',
        totalCost: 'int?',
        totalTask: 'int?',
        totalTaskCompleted: 'int?',
        visitDate: 'string?',
        visitEndTime: 'string?',
        visitStartTime: 'string?',
        visitStatusId: 'int?',
        visitStatusName: 'string?',
        planScheduleId: "int?",
        servicePlanVisitId: "int?",
        visitTypeId: "int?",
        isPlanVisit: "bool?",
        isPaymentModeEnabled: "bool?",
        serviceTypes: 'ServiceType[]'
    }
}

const ServiceType = {
    name: "ServiceType",
    properties: {
        planServiceTypeDetailsId: "int?",
        planVisitTypeDetailsId: "int?",
        serviceTask: "string?",
        serviceTypeDescription: "string?",
        serviceTypeId: "int?"
    }
}

export function storeVisitServiceScheduleData(visitServiceScheduleData, serviceReqId) {
    let scheduleDb =  Realm.open({ path: `VisitServiceSchedule.realm`, schema: [VisitServiceSchedule, Schedule, ServiceType] })
        .then((realm) => {
            let visitServiceScheduleObj;
            
            visitServiceScheduleData.map((visitSchedule) => {
                let visitId = getServiceVisitId(visitSchedule);

                 visitServiceScheduleObj = realm.objectForPrimaryKey('VisitServiceSchedule', visitId);
                 realm.write(() => {
                    if (!visitServiceScheduleObj) {
                        let newVisitServiceScheduleObj = realm.create('VisitServiceSchedule', {
                            billedPerService: visitSchedule.billedPerService,
                            billedTotalDuration: visitSchedule.billedTotalDuration,
                            billedTotalDurationTimeSpan: visitSchedule.billedTotalDurationTimeSpan,
                            createDate: visitSchedule.createDate,
                            entityServiceProviderFirstName: visitSchedule.entityServiceProviderFirstName,
                            entityServiceProviderId: visitSchedule.entityServiceProviderId,
                            entityServiceProviderImage: visitSchedule.entityServiceProviderImage,
                            entityServiceProviderImageByte: visitSchedule.entityServiceProviderImageByte,
                            entityServiceProviderLastName: visitSchedule.entityServiceProviderLastName,
                            estimatedClaim: visitSchedule.estimatedClaim,
                            hourlyRate: visitSchedule.hourlyRate,
                            isActive: visitSchedule.isActive,
                            modifiedDate: visitSchedule.modifiedDate,
                            originalTotalDuration: visitSchedule.originalTotalDuration,
                            outOfPocketAmount: visitSchedule.outOfPocketAmount,
                            patient: visitSchedule.patient,
                            phoneNumber: visitSchedule.phoneNumber,
                            serviceCategoryDescription: visitSchedule.serviceCategoryDescription,
                            serviceProvider: visitSchedule.serviceProvider,
                            serviceProviderFirstName: visitSchedule.serviceProviderFirstName,
                            serviceProviderId: visitSchedule.serviceProviderId,
                            serviceProviderImage: visitSchedule.serviceProviderImage,
                            serviceProviderImageByte: visitSchedule.serviceProviderImageByte,
                            serviceProviderLastName: visitSchedule.serviceProviderLastName,
                            serviceRequestId: getServiceRequestId(visitSchedule),
                            serviceRequestTypeVisits: visitSchedule.serviceRequestTypeVisits,
                            serviceRequestVisitId: visitId,
                            signature: visitSchedule.signature,
                            signatureArray: visitSchedule.signatureArray,
                            slot: visitSchedule.slot,
                            slotDescription: visitSchedule.slotDescription,
                            slotId: visitSchedule.slotId,
                            taxAmount: visitSchedule.taxAmount,
                            taxPaid: visitSchedule.taxPaid,
                            totalCost: visitSchedule.totalCost,
                            totalTask: visitSchedule.totalTask,
                            totalTaskCompleted: visitSchedule.totalTaskCompleted,
                            visitDate: visitSchedule.visitDate,
                            visitEndTime: visitSchedule.visitEndTime,
                            visitStartTime: visitSchedule.visitStartTime,
                            visitStatusId: visitSchedule.visitStatusId,
                            visitStatusName: visitSchedule.visitStatusName,
                            planScheduleId: visitSchedule.planScheduleId,
                            servicePlanVisitId: visitSchedule.servicePlanVisitId,
                            visitTypeId: visitSchedule.visitTypeId,
                            isPlanVisit: isPlanVisit(visitSchedule),
                            serviceTypes: visitSchedule.serviceTypes ? visitSchedule.serviceTypes : []
                        })
                    }
                })
                return visitServiceScheduleObj;
            })
        }).catch((err) => {       
            throw err;
        })

    return scheduleDb;

}
export function getOfflineVisitServiceScheduleData(serviceReqId) {
    let realmPromise = Realm.open({ path: `VisitServiceSchedule.realm`, schema: [VisitServiceSchedule, Schedule, ServiceType] })
        .then((realm) => {
            let data = realm.objects('VisitServiceSchedule');
            const visitServiceScheduleObj = realm.objects('VisitServiceSchedule').filtered(`serviceRequestId == ${serviceReqId}`);

            return visitServiceScheduleObj;
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflineVisitServiceScheduleData() {
    Realm.open({ path: `VisitServiceSchedule.realm`, schema: [VisitServiceSchedule] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('VisitServiceSchedule'),
                 deletedObj = realm.delete(obj); // Deletes all books
            });
        })
.catch((err) => {
        })
}