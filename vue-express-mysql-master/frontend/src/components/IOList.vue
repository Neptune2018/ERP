<template>
  <div>
    <Tabs type="card">
        <Tab-pane label="仓库基本信息">
            <Table strip height="100" :columns="columns1" :data="data0"></Table>
        </Tab-pane>
    </Tabs>
    <Tabs type="card" style="margin-top:10px;">
        <Tab-pane label="出入库信息">           
            <Table strip height="262" :columns="columns0" :data="data2"></Table>
        </Tab-pane>
    </Tabs >    
    <Button @click="change2Stocks()">仓库库存</Button>
  </div>
</template>
<script>
    export default {
      name:'IOList',
        data () {
            return {
                columns0:[
                  {
                      title:'序号',
                      key:'num',
                      sortable: true
                  },
                  {
                      title:'操作类型',
                      key:'style',
                      sortable: true
                  },
                  {
                      title:'物料名称',
                      key:'name'
                  },
                  {
                      title:'数量',
                      key:'quantity',
                      sortable: true
                  },
                  {
                      title:'出入库编号',
                      key:'ioListId'
                  },
                  {
                      title:'货品编号',
                      key:'goodsId'
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
                data2: []
            }
        },
        created:function()
        {
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
                url: '/iorecord',
                method: 'GET',
            }).then(function (res) {
                console.log(res.body);
                this.data2 = res.body;
            }, function () {
                alert("ajax failure")
            })
        },
        methods: {
          show(index){
            this.$Modal.info({
              title: '详细信息',
              content: `序号: ${this.data0[index].num}<br>操作类型:${this.data0[index].style}<br>物料名称:${this.data0[index].name}<br>数量:${this.data0[index].quantity}<br>更新日期:${this.data0[index].updatedAt}<br>出入库编号:${this.data0[index].ioListId}<br>货物编号:${this.data0[index].goodsId}<br>负责人from:${this.data0[index].fromName}<br>负责人to:${this.data0[index].toName}`
            })
          },
            change2Stocks() {
              this.$router.push({path: '/inventory/stocks'})
            }
        }
    }
</script>
