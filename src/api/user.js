import {request} from "./request";


export function registerRequest(data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    })
}

export function login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}

