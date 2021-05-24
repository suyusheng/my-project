import requestUrl from '../request/base.js';
import axios from '../request/axios.js'; // axios请求

const article = {
    // 文章列表
    articlelist(id) {
        return axios.get(`${requestUrl.de}/topics?id=${id}`)
    },
    checkarticleData(id, params) {
        return axios.post(`${requestUrl.de}/checktopics?id=${id}`, {
            params: params
        })
    }
}
export default article;