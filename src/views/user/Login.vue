<template>
  <el-row>
    <el-col :span="14" style="text-align: center">
      <p style="color:red;font-size:50px;font-family: PingFang SC;margin: 150px auto;" >小小理财家</p>
      <p style="text-align: center;font-size: 40px"> 财商教育从现在开始 </p>
    </el-col>
    <el-col :span="5" :offset="1">
      <el-form :model="userForm" label-position="left" label-width="0px" class="login-container" :rules="rules" ref="loginForm">
        <h3 class="title" style="text-align: center">系统登录</h3>
        <el-form-item label="账号" prop="account" label-width="60px">
          <el-input type="text" auto-complete="off" placeholder="账号" v-model="userForm.account" value="1111111"></el-input>
        </el-form-item>
        <el-form-item prop="psw" label="密码" label-width="60px">
          <el-input type="password" auto-complete="off" placeholder="密码" v-model="userForm.psw" value="123455"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="loginClick">登录</el-button>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button style="width:100%;" @click="toRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
import {requestLogin} from '../../api/api.js'
export default {
  name: 'Login',
  data () {
    return {
        userForm:{
            account:"",
            psw:""
        },
        rules:{
            account:[{required:true,message:"account",trigger:"blur"}],
            psw:[{required:true,message:"password",trigger:"blur"}]
        }
    }
  },
  methods:{
      loginClick(){
          this.$refs.loginForm.validate((valid) => {
              if(valid){
                  let para = {account: this.userForm.account,loginPw: this.userForm.psw};
                  requestLogin(para).then((res) => {
                      let {status, user} = res;
                      if(status!="0"){
                          this.$message({
                              message:"账号或密码错误",
                              type:'error'
                          });
                      }else{
                          this.$message({
                              message:"登陆成功",
                              type:"success"
                          });
                          sessionStorage.setItem('user',JSON.stringify(user));
                          this.$router.push({path:'/personal'});
                          this.$router.go(0);
                      }
                  });
              }
          })

      },
    toRegister() {
      console.log("1111");
      this.$router.push({path: "/register"});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 150px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>
