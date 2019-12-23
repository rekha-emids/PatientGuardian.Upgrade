export const syncToServer = {
    setSync: 'setSync',
    syncServerModal: 'syncServerModal',
    syncComplete: 'syncComplete',
    syncServerSuccess: 'syncServerSuccess'
};

export const setSyncToServer = (data) => ({
        type: syncToServer.setSync,
        data
    });

export const showSyncServerModal = (data) => ({
        type: syncToServer.syncServerModal,
        data
    })

export const syncToServerComplete = (data) => ({
        type: syncToServer.syncComplete,
        data
    })

export const syncToServerSuccess = (data) => ({
        type: syncToServer.syncServerSuccess,
        data
    })