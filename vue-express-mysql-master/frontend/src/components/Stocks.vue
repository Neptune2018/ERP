<template>
  <div>
    <p>仓库基本信息</p>
    <Table strip height="100" :columns="columns1" :data="data1"></Table>
    <p>库存</p>
    <Table strip height="450" :columns="columns0" :data="data0" @on-selection-change="addToList" ref="selection" ></Table>
    <Button @click="genOutList()">生成出库单</Button>
    <!-- <p>库存预警</p>
    <Table strip height="200" :columns="columns1" :data="data2" ></Table> -->
    <!-- <Button @click="back()">返回</Button> -->
    <p>出库单信息</p>
    <Table strip height="250" :columns="columns2" :data="data2" ></Table>
    <Button @click="removeAll()">一键清空</Button>
    <Button @click="clearData()">负责人填写</Button>
    <Modal v-model="addPerson" title="负责人填写">
        <Form ref="formItem" :model="formItem" :rules="ruleItem" :label-width="80" inline>
            <FormItem label = "出库人" prop="fromPerson">
              <Input v-model="formItem.fromPerson" placeholder="" style="width:200px"></Input>
            </FormItem>
            <FormItem label = "接收人" prop="toPerson">
              <Input v-model="formItem.toPerson" placeholder="" style="width:200px"></Input>
            </FormItem>
        </Form>
    </Modal>
    <Button @click="exportWare()">完成出库</Button>
  </div>
</template>
<script>
    export default {
      name:'Stocks',
        data () {
            const checkPersonId = (rule, value, callback) =>{
                if (value === ''){
                    callback(new Error('负责人编号不能为空'))
                }
                const info = {
                    id:value
                }
                this.$http.post('/findPerson',info).then(function (res) {
                    console.log(res.body)
                    if(res.body === 'success'){
                    callback() 
                    } else {
                    callback(new Error('id不存在！'))
                    }
                }, function () {
                    callback(new Error("ajax failure"))
                })
            };
            return {
                columns2:[
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
                        render: (h, params) => {
                            return h('div', [
                                h('InputNumber', {
                                    props:{
                                        min:1,
                                        // max:this.tempData[params.index].remain,
                                        value:this.data2[params.index].remain
                                    },
                                    style: {
                                        marginRight: '5px',
                                        width:'60px',                                   
                                    },
                                    on: {
                                        input: (val) => {
                                            params.row.remain = val
                                            this.data2[params.index] = params.row
                                            //console.log(this.data2[params.index].remain)
                                        }
                                    }
                                }),
                            ]);
                        }
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
                        title:'操作',
                        key:'action',
                        width:150,
                        align:'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }                   
                ],
                columns0:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
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
                data1: [],
                data2:[],
                tempData:[],
                curMax:[],
                addPerson:false,
                formItem:{
                    fromPerson:'',
                    toPerson:'',
                },
                ruleItem:{
                    fromPerson: [
                        { required: true, validator:checkPersonId, trigger: 'blur' }
                    ],
                    toPerson: [
                        { required: true, validator:checkPersonId, trigger: 'blur' }
                    ],
                }
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
                //console.log(res.body);
                this.data0 = res.body;
            }, function () {
                alert("ajax failure")
            });
            this.$http({
                url: '/stocks',
                method: 'GET',
            }).then(function (res) {
                //console.log(res.body);
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
            remove (index) {
            this.data2.splice(index, 1);
            },
            removeAll() {
                this.data2 = []
                this.$refs.selection.selectAll(false)
            },
            addToList(selection,row) {
            //    this.data2=selection
                this.tempData=selection
                console.log(this.tempData)
            },
            genOutList(){
                this.data2=this.tempData
                this.$refs.selection.selectAll(false)
            },
            exportWare(){
                this.tempData=[]
                const info = {
                    fromPerson:this.formItem.fromPerson,
                    toPerson:this.formItem.toPerson,
                    data:this.data2
                }
                //console.log(this.data2)
                this.$http.post('/exportWare',info).then(function (res) {

                if(res.body == "success"){
                this.$Message.success('出库成功')
                this.removeAll()
                } else if (res.body == "fail"){
                    this.$Message.error('余量不足，请重新检测')
                }
            }, function () {
                this.$Message.error('出库失败')
            }) 
            },
            clearData(){
                this.$refs['formItem'].resetFields()
                this.addPerson = true
            } 
        }
    }
</script>
