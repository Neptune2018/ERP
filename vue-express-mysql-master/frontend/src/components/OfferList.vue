<template>
  <div style="height: 600px;">
    <row class="content">
      <div class="search-form">
        <row class="query">
          <label class="top-label">编号</label>
          <i-input @on-enter="search()" v-model="id" placeholder="请输入编号" style="width: 70%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">供应商</label>
          <i-input @on-enter="search()" v-model="name" placeholder="请输入名称" style="width: 60%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">负责人</label>
          <i-input @on-enter="search()" v-model="person" placeholder="请输入负责人" style="width: 70%"></i-input>
        </row>
        <row class="search">
          <i-button class="cost-module-btn" type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
        </row>
      </div>
      <div class='addromve'>
        <row>
          <i-button class="oper" type="primary" @click="addofferlist">新建采购订单</i-button>
          <Modal v-model="addofferlist1" title="新建采购订单" @on-ok="offerlist_addok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="供应商名称">
                <Select v-model="addOfferList.name" style="width:200px">
                  <Option v-for="item in addOfferList.nameList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="负责人">
                <Select v-model="addOfferList.person" style="width:200px">
                  <Option v-for="item in addOfferList.personList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="时间">
                <DatePicker type="datetime" placeholder="Select date" v-model="addOfferList.time" style="width: 200px"></DatePicker>
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="offerlist_modify">修改订单信息</i-button>
          <Modal v-model="offerlist_modify1" title="修改订单信息" @on-ok="offerlist_modifyok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="订单编号">
                <input type="text" disabled v-model="modifyOfferList.id" style="width:200px">
              </FormItem>
              <FormItem label="供应商">
                <input type="text" disabled v-model="modifyOfferList.name" style="width:200px">
              </FormItem>
              <FormItem label="负责人">
                <Select v-model="modifyOfferList.person" style="width:200px">
                  <Option v-for="item in modifyOfferList.personList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="时间">
                <DatePicker type="datetime" placeholder="Select date" v-model="modifyOfferList.time" style="width: 200px"></DatePicker>
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="deleteofferlist()">删除订单</i-button>
        </row>
      </div>
    </row>
    <div style="margin-top: 20px;">
      <i-table highlight-row @on-current-change='currentchange' @on-selection-change='selectionClick' border :height="200" :columns="offerListColumns" :data="offerList_data"></i-table>
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
          <label class="top-label">批次</label>
          <i-input @on-enter="materialsearch()" v-model="matrerial_batch" placeholder="请输入批次" style="width: 70%"></i-input>
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
                <Select v-model="addmaterialList.id" style="width:200px">
                  <Option v-for="item in addmaterialList.material" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="数量">
                <input type="number" v-model="addmaterialList.quantity" style="width:200px">
              </FormItem>
              <FormItem label="批次">
                <input v-model="addmaterialList.batch" style="width:200px">
              </FormItem>
              <FormItem label="单价">
                <input type="number" v-model="addmaterialList.price" style="width:200px">
              </FormItem>
              <FormItem label="总价">
                <input disabled v-model="add_total_price" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="material_modify">修改物料信息</i-button>
          <Modal v-model="material_modify1" title="修改物料信息" @on-ok="material_modifyok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="物料">
                <input disabled v-model="modifymaterialList.material" style="width:200px">
              </FormItem>
              <FormItem label="数量">
                <input type="number" v-model="modifymaterialList.quantity" style="width:200px">
              </FormItem>
              <FormItem label="批次">
                <input v-model="modifymaterialList.batch" style="width:200px">
              </FormItem>
              <FormItem label="单价">
                <input type="number" v-model="modifymaterialList.price" style="width:200px">
              </FormItem>
              <FormItem label="总价">
                <input disabled v-model="modify_total_price" style="width:200px">
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
var formatDate = require('../utils/utils').formatDate
export default {
  name: 'OfferList',
  data() {
    return {
      addofferlist1:false,
      offerlist_modify1:false,
      addmaterial1:false,
      material_modify1:false,

      id: '',
      name: '',
      person: '',
      offerList_data: [],
      offerList_list: [],

      addOfferList: {
        name: '',
        person: '',
        time: '',
        nameList: [],
        personList: []
      },
      modifyOfferList:  {
        id: '',
        name: '',
        person: '',
        time: '',
        supplier_id:'',
        personList: []
      },

      matrerial_id: '',
      matrerial_name:'',
      matrerial_batch: '',   
      material_data: [],
      material_list:[],

      addmaterialList: {
        id: '',
        material:[],
        quantity:'',
        batch:'',
        price:'',
        total_price:''
      },
      modifymaterialList: {
        id:'',
        material:'',
        quantity:'',
        batch:'',
        price:'',
        total_price:''
      },
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
            title: '截止时间',
            key: 'time'
        },
        {
          title:'创建时间',
          key: 'created_time'
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
          key: 'batch'
        },
        {
            title:'总价',
            key: 'total_price'
        }
      ],
      currentrow : {
        id:'',
        supplier_id:''
      }
    }
  },
  created() {
    this.$http({
      url: '/getOfferList',
      method: 'GET'
    }).then(
      function(res) {
        for(var i=0; i< res.body.length ;i++){
          this.offerList_data.push({
            id: res.body[i].id,
            supplier_id: res.body[i].supplier.id,
            name: res.body[i].supplier.name,
            user_id: res.body[i].user.id,
            person : res.body[i].user.name,
            time : formatDate(new Date(res.body[i].time),"yyyy-MM-dd hh:mm:ss"),
            created_time: formatDate(new Date(res.body[i].createdAt),"yyyy-MM-dd hh:mm:ss")
          })
        }
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
      },
      function() {
        this.$Message.error('获取数据失败')
      }
    )
    this.$http({
        url: '/getAllUserIdAndName',
        method: 'GET',
      }).then(
        function(res) {
          this.modifyOfferList.personList = res.body
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
        }
      )
  },
  computed: {
    modify_total_price: function(){
      return this.modifymaterialList.quantity*this.modifymaterialList.price
    },
    add_total_price: function(){
      return this.addmaterialList.price*this.addmaterialList.quantity
    },
    
  },
  methods: {
    search: function() {
      this.$http({
        url: '/getOfferList',
        method: 'GET',
        params: {
          id: this.id,
          name: this.name,
          person: this.person
        }
      }).then(
        function(res) {
          this.$Message.success('搜索成功')
          this.offerList_data = []
          for(var i=0; i< res.body.length ;i++){
            this.offerList_data.push({
              id: res.body[i].id,
              supplier_id: res.body[i].supplier.id,
              name: res.body[i].supplier.name,
              user_id: res.body[i].user.id,
              person : res.body[i].user.name,
              time : formatDate(new Date(res.body[i].time),"yyyy-MM-dd hh:mm:ss"),
            created_time: formatDate(new Date(res.body[i].createdAt),"yyyy-MM-dd hh:mm:ss")
            })
          }
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
        url: '/getOfferByOfferList',
        method: 'GET',
        params: {
          id: this.currentrow.id,
          material_id: this.matrerial_id,
          name: this.matrerial_name,
          batch: this.matrerial_batch
        }
      }).then(
        function(res) {
          this.$Message.success('搜索成功')
          this.material_data = res.body
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('搜索失败')
        }
      )
    },
    selectionClick(arr) {
      this.offerList_list = []
      for (var i = 0; i < arr.length; i++) {
        this.offerList_list.push(arr[i]['id'])
      }
      if(arr.length!=0){
        this.modifyOfferList.id = arr[0]['id']
        this.modifyOfferList.supplier_id = arr[0]['supplier_id']
        this.modifyOfferList.name = arr[0]['name']
        this.modifyOfferList.person = arr[0]['user_id']
        this.modifyOfferList.time = arr[0]['time']
      }else{
        this.modifyOfferList.id = this.currentrow.id
        this.modifyOfferList.supplier_id = this.currentrow.supplier_id
        this.modifyOfferList.name = this.currentrow.name
        this.modifyOfferList.person = this.currentrow.user_id
        this.modifyOfferList.time = this.currentrow.time
      }
    },
    materialSelectionClick(arr){
      this.material_list = []
      for (var i = 0; i < arr.length; i++) {
        this.material_list.push(arr[i]['id'])
      }
      this.modifymaterialList.id = arr[0]['id']
      this.modifymaterialList.material = arr[0]['name'] 
      this.modifymaterialList.quantity = arr[0]['quantity'] 
      this.modifymaterialList.batch = arr[0]['batch'] 
      this.modifymaterialList.price = arr[0]['price']
      
    },
    deleteofferlist: function() {
      if (this.offerList_list.length == 0 && this.currentrow.id == '') {
        this.$Message.warning('请选择需要删除的订单')
      }else{
        var offerlist_id = []
        if(this.offerList_list.length != 0){
          offerlist_id = this.offerList_list
        }else{
          offerlist_id.push(this.currentrow.id)
        }
        this.$Modal.confirm({
            title: '确认删除',
            content: '你确认删除这'+offerlist_id.length+'条订单吗？',
            onOk: () => {
                this.$http({
          url: '/deleteOfferList',
          method: 'GET',
          params: {
            id: offerlist_id
          }
        }).then(
          function(res) {
            this.$Message.success('删除成功')
            for (var i = 0; i < offerlist_id.length; i++){
              if(offerlist_id[i] == this.currentrow.id){
                this.material_data = []
                this.currentrow.id = ''
              }
            }
            this.offerList_data = []
            for(var i=0; i< res.body.length ;i++){
              this.offerList_data.push({
                id: res.body[i].id,
                supplier_id: res.body[i].supplier.id,
                name: res.body[i].supplier.name,
                user_id: res.body[i].user.id,
                person : res.body[i].user.name,
                time : formatDate(new Date(res.body[i].time),"yyyy-MM-dd hh:mm:ss"),
                created_time: formatDate(new Date(res.body[i].createdAt),"yyyy-MM-dd hh:mm:ss")
              })
            }
            this.offerList_list = []
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
            content: '你确认删除这'+this.material_list.length+'条信息吗？',
            onOk: () => {
                this.$http({
                  url: '/deleteOffer',
                  method: 'GET',
                  params: {
                    offerlist_id: this.currentrow.id,
                    material_id: this.material_list
                  }
                }).then(
                  function(res) {
                    this.$Message.success('删除成功')
                    this.material_data = res.body
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
      this.currentrow.user_id = currentRow.user_id
      this.currentrow.time = currentRow.time
      this.currentrow.supplier_id = currentRow.supplier_id
      this.matrerial_id = ''
      this.matrerial_name = ''
      this.matrerial_batch = ''
      if(this.offerList_list.length==0){
        this.modifyOfferList.id = currentRow.id
        this.modifyOfferList.supplier_id = currentRow.supplier_id
        this.modifyOfferList.name = currentRow.name
        this.modifyOfferList.person = currentRow.user_id
        this.modifyOfferList.time = currentRow.time
      }
      this.$http({
        url: '/getOfferByOfferList',
        method: 'GET',
        params: {
          id: currentRow['id']
        }
      }).then(
        function(res) {
          this.material_data = res.body
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {}
      )
    },
    addofferlist:function(){
      this.$http({
        url: '/getSupplier',
        method: 'GET',
      }).then(
        function(res) {
          this.addOfferList.nameList = res.body
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
        }
      )
      this.$http({
        url: '/getAllUserIdAndName',
        method: 'GET',
      }).then(
        function(res) {
          this.addOfferList.personList = res.body
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
        }
      )
      this.addofferlist1 = true;
    },
    offerlist_addok: function() {
      if (this.addOfferList.name == ''){
        this.$Message.warning('请填写需要添加供应商的名称')
        return
      }
      if (this.addOfferList.person == ''){
        this.$Message.warning('请填写需要添加的负责人')
        return
      }
      if (this.addOfferList.time == ''){
        this.$Message.warning('请选择需要添加的时间')
        return 
      }

      this.$http({
        url: '/addOfferList',
        method: 'GET',
        params:{
          supplier_id: this.addOfferList.name,
          user_id: this.addOfferList.person,
          time: formatDate(this.addOfferList.time,"yyyy-MM-dd hh:mm:ss")
        }
      }).then(
        function(res) {
          this.$Message.success('添加成功')
          this.offerList_data = []
          for(var i=0; i< res.body.length ;i++){
            this.offerList_data.push({
              id: res.body[i].id,
              supplier_id: res.body[i].supplier.id,
              name: res.body[i].supplier.name,
              user_id: res.body[i].user.id,
              person : res.body[i].user.name,
              time : formatDate(new Date(res.body[i].time),"yyyy-MM-dd hh:mm:ss"),
              created_time: formatDate(new Date(res.body[i].createdAt),"yyyy-MM-dd hh:mm:ss")
            })
          }
          this.addOfferList.name = ''
          this.addOfferList.person = ''
          this.addOfferList.time = ''
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('添加失败')
        }
      )
    },
    offerlist_modify:function(){
      if (this.offerList_list.length == 0 && this.currentrow.id == '') {
         this.$Message.warning('请选择需要修改的订单')
       }else if (this.offerList_list.length > 1){
         this.$Message.warning('需要修改的订单个数必须是一个')
       }else{
         
        this.$http({
        url: '/getAllUserIdAndName',
        method: 'GET',
      }).then(
        function(res) {
          this.modifyOfferList.personList = res.body
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
        }
      )
        this.offerlist_modify1 = true;
       }
    },
    offerlist_modifyok: function() {
       if(this.modifyOfferList.person == ''){
         this.$Message.warning('请选择需要修改的供应商负责人')
       }else if(this.modifyOfferList.time == ''){
         this.$Message.warning('请选择需要修改的时间')
       }else{
         this.$http({
        url: '/updateOfferList',
        method: 'GET',
        params:{
          id: this.modifyOfferList.id,
          person: this.modifyOfferList.person,
          time: formatDate(this.modifyOfferList.time,"yyyy-MM-dd hh:mm:ss")
        }
      }).then(
        function(res) {
          this.$Message.success('修改成功')
          this.offerList_data = []
          for(var i=0; i< res.body.length ;i++){
            this.offerList_data.push({
              id: res.body[i].id,
              supplier_id: res.body[i].supplier.id,
              name: res.body[i].supplier.name,
              user_id: res.body[i].user.id,
              person : res.body[i].user.name,
              time : formatDate(new Date(res.body[i].time),"yyyy-MM-dd hh:mm:ss"),
              created_time: formatDate(new Date(res.body[i].createdAt),"yyyy-MM-dd hh:mm:ss")
            })
          }
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
        url: '/getMaterialsBySupplier',
        method: 'GET',
        params:{
          id: this.currentrow.supplier_id
        }
      }).then(
        function(res) {
            this.addmaterialList.material = res.body[0]
          
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
        }
      )
      this.addmaterial1 = true;
    },
    material_addok:function(){
      if(this.addmaterialList.id == ''){
         this.$Message.warning('请选择需要添加的物料')
      }else if(this.addmaterialList.quantity == ''){
        this.$Message.warning('请填写订单中物料需要的数量')
      }else if(this.addmaterialList.quantity < 0){
        this.$Message.warning('订单中物料需要的数量不能为负')
      }else if(this.addmaterialList.price == ''){
        this.$Message.warning('请填写订单中物料的单价')
      }else if(this.addmaterialList.price < 0){
        this.$Message.warning('请填写订单中物料的单价不能为负')
      }else if(this.addmaterialList.batch == ''){
         this.$Message.warning('请填写订单中物料的批次')
       }else{
         this.$http({
          url: '/addOffer',
          method: 'GET',
          params:{
            offerlist_id: this.currentrow.id,
            material_id: this.addmaterialList.id,
            quantity: this.addmaterialList.quantity,
            price:this.addmaterialList.price,
            batch:this.addmaterialList.batch,
            total_price:this.add_total_price
          }
        }).then(
          function(res) {
            if(res.body=="0"){
            this.$Modal.error({
                  title: "添加失败",
                  content: "该订单已经添加该物料"
              });
          }else{
            this.$Message.success('添加成功')
            this.material_data = res.body
            this.addmaterialList.id = ''
            this.addmaterialList.quantity = ''
            this.addmaterialList.price = ''
            this.addmaterialList.batch = ''
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
        this.$Message.warning('请选择需要修改物料起定点的供应商')
        return
      }
      if (this.material_list.length == 0) {
         this.$Message.warning('请选择需要修改的物料')
      }else if(this.material_list.length > 1) {
         this.$Message.warning('需要修改的物料个数必须是一个')
       }else{
         this.material_modify1 = true;
       }

    },
    material_modifyok:function(){
      if(this.modifymaterialList.quantity == ''){
        this.$Message.warning('请填写订单中物料需要的数量')
      }else if(this.modifymaterialList.quantity < 0){
        this.$Message.warning('订单中物料需要的数量不能为负')
      }else if(this.modifymaterialList.price == ''){
        this.$Message.warning('请填写订单中物料的单价')
      }else if(this.modifymaterialList.price < 0){
        this.$Message.warning('订单中物料的单价不能为负')
      }else if(this.modifymaterialList.batch == ''){
         this.$Message.warning('请填写订单中物料的批次')
       }else{
          this.$http({
          url: '/updateOffer',
          method: 'GET',
          params:{
            offerlist_id: this.currentrow.id,
            material_id: this.modifymaterialList.id,
            quantity: this.modifymaterialList.quantity,
            price:this.modifymaterialList.price,
            batch:this.modifymaterialList.batch,
            total_price:this.modify_total_price
          }
        }).then(
          function(res) {
            this.$Message.success('修改成功')
            this.material_data = res.body
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