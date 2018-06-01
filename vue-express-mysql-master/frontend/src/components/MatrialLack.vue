<template>
    <div style="height: 500px;">
        <div class="content">
            <div class="query">
                <label class="top-label">编号</label><i-input v-model="id" placeholder="请输入编号" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <label class="top-label">名称</label><i-input v-model="name" placeholder="请输入名称" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <label class="top-label">性质</label><i-input v-model="property" placeholder="请输入性质" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <label class="top-label">分类</label><i-input v-model="category" placeholder="请输入分类" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <i-button class="cost-module-btn search" type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
            </div>
        </div>
        <div style="margin-top: 20px">
            <i-table @on-selection-change='selectionClick' border :height="400" :columns="columns" :data="table_data"></i-table>
        </div>
    </div>
</template>
<script>
import { Modal } from 'iview'
export default {
  //这里是官方的写法，默认导出，ES6
  name: 'MatrialLack',
  data() {
    return {
      id: '',
      name: '',
      category: '',
      property: '',
      table_data: [],
      columns: [
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
        },
        {
          title: '实际库存',
          key: 'sum_quantity'
        },
        // {
        //   title: '单价(元)',
        //   key: 'price'
        // }
      ]
    }
  },
  created(){
      this.$http({
        url: '/getAllStarve',
        method: 'GET',
        }).then(
        function(res) {
          this.$Message.success('获取数据成功')
          this.table_data=res.body.data
          // 返回总记录
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          this.$Message.error('获取数据失败')
        }
      )
  },
  methods: {
      search: function(){
        this.$http({
            url: '/getAllStarve',
            method: 'GET',
            params:{
                id: this.id,
                name: this.name,
                property: this.property,
                category: this.category
            }
        }).then(
        function(res) {
            this.$Message.success('搜索成功')
            this.table_data=res.body.data
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
            this.$Message.error('搜索失败')
        })
    }
  }
}
</script>
<style scoped>
.content{
    display: inline-block;
    margin-top: 15px;
    width: 100%;
}
.query {
  width: 15%;
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
  margin-left: 20%;
}

.top-label {
  margin-right: 5%;
}
</style>