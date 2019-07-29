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
                <span style="font-size: 26px;font-family: 'Microsoft YaHei';font-weight: bold">用户管理</span>
              </el-badge>
            </div>
            <div>
              <el-form style="text-align:center;" :inline="true" :model="payForm" label-position="left"  class="login-container" :rules="rules" ref="payForm">
<!--                <el-form-item label="转账金额" prop="pay" style="margin-top: 50px">-->
<!--                  <el-input type="text" auto-complete="off" :placeholder=notice v-model="payForm.pay"></el-input>-->
<!--                </el-form-item>-->
                <div style="text-align:center;margin-top: 20px">
                  <el-form-item label="操作账户" prop="card">
                    <el-select v-model="selectedAccount" placeholder="选择账户"  @change="judgeIsParent">
                      <el-option v-for="item in accountList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="width:20%" align="center">
                  <el-popover
                    placement="left"
                    width="400"
                    trigger="click">
                    <el-form style="text-align:center;"  :inline="true" :model="payForm" label-position="left"  class="login-container" :rules="rules" ref="payForm">
                      <el-form-item label="转账金额" prop="pay" style="margin-top: 50px">
                        <el-input type="text" auto-complete="off" :placeholder=notice v-model="payForm.pay"></el-input>
                      </el-form-item>
                      <el-form-item label="转账周期" prop="time">
                        <el-select v-model="payForm.time" placeholder="周期">
                          <el-option key="1" label="每周" value="每周"></el-option>
                          <el-option key="2" label="每两周" value="每两周"></el-option>
                          <el-option key="3" label="每月" value="每月"></el-option>
                          <el-option key="4" label="每季度" value="每季度"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item style="width:80%;">
                        <el-button :disabled="!payForm.pay || !payForm.time"
                                   type="primary" style="width:100%;margin: 20px" @click="timeTrans">转账</el-button>
                      </el-form-item>
                    </el-form>
                    <el-button slot="reference" v-show="isParent==0"  :disabled="!selectedAccount"
                               type="primary" class="buttonClass" style = "width:136px;margin-left: 265px">定时转账</el-button>
                  </el-popover>
                </div>

                <el-form-item style="width:20%;">
                    <el-button :disabled="!selectedAccount"
                               type="primary" class="buttonClass" @click="queryBalance">查询余额</el-button>
<!--                  </div>-->
<!--                  <div>-->
                    <el-button :disabled="!selectedAccount"
                               type="primary" class="buttonClass" @click="accountSet">账户设置</el-button>
<!--                  </div>-->
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
  import {qrySonAcct} from "../../api/api";
  export default {
    name: "Manage",
    components:{
      Left
    },
    created:function(){
      this.getSonAcct();
    },
    data () {
      var validatePay = (rule, value, callback) => {
        if(!value){
          callback(new Error("请输入金额"));
        }else if(!isvalidPay("0", "20000", value)){
          callback(new Error("输入正确的金额"));
        }else{
          callback();
        }
      }
      return {
        rules:{
          pay:[{required:true,validator:validatePay,message:"请注意转账限额",trigger:"blur"}],
          time:[{required:true,message:"定时转账",trigger:"blur"}]
        },
        notice: "",
        selectedAccount:"",
        isParent:"",
        accountList: [],
        payForm: {
          card:"",
          pay: "",
          time:"",
          toCard:""
        }
      }
    },
    methods: {
      getSonAcct() {
        let param = {"account": JSON.parse(sessionStorage.getItem("user")).account};
        qrySonAcct(param).then((res) => {
          let {status, sonUserInf, cardAmt, finAmt, pCardNbr, sCardNbr} = res;
          if (status == "-1") {
            this.$message({
              message: "目前账号未绑定子账户",
              type: 'error'
            });
          } else {
            this.accountList.push(sonUserInf.account);
            this.accountList.push(param.account);
            this.payForm.toCard = sCardNbr;
            this.payForm.card = pCardNbr;
          }
        });
      },
      judgeIsParent() {
        console.log("change");
        let param = {"account": JSON.parse(sessionStorage.getItem("user")).account};
        if(param.account != this.selectedAccount){
          this.isParent = 0;
        }
        else this.isParent = 1;
      },
      timeTrans(){
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
      },
      queryBalance(){

        if(this.isParent == 1) {
          window.location.href = "money";
        }
        else {
          sessionStorage.setItem("subAccount",this.selectedAccount);
          window.location.href = "subMoney";
        }
      },
      accountSet(){
        window.location.href = "settings";
      },
      confirm() {

      }
    }
  }

</script>

<style scoped>
.buttonClass{
  width:100%;
  margin: 20px;
  display: inline-block;
}
</style>
