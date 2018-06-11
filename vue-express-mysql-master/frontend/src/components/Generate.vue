<template>
<div id="generate-page">
    <div id="btn-group">
        <Button id="add-good-btn" type="primary" @click="showModal1">添加货品</Button>
        <Button id="add-order-btn" type="primary" @click="showModal2">生成订单</Button>
        <Button id="output-btn" type="primary" @click="output">导出</Button>
        <Button id="get-list-btn" type="primary" @click="getList">查看领料单</Button>
        
    </div>

    <Modal
        v-model="modal1"
        title="添加货品"
        @on-ok="okAddGood"
        @on-cancel="cancel">
        <Form :label-width="120">
            <FormItem label="编号/货品名称：">
                <Select v-model="goodSelect">
                    <Option v-for="good in goodOptions" :value="good.id">{{ good.id }} &nbsp;/&nbsp; {{good.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="生产车间：">
                <Select v-model="workshopSelect">
                    <Option v-for="workshop in workshopOptions" :value="workshop.id">{{ workshop.id }}</Option>
                </Select>
            </FormItem>
            <FormItem label="数量：">
                <Input-number v-model="quantityInput" :min="1" :precision="0"></Input-number>
            </FormItem>
        </Form>
    </Modal>
    <Modal
        v-model="modal2"
        title="订单生成确认"
        @on-ok="okAddOrder"
        @on-cancel="cancelAddOrder">

        <Form :label-width="120">
            <FormItem label="订单编号:">{{ orderList.id }}</FormItem>
            <FormItem label="客户">
                <Input v-model="orderList.buyer"></Input>
            </FormItem>
            <FormItem label="电话">
                <Input v-model="orderList.phone"></Input>
            </FormItem>
            <FormItem label="邮箱">
                <Input v-model="orderList.email"></Input>
            </FormItem>
            <FormItem label="备注">
                <Input v-model="orderList.remark"></Input>
            </FormItem>
            <FormItem label="办理人:">{{ user }}</FormItem>
            <FormItem label="截止日期:">
                <DatePicker type="date" placeholder="选择日期" format="yyyy-MM-dd" :options="timeOptions" :value="orderList.schedule" @on-change="hia"></DatePicker>
            </FormItem>
        </Form>
    </Modal>
    <Modal
        v-model="modal3"
        title="领料单"
        @on-ok="okOrderList"
        @on-cancel="cancelOrderList">
        <div style="width:100%">
            <Table height="400" border :columns="materStockColumns" :data="materStocks"></Table>
        </div>
    </Modal>
        <Row>
            <Col span="12">
                <Card>
                    <Card>货品信息</Card>
                    <Table height="400" border :columns="goodColumns" :data="goods"></Table>
                </Card>
            </Col>
            <Col span="12">
                <Card>
                    <Card>相关物料</Card>
                    <Table height="400" border :columns="materialsColumns" :data="materials"></Table>
                </Card>
            </Col>
        </Row>
    <!-- </div> -->
</div>   
</template>

<script>

export default {
    name: 'Generate',
    data () {
        return {
        materStockColumns: [
            {
                title: '工位',
                key: 'workshop'
            },
            {
                title: '物料名称',
                key: 'name'
            },
            {
                title: '物料编号',
                key: 'id'
            },
            {
                title: '数量',
                key: 'quantity'
            },
            {
                title: '仓库',
                key: 'stockId'
            }
        ],
        materialsColumns: [
            {
                title: '序号',
                key: 'no'
            },
            {
                title: '物料名称',
                key: 'name'
            },
            {
                title: '物料编号',
                key: 'id'
            },
            {
                title: '数量',
                key: 'quantity'
            },
            {
                title: '剩余数目',
                key: 'num'
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (h, params) => {
                    if(this.materials[params.index].quantity>this.materials[params.index].num) {
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
        goodColumns: [
            {
                title: '序号',
                key: 'no',
            },
            {
                title: '货品编号',
                key: 'id',
            },
            {
                title: '货品名称',
                key: 'name',
            },
            {
                title: '数量',
                key: 'quantity',
            },
            {
                title: '负责车间',
                key: 'workshop',
            },
            {
                title: '操作',
                key: 'action',
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
                                    this.removeGood(params.index)
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
            //当前操作进度
            process: 0,
            //用户ID
            user: 1,
            //记录订单信息
            orderList: {
                id: '',
                schedule: '',
                start: '',
                buyer: '',
                phone: '',
                email: '',
                remark: ''
            },
            //是否显示货品
            modal1: false,
            //是否显示生成订单
            modal2: false,
            modal3: false,
            //存储所有订单已填加货品
            goods: [],
            //为订单列表添加的goods
            goodsOrder: [],
            //存储所有所需物料
            materials: [],
            //添加货品选中的货品id
            goodSelect: '',
            //添加货品选中的车间id
            workshopSelect: '',
            //所有货品
            goodOptions: [],
            //所有车间
            workshopOptions: [],
            //该货品数量
            quantityInput: 1,
            materialNum: 0,
            //记录按工位分别的material数量信息
            materStations: [],
            //记录领料单信息
            materStocks: [],
            timeOptions: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            }
        }
    },
    created: function () {
        //监听materials，判断原料是否充足
        this.$watch("materials", function (newValue, oldValue) {
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
                var linshi = this.materials[0]
                },function(){
                    this.$Message.info('Get MaterialNum Failed');
                })
        })

        //监听goods内容，修改materials信息
        this.$watch("goods", function (newValue, oldValue) {
            this.materials = [];
            for(var i=0;i<this.goods.length;i++) {
                for(var j=0;j<this.goods[i].materials.length;j++) {
                    var isEqual = false;
                    for(var k=0;k<this.materials.length;k++) {
                        if(this.goods[i].materials[j].materialId==this.materials[k].id) {
                            isEqual = true;
                            this.materials[k].quantity += this.goods[i].quantity * this.goods[i].materials[j].quantity
                        }
                    }
                    if(!isEqual) {
                        this.materials.push({
                            no: this.materials.length + 1,
                            name: this.goods[i].materials[j].materialName,
                            id: this.goods[i].materials[j].materialId,
                            quantity: this.goods[i].quantity * this.goods[i].materials[j].quantity,
                            warehouse: 1,
                            num: 0,
                            stocks: []
                        })
                    }
                }
            }
        })
        // 从后端获取所有product信息
        this.$http({
            url: '/findGoodOptions',
            method: 'GET'
        }).then(function(res){
            this.goodOptions = res.body.goodOptions;
            this.workshopOptions = res.body.stations;
            //this.$Message.info('Product Succeed');
        },function(){
            this.$Message.info('Product Failed');
        })
        this.isAddProduct = true;
    },
    methods: {
        hia(time) {
            this.orderList.schedule = time;       
        },
        okOrderList() {
            this.$http({
                    url: '/findGetLists',
                    method: 'GET',
                    params: {
                        orderListId: this.orderList.id,
                        materStock: JSON.stringify({materStocks:this.materStocks}),
                        count: this.materStocks.length
                    }
                }).then(function(res){
                    this.$Message.info('Add GetList succeed');                    
                },function(){
                    this.$Message.info('Add GetList Failed');
                })
                this.process=2;
        },
        cancelOrderList() {
            this.$http({
                url: '/deleteGetLists',
                method: 'GET',
                params: {
                    orderListId: this.orderList.id,
                    materStock: JSON.stringify({materStocks:this.materStocks}),
                    count: this.materStocks.length
                }
            }).then(function(res){                 
            },function(){
                this.$Message.info('delete GetList Failed');
            })
        },
        getList() {
            if(this.process==1) {
                this.materStations=[];
                this.materStocks=[];
                for(var i=0;i<this.goods.length;i++) {
                    for(var j=0;j<this.goods[i].materials.length;j++) {
                        var isEqual = false;
                        for(var k=0;k<this.materStations.length;k++) {
                            if(this.goods[i].workshop == this.materStations[k].workshop && this.goods[i].materials[j].materialId == this.materStations[k].id) {
                                this.materStations[k].quantity += this.goods[i].quantity*this.goods[i].materials[j].quantity;
                                isEqual = true;
                            }
                        }
                        if(!isEqual) {
                            this.materStations.push({
                                name: this.goods[i].materials[j].materialName,
                                id: this.goods[i].materials[j].materialId,
                                quantity: this.goods[i].quantity*this.goods[i].materials[j].quantity,
                                workshop: this.goods[i].workshop
                            })
                        }
                    }
                }
                for(var i=0;i<this.materStations.length;i++) {
                    for(var j=0;j<this.materials.length;j++) {
                        if(this.materStations[i].id==this.materials[j].id) {
                            var quantityNeed = this.materStations[i].quantity;
                            for(var k=0;k<this.materials[j].stocks.length;k++) {
                                if(quantityNeed<=this.materials[j].stocks[k].remain) {
                                    this.materStocks.push({
                                        id: this.materStations[i].id,
                                        name: this.materStations[i].name,
                                        workshop: this.materStations[i].workshop,
                                        quantity: quantityNeed,
                                        stockId: this.materials[j].stocks[k].id
                                    })
                                    this.materials[j].stocks[k].remain -= quantityNeed;
                                    quantityNeed = 0;
                                    break;
                                }
                                else {
                                    this.materStocks.push({
                                        id: this.materStations[i].id,
                                        name: this.materStations[i].name,
                                        workshop: this.materStations[i].workshop,
                                        quantity: this.materials[j].stocks[k].remain,
                                        stockId: this.materials[j].stocks[k].id
                                    })
                                    quantityNeed -= this.materials[j].stocks[k].remain;
                                    this.materials[j].stocks[k].remain = 0;
                                    break;
                                }
                            }
                            if(quantityNeed != 0) {
                                this.materStocks.push({
                                        id: this.materStations[i].id,
                                        name: this.materStations[i].name,
                                        workshop: this.materStations[i].workshop,
                                        quantity: quantityNeed,
                                        stockId: -1
                                    })
                            }
                        }
                    }
                }
                this.$http({
                    url: '/addGetLists',
                    method: 'GET',
                    params: {
                        orderListId: this.orderList.id,
                        materStock: JSON.stringify({materStocks:this.materStocks}),
                        count: this.materStocks.length
                    }
                }).then(function(res){
                    //this.$Message.info('Get GetList succeed');                    
                },function(){
                    this.$Message.info('Add GetList Failed');
                })
                this.modal3 = true;
            }
            else if(this.process<1) {
                this.$Message.info('请先生成订单');
            }
            else if(this.process>1) {
                this.$Message.info('您已生成过领料单');
            }
        },

        remind(index) {
            this.$Message.info('缺货');  
        },

        removeGood(index) {
            if(this.process==0){
                for ( var i = 0; i < this.goods.length; i++ ) {
                    this.goods[i].no = i + 1;
                }
            }
            else {
                this.$Message.info('订单已提交，无法更改');
            }
        },

        // 当quantity为负数时即为增加
        removeMaterial(id, quantity) {
            for( var i = 0; i < this.materials.length; i++ ) {
                if ( id == this.materials[i].id ) {
                    this.materials[i].quantity -= quantity;
                    if ( this.materials[i].quantity == 0 ) {
                        this.materials.splice(i, 1);
                    }
                }
            }
        },
        okAddGood() {
            var found = false;
            var goodsOrderFound = false;
            for ( var i = 0; i < this.goods.length; i++ ) {
                if ( this.goodSelect == this.goods[i].id && this.workshopSelect == this.goods[i].workshop ) {
                    this.goods[i].quantity += this.quantityInput;
                    found = true;
                }
            }
            if ( !found ) {
                var nameSelect = '';
                for ( var i = 0; i < this.goodOptions.length; i++ ) {
                    if ( this.goodSelect == this.goodOptions[i].id ) {
                        nameSelect = this.goodOptions[i].name;
                    }
                }
                this.$http({
                    url: '/findMaterials',
                    method: 'GET',
                    params: {
                        productId: this.goodSelect
                    }
                }).then(function(res){
                    this.goods.push({
                        no: this.goods.length + 1,
                        id: this.goodSelect,
                        name: nameSelect,
                        quantity: this.quantityInput,
                        workshop: this.workshopSelect,
                        materials: res.body.data
                    })
                    this.$Message.info('Add Product Succeed');
                },function(){
                    this.$Message.info('Add Product Failed');
                })
            }
            else {
                this.goods.push(1);
                this.goods.splice(this.goods.length-1,1);
            }
        },
        cancel() {
            console.log('cancel');
        },
        showModal1() {
            if(this.process==0) {
                this.modal1 = true
            }
            else {
                this.$Message.info('订单已提交，无法添加');
            }
        },
        showModal2() {
            if(this.process==0) {
                this.modal2 = true;                                
                this.$http({
                    url: '/addOrderList',
                    method: 'GET'
                }).then(function(res){
                    this.orderList.id = res.body.id;
                },function(){
                    this.$Message.info('Add OrderList Failed');
                })
            }
            else {
                this.$Message.info('已生成过订单');
            }
            // 生成订单编号
            // 请后端补充代码
        },
        okAddOrder() {
            // 将最终的订单添加到数据库中
            // 请后端补充代码
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            if(month<10) {
                month = '0'+month;
            }
            if(day<10) {
                day = '0'+day;
            }
            this.orderList.start = year + '-' + month + '-' + day;
            var products = [];
            for(var i=0;i<this.goods.length;i++) {
                var isHave = false;
                for(var j=0;j<products.length;j++) {
                    if(this.goods[i].id==products[j].id) {
                        isHave = true;
                        products[j].quantity += this.goods[i].quantity;
                    }
                }
                if(!isHave) {
                    products.push({
                        id: this.goods[i].id,
                        quantity: this.goods[i].quantity
                    })
                }
            }
            this.$http({
                url: '/addBuys',
                method: 'GET',
                params: {
                    user: this.user,
                    orderListId: this.orderList.id,
                    schedule: this.orderList.schedule,
                    start: this.orderList.start,
                    buyer: this.orderList.buyer,
                    phone: this.orderList.phone,
                    email: this.orderList.email,
                    remark: this.orderList.remark,
                    products: JSON.stringify({products: products}),
                    count: products.length
                }
            }).then(function(res){
                this.$Message.info('Add Buys succeed');                
            },function(){
                this.$Message.info('Add Buys Failed');
            })
            this.process = 1;
        },
        cancelAddOrder() {
            this.$http({
                url: '/deleteOrderList',
                method: 'GET',
                params: {
                    id: this.orderList.id
                }
            }).then(function(res){
            },function(){
                this.$Message.info('delete OrderList Failed');
            })
        },
        output() {
            // 导出？？？？
            // 请前端补充代码
            this.$Message.info('导出成功');
        }
    }
}
</script>
<style scoped>
#good-table, #material-table {
    text-align: center;
    width: 48%;
    display: inline-block;
    height: 100%;
    margin: 0 5px;
    vertical-align: top;
    border-collapse:collapse；
}
#good-table {
    border-right: 1px solid #eee;

}
.table-title {
    border-collapse: collapse;
    background: #f1f1f1;
    line-height: 25px;
}
#generate-page table {
    width: 100%;
}
#generate-page {
    height: 100%;
}
#generate-page button {
    background-color: #464c5b;
    border: none;

}
#btn-group {
    margin: 5px 15px;
}
#generate-page .ivu-modal-header, .ivu-modal-footer {
    border: none;
}
.del-good {
    color: blue;
    cursor: pointer;
}

</style>