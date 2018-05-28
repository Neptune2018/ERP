
<template>
  <div style="height: 500px;">
    <div style="height: 70px; position: relative">
      <div class="top">
        <div class="query">
          <label class="top-label">物料编号</label><i-input v-model="material_number" placeholder="请输入物料编号" style="width: 60%"></i-input>
        </div>
        <div class="query">
          <label class="top-label">物料名称</label><i-input v-model="material_name" placeholder="请输入物料名称" style="width: 60%"></i-input>
        </div>
        <div class="query">
          <label class="top-label">货品反查</label><i-input v-model="product_name" placeholder="请输入货品名称" style="width: 60%"></i-input>
        </div>
        <i-button class="search" type="ghost" icon="ios-search" shape="circle" @click="material_search()">搜索</i-button>
      </div>
      <div style="width: 35%;float: left;margin: 0.5% 1% ">
        <row>
          <i-button class="oper" type="primary" @click="material_add=true">新增物料</i-button>
          <Modal
         v-model="material_add"
        title="新增物料"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="q">
            <label class="model1">物料编号</label><i-input v-model="add_mnumber" placeholder="请输入编号" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">物料名称</label><i-input v-model="add_mname" placeholder="请输入物料名称" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">物料类别</label><i-input v-model="add_mstatus" placeholder="请输入物料类别" style="width: 60%"></i-input>
          </div>
           <div class="q">
            <label class="model1">物料性质</label><i-input v-model="add_mproperty" placeholder="请输入物料性质" style="width: 60%"></i-input>
          </div>
    </Modal>
          <i-button class="oper" type="primary" @click="material_modify=true">修改物料信息</i-button>
           <Modal
         v-model="material_modify"
        title="修改物料信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="q">
            <label class="model2">物料编号</label><i-input v-model="modify_mnumber" placeholder="请输入编号" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">物料名称</label><i-input v-model="modify_mname" placeholder="请输入物料名称" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">物料类别</label><i-input v-model="modify_mstatus" placeholder="请输入物料类别" style="width: 60%"></i-input>
          </div>
           <div class="q">
            <label class="model2">物料性质</label><i-input v-model="modify_mproperty" placeholder="请输入物料性质" style="width: 60%"></i-input>
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
    <div style = "margin-top: 20px">
      <i-table  class="show" ref="selection" border  :columns="material_columns1" :data="material_data1"></i-table>
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
    name: 'Material',
    data () {
      //一定要有return！！
      return{
        material_add: false,
        material_modify: false,
        material_number: '',
        material_name: '',
        product_name: '',
        table_data: '',
        material_columns1: [
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
            title: '物料名称',
            key: 'name',

          },
          {
            title: '编号',
            key: 'id',
            sortable:'true'
          },
          {
            title: '物料数量',
//            数量在数据库中值不知道
            key: 'amount',
            sortable:'true'
          },
          {
            title: '物料性质',
            key: 'property'
          },
          {
            title:'备注',
//            同上
            key:''
          }
        ],
        material_data1:[
          {
            num:'1',
            name:'田斯予',
            id:'23232',
            amount:'2626',
            property:'原料',
            remark:'不知道数量和备注在数据库中代号'

          },
          {
            num:'2',
            name:'田斯予快做',
            id:'66666666',
            amount:'26',
            property:'原料',
            remark:'不知道数量和备注在数据库中代号'
          },


        ],
      }
    }, 
    created() {
    this.$http({
      url: '/getMaterials',
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
   .q {
    width: 100%;
    margin-top: 5%;
    margin-left: 15%;
    margin-right: 15%;
    display: inline-block;
    vertical-align: middle;
  }
</style>
