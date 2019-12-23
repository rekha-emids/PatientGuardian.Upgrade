export let navigation = {
    actions: { goBack: jest.fn(), navigate: jest.fn(), setParams: jest.fn() },
    addListener: jest.fn(),
    dangerouslyGetParent: jest.fn(),
    dispatch: jest.fn(),
    getChildNavigation: jest.fn(),
    getParam: jest.fn(),
    getScreenProps: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    navigate: jest.fn(),
    router: undefined,
    setParams: jest.fn(),
    state: { key: "Dashboard", routeName: "Dashboard", params: {screen: 'ServiceRequest'} }
}