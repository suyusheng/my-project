<template>
  <div>
    <button @click="delet">减少</button>
    {{data}}
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    props:{
        data:{
            type: Number
        }
    },
    data(){
        return{

        }
    },
    // computed:{
    //     count(){
    //         return this.$store.state.count
    //     }
    // },
    methods:{
        ...mapActions(['deletData']),
        // 减少个数
        delet(){
            this.deletData(this.data);
            // this.$store.commit('delet');
        }
    }

}
</script>

<style>

</style>