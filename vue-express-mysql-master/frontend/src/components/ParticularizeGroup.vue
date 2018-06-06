<template>
<div class="main-background">

    <div class="select_bar">
    <Poptip trigger="hover"  content="  点击返回分组页面" >
    <Button type="ghost" shape="circle" icon="ios-arrow-thin-left" @click="backtogroup"></Button>
    </Poptip>
    <i-input v-model="value4" icon="search" @on-enter="searchuser" @on-click="searchuser" placeholder="用户名,电话,邮箱" style="width: 200px"></i-input>

    <i-select v-model="model1" @on-change="searchuser" style="width:200px">
        <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
    </i-select>
    </div>
    <div>
        <i-table :columns="columns1" :data="data1"></i-table>
    </div>
   
   
    <Modal
        v-model="modalx"
        title="修改用户信息"
      
        >

       

        <div>

            <div>
                <div class="trow-title">
                    <div class="row-l-t">
                        <Icon type="person" size="35"  color="#999"></Icon>
                    </div>
                    <div>
                        <h1>{{this.currentInFO.name}}</h1>
                    </div>
                     <div>
                        <h5 ><font color="#87CEFA">{{this.valuem}}</font></h5>
                    </div>


                </div>

                <div class="trow">
                    <div class="row-l">
                        <b>{{this.columns1[2].title}}</b>
                    </div>
                    <div  class="row-r">
                        <i-input v-model="modifyphone" placeholder="Enter something..." clearable style="width: 200px;"></i-input>
                    </div>

                </div>

                <div class="trow">
                    <div class="row-l">
                        <b>{{this.columns1[3].title}}</b>
                    </div>
                    <div class="row-r">
                        <i-input v-model="modifyemail" placeholder="职位大类" clearable style="width: 200px;"></i-input>
                    </div>

                </div>
                
                <div class="trow">
                    <div class="row-l">
                        <b>角色</b>
                    </div>
                    <div class="row-r">
                        <i-select v-model="valuem"  style="width:200px">
                        <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                        </i-select>
                    </div>

                    
                </div>

                <div class="trow">
                    <div class="row-l">
                        <b>职位</b>
                    </div>
                    <div class="row-r">
                         <i-input v-model="modifyjob" placeholder="具体职位" clearable style="width: 200px;"></i-input>
                    </div>

                    
                </div>


                 <div class="trow">
                    <div class="row-l">
                        <b>用户密码</b>
                    </div>
                    <div class="row-r">
                         <i-input  type=password v-model="newpassword" placeholder="输入为空默认为原始密码" clearable style="width: 200px;">
                    </div>

                    
                </div>



            </div>

            


            <!-- <table>
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
                
            </table> -->
        
        
        <!-- <i-input v-bind='modifypassword' placeholder="Enter something..." clearable></i-input> -->

       
        
        </div>

        <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="Modify">修改</Button>
        </div>

       
    </Modal>
</div>
</template>

<script>
export default {
  name: 'g_test',
  data () {
    return {
        msg: 'Guos test',
        modal_loading: false,
        value4: '',
        valuem:'',
        modifyphone:'',
        modifyemail:'',
        modifyid:'',
        newpassword:'',
        modifyjob:'',
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
                    {
                        title: '职位',
                        key: 'job',
                       
                    },

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
                                            this.valuem=this.model1
                                            this.modifyphone=params.row.phone
                                            this.modifyemail=params.row.email
                                            this.modifyid=params.row.id
                                            this.modifyjob=params.row.job

                                        }
                                    }
                                }, '修改'),
                               
                            ]);
                        }
                    }
                    
                ],
        data1: [
                    
                ],
        modify_data:[]
        
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
  
      },

      Modify () {
                this.modal_loading = true;

                this.modify_data[0]=this.modifyid;
                this.modify_data[1]=this.currentInFO.name;
                this.modify_data[2]=this.modifyemail;
                this.modify_data[3]=this.modifyphone;
                this.modify_data[4]=this.valuem;
                this.modify_data[5]=this.modifyjob;
                this.modify_data[6]=this.newpassword;

                
               


                for(var i=0;i<this.modify_data.length-1;i++){

                    if(this.modify_data[i]==''){
                        this.$Message.error('修改内容不能为空');
                        this.modal_loading = false;
                        // this.modalx = false;

                        return
                    }
                }

                this.$http({

                        url: '/modifyUINFObyadmin',
                        method: 'POST',
                        body:{
                            modify_data: this.modify_data,
                        }
                    }).then(function (res) {
                        console.log(this.modify_data);
                        console.log(res.body);
                        // this.data1 = res.body[0];
                    }, function () {
                        alert("ajax failure")
                    });



                setTimeout(() => {
                    this.modal_loading = false;
                    this.modalx = false;
                    this.$Message.success('修改成功');
                    this.applyforData(this.model1);
                }, 2000);
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

.trow{
    display:flex; flex-direction:row;
    margin:17px;  
}
.trow-title{
    display:flex; flex-direction:row;
    margin:5px 5px 25px 0
}
.row-l{
    width:90px;
    text-align: right;
    padding:6px;
    margin:0 10px;

}
.row-l-t{
    width:90px;
    text-align: right;
    padding:5px;
    margin:0 10px;

}
.row-r{


}
icon{
    size:30px;
}
</style>