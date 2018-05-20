<template>
<div>
    <h1 id="title">This page Is For Test</h1>
    <Button type="primary" @click="test()">test</Button>
    <Button type="primary" @click="increace()">increace</Button>
    <div>
      <a @click="changePage()">切换页面</a>
    </div>
    <p>{{count}}</p>
    <p>{{ returnData }}</p>
</div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      returnData: {}
    }
  },
 //这两个map是vuex的部分
  computed: {
      ...mapGetters({
        count: 'getCount'
      }),
  },
  methods: {
    //for vuex
    ...mapMutations({
      increace: 'increment'
    }),
    test(){
      this.$http({
          url: '/test',
          method: 'GET',
      }).then(function (res) {
          console.log(res.body);
          this.returnData = res.body;
          //this.$router.push({path: '/hello', query:{data: res.body}})
      }, function () {
          alert("ajax failure")
      })
    },
    changePage() {
      this.$router.push({path: '/second'})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
