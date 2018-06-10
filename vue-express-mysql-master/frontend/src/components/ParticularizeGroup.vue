<template>
<div class="main-background">

    <div class="select_bar">

        <div class="select-l">
        <Tooltip   content="  点击返回分组页面" placement="top-start" >
        <div class="select_block">
            
            <Button type="ghost" shape="circle" icon="ios-arrow-thin-left" @click="backtogroup"></Button>
            
        </div>
        </Tooltip>

        <Tooltip   content="对用户名,电话,email进行简单搜索" placement="top-start" >
        <div class="select_block">
        
            <div  class="row-r rowdiv">
                
                <input class="guolovesburgerinput" type=text v-model="value4" placeholder="简单搜索" 
                                    clearable  @keyup.enter="searchuser"><span class="focus-border"><i></i>
		            </span>
                <Icon class="gsicon" type="search"  color="#3399FF" size=20></Icon>
            </div>
        </div>
        </Tooltip>

        

        <!-- <div class="select_block">
            <i-input  v-model="value4" icon="search" @on-enter="searchuser" @on-click="searchuser" placeholder="用户名,电话,邮箱" style="width: 200px">
            
        </div> -->

        <Tooltip   content=" 当前角色分类" placement="top" >
        <div class="select_block"> 
            <i-select v-model="model1" @on-change="searchuser" style="width:120px">
                <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
            </i-select>
        </div>
        </Tooltip>
        </div>

        <div class="select-r" style="float:right;">
        <Tooltip   content=" 添加用户" placement="top" >
            <div class="select_block"> 
            <Button  type="info"  shape="circle"  @click="click_on_newusr" style=""><Icon type="person-add" size=16></Icon></Button>
            </div>
        </Tooltip>
        <Tooltip   content="excel导入用户" placement="top-start"   >
        
            <div class="select_block"> 
            <Button type="ghost"  shape="circle" @click="modalexcel=true"><Icon type="ios-cloud-upload-outline"  size=16></Icon></Button>
            </div>
        
        </Tooltip>
        </div>

    </div>

    <div>
        <i-table :columns="columns1" :data="data1"></i-table>
    </div>
   
    
    
            <Modal v-model="modalnew" title="添加新用户"  >

            

                <div>

                   
                        

                        <div class="trow">
                            <div class="row-l">
                                <p>{{this.columns1[1].title}}</p>
                            </div>
                            <div  class="row-r">
                                <input class="guoloveshamburgerinput" type=text v-model="newname" placeholder="New name" 
                                clearable  @blur="nameblur"><span class="focus-border"></span>
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#3399FF">{{this.name_valid_text}}</font></p>

                                <Icon type="checkmark-circled" size="20"  color="#18b566" v-if=namevalid></Icon>
                            </div>


                        </div>



                        <div class="trow">
                            <div class="row-l">
                                <p>{{this.columns1[2].title}}</p>
                            </div>
                            <div  class="row-r">
                                <input class="guoloveshamburgerinput" type=text v-model="newphone" placeholder="Phone number" clearable  @blur="phoneblur">
                                <span class="focus-border"></span>
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#3399FF">{{this.phone_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#18b566" v-if=phonevalid></Icon>
                            </div>

                        </div>

                        <div class="trow">
                            <div class="row-l">
                                <p>{{this.columns1[3].title}}</p>
                            </div>
                            <div class="row-r">
                                <input class="guoloveshamburgerinput" type=text  v-model="newemail" placeholder="Email-address" clearable  @blur="emailblur">
                                <span class="focus-border"></span>
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#3399FF">{{this.email_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#18b566" v-if=emailvalid></Icon>
                            </div>

                        </div>
                        
                        <div class="trow">
                            <div class="row-l">
                                <p>角色</p>
                            </div>
                            <div class="row-r">
                                <i-select v-model="newworktype"  style="width:100px ;height:15px;" @on-open-change="worktypeblur">
                                <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                                </i-select>
                                
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#3399FF">{{this.worktype_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#18b566" v-if=worktypevalid></Icon>
                            </div>

                            
                        </div>

                        <div class="trow">
                            <div class="row-l">
                                <p>职位</p>
                            </div>
                            <div class="row-r">
                                <input  class="guoloveshamburgerinput" type=text v-model="newjob" placeholder="具体职位"    @blur="jobblur">
                                <span class="focus-border"></span>
                            </div>
                            <div  class="row-invalid-text">
                                
                                <p><font color="#3399FF">{{this.job_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#18b566" v-if=jobvalid></Icon>
                            </div>

                            
                        </div>


                        <div class="trow" v-if="newworktype != 'Staff'">
                            <div class="row-l">
                                <p>用户密码</p>
                            </div>
                            <div class="row-r">
                                <input class="guoloveshamburgerinput"  type=password v-model="newpassword" placeholder="请输入密码"     @blur="passwordblur">
                                <span class="focus-border"></span>
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#3399FF">{{this.password_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#18b566" v-if=passwordvalid></Icon>
                            </div>

                            
                        </div>

                        <div class="trow" v-if="newworktype != 'Staff'">
                            <div class="row-l">
                                <p>确认密码</p>
                            </div>
                            <div class="row-r">
                                <input   class="guoloveshamburgerinput" type=password v-model="newpassword2" placeholder="请再次输入密码"    @blur="password2blur">
                                <span class="focus-border"></span>
                            </div>

                            <div  class="row-invalid-text">
                                
                                <p><font color="#3399FF">{{this.password2_valid_text}}</font></p>
                                <Icon type="checkmark-circled" size="20"  color="#18b566" v-if=password2valid></Icon>
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
                        <p>{{this.columns1[2].title}}</p>
                    </div>
                    <div  class="row-r">
                        <input class="guoloveshamburgerinput" type=text  v-model="modifyphone" placeholder="Enter something..." clearable style="width: 200px;">
                        <span class="focus-border"></span>
                    </div>

                </div>

                <div class="trow">
                    <div class="row-l">
                        <p>{{this.columns1[3].title}}</p>
                    </div>
                    <div class="row-r">
                        <input class="guoloveshamburgerinput" type=text  v-model="modifyemail" placeholder="Enter something..." clearable style="width: 200px;">
                        <span class="focus-border"></span>
                    </div>

                </div>
                
                <div class="trow">
                    <div class="row-l">
                        <p>角色</p>
                    </div>
                    <div class="row-r">
                        <i-select v-model="work_type_value"  style="width:120px">
                        <i-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                        </i-select>
                    </div>

                    
                </div>

                <div class="trow">
                    <div class="row-l">
                        <p>职位</p>
                    </div>
                    <div class="row-r">
                         <input class="guoloveshamburgerinput" type=text  v-model="modifyjob" placeholder="具体职位" clearable style="width: 200px;">
                         <span class="focus-border"></span>
                    </div>

                    
                </div>


                 <div class="trow" v-if="work_type_value != 'Staff'">
                    <div class="row-l">
                        <p>用户密码</p>
                    </div>
                    <div class="row-r">
                         <input class="guoloveshamburgerinput"   type=password v-model="modifypassword" placeholder="输入为空默认为原始密码" clearable style="width: 200px;">
                         <span class="focus-border"></span>
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

    <Modal v-model="modalexcel" width=360px>
                    
                    <Upload
                        type="drag"
                        action="/upload" :on-success="uploadexcel" :on-error="handleUploadError" :on-format-error="handleFormatError"
                        :format="['xlsx','xls','png']" ref="upload">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="60" style="color: #3399ff"></Icon>
                            <p>上传excel以添加用户</p>
                        </div>
                    </Upload>
                    
                    <div slot="footer">
                        <p><p>
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

        modalexcel:false,

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
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small',
                                        icon:'edit'
                                    },
                                    style: {
                                        marginRight: '3px',
                                        // background: '#999'
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
                                }, '改'),

                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        icon:"android-delete"
                                        
                                    },
                                    on: {
                                        click: () => {
                                            this.user_id=params.row.id
                                            // this.remove(params.index)
                                            this.removeName=params.row.name
                                            this.modalremove=true;
                                            
                                        }
                                    }
                                }, '删')
                            
                               
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
                this.modify_data[6]=this.modifypassword;

                
               


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
            },
            uploadexcel(){
                this.modalexcel=false;
                this.$Message.success('添加成功');
                this.$refs.upload.clearFiles();
                this.applyforData(this.model1)

            },
            handleUploadError(){
                this.$Message.error('文件内容有误有毒');
                // this.$refs.upload.clearFiles();
            },
            handleFormatError(){
                this.$Message.error('只支持excel文件');
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
            if(this.worktypevalid){
            if(this.newworktype!='Staff'){return !( this.phonevalid&&
                                                    this.emailvalid&&
                                                    this.namevalid&&
                                                    this.passwordvalid&&
                                                    this.password2valid&&
                                                    this.jobvalid&&
                                                    this.worktypevalid )}
            else    return                      !(this.phonevalid&&
                                                    this.emailvalid&&
                                                    this.namevalid&&
                                                    this.jobvalid&&
                                                    this.worktypevalid )
                                                    }
            else return !this.worktypevalid
        },
        isRed: function() {
            return this.newname === '';
        }
    }

  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
