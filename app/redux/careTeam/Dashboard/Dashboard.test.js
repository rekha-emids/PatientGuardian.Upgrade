
import { CareTeam, clearImageData} from './actions'
import expect from 'expect'


jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))


jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('@ptomasroos/react-native-multi-slider', () => ({rnmultislider: 'mockRNmultislider'}))

jest.mock('../../../utils/signalrUtility', () => ({signalrUtility: 'mocksignalrUtility'}))

jest.mock('../../store', () => ({rootReducer: 'mockrootReducer'}))


it('should create an action on msgCallbackInterval', () => {
    let data = {}
    const expectedAction = {type: CareTeam.clearImageData}

    expect(clearImageData()).toEqual(expectedAction)
  })