<template>
  <div>
    <p>仓库基本信息</p>
    <Table strip height="200" :columns="columns1" :data="data1"></Table>
    <p>库存</p>
    <Table strip height="450" :columns="columns0" :data="data0"></Table>
    <!-- <p>库存预警</p>
    <Table strip height="200" :columns="columns1" :data="data2"></Table> -->
    <!-- <Button @click="back()">返回</Button> -->
  </div>
</template>
<script>
    export default {
      name:'Stocks',
        data () {
            return {
                columns0:[
                  {
                      title:'序号',
                      key:'id',
                      sortable: true
                  },
                  {
                      title:'货品编号',
                      key:'goodsId',
                      sortable: true
                  },
                  {
                      title:'物料名称',
                      key:'name'
                  },
                  {
                      title:'数量',
                      key:'remain',
                      sortable: true
                  },
                  {
                      title:'单位',
                      key:'unit'
                  },
                  {
                      title:'性质',
                      key:'style'
                  },
                  {
                      title: '选择',
                      key: 'choose',
                      width: 150,
                      align: 'center',
                      render: (h, params) => {
                        return h('div', [
                          h('Button', {
                            props:{
                              // type: 'primary',
                              size: 'small'
                            },
                            style: {
                              marginRight: '5px'
                            },
                            on: {
                              click: () => {
                                this.show(params.index)
                              }
                            }
                          }, 'View')
                        ]);
                      }
                  }
                ],
                columns1: [
                    {
                        title: '仓库编码',
                        key: 'id'
                    },
                    {
                        title: '仓库名称',
                        key: 'name'
                    },
                    {
                        title: '标记',
                        key: 'remark'
                    },
                    {
                        title:'管理员',
                        key:'user1name'
                    },
                    {
                        title:'负责人',
                        key:'user2name'
                    }
                ],
                data0:[],
                data1: []
            }
        },
        created:function()
        {
            // this.$http({
            //     url: '/threshold_warning',
            //     method: 'GET',
            // }).then(function (res) {
            //     console.log(res.body);
            //     this.data2 = res.body;
            // }, function () {
            //     alert("ajax failure")
            // });
            this.$http({
                url: '/stations',
                method: 'GET',
            }).then(function (res) {
                console.log(res.body);
                this.data0 = res.body;
            }, function () {
                alert("ajax failure")
            });
            this.$http({
                url: '/stocks',
                method: 'GET',
            }).then(function (res) {
                console.log(res.body);
                this.data0 = res.body;
            }, function () {
                alert("ajax failure")
            })
        },
        methods: {
          show(index){
            this.$Modal.info({
              title: '详细信息',
              content: `序号: ${this.data0[index].id}<br>货品编号:${this.data0[index].goodsId}<br>物料名称:${this.data0[index].name}<br>数量:${this.data0[index].remain}<br>单位:${this.data0[index].unit}<br>性质:${this.data0[index].style}<br>批次:${this.data0[index].batch}<br>仓库ID:${this.data0[index].repertoryId}`
            })
          },
          // back() {
          //   this.$router.push({path: '/inventory'})
          // }
        }
    }
</script>
