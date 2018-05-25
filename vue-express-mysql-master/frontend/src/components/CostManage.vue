<template>
<div style="height: 500px;">
    <Tabs type="card">
        <Tab-pane label="货品">
            <div style = "display: inline-block;">
                <div class="query">
                    <label class="top-label">编号</label><i-input :value.sync="number" placeholder="请输入编号" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label class="top-label">名称</label><i-input :value.sync="name" placeholder="请输入名称" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label class="top-label">批次</label><i-input :value.sync="batch" placeholder="请输入批次" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label class="top-label">仓库</label><i-input :value.sync="warehouse" placeholder="请输入仓库" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <i-button class="cost-module-btn search" type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
                </div>
                <div class="query">
                    <i-button class="cost-module-btn calculate" type="ghost" shape="circle" @click="calculate()">总价计算</i-button> 
                </div>
            </div> 
            <div style = "margin-top: 20px">
                <i-table @on-selection-change='selectionClick' border :height="400" :columns="columns7" :data="table_data"></i-table>
            </div>

            <!-- <Modal title="账目合计">
                <p>所选项的金额合计为：{{sum_money}}千元</p>
            </Modal> -->
        </Tab-pane>
        <Tab-pane label="物料" style="height: 100%">
            
        </Tab-pane>
    </Tabs>          
</div>

</template>

<script>
import { Modal } from 'iview'
export default {
  name: 'CostManage',
  data () {
    return {
        number: '',
        name: '',
        batch: '',
        warehouse: '',
        columns7: [
            {
                type: 'selection',
                width: 60,
                align: 'center',
            },
            {
                title: '货品编号',
                key: 'table_product_number'
            },
            {
                title: '货品名称',
                key: 'table_name'
            },
            {
                title: '批次',
                key: 'table_batch'
            },
            {
                title: '数量',
                key: 'table_number'
            },
            {
                title: '单位',
                key: 'table_unit'
            },
            {
                title: '总价',
                key: 'table_total_price'
            },
            {
                title: '仓库',
                key: 'table_warehouse'
            }
        ],
        table_data: [

        ],
        sum_money: 0,
        modal1: false
    }
  },
 //这两个map是vuex的部分
  computed: {

  },
  methods: {
    test(){
      this.$http({
          url: '/test',
          method: 'GET',
      }).then(function (res) {
          console.log(res.body);
          this.returnData = res.body;
          //this.$router.push({path: '/hello', query:{data: res.body}})
      }, function () {
          alert("ajax failure")
      })
    },
    search() {
        this.table_data.push({table_product_number:'1511458',table_name:'测试啊',table_total_price:'5'})  
    },
    calculate() {
        this.$Modal.info(
            {
                title: '已选账目合计',
                content: '您所选项目总计金额为' + this.sum_money + '千元'
            }
        )
    },
    selectionClick(arr){
        this.sum_money = 0
        for (var i=0; i<arr.length; i++)
        {
            this.sum_money += parseInt(arr[i]["table_total_price"])
        }
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
