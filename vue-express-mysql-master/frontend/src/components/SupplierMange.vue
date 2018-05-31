<template>
  <div style="height: 520px;">
    <row class="content">
      <div class="search-form">
        <row class="query">
          <label class="top-label">编号</label>
          <i-input v-model="id" placeholder="请输入编号" style="width: 70%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">名称</label>
          <i-input v-model="name" placeholder="请输入名称" style="width: 70%"></i-input>
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
          <Button class="oper" type="primary" @click="addsupplier=true">新增供应商</Button>
          <Modal v-model="addsupplier" title="新增供应商" @on-ok="supplier_addok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="供应商名称">
                <input type="text" v-model="addSupplierName" style="width:200px">
              </FormItem>
              <FormItem label="负责人">
                <Select v-model="addPersonName" style="width:200px">
                  <Option v-for="item in addSupplierPersonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="备注">
                <input type="textarea" v-model="addRemark" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="supplier_modify = true">修改供应商信息</i-button>
          <Modal v-model="supplier_modify" title="修改供应商信息" @on-ok="supplier_modifyok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="供应商名称">
                <input type="text" v-model="modifySupplierName" style="width:200px">
              </FormItem>
              <FormItem label="负责人">
                <Select v-model="modifyPersonName" style="width:200px">
                  <Option v-for="item in modifySupplierPersonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="备注">
                <Input type="textarea" v-model="modifyRemark" style="width:200px"></Input>
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="deletesupplier()">删除供应商</i-button>
        </row>
      </div>
    </row>
    <div style="margin-top: 20px;">
      <i-table highlight-row @on-current-change='currentchange' @on-selection-change='selectionClick' border :height="150" :columns="columns" :data="table_data"></i-table>
    </div>
    <row class="content">
      <div class="search-form">
        <row class="query">
          <label class="top-label">编号</label>
          <i-input v-model="id" placeholder="请输入编号" style="width: 70%"></i-input>
        </row>
        <row class="query">
          <label class="top-label">名称</label>
          <i-input v-model="name" placeholder="请输入名称" style="width: 70%"></i-input>
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
          <Button class="oper" type="primary" @click="addsupplier=true">新增供应商</Button>
          <Modal v-model="addsupplier" title="新增供应商" @on-ok="supplier_addok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="供应商名称">
                <input type="text" v-model="addSupplierName" style="width:200px">
              </FormItem>
              <FormItem label="负责人">
                <Select v-model="addPersonName" style="width:200px">
                  <Option v-for="item in addSupplierPersonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="备注">
                <input type="textarea" v-model="addRemark" style="width:200px">
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="supplier_modify = true">修改供应商信息</i-button>
          <Modal v-model="supplier_modify" title="修改供应商信息" @on-ok="supplier_modifyok" @on-cancel="cancel">
            <Form :model="formRight" label-position="right" :label-width="100">
              <FormItem label="供应商名称">
                <input type="text" v-model="modifySupplierName" style="width:200px">
              </FormItem>
              <FormItem label="负责人">
                <Select v-model="modifyPersonName" style="width:200px">
                  <Option v-for="item in modifySupplierPersonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="备注">
                <Input type="textarea" v-model="modifyRemark" style="width:200px"></Input>
              </FormItem>
            </Form>
          </Modal>
          <i-button class="oper" type="primary" @click="deletesupplier()">删除供应商</i-button>
        </row>
      </div>
    </row>
    <div style="margin-top: 20px">
      <i-table @on-selection-change='selectionClick' border :height="200" :columns="material_columns" :data="material_data"></i-table>
    </div>
  </div>
</template>
<script>
import Button from '../../node_modules/iview/src/components/button/button.vue'
import Row from '../../node_modules/iview/src/components/grid/row.vue'
import { Modal } from 'iview'
export default {
  name: 'SupplierMange',
  data() {
    return {
      id: '',
      name: '',
      person: '',
      table_data: [],
      material_data: [],
      addSupplierPersonList: [],
      modifySupplierPersonList: [],
      addSupplierName: [],
      modifySupplierName: '',
      modifyPersonName: '',
      modifyRemark: '',
      addPersonName: '',
      addRemark: '',
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
          title: '起定点',
          key: 'minorder'
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
      url: '/getSupplier',
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
            id: this.dataList
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
    },
    currentchange: function(currentRow, oldCurrentRow) {
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
    supplier_addok: function() {},
    supplier_modifyok: function() {},
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