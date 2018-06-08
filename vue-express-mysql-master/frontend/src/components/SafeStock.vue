<template>
    <div style="height: 500px;">
        <div class="content">
          <i-col span="20">
            <div class="query">
                <label class="top-label">编号</label>
                <i-input @on-enter="search()" v-model="id" placeholder="请输入编号" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <label class="top-label">名称</label>
                <i-input @on-enter="search()" v-model="name" placeholder="请输入名称" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <label class="top-label">性质</label>
                <i-input @on-enter="search()" v-model="property" placeholder="请输入性质" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <label class="top-label">分类</label>
                <i-input @on-enter="search()" v-model="category" placeholder="请输入分类" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <i-button class="purchase-module-btn search" type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
            </div>
          </i-col>
          <i-col span="4">
            <div class="query">
                <i-button class="purchase-module-btn calculate" type="ghost" shape="circle" @click="setquantity">设置安全库存</i-button>
                <Modal v-model="setquantity1" title="修改安全库存" @on-ok="setquantity_ok" @on-cancel="cancel">
                  <Form :model="formRight" label-position="right" :label-width="100">
                  <FormItem label="物料编号">
                      <input disabled v-model="modifymaterialId" style="width:200px">
                    </FormItem>
                  <FormItem label="物料名称">
                      <input disabled v-model="modifymaterialName" style="width:200px">
                    </FormItem>
                  <Form :model="formRight" label-position="right" :label-width="100">
                    <FormItem label="安全库存">
                      <input type="number" v-model="modifymaterialQuantity" style="width:200px">
                    </FormItem>
                  </Form>
                </Modal>
            </div>
          </i-col>
        </div>
        <div style="margin-top: 20px">
            <i-table @on-selection-change='selectionClick' border :height="400" :columns="columns" :data="table_data"></i-table>
        </div>
    </div>
</template>
<script>
export default {
  //这里是官方的写法，默认导出，ES6
  name: 'SafeStock',
  data() {
    return {
      dataList: [],
      id: '',
      name: '',
      category: '',
      property: '',
      table_data: [],
      columns: [
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
          key: 'mater_cate.category'
        },
        {
          title: '安全库存',
          key: 'safe_quantity'
        }
        // {
        //   title: '单价(元)',
        //   key: 'price'
        // }
      ],
      setquantity1 : false,
      modifymaterialId : '',
      modifymaterialName : '',
      modifymaterialQuantity : ''
    }
  },
  created() {
    this.$http({
      url: '/getAllMaterials',
      method: 'GET'
    }).then(
      function(res) {
        this.table_data = res.body.data
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
      },
      function() {
        this.$Message.error('获取数据失败')
      }
    )
  },
  computed: {},
  methods: {
    search: function() {
      this.$http({
        url: '/getAllMaterials',
        method: 'GET',
        params: {
          id: this.id,
          name: this.name,
          property: this.property,
          category: this.category
        }
      }).then(
        function(res) {
            this.$Message.success('搜索成功')
          this.table_data = res.body.data
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
      if(arr.length == 1)
      {
        this.modifymaterialId = arr[0].id,
        this.modifymaterialName = arr[0].name,
        this.modifymaterialQuantity = arr[0].safe_quantity
      }else{
        this.modifymaterialId = '',
        this.modifymaterialName = '',
        this.modifymaterialQuantity = ''
      }
    },
    setquantity:function(){
      if (this.dataList.length == 0) {
         this.$Message.warning('请选择需要更改安全库存的物料')
      }else{
        this.setquantity1 = true
      }
    },
    setquantity_ok: function() {
        if (this.modifymaterialQuantity) {
          this.$http({
            url: '/setSafeQuantity',
            method: 'GET',
            params: {
              id: this.dataList,
              quantity: this.modifymaterialQuantity
            }
          }).then(
            function(res) {
                this.$Message.success('设置成功')
              this.table_data = res.body.data
              // 返回总记录
              //this.$router.push({path: '/hello', query:{data: res.body}})
            },
            function() {
                this.$Message.error('设置失败')
            }
          )
        } else {
            
            this.$Message.warning('安全库存不能为空')
        }
    }
  }
}
</script>
<style scoped>
.content {
    width: 100%;
  display: inline-block;
  margin-top: 15px;
}
.query {
  width: 15%;
  margin-left: 2%;
  margin-right: 2%;
  display: inline-block;
}

.purchase-module-btn {
  color: white;
  background-color: #4169e1;
  border-color: #4169e1;
}

.purchase-module-btn:hover {
  color: white;
  background-color: #4169e1;
  border-color: #4169e1;
}

.search {
  margin-left: 20%;
}

.top-label {
  margin-right: 5%;
}
</style>