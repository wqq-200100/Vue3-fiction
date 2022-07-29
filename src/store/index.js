import {defineStore} from 'pinia'

export const getUserLoginData = defineStore('loginStore', {
    state: () => {
        return {
            token: '',
            stateUsername: ''
        }
    }
})
