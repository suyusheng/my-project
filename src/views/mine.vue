<template>
    <div id="main">
        <h3>{{count}}</h3>
        <button @click="add">增加</button>
        <child :data="data"></child>
        <p>{{num}}</p>
        <p>{{name}}</p>
        <span v-if="!show" style="color:red;font-size:14px">输入无效，请输入有效的身份证号码</span>
        <p>{{formdata}}</p>
        <label for="">*身份证号码：</label>
        <el-input placeholder="请输入身份证号码*" v-model="credentialsCode" :validate-event="true" autocomplete="on"
            size="medium" @blur="testIdcard" style="width:250px" clearable>
        </el-input>
        <div style="margin:20px 0px;">
            <el-button @click="start">开始计时</el-button>
            <el-button type="primary" @click="checkTimer">点击查看计时器是否运作</el-button>
        </div>
        <!-- 服务类型 -->
        <div class="section">
            <label>*服务类型</label>
            <el-select v-model="value" placeholder="请选择" @change="changeOption">
                <el-option v-for="item in dataList" :key="item.id" :label="item.serviceType" :value="item.typeCert">
                </el-option>
            </el-select>
            <div class="content" v-for="(item,index) in serviceList" :key="index" v-show="showService">
                <h3>申请信息录入</h3>
                <!-- {{item}} -->
                <div class="service_cont" v-for="(ele,ind) in item.applicationInfo" :key="'info1'+ind">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item :label="'*'+ele.tagName">
                            <div v-if="ele.tagType == 'input'">
                                <el-input v-if="ele.tagName == '姓名'" v-model="form.name"></el-input>
                                <el-input v-if="ele.tagName == '手机号'" v-model="form.phone"></el-input>
                                <el-input v-if="ele.tagName == '客户号'" v-model="form.userNumber"></el-input>
                            </div>
                            <div v-if="ele.tagType == 'radio' && ele.tagName == '性别'">
                                <el-radio-group v-model="form.gender">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <h3>住院信息登录</h3>
                <div class="service_cont" v-for="(ele,ind) in item.hospitalInfo" :key="'info2'+ind">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item :label="'*'+ele.tagName">
                            <div v-if="ele.tagType == 'input'">
                                <el-input v-if="ele.tagName == '姓名'" v-model="form.hospital_name" placeholder="请输入客户姓名">
                                </el-input>
                                <el-input v-if="ele.tagName == '手机号'" v-model="form.hospital_phone"
                                    :disabled="ele.disabled"></el-input>
                                <el-input v-if="ele.tagName == '客户号'" v-model="form.hospital_userNumber"></el-input>
                            </div>
                            <div v-if="ele.tagType == 'radio' && ele.tagName == '性别'">
                                <el-radio-group v-model="form.gender">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <button @click="submit">保存</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Child from '@/components/child.vue';
    import { mapState, mapActions, mapMutations } from 'vuex';
    import { CheckIdCard } from '../utils/js/testIdCard.js';
    import { newTaskServiceData } from '../utils/js/data.js';
    // Vue.prototype.CheckIdCard = CheckIdCard;
    export default {
        components: {
            Child
        },
        data() {
            return {
                data: 2,
                credentialsCode: '',
                name: '',
                show: true,
                errorCode: '不正确',
                // options: [
                //     {value: 1, label:"儿童齿科"},
                //     {value: 2, label:"基因检测"},
                //     {value: 3, label:"重疾绿通"}
                // ],
                showService: false, // 默认不显示服务类型对应内容
                dataList: [],
                serviceList: [], // 用来存放筛选完的数据
                value: '',
                form: {
                    name: '',
                    phone: '',
                    userNumber: '',
                    gender: '男',
                    hospital_name: '', // 住院用户
                    hospital_phone: '', // 住院用户手机号
                    hospital_userNumber: '' // 住院客户端
                },
                timer: null
            }
        },
        computed: {
            ...mapState(['count', 'num']),
            formdata() {
                var data = this.form;
                return data.phone
            }
        },
        created() {
            // this.num = this.$store.getters.doneTodos;
            this.name = '大家好，我叫' + this.$route.query.name + '，我今年25岁，北漂整整五年了';
            this.dataList = newTaskServiceData;
            console.log(this.dataList)
            this.getFundata();
        },
        // beforeDestory() {
        //     clearInterval(this.timer);
        //     this.timer = null;
        // },
        methods: {
            ...mapActions(['addCount']),
            getFundata() {
                function fn() {
                    var i = 10;
                    return function (n) {
                        console.log(n + (++i))
                    }
                }
                var f = fn();
                f(10) // 21
                f(20) // 32 
                fn()(10) // 21 
                fn()(20) // 31
            },
            start() {
                this.timer = setInterval(function () {
                    console.log('sss');
                }, 1000);
                // 离开当前页面前销毁组件
                this.$once('hook:beforeDestroy', () => {
                    clearInterval(this.timer);
                })
            },
            checkTimer() {
                this.$router.push({ path: '/static' });
            },
            changeOption(val) {
                console.log(val)
                this.showService = true;
                let _this = this;
                this.serviceList = this.dataList.filter(ele => {
                    return ele.typeCert == val
                })
                console.log(this.serviceList)
            },
            // 点击保存
            submit() {
                console.log(this.form)
            },
            // 检测身份证号码
            CheckIdCard(idcard, errCode) {
                return CheckIdCard(idcard, errCode);
            },
            add() {
                // 调用全局方法
                var n = 10;
                this.addCount(n)
                // this.$store.commit('addCount',10);
            },
            // 检测身份证号码
            testIdcard() {
                if (this.credentialsCode) {
                    this.CheckIdCard(this.credentialsCode, this.errorCode);
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    #main {
        width: 400px;
        height: 300px;

        .section {
            width: 100%;
            height: auto;

            label {
                color: #333;
                padding-right: 10px;
            }
        }
    }
</style>