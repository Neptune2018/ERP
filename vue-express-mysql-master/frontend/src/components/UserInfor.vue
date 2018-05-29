<template>
<div>
    <Card class="user-card">
        <p class="title" slot="title">
            <Icon type="person" size=33></Icon>
            个人信息
        </p>
        <span>用户名：&emsp;&emsp;</span>
        <span>{{name}}</span><br />
        <span>联系电话：&emsp;
        <Input class="input" v-if="edited" v-model="phone" clearable size="large"></Input>
        <span v-else>{{phone}}</span><br />
        <span>电子邮箱：&emsp;
        <Input class="input" v-if="edited" v-model="email" clearable size="large"></Input>
        <span v-else>{{email}}</span><br />
        <span>职务：&emsp;&emsp;&emsp;
        <Input class="input" v-if="edited" v-model="job" clearable size="large"></Input>
        <span v-else>{{job}}</span><br />
        <p class="buttons">
            <Button class="button" v-if="edited" type="primary" shape="circle" size="large" @click="update()">确认</Button>
            <Button class="button" v-else type="primary" shape="circle" size="large" @click="edite()">编辑</Button>
            <Button class="button" type="primary" shape="circle" size="large" @click="passModal = true">修改密码</Button>
        </p>
        <Modal
        v-model="passModal"
        title="修改密码"
        @on-ok="changePass">
         <Input class="input" type="password" v-model="oldPass" size="large" placeholder="请输入旧密码" clearable></Input>
         <Input class="input" type="password" v-model="newPass" size="large" placeholder="请输入新密码" clearable></Input>
    </Modal>
    </Card>
</div>
</template>

<script>
    export default {
        name: 'UserInfor',
        data () {
            return {
               name: 'test',
               phone: 'test',
               email: 'test',
               job: 'test',
               edited: false,
               button1: '编辑',
               oldPass: '',
               newPass: '',
               passModal: false
            }
        },
        methods: {
            showInfor(){
                var that = this;
                this.$http({
                    url: '/userInfor',
                    method: 'GET',
                }).then(function (res) {
                    console.log(res.body);
                    that.name = res.body[0].name;
                    that.phone = res.body[0].phone;
                    that.email = res.body[0].email;
                    that.job = res.body[0].job;
                }, function () {
                    alert("ajax failure")
                })
            },
            edite(){
                this.edited=true;
            },
            update(){
                var that = this;
                this.$http({
                    url: '/updateUser',
                    method: 'GET',
                    params: {
                        name: that.name,
                        phone: that.phone,
                        email: that.email,
                        job: that.job
                    }
                }).then(function (res) {
                    console.log(res.body);
                    that.$Notice.success({
                        title: '个人信息修改成功'
                    });
                    that.edited=false;
                }, function () {
                    that.$Notice.erro({
                        title: '个人信息修改失败!'
                    });
                })
            },
            changePass(){
                var that = this;
                this.$http({
                    url: '/changePass',
                    method: 'GET',
                    params: {
                        oldPass: that.oldPass,
                        newPass: that.newPass,
                    }
                }).then(function (res) {
                    console.log(res.body);
                    if (res.body.length > 0) {
                        that.$Notice.success({
                            title: '密码修改成功'
                        });
                    }
                    else {
                        that.$Notice.error({
                            title: '旧密码错误！'
                        });
                    }
                    that.oldPass='';
                    that.newPass='';
                }, function () {
                    that.$Notice.error({
                        title: '密码修改失败！'
                    });
                    that.oldPass='';
                    that.newPass='';
                })
            }
        },
        mounted () {
            this.showInfor();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-card {
    width: 50%;
    margin-top: 15%;
    margin-left: auto;
    margin-right: auto;
}
.title {
    height: 36px;
    font-size: 30px;
    vertical-align: middle;
}
span {
    font-size: 20px;
    margin-top: 3px;
    margin-bottom: 3px;
}
.input {
    margin-top: 3px;
    margin-bottom: 3px;
}
.buttons {
    margin-left: 70%;
}
.button {
    margin:3px 8px;
}
</style>