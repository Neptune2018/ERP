<template>
    <div>
        <Table :columns="column" :data="data"></Table>
        <Button type="ghost" @click="clearData()" >添加记录</Button>
        <Button type="ghost" @click="handleSubmit()" >物品入库</Button>
        <Modal v-model="addInTable" title="入库基本信息" @on-ok="insertToTable">
          <Form ref="formItem" :model="formItem" :label-width="80" inline>
            <FormItem label = "物品种类" >
              <RadioGroup  style="width:200px;" v-model="formItem.style">
                <Radio label="物料"></Radio>
                <Radio label="货品"></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label = "入库日期">
              <DatePicker v-model="formItem.date" type="date" placeholder="选择入库时间" style="width: 200px"></DatePicker>
            </FormItem><br/>
            <FormItem label = "验收人">
              <Input v-model="formItem.fromPerson" placeholder="" style="width:200px"></Input>
            </FormItem>
            <FormItem label = "入库人">
              <Input v-model="formItem.toPerson" placeholder="" style="width:200px"></Input>
            </FormItem><br/>
            <FormItem label = "仓库id" >
              <Input v-model="formItem.stockId" placeholder="" style="width:200px" ></Input>
            </FormItem>
            <FormItem label = "仓库名称">
              <Select v-model="formItem.stockName" style="width:200px" @on-open-change="searchWarehouse">
                  <Option v-for="item in stockList" :value="item.value" :key="item.value"></Option>
              </Select>
            </FormItem> <br/> 
            <FormItem label = "仓库库位">
              <Input v-model="formItem.stockPlace" placeholder="" style="width:200px"></Input>
            </FormItem>
            <FormItem label = "数量">
              <Input v-model="formItem.quantity" placeholder="" style="width:200px"></Input>
            </FormItem> <br/>
            <FormItem label = "单位">
              <Input v-model="formItem.unit" placeholder="" style="width:200px"></Input>
            </FormItem>
            <FormItem label = "批次">
              <Input v-model="formItem.batch" placeholder="" style="width:200px"></Input>
            </FormItem>
            <br/>     
            <FormItem>
              <Button type="ghost" style="" @click=" stockAvail()">数量可用查询</Button>
            </FormItem>     
            <FormItem>
              <Button type="ghost" style="" @click=" placeAvail()">库位可用查询</Button>
            </FormItem>
            <FormItem>
              <Button type="ghost" style="" @click=" wareAvail()">仓库可用查询</Button>
            </FormItem> 
          </Form>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'ImportWare',
  data () {
    //一定要有return！！
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
          title:'验收人',
          key:'fromPerson'
        },  
        {
          title:'入库人',
          key:'toPerson'
        },
        {
          title:'仓库id',
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
        stockName:'',
        style:'物料',
        stockPlace:'',
        quantity:'',
        unit:'',
        batch:''
      },
      stockList:[],
      stockInfo:[],
    }
  },
  methods:{
    handleSubmit(){
      const info={
        date:this.formItem.date,
        fromPerson:this.formItem.fromPerson,
        toPerson:this.formItem.toPerson,
        stockId:this.formItem.stockId,
        stockName:this.formItem.stockName,
        style:this.formItem.style,
        stockPlace:this.formItem.stockPlace,
        quantity:this.formItem.quantity,
        unit:this.formItem.unit,
        batch:this.formItem.batch
      }
      this.$http.post('/insertWare',info).then(function (res) {
        //console.log(res.body)
        if(res.body == "success"){
          alert("入库成功")
        }
      }, function () {
          alert("入库失败")
      }) 
    },
    searchWarehouse(){
      this.$http({
        url: '/getRepertory',
        method: 'GET',
      }).then(function (res) {
          this.stockList = []
          this.stockInfo = []
          for(var i = 0;i<res.body.length;i++){
            var temp={value:res.body[i][i]['name'],label:res.body[i][i]['name']}
            this.stockList.push(temp)
          }
      }, function () {
          alert("ajax failure")
      })
    },
    stockAvail(){
      const info={
        id:this.formItem.stockId,
        name:this.formItem.stockName,
        place:this.formItem.stockPlace,
        quantity:this.formItem.quantity
      }
      this.$http.post('/stockAvail',info).then(function (res) {
        //console.log(res.body.quant)
        if(res.body.quant === 0){
          alert('数量超过库存限制')
        } else {
          alert('数量可存')
        }
      }, function () {
          alert("ajax failure")
      })      
    },
    placeAvail(){
      const info={
        id:this.formItem.stockId,
        name:this.formItem.stockName,
        place:this.formItem.stockPlace,
        quantity:this.formItem.quantity
      }
      this.$http.post('/placeAvail',info).then(function (res) {
        //console.log(res.body.place)
        if(res.body.place === 0){
          alert('库位被占用')
        } else {
          alert('库位可用')
        }
      }, function () {
          alert("ajax failure")
      }) 
    },
    wareAvail(){
      const info={
        id:this.formItem.stockId,
        name:this.formItem.stockName,
        place:this.formItem.stockPlace,
        quantity:this.formItem.quantity
      }
      this.$http.post('/wareAvail',info).then(function (res) {
        //console.log(res.body.ware)
        if(res.body.ware === 0){
          alert('仓库id错误！')
        } else {
          alert('id正确，仓库可用')
        }
      }, function () {
          alert("ajax failure")
      }) 
    },
    insertToTable(){
      const info = {
        date:this.formItem.date,
        fromPerson:this.formItem.fromPerson,
        toPerson:this.formItem.toPerson,
        stockId:this.formItem.stockId,
        stockName:this.formItem.stockName,
        style:this.formItem.style,
        stockPlace:this.formItem.stockPlace,
        quantity:this.formItem.quantity,
        unit:this.formItem.unit,
        batch:this.formItem.batch
      }
      this.data.push(info)
      console.log('already push!')
    },
    remove (index) {
      this.data.splice(index, 1);
    },
    clearData(){
      this.formItem = {
        date:'',
        fromPerson:'',
        toPerson:'',
        stockId:'',
        stockName:'',
        style:'物料',
        stockPlace:'',
        quantity:'',
        unit:'',
        batch:''        
      }
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