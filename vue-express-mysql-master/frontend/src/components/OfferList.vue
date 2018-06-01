<template>
  <div style="height: 520px;">
    <row class="content">
      <div class="search-form">
        <row class="query">
          <label class="top-label">编号</label>
          <i-input v-model="id" placeholder="请输入编号" style="width: 70%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">供应商名称</label>
          <i-input v-model="name" placeholder="请输入名称" style="width: 60%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">负责人</label>
          <i-input v-model="person" placeholder="请输入负责人" style="width: 70%"></i-input>
        </row>
        <row class="search">
          <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
        </row>
      </div>
      <div class='addromve'>
        <row>
          <i-button class="oper" type="primary" @click="addofferlist = true">新建采购订单</i-button>
          <Modal v-model="addofferlist" title="新建采购订单" @on-ok="offerlist_addok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="供应商名称">
                <Select v-model="addOfferList.name" style="width:200px">
                  <Option v-for="item in addOfferList.nameList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="负责人">
                <input type="text" v-model="addOfferList.person" style="width:200px">
              </FormItem>
              <FormItem label="时间">
                <DatePicker type="date" placeholder="Select date" v-model="addOfferList.time" style="width: 200px"></DatePicker>
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="offerlist_modify=true">修改订单信息</i-button>
          <Modal v-model="offerlist_modify" title="修改订单信息" @on-ok="offerlist_modifyok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="订单编号">
                <input type="text" disabled v-model="modifyOfferList.id" style="width:200px">
              </FormItem>
              <FormItem label="供应商名称">
                <input type="text" disabled v-model="modifyOfferList.name" style="width:200px">
              </FormItem>
              <FormItem label="负责人">
                <input type="text" v-model="modifyOfferList.person" style="width:200px">
              </FormItem>
              <FormItem label="时间">
                <DatePicker type="date" placeholder="Select date" v-model="modifyOfferList.time" style="width: 200px"></DatePicker>
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="deleteofferlist()">删除订单</i-button>
        </row>
      </div>
    </row>
    <div style="margin-top: 20px;">
      <i-table highlight-row @on-current-change='currentchange' @on-selection-change='selectionClick' border :height="150" :columns="offerListColumns" :data="offerList_data"></i-table>
    </div>
    <row class="content">
      <div class="search-form">
        <row class="query">
          <label class="top-label">编号</label>
          <i-input v-model="matrerial_id" placeholder="请输入编号" style="width: 70%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">名称</label>
          <i-input v-model="matrerial_name" placeholder="请输入名称" style="width: 70%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">批次</label>
          <i-input v-model="matrerial_banch" placeholder="请输入批次" style="width: 70%"></i-input>
        </row>
        <row class="search">
          <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="materialsearch()">搜索</i-button>
        </row>
      </div>
      <div class='addromve'>
        <row>
          <i-button class="oper" type="primary" @click="addmaterial1=true">新增物料</i-button>
          <Modal v-model="addmaterial1" title="新增物料" @on-ok="material_addok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="物料">
                <Select v-model="addmaterialId" style="width:200px">
                  <Option v-for="item in addmaterialList.material" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="数量">
                <input v-model="addmaterialList.quantity" style="width:200px">
              </FormItem>
              <FormItem label="批次">
                <input v-model="addmaterialList.banch" style="width:200px">
              </FormItem>
              <FormItem label="单价">
                <input v-model="addmaterialList.price" style="width:200px">
              </FormItem>
              <FormItem label="总价">
                <input disabled v-model="addmaterialList.total_price" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="material_modify1=true">修改物料信息</i-button>
          <Modal v-model="material_modify1" title="修改起定点" @on-ok="material_modifyok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="物料">
                <input disabled v-model="modifymaterialList.material" style="width:200px">
              </FormItem>
              <FormItem label="数量">
                <input v-model="modifymaterialList.quantity" style="width:200px">
              </FormItem>
              <FormItem label="批次">
                <input v-model="modifymaterialList.banch" style="width:200px">
              </FormItem>
              <FormItem label="单价">
                <input v-model="modifymaterialList.price" style="width:200px">
              </FormItem>
              <FormItem label="总价">
                <input disabled v-model="modifymaterialList.total_price" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="deletematerial()">删除物料</i-button>
        </row>
      </div>
    </row>
    <div style="margin-top: 20px">
      <i-table @on-selection-change='materialSelectionClick' border :height="200" :columns="material_columns" :data="material_data"></i-table>
    </div>
  </div>
