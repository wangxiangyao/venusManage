<template>
  <el-row :gutter="12" class='nav-wrapper' type="flex" align="middle">
    <el-col :span="3" class="nav-box">
      <router-link class="grid-content bg-purple nav-item" to="/editHomepageDate" :class="{active: select === 'editHomepageDate'}">首页数据</router-link>
    </el-col>
    <el-col :span="3" class="nav-box">
      <router-link class="grid-content bg-purple nav-item" to="/author" :class="{active: select === 'author'}">编辑作者</router-link>
    </el-col>
    <el-col :span="3" class="nav-box">
      <router-link class="grid-content bg-purple nav-item" to="/articleEditor" :class="{active: select === 'articleEditor'}">写文章</router-link>
    </el-col>
    <el-col :span="3" class="nav-box">
      <router-link class="grid-content bg-purple nav-item" to="/editMiniPrograms" :class="{active: select === 'editMiniPrograms'}">小程序首页</router-link>
    </el-col>
    <el-col :span="3" class="nav-box">
      <router-link class="grid-content bg-purple nav-item" to="/editHomepageDate/v1" :class="{active: select === 'editHomepageDate_v1'}">老首页</router-link>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'navigation',
    data () {
      return {}
    },
    computed: {
      select () {
        return this.$route.name
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-wrapper {
    height: 100%;
    padding: 0 20px;
    background-color: #000;
    color: #fff;
  }
  .nav-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    color: #fff;
  }
  .nav-item.active {
    border-bottom: 3px solid rgb(161, 23, 21);
  }
</style>
