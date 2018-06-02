<template>
<div id="state-page">
    <div id="search-box">
        <Input 
            v-model="searchConName1" 
            icon="search" 
            @on-change="handleSearch" 
            placeholder="请输入订单编号搜索..." 
            style="width: 200px" />
        <Button id="my-order-btn" type="primary" @click="showMyOrders">我的订单</Button>
        <Button v-show="showGoodTable" id="check-state" type="primary" @click="checkState">查看完成情况</Button>
    </div>
    <Modal
        v-model="showState"
        title="完成情况"
        @on-ok="output"
        @on-cancel="cancel"
        okText="导出"
        cancelText="确认">
        <div id="state-table">
            <table>
                <tr>
                    <th class="table-title"></th>
                </tr>
                <tr>
                    <th>序号</th>
                    <th>货品名称</th>
                    <th>货品编号</th>
                    <th>数量</th>
                    <th>负责车间</th>
                    <th>未完成数量</th>
                    <th>工作状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for="state in states">
                    <th>{{ state.no }}</th>
                    <th>{{ state.id }}</th>
                    <th>{{ state.name }}</th>
                    <th>{{ state.quantity }}</th>
                    <th>{{ state.workshop }}</th>
                    <th>{{ state.undone }}</th>
                    <th>{{ state.state }}</th>
                    <th @click="urge(state)" class="urge-btn">{{ state.operate }}</th>
                </tr>
            </table>
        </div>
    </Modal>
    <div id="order-table" v-show="showOrderTable">
        <table>
            <tr>
                <th class="table-title" colspan="6">查询结果</th>
            </tr>
            <tr>
                <th>序号</th>
                <th>订单编号</th>
                <th>截止日期</th>
                <th>办理人</th>
                <th>客户</th>
                <th>操作</th>
            </tr>
            <tr v-for="result in searchResults">
                <td>{{ result.no }}</td>
                <td>{{ result.id }}</td>
                <td>{{ result.ddl }}</td>
                <td>{{ result.user }}</td>
                <td>{{ result.client }}</td>
                <td @click="checkOrder(result)" class="check-order-btn">查看</td>
            </tr>
        </table>
    </div>
    <div id="good-table-box" v-show="showGoodTable">
        <div id="goods-table">
            <table>
                <tr>
                    <th class="table-title" colspan="5">
                        订单编号：{{ result.id }}&nbsp;&nbsp;办理人：{{ result.user }}&nbsp;&nbsp;截止日期：{{ result.ddl }}
                    </th>
                </tr>
                <tr>
                    <th>序号</th>
                    <th>货品编号</th>
                    <th>货品名称</th>
                    <th>数量</th>
                    <th>负责车间</th>
                </tr>
                <tr v-for="good in goods">
                    <th>{{ good.no }}</th>
                    <th>{{ good.id }}</th>
                    <th>{{ good.name }}</th>
                    <th>{{ good.quantity }}</th>
                    <th>{{ good.workshop }}</th>
                </tr>
            </table>
        </div>
        <div id="materials-table">
            <table>
                <tr>
                    <th class="table-title" colspan="5">相关物料</th>
                </tr>
                <tr>
                    <th>序号</th>
                    <th>物料名称</th>
                    <th>物料编号</th>
                    <th>数量</th>
                    <th>仓库</th>
                </tr>
                <tr v-for="material in materials">
                    <td>{{ material.no }}</td>
                    <td>{{ material.name }}</td>
                    <td>{{ material.id }}</td>
                    <td>{{ material.quantity }}</td>
                    <td>{{ material.warehouse }}</td>
                </tr>
            </table>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'State',
    data () {
        return {
            user: '',
            searchConName1: '',
            showOrderTable: true,
            showGoodTable: false,
            searchResults: [],
            goods: [],
            materials: [],
            result: {},
            states: [],
            showState: false
        }
    },
    created: function () {
        // 当前是谁在登录
        // 请后端补充代码
        this.user = '马化腾'
    },
    methods: {
        handleSearch () {
            console.log(this.searchConName1)
            // 先清空结果数组
            this.clear(this.searchResults)
            // 将查询结果push到结果数组中，查询字符串为 this.searchConName1
            // 请后端补充代码
            this.searchResults.push({
                no: 1,
                id: 'BX12345678',
                ddl: '2018-05-31',
                user: this.user,
                client: '王健林'
            })
            // 切换表格
            this.showGoodTable = false
            this.showOrderTable = true

        },
        showMyOrders () {
            // 先清空结果数组
            this.clear(this.searchResults)
            this.searchResults.push({
                no: 1,
                id: 'BX12345678',
                ddl: '2018-05-31',
                user: this.user,
                client: '王健林'
            })

            // 切换表格
            this.showGoodTable = false
            this.showOrderTable = true
        },
        checkOrder (result) {
            // 先清空结果数组
            this.clear(this.goods)
            this.clear(this.materials)
            // 将 result 订单所对应的 货品&物料 push 到goods, materials中
            // 请后端补充代码
            this.result = result
            this.goods.push({
            no: 1,
            id: 'E5080002',
            name: 'Z100 200系列电路板',
            quantity: 3,
            workshop: 2
            })
            this.materials.push({
                no: 1,
                name: '0603电阻（30Ω）',
                id: 'R4000621',
                quantity: '2',
                warehouse: 1
            })

            // 切换表格
            this.showGoodTable = true
            this.showOrderTable = false
        },
        clear (array) {
            array.splice(0, array.length)
        },
        checkState () {
            this.showState = true
            // 清空states数组
            this.clear(this.states)
            // 将订单完成状态push到states中
            // 请后端补充代码
            this.states.push({
                no: 1,
                id: 'ESOB0001',
                name: 'Z100 100系列电路板',
                quantity: 2,
                workshop: 1,
                undone: 1,
                state: '生产中',
                operate: '催促'
            })
            
        },
        cancel () {
            console.log('cancel')
        },
        output () {
            // 导出？？？？
            // 请前端补充代码
            this.$Message.info('导出成功')
        },
        urge (state) {
            if ( state.undone > 0 ) {
                this.$Message.info('已催促')
            }
        }
    }   
}
</script>
<style scoped>
#search-box {
    margin: 5px 15px;
}
#state-page table {
    width: 100%;
    text-align: center;
}
.check-order-btn, .urge-btn {
    color: blue;
    cursor: pointer;
}
.table-title {
    border-collapse: collapse;
    background: #f1f1f1;
    line-height: 25px;
}
#goods-table, #materials-table {
    text-align: center;
    width: 48%;
    display: inline-block;
    height: 100%;
    margin: 0 5px;
    vertical-align: top;
    border-collapse:collapse；
}
#state-page button {
    background-color: #464c5b;
    border: none;
}
#state-table table {
    width: 100%;
}
</style>