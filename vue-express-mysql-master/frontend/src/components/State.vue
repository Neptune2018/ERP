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
        <Button v-show="showGoodTable" id="check-state" type="primary" @click="checkState">查看订单状态</Button>
    </div>
    <Modal
        v-model="showState"
        title="完成情况"
        @on-ok="output"
        @on-cancel="cancel"
        okText="确认"
        cancelText="关闭">
        <div id="state-table">
            <table>
                <tr>
                    <th class="table-title"></th>
                </tr>
                <tr>
                    <th>订单编号</th>
                    <th>办理人</th>
                    <th>工作状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for="state in states">
                    <th>{{ state.id }}</th>
                    <th>{{ state.managerId }}</th>
                    <th>{{ state.state }}</th>
                    <th @click="urge(state)" class="urge-btn">{{ state.operate }}</th>
                </tr>
            </table>
        </div>
    </Modal>
    <Modal
        v-model="modal1"
        title="生成领料单"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>原料已充足，是否重新生成领料单？</p>
    </Modal>
    <!-- <div id="order-table" v-show="showOrderTable">
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
    </div> -->
    <Card v-show="showOrderTable">
        <Table height="400" border :columns="searchResultsColumns" :data="searchResults"></Table>
    </Card>
    <!-- <div id="good-table-box" v-show="showGoodTable"> -->
        <!-- <div id="goods-table">
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
        </div> -->
        <Row v-show="showGoodTable">
            <Col span="12">
                <Card>
                    <Table height="400" border :columns="goodsColumns" :data="goods"></Table>
                </Card>
            </Col>
            <Col span="12">
                <Card>
                    <Table height="400" border :columns="materStocksColumns" :data="materStocks"></Table>
                </Card>
            </Col>
        </Row>
        <!-- <div id="materials-table">
            <table>
                <tr>
                    <th class="table-title" colspan="6">相关物料</th>
                </tr>
                <tr>
                    <th>物料编号</th>
                    <th>物料名称</th>
                    <th>数量</th>
                    <th>工位</th>
                    <th>仓库</th>
                    <th>操作</th>
                </tr>
                <tr v-for="material in materStocks">
                    <td>{{ material.id }}</td>                    
                    <td>{{ material.name }}</td>
                    <td>{{ material.quantity }}</td>
                    <td>{{ material.workshop }}</td>
                    <td>{{ material.stockId }}</td>                    
                    <td v-if="material.stockId==-1" @click="remind(material)" class="del-good">提醒进货</td>     
                </tr>
            </table>
        </div> -->
    <!-- </div> -->
</div>
</template>

<script>

