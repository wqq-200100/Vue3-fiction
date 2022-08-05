import {defineStore} from 'pinia'
import {getLikes} from "../api/collect";
import {getLocal} from "../utils/tools";

export const getUserLoginData = defineStore('loginStore', {
    state: () => {
        const user = getLocal('usernameData') || {user_id: '', stateUsername:''}
        return {
            user_id: user.user_id,
            stateUsername: user.stateUsername ,
            likes: []
        }
    },
    actions: {
        async getLikes() {
            this.likes = await getLikes(this.user_id)
        }
    }
})
