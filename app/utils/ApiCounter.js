export var offlineApiCalls = {
    total: 0,
    success: 0,
    failure: 0 
   }


   export function incrementExecutionCount(){
    offlineApiCalls.total += 1;
    __DEV__ && console.log("OfflineApi calls total: ", offlineApiCalls.total, " success: ", offlineApiCalls.success, " failure: ", offlineApiCalls.failure)
   }

   export function incrementSuccessCount(){
    offlineApiCalls.success += 1;
    __DEV__ && console.log("OfflineApi calls total: ", offlineApiCalls.total, " success: ", offlineApiCalls.success, " failure: ", offlineApiCalls.failure)
   }

   export function incrementFailureCount(){
    offlineApiCalls.failure += 1;
    __DEV__ && console.log("OfflineApi calls total: ", offlineApiCalls.total, " success: ", offlineApiCalls.success, " failure: ", offlineApiCalls.failure)
   }

   export function resetCounter(){
    offlineApiCalls.total = 0;
    offlineApiCalls.success = 0;
    offlineApiCalls.failure = 0;
   }