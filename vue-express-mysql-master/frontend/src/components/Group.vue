<template>

    <div class="main-background">

        
        <div class='select_bar'>
        <!-- <i-input v-model="value4" icon="search" placeholder="搜索" style="width: 200px"></i-input> -->

        <i-select  class="gb" v-model="model1" placeholder="请选择职位"  @on-change="selectGroup" style="width:120px">
            <i-option v-for="item in cityList" :value="item.value" :key="item.value" >{{ item.label }}</i-option>
        </i-select>
        <Tooltip   content="添加用户" placement="top" >
        <Button  class="gb" type="info" shape=circle  @click="click_on_newusr"><Icon type="person-add" size=16></Icon></Button>
        </Tooltip>
        <Poptip trigger="hover"  content="excel批量导入用户信息" >
        <Button class="gb" type="ghost" shape=circle @click="modalexcel=true"><Icon type="ios-cloud-upload-outline"  size=16></Icon></Button>
        </Poptip>

            
            <Modal v-model="modalnew" title="增加新用户" >

            

                <div>

                   
                       

                        <div class="trow">
                            <div class="row-l">
                                <p>{{this.usercolumns[1].title}}</p>
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
                                <p>{{this.usercolumns[2].title}}</p>
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
                                <p>{{this.usercolumns[3].title}}</p>
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
        
        
        
        <div>
            <i-table :columns="columns1" :data="data1"></i-table>
        </div>

        


    </div>
    
</template>

<script>
export default {
  name: 'g_test',
  data () {
    return {
        msg: 'Guos test',
        value4: '',
        
        modal_loading: false,
        value4: '',
        valuem:'',

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

        user_id:'',

        model1: '',
        
        modalexcel:false,
        modalnew:false,
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
                        label: '库管'
                    },
                    {
                        value: 'Admin',
                        label: '管理员'
                    }
                ],
        model1: '',
        columns1: [
                    {
                        title: '职位分类',
                        key: 'name',
                        width:260,
                        render:(h,params)=>{
                            return h('div',[
                                h('a',{
                                    on:{
                                        click:()=>{
                                            this.$router.push({path:'/group/ParticularizeGroup', query:{grouptype:params.row.name } })
                                        }
                                    }
                                },params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '人数',
                        key: 'num',
                        width:200,
                    },
                    {
                        title: '职能',
                        key: 'describe'
                    }
                ],

        usercolumns:[
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

        ],
        data1: [
                    
                ],
        new_data:[]
        
    }
    
  },
  methods:{
      selectGroup :function () {
      this.$router.push({path:'/group/ParticularizeGroup', query:{grouptype:this.model1 } })
    },
      tqalert :function(){
          alert('泰拳警告')
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
                    this.update();
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
            },

        update(){
            var that = this;
            this.$http({
                        url: '/getgrouponloadapi',
                        method: 'GET',
                    }).then(function (res) {
                        console.log(res.body);
                        that.data1 = res.body[0];
                    }, function () {
                        alert("ajax failure")
                    });
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

            },
            handleUploadError(){
                this.$Message.error('文件内容有误有毒');
                // this.$refs.upload.clearFiles();
            },
            handleFormatError(){
                this.$Message.error('只支持excel文件');
            }
  },
  created:function(){
      var that = this;
      this.$http({
                url: '/getgrouponloadapi',
                method: 'GET',
            }).then(function (res) {
                console.log(res.body);
                that.data1 = res.body[0];
            }, function () {
                alert("ajax failure")
            });
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
            
                                    }
            
    }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

:focus{outline: none;}
h1, h2 {
  font-weight: normal;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  
}
p{
    color: #999;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.main-background{
    padding: 1em;
}

.gb{
     margin: 0 0.4em 0 0;
}
.select_bar{
    margin: 0 0 0.9em  0;
}

.trow{
    display:flex; flex-direction:row;
    margin:13px;  
}
.trow-title{
    display:flex; flex-direction:row;
    margin:5px 5px 15px 0
}
.row-l{
    width:90px;
    text-align: right;
    padding:9px;
    margin:0 5px;

}
.row-l-t{
    width:90px;
    text-align: right;
    padding:5px;
    margin:0 9px;

}
.row-r{
    position: relative;

}
.row-invalid-text{
    
    text-align: left;
    padding:6px;
   

}
icon{
    size:28px;
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
.guoloveshamburgerinput{border: 0; padding: 6px 0 7px ; border: 1px solid transparent; border-bottom-color: #ccc;  transition: 0.4s;}
.guoloveshamburgerinput:focus{padding: 6px 14px 7px ; transition: 0.4s;}     
.guoloveshamburgerinput ~ .focus-border{position: absolute; height: 35px; bottom: 0; left: 0; width: 0; transition: 0.4s;}
.guoloveshamburgerinput:focus ~ .focus-border{width: 100%; transition: 0.4s; border: 2px solid #3399FF;}    
</style>