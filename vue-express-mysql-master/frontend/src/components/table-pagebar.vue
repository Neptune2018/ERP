<template xmlns:v-on="http://www.w3.org/1999/xhtml"
          xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="page-bar">
        <div class="page-size">
            <div>
                <select v-on:change="menuChange()" v-model="limit">
                    <option v-for="item in menu" v-bind:value="item" :key="item">{{item}}</option>
                </select>
                记录/页，显示第 {{start}} 至 {{end}} 项记录，共 {{totalSize}} 项
            </div>
        </div>
        <div class="page-con">
            <ul>
                <li>
                    <a v-on:click="firstClick()" v-bind:class="{ 'disabled': cur == 1}">首页</a>
                </li>
                <li>
                    <a v-on:click="preClick()" v-bind:class="{ 'disabled': cur == 1}">上一页</a>
                </li>
                <li v-for="per in pages" v-bind:class="{ 'active': cur == per}" :key="per">
                    <a v-on:click="pageClick(per)">{{ per }}</a>
                </li>
                <li>
                    <a v-on:click="nextClick()" v-bind:class="{ 'disabled': cur == totalPage}">下一页</a>
                </li>
                <li>
                    <a v-on:click="lastClick()" v-bind:class="{ 'disabled': cur == totalPage}">尾页</a>
                </li>
                <li>
                    <a>共
                        <i>{{totalPage}}</i>页</a>
                </li>
            </ul>
        </div>
        <div class="clear-both"></div>
    </div>
</template>

<script>
export default {
  props: ['page-model'],
  data() {
    return {
      // 初始页
      cur: 1,
      // 请求地址
      url: this.pageModel.url ? this.pageModel.url : '',
      // 请求参数
      param: this.pageModel.param ? this.pageModel.param : {},
      // 请求方法 默认为GET请求
      method: this.pageModel.method ? this.pageModel.method : 'GET',
      // 每页显示数量 默认每页显示10条
      limit: this.pageModel.limit ? this.pageModel.limit : 10,
      // 底部分页基数 默认5
      perSize: this.pageModel.perSize ? this.pageModel.perSize : 5,
      // 每页显示数量 下拉选项
      menu: this.pageModel.menu ? this.pageModel.menu : [5, 10, 50],
      // 分页参数 自定义名称
      pageParamName: this.pageModel.pageParamName
        ? this.pageModel.pageParamName
        : ['page', 'limit'],
      // 当前列表显示记录起始数
      start: 0,
      // 当前列表显示记录结束数
      end: 0,
      // 总页数
      totalPage: 0,
      // 记录总数
      totalSize: 0,
      // 分页请求返回数据
      dataList: []
    }
  },
  created(){
    this.getData()
  },
  methods: {
    // 首页
    firstClick: function() {
      if (this.cur > 1) {
        this.cur = 1
        this.getData()
      }
    },
    // 尾页
    lastClick: function() {
      if (this.cur < this.totalPage) {
        this.cur = this.totalPage
        this.getData()
      }
    },
    // 上一页
    preClick: function() {
      if (this.cur > 1) {
        this.cur--
        this.getData()
      }
    },
    // 下一页
    nextClick: function() {
      if (this.cur < this.totalPage) {
        this.cur++
        this.getData()
      }
    },
    // 页码
    pageClick: function(data) {
      if (data != this.cur) {
        this.cur = data
        this.getData()
      }
    },
    // 刷新显示记录数
    refreshPageCon: function() {
      this.start = (this.cur - 1) * this.limit + 1
      if (this.totalSize >= this.limit * this.cur) {
        this.end = this.limit * this.cur
      } else {
        this.end = this.totalSize
      }
    },
    // 分页请求
    getData: function() {
      let _this = this
      this.param[this.pageParamName[0]] = this.cur
      this.param[this.pageParamName[1]] = this.limit
      this.$http({
        url: this.url,
        method: this.method,
        params: this.param
        }).then(
        function(res) {
          console.log(res.body)
          this.dataList = res.body.data
          // 返回总记录数
          this.totalSize = res.body.count
          this.totalPage = Math.ceil(this.totalSize / this.limit)
          this.refreshPageCon()
          this.$emit('refresh', this.dataList)
          //this.$router.push({path: '/hello', query:{data: res.body}})
        },
        function() {
          alert('ajax failure')
        }
      )
    //   Ajax({
    //     url: _this.url,
    //     method: _this.method,
    //     data: _this.param,
    //     callback: function(res) {
    //       // 返回结果数据集
    //       this.dataList = res.data
    //       // 返回总记录数
    //       _this.totalSize = 25

    //       _this.totalPage = Math.ceil(_this.totalSize / _this.limit)
    //       _this.refreshPageCon()
    //       _this.$dispatch('refresh', this.dataList)
    //     }
    //   })
    },
    // 每页显示记录数 下拉
    menuChange: function() {
      this.getData()
    },
    getPage: function(curPage, totalPage, pageNum) {
      var leftPage, rightPage
      curPage = curPage > 1 ? curPage : 1
      curPage = curPage > totalPage ? totalPage : curPage
      totalPage = curPage > totalPage ? curPage : totalPage
      // 左侧页数
      leftPage = curPage - Math.floor(pageNum / 2)
      leftPage = leftPage > 1 ? leftPage : 1

      // 右侧页数
      rightPage = curPage + Math.floor(pageNum / 2)
      rightPage = rightPage > totalPage ? totalPage : rightPage

      var curPageNum = rightPage - leftPage + 1
      // 左侧调整
      if (curPageNum < pageNum && leftPage > 1) {
        leftPage = leftPage - (pageNum - curPageNum)
        leftPage = leftPage > 1 ? leftPage : 1
        curPageNum = rightPage - leftPage + 1
      }

      // 右侧调整
      if (curPageNum < pageNum && rightPage < totalPage) {
        rightPage = rightPage + (pageNum - curPageNum)
        rightPage = rightPage > totalPage ? totalPage : rightPage
      }

      var arr = []
      for (var i = leftPage; i <= rightPage; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  computed: {
    pages: function() {
      return this.getPage(this.cur, this.totalPage, this.perSize)
    }
  }
}
</script>

<style>
ul,
li {
  margin: 0px;
  padding: 0px;
}

li {
  list-style: none;
  display: inline;
}

.page-bar li:first-child > a {
  margin-left: 0px;
}

.page-bar a {
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  cursor: pointer;
}

.page-bar a:hover {
  background-color: #eee;
}

.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}

.page-bar i {
  font-style: normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}

.page-bar .page-con,
.page-size {
  width: 50%;
  display: block;
  height: 30px;
  float: left;
  line-height: 30px;
}

.page-bar .page-con ul {
  float: right;
  padding-left: 15px;
  padding-right: 15px;
  display: inline-block;
  padding-left: 0;
}

.page-bar .page-size div {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}

a.disabled {
  color: #777;
  background-color: #fff;
  border-color: #ddd;
  cursor: not-allowed;
}

a.disabled:hover {
  background-color: #fff;
}

.clear-both {
  clear: both;
}

select {
  border: solid 1px #ddd;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  padding-right: 15px;
  padding-left: 15px;
  padding-top: 2px;
  padding-bottom: 2px;
}

select::-ms-expand {
  display: none;
}
</style>