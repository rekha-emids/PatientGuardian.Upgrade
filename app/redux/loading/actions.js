export const Loading = {
    loadingStart: 'loading_start/loading',
    loadingEnd: 'loading_end/loading'
};

export const startLoading = () => ({type: Loading.loadingStart})

export const endLoading = () => ({type: Loading.loadingEnd})
