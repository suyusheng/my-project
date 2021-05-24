<template>
    <div class="main">
        <div class="header">
            <el-row>
                <el-col :span="24">
                    <el-select v-model="class_counselor" placeholder="请选择课程顾问" clearable>
                        <el-option v-for="item in saleslist" :key="item.name" :label="item.ownerName"
                            :value="item.name">
                        </el-option>
                    </el-select>
                    <el-select v-model="sale_channel" placeholder="请选择渠道名" clearable>
                        <el-option v-for="item in sourcelist" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                    <el-date-picker v-model="time" @change="dateSel" type="datetimerange"
                        :picker-options="pickerOptions" range-separator="至" value-format="yyyy-MM-dd HH:mm:ss"
                        start-placeholder="开始日期" align="right" end-placeholder="结束日期" clearable>
                    </el-date-picker>
                    <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="search">搜 索
                    </el-button>
                    <el-button type="primary" style="margin-left: 10px;" @click="goMine">跳转</el-button>
                </el-col>
            </el-row>
        </div>

        <div class="content">
            <!-- 单条数据 -->
            <el-table :data="tableData" border :summary-method="getSummaries" show-summary tooltip-effect="dark"
                style="width: 100%;">
                <el-table-column label="课程顾问名" align="center" width="auto">
                    <template slot-scope="scope">
                        <a @click="showOwnerdetail(scope.row.owner)" style="cursor:default;">{{scope.row.owner}}</a>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="auto" label="渠道名">
                    <template slot-scope="scope">
                        <a>{{scope.row.source == 'undefined'?'无渠道':scope.row.source}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="assigned" align="center" width="auto" label="分配线索数">
                    <template slot-scope="scope">
                        <a @click="showListdetail('分配线索数',scope.$index)"
                            style="cursor:default">{{scope.row.assigned}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="called" align="center" width="auto" label="电话接通人数">
                    <template slot-scope="scope">
                        <a>{{scope.row.called}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="scheduled" align="center" width="auto" label="预约试听人数">
                    <template slot-scope="scope">
                        <a @click="showListdetail('预约试听人数',scope.$index)"
                            style="cursor:default">{{scope.row.scheduled}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="trialed" align="center" width="auto" label="试听上课人数">
                    <template slot-scope="scope">
                        <a @click="showListdetail('试听上课人数',scope.$index)"
                            style="cursor:default">{{scope.row.trialed}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="paid" align="center" width="auto" label="付款人数">
                    <template slot-scope="scope">
                        <a @click="showListdetail('付款人数',scope.$index)" style="cursor:default">{{scope.row.paid}}</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 弹窗详情信息 -->
        <el-dialog :title="title" :visible.sync="dialogTableVisible" class="dialog">
            <el-table :data="gridData" height="400">
                <el-table-column :label="name" width="auto" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <!-- 课程顾问详情信息 -->
        <el-dialog title="课程顾问详情" :visible.sync="dialogOwnershow" class="dialog">
            <el-table :data="ownerData" height="400">
                <el-table-column label="课程顾问名" width="auto" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.owner}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="渠道名" width="auto" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.source == 'undefined'?'无渠道':scope.row.source}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="分配线索数" width="auto" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.assigned}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="电话接通人数" width="auto" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.called}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预约试听人数" width="auto" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.scheduled}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="试听上课人数" width="auto" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.trialed}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="付款人数" width="auto" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.paid}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <!-- 分页器 -->
        <!-- <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div> -->
    </div>
</template>

<script>
    import axios from 'axios'
    import { parseTime } from '@/utils/time.js'
    import { constants } from 'crypto';
    export default {
        data() {
            return {
                tableData1: [], // 表格数据
                gridData: [],// 各个表头list
                tableData: [], // 表格数据
                ownerData: [], // 课程顾问list
                sale_channel: '', // 渠道名
                class_counselor: '', // 课程顾问
                time: [parseTime(new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000), '{y}-{m}-{d} {h}:{m}:{s}'), parseTime(new Date(new Date(new Date().toLocaleDateString()).getTime()), '{y}-{m}-{d} {h}:{m}:{s}')], // 日期时间
                saleslist: [], // 渠道列表
                sourcelist: [], // 课程顾问列表
                salesinfo: [], // 销售列表
                starDate: '', // 开始时间
                endDate: '', // 结束时间
                dialogTableVisible: false, // 弹窗信息是否显示
                dialogOwnershow: false, // 课程顾问详情
                title: '详情',
                class_counselor1: '',
                name: '',
                // loading: true,
                // total: 0, // 总数
                // currentPage: 1, // 当前页面
                // pageSize: 10, // 每页显示条数
                assignedlist: [], // 分配线索列表
                paidlist: [], // 付款列表
                scheduledlist: [], //预约试听列表
                trialedlist: [], // 试听上课列表
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近一天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近一月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
            }
        },
        methods: {
            // 合计
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index]
                    } else {
                        sums[index] = '无';
                    }
                })
                return sums;
            },
            // 点击销售名展示下销售名称
            showOwnerdetail(name) {
                console.log(name);
                this.dialogOwnershow = !this.dialogOwnershow;

                let fileterName = this.saleslist.find((data) => {
                    return data.ownerName == name
                })
                console.log(fileterName);
                if (fileterName) {
                    this.class_counselor1 = fileterName.name;
                }

                let data = {
                    starttime: this.starDate, // 开始时间
                    endtime: this.endDate, // 结束时间
                    owner: this.class_counselor1, // 课程顾问名
                    source: this.sale_channel // 渠道名
                }
                axios.post('https://mars1.geek-8.com/trackleads', data).then((res) => {
                    if (res.status == 200) {
                        const datas = res.data;
                        this.tableData1 = JSON.parse(decodeURIComponent(datas.success));
                        // this.ownerData = [];
                        this.ownerData = this.tableData1;
                        for (var i in this.ownerData) {
                            let fileterOwner = this.saleslist.find((data) => {
                                return data.name == this.ownerData[i].owner
                            })
                            if (fileterOwner) {
                                this.ownerData[i].owner = fileterOwner.ownerName;
                            }
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            // 展示销售信息详情
            showListdetail(name, index) {
                this.dialogTableVisible = !this.dialogTableVisible;
                this.gridData = [];
                switch (name) {
                    case '分配线索数':
                        this.title = '分配线索详情';
                        this.name = '分配线索电话';
                        this.assignedlist = this.tableData[index].assignedlist;
                        this.gridData = this.assignedlist;
                        break;
                    case '预约试听人数':
                        this.title = '预约试听详情';
                        this.name = '预约试听电话';
                        this.scheduledlist = this.tableData[index].scheduledlist;
                        this.gridData = this.scheduledlist;
                        break;
                    case '试听上课人数':
                        this.title = '试听上课详情';
                        this.name = '试听上课电话'
                        this.trialedlist = this.tableData[index].trialedlist;
                        this.gridData = this.trialedlist;
                        break;
                    case '付款人数':
                        this.title = '付款详情';
                        this.name = '付款人员电话'
                        this.paidlist = this.tableData[index].paidlist;
                        this.gridData = this.paidlist;
                        break;
                    default:
                        break;
                }
            },
            // 改变时间
            dateSel(val) {
                // console.log(val);
                if (val == null) {
                    this.starDate = '';
                    this.endDate = '';
                } else {
                    this.starDate = val[0]; // 开始时间
                    this.endDate = val[1]; // 结束时间
                    this.getData();
                }
            },
            // 请求列表数据
            async getData() {
                const data = {
                    starttime: this.starDate, // 开始时间
                    endtime: this.endDate // 结束时间
                }
                await axios.post('https://mars1.geek-8.com/tllist', data).then((res) => {
                    if (res.status == 200) {
                        const temp = res.data;
                        this.salesinfo = JSON.parse(decodeURIComponent(temp.salesinfo));
                        for (var i in this.salesinfo) {
                            this.saleslist.push({ name: i, ownerName: this.salesinfo[i].ownerName }); // 课程顾问
                        }
                        this.sourcelist = JSON.parse(decodeURIComponent(temp.sourcelist)); // 渠道名
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            // 搜索
            search() {
                let data = {
                    starttime: this.starDate, // 开始时间
                    endtime: this.endDate, // 结束时间
                    owner: this.class_counselor, // 课程顾问名
                    source: this.sale_channel // 渠道名
                }
                axios.post('https://mars1.geek-8.com/trackleads', data).then((res) => {
                    if (res.status == 200) {
                        const datas = res.data;
                        this.tableData = JSON.parse(decodeURIComponent(datas.success));
                        for (var i in this.tableData) {
                            let fileterSales = this.saleslist.find((data) => {
                                return data.name == this.tableData[i].owner
                            });
                            if (fileterSales) {
                                this.tableData[i].owner = fileterSales.ownerName
                            }
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            // 页面跳转
            goMine() {
                this.$router.push({ path: '/mine', query: { name: '小明' } });
            }
        }
    }
</script>
<style scoped lang="scss">
    .main {
        width: 100%;
        height: 100%;
        margin: 0 auto;

        .header {
            width: 100%;
            height: 45px;
            margin-top: 20px;

            .el-row {
                .el-col {
                    .el-select {
                        margin-right: 15px;
                    }
                }
            }
        }

        .content {
            margin-top: 20px;
            margin-bottom: 30px;
        }

        .block {
            text-align: center;
        }

        .dialog {
            ul {
                // width: 100%;
                height: 250px;
                overflow-y: scroll;
                text-align: left;

                li {
                    list-style: none;
                    line-height: 30px;
                    font-size: 17px;
                    color: #000;
                }
            }
        }
    }
</style>