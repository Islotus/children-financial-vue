<template>
    <div>
      <el-row :gutter="22">
        <el-col :span="11">
          <left></left>
        </el-col>
        <el-col :span="11" :offset="1">
          <div >
            <el-card class="box-card">
              <div slot="header" class="clearfix"  align="center">
                <el-badge>
                  <span style="font-size: 26px;font-family: 'Microsoft YaHei';font-weight: bold">转账汇款</span>
                </el-badge>
              </div>
              <div>
                <el-form style="text-align:center;"  :inline="true" :model="payForm" label-position="left"  class="login-container" :rules="rules" ref="payForm">
                  <el-form-item label="转账金额" prop="pay" style="margin-top: 50px">
                    <el-input type="text" auto-complete="off" :placeholder=notice v-model="payForm.pay"></el-input>
                  </el-form-item>
                  <div style="text-align:center;margin-top: 20px">
                    <el-form-item label="支付卡号" prop="card">
                      <el-select v-model="payForm.card" placeholder="卡号" >
                        <el-option v-for="item in cardList" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-form-item label="目标卡号" prop="toCard" style="margin-top: 50px">
                    <el-input type="text" auto-complete="off" placeholder="请输入转账对象卡号" v-model="payForm.toCard"></el-input>
                  </el-form-item>
                  <el-form-item style="width:80%;">
                    <el-button :disabled="!payForm.pay || !payForm.card || !payForm.toCard"
                               type="primary" style="width:100%;margin: 20px" @click="transfer">转账</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import Left from '@/components/common/Left'
  import {qryCardList, transferMoney} from '../../api/api.js'
  import {isvalidPay} from '../../../config/validate.js'
    export default {
      name: "Transfer",
      components:{
        Left
      },
      created:function(){
        this.getCardList();
      },
      data () {
        var validatePay = (rule, value, callback) => {
          if(!value){
            callback(new Error("请输入金额"));
          }else if(!isvalidPay("0", "10000", value)){
            callback(new Error("输入正确的金额"));
          }else{
            callback();
          }
        }
        return {
          rules:{
            pay:[{required:true,validator:validatePay,message:"请注意转账限额",trigger:"blur"}],
            card:[{required:true,message:"请选择转账卡号",trigger:"blur"}],
            toCard:[{required:true,message:"请输入对方卡号",trigger:"blur"}]
          },
          notice: "",
          cardList: [],
          payForm: {
            card: "",
            toCard: "",
            pay: ""
          }
        }
      },
      methods: {
        getCardList() {
          let param = {"account": JSON.parse(sessionStorage.getItem("user")).account};
          qryCardList(param).then((res) => {
            let {status, cards} = res;
            if (status == "-1") {
              this.$message({
                message: "卡号查询失败，请检查信息",
                type: 'error'
              });
            } else {
              // this.$message({
              //   message: "卡号查询成功",
              //   type: "success"
              // });
              this.cardList = cards;
            }
          });
        },
        transfer() {
          let param = {
            "fromCard": this.payForm.card,
            "toCard": this.payForm.toCard,
            "amount": this.payForm.pay
          };
          transferMoney(param).then((res) => {
            let {status} = res;
            if (status == "-1") {
              this.$message({
                message: "账户余额不足",
                type: 'error'
              });
            }else if (status == "-2") {
              this.$message({
                message: "转出户不存在",
                type: 'error'
              });
            } else if (status == "-3") {
              this.$message({
                message: "今日额度已用完",
                type: 'error'
              });
            } else {
              this.$message({
                message: "转账成功",
                type: "success"
              });
              this.$router.go(0);
            }
          });
        }
      }
    }

</script>

<style scoped>

</style>
