import { getArrayFromNormalizedData } from "../../../utils/appUtils";
import FormConstants from '../../../screens/EditProfile/EditPointofService/FormConstants'
export const ACTION_MODEL = {
  UPDATE_DATA: 'UPDATE_DATA',
  ADD_DATA: 'ADD_DATA'
}

export const getModal = (data, action, getState) => {
  let stateDetails = getArrayFromNormalizedData(getState().profileState.PersonalDetailState.cityDetail),
   state = stateDetails.filter((city) => city.id === data.state)

  switch (action) {
    case ACTION_MODEL.ADD_DATA:
      return {
        addressExternalId: 0,
        addressTypeId: 0,
        addressId: data.addressId || 0,
        stateName: state && state.length > 0 ? state[0].name : "",
        stateId: state && state.length > 0 ? state[0].id : {},
        city: data.city,
        coverageArea: Number(data.range) || 0,
        streetAddress: data.street,
        isPrimaryAddress: data.Primaryaddress || false,
        isActive: true,
        lon: data.lon || 0,
        lat: data.lat || 0,
        rowversionId: [],
        serviceProviderId: getState().authState.userState.serviceProviderId,
        zipCode: data[FormConstants.ZIP_CODE]
      }
    case ACTION_MODEL.ADD_DATA_GUARDIAN:
      return {
        coreoHomeUserId: getState().authState.userState.userId,
        addressId: data.addressTypeId ? data.addressTypeId : 0,
        stateName: states[1],
        city: data.city,
        zip: data[FormConstants.ZIP_CODE] ? data[FormConstants.ZIP_CODE] : 0,
        street: data.street,
        isPrimaryAddress: data.isPrimaryAddress ? data.isPrimaryAddress : false,
        isActive: true,
        addressTypeId: data.addressType,
        stateId: states ? states[0] : 0
      }
    default:
      return {}
  }
}
