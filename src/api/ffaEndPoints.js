import { ffaRequest } from './request'
import {getUserId} from "@/commons/localStoreFunctions";
import axios from "axios"

/* eslint-disable */

let headers = {
    'Authorization' : getUserId()
}

export function signUp(data) {
    return ffaRequest({
        url: '/user',
        method: 'post',
        data
    })
}

export function addShop(data) {
    return ffaRequest({
        url: '/shop',
        method: 'post',
        data,
        headers
    })
}

export function getShops(params) {
    return ffaRequest({
        url:'/shop',
        method:'get',
        params
    })
}

export function login(data) {
    return ffaRequest({
        url:'/user/login',
        method:"post",
        data
    })
}

export function addBrand(data) {
    return ffaRequest({
        url:'/brand',
        method: 'post',
        data,
        headers
    })
}

export function getBrands(params) {
    return ffaRequest({
        url:'/brand',
        method: 'get',
        params
    })
}

export function addItem(data) {
    return ffaRequest({
        url:'/item',
        method: 'post',
        data,
        headers
    })
}

export function getItems(params) {
    return ffaRequest({
        url:'/item',
        method: 'get',
        params
    })
}

export function createSaleOrder(data) {
    return ffaRequest({
        url:'/so',
        method: 'post',
        data,
        headers
    })
}

export function fetchSaleOrder(params) {
    return ffaRequest({
        url:'/so',
        method: 'get',
        params
    })
}

export function editSaleOrder(data) {
    return ffaRequest({
        url:'/so',
        method: 'post',
        data,
        headers
    })
}

export function uploadPrice(data) {
    return ffaRequest({
        url:'/so/price',
        method: 'post',
        data,
        headers
    })
}

export function fetchOrders(params) {
    return ffaRequest({
        url:'/so/date',
        method: 'get',
        params
    })
}

export function generateFile(params) {
    return ffaRequest({
        url:'/so/generate',
        method: 'get',
        params
    })
}

export function getBlobData(url, params){
    return axios.get(url , {
        responseType : 'arraybuffer',
        headers,
        params
    })
}


export function addStreet(data) {
    return ffaRequest({
        url:'/street',
        method: 'post',
        data,
        headers
    })
}

export function getStreets(params) {
    return ffaRequest({
        url:'/street',
        method: 'get',
        params
    })
}