<template>
  <div style="height: 600px;">
    <row class="content">
      <div class="search-form">
        <row class="query">
          <label class="top-label">编号</label>
          <i-input v-model="id" @on-enter="search()" placeholder="请输入编号" style="width: 70%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">名称</label>
          <i-input v-model="name" @on-enter="search()" placeholder="请输入名称" style="width: 70%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">负责人</label>
          <i-input v-model="person" @on-enter="search()" placeholder="请输入负责人" style="width: 70%"></i-input>
        </row>
        <row class="search">
          <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
        </row>
      </div>
      <div class='addromve'>
        <row>
          <i-button class="oper" type="primary" @click="addsupplier">新增供应商</i-button>
          <Modal v-model="addsupplier1" title="新增供应商" @on-ok="supplier_addok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="供应商名称">
                <input type="text" v-model="addSupplierName" style="width:200px">
              </FormItem>
              <FormItem label="电话">
                <input type="text" v-model="addSupplierPhone" style="width:200px">
              </FormItem>
              <FormItem label="负责人">
                <input type="text" v-model="addPersonName" style="width:200px">
              </FormItem>
              <FormItem label="备注">
                <input type="textarea" v-model="addRemark" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="supplier_modify">修改供应商信息</i-button>
          <Modal v-model="supplier_modify1" title="修改供应商信息" @on-ok="supplier_modifyok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="供应商编号">
                <input type="text" disabled v-model="modifySupplierId" style="width:200px">
              </FormItem>
              <FormItem label="供应商名称">
                <input type="text" v-model="modifySupplierName" style="width:200px">
              </FormItem>
              <FormItem label="电话">
                <input type="text" v-model="modifySupplierPhone" style="width:200px">
              </FormItem>
              <FormItem label="负责人">
                <input type="text" v-model="modifyPersonName" style="width:200px">
              </FormItem>
              <FormItem label="备注">
                <input type="textarea" v-model="modifyRemark" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="deletesupplier()">删除供应商</i-button>
        </row>
      </div>
    </row>
    <div style="margin-top: 20px;">
      <i-table highlight-row @on-current-change='currentchange' @on-selection-change='selectionClick' border :height="200" :columns="columns" :data="table_data"></i-table>
    </div>
    <row class="content">
      <div class="search-form">
        <row class="query">
          <label class="top-label">编号</label>
          <i-input @on-enter="materialsearch()" v-model="matrerial_id" placeholder="请输入编号" style="width: 70%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">名称</label>
          <i-input @on-enter="materialsearch()" v-model="matrerial_name" placeholder="请输入名称" style="width: 70%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">分类</label>
          <i-input @on-enter="materialsearch()" v-model="matrerial_category" placeholder="请输入分类" style="width: 70%"></i-input>
        </row>
        <row class="search">
          <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="materialsearch()">搜索</i-button>
        </row>
      </div>
      <div class='addromve'>
        <row>
          <i-button class="oper" type="primary" @click="addmaterial">新增物料</i-button>
          <Modal v-model="addmaterial1" title="新增物料" @on-ok="material_addok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="物料">
                <Select v-model="addmaterialId" style="width:200px">
                  <Option v-for="item in addmaterialIdList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="起订点">
                <input type="number" v-model="addmaterialMinorder" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="material_modify">修改起订点</i-button>
          <Modal v-model="material_modify1" title="修改起订点" @on-ok="material_modifyok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
            <FormItem label="物料编号">
                <input disabled v-model="modifymaterialId" style="width:200px">
              </FormItem>
            <FormItem label="物料名称">
                <input disabled v-model="modifymaterialName" style="width:200px">
              </FormItem>
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="起订点">
                <input type="number" v-model="modifymaterialMinorder" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="deletematerial()">删除物料</i-button>
        </row>
      </div>
    </row>
    <div style="margin-top: 20px">
      <i-table @on-selection-change='materialSelectionClick' border :height="240" :columns="material_columns" :data="material_data"></i-table>
    </div>
  </div>
