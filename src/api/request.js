import {ipConfig} from './ipConfig'
import axios from 'axios'

const ffaProdUrl = () => {
    return ipConfig.ip.ffa.local;
}

export const ffaRequest = axios.create({
    baseURL: ffaProdUrl(),
})