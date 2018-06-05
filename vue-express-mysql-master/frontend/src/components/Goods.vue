
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
            <label class="top-label">物料反查</label><i-input v-model="material_name" placeholder="请输入物料编号" style="width: 60%"></i-input>
          </div>
            <i-button class="search" type="ghost" icon="ios-search" shape="circle" @click="product_search()">搜索</i-button>
        </div>
    <div style="width: 35%;float: left;margin: 0.5% 1% ">
      <table cellspacing="10">
      <tr>
        <td><i-button class="oper" type="primary" @click="product_add=true">新增货品</i-button></td>
        <Modal
          v-model="product_add"
          title="新增货品"
          @on-ok="add_productok"
          @on-cancel="cancel">
          <div class="q">
            <label class="model1">货品编号</label><i-input v-model="add_number" placeholder="请输入货号" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">货品名称</label><i-input v-model="add_name" placeholder="请输入货品名称" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">货品价格</label><i-input v-model="add_price" placeholder="请输入货品价格" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">货品备注</label><i-input v-model="add_remark" placeholder="请输入货品备注" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">货品分类</label><i-input v-model="add_productcateid" placeholder="请输入货品分类" style="width: 60%"></i-input>
          </div>
        </Modal>

        <td><i-button class="oper" type="primary" @click="product_modify=true">修改货品信息</i-button></td>
        <Modal
          v-model="product_modify"
          title="修改货品信息"
          @on-ok="modify_productok"
          @on-cancel="cancel">
          <div class="q">
            <label class="model2">货品编号</label><i-input v-model="modify_number" placeholder="请输入货号" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">货品名称</label><i-input v-model="modify_name" placeholder="请输入货品名称" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">货品价格</label><i-input v-model="modify_price" placeholder="请输入货品价格" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">货品备注</label><i-input v-model="modify_remark" placeholder="请输入货品备注" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model2">货品分类</label><i-input v-model="modify_productcateid" placeholder="请输入货品分类" style="width: 60%"></i-input>
          </div>
        </Modal>

        <td></td>
        <td><i-button class="oper" type="primary">打印</i-button></td>
      </tr>
      <tr>
        <td><i-button class="oper" type="primary" @click="handleSelectAll(true)">全选</i-button></td>
        <td><i-button class="oper" type="primary" @click="handleSelectAll(false)">全清</i-button></td>
        <td><i-button class="oper" type="primary" @click="product_delete()">删除</i-button></td>
        <td><i-button class="oper" type="primary">导出</i-button></td>
      </tr>
    </table>
    </div>
    </div>
    <div>
        <div class="show" style="width: 25%">
          <i-table highlight-row stripe border :height="200"  :columns="columns1" :data="data1"  @on-current-change="handleRowChange"></i-table>
    </div>
  <div class="show" style="width: 70%">
    <i-table highlight-row @on-current-change="handleRowChange2" @on-selection-change='matrial_selectionClick' stripe ref="selection" border :height="200" :columns="columns2" :data="data2" ></i-table>
  </div>
    </div>
    <div>
      <i-table highlight-row stripe border :height="200" :columns="columns3" :data="data3"></i-table>
    </div>
    <div>

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
    created() {
        this.$http({
          url: '/getProducts',
          method: 'GET'
        }).then(
          function(res) {
            this.table_data = res.body.data
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.data2.push({
              num: i+1,
              id: res.body[i].id,
              name: res.body[i].name,
              add_time: '2018-5-27',
              productCateId: res.body[i].productCateId
            })
            }
            this.$Message.success('获取数据成功')
            // 返回总记录
            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('获取数据失败')
          }
        )
        this.$http({
          url: '/getProductcates',
          method: 'GET'
        }).then(
          function(res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.data1.push({
              sort: res.body[i].name,
              sortid: res.body[i].id
            })
            }
            this.$Message.success('获取数据成功')
            // 返回总记录
            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('获取数据失败')
          }
        )
        this.$http({
          url: '/getMaterial',
          method: 'GET'
        }).then(
          function(res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.data3.push({
              num: i+1,
              material_name: res.body[i].name,
              material_id: res.body[i].id,
              count:'2626',
              material_property: res.body[i].property,
            })
            }
            this.$Message.success('获取数据成功')            // 返回总记            //this.$router.push({path: '/hello', query:{data: res.body}})
          },
          function() {
            this.$Message.error('获取数据失败')
          }
        )
      },
    name: 'Goods',
    data () {

      //一定要有return！！
      return{
        select:'',
        modify_number:'',
        modify_name:'',
        modify_price:'',
        modify_remark:'',
        modify_productcateid:'',
        add_number:'',
        add_name:'',
        add_price:'',
        add_remark:'',
        add_productcateid:'',
        product_number: '',
        product_name: '',
        material_name: '',
        table_data: [],
        product_add : false,
        product_modify:false,
        columns1:[
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
        data2:[],
        columns3: [
          {
            title: '序号',
            key: 'num',
            sortable:'true'
          },
          {
            title: '配料名称',
            key: 'material_name',

          },
          {
            title: '编号',
            key: 'material_id',
            sortable:'true'
          },
          {
            title: '配料数量',
            key: 'count',
            sortable:'true'
          },
          {
            title: '配料性质',
            key: 'material_property'
          }
        ],
        data3:[],
      }
    },
    methods: {
      handleRowChange2(currentRow, oldCurrentRow){
        console.log(currentRow)
        this.data3=[]
        this.$http({
            url: '/Productmaterial',
            method: 'GET',
            params:{
              id: currentRow.id
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.data3.push({
              num: i+1,
              material_name: res.body[0][i].name,
              material_id: res.body[0][i].id,
              count:res.body[0][i].quantity,
              material_property: res.body[0][i].property,
            })
            }
        }, function () {
            alert("ajax failure")
        })
      },
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },
       handleRowChange(currentRow, oldCurrentRow){
         console.log(currentRow)
        this.data2=[]
        this.$http({
            url: '/cateProduct',
            method: 'GET',
            params:{
              id: currentRow.sortid
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.data2.push({
              num: i+1,
              id: res.body[i].id,
              name: res.body[i].name,
              add_time: '2018-5-27',
              productCateId: res.body[i].productCateId
            })
            }
        }, function () {
            alert("ajax failure")
        })
    },
    matrial_selectionClick(arr)
    {
      this.select=arr
      },
      add_productok(){
        this.data2=[]
        this.$http({
            url: '/addProduct',
            method: 'GET',
            params:{
              id: this.add_number,
              name: this.add_name,
              price: this.add_price,
              remark: this.add_remark,
              productCateId: this.add_productcateid
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.data2.push({
              num: i+1,
              id: res.body[i].id,
              name: res.body[i].name,
              add_time: '2018-5-27',
              productCateId: res.body[i].productCateId
            })
            }
        }, function () {
            alert("ajax failure")
        })
      },
      product_delete(){
        this.data2=[]
        var k=0
        var deletecount=this.select.length
        for(var j=0;j<deletecount;j++){
          
        this.$http({
            url: '/deleteProduct',
            method: 'GET',
            params:{
              id: this.select[j].id,
            }
        }).then(function (res) {
          console.log(res.body)
          console.log(k++)
            if(k==deletecount){
            for(var i=0;i<res.body.length;i++){
            this.data2.push({
              num: i+1,
              id: res.body[i].id,
              name: res.body[i].name,
              add_time: '2018-5-27',
              productCateId: res.body[i].productCateId
            })
            }}
        }, function () {
            alert("ajax failure")
        })
        }
        },
      modify_productok(){

        this.data2=[]
        this.$http({
            url: '/modifyProduct',
            method: 'GET',
            params:{
              id: this.modify_number,
              name: this.modify_name,
              price: this.modify_price,
              remark: this.modify_remark,
              productCateId: this.modify_productcateid
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.data2.push({
              num: i+1,
              id: res.body[i].id,
              name: res.body[i].name,
              add_time: '2018-5-27',
              productCateId: res.body[i].productCateId
            })
            }
        }, function () {
            alert("ajax failure")
        })

        },
      product_search() {
        this.data2=[]
        if(!this.material_name){
          console.log("222")
        this.$http({
            url: '/productSearch',
            method: 'GET',
            params:{
              Id: this.product_number,
              name: this.product_name
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.data2.push({
              num: i+1,
              id: res.body[i].id,
              name: res.body[i].name,
              add_time: '2018-5-27',
              productCateId: res.body[i].productCateId
            })
            }
        }, function () {
            alert("ajax failure")
        })}
        else{
          console.log("111")
          this.$http({
            url: '/materialSearchproduct',
            method: 'GET',
            params:{
              id: this.material_name,
            }
        }).then(function (res) {
            console.log(res.body[0].productId)
            for(var i=0;i<res.body.length;i++){
            this.data2.push({
              num: i+1,
              id: res.body[0][i].productId,
              name: res.body[0][i].name,
              add_time: '2018-5-27',
              productCateId: '111'
            })
            }
        }, function () {
            alert("ajax failure")
        })

        }
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
