import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8080',
        timeout: 10000
    })

    instance.interceptors.request.use(config => {
        return config
    }, error => console.log(error))

    instance.interceptors.response.use(res => {
        return res.data
    }, error => console.log(error))
    return instance(config)
}

// 获取推荐小说信息
export function RecommendNovel() {
    return request({
        url: '/commend'
    })
}

// 小说详情信息
export function NovelDetails(title) {
    return request({
        url:`/commend/info?title=${title}`
    })
}

// 小说章节
export function GetCapterName(title) {
    return request({
        url:`/chapterName?title=${title}`
    })
}

// 搜索
export function Search(title) {
    return request({
        url:`/search?title=${title}`
    })
}
