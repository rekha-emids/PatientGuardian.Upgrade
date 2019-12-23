import _ from 'lodash';

export function compare(...obj){
    return _.isEqual(...obj)
}

export function difference(...obj){
    return _.difference(...obj)
}