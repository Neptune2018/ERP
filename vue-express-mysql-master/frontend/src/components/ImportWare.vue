<template>
    <div>
        <Table :columns="column" :data="data"></Table>
        <Button type="ghost" @click="clearData()" >添加记录</Button>
        <Button type="ghost" @click="removeAll()" >清空列表</Button>
        <Button type="ghost" @click="handleSubmit()" >物品入库</Button>
        <Modal v-model="addInTable" title="入库基本信息">
          <Form ref="formItem" :model="formItem" :rules="ruleItem" :label-width="80" inline>
            <FormItem label = "物品种类" >
              <RadioGroup  style="width:200px;" v-model="formItem.style">
                <Radio label="物料"></Radio>
                <Radio label="货品"></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label = "物品名称" prop="goodName">
              <Input v-model="formItem.goodName" placeholder="输入物品名称" style="width: 200px"></Input>
            </FormItem>
            <FormItem label = "入库日期" prop="date">
              <DatePicker v-model="formItem.date" type="date" placeholder="选择入库时间" style="width: 200px"></DatePicker>
            </FormItem><br/>
            <FormItem label = "验收人" prop="fromPerson">
              <Input v-model="formItem.fromPerson" placeholder="" style="width:200px"></Input>
            </FormItem>
            <FormItem label = "入库人" prop="toPerson">
              <Input v-model="formItem.toPerson" placeholder="" style="width:200px"></Input>
            </FormItem><br/>
            <FormItem label = "仓库id" prop="stockId" >
              <Input v-model="formItem.stockId" placeholder="" style="width:200px" ></Input>
            </FormItem>
            <!--<FormItem label = "仓库名称" prop="stockName">
              <Select v-model="formItem.stockName" style="width:200px" @on-open-change="searchWarehouse">
                  <Option v-for="item in stockList" :value="item.value" :key="item.value"></Option>
              </Select>
            </FormItem> <br/> -->
            <FormItem label = "仓库库位" prop="stockPlace">
              <Input v-model="formItem.stockPlace" placeholder="" style="width:200px"></Input>
            </FormItem>
            <FormItem label = "数量" prop="quantity">
              <Input v-model="formItem.quantity" placeholder="" style="width:200px"></Input>
            </FormItem> <br/>
            <FormItem label = "单位" prop="unit">
              <Input v-model="formItem.unit" placeholder="" style="width:200px"></Input>
            </FormItem>
            <FormItem label = "批次" prop="batch">
              <Input v-model="formItem.batch" placeholder="" style="width:200px"></Input>
            </FormItem>
            <br/>          
          </Form>
        <div slot="footer">
          <Button type="primary" size="large" long :loading="loading" @click="insertToTable">加入表格</Button>
        </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'ImportWare',
  data () {
    //一定要有return！！
    //负责人员id是否存在
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
    //仓库是否存在
    const checkStockId = (rule, value, callback) =>{
      if (value === ''){
        callback(new Error('仓库编号不能为空'))
      }
      const info = {
        id:value
      }
      this.$http.post('/findStockId',info).then(function (res) {
        console.log(res.body)
        if(res.body === 'success'){
          callback() 
        } else {
          callback(new Error('仓库不存在！'))
        }
      }, function () {
          callback(new Error("ajax failure"))
      })
    };
    //数量是否超限
    const quantValid = (rule, value, callback) => {
      const info={
        id:this.formItem.stockId,
        name:this.formItem.stockName,
        place:this.formItem.stockPlace,
        quantity:this.formItem.quantity
      }
      this.$http.post('/stockAvail',info).then(function (res) {
        //console.log(res.body.quant)
        if(res.body.quant === 0){
          callback(new Error('数量超过库存限制'))
        } else {
          callback()
        }
      }, function () {
          callback(new Error("ajax failure"))
      })     
    };
    //库位是否已经被占用
    const checkStockPlace = (rule, value, callback) =>{
      if (value === ''){
        callback(new Error('库位信息不能为空'))
      }
      const info = {
        place:value,
        id:this.formItem.stockId,
      }
      this.$http.post('/placeAvail',info).then(function (res) {
        console.log(res.body)
        if(res.body === 'fail'){
          callback(new Error('库位被占用')) 
        } else {
          callback()
        }
      }, function () {
          callback(new Error("ajax failure"))
      })
    };
    return{
      column:[
        {
          title:'日期',
          key:'date'
        },
        {
          title:'类型',
          key:'style'
        },
        {
          title:'物品名称',
          key:'goodName'
        },
        {
          title:'验收人',
          key:'fromPerson'
        },  
        {
          title:'入库人',
          key:'toPerson'
        },
        {
          title:'仓库编号',
          key:'stockId'
        },     
        {
          title:'仓库库位',
          key:'stockPlace'
        }, 
        {
          title:'数量',
          key:'quantity'
        },
        {
          title:'单位',
          key:'unit'
        },
        {
          title:'批次',
          key:'batch'
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
      data:[],
      addInTable:false,
      addInStock:false,
      formItem: {
        date:'',
        fromPerson:'',
        toPerson:'',
        stockId:'',
        goodName:'',
        style:'物料',
        stockPlace:'',
        quantity:'',
        unit:'',
        batch:''
      },
      ruleItem: {
        date: [
            { required: true, type: 'date', message: '请选择入库日期', trigger: 'change' }
        ],
        goodName:[
          { required: true, message: '物品名称不得为空！', trigger: 'change' }
        ],
        fromPerson: [
            { required: true, validator:checkPersonId, trigger: 'blur' }
        ],
        toPerson: [
            { required: true, validator:checkPersonId, trigger: 'blur' }
        ],
        stockId: [
            { required:true,validator:checkStockId,trigger:'blur'}
        ],
        stockPlace:[
            { required:true,validator:checkStockPlace,trigger:'blur'}
        ],
        quantity:[
            { required:true,validator:quantValid,trigger:'blur'}
        ],
        unit:[
            { required:true,message:'请输入物品单位！',trigger:'blur'}
        ],
        batch:[
            { required:true,message:'请输入物品批次！',trigger:'blur'}
        ],
      },
      stockList:[],
      stockInfo:[],
    }
  },
  methods:{
    handleSubmit(){
      const info=this.data
      this.$http.post('/insertWare',info).then(function (res) {
        //console.log(res.body)
        if(res.body == "success"){
          this.$Message.success('入库成功')
          this.removeAll()
        }
      }, function () {
         this.$Message.error('入库失败')
      }) 
      
    },
    // searchWarehouse(){
    //   this.$http({
    //     url: '/getRepertory',
    //     method: 'GET',
    //   }).then(function (res) {
    //       this.stockList = []
    //       this.stockInfo = []
    //       for(var i = 0;i<res.body.length;i++){
    //         var temp={value:res.body[i][i]['name'],label:res.body[i][i]['name']}
    //         this.stockList.push(temp)
    //       }
    //   }, function () {
    //       alert("ajax failure")
    //   })
    // },
    insertToTable(){
      const info = {
        date:this.formItem.date,
        goodName:this.formItem.goodName,
        fromPerson:this.formItem.fromPerson,
        toPerson:this.formItem.toPerson,
        stockId:this.formItem.stockId,
        style:this.formItem.style,
        stockPlace:this.formItem.stockPlace,
        quantity:this.formItem.quantity,
        unit:this.formItem.unit,
        batch:this.formItem.batch
      }    
      this.$refs['formItem'].validate((valid) => {
        if(valid){
          this.data.push(info)
          this.$Message.success('成功加入表格')
          this.addInTable = false;
        }
        else{  
          this.$Message.error('加入表格失败')
        }
      })
      console.log('The loading status is '+this.loading)
      
    },
    remove (index) {
      this.data.splice(index, 1);
    },
    removeAll() {
      this.data = []
    },
    clearData(){
      this.$refs['formItem'].resetFields()
      this.addInTable = true
    }    
  },
}
</script>

<style scoped>
h1 {
  font-weight: normal;
}
.import-title {
  margin:20px 0 0 20px;
}
.import-table-wrapper {
  width:1200px;
  text-align:center;
  margin:30px auto;
  padding:40px 0;
}
</style>