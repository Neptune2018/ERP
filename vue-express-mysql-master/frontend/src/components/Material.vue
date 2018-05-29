
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
        @on-ok="material_addok"
        @on-cancel="cancel">
        <div class="q">
            <label class="model1">物料编号</label><i-input v-model="add_mnumber" placeholder="请输入编号" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">物料名称</label><i-input v-model="add_mname" placeholder="请输入物料名称" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">物料性质</label><i-input v-model="add_mproperty" placeholder="请输入物料性质" style="width: 60%"></i-input>
          </div>
           <div class="q">
            <label class="model1">物料分类</label><i-input v-model="add_mmaterialcateid" placeholder="请输入物料类别" style="width: 60%"></i-input>
          </div>
    </Modal>
          <i-button class="oper" type="primary" @click="material_modify=true">修改物料信息</i-button>
           <Modal
         v-model="material_modify"
        title="修改物料信息"
        @on-ok="material_modifyok"
        @on-cancel="cancel">
        <div class="q">
            <label class="model2">物料编号</label><i-input v-model="modify_mnumber" placeholder="请输入编号" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">物料名称</label><i-input v-model="modify_mname" placeholder="请输入物料名称" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">物料性质</label><i-input v-model="modify_mproperty" placeholder="请输入物料性质" style="width: 60%"></i-input>
          </div>
           <div class="q">
            <label class="model2">物料分类</label><i-input v-model="modify_mmaterialcateid" placeholder="请输入物料类别" style="width: 60%"></i-input>
          </div>
    </Modal>
          <i-button class="oper" type="primary">打印</i-button>
        </row>
        <row style="margin-top: 1%">
          <i-button class="oper" type="primary" @click="handleSelectAll(true)">全选</i-button>
          <i-button class="oper" type="primary" @click="handleSelectAll(false)">全清</i-button>
          <i-button class="oper" type="primary" @click="material_delete()">删除</i-button>
          <i-button class="oper" type="primary">导出</i-button>
        </row>
      </div>
    </div>
    <div style = "margin-top: 20px">
      <i-table  @on-selection-change='matrial_selectionClick' class="show" ref="selection" border  :columns="material_columns1" :data="material_data1"></i-table>
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
    created() {
        this.$http({
          url: '/getMaterial',
          method: 'GET'
        }).then(
          function(res) {
            console.log(res.body)          
            for(var i=0;i<res.body.length;i++){
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId
            })
            }
            this.$Message.success('获取数据成功')            // 返回总记            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('获取数据失败')
          }
        )
      }, 
    name: 'Material',
    data () {
      //一定要有return！！
      return{
        select:'',
        modify_mnumber:'',
        modify_mname:'',
        modify_mproperty:'',
        modify_mmaterialcateid:'',
        add_mnumber:'',
        add_mname:'',
        add_mproperty:'',
        add_mmaterialcateid:'',
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
            title:'物料分类',
//            同上
            key:'matercateid'
          }
        ],
        material_data1:[],
      }
    }, 
    methods: {
      matrial_selectionClick(arr)
    {
      this.select=arr
      },
      material_delete(){
        this.material_data1=[]
        var k=0  
        var deletecount=this.select.length
        for(var j=0;j<deletecount;j++){  
        this.$http({
            url: '/deleteMaterial',
            method: 'GET',
            params:{
              id: this.select[j].id,
            }
        }).then(function (res) {
            console.log(res.body)   
            console.log(k++)
            if(k==deletecount-1){       
            for(var i=0;i<res.body.length;i++){ 
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId
            })
            }}
        }, function () {
            alert("ajax failure")
        })
        }
        },
      material_modifyok(){
        this.material_data1=[]      
        this.$http({
            url: '/modifyMaterial',
            method: 'GET',
            params:{
              id: this.modify_mnumber,
              name: this.modify_mname,
              property: this.modify_mproperty,
              materCateId: this.modify_mmaterialcateid,
            }
        }).then(function (res) {
            console.log(res.body)           
            for(var i=0;i<res.body.length;i++){
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId
            })
            }
        }, function () {
            alert("ajax failure")
        })
      },
      material_addok(){
      this.material_data1=[]      
        this.$http({
            url: '/addMaterial',
            method: 'GET',
            params:{
              id: this.add_mnumber,
              name: this.add_mname,
              property: this.add_mproperty,
              materCateId: this.add_mmaterialcateid,
            }
        }).then(function (res) {
            console.log(res.body)           
            for(var i=0;i<res.body.length;i++){
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId
            })
            }
        }, function () {
            alert("ajax failure")
        })
      },
      material_search() {  
        this.material_data1=[]       
        this.$http({
            url: '/materialSearch',
            method: 'GET',
            params:{
              Id: this.material_number,
              name: this.material_name
            }
        }).then(function (res) {
            console.log(res.body)           
            for(var i=0;i<res.body.length;i++){
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              remark:'不知道数量和备注在数据库中代号'
            })
            }
        }, function () {
            alert("ajax failure")
        })
    },
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
    height:800px;
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