</template>
<script>
import { Modal } from 'iview'
export default {
  name: 'SupplierMange',
  data() {
    return {
      addsupplier1:false,
      supplier_modify1:false,
      addmaterial1:false,
      material_modify1:false,

      id: '',
      name: '',
      person: '',
      table_data: [],
      dataList: [],

      addSupplierName: '',
      addSupplierPhone: '',
      addPersonName: '',
      addRemark: '',

      modifySupplierList: [],
      modifySupplierName: '',
      modifySupplierId:'',
      modifySupplierPhone: '',
      modifyPersonName: '',
      modifyRemark: '',

      matrerial_id: '',
      matrerial_name:'',
      matrerial_category: '',   
      material_data: [],
      material_list:[],

      addmaterialId:'',
      addmaterialIdList: [],
      addmaterialMinorder: '',
      modifymaterialMinorder: '',
      modifymaterialId:'',
      modifymaterialName:'',
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '供应商编号',
          key: 'id'
        },
        {
          title: '供应商名称',
          key: 'name'
        },
        {
          title: '联系方式',
          key: 'phone'
        },
        {
          title: '负责人',
          key: 'person'
        },
        {
          title: '备注',
          key: 'remark'
        }
        // {
        //   title: '单价(元)',
        //   key: 'price'
        // }
      ],
      material_columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '物料编号',
          key: 'id'
        },
        {
          title: '物料名称',
          key: 'name'
        },
        {
          title: '性质',
          key: 'property'
        },
        {
          title: '分类',
          key: 'category'
        },
        {
          title: '起订点',
          key: 'minorder'
        }
        // {
        //   title: '单价(元)',
        //   key: 'price'
        // }
      ],
      currentrow : {
        id:'',
        name:'',
        person:'',
        phone:'',
        remark:''
      }
    }
  },
  created() {
    this.$http({
      url: '/getSupplier',
      method: 'GET'
    }).then(
      function(res) {
        this.table_data = res.body
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
      },
      function() {
        this.$Message.error('获取数据失败')
      }
    )
  },
  methods: {
    search: function() {
      this.$http({
        url: '/getSupplier',
        method: 'GET',
        params: {
          id: this.id,
          name: this.name,
          person: this.person
        }
      }).then(
        function(res) {
          this.$Message.success('搜索成功')
          this.table_data = res.body
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('搜索失败')
        }
      )
    },
    materialsearch:function(){
      if(this.currentrow.id == ''){
        this.$Message.warning('请选择需要查询的物料的供应商')
        return
      }
      this.$http({
        url: '/getMaterialsBySupplier',
        method: 'GET',
        params: {
          id: this.currentrow.id,
          materialid: this.matrerial_id,
          name: this.matrerial_name,
          category: this.matrerial_category
        }
      }).then(
        function(res) {
          this.$Message.success('搜索成功')
          this.material_data = res.body[0]
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('搜索失败')
        }
      )
    },
    selectionClick(arr) {
      this.dataList = []
      for (var i = 0; i < arr.length; i++) {
        this.dataList.push(arr[i]['id'])
      }
      if(arr.length!=0){
        this.modifySupplierId = arr[0].id
        this.modifySupplierName = arr[0]['name']
        this.modifySupplierPhone = arr[0]['phone']
        this.modifyPersonName = arr[0]['person']
        this.modifyRemark = arr[0]['remark']
      }else{
        this.modifySupplierId = this.currentrow.id
        this.modifySupplierName = this.currentrow.name
        this.modifySupplierPhone = this.currentrow.phone
        this.modifyPersonName = this.currentrow.person
        this.modifyRemark = this.currentrow.remark
      }
    },
    materialSelectionClick(arr){
      this.material_list = []
      for (var i = 0; i < arr.length; i++) {
        this.material_list.push(arr[i]['id'])
      }
      if(arr.length == 1){
        this.modifymaterialMinorder = arr[0].minorder 
        this.modifymaterialId = arr[0].id
        this.modifymaterialName = arr[0].name
      }else{
        this.modifymaterialMinorder = ''
        this.modifymaterialId = ''
        this.modifymaterialName = ''
      }
    },
    deletesupplier: function() {
      if (this.dataList.length == 0 && this.currentrow.id == '') {
        this.$Message.warning('请选择需要删除的供应商')
      }else{
        var supplier_id = []
        if(this.dataList.length != 0){
          supplier_id = this.dataList
        }else{
          supplier_id.push(this.currentrow.id)
        }
        this.$Modal.confirm({
            title: '确认删除',
            content: '你确认删除这'+ supplier_id.length+ '个供应商吗？',
            onOk: () => {
                this.$http({
                  url: '/deleteSupplierById',
                  method: 'GET',
                  params: {
                    id: supplier_id
                  }
                }).then(
                  function(res) {
                    this.$Message.success('删除成功')
                    for (var i = 0; i < supplier_id.length; i++){
                      if(supplier_id[i] == this.currentrow.id){
                        this.material_data = []
                        this.currentrow.id = ''
                      }
                    }
                    this.table_data = res.body
                    this.dataList = []
                    // 返回总记录
                    //this.$router.push({path: '/hello', query:{data: res.body}})
                  },
                  function() {
                    this.$Message.error('删除失败')
                  }
                )
            },
            onCancel: () => {
                
            }
        });
        
      }
    },
    deletematerial:function(){
      if (this.material_list.length != 0) {
        this.$Modal.confirm({
            title: '确认删除',
            content: '你确认删除这'+this.material_list.length+'个物料吗？',
            onOk: () => {
                this.$http({
                  url: '/removeMaterialsFromSupplier',
                  method: 'GET',
                  params: {
                    id: this.currentrow.id,
                    materialid: this.material_list
                  }
                }).then(
                  function(res) {
                    this.$Message.success('删除成功')
                    this.material_data = res.body[0]
                    this.material_list = []
                    // 返回总记录
                    //this.$router.push({path: '/hello', query:{data: res.body}})
                  },
                  function() {
                    this.$Message.error('删除失败')
                  }
                )
            },
            onCancel: () => {
                
            }
        });
        
      } else {
        this.$Message.warning('请选择需要删除的物料')
      }
    },
    currentchange: function(currentRow, oldCurrentRow) {
      this.currentrow.id = currentRow['id']
      this.currentrow.person = currentRow.person
      this.currentrow.name = currentRow.name
      this.currentrow.phone = currentRow.phone
      this.currentrow.remark = currentRow.remark
      if(this.dataList==0){
        this.modifySupplierId = this.currentrow.id
        this.modifySupplierName = this.currentrow.name
        this.modifySupplierPhone = this.currentrow.phone
        this.modifyPersonName = this.currentrow.person
        this.modifyRemark = this.currentrow.remark
      }
      this.$http({
        url: '/getMaterialsBySupplier',
        method: 'GET',
        params: {
          id: currentRow['id']
        }
      }).then(
        function(res) {
          this.material_data = res.body[0]
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {}
      )
    },
    addsupplier:function(){
      this.addsupplier1 = true;
    },
    supplier_addok: function() {
      if (this.addSupplierName == ''){
        this.$Message.warning('请填写需要添加供应商的名称')
        return
      }
      if (this.addSupplierPhone == ''){
        this.$Message.warning('请填写需要添加供应商的名称')
        return
      }
      if (this.addPersonName == ''){
        this.$Message.warning('请选择需要添加供应商的负责人')
        return 
      }
      this.$http({
        url: '/addSupplier',
        method: 'GET',
        params:{
          name: this.addSupplierName,
          phone: this.addSupplierPhone,
          person: this.addPersonName,
          remark: this.addRemark
        }
      }).then(
        function(res) {
          this.$Message.success('添加成功')
          this.table_data = res.body
          this.addSupplierName = ''
          this.addSupplierPhone = ''
          this.addPersonName = ''
          this.addRemark = ''
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('添加失败')
        }
      )
    },
    supplier_modify:function(){
      if (this.dataList.length == 0 && this.currentrow.id == '') {
         this.$Message.warning('请选择需要修改的供应商')
       }else if (this.dataList.length > 1){
         this.$Message.warning('需要修改的供应商个数必须是一个')
       }else{
        
        this.supplier_modify1 = true;
       }
    },
    supplier_modifyok: function() {
       if(this.modifySupplierName == ''){
         this.$Message.warning('请填写需要修改的供应商名称')
       }else if(this.modifySupplierPhone == ''){
         this.$Message.warning('请填写需要修改的供应商电话')
       }else if(this.modifyPersonName == ''){
         this.$Message.warning('请选择需要修改的供应商负责人')
       }else{
         var supplier_id = ''
        if(this.dataList.length != 0){
          supplier_id = this.dataList[0]
        }else{
          supplier_id = this.currentrow.id
        }
         this.$http({
        url: '/updateSupplierById',
        method: 'GET',
        params:{
          id: supplier_id,
          name: this.modifySupplierName,
          phone: this.modifySupplierPhone,
          person: this.modifyPersonName,
          remark: this.modifyRemark
        }
      }).then(
        function(res) {
          this.$Message.success('修改成功')
          this.table_data = res.body
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('修改失败')
        }
      )
       }
    },
    addmaterial:function(){
      if(this.currentrow.id == ''){
        this.$Message.warning('请选择需要添加的物料的供应商')
        return
      }
      this.$http({
        url: '/getAllMaterialsId',
        method: 'GET',
      }).then(
        function(res) {
          this.addmaterialIdList = res.body
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {}
      )
      this.addmaterial1 = true;
    },
    material_addok:function(){
      if(this.addmaterialId == ''){
         this.$Message.warning('请选择需要添加的物料编号')
       }else if(this.addmaterialMinorder == ''){
         this.$Message.warning('请填写需要添加的物料的起订点')
        }else if(this.addmaterialMinorder< 0){
         this.$Message.warning('物料的起订点不能为负')
       }else{
         this.$http({
          url: '/addMaterialsToSupplier',
          method: 'GET',
          params:{
            id: this.currentrow.id,
            materialid: this.addmaterialId,
            quantity: this.addmaterialMinorder,
          }
        }).then(
          function(res) {
            if(res.body == '0'){
              this.$Modal.error({
                  title: "添加失败",
                  content: "该供应商已经提供该物料"
              });
            }else{
              this.$Message.success('添加成功')
              this.material_data = res.body[0]
              this.addmaterialId = ''
              this.addmaterialMinorder = ''
            }
            // 返回总记录
            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('添加失败')
          }
        )
       }
    },
    material_modify:function(){
      if(this.currentrow.id == ''){
        this.$Message.warning('请选择需要修改物料起订点的供应商')
        return
      }
      if (this.material_list.length == 0) {
         this.$Message.warning('请选择需要修改的物料')
       }else{
         this.material_modify1 = true;
       }

    },
    material_modifyok:function(){
      if(this.modifymaterialMinorder == ''){
         this.$Message.warning('请填写需要修改的物料起订点')
      }else if(this.modifymaterialMinorder< 0){
         this.$Message.warning('物料的起订点不能为负')
       }else{
          this.$http({
          url: '/setMinOrder',
          method: 'GET',
          params:{
            id: this.currentrow.id,
            materialid: this.material_list,
            quantity: this.modifymaterialMinorder,
          }
        }).then(
          function(res) {
            this.$Message.success('修改成功')
            this.material_data = res.body[0]
            // 返回总记录
            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('修改失败')
          }
        )
       }
    },
    cancel: function() {}
  }
}
</script>
<style scoped>
.content {
  display: inline-block;
  margin-top: 15px;
  width: 100%;
}
.search-form {
  display: inline-block;
  width: 60%;
}
.query {
  width: 24%;
  margin-left: 2%;
  margin-right: 2%;
  display: inline-block;
}

.cost-module-btn {
  color: white;
  background-color: #4169e1;
  border-color: #4169e1;
}

.cost-module-btn:hover {
  color: white;
  background-color: #4169e1;
  border-color: #4169e1;
}

.search {
  width: 12%;
  margin-left: 2%;
  display: inline-block;
}

.top-label {
  margin-right: 5%;
}

.addromve {
  width: 35%;
  margin: 0.5% 1%;
  display: inline-block;
}

.oper {
  color: #1c2438;
  margin-left: 5%;
  background-color: #e6e6e6;
}

/* .q {
    width: 100%;
    margin-top: 5%;
    margin-left: 15%;
    margin-right: 15%;
    display: inline-block;
    vertical-align: middle;
  } */
</style>