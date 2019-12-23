import FormConstants from "../../../screens/EditProfile/EditPointofService/FormConstants";

export const ACTION_MODEL = {
  UPDATE_DATA: 'UPDATE_DATA',
  ADD_DATA: 'ADD_DATA'
}

export const getModal = (data, action, getState) => {
  let stateDetails = getState().profileState.PersonalDetailState.cityDetail,
   state = stateDetails.filter((city) => city.id === data[FormConstants.STATE])

  switch (action) {
    case ACTION_MODEL.ADD_DATA:
      return {
        patientId: getState().authState.userState.patientId,
        addressId: data.addressId ? data.addressId.toString() : 0,
        stateName: state && state.length > 0 ? state[0].name : "",
        state: state && state.length > 0 ? state[0] : {},
        city: data[FormConstants.CITY],
        zip: data[FormConstants.ZIP_CODE] ? data[FormConstants.ZIP_CODE] : 0,
        street: data[FormConstants.STREET],
        isPrimaryAddress: data.Primaryaddress || false,
        isActive: true,
        addressTypeId: data[FormConstants.ADDRESS_TYPE] || null
      }
    case ACTION_MODEL.ADD_DATA_GUARDIAN:
      return {
        coreoHomeUserId: getState().authState.userState.userId,
        addressId: data.addressTypeId ? data.addressTypeId.toString() : 0,
        stateName: state && state.length > 0 ? state[0].name : "",
        state: state && state.length > 0 ? state[0] : {},
        city: data[FormConstants.CITY],
        zip: data[FormConstants.ZIP_CODE] ? data[FormConstants.ZIP_CODE] : 0,
        street: data[FormConstants.STREET],
        isPrimaryAddress: data.isPrimaryAddress ? data.isPrimaryAddress : false,
        isActive: true,
        addressTypeId: data[FormConstants.ADDRESS_TYPE] || null,
        stateId: state && state.length > 0 ? state[0].id : ""
      }
    default:
      return {}
  }
}
