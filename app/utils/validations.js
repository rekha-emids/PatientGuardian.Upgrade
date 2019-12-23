
import _validations from 'lodash'
export const _ = _validations

const REQUIRED = 'Please enter valid ',
 SELECT_REQUIRED = 'Please select the  ',
 VAILD = 'Please enter valid  '

import moment from 'moment';

import { DATE_FORMAT, DATE_YEAR } from '../constants/constants';
export const required = (value) => value ? undefined : REQUIRED

export const checkNotStartWithNumber = (value) => value && !(/^[(a-zA-Z)][(A-Za-z0-9_!@#$%^&*()'. "]{0,}$/i).test(value)
    ? VAILD : undefined

export const email = (value) => value && !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value)
    ? VAILD : undefined

export const requiredSelect = (value) => value > 0 ? undefined : SELECT_REQUIRED


export function checkEmail(email) {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}

export function checkPassword(password) {
    return (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}/).test(password);
}

export function checkDate(date) {
    return (/^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/).test(date);
}

export function checkSpecialCharecter(value) {
    return (/^[a-z0-9]+$/i).test(value); 
}

export function checkSpace(text) {
    return typeof text === 'string' && text.replace(/\s/g, "");
}

export function checkExistDataInArray(array, value) {
    for (const arr of array) {
        if (arr.indexOf(value) === 0) {
            return true;
        }
    }
    return false;
}

export function checkName(firstName) {
    return (/^[a-zA-Z]+$/).test(firstName);
}

export function checkContactNumber(contactNumber) {
    return (/^[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}$/).test(contactNumber);
}

export function checkTextNotStartWithNumber(data) {
    return (/^[a-zA-Z][A-Za-z0-9_!@#$%^&*()//+;:'." ]*$/).test(data)
}

export function checkLength(data) {
    return data.length !== 17
}


export function getFirstCharOfString(string) {
    return string.charAt(0);
}
export function checkMaxEmpty(data) {
    if (data === "") {
return true;
}
}

export function checkLengthRemoveSpace(data) {
    return data.replace(/\s/g, "").length;
}

export const isValid = (value) => {
    if (!_.isNil(value) && value && value.toString().length > 0) {
        return {}
    } else {
        return {
            error_msg: REQUIRED,
            display_error: true
        }
    }
}