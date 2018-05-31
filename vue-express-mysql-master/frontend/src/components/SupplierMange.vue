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
                <label class="top-label">负责人</label><i-input v-model="person" placeholder="请输入负责人" style="width: 70%"></i-input>
            </div>
            <div class="query">
                <i-button class="cost-module-btn search" type="ghost" icon="ios-search" shape="circle" @click="search()">搜索</i-button>
            </div>
            <div class="query">
                <i-button class="cost-module-btn calculate" type="ghost" shape="circle" @click="deletesupplier()">删除供应商</i-button>
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
  name: 'SupplierMange',
  data() {
    return {
      id: '',
      name: '',
      person: '',
      table_data: [],
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
        url: '/getSupplier',
        method: 'GET',
        }).then(
        function(res) {
          this.$Message.success('获取数据成功')
          this.table_data=res.body
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
            url: '/getSupplier',
            method: 'GET',
            params:{
                id: this.id,
                name: this.name,
                person: this.person
            }
        }).then(
        function(res) {
            this.$Message.success('搜索成功')
            this.table_data=res.body
        // 返回总记录
        //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
            this.$Message.error('搜索失败')
        })
    },
    selectionClick(arr) {
      this.dataList = []
      for (var i = 0; i < arr.length; i++) {
        this.dataList.push(arr[i]['id'])
      }
    },
    deletesupplier: function() {
      if (this.dataList.length != 0) {
          this.$http({
            url: '/deleteSupplierById',
            method: 'GET',
            params: {
              id: this.dataList,
            }
          }).then(
            function(res) {
                this.$Message.success('删除成功')
                this.table_data = res.body
              // 返回总记录
              //this.$router.push({path: '/hello', query:{data: res.body}})
            },
            function() {
                this.$Message.error('删除失败')
            }
          )
      } else {
          this.$Message.warning('请选择需要更改安全库存的物料')
      }
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