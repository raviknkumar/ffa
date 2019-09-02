import {ipConfig} from './ipConfig'
import axios from 'axios'

const ffaProdUrl = () => {
    return ipConfig.ip.ffa.prod;
}

export const ffaRequest = axios.create({
    baseURL: ffaProdUrl(),
})