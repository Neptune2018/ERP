<template>
<div>
<Row>
    <i-col span="12">
        <div style="height: 520px;">
            <Card style="height: 500px;">
            <p>生成订单</p>
                <Table highlight-row ref="currentRowTable" :height="400" :columns="orderListColumns" :data="orderListData"></Table>
                <i-button type="ghost" style = "margin-top: 20px" @click="isGenerate = true">生成新订单</i-button>
                <Modal
                    v-model="isGenerate"
                    title="创建新订单"
                    @on-ok="generateOrderListOk"
                    @on-cancel="generateOrderListCancel">
                    <Form :model="formRight" label-position="right" :label-width="100">
                        <FormItem label="客户">
                            <Input v-model="generateOrderList.buyer"></Input>
                        </FormItem>
                        <FormItem label="电话">
                            <Input v-model="generateOrderList.phone"></Input>
                        </FormItem>
                        <FormItem label="邮箱">
                            <Input v-model="generateOrderList.email"></Input>
                        </FormItem>
                        <FormItem label="备注">
                            <Input v-model="generateOrderList.remark"></Input>
                        </FormItem>
                        <FormItem label="经办人">
                            <Input v-model="generateOrderList.manager"></Input>
                        </FormItem>
                    </Form>
                </Modal>
                <i-button type="ghost" style = "margin-top: 20px" @click="isAddProductf()">添加货品</i-button>  
                <Modal
                    v-model="isAddProduct"
                    title="添加货品"
                    @on-ok="addProductOk"
                    @on-cancel="addProductCancel">
                    <Form :model="formRight" label-position="right" :label-width="100">
                        <FormItem label="编号">
                            <Select v-model="addProductNo" style="width:200px">
                                <Option v-for="item in addProductNoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="货品名称">
                            <Select v-model="addProductName" style="width:200px">
                                <Option v-for="item in addProductNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="生产车间">
                            <Select v-model="addProductWorkshop" style="width:200px">
                                <Option v-for="item in addProductWorkshopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="数量">
                            <InputNumber :max="1000" :min="1" v-model="addProductNum" style="width:200px"></InputNumber>
                        </FormItem>
                        <FormItem label="剩余数目">
                            <label>{{addProductNums}}</label>
                        </FormItem>
                    </Form>
                </Modal> 
                <i-button type="ghost" style = "margin-top: 20px" @click="deleteProduct()">删除</i-button>
                <i-button type="ghost" style = "margin-top: 20px;float:right" @click="isToGenerate=true">生成订单</i-button>
                <Modal
                    v-model="isToGenerate"
                    title="确认生成订单"
                    @on-ok="isToGenerateOk"
                    @on-cancel="isToGenerateCancel">
                    <Form :model="formRight" label-position="right" :label-width="100">
                        <FormItem label="订单编号">
                            <label>{{orderListNo}}</label>
                        </FormItem>
                        <FormItem label="经办人">
                            <label>"xxx"</label>
                        </FormItem>
                        <FormItem label="截止日期">
                            <DatePicker type="date" placeholder="Select date" v-model="deadLine" style="width: 200px"></DatePicker>
                        </FormItem>
                    </Form>
                </Modal>
            </Card>
        </div>
    </i-col>
    <i-col span="12">
        <div style="height: 520px;">
            <Card style="height: 500px;">
            <p>相关物料</p>
                <i-table border :height="400" :columns="materListColumns" :data="materListData"></i-table>
                <i-button type="ghost" style = "margin-top: 20px;float:right" @click="makeGetList()">生成领料单</i-button>
                <i-button type="ghost" style = "margin-top: 20px;float:right" @click="">导出</i-button> 
            </Card>   
        </div>
    </i-col>
</Row>
</div>
</template>

