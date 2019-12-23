import { store } from '../redux/store';

export const extractRole = (screen) => {
    const userState =  store && store.getState().authState.userState;

    if (userState && userState.roles) {
     let values = Object.keys(userState.roles).filter((key) => key === screen);

     if (values.length > 0) {
         return userState.roles[values[0]];
     }
    }
    return {
        Create: false,
        Read: false,
        Update: false,
        Delete: false
    }
 }

 export const objectCreationRoles = (roles) => Object.assign(...roles.map((role) => {
        let permissionsArray = role.permissions.map((permission) => ({[permission.permissionName]: permission.isAuthorized}))

       return {[role.moduleName]: Object.assign(...permissionsArray)}        
    }))