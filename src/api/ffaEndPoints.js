import { ffaRequest } from './request'

/* eslint-disable */

export function addShop(data) {
    return ffaRequest({
        url: '/shop',
        method: 'post',
        data
    })
}

export function getShops(params) {
    return ffaRequest({
        url:'/shop',
        method:'get',
        params
    })
}