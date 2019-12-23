import { combineReducers } from 'redux';
import paymentState from './payment/reducer'
import aboutUsState from './aboutUs/reducer'
export const menuState = combineReducers({
   paymentState,
   aboutUsState
});
