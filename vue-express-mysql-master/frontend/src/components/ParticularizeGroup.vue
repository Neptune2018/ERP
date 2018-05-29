<template>
<div class="main-background">

    <div class="select_bar">
    <Button type="ghost" shape="circle" icon="ios-arrow-thin-left" @click="backtogroup"></Button>
    <i-input v-model="value4" icon="search" @on-enter="searchuser" @on-click="searchuser" placeholder="搜索" style="width: 200px"></i-input>
    
    <i-select v-model="model1" @on-change="searchuser" style="width:200px">
        <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
    </i-select>
    </div>
    <div>
        <i-table :columns="columns1" :data="data1"></i-table>
    </div>
   
    <!-- <p>{{model1}}</p>
    <p>{{this.$route.query.grouptype}}</p>
     -->
    <Modal
        v-model="modalx"
        title="修改用户信息"
        @on-ok="修改"
        @on-cancel="cancel">

       

        <div>


            <table>
                <tr>
                    <th></th>
                    <td> <h1>{{this.currentInFO.name}}</h1></td>
                </tr>

                <tr> </tr>

                <tr>
                    <th><b>{{this.columns1[2].title}}</b></th>
                    <td>  <i-input v-model="modifyphone" placeholder="Enter something..." clearable style="width: 200px;"></i-input></td>
                </tr>
                

                <tr>
                    <th><b>{{this.columns1[3].title}}</b></th>
                    <td> <i-input v-model="modifyemail" placeholder="Enter something..." clearable style="width: 200px;"></i-input></td>
                </tr>

                <tr>
                    <th><b>职位</b></th>
                    <td> <i-select v-model="valuem"  style="width:200px">
                        <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                        </i-select>
                    </td>
                </tr>

                <tr>
                    <th><b>密码</b></th>
                    <td>  <i-input  placeholder="Enter something..." clearable style="width: 200px;"></i-input>
                    </td>
                </tr>
                
            </table>
        
        
        <!-- <i-input v-bind='modifypassword' placeholder="Enter something..." clearable></i-input> -->

       
        
        </div>
        <!-- <i-input>{{this.currentInFO.email}}</i-input> -->
    </Modal>
</div>
</template>

<script>
export default {
  name: 'g_test',
  data () {
    return {
        msg: 'Guos test',
        value4: '',
        valuem:'',
        modifyphone:'',
        modifyemail:'',
        cityList: [
                    {
                        value: 'Accountant',
                        label: '会计师'
                    },
                    {
                        value: 'Buyer',
                        label: '采购员'
                    },
                    {
                        value: 'Staff',
                        label: '职工'
                    },
                    {
                        value: 'Professional',
                        label: '生产管理员'
                    },
                    {
                        value: 'Keeper',
                        label: '仓库管理员'
                    },
                    {
                        value: 'Admin',
                        label: '管理员'
                    }
                ],
        model1: '',
        modalx:false,
        grouprestr:'',
        textrestr:'',
        currentInFO:[],
        columns1: [ 
                    {
                        title: '工号',
                        key: 'id',
                        width:70
                       
                    },
                    {
                        title: '姓名',
                        key: 'name',
                       
                    },
                    {
                        title: '联系方式',
                        key: 'phone',
                       
                    },
                    
                     {
                        title: '邮箱',
                        key: 'email',
                       
                    },
                    // {
                    //     title: '职位',
                    //     key: 'job',
                       
                    // },

                     {
                        title: '更新时间',
                        key: 'updatedAt',
                       
                    },
                     {
                        title: '修改',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '1px'
                                    },
                                    on: {
                                        click: () => {
                                            // this.show(params.index)
                                           this.currentInFO=params.row;
                                           this.modalx = true;
                                           this.valuem=params.row.job
                                           this.modifyphone=params.row.phone
                                            this.modifyemail=params.row.email

                                        }
                                    }
                                }, '修改'),
                               
                            ]);
                        }
                    }
                    
                ],
        data1: [
                    
                ]
        
    }
    
  },
  methods:{
      backtogroup:function(){
           this.$router.push('/' + 'group')
      },

      applyforData:function(data){
            var that = this;
            this.$http({

                        url: '/getsinglegrouponloadapi?group='+data,
                        method: 'GET',
                    }).then(function (res) {
                        console.log(data);
                        console.log(res.body);
                        that.data1 = res.body[0];
                    }, function () {
                        alert("ajax failure")
                    });
  
      },

    //   setText:function(){
    //         this.textrestr=this.value4;
    //         this.searchuser();
    //   },

    //   setGroup:function(){
    //         this.grouprestr=this.model1;
    //         this.searchuser();
    //   },

    //   searchuser:function(){
             
    //          var sql="select * from users where roleId=(select Id from roles where name ='"+this.grouprestr+"')"
    //          if(this.textrestr!=''){
    //              sql+= "and (phone like '%"+this.textrestr+"%' or email like '%"+this.textrestr+"%' or name like '%"+this.textrestr+"%');"
    //          }
    //          this.$http({

    //                     url: '/searchuserapi?sql='+sql,
    //                     method: 'GET',
    //                 }).then(function (res) {
    //                     console.log(sql);
    //                     console.log(res.body);
    //                     this.data1 = res.body[0];
    //                 }, function () {
    //                     alert("ajax failure")
    //                 });
  
    //   }

      searchuser:function(){
             
             var sql="select * from users where roleId=(select Id from roles where name ='"+this.model1+"')"
             if(this.value4!=''){
                 sql+= "and (phone like '%"+this.value4+"%' or email like '%"+this.value4+"%' or name like '%"+this.value4+"%');"
             }
             this.$http({

                        url: '/searchuserapi',
                        method: 'POST',
                        body:{
                            sql: sql,
                        }
                    }).then(function (res) {
                        console.log(sql);
                        console.log(res.body);
                        this.data1 = res.body[0];
                    }, function () {
                        alert("ajax failure")
                    });
  
      }
      
      
      

    },
    // watch:{
    //      model1:this.applyforData(this.model1)
          
    //   },
   
    
      
    
    created () {
        this.model1=this.$route.query.grouptype;
        //this.$router.params.grouptype
        this.applyforData(this.model1)
    
      
    },

  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.main-background{
    padding: 1em;
}
i-select{
    margin: 0.5em 0 0 0;
}
.select_bar{
    margin: 0 0 0.5em  0;
}
.ml{
    margin:5px;
    display:inline-flex;
}
tr{
    padding:3px;
}
th{
    text-align: right;
     padding:3px;
}
table{
    padding: 10em；
    
}
</style>