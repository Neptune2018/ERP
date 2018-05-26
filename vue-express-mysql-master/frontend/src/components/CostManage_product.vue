<template>
<div style="height: 500px;">
    <Tabs type="card">
        <Tab-pane label="货品库存信息">
             <div style = "display: inline-block">
                <div class="query">
                    <label class="top-label">编号</label><i-input v-model="product_number" placeholder="请输入编号" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label class="top-label">名称</label><i-input v-model="product_name" placeholder="请输入名称" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label class="top-label">批次</label><i-input v-model="product_batch" placeholder="请输入批次" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label class="top-label">仓库</label><i-input v-model="product_warehouse" placeholder="请输入仓库" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <i-button class="cost-module-btn search" type="ghost" icon="ios-search" shape="circle" @click="product_search()">搜索</i-button>
                </div>
                <div class="query">
                    <i-button class="cost-module-btn calculate" type="ghost" shape="circle" @click="product_calculate()">总价计算</i-button> 
                </div>
            </div> 
            <div style = "margin-top: 20px">
                <i-table @on-selection-change='product_selectionClick' border :height="400" :columns="product_columns7" :data="product_table_data"></i-table>
            </div>  
        </Tab-pane>
    </Tabs>          
</div>

</template>

<script>
export default {
  name: 'CostManage_product',
  data () {
    return {
        product_number: '',
        product_name: '',
        product_batch: '',
        product_warehouse: '',
        product_columns7: [
            {
                type: 'selection',
                width: 60,
                align: 'center',
            },
            {
                title: '货品编号',
                key: 'product_table_product_number'
            },
            {
                title: '货品名称',
                key: 'product_table_name'
            },
            {
                title: '批次',
                key: 'product_table_batch'
            },
            {
                title: '数量',
                key: 'product_table_number'
            },
            {
                title: '单位',
                key: 'product_table_unit'
            },
            {
                title: '单价(元)',
                key: 'product_table_price'
            },
            {
                title: '仓库',
                key: 'product_table_warehouse'
            }
        ],
        product_table_data: [

        ],
        product_sum_money: 0,
        sqlSearch:'',
    }
  },
 //这两个map是vuex的部分
  computed: {

  },
  methods: {
    product_search() {
        this.sqlSearch=''
        this.sqlSearch="select product.id as product_table_product_number,product.name as product_table_name,product.price as product_table_price,stock.batch as product_table_batch,stock.remain as product_table_number,stock.unit as product_table_unit,stock.repertoryId as product_table_warehouse from stocks as stock left outer join products as product on stock.productId=product.id where stock.style=1"
        if(this.product_number!=''){
            this.sqlSearch+=" and product.id="
            this.sqlSearch+=this.product_number
            console.log(this.sqlSearch)
        }
        if(this.product_name!=''){
            this.sqlSearch+=" and product.name='"
            this.sqlSearch+=this.product_name
            this.sqlSearch+="'"
            console.log(this.sqlSearch)
        }
        if(this.product_batch!=''){
            this.sqlSearch+=" and stock.batch='"
            this.sqlSearch+=this.product_batch
            this.sqlSearch+="'"
            console.log(this.sqlSearch)
        }
        if(this.product_warehouse!=''){
            this.sqlSearch+=" and stock.repertoryId="
            this.sqlSearch+=this.product_warehouse
            console.log(this.sqlSearch)
        }

        this.$http({
            url: '/cmproductquery?sql='+this.sqlSearch,
            method: 'GET',
        }).then(function (res) {
            console.log(res.body)
            this.product_table_data=res.body[0]
        }, function () {
            alert("ajax failure")
        })
    },
    product_calculate() {
        this.$Modal.info(
            {
                title: '已选账目合计',
                content: '您所选项目总计金额为' + this.product_sum_money + '元'
            }
        )
    },
    product_selectionClick(arr){
        this.product_sum_money = 0
        for (var i=0; i<arr.length; i++)
        {
            if (arr[i]["product_table_unit"] == "千个")
            {
                this.product_sum_money += parseInt(arr[i]["product_table_price"]) * parseInt(arr[i]["product_table_number"]) * 1000
            }
            else if (arr[i]["product_table_unit"] == "个")
            {
                this.product_sum_money += parseInt(arr[i]["product_table_price"]) * parseInt(arr[i]["product_table_number"])
            }
        }
    },
    onload(){
      this.$http({
          url: '/costmoduleonload',
          method: 'GET',
      }).then(function (res) {
          this.product_table_data=res.body[0]
        
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
