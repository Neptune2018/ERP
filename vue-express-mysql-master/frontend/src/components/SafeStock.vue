<template>
    <div style="height: 500px;">
        <div class="content">
            <div class="query">
                <label class="top-label">编号</label>
                <i-input v-model="id" placeholder="请输入编号" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <label class="top-label">名称</label>
                <i-input v-model="name" placeholder="请输入名称" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <label class="top-label">性质</label>
                <i-input v-model="property" placeholder="请输入性质" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <label class="top-label">分类</label>
                <i-input v-model="category" placeholder="请输入分类" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <i-button class="purchase-module-btn search" type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
            </div>
            
        </div>
        <div class="content">
            <div class="query"  style="width: 20%">
                <label class="top-label">安全库存</label>
                <i-input v-model="quantity" placeholder="请输入安全库存" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <i-button class="purchase-module-btn calculate" type="ghost" shape="circle" @click="setquantity()">设置安全库存</i-button>
            </div>
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
      quantity: '',
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
      ]
    }
  },
  created() {
    this.$http({
      url: '/getAllMaterials',
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
    },
    setquantity: function() {
      if (this.dataList.length != 0) {
        if (this.quantity) {
          this.$http({
            url: '/setSafeQuantity',
            method: 'GET',
            params: {
              id: this.dataList,
              quantity: this.quantity
            }
          }).then(
            function(res) {
                this.$Message.success('设置成功')
              this.table_data = res.body.data
              // 返回总记录
              //this.$router.push({path: '/hello', query:{data: res.body}})
            },
            function() {
                this.$Message.error('获取数据失败')
            }
          )
        } else {
            
            this.$Message.warning('安全库存不能为空')
        }
      } else {
          this.$Message.warning('请选择需要更改安全库存的物料')
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
  margin-left: 50%;
}

.top-label {
  margin-right: 5%;
}
</style>