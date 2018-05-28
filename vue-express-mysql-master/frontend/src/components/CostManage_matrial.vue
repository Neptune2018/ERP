<template>
<div style="height: 500px;">
    <Tabs type="card">
         <Tab-pane label="物料库存信息">
             <div style = "display: inline-block">
                <div class="query">
                    <label class="top-label">编号</label><i-input v-model="matrial_number" placeholder="请输入编号" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label class="top-label">名称</label><i-input v-model="matrial_name" placeholder="请输入名称" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label class="top-label">批次</label><i-input v-model="matrial_batch" placeholder="请输入批次" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label class="top-label">仓库</label><i-input v-model="matrial_warehouse" placeholder="请输入仓库" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <i-button class="cost-module-btn search" type="ghost" icon="ios-search" shape="circle" @click="matrial_search()">搜索</i-button>
                </div>
                <div class="query">
                    <i-button class="cost-module-btn calculate" type="ghost" shape="circle" @click="matrial_calculate()">总价计算</i-button> 
                </div>
            </div> 
            <div style = "margin-top: 20px">
                <i-table @on-selection-change='matrial_selectionClick' border :height="400" :columns="matrial_columns8" :data="matrial_table_data"></i-table>
            </div>  
        </Tab-pane>   
    </Tabs>       
</div>

</template>

<script>
export default {
  name: 'CostManage_matrial',
  data () {
    return {
        matrial_number: '',
        matrial_name: '',
        matrial_batch: '',
        matrial_warehouse: '',
        matrial_columns8: [
            {
                type: 'selection',
                width: 60,
                align: 'center',
            },
            {
                title: '物料编号',
                key: 'matrial_table_matrial_number'
            },
            {
                title: '物料名称',
                key: 'matrial_table_name'
            },
            {
                title: '批次',
                key: 'matrial_table_batch'
            },
            {
                title: '数量',
                key: 'matrial_table_number'
            },
            {
                title: '单位',
                key: 'matrial_table_unit'
            },
            {
                title: '单价(元)',
                key: 'matrial_table_price'
            },
            {
                title: '仓库',
                key: 'matrial_table_warehouse'
            },
            {
                title: '供应商',
                key: 'matrial_table_supplier'
            }
        ],
        matrial_table_data: [

        ],
        matrial_sum_money: 0,
        sqlSearch:''
    }
  },
 //这两个map是vuex的部分
  computed: {

  },
  methods: {
    matrial_search() {
        this.sqlSearch=''
        this.sqlSearch="select stock.materialId as matrial_table_matrial_number,material.name as matrial_table_name,offer.price as matrial_table_price,stock.batch as matrial_table_batch,stock.remain as matrial_table_number,stock.unit as matrial_table_unit,stock.repertoryId as matrial_table_warehouse,suppliers.name as matrial_table_supplier from stocks as stock left outer join offers as offer on stock.batch=offer.batch and stock.materialId=offer.materialId left outer join materials as material on stock.materialId=material.id left outer join offer_lists on offer.offerListId=offer_lists.id left outer join suppliers on offer_lists.supplierId=suppliers.id WHERE stock.style=false"
        if(this.matrial_number!=''){
            this.sqlSearch+=" and stock.materialId="
            this.sqlSearch+=this.matrial_number
        }
        if(this.matrial_name!=''){
            this.sqlSearch+=" and material.name='"
            this.sqlSearch+=this.matrial_name
            this.sqlSearch+="'"
        }
        if(this.matrial_batch!=''){
            this.sqlSearch+=" and stock.batch='"
            this.sqlSearch+=this.matrial_batch
            this.sqlSearch+="'"
        }
        if(this.matrial_warehouse!=''){
            this.sqlSearch+=" and stock.repertoryId="
            this.sqlSearch+=this.matrial_warehouse
        }
        this.$http({
            url: '/cmmaterialquery?sql='+this.sqlSearch,
            method: 'GET',
        }).then(function (res) {
            console.log(res.body)
            this.matrial_table_data=res.body[0]
        }, function () {
            alert("ajax failure")
        })
    },
    matrial_calculate() {
        this.$Modal.info(
            {
                title: '已选账目合计',
                content: '您所选项目总计金额为' + this.matrial_sum_money + '元'
            }
        )
    },
    matrial_selectionClick(arr){
        this.matrial_sum_money = 0
        for (var i=0; i<arr.length; i++)
        {
            if (arr[i]["matrial_table_unit"] == "千个")
            {
                this.matrial_sum_money += parseInt(arr[i]["matrial_table_price"]) * parseInt(arr[i]["matrial_table_number"]) * 1000
            }
            else if (arr[i]["matrial_table_unit"] == "个")
            {
                this.matrial_sum_money += parseInt(arr[i]["matrial_table_price"]) * parseInt(arr[i]["matrial_table_number"])
            }
        }
    },
    onload(){
      this.$http({
          url: '/costmoduleonloadmtr',
          method: 'GET',
      }).then(function (res) {
          this.matrial_table_data=res.body[0]
        
      }, function () {
          alert("ajax failure")
      })
    },   
  },
  created () {
      this.onload()
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
