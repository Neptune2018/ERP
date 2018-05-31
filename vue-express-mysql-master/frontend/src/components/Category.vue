
<template>
  <div style="height: 500px;">
    <div class="top">
        <div class="query"style="width: 25%">
          <i-input  placeholder="请输入关键词" style="width: 60%"></i-input>
        </div>
        <div class="query" style="width: 10%">
        <i-button class="search" type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
        </div>
      <div style="display: inline-block">
        <table cellspacing="10">
          <tr>
            <td><i-button class="oper" type="primary" >新增子分类</i-button></td>
            <td><i-button class="oper" type="primary" >删除分类</i-button></td>
            <td></td>
            <td><i-button class="oper" type="primary">导出分类</i-button></td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <div class="show" style="width: 45%">
        <i-table highlight-row  border :height="200"  :columns="porduct_columns1" :data="porduct_data1"  @on-current-change="handleRowChange"></i-table>
      </div>
      <div class="show" style="width: 45%">
        <i-table highlight-row  border :height="200" :columns="material_columns1" :data="material_data1" @on-current-change="handleRowChange"></i-table>
      </div>
    </div>
    <div>
    <div class="show" style="width: 45%">
      <i-table  stripe border :height="200" :columns="porduct_columns1" :data="porduct_data1"></i-table>
    </div>
    <div class="show" style="width: 45%">
      <i-table stripe border :height="200" :columns="material_columns2" :data="material_data2"></i-table>
    </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    data () {

      //一定要有return！！
      return{
        porduct_columns1:[
          {
            type:'index',
            width:60,
            align:'center'
          },
          {
            title:'货品分类情况',
            key:'sort'
          }
        ],
        porduct_data1:[
        ],

        material_columns1:[
          {
            type:'index',
            width:60,
            align:'center'
          },
          {
            title:'物料分类情况',
            key:'sort'
          }
        ],
        material_data1:[
        ],

        porduct_columns2:[
          {
            type:'index',
            width:60,
            align:'center'
          },
          {
            title:'该分类下货品',
            key:'porduct_name'
          }
        ],
        porduct_data2:[
        ],
        material_columns2:[
          {
            type:'index',
            width:60,
            align:'center'
          },
          {
            title:'该分类下物料',
            key:'material_name'
          }
        ],
        material_data2:[
        ],
      }
    },
  }
</script>

<style scoped>
  .top{
    height: 70px;
    position: relative;
    display: inline-block;
    width: 100%;
  }
  .query {
    margin-left: 2%;
    margin-right: 2%;
    display: inline-block;
  }

  .oper{
    display: inline-block;
    color: #1c2438;
    margin-left: 5%;
    background-color: #e6e6e6;
  }

  .show{
    display: inline-block;
    height: 100px;
    margin: 1% 1%
  }

  .search {
    color: black;
    background-color: #e6e6e6;
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
