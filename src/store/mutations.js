export default{
    ADDCOUNT(state,n){
        state.count += n;
    },
    DELETDATA(state,m){
        state.count = state.count - m;
    }
}