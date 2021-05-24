export default{
    // 点击增加个数
    addCount({commit},n){
        commit('ADDCOUNT',n)
    },
    // 点击减少个数
    deletData({commit},m){
        commit('DELETDATA',m)
    }
}