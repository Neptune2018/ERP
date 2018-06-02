<template>
<div id="generate-page">
    <!-- <ul>
        <li>
            <label for="">序号</label>
            <label for="">货品编号</label>
            <label for="">货品名称</label>
            <label for="">数量</label>
            <label for="">负责车间</label>
        </li>
        <li v-for="good in goods">
            <label for="">{{ good.no }}</label>
            <label for="">{{ good.id }}</label>
            <label for="">{{ good.name }}</label>
            <label for="">{{ good.quantity }}</label>
            <label for="">{{ good.workshop }}</label>
        </li>
    </ul> -->
    <div id="btn-group">
        <Button id="add-good-btn" type="primary" @click="modal1 = true">添加货品</Button>
        <Button id="add-order-btn" type="primary" @click="showModal2">生产订单</Button>
        <Button id="output-btn" type="primary" @click="output">导出</Button>
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
                    <Option v-for="workshop in workshopOptions" :value="workshop">{{ workshop }}</Option>
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
        @on-cancel="cancel">

        <Form :label-width="120">
            <FormItem label="订单编号:">{{ targetOrderId }}</FormItem>
            <FormItem label="办理人:">{{ user }}</FormItem>
            <FormItem label="截止日期:">
                <DatePicker type="date" placeholder="选择日期" :options="timeOptions" v-model="deadline"></DatePicker>
            </FormItem>
        </Form>
    </Modal>
    <div id="good-table">
        <table cellspacing="10">
            <tbody>
                <tr class="table-title">
                    <th colspan="6">
                        订单信息
                    </th>
                </tr>
                <tr>
                    <th>序号</th>
                    <th>货品编号</th>
                    <th>货品名称</th>
                    <th>数量</th>
                    <th>负责车间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="good in goods">
                    <td>{{ good.no }}</td>
                    <td>{{ good.id }}</td>
                    <td>{{ good.name }}</td>
                    <td>{{ good.quantity }}</td>
                    <td>{{ good.workshop }}</td>
                    <td @click="removeGood(good)" class="del-good">删除</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="material-table">
        <table cellspacing="10">
            <tbody>
                <tr class="table-title">
                    <th colspan="5">
                        相关物料
                    </th>
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
            </tbody>
        </table>
    </div>
</div>   
</template>

<script>

export default {
    name: 'newGenerate',
    data () {
        return {
            user: '',
            targetOrderId: '',
            deadline: '',
            modal1: false,
            modal2: false,
            // 存储所有物品
            goods: [],
            materials: [],
            goodSelect: [],
            workshopSelect: '',
            goodOptions: [],
            workshopOptions: [],
            quantityInput: 1,
            timeOptions: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            }
        }
    },
    created: function () {
        // 从后端获取所有product信息
        this.$http({
            url: '/findAllProduct',
            method: 'GET'
        }).then(function(res){
            this.addProductNoList = res.body.addProductNoList;
            this.addProductNameList = res.body.addProductNameList;
            //alert("succeed");
        },function(){
            alert("ajax failure");
        })
        this.isAddProduct = true;

        // 获取当前登录人用户名
        // user = ??????

        // 临时用值
        this.user = '王健林和马化腾'

        this.goods.push({
            no: 1,
            id: 'E5080002',
            name: 'Z100 200系列电路板',
            quantity: 3,
            workshop: 2
        });

        // 此处为添加下拉框选项
        // 请后端补充代码

        // 以下两个push补充代码后可删除
        this.goodOptions.push({
            id: 'E5080002',
            name: 'Z100 200系列电路板'
        })
        this.workshopOptions.push(1);
        // this.materials.push({
        //     no: 1,
        //     name: '0603电阻（30Ω）',
        //     id: 'R400621',
        //     quantity: 2,
        //     warehouse: 1
        // })
    },
    methods: {
        removeGood(good) {
            for ( var i = 0; i < this.goods.length; i++ ) {
                if ( good.id == this.goods[i].id ) {
                    // 查询所删除项对应的物料品种和个数，并删除
                    // 删除时请使用 removeMaterial(id, quantity)
                    // id为物料编号，quantity为个数
                    // 请后端补充代码

                    // 删除所选货品项
                    this.goods.splice(i, 1);
                }
            }
            for ( var i = 0; i < this.goods.length; i++ ) {
                this.goods[i].no = i + 1;
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
            for ( var i = 0; i < this.goods.length; i++ ) {
                if ( this.goodSelect == this.goods[i].id && this.workshopSelect == this.goods[i].workshop ) {
                    this.goods[i].quantity += this.quantityInput;
                    found = true;

                    // 请在此处增加物料，直接调用removeMaterial(id, quantity), 其中quantity取负数
                    // removeMaterail('螺丝', -1) 即添加一个螺丝
                }
            }
            if ( !found ) {
                var nameSelect = '';
                for ( var i = 0; i < this.goodOptions.length; i++ ) {
                    if ( this.goodSelect == this.goodOptions[i].id ) {
                        nameSelect = this.goodOptions[i].name;
                    }
                }
                this.goods.push({
                    no: this.goods.length + 1,
                    id: this.goodSelect,
                    name: nameSelect,
                    quantity: this.quantityInput,
                    workshop: this.workshopSelect
                })
            }
        },
        cancel() {
            console.log('cancel');
        },
        showModal2() {
            this.modal2 = true;

            // 生成订单编号
            // 请后端补充代码
            this.targetOrderId = 'BX12345678';
        },
        okAddOrder() {
            // 将最终的订单添加到数据库中
            // 请后端补充代码

            // 以下为可以从前端得到的所有值
            console.log(this.user);
            console.log(this.targetOrderId);
            console.log(this.deadline);
            console.log(this.goods[0].id);
            console.log(this.materials);
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