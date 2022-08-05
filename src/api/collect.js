import {request} from "./request";

// 加入收藏
export function addLike({user_id, title}) {
    return request({
        url:`/addLike?user_id=${user_id}&title=${title}`
    })
}

// 取消收藏
export function deleteLike({user_id, title}) {
    return request({
        url:`/delLike?user_id=${user_id}&title=${title}`
    })
}

// 获取收藏列表
export function getLikes(user_id) {
    return request({
        url:`/getLikes?user_id=${user_id}`
    })
}