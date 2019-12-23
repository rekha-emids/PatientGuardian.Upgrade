import { API, aboutUs } from '../../../services/api';
import { Get } from '../../../services/http';
import { endLoading } from '../../loading/actions';
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';

export const aboutUsReducer = {
    getAboutUsSuccess: "get_about_us/aboutUs",
    changeLoadingStatus: "changeLoadingStauts/aboutUs"
};

export const changeLoadingStatus = (data) => ({
        type: aboutUsReducer.changeLoadingStatus,
        data
    })

export const getAboutUsSuccss = (data) => ({
        type: aboutUsReducer.getAboutUsSuccess,
        data
    })

export function getAboutUs() {
    return (dispatch) => {
        dispatch(changeLoadingStatus(API_FETCHING));
        Get(API.getAboutUs, aboutUs).then((resp) => {
            dispatch(getBuildVersion(resp.data[0].value))
            dispatch(changeLoadingStatus(API_SUCCESS))
        })
.catch((err) => {
            dispatch(changeLoadingStatus(API_FAILED))
        })
    }
}

export function getBuildVersion(aboutUsContent) { 
    return (dispatch) => {
        Get(API.getBuildVersion, aboutUs)          
          .then((resp) => {
            dispatch(getAboutUsSuccss({aboutUsContent, buildVersion: resp.data[0].value}))
            dispatch(endLoading());
          })
          .catch((err) => {
            dispatch(endLoading());
          })
      }
}