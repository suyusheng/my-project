import axios from '../request/axios.js';

// 校区数据
// export function getTableData(data) {
//     return axios({
//         method: 'get',
//         url: 'https://mars1.geek-8.com/api/users/tableInfo',
//         params: {
//             data
//         }
//     })
// }

// 请求表格数据
export const getTableData = (params) =>{
    return http.fetchGet('/api/users/tableInfo', params)
}

