<template>
    <Card style="width:335px;height:320px" class="signincard">
        <div style="text-align:left" id='signin'>
            <br>
            <Form ref="form" :model="form" :rules="rule">
            <Form-item prop="username">
            <h3>Username</h3>
            <Input  v-model="form.username" placeholder="Username" style="width: 300px"></Input>
            </Form-item>
            <Form-item prop="password">
            <h3>Password</h3>
            <Input  v-model="form.password" placeholder="Password" style="width: 300px" type="password"></Input>
            </Form-item>
            <br>
            </Form>

            <Button type="success" long  v-on:click="signin()">Sign in</Button>
        </div>
    </Card>
</template>

<script>
import { mapActions } from 'vuex'

import { MD5, aesEncrypt} from '../utils'

export default {
      data() {
        const validateEmpty = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Not Empty!'))
            }
        }
          return{
            form: {
                username: '',
                password: ''
            },
            rule: {
                username: [
                    { required: true, validator: validateEmpty, trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: validateEmpty, trigger: 'blur' },
                ],
            }
          }
        },
    methods:{
        ...mapActions({
            setUserState: 'setState',
        }),
        signin(){    
            var that = this
            this.$http({
              url: '/signin',
              method: 'POST',
              body:{
                username:that.form.username,
                password:aesEncrypt(that.form.password, MD5(that.form.username)),
                key: MD5(that.form.username)
              },
              dataType:"json",
          }).then(function (res) {
              console.log(res.body);
              if (res.body === 'fail') {
                alert("username or password wrong!");
              }
              else {
                that.$Message.success("Success!")
                console.log(res.body)
                that.setUserState({user: res.body.user,role: res.body.role,features: res.body.features}).then(function(){
                    that.$router.push('/userInfor')
                })
              }
          }, function () {
              alert("ajax failure")
          })
        }
    }
}
</script>
<style type="text/css">
        .signincard{
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, 20%);
            -moz-transform: translate(-50%, 20%);
            -ms-transform: translate(-50%, 20%);
            -o-transform: translate(-50%, 20%);
            transform: translate(-50%, 20%);
        }
        .red{
            color:red

        }
        .black{
            color: black
        }
    </style>