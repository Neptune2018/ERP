
<template>
  <div style="height: 500px;">
    <div style="height: 70px; position: relative">
        <div class="top">
          <div class="query">
            <label class="top-label">货品编号</label><i-input v-model="product_number" placeholder="请输入货品编号" style="width: 60%"></i-input>
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
      <i-button class="oper" type="primary">新增货品</i-button>
      <i-button class="oper" type="primary">修改货品信息</i-button>
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
        <div >
          <i-table  class="show" border  :width="300" :columns="columns1" :data="data1"></i-table>
          <i-table  class="show" ref="selection" border :width="700" :columns="columns2" :data="data2"></i-table>
        </div>
  </div>
</template>

<script>
  import Button from "../../node_modules/iview/src/components/button/button.vue";
  import Row from "../../node_modules/iview/src/components/grid/row.vue";
  export default {
    components: {
      Row,
      Button,
    },
    name: 'Goods',
    data () {
      //一定要有return！！
      return{
        columns1:[
          {
           type:'index',
           width: 60,
           align:'center'
          },
          {
            title:'分类情况',
            key:''
          }

        ],
        data1:[

        ],
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
    methods: {
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      }
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
  .show{
    margin: 1% 1%;
    float: left;
    height:300px;
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
</style>