p{
    color: #999;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
:focus{outline: none;}

.main-background{
    padding: 1em;
}
i-select{
    margin: 0.5em 0 0 0;
}
.select_bar{
    margin: 0 0 0.5em  0;
    display:flex; flex-direction:row;
}
.rowdiv{
    display:flex; flex-direction:row;
}
.select_block{
    margin:0  0.5em 0 0;
    
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
    margin:16px;  
}
.trow-title{
    display:flex; flex-direction:row;
    margin:5px 5px 25px 0
}
.row-l{
    width:90px;
    text-align: right;
    padding:9px 8px 5px 6px;
    margin:0 10px;

}
.select-r{
    display:flex; flex-direction:row;
    text-align: right;
    
    /* margin:0 10px 0 45%; */
}
.select-l{
    display:flex; flex-direction:row;
    text-align: left;
    /* width:40%; */
    
    
}
.row-l-t{
    width:90px;
    text-align: right;
    padding:9px 8px 5px 6px;
    margin:0 10px;

}
.row-r{
    position: relative;

}
.row-invalid-text{
    
    text-align: left;
    padding:6px;
   

}
icon{
    size:30px;
}
input[type="text"]{
  font: 12px/20px "Lato", Arial, sans-serif;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}      
input[type="password"]{
  font: 12px/20px "Lato", Arial, sans-serif;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}      
.gsicon{border: 0; padding: 6px 10px 7px 0 ; border: 1px solid transparent; 
border-top-color: #57c5f7;
border-right-color: #57c5f7;
border-bottom-color:#57c5f7; 
border-left:0; transition: 0.4s;}
.guoloveshamburgerinput{border: 0; padding: 6px 0 7px ; border: 1px solid transparent; border-bottom-color: #ccc;  transition: 0.4s;}
.guoloveshamburgerinput:focus{padding: 6px 14px 7px ; transition: 0.4s;}     
.guoloveshamburgerinput ~ .focus-border{position: absolute; height: 35px; bottom: 0; left: 0; width: 0; transition: 0.4s;}
.guoloveshamburgerinput:focus ~ .focus-border{width: 100%; transition: 0.4s; border: 2px solid #3399FF;}  

.guolovesburgerinput{border: 0; padding: 6px 6px 7px 12px; border: 1px solid #57c5f7;
border-right: 0;
 transition: 0.4s;}
.guolovesburgerinput:focus{padding: 6px 20px 7px ; transition: 0.4s;}     
.guolovesburgerinput ~ .focus-border{position: absolute; height: 35px; bottom: 0; left: 0; width: 0; transition: 0.4s;}
.guolovesburgerinput:focus ~ .focus-border{width: 100%; transition: 0.4s; border: 2px solid #3399FF;}  



</style>