<template>
    <Card style="width:335px;height:320px" class="signincard">
        <div style="text-align:left" id='signin'>
            <br>

            <h3>Username</h3>
            <Input  v-model="username" :placeholder="id_input" style="width: 300px"></Input>
            <br><br>

            <h3>Password</h3>
            <Input  v-model="password" :placeholder="pd_input" style="width: 300px" type="password"></Input>
            <br><br><br>

            <Button type="success" long  v-on:click="signin()">Sign in</Button>
        </div>
    </Card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
      data() {
          return{
            id_input:'your username...',
            pd_input:'your password...',
          }
        },
    methods:{
        ...mapMutations({
            setUserState: 'setUserState',
        }),
        signin(){    
            var flag=0
            if(this.username==null||this.username=="")
            {
                this.id_input="not empty"
               
            }
            else
            {
                flag+=1
                this.id_input="your username..."
            }

            if(this.password==null||this.password=="")
            {
                this.pd_input="not empty"

            }
            else
            {   
                flag+=1
                this.pd_input='your password...'
            }
            if(flag==2){
                var that = this
                this.$http({
                  url: '/signin',
                  method: 'POST',
                  body:{
                    username:that.username,
                    password:that.password
                  },
                  dataType:"json",
              }).then(function (res) {
                  console.log(res.body);
                  if (res.body === 'fail') {
                    alert("username or password wrong!");
                  }
                  else {
                    that.$Message.success("Success!")
                    this.setUserState(res.body.user, res.body.role, res.body.features)
                  }
              }, function () {
                  alert("ajax failure")
              })
            }
            
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