
<template>
  <div style="height: 500px;">
    <div style="height: 70px; position: relative">
        <div class="top">
          <div class="query">
            <label class="top-label">货号</label><i-input v-model="product_number" placeholder="请输入货号" style="width: 60%"></i-input>
          </div>
          <div class="query">
            <label class="top-label">货品名称</label><i-input v-model="product_name" placeholder="请输入货品名称" style="width: 60%"></i-input>
          </div>
          <div class="query">
            <label class="top-label">物料反查</label><i-input v-model="material_name" placeholder="请输入物料名称" style="width: 60%"></i-input>
          </div>
            <i-button class="search" type="ghost" icon="ios-search" shape="circle" @click="product_search()">搜索</i-button>
        </div>
    <div style="width: 35%;float: left;margin: 0.5% 1% ">
      <row>
      <i-button class="oper" type="primary" @click="product_add = true">新增货品</i-button>
    <Modal
        v-model="product_add"
        title="新增货品"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="q">
            <label class="model1">货品编号</label><i-input v-model="add_number" placeholder="请输入货号" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">货品名称</label><i-input v-model="add_name" placeholder="请输入货品名称" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">货品类别</label></label><i-input v-model="add_property" placeholder="类别" style="width: 60%"></i-input>
          </div>

    </Modal>
      <i-button class="oper" type="primary" @click="product_modify = true">修改货品信息</i-button>
      <Modal
         v-model="product_modify"
        title="修改货品信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="q">
            <label class="model2">货品编号</label><i-input v-model="modify_number" placeholder="请输入货号" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">货品名称</label><i-input v-model="modify_name" placeholder="请输入货品名称" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">货品类别</label></label><i-input v-model="modify_property" placeholder="类别" style="width: 60%"></i-input>
          </div>
    </Modal>
        <i-button class="oper" type="primary">打印</i-button>
      </row>
      <row style="margin-top: 1%">
        <i-button class="oper" type="primary" @click="handleSelectAll(true)">全选</i-button>
        <i-button class="oper" type="primary" @click="handleSelectAll(false)">全清</i-button>
      <i-button class="oper" type="primary">删除</i-button>
      <i-button class="oper" type="primary">导出</i-button>
      </row>
    </div>
    </div>
        <div style = "margin-top: 10px">
          <i-table border :height="200" :columns="columns1" :data="data1"></i-table>
          <i-table ref="selection" border :height="200" :columns="columns2" :data="data2"></i-table>
        </div>
  </div>
</template>

<script>
  import ICol from "../../node_modules/iview/src/components/grid/col.vue";
  import Slider from "../../node_modules/iview/src/components/slider/slider.vue";
  import Button from "../../node_modules/iview/src/components/button/button.vue";
  import Row from "../../node_modules/iview/src/components/grid/row.vue";
  export default {
    components: {
      Row,
      Button,
      Slider,
      ICol},
    name: 'Goods',
    data () {
      
      //一定要有return！！
      return{
        product_number: '',
        product_name: '',
        material_name: '',
        table_data: '',
        product_add : false,
        product_modify:false,
        columns2: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '序号',
            key: 'num',
            sortable:'true'
          },
          {
            title: '货品编号',
            key: 'id',
            sortable:'true'
          },
          {
            title: '货品名称',
            key: 'name'
          },
          {
            title: '创建日期',
            key: 'add_time',
            sortable:'true'
          },
          {
            title: '类别',
            key: 'productCateId'
          }
        ],
        data2:[
          {
            num:'1',
            id:'23232',
            name:'田斯予',
            add_time:'2018-5-27',
            productCateId:'X'

          },
          {
            num:'2',
            id:'66666666',
            name:'田斯予快做',
            add_time:'2018-5-27',
            productCateId:'Y'

          },
       

        ],
      }
    },
    created() {
    this.$http({
      url: '/getProducts',
      method: 'GET'
    }).then(
      function(res) {
        this.$Message.success('获取数据成功')
        this.table_data = res.body.data
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
      },
      function() {
        this.$Message.error('获取数据失败')
      }
    )
  }, 
    methods: {

      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },
      product_search() {
        

        this.$http({
            url: '/productSearch',
            method: 'GET',
            params:{
              product_number: this.product_number,
              product_name: this.product_name
            }
        }).then(function (res) {
            console.log(res.body)            
            this.table_data = res.body.data
        }, function () {
            alert("ajax failure")
        })
    },
    }
  }
</script>

<style scoped>
  .top{
    float: left;
    display: inline-block;
    margin: 1% 1% 1% 1%;
    width: 60%;
  }
  .query {
    width: 27%;
    margin-left: 0.5%;
    margin-right: 0.5%;
    display: inline-block;
  }

  .oper{
    color: #1c2438;
    margin-left: 5%;
    background-color: #e6e6e6;
  }

  .cost-module-btn:hover {
    color: white;
    background-color: #4169E1;
    border-color: #4169E1;
  }

  .search {
    color: black;
    background-color: #e6e6e6;
    margin-left:2%;
    width: 10%;
  }

  .top-label {
    margin-right:5%;
  }
   .q {
    width: 100%;
    margin-top: 5%;
    margin-left: 15%;
    margin-right: 15%;
    display: inline-block;
    vertical-align: middle;
  }
</style>