</template>
<script>
import { Modal } from 'iview'
export default {
  name: 'OfferList',
  data() {
    return {
      addofferlist:false,
      offerlist_modify:false,
      addmaterial1:false,
      material_modify1:false,

      id: '',
      name: '',
      person: '',
      offerList_data: [],
      dataList: [],

      addOfferList: [],
      modifyOfferList: [],

      matrerial_id: '',
      matrerial_name:'',
      matrerial_banch: '',   
      material_data: [],
      material_list:[],

      addmaterialList: [],
      modifymaterialList: [],
      offerListColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'id'
        },
        {
          title: '供应商名称',
          key: 'name'
        },
        {
          title: '负责人',
          key: 'person'
        },
        {
            title: '时间',
            key: 'time'
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
          title: '数量',
          key: 'quantity'
        },
        {
          title: '单价',
          key: 'price'
        },
        {
          title: '批次',
          key: 'banch'
        },
        {
            title:'总价',
            key: 'total_price'
        }
      ],
      currentrow : ''
    }
  },
  created() {
    this.$http({
      url: '/',
      method: 'GET'
    }).then(
      function(res) {
        this.$Message.success('获取数据成功')
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
      if(this.currentrow == ''){
        this.$Message.warning('请选择需要查询的物料的供应商')
        return
      }
      this.$http({
        url: '/getMaterialsBySupplier',
        method: 'GET',
        params: {
          id: this.currentrow,
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
      this.modifySupplierName = arr[0]['name']
      this.modifySupplierPhone = arr[0]['phone']
      this.modifyPersonName = arr[0]['person']
      this.modifyRemark = arr[0]['remark']
    },
    materialSelectionClick(arr){
      this.material_list = []
      for (var i = 0; i < arr.length; i++) {
        this.material_list.push(arr[i]['id'])
      }
      if(arr.length == 1)
        this.modifymaterialMinorder = arr[0].minorder 
    },
    deletesupplier: function() {
      if (this.dataList.length != 0) {
        this.$http({
          url: '/deleteSupplierById',
          method: 'GET',
          params: {
            id: this.dataList
          }
        }).then(
          function(res) {
            this.$Message.success('删除成功')
            for (var i = 0; i < this.dataList.length; i++){
              if(this.dataList[i] == this.currentrow){
                this.material_data = []
              }
            }
            this.table_data = res.body
            // 返回总记录
            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('删除失败')
          }
        )
      } else {
        this.$Message.warning('请选择需要删除的供应商')
      }
    },
    deletematerial:function(){
      if (this.material_list.length != 0) {
        this.$http({
          url: '/removeMaterialsFromSupplier',
          method: 'GET',
          params: {
            id: this.currentrow,
            materialid: this.material_list
          }
        }).then(
          function(res) {
            this.$Message.success('删除成功')
            this.material_data = res.body[0]
            // 返回总记录
            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('删除失败')
          }
        )
      } else {
        this.$Message.warning('请选择需要删除的物料')
      }
    },
    currentchange: function(currentRow, oldCurrentRow) {
      this.currentrow = currentRow['id']
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
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('添加失败')
        }
      )
    },
    supplier_modify:function(){
      if (this.dataList.length == 0) {
         this.$Message.warning('请选择需要修改的供应商')
       }else if (this.dataList.length > 1){
         this.$Message.warning('需要修改的供应商个数必须是一个')
       }else{
        
        this.supplier_modify1 = true;
       }
    },
    offerlist_modifyok: function() {
       if(this.modifySupplierName == ''){
         this.$Message.warning('请填写需要修改的供应商名称')
       }else if(this.modifySupplierPhone == ''){
         this.$Message.warning('请填写需要修改的供应商电话')
       }else if(this.modifyPersonName == ''){
         this.$Message.warning('请选择需要修改的供应商负责人')
       }else{
         this.$http({
        url: '/updateSupplierById',
        method: 'GET',
        params:{
          id: this.dataList[0],
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
      if(this.currentrow == ''){
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
         this.$Message.warning('请填写需要添加的物料的起定点')
       }else{
         this.$http({
          url: '/addMaterialsToSupplier',
          method: 'GET',
          params:{
            id: this.currentrow,
            materialid: this.addmaterialId,
            quantity: this.addmaterialMinorder,
          }
        }).then(
          function(res) {
            this.$Message.success('添加成功')
            this.material_data = res.body[0]
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
      if(this.currentrow == ''){
        this.$Message.warning('请选择需要修改物料起定点的供应商')
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
         this.$Message.warning('请填写需要修改的物料起定点')
       }else{
          this.$http({
          url: '/setMinOrder',
          method: 'GET',
          params:{
            id: this.currentrow,
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