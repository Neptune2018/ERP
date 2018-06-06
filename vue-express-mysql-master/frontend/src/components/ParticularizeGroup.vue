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



    <Button  type="info"   @click="click_on_newusr">添加用户</Button>

    </div>

    <div>
        <i-table :columns="columns1" :data="data1"></i-table>
    </div>
   
    
    
            <Modal v-model="modalnew" title="增加新用户" >

            

                <div>

                    <div>
                        <div class="trow-title">
                            <div class="row-l-t">
                                <Icon type="person" size="35"  color="#999"></Icon>
                            </div>
                            <div>
                                <h1>新成员！</h1>
                            </div>
                            <div>
                                <h5><font color="#87CEFA">{{this.newworktype}}</font></h5>
                            </div>
                            
                        </div>

                        <div class="trow">
                            <div class="row-l">
                                <b>{{this.columns1[1].title}}</b>
                            </div>
                            <div  class="row-r">
                                <i-input v-model="newname" placeholder="Enter something..." 
                                
                                clearable style="width: 200px;height:30px;" @on-blur="nameblur"></i-input> 
                                
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#FF7F00">{{this.name_valid_text}}</font></p>

                                <Icon type="checkmark-circled" size="20"  color="#9BCD9B" v-if=namevalid></Icon>
                            </div>


                        </div>



                        <div class="trow">
                            <div class="row-l">
                                <b>{{this.columns1[2].title}}</b>
                            </div>
                            <div  class="row-r">
                                <i-input v-model="newphone" placeholder="Enter something..." clearable style="width: 200px;height:15px;" @on-blur="phoneblur"></i-input>
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#FF7F00">{{this.phone_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#9BCD9B" v-if=phonevalid></Icon>
                            </div>

                        </div>

                        <div class="trow">
                            <div class="row-l">
                                <b>{{this.columns1[3].title}}</b>
                            </div>
                            <div class="row-r">
                                <i-input v-model="newemail" placeholder="Enter something..." clearable style="width: 200px;height:15px;" @on-blur="emailblur"></i-input>
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#FF7F00">{{this.email_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#9BCD9B" v-if=emailvalid></Icon>
                            </div>

                        </div>
                        
                        <div class="trow">
                            <div class="row-l">
                                <b>角色</b>
                            </div>
                            <div class="row-r">
                                <i-select v-model="newworktype"  style="width:200px ;height:15px;" @on-open-change="worktypeblur">
                                <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                                </i-select>
                                
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#FF7F00">{{this.worktype_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#9BCD9B" v-if=worktypevalid></Icon>
                            </div>

                            
                        </div>

                        <div class="trow">
                            <div class="row-l">
                                <b>职位</b>
                            </div>
                            <div class="row-r">
                                <i-input v-model="newjob" placeholder="具体职位"  style="width: 200px;height:15px;" @on-blur="jobblur"></i-input >
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#FF7F00">{{this.job_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#9BCD9B" v-if=jobvalid></Icon>
                            </div>

                            
                        </div>


                        <div class="trow" v-if="newworktype != 'Staff'">
                            <div class="row-l">
                                <b>用户密码</b>
                            </div>
                            <div class="row-r">
                                <i-input  type=password v-model="newpassword" placeholder="请输入密码"  style="width: 200px;height:15px;" @on-blur="passwordblur">
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#FF7F00">{{this.password_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#9BCD9B" v-if=passwordvalid></Icon>
                            </div>

                            
                        </div>

                        <div class="trow" v-if="newworktype != 'Staff'">
                            <div class="row-l">
                                <b>确认密码</b>
                            </div>
                            <div class="row-r">
                                <i-input  type=password v-model="newpassword2" placeholder="请再次输入密码"  style="width: 200px;height:15px;" @on-blur="password2blur">
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#FF7F00">{{this.password2_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#9BCD9B" v-if=password2valid></Icon>
                            </div>

                            
                        </div>

                </div>
                    
                </div>

                <div slot="footer">
                        <Button type="success" size="large" long :loading="modal_loading" @click="AddUser" v-bind:disabled=" hasInvalid  "  >添加</Button>
                        
                </div>
        
            </Modal>



    <Modal v-model="modalx" title="修改用户信息" >

       

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
                        <h5 ><font color="#87CEFA">{{this.work_type_value}}</font></h5>
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
                        <i-input v-model="modifyemail" placeholder="Enter something..." clearable style="width: 200px;"></i-input>
                    </div>

                </div>
                
                <div class="trow">
                    <div class="row-l">
                        <b>角色</b>
                    </div>
                    <div class="row-r">
                        <i-select v-model="work_type_value"  style="width:200px">
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


                 <div class="trow" v-if="work_type_value != 'Staff'">
                    <div class="row-l">
                        <b>用户密码</b>
                    </div>
                    <div class="row-r">
                         <i-input  type=password v-model="modifypassword" placeholder="输入为空默认为原始密码" clearable style="width: 200px;">
                    </div>

                    
                </div>

        </div>
              
        </div>

        <div slot="footer">
                <Button type="info" size="large" long :loading="modal_loading" @click="Modify">修改</Button>
                
        </div>
  
    </Modal>





    <Modal v-model="modalremove" width="360">
                    <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span>删除确认</span>
                    </p>
                    <div style="text-align:center">
                        <p>确定要删除<font color="#EE7942">{{this.removeName}}</font>该用户吗</p>
                        
                    </div>
                    <div slot="footer">
                        <Button type="error" size="large" long :loading="modal_loading" @click="RemoveUser">删除</Button>
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
        work_type_value:'',
        modifyphone:'',
        modifyemail:'',
        modifyid:'',
        modifypassword:'',
        modifyjob:'',
        user_id:'',

        model1: '',
        modalx:false,
        modalremove:false,
        
        modalnew:false,
        newworktype:'',
        newphone:'',
        newemail:'',
        newname:'',
        newpassword:'',
        newpassword2:'',
        newjob:'',

        phonevalid:false,
        emailvalid:false,
        namevalid:false,
        passwordvalid:false,
        password2valid:false,
        jobvalid:false,
        worktypevalid:false,

        name_valid_text:'',
        email_valid_text:'',
        phone_valid_text:'',
        password_valid_text:'',
        password2_valid_text:'',
        job_valid_text:'',
        worktype_valid_text:'',


        removeName:'',

        grouprestr:'',
        textrestr:'',
        currentInFO:[],
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
                        title: '修删',
                        key: 'action',
                        width: 120,
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
                                            this.work_type_value=this.model1
                                            this.modifyphone=params.row.phone
                                            this.modifyemail=params.row.email
                                            this.modifyid=params.row.id
                                            this.modifyjob=params.row.job

                                        }
                                    }
                                }, '修改'),

                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.user_id=params.row.id
                                            // this.remove(params.index)
                                            this.removeName=params.row.name
                                            this.modalremove=true;
                                            
                                        }
                                    }
                                }, '刪除')
                            
                               
                            ]);
                        }
                    }
                    
                ],
        data1: [
                    
                ],
        modify_data:[],
        new_data:[]
        
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
                this.modify_data[4]=this.work_type_value;
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
            },
            RemoveUser () {
                this.modal_loading = true;

                this.new_data[0]=this.user_id
                this.new_data[4]=this.work_type_value;
                // this.new_data[1]=this.currentInFO.name;
                // this.new_data[2]=this.modifyemail;
                // this.new_data[3]=this.modifyphone;
                // this.new_data[4]=this.work_type_value;
                // this.new_data[5]=this.modifyjob;
                // this.new_data[6]=this.newpassword;
               


               

                this.$http({

                        url: '/removeuser',
                        method: 'POST',
                        body:{
                            new_data: this.new_data,
                        }
                    }).then(function () {
                        console.log(this.new_data);
                        // console.log(res.body);
                        // this.data1 = res.body[0];
                    }, function () {
                        alert("ajax failure")
                    });

                setTimeout(() => {
                    this.modal_loading = false;
                    this.modalremove = false;
                    this.$Message.success('删除成功');
                    this.applyforData(this.model1);
                }, 1000);



               
            },

            AddUser(){

                this.modal_loading = true;

                
                this.new_data[1]=this.newname;
                this.new_data[2]=this.newemail;
                this.new_data[3]=this.newphone;
                this.new_data[4]=this.newworktype;
                this.new_data[5]=this.newjob;
                this.new_data[6]=this.newpassword;
               


               

                this.$http({

                        url: '/adduser',
                        method: 'POST',
                        body:{
                            new_data: this.new_data,
                        }
                    }).then(function () {
                        console.log(this.new_data);
                        // console.log(res.body);
                        // this.data1 = res.body[0];
                    }, function () {
                        alert("ajax failure")
                    });

                setTimeout(() => {
                    this.modal_loading = false;
                    this.modalnew = false;
                    this.$Message.success('添加成功');
                    this.applyforData(this.model1);
                    this.paramsSetNull()
                }, 1000);

               



            },

            paramsSetNull(){
                this.newname=''
                this.newemail=''
                this.newphone=''
                this.newworktype=''
                this.newjob=''
                this.newpassword=''
                this.newpassword2=''
                this.phonevalid=false;
                this.emailvalid=false;
                this.namevalid=false;
                this.passwordvalid=false;
                this.password2valid=false;
                this.jobvalid=false;
                this.worktypevalid=false;

                this.name_valid_text='';
                this.email_valid_text='';
                this.phone_valid_text='';
                this.password_valid_text='';
                this.password2_valid_text='';
                this.job_valid_text='';
                   this.worktype_valid_text='';
            },

            nameblur(){
                        if(this.newname==''){
                            this.namevalid=false;
                            this.name_valid_text='无名氏不可'
                        }
                        else{
                            this.namevalid=true;
                            this.name_valid_text=''
                        }
            },

            worktypeblur(){
                        if(this.newworktype==''){
                            this.worktypevalid=false;
                            this.worktype_valid_text='请择职业'
                        }
                        else{
                            this.worktypevalid=true;
                            this.worktype_valid_text=''
                        }
            },

            phoneblur(){
                        if(this.newphone==''){
                            this.phonevalid=false;
                            this.phone_valid_text='无电话不可'
                        }
                        else if(!(/^[0-9]*$/.test(this.newphone))){
                            this.phonevalid=false;
                            this.phone_valid_text='电话含非数字字符'
                        }
                        else if(this.newphone.length!=11){
                            this.phonevalid=false;
                            this.phone_valid_text='号码非11位不可'
                        }
                        else{
                            this.phonevalid=true;
                            this.phone_valid_text=''
                        }
            },

            emailblur(){
                        if(this.newemail==''){
                            this.emailvalid=false;
                            this.email_valid_text='无邮箱不可'
                        }
                        else if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.newemail)){
                            this.emailvalid=false;
                            this.email_valid_text='邮箱格式有误'
                        }
                        else{
                            this.emailvalid=true;
                            this.email_valid_text=''
                        }
            },
            passwordblur(){
                        if(this.newpassword==''){
                            this.passwordvalid=false;
                            this.password_valid_text='无密码不可'
                        }
                        else{
                            this.passwordvalid=true;
                            this.password_valid_text=''
                        }
            },
            password2blur(){
                        if(this.newpassword2==''){
                            this.password2valid=false;
                            this.password2_valid_text='请输入'
                        }
                        else if(this.newpassword!=this.newpassword2){
                            this.password2valid=false;
                            this.password2_valid_text='两次密码不一致'
                        }
                        else{
                            this.password2valid=true;
                            this.password2_valid_text=''
                        }
            },
            jobblur(){
                        if(this.newjob==''){
                            this.jobvalid=false;
                            this.job_valid_text='职位空白不可'
                        }
                        else{
                            this.jobvalid=true;
                            this.job_valid_text=''
                        }
            },
            click_on_newusr(){
                
                this.paramsSetNull()
                this.modalnew=true
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
    computed:{
        hasInvalid:function(){
            return !(this.phonevalid&&
        this.emailvalid&&
        this.namevalid&&
       this.passwordvalid&&
        this.password2valid&&
        this.jobvalid&&
        this.worktypevalid )
        }
    }

  
  
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
.row-invalid-text{
    
    text-align: left;
    padding:6px;
   

}
icon{
    size:30px;
}
</style>