<script>
import { Modal } from 'iview'
export default {
  name: 'Generate',
  created () {
      this.$watch("productConsistInfo", function (newValue, oldValue) {
          this.materListData = [];
          for(var i=0;i<this.productConsistInfo.length;i++){
              if(i==0) {
                  for(var j=0;j<this.productConsistInfo[i].consistList.length;j++){
                    this.materListData.push({
                                mater_list_no: 1,
                                mater_list_name: this.productConsistInfo[i].materInfoList[j].name,
                                mater_list_number: this.productConsistInfo[i].materInfoList[j].id,
                                mater_list_quantity: this.productConsistInfo[i].consistList[j].materNum*this.productConsistInfo[i].ProductInfo.ProductQuantity,
                                order_list_warehouse: 3
                            })
                    }
              }
              else {
                  for(var j=0;j<this.productConsistInfo[i].consistList.length;j++) {
                      var isEqual = 0;
                      for(var k=0;k<this.materListData.length;k++) {
                          if(this.productConsistInfo[i].consistList[j].materId==this.materListData[k].mater_list_number){
                              isEqual = 1;
                              this.materListData[k].mater_list_quantity += this.productConsistInfo[i].ProductInfo.ProductQuantity*this.productConsistInfo[i].consistList[j].materNum;
                          }
                      }
                      if(isEqual == 0) {
                          this.materListData.push({
                          mater_list_no: 1,
                          mater_list_name: this.productConsistInfo[i].materInfoList[j].name,
                          mater_list_number: this.productConsistInfo[i].materInfoList[j].id,
                          mater_list_quantity: this.productConsistInfo[i].consistList[j].materNum*this.productConsistInfo[i].ProductInfo.ProductQuantity,
                          order_list_warehouse: 3
                        })
                      }
                  }
              }
          }
      });
          

      this.$watch("addProductNo", function (newValue, oldValue) {
          for(var i=0;i<this.addProductNoList.length;i++){
              if(this.addProductNoList[i].value==this.addProductNo){
                  this.addProductName = this.addProductNameList[i].value;
              }
          }
          this.$http({
            url: '/findProductQuan',
            method: 'GET',
            params: {
                productId: this.addProductNo
            }
        }).then(function(res){
            this.addProductNums = res.body.remain;
        },function(){
            alert("ajax failure");
        })
      });

      this.$watch("addProductName", function (newValue, oldValue) {
          for(var i=0;i<this.addProductNameList.length;i++){
              if(this.addProductNameList[i].value==this.addProductName){
                  this.addProductNo = this.addProductNoList[i].value;
              }
          }
      })
  },
  data () {
    return {
        user: 'wenbin'
        addProductNoList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    }
                ],
        addProductNo: '',
        addProductNameList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    }
                ],
        addProductName: '',
        addProductWorkshopList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    }
                ],
        addProductWorkshop: '',
        addProductNum: 1,
        addProductNums: 0,
        generateOrderList: {
                    buyer: '',
                    phone: '',
                    email: '',
                    remark: '',
                    manager: '',
                },
        orderListColumns: [
            {
                title: '序号',
                key: 'order_list_no'
            },
            {
                title: '货品名称',
                key: 'order_list_name'
            },
            {
                title: '货品编号',
                key: 'order_list_number'
            },
            {
                title: '数量',
                key: 'order_list_quantity'
            },
            {
                title: '负责车间',
                key: 'order_list_workshop'
            }
        ],
        orderListData: [
            {
                order_list_no: 1,
                order_list_name: 'hiahia',
                order_list_number: 100,
                order_list_quantity: 1000,
                order_list_workshop:'3'
            }
        ],
        materListColumns: [
            {
                title: '序号',
                key: 'mater_list_no'
            },
            {
                title: '物料名称',
                key: 'mater_list_name'
            },
            {
                title: '物料编号',
                key: 'mater_list_number'
            },
            {
                title: '数量',
                key: 'mater_list_quantity'
            },
            {
                title: '仓库',
                key: 'order_list_warehouse'
            }
        ],
        materListData: [
        ],
        materEnough: [],
        isGenerate: false,
        isAddProduct: false,
        isToGenerate: false,
        orderListNo: 0,
        productNo: 0,
        productConsistInfo: [],
        deadLine: ''
    }
  },
 //这两个map是vuex的部分
  computed: {
  },
  methods: {
    makeGetList() {
        this.$http({
            url: '/addGetList',
            method: 'GET',
            params: {
                materials: JSON.stringify({mater:this.materListData}),
                orderListId: this.orderListNo,
                count: this.materListData.length
            }
        }).then(function(res){
            alert("succeed");
        },function(){
            alert("ajax failure");
        })
    },
    deleteProduct() {
        var deleteIndex=this.$refs.currentRowTable.cloneData[0];
        this.$http({
            url: '/deleteProduct',
            method: 'GET',
            params: {
                productId: deleteIndex.order_list_number,
                orderListId: this.orderListNo
            }
        }).then(function(res){
            alert("succeed");
        },function(){
            alert("ajax failure");
        })
        //.order_list_no
        this.orderListData.splice(deleteIndex-1,1);
        for(var i=0;i<this.productConsistInfo.length;i++){
            if(this.productConsistInfo[i].ProductInfo.ProductNumber==deleteIndex.order_list_number)
            {
                this.productConsistInfo.splice(i,1);
            }
        }
    },
    isAddProductf(){
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
    },
    isToGenerateOk(){
        this.$http({
            url: '/confirmOrderList',
            method: 'GET',
            params: {
                materials: JSON.stringify({
                    mater:this.materListData,
                    orderList:this.orderListNo
                })
            }
        }).then(function(res){
            this.materEnough = res.body.materEnough;
            this.productEnough = res.body.productEnough;
            if(!res.body.productEnough){
                alert("缺料");
            }
        },function(){
            alert("ajax failure");
        })
    },
    isToGenerateCancel(){

    },
    addProductOk(){
        this.$http({
            url: '/addBuy',
            method: 'GET',
            params: {
                quantity: this.addProductNum-this.addProductNums,
                productId: this.addProductNo,
                orderListId: this.orderListNo
                }
        }).then(function(res){
            this.orderListData.push({
                order_list_no: 1,
                order_list_name: res.body.data[0].name,
                order_list_number: res.body.data[0].id,
                order_list_quantity: res.body.quantity,
                order_list_workshop:'3'
            })
            for(var i=0;i<this.orderListData.length;i++){
                this.orderListData.order_list_no = i+1;
            }
            this.productNo = res.body.data[0].id;
            this.productConsistInfo.push({
                ProductInfo: {
                    productNo: 1,
                    productName: res.body.data[0].name,
                    ProductNumber: res.body.data[0].id,
                    ProductQuantity: res.body.quantity,
                    ProductRemain: this.addProductNums,
                    ProductWorkshop:'3'
                },
                consistList: res.body.consistList,
                materInfoList: res.body.materInfoList
            })
            alert("succeed");
        },function(){
            alert("ajax failure");
        })
        //this.$Message.info(this.addProductNum+1);
    },
    addProductCancel(){
        this.$Message.info('Clicked cancel');
    },
    //生成订单ok
    generateOrderListOk () {
        this.$http({
            url: '/product',
            method: 'GET',
            params: {
                user: this.user,
                buyer: this.generateOrderList.buyer,
                phone: this.generateOrderList.phone,
                email: this.generateOrderList.email,
                remark: this.generateOrderList.remark,
                manager: this.generateOrderList.manager
                }
        }).then(function(res){
            this.orderListNo = res.body.orderListNum;
            this.orderListData = res.body.data;
            for(var i=0;i<this.orderListData.length;i++){
                this.orderListData.order_list_no = i+1;
            }
            alert("succeed");
        },function(){
            alert("ajax failure");
        })
    },
    //生成订单cancel
    generateOrderListCancel () {
        this.$Message.info('Clicked cancel');
    },
    test(){
      this.$http({
          url: '/test',
          method: 'GET',
      }).then(function (res) {
          this.returnData = res.body;
          //this.$router.push({path: '/hello', query:{data: res.body}})
      }, function () {
          alert("ajax failure")
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.query {
    width: 12%;
    margin-left: 2%;
    margin-right: 2%;
    display: inline-block;
}
.cost-module-btn {
    color: white;
    background-color: #4169E1;
    border-color: #4169E1;
}
.cost-module-btn:hover {
    color: white;
    background-color: #4169E1;
    border-color: #4169E1;
}
.search {
    margin-left:50%;
}
.top-label {
    margin-right:5%;
}
</style>