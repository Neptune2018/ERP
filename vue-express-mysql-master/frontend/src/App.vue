<template>
  <div id='app'>
    <!-- Header -->
    <div class='layout'>
      <div class='layout-ceiling'>
         <div class='layout-logo'>
          <img src='./assets/logo.png' style='height:50px'>
        </div>
           <div class='layout-ceiling-main'>
          <a href='../documentation/'>帮助中心</a>
          <Button type='text' @click='logout'>登出</Button>
        </div>    
      </div>
    </div>
    <!-- Main -->
    <div class='main' :class="{'main-hide-text': spanLeft < 5}">
      <Row type='flex'>
        <i-col :span="spanLeft" class='main-menu-left'>
          <Menu active-name='outline' theme='dark' width='auto' @on-select='select'>
            <Submenu name='BOM'>
              <template slot='title'>
                <Icon type='ios-albums' :size='iconSize'></Icon>
                <span class='main-text'>BOM信息维护</span>
              </template>
              <Menu-item name='goods'>货品信息管理</Menu-item>
              <Menu-item name='material'>物料信息管理</Menu-item>
              <Menu-item name='category'>类别信息管理</Menu-item>
            </Submenu>
            <Submenu name='cost'>
              <template slot='title'>
                <Icon type='social-usd' :size='iconSize'></Icon>
                <span class='main-text'>成本管理</span>
              </template>
              <Menu-item name='costmanage'>成本管理</Menu-item>
            </Submenu>
            <Submenu name='warehouse'>
              <template slot='title'>
                <Icon type='ios-home' :size='iconSize'></Icon>
                <span class='main-text'>仓库管理</span>
              </template>
              <Menu-item name='ImportWare'>入库管理</Menu-item>
              <Menu-item name='ExportWare'>出库管理</Menu-item>
              <Menu-item name='inventory'>库存情况管理</Menu-item>
            </Submenu>
            <Submenu name='purchase'>
              <template slot='title'>
                <Icon type='ios-cart' :size='iconSize'></Icon>
                <span class='main-text'>采购辅助管理</span>
              </template>
              <Menu-item name='starving'>缺料浏览</Menu-item>
              <Menu-item name='supplier'>供应商管理</Menu-item>
            </Submenu>
            <Submenu name='production'>
              <template slot='title'>
                <Icon type='gear-a' :size='iconSize'></Icon>
                <span class='main-text'>生产管理</span>
              </template>
              <Menu-item name='generate'>生成订单</Menu-item>
              <Menu-item name='state'>订单状态查询</Menu-item>
            </Submenu>
            <Submenu name='information'>
              <template slot='title'>
                <Icon type='android-person' :size='iconSize'></Icon>
                <span class='main-text'>个人信息管理</span>
              </template>
              <Menu-item name='operator'>操作员</Menu-item>
              <Menu-item name='group'>分组</Menu-item>
            </Submenu>
          </Menu>
        </i-col>
        <i-col :span='spanRight' class='content'>
           <div class='main-header'>
            <i-button type='text' @click='toggleClick' id='toggle-click'>
              <Icon type='navicon' size='32'></Icon>
            </i-button>
            <span>当前所在位置为：{{bigPos}} / {{samllPos}}</span>
          </div> 
          <div class='main-content'>
            <router-view></router-view>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {

  },
  data () {
    return {
      spanLeft: 5,
      spanRight: 19,
      bigPos:null,
      samllPos:null
    }
  },
  computed: {
    /**
      * @description 图标大小，有大图标与小图标两种显示
      */
    iconSize () {
      return this.spanLeft === 5 ? 14 : 24
    }
  },
  methods: {
    /**
      * @description 点击图标切换大小图标并能显示或隐藏标题
      */
    toggleClick () {
      if (this.spanLeft === 5) {
        this.spanLeft = 2
        this.spanRight = 22
      } else {
        this.spanLeft = 5
        this.spanRight = 19
      }
    },
    /**
      * @description 登出接口
      */
    logout () {
     
    },
    /**
      * @description 选择路由，渲染不同组件
      */
    select (name) {
      if (name === 'outline') {
        name = ''
      }
      if(name === 'goods'){
        this.bigPos = 'BOM信息维护'
        this.samllPos = '货品信息管理'
      }else if(name === 'material'){
        this.bigPos = 'BOM信息维护'
        this.samllPos = '物料信息管理'
      }else if(name === 'category'){
        this.bigPos = 'BOM信息维护'
        this.samllPos = '类别信息管理'
      }else if(name === 'costmanage'){
        this.bigPos = '成本管理'
        this.samllPos = '成本管理'
      }else if(name === 'ImportWare'){
        this.bigPos = '仓库管理'
        this.samllPos = '入库管理'
      }else if(name === 'ExportWare'){
        this.bigPos = '仓库管理'
        this.samllPos = '出库管理'
      }else if(name === 'inventory'){
        this.bigPos = '仓库管理'
        this.samllPos = '库存情况管理'
      }else if(name === 'starving'){
        this.bigPos = '采购辅助管理'
        this.samllPos = '缺料浏览' 
      }else if(name === 'supplier'){
        this.bigPos = '采购辅助管理'
        this.samllPos = '供应商管理'
      }else if(name === 'generate'){
        this.bigPos = '生产管理'
        this.samllPos = '生成订单' 
      }else if(name === 'state'){
        this.bigPos = '生产管理'
        this.samllPos = '订单状态查询'
      }else if(name === 'operator'){
        this.bigPos = '个人信息管理'
        this.samllPos = '操作员'
      }else if(name === 'group'){
        this.bigPos = '个人信息管理'
        this.samllPos = '分组'
      }      
      this.$router.push('/' + name)
    },
  },
  created () {
  }
}
</script>

<style scoped>
.app
{
    padding: 0;  
    margin: 0;  
    height: 100%;  
    overflow:hidden;  
}

.layout {
  border-bottom: 0;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}

.layout-logo {
  color: #9ba7b5;
  font-size: 2em;
  float: left;
  position: relative;
}

.layout-ceiling {
  background: #464c5b;
  padding: 1em 0em;
  overflow: hidden;
}

.layout-ceiling-main {
  float: right;
  padding-top: 1em;
  margin-right: 3em;
}

.layout-ceiling-main a {
  color: #9ba7b5;
}

.main {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}

.main-content {
  min-height: 73.73vh;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.main-content-body {
  padding: 10px;
}

.main-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.main-menu-left {
  background: #464c5b;
  height:fill-available;
}

.main-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.main-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
  margin-left: 1em;
  display: inline-flex;
}

.main-logo-left img {
  margin-left: 3em;
}

.main-logo-left p {
  padding-left: 1em;
  font-size: 1.5em;
  color: white;
}

.main-hide-text .main-text {
  display: none;
}

.email {
  display: inline;
}

.ivu-col {
  transition: width .2s ease-in-out;
}

.ivu-btn-text {
    color: #8f9fad;
    background-color: transparent;
    border-color: transparent;
}
</style>