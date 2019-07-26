<template>
  <el-form :model="userForm" label-position="left" label-width="0px" class="login-container" :rules="rules" ref="registerForm">
    <h2 class="title" style="text-align: center;margin-bottom: 50px">用户注册</h2>
    <el-form-item label="登录账号" prop="account" label-width="80px">
      <el-input type="text" auto-complete="off" placeholder="账  号" v-model="userForm.account"></el-input>
    </el-form-item>
    <el-form-item prop="loginPw" label="登录密码" label-width="80px">
      <el-input type="password" auto-complete="off" placeholder="密  码" v-model="userForm.loginPw"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item prop="name" label="真实姓名" label-width="80px">
      <el-input type="text" auto-complete="off" placeholder="姓  名" v-model="userForm.name"></el-input>
    </el-form-item>
    <el-form-item prop="idCard" label="身份证号" label-width="80px">
      <el-input type="text" auto-complete="off" placeholder="身份证号" v-model="userForm.idCard"></el-input>
    </el-form-item>
    <el-form-item prop="birth" label="出生日期"  label-width="80px">
      <el-date-picker type="date" placeholder="选择日期" v-model="userForm.birth" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
    </el-form-item>
    <el-form-item prop="phone" label="手机号码" label-width="80px">
      <el-input type="text" auto-complete="off" placeholder="11位手机号码" v-model="userForm.phone"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="registerClick">提交</el-button>
    </el-form-item>
    <el-form-item style="width:100%;margin-top: 20px">
      <el-button style="width:100%;" @click="tologin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {register} from '../../api/api.js'
  import {isvalidPhone, isvalidIDCard} from '../../../config/validate.js'
export default {
  name: 'Register',
  data () {
    var validatePhone = (rule, value, callback) => {
      if(!value){
        callback(new Error("输入手机号"));
      }else if(!isvalidPhone(value)){
        callback(new Error("输入正确的手机号"));
      }else{
        callback();
      }
    };
    var validateIDCard = (rule, value, callback) => {
      if(!value){
        callback(new Error("输入身份证号"));
      }else if(!isvalidIDCard(value)){
        callback(new Error("输入正确的身份证号"));
      }else{
        callback();
      }
    };
    return {
      userForm: {
        "account": "",
        "loginPw": "",
        "name": "",
        "birth": "",
        "phone": "",
        "idCard": ""
      },
      rules:{
        account:[{required:true,message:"用户名不能为空",trigger:"blur"}],
        loginPw:[{required:true,message:"密码不能为空",trigger:"blur"}],
        name:[{required:true,message:"用户姓名不能为空",trigger:"blur"}],
        birth:[{required:true,message:"日期不能为空",trigger:"blur"}],
        idCard:[{required:true,validator:validateIDCard,trigger:"blur"}],
        phone:[{required:true,validator:validatePhone,trigger:'blur'}]
      }
    }
  },
  methods:{
    tologin() {
      this.$router.push({path: "/login"});
    },
    registerClick() {
      this.$refs.registerForm.validate((valid) => {
        if(valid){
          let para = this.userForm;
          register(para).then((res) => {
            let {status} = res;
            if(status=="-1"){
              this.$message({
                message:"注册失败，请检查信息",
                type:'error'
              });
            }else if(status=="2"){
              this.$message({
                message:"注册失败，账户已存在",
                type:'error'
              });
            }else{
              this.$message({
                message:"注册成功",
                type:"success"
              });
              this.$router.push({path:'/login'});
            }
          });
        }
      })
    }

  },
  watch:{

  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 450px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
