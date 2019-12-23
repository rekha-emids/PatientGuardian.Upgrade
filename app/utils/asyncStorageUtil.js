import { AsyncStorage } from 'react-native';

export function save(id, data) {
    AsyncStorage.setItem(id, JSON.stringify(data));
}

export function remove(id, cb) {
    return (dispatch) => {
    AsyncStorage.removeItem(id).then((data) => {
            dispatch(cb({
                error: 0,
                message: "data removed"
            }))
        })
.catch(() => {
            dispatch(cb({
                error: 1,
                message: 'data not removed'
            }))
        })
    }
}

export function load(id, cb) {
    return (dispatch) => {
        let payLoad = { id }

        AsyncStorage.getItem(id).then((resp) => {
            if (resp && cb) {
                payLoad.data = JSON.parse(resp)
                dispatch(cb(payLoad.data));
            } else {
                dispatch(cb({
                    error: 1,
                    message: 'No data found'
                }))
            }
        })
.catch(() => {
            dispatch(cb({
                error: 1,
                message: 'No  data found'
            }));
        });
       // dispatch(cb(null))
    }
}

