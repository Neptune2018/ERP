<template>
<div style="height: 500px;">
    <Tabs type="card">
        <Tab-pane label="货品">
            <div style = "display: inline-block;">
                <div class="query">
                    <label>编号</label><i-input :value.sync="number" placeholder="请输入编号" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label>名称</label><i-input :value.sync="name" placeholder="请输入名称" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label>批次</label><i-input :value.sync="batch" placeholder="请输入批次" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <label>仓库</label><i-input :value.sync="warehouse" placeholder="请输入仓库" style="width: 70%"></i-input>
                </div>
                <div class="query">
                    <i-button type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
                </div>
                <div class="query">
                    <i-button type="ghost" shape="circle" @click="search()">总价计算</i-button>
                </div>
            </div> 
            <div style = "margin-top: 20px">
                <i-table border :height="400" :columns="columns7" :data="table_data"></i-table>
            </div>
        </Tab-pane>
        <Tab-pane label="物料" style="height: 100%">
            
        </Tab-pane>
    </Tabs>
</div>
</template>

<script>

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
                align: 'center'
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
                title: '总价',
                key: 'table_total_price'
            },
            {
                title: '仓库',
                key: 'table_warehouse'
            }
        ],
        table_data: [

        ]
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
        this.table_data.push({table_product_number:'1511458',table_name:'测试啊'})  
    }

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
</style>
