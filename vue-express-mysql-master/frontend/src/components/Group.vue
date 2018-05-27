<template>
<div class="main-background">

    
    <div class='select_bar'>
    <!-- <i-input v-model="value4" icon="search" placeholder="搜索" style="width: 200px"></i-input> -->

    <i-select v-model="model1" placeholder="请选择职位"  @on-change="selectGroup" style="width:200px">
        <i-option v-for="item in cityList" :value="item.value" :key="item.value" >{{ item.label }}</i-option>
    </i-select>
    </div>
    <div>
        <i-table :columns="columns1" :data="data1"></i-table>
    </div>

    <!-- <button v-on:click="tqalert">123</button> -->
    
    
    

</div>
</template>

<script>
export default {
  name: 'g_test',
  data () {
    return {
        msg: 'Guos test',
        value4: '',
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
        data1: [
                    
                ]
        
    }
    
  },
  methods:{
      selectGroup :function () {
      this.$router.push({path:'/group/ParticularizeGroup', query:{grouptype:this.model1 } })
    },
      tqalert :function(){
          alert('泰拳警告')
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
</style>