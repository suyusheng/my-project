<template>
    <div id="container">
        <div class="header">
            <el-row>
                <el-col :span="4">
                    <el-input v-model="formData.name" placeholder="请输入学生姓名*" clearable></el-input>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="formData.city" clearable placeholder="请选择所在城市" style="margin:0px 10px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button type="success" icon="el-icon-search" size="medium" @click="search">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <section id="section">
            <el-table ref="multipleTable" :data="tableData" border v-loading="loading"
                @selection-change="handleSelectionChange" style="width: 100%">
                <el-table-column align="center" type="selection" width="55">
                </el-table-column>
                <el-table-column prop="date" align="center" label="日期" width="150">
                    <template slot-scope="scope">
                        {{scope.row.date}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" align="center" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="province" label="省份" align="center" width="120">
                </el-table-column>
                <el-table-column prop="city" label="市区" align="center" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center" width="300">
                </el-table-column>
                <el-table-column prop="zip" label="邮编" align="center" width="120">
                </el-table-column>
                <el-table-column fixed="right" align="center" label="操作" width="auto">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="delet(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import { getTableData } from '@/api/api.js';
    export default {
        data() {
            return {
                formData: {
                    name: '', // 名字
                    city: '' // 所在城市
                },
                options: [
                    { label: '上海', value: '上海' },
                    { label: '北京', value: '北京' },
                    { label: '忻州', value: '忻州' },
                    { label: '太原', value: '太原' }
                ],
                seletedList: [],
                tableData: [],
                loading: true
            }
        },
        mounted() {
            this.getTable(); // 调用表格数据
        },
        methods: {
            handleClick(row) {

                console.log(row);
            },
            // 删除
            delet(row) {
                setTimeout(() => {
                    this.$refs.multipleTable.clearSelection();
                }, 0);
                if (this.seletedList.length !== 0) {
                    for (var i = 0; i < this.tableData.length; i++) {
                        for (var j = 0; j < this.seletedList.length; j++) {
                            if (this.tableData[i] && this.seletedList[j] && this.tableData[i].date == this.seletedList[j].date) {
                                this.tableData.splice(i, 1);
                            }
                        }
                    }
                } else {
                    this.$message.error('您必须先选中再删除对应项!');
                }
            },
            // 多选 
            handleSelectionChange(row) {
                this.seletedList = [];
                if (row) {
                    row.forEach((row) => {
                        this.seletedList.push(row);
                    })
                }
            },
            filterData(tableData) {
                if (this.formData.name) {
                    const name = this.tableData.filter((data) => {
                        return this.formData.name == data.name;
                    })
                    this.tableData = name; // 表格数据
                }

                if (this.formData.city) {
                    const city = this.tableData.filter((data) => {
                        return this.formData.city == data.province;
                    })
                    this.tableData = city;
                }
            },
            // 搜索
            search() {
                this.filterData(this.tableData);
            },
            // 获取table数据列表
            async getTable() {
                // axios请求接口的几种方式 第一种写法不带出纳还俗
                // const res = await axios.get('/api/users/tableInfo');
                // if(res.data.msg == '请求成功'){
                //     console.log(res);
                //     const data = res.data.tableData;
                //     this.tableData = data;
                //     this.loading = false;
                // }else{
                //     throw Error;
                // }

                // 第二种写法带参数
                // axios.get('/api/users/tableInfo',{
                //     params:{
                //         data
                //     }
                // }).then((res)=>{
                //     console.log(res);
                // })

                // 第三种写法
                axios({
                    url: '/api/users/tableInfo',
                    method: 'get',
                    params:{},
                }).then((res)=>{
                    const data = res.data.tableData;
                    this.tableData = data;
                    this.loading = false;
                }).catch((error)=>{
                    console.log(error);
                })

                // 第四种写法
                // const data = {};
                // getTableData().then(res => {
                //     // console.log(res);
                //     const data = res.data.tableData;
                //     this.tableData = data;
                //     this.loading = false;
                // }).catch((error) => {
                //     throw error;
                // })
            }
        }
    }
</script>

<style scoped lang="scss">
    #container {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
    }

    .header {
        width: 100%;
        margin-top: 30px;
    }

    #section {
        margin-top: 20px;
    }
</style>