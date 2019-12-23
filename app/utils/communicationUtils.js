import call from 'react-native-phone-call'
import { normalizePhone } from './renderFields';

export function makeACall(phNo){
    const args = {
        number: normalizePhone(phNo),
        prompt: false
    }

    call(args).catch(console.error)
}