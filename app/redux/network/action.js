import {UPDATE_CONNECTIVITY} from "../../constants/constants"
export function checkNetworkConnectivity(isConnected) {
    return (dispatch) => {
         dispatch(dispatchNetworkObj(isConnected));
    }
}

function dispatchNetworkObj(isConnected){
    return {
            type: UPDATE_CONNECTIVITY,
            isConnected
    }
}