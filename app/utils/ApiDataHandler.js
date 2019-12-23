export const getServiceTasks = (serviceTypes) => serviceTypes.map((type) => ({
                serviceRequestTypeTaskVisitId: type.planVisitTypeDetailsId,
                serviceTypeDescription: type.serviceTypeDescription,
                serviceRequestTypeDetailsId: type.planServiceTypeDetailsId,
                isActive: true,
                serviceRequestTypeTaskVisits: type.serviceTask.map((task, index) => ({
                        serviceRequestTypeTaskDetailsId: task.planVistTypeTaskDetailsId,
                        serviceRequestTypeDetailsId: type.planVisitTypeDetailsId,
                        serviceTaskDescription: task.serviceTaskDescription,
                        serviceTypeId: type.serviceTypeId,
                        isActive: true,
                        statusId: task.taskStatusId
                    })) 
            }))


export function performTasksForEsp(data){
    return {
        ...data,
        serviceRequestVisitId: data.servicePlanVisitId,
        serviceRequestTypeVisits: getServiceTasks(data.serviceTypes)         
    }
}

export function  serializedEspSummaryDeatils (data){
    return performTasksForEsp(data)
}
