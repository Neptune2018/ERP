
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
        <i-button class="search" type="ghost" icon="ios-search" shape="circle" @click="material_search()">搜索</i-button>
      </div>
      <div style="width: 35%;float: left;margin: 0.5% 1% ">
        <table cellspacing="10">
          <tr>
          <td><i-button class="oper" type="primary" @click="material_addf()">新增物料</i-button></td>
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
            <Form :model="formRight" label-position="rigtht" :label-width="100">
            <FormItem label="物料分类">
          <Select v-model="addMaterialcatenum" style="width: 60%" >
              <Option v-for="item in addMaterialcatenumList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Form>
          </div>
    </Modal>
            <td><i-button class="oper" type="primary" @click="material_modifyf()">修改物料信息</i-button></td>
           <Modal
         v-model="material_modify"
        title="修改物料信息"
        @on-ok="material_modifyok"
        @on-cancel="cancel">
        <div class="q">
            <Form :model="formRight" label-position="rigtht" :label-width="100">
            <FormItem label="物料编号">
          <Select v-model="modifyMaterialnum" style="width: 60%" >
              <Option v-for="item in modifyMaterialnumList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Form>
          </div>
          <div class="q">
            <label class="model2">物料名称</label><i-input v-model="modify_mname" placeholder="请输入物料名称" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">物料性质</label><i-input v-model="modify_mproperty" placeholder="请输入物料性质" style="width: 60%"></i-input>
          </div>
           <div class="q">
            <Form :model="formRight" label-position="rigtht" :label-width="100">
            <FormItem label="物料分类">
          <Select v-model="modifyMaterialcatenum" style="width: 60%" >
              <Option v-for="item in modifyMaterialcatenumList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Form>
          </div>    
          <div class="q">
            <label class="model2">物料状态</label><i-input v-model="modify_materialstatus" placeholder="请输入物料类别" style="width: 60%"></i-input>
          </div>             
    </Modal>
            <td></td>
            <td><i-button class="oper" type="primary">打印</i-button></td>
          </tr>
          <tr>
            <td><i-button class="oper" type="primary" @click="handleSelectAll(true)">全选</i-button></td>
            <td><i-button class="oper" type="primary" @click="handleSelectAll(false)">全清</i-button></td>
            <td><i-button class="oper" type="primary" @click="material_delete()">删除</i-button></td>
            <td><i-button class="oper" type="primary">导出</i-button></td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <div class="show" style="width: 25%">
        <i-table highlight-row  border  :height="400" :columns="material_columns0" :data="material_data0"  @on-current-change="handleRowChange"></i-table>
      </div>
      <div class="show" style="width: 70%">
        <i-table  @on-selection-change='matrial_selectionClick' class="show" ref="selection" border :height="400" :columns="material_columns1" :data="material_data1"></i-table>
      </div>
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
            if(res.body[i].status==0){
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId,
              materstatus: "启用"
            })}
            else{
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId,
              materstatus: "停用"
            })  
            }
            }           // 返回总记            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('获取数据失败')
          }
        )
        this.$http({
          url: '/getMaterialcates',
          method: 'GET'
        }).then(
          function(res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.material_data0.push({
              sortid: res.body[i].id,
              sort: res.body[i].name
            })
            }
            // 返回总记录
            //this.$router.push({path: '/hello', query:{data: res.body}})
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
        addMaterialcatenum:'',
        addMaterialcatenumList:[],
        modifyMaterialcatenum:'',
        modifyMaterialcatenumList:[],
        modifyMaterialnum:'',
        modifyMaterialnumList:[],
        modify_materialstatus:'',
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
        material_columns0:[
          {
            type:'index',
            width:60,
            align:'center'
          },
          {title:'分类编号',
            key:'sortid'},
          {
            title:'分类情况',
            key:'sort'
          }
        ],
        material_data0:[

        ],
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
            key: 'amount',
            sortable:'true'
          },
          {
            title: '物料性质',
            key: 'property'
          },
          {
            title:'物料分类',
            key:'matercateid'
          },
          {
            title: '物料状态',
            key: 'materstatus'
          }
        ],
        material_data1:[],
      }
    },
    methods: {
      material_modifyf(){
        this.modifyMaterialnum=''
        this.modifyMaterialnumList=[]
        this.$http({
          url: '/getMaterial',
          method: 'GET'
        }).then(
          function(res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.modifyMaterialnumList.push({
              label: res.body[i].id, 
              value:  res.body[i].id,
            })            
            }
          },
        )
        this.modifyMaterialcatenum=''
        this.modifyMaterialcatenumList=[]
        this.$http({
          url: '/getMaterialcates',
          method: 'GET'
        }).then(
          function(res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
              console.log(res.body[i].id)
            this.modifyMaterialcatenumList.push({
              label: res.body[i].id, 
              value:  res.body[i].id,         
            })
            }})
        this.material_modify=true
      },
      material_addf(){
      this.addMaterialcatenum=''
        this.addMaterialcatenumList=[]
        this.$http({
          url: '/getMaterialcates',
          method: 'GET'
        }).then(
          function(res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
              console.log(res.body[i].id)
            this.addMaterialcatenumList.push({
              label: res.body[i].id, 
              value:  res.body[i].id,         
            })
            }})
        this.material_add=true
      },
      matrial_selectionClick(arr)
    {
      this.select=arr
      },
      handleRowChange(currentRow, oldCurrentRow){
        console.log(currentRow)
        this.material_data1=[]
        this.$http({
            url: '/cateMaterial',
            method: 'GET',
            params:{
              id: currentRow.sortid
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            if(res.body[i].status==0){
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId,
              materstatus: "启用"
            })}
            else{
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId,
              materstatus: "停用"
            })  
            }
            }
        }, function () {
            alert("ajax failure")
        })
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
            if(k==deletecount){
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
        if(this.modifyMaterialnum=="")
        {alert("请输入编号")}
        else{
        this.material_data1=[]
        if(this.modify_materialstatus=="停用")
        {this.modify_materialstatus=1}
        else{this.modify_materialstatus=0}
        this.$http({
            url: '/modifyMaterial',
            method: 'GET',
            params:{
              id: this.modifyMaterialnum,
              name: this.modify_mname,
              property: this.modify_mproperty,
              materCateId: this.modifyMaterialcatenum,
              status: this.modify_materialstatus
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            if(res.body[i].status==0){
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId,
              materstatus: "启用"
            })}
            else{
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId,
              materstatus: "停用"
            })  
            }
            }
        }, function () {
            alert("ajax failure")
        })}
      },
      material_addok(){
      if(this.add_mnumber==" ")
      {alert("请输入编号")}
      else if(this.addMaterialcatenum=="")
      {
        alert("请输入分类名称")
      }
      else{
      this.material_data1=[]
        this.$http({
            url: '/addMaterial',
            method: 'GET',
            params:{
              id: this.add_mnumber,
              name: this.add_mname,
              property: this.add_mproperty,
              materCateId: this.addMaterialcatenum,
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            if(res.body[i].status==0){
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId,
              materstatus: "启用"
            })}
            else{
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId,
              materstatus: "停用"
            })  
            }
            }
        }, function () {
            alert("ajax failure")
        })}
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
            if(res.body[i].status==0){
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId,
              materstatus: "启用"
            })}
            else{
            this.material_data1.push({
              num: i+1,
              name: res.body[i].name,
              id: res.body[i].id,
              amount:'2626',
              property: res.body[i].property,
              matercateid: res.body[i].materCateId,
              materstatus: "停用"
            })  
            }
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
    display: inline-block;
    margin-left:  1%;
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
