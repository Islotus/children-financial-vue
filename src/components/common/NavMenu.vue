<template>
  <div>
      <el-menu
        :default-active="'/index'"
        router
        mode="horizontal"
        @select="handleSelect"
        background-color="white"
        text-color="#222"
        active-text-color="red"
      style="margin-left: 5%; ">
        <el-menu-item >
          <el-image :src="logo" style="width: 158px;height: 52px"></el-image>
        </el-menu-item>
        <el-menu-item  index="/index" style="font-size: 20px;font-family: Microsoft YaHei;font-weight: 700">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><a style="font-size: 20px;font-family: Microsoft YaHei;font-weight: 700">企业服务</a></template>
          <el-menu-item style="font-size: 16px;font-family: Microsoft YaHei">基础贷款</el-menu-item>
          <el-menu-item style="font-size: 16px;font-family: Microsoft YaHei">票据融资</el-menu-item>
          <el-menu-item style="font-size: 16px;font-family: Microsoft YaHei">投资服务</el-menu-item>
        </el-submenu>
        <el-submenu index="/personal">
          <template slot="title"><a style="font-size: 20px;font-family: Microsoft YaHei;font-weight: 700">个人业务</a></template>
          <el-menu-item index="3-1" style="font-size: 16px;font-family: Microsoft YaHei">用户管理</el-menu-item>
          <el-menu-item index="/products" style="font-size: 16px;font-family: Microsoft YaHei">理财产品</el-menu-item>
          <el-menu-item index="/money" style="font-size: 16px;font-family: Microsoft YaHei">账户查询</el-menu-item>
          <el-menu-item index="/transfer" style="font-size: 16px;font-family: Microsoft YaHei">转账汇款</el-menu-item>
          <el-menu-item index="3-5" style="font-size: 16px;font-family: Microsoft YaHei">账户设置</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><a style="font-size: 20px;font-family: Microsoft YaHei;font-weight: 700">关于我们</a></template>
          <el-menu-item index="4-1" style="font-size: 16px;font-family: Microsoft YaHei">公司简介</el-menu-item>
          <el-menu-item index="4-2" style="font-size: 16px;font-family: Microsoft YaHei">企业文化</el-menu-item>
          <el-menu-item index="4-3" style="font-size: 16px;font-family: Microsoft YaHei">业务范围</el-menu-item>
          <el-menu-item index="4-4" style="font-size: 16px;font-family: Microsoft YaHei">团队介绍</el-menu-item>
        </el-submenu>
        <el-input
          placeholder="快速搜索..."
          prefix-icon="el-icon-search"
          size="medium"
          :span="4" hidden-md-and-down
          style="width: 15%;position:absolute;margin-top: 12px;right: 20%"
          v-model="keywords">
        </el-input>
        <div v-if="!user">
          <el-button @click="tologin" style="color:red;position:absolute;margin-top: 12px;right: 7%">登录/注册</el-button>
        </div>
        <div v-if="user">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fill style="position:absolute;right: 13%;margin-top: 10px;"></el-avatar>
          <el-button v-if="user" @click="logout" style="color:red;position:absolute;margin-top: 12px;right: 7%">退出</el-button>
        </div>
      </el-menu>


  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        keywords: '',
        logo: '@/../static/img/logo.jpg',
        user: sessionStorage.getItem("user"),
        avatar: '@/../static/img/avatar.png'
      }
    },
    computed: {
      hoverBackground () {
        return '#ffd04b'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      tologin(){
        this.$router.push("/login")
      },
      logout(){
        this.$confirm("是否确认退出","确认退出",{}).then(() =>{
          sessionStorage.removeItem('user');
          // this.$router.replace("/index");
          this.$router.go(0);
        }).catch(() => {

        });
      }
    },

  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>
