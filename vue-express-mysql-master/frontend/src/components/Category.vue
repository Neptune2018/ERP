
<template>
  <div style="height: 500px;">
    <div class="top">
        <!-- <div class="query" style="width: 25%">
          <i-input  placeholder="请输入关键词" style="width: 60%"></i-input>
        </div> -->
        <!-- <div class="query" style="width: 10%">
        <i-button class="search" type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
        </div> -->
      <div style="display: inline-block">
        <table cellspacing="10">
          <tr>
            <td><i-button class="oper" type="primary" @click="materialcate_add=true">新增物料子分类</i-button></td>
        <Modal
          v-model="materialcate_add"
          title="新增物料分类"
          @on-ok="add_materialcateok"
          @on-cancel="cancel">
          <div class="q">
            <label class="model1">父分类</label><i-input v-model="add_fathercater" placeholder="请输入父分类标号" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">分类名</label><i-input v-model="add_catename" placeholder="请输入分类名称" style="width: 60%"></i-input>
          </div>
        </Modal>
        <td><i-button class="oper" type="primary" @click="productcate_add=true">新增货品子分类</i-button></td>
        <Modal
          v-model="productcate_add"
          title="新增货品分类"
          @on-ok="add_productcateok"
          @on-cancel="cancel">
          <div class="q">
            <label class="model1">父分类</label><i-input v-model="add_fathercater2" placeholder="请输入父分类标号" style="width: 60%"></i-input>
          </div>
          <div class="q">
            <label class="model1">分类名</label><i-input v-model="add_catename2" placeholder="请输入分类名称" style="width: 60%"></i-input>
          </div>
        </Modal>
            <td><i-button class="oper" type="primary"@click="productcate_delete()" >删除货品分类</i-button></td>
            <td><i-button class="oper" type="primary" @click="materialcate_delete()">删除物料分类</i-button></td>
            <td></td>
            <td><i-button class="oper" type="primary">导出分类</i-button></td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <div class="show" style="width: 45%">
        <Tree :data="product_data1"></Tree>
        <i-table  highlight-row  @on-selection-change='productcate_selectionClick' border :height="200"  :columns="product_columns1" :data="product_data1"  @on-current-change="handleRowChange1"></i-table>
      </div>
      <div class="show" style="width: 45%">
        <i-table highlight-row  @on-selection-change='matrialcate_selectionClick' border :height="200" :columns="material_columns1" :data="material_data1" @on-current-change="handleRowChange2"></i-table>
      </div>
    </div>
    <div>
    <div class="show" style="width: 45%">
      <i-table  stripe border :height="200" :columns="product_columns2" :data="product_data2"></i-table>
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
    created() {
        this.$http({
          url: '/getProducts',
          method: 'GET'
        }).then(
          function(res) {
            for(var i=0;i<res.body.length;i++){
            this.product_data2.push({
              product_id: res.body[i].id,
              product_name: res.body[i].name,
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
          url: '/getProductcates',
          method: 'GET'
        }).then(
          function(res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.product_data1.push({
              sortid:res.body[i].id,
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
        this.$http({
          url: '/getMaterial',
          method: 'GET'
        }).then(
          function(res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.material_data2.push({
              material_id:res.body[i].id,
              material_name: res.body[i].name,
            })
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
            this.material_data1.push({
              sortid:res.body[i].id,
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
    name: 'Category',
    data () {

      //一定要有return！！
      return{
        selectproduct:'',
        selectmaterial:'',
        add_catename:'',
        add_fathercater:'',
        add_fathercater2:'',
        add_catename2:'',
        materialcate_add: false,
        productcate_add:false,
        product_columns1:[
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type:'index',
            width:60,
            align:'center'
          },
          {
            title:'货品分类编号',
            key:'sortid'
          },
          {
            title:'货品分类情况',
            key:'sort'
          }
        ],
        product_data1:[
        ],

        material_columns1:[
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type:'index',
            width:60,
            align:'center'
          },
          {
            title:'物料分类编号',
            key:'sortid'
          },
          {
            title:'物料分类情况',
            key:'sort'
          }
        ],
        material_data1:[
        ],

        product_columns2:[
          {
            type:'index',
            width:60,
            align:'center'
          },
          {
            title:'该分类下货品编号',
            key:'product_id'
          },
          {
            title:'该分类下货品',
            key:'product_name'
          }
        ],
        product_data2:[
        ],
        material_columns2:[
          {
            type:'index',
            width:60,
            align:'center'
          },
          {
            title:'该分类下物料编号',
            key:'material_id'
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
    methods:
    {
      matrialcate_selectionClick(arr)
    {
      this.selectmaterial=arr
      },
      productcate_selectionClick(arr)
    {
      this.selectproduct=arr
      },
      productcate_delete(){
        this.product_data1=[]
        var k=0
        var deletecount=this.selectproduct.length
        for(var j=0;j<deletecount;j++){
        this.$http({
            url: '/deleteProductcate',
            method: 'GET',
            params:{
              id: this.selectproduct[j].sortid,
            }
        }).then(function (res) {
            console.log(res.body)
            console.log(k++)
            if(k==deletecount){
            for(var i=0;i<res.body.length;i++){
            this.product_data1.push({
              sortid: res.body[i].id,
              sort: res.body[i].name
            })
            }}
        }, function () {
            alert("ajax failure")
        })
        }
        },
        materialcate_delete(){
        this.material_data1=[]
        var k=0
        var deletecount=this.selectmaterial.length
        for(var j=0;j<deletecount;j++){
        this.$http({
            url: '/deleteMaterialcate',
            method: 'GET',
            params:{
              id: this.selectmaterial[j].sortid,
            }
        }).then(function (res) {
            console.log(res.body)
            console.log(k++)
            if(k==deletecount){
            for(var i=0;i<res.body.length;i++){
            this.material_data1.push({
              sortid:res.body[i].id,
              sort: res.body[i].name
            })
            }}
        }, function () {
            alert("ajax failure")
        })
        }
        },
      add_materialcateok(){
      this.material_data1=[]
      console.log(this.add_fathercater);
      console.log(this.add_catename);
        this.$http({
            url: '/addMaterialcate',
            method: 'GET',
            params:{
              materCateId:  this.add_fathercater,
              name: this.add_catename
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.material_data1.push({
              sortid: res.body[i].id,
              sort: res.body[i].name
            })
            }
        }, function () {
            alert("ajax failure")
        })
      },
      add_productcateok(){
        console.log("11111")
      this.product_data1=[]
        this.$http({
            url: '/addProductcate',
            method: 'GET',
            params:{
              productCateId:  this.add_fathercater2,
              name: this.add_catename2
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.product_data1.push({
              sortid: res.body[i].id,
              sort: res.body[i].name
            })
            }
        }, function () {
            alert("ajax failure")
        })
      },
      handleRowChange1(currentRow, oldCurrentRow){
        this.product_data2=[]
        this.$http({
            url: '/cateProduct',
            method: 'GET',
            params:{
              id: currentRow.sortid
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.product_data2.push({
              product_id: res.body[i].id,
              product_name: res.body[i].name,
            })
            }
        }, function () {
            alert("ajax failure")
        })
        // this.product_data1=[]
        // this.$http({
        //     url: '/cateProductcate',
        //     method: 'GET',
        //     params:{
        //       id: currentRow.sortid
        //     }
        // }).then(function (res) {
        //     console.log(res.body)
        //     for(var i=0;i<res.body.length;i++){
        //     this.product_data1.push({
        //       product_id: res.body[i].id,
        //       product_name: res.body[i].name,
        //     })
        //     }
        // }, function () {
        //     alert("ajax failure")
        // })
    },
    handleRowChange2(currentRow, oldCurrentRow){
        console.log(currentRow)
        this.material_data2=[]
        this.$http({
            url: '/cateMaterial',
            method: 'GET',
            params:{
              id: currentRow.sortid
            }
        }).then(function (res) {
            console.log(res.body)
            for(var i=0;i<res.body.length;i++){
            this.material_data2.push({
              material_id: res.body[i].id,
              material_name: res.body[i].name,
            })
            }
        }, function () {
            alert("ajax failure")
        })
    },
    }
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