export default {
    name: 'State',
    data () {
        return {
            materStocksColumns: [
                {
                    title: '物料编号',
                    key: 'id'
                },
                {
                    title: '物料名称',
                    key: 'name'
                },
                {
                    title: '数量',
                    key: 'quantity'
                },
                {
                    title: '工位',
                    key: 'workshop'
                },
                {
                    title: '仓库',
                    key: 'stockId'
                },
                {
                    title: '操作',
                    key: 'no',
                    align: 'center',
                        render: (h, params) => {
                            if(this.materStocks[params.index].stockId==-1) {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        },
                                        on: {
                                            click: () => {
                                                this.remind(params.index)
                                            }
                                        }
                                    }, '提醒进货')
                                ]);
                            }
                        }
                }
            ],
            goodsColumns: [
                {
                    title: '序号',
                    key: 'no'
                },
                {
                    title: '货品编号',
                    key: 'id'
                },
                {
                    title: '货品名称',
                    key: 'name'
                },
                {
                    title: '数量',
                    key: 'quantity'
                },
                {
                    title: '负责车间',
                    key: 'workshop'
                }
            ],
            searchResultsColumns: [
                {
                    title: '序号',
                    key: 'no'
                },
                {
                    title: '订单编号',
                    key: 'id'
                },
                {
                    title: '截止日期',
                    key: 'ddl'
                },
                {
                    title: '办理人',
                    key: 'user'
                },
                {
                    title: '客户',
                    key: 'client'
                },
                {
                    title: '操作',
                    key: 'no',
                    align: 'center',
                    render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => {
                                            this.checkOrder(params.index)
                                        }
                                    }
                                }, '查看')
                            ]);
                    }
                }
            ],
            modal1: false,
            haveGoods: false,
            haveMater: false,
            haveStock: false,
            //用户
            user: 1,
            //
            searchConName1: '',
            showOrderTable: true,
            showGoodTable: false,
            //查询结果
            searchResults: [],
            //该订单的所有货品信息
            goods: [],
            //原料信息
            materials: [],
            stocks: [],
            //如果缺料，存储缺料的原料信息
            lessMaterials: [],
            //存储原料及库存信息
            materStocks: [],
            getLists: [],
            result: {},
            states: [],
            showState: false
        }
    },
    created: function () {
        this.clear(this.searchResults)
            // 将查询结果push到结果数组中，查询字符串为 this.searchConName1
        this.$http({
            url: '/findOrderLists',
            method: 'GET',
            params: {
                searchName: ''
            }
        }).then(function(res){
            this.searchResults = res.body.data;
            //this.$Message.info('查询订单成功');                    
        },function(){
            this.$Message.info('查询订单失败');
        })
        // 当前是谁在登录
        // 请后端补充代码
        this.$watch("modal1", function (newValue, oldValue) {
            if(newValue) {
            var oldMaterStocks = this.materStocks;
                        var newMaterStocks = [];
                        for(var j=0;j<this.materStocks.length;j++) {
                            if(this.materStocks[j].stockId==-1) {
                                for(var k=0;k<this.materials.length;k++) {
                                    if(this.materStocks[j].id==this.materials[k].id){
                                        var quantity = this.materStocks[j].quantity;
                                        for(var s=0;s<this.materials[k].stocks.length;s++) {                           
                                            if(this.materials[k].stocks[s].remain>0){
                                                if(quantity>this.materials[k].stocks[s].remain) {
                                                    var isThere = false;
                                                    for(var p=0;p<this.materStocks.length;p++) {
                                                        if(this.materStocks[p].id==this.materStocks[j].id&&this.materStocks[p].workshop==this.materStocks[j].workshop&&this.materStocks[p].stockId==this.materials[k].stocks[s].id) {
                                                            this.materStocks[p].quantity += quantity;
                                                            isThere = true;
                                                            break;
                                                        }
                                                    }
                                                    if(!isThere){
                                                        this.materStocks.push({
                                                            id: this.materStocks[j].id,
                                                            name: this.materStocks[j].name,
                                                            workshop: this.materStocks[j].workshop,
                                                            quantity: this.materials[k].stocks[s].remain,
                                                            stockId: this.materials[k].stocks[s].id
                                                        })
                                                    }
                                                    quantity -= this.materials[k].stocks[s].remain;
                                                }
                                                else {
                                                    var isThere = false;
                                                    for(var p=0;p<this.materStocks.length;p++) {
                                                        if(this.materStocks[p].id==this.materStocks[j].id&&this.materStocks[p].workshop==this.materStocks[j].workshop&&this.materStocks[p].stockId==this.materials[k].stocks[s].id) {
                                                            this.materStocks[p].quantity += quantity;
                                                            isThere = true;
                                                            break;
                                                        }
                                                    }
                                                    if(!isThere){
                                                        this.materStocks.push({
                                                            id: this.materStocks[j].id,
                                                            name: this.materStocks[j].name,
                                                            workshop: this.materStocks[j].workshop,
                                                            quantity: this.materials[k].stocks[s].remain,
                                                            stockId: this.materials[k].stocks[s].id
                                                        })
                                                    }
                                                    quantity = 0;
                                                }
                                            }
                                        }
                                    }
                                }
                                this.materStocks.splice(j,1);
                                j -= 1;
                            }
                        }
                        newMaterStocks = this.materStocks;                    
                        this.$http({
                            url: '/updateGetList',
                            method: 'GET',
                            params: {
                                oldMaterStocks: JSON.stringify({stocks:this.stocks}),
                                oldCount: this.stocks.length,
                                newMaterStocks: JSON.stringify({stocks:this.materStocks}),
                                newCount: this.materStocks.length,
                                orderListId: this.result.id
                            }
                        }).then(function(res){
                            //this.$Message.info('更新领料单成功');                
                        },function(){
                            this.$Message.info('更新领料单失败');
                        })
            }
        })

        //监听materials，判断原料是否充足
        this.$watch("haveMater", function (newValue, oldValue) {
            if(this.haveMater) {
                this.$http({
                    url: '/findMaterialNum',
                    method: 'GET',
                    params: {
                        materialsId: JSON.stringify({maters:this.materials}),
                        count: this.materials.length
                    }
                }).then(function(res){
                    for(var i=0;i<this.materials.length;i++) {
                        this.materials[i].num = res.body.data[i].remain;
                        this.materials[i].stocks = res.body.data[i].stocks;
                    }
                    for(var i=0;i<this.lessMaterials.length;i++) {
                        for(var j=0;j<this.materials.length;j++) {
                            if(this.materials[j].id==this.lessMaterials[i].id) {
                                this.lessMaterials[i].num = res.body.data[j].remain;
                                break;
                            }
                        }
                    }
                if(this.result.status=='LessMater') {
                    var isEnough = true
                    for(var i=0;i<this.lessMaterials.length;i++) {
                        if(this.lessMaterials[i].quantity>this.lessMaterials[i].num) {
                            isEnough = false;
                            break;
                        }
                    }
                    if(isEnough) {
                        this.modal1 = true;
                        this.result.status='WaitGet';
                    }
                }
                },function(){
                    this.$Message.info('获取原料数目失败');
                })
            }
        })

        this.$watch("result",function(newValue,oldValue) {
            this.$http({
                url: '/getMaterStocks',
                method: 'GET',
                params: {
                    id: this.result.id,
                    status: 'Product'
                }
                }).then(function(res){
                    for(var i=0;i<res.body.data.length;i++) {
                        this.stocks.push({
                            id: res.body.data[i].id,
                            workshop: res.body.data[i].workshop,
                            quantity: res.body.data[i].quantity,
                            stockId: res.body.data[i].stockId
                        });
                        this.materStocks.push({
                            id: res.body.data[i].id,
                            workshop: res.body.data[i].workshop,
                            quantity: res.body.data[i].quantity,
                            stockId: res.body.data[i].stockId,
                            name: ''
                        });                        
                    }              
                    var isEqual = false;
                    for(var i=0;i<this.materStocks.length;i++) {
                        if(this.materStocks[i].stockId==-1) {
                            isEqual = false;
                            for(var j=0;j<this.lessMaterials.length;j++) {
                                if(this.materStocks[i].id==this.lessMaterials[j].id) {
                                    this.lessMaterials[j].quantity += this.materStocks[i].quantity
                                    isEqual = true;
                                }
                            }
                            if(!isEqual) {
                                this.lessMaterials.push({
                                    id: this.materStocks[i].id,
                                    quantity: this.materStocks[i].quantity
                                })
                            }
                        }
                    }

                    this.$http({
                        url: '/findProducts',
                        method: 'GET',
                        params: {
                            id: this.result.id
                        }
                    }).then(function(res){
                        this.goods = res.body.data;
                        this.haveGoods = true;
                        //this.$Message.info('获取货品成功');                    
                    },function(){
                        this.$Message.info('获取货品失败');
                    })
                 
                },function(){
                    this.$Message.info('获取领料信息失败');
                })
        })

        this.$watch("haveGoods", function (newValue, oldValue) {
            if(this.haveGoods){
                this.$http({
                    url: '/findAllMater',
                    method: 'GET',
                    params: {
                        goods: JSON.stringify({goods:this.goods}),
                        count: this.goods.length
                    }
                }).then(function(res){
                    this.materials = [];
                    for(var i=0;i<this.goods.length;i++){
                        for(var j=0;j<res.body.data[i].length;j++){
                            var isEqual = false;
                            for(var k=0;k<this.materials.length;k++) {
                                if(res.body.data[i][j].materialId==this.materials[k].id) {
                                    this.materials[k].quantity += res.body.data[i][j].quantity*this.goods[i].quantity;
                                    isEqual = true;
                                    break;
                                }
                            }
                            if(!isEqual) {
                                this.materials.push({
                                    no: this.materials.length+1,
                                    name: res.body.data[i][j].materialName,
                                    id: res.body.data[i][j].materialId,
                                    quantity: res.body.data[i][j].quantity*this.goods[i].quantity,
                                    num: 0,
                                    stocks: []
                                })
                            }
                        }
                    }
                    for(var i=0;i<this.materStocks.length;i++) {
                        for(var j=0;j<this.materials.length;j++) {
                            if(this.materStocks[i].id==this.materials[j].id) {
                                this.materStocks[i].name = this.materials[j].name;
                                break;
                            }
                        }
                    }
                    this.haveMater = true;
                    //this.$Message.info('获取所有原料成功');                    
                },function(){
                    this.$Message.info('获取所有原料失败');
                })
            }
        })
    },
    methods: {
        ok() {
            this.$http({
                                url: '/findNewGetList',
                                method: 'GET',
                                params: {
                                    newMaterStocks: JSON.stringify({stocks:this.materStocks}),
                                    newCount: this.materStocks.length,
                                    orderListId: this.result.id
                                }
                            }).then(function(res){
                                this.$Message.info('更新领料单成功');                    
                            },function(){
                                this.$Message.info('更新领料单失败');
                            })   
        },

        cancel() {

        },

        remind(index) {
            this.$Message.info('缺货');  
        },

        handleSearch () {
            if(this.searchConName1==''){
                console.log(123);
            }
            // 先清空结果数组
            this.clear(this.searchResults)
            // 将查询结果push到结果数组中，查询字符串为 this.searchConName1
            this.$http({
                url: '/findOrderLists',
                method: 'GET',
                params: {
                    searchName: this.searchConName1
                }
            }).then(function(res){
                this.searchResults = res.body.data;
                //this.$Message.info('获取订单列表成功');                    
            },function(){
                this.$Message.info('获取订单列表失败');
            })
            // 请后端补充代码
            // 切换表格
            this.showGoodTable = false
            this.showOrderTable = true

        },
        showMyOrders () {
            // 先清空结果数组
            this.clear(this.searchResults)
            this.$http({
                url: '/findOrderListsByUser',
                method: 'GET',
                params: {
                    user: this.user
                }
            }).then(function(res){
                this.searchResults = res.body.data;
                //this.$Message.info('获取订单列表成功');                    
            },function(){
                this.$Message.info('获取订单列表失败');
            })

            // 切换表格
            this.showGoodTable = false
            this.showOrderTable = true
        },
        checkOrder (index) {
            // 先清空结果数组
            this.clear(this.goods)
            this.clear(this.materials)
            // 将 result 订单所对应的 货品&物料 push 到goods, materials中
            // 请后端补充代码
            this.result = this.searchResults[index];
            
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
            this.$http({
                url: '/findOrderLists',
                method: 'GET',
                params: {
                    searchName: this.result.id
                }
            }).then(function(res){
                if(res.body.data[0].status=='WaitGet') {
                    this.states.push({
                        id: res.body.data[0].id,
                        managerId: res.body.data[0].user,
                        state: '待领料',
                        operate: '领料',
                        operateId: 0
                    })
                }
                else if(res.body.data[0].status=='LessMater') {
                    this.states.push({
                        id: res.body.data[0].id,
                        managerId: res.body.data[0].user,
                        state: '缺料',
                        operate: '等待进货',
                        operateId: 1
                    })
                }
                else if(res.body.data[0].status=='Product') {
                    this.states.push({
                        id: res.body.data[0].id,
                        managerId: res.body.data[0].user,
                        state: '生产中',
                        operate: '生产完成',
                        operateId: 2
                    })
                }
                else if(res.body.data[0].status=='ProDone') {
                    this.states.push({
                        id: res.body.data[0].id,
                        managerId: res.body.data[0].user,
                        state: '生产结束',
                        operate: '交付',
                        operateId: 3
                    })
                }
                else if(res.body.data[0].status=='Done') {
                    this.states.push({
                        id: res.body.data[0].id,
                        managerId: res.body.data[0].user,
                        state: '已交付',
                        operateId: 4
                    })
                }
                //this.$Message.info('获取订单列表成功');                    
            },function(){
                this.$Message.info('获取订单列表失败');
            })
        },
        cancel () {
            console.log('cancel')
        },
        output () {
            // 导出？？？？
            // 请前端补充代码
            //this.$Message.info('导出成功')
        },
        urge (state) {
            if(this.states[0].operateId==0) {
                this.$http({
                url: '/toGet',
                method: 'GET',
                params: {
                    materStocks: JSON.stringify({materStocks:this.materStocks}),
                    count: this.materStocks.length,
                    status: 'Product',
                    id: this.result.id
                }
                }).then(function(res){
                    this.$Message.info('领料成功');                    
                },function(){
                    this.$Message.info('领料失败');
                })
            }
            else if(this.states[0].operateId==1) {
            }
            else if(this.states[0].operateId==2) {
                this.$http({
                    url: '/updateOrderList',
                    method: 'GET',
                    params: {
                        id: this.result.id,
                        status: 'ProDone'
                    }
                }).then(function(res){
                    this.$Message.info('更新状态成功');                    
                },function(){
                    this.$Message.info('更新状态失败');
                })
            }
            else if(this.states[0].operateId==3) {
                this.$http({
                    url: '/updateOrderList',
                    method: 'GET',
                    params: {
                        id: this.result.id,
                        status: 'Done'
                    }
                }).then(function(res){
                    this.$Message.info('更新状态成功');                    
                },function(){
                    this.$Message.info('更新状态失败');
                })
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