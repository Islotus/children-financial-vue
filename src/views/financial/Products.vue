<template>
  <div>
    <div v-for="item in productList" :key="item.id" style="width: 60%; align-content: center; margin: 10px auto">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-badge :value="item.riskLevel" class="item">
            <span style="font-size: 26px;font-family: 'Microsoft YaHei';font-weight: bold">{{item.productName}}</span>
          </el-badge>
            <el-button style="float: right; padding: 3px 0" type="text" @click="opendialog(item)">购买</el-button>
        </div>
        <div>
          <p>
            <a style="color: red; font-size: 24px;font-family: 'Microsoft YaHei'">{{item.rate*100}}%</a>
            <a style="font-size: 16px;font-family: 'Microsoft YaHei';text-align: center">产品利率</a>
          </p>
          <el-collapse>
            <el-collapse-item title="查看详情">
              <p style="font-family: 'Microsoft YaHei';font-size: 16px">产品利率：<a style="color: red">{{item.rate*100}}%</a></p>
              <p style="font-family: 'Microsoft YaHei';font-size: 16px">产品风险：<a style="color: red">{{item.riskLevel}}</a></p>
              <p style="font-family: 'Microsoft YaHei';font-size: 16px">起购金额：<a style="color: red">{{item.startAmt}}元</a></p>
              <p style="font-family: 'Microsoft YaHei';font-size: 16px">最高金额：<a>{{item.endAmt}}元</a></p>
              <p style="font-family: 'Microsoft YaHei';font-size: 16px">最后期限：<a>{{item.endDate}}元</a></p>
              <p style="font-family: 'Microsoft YaHei';font-size: 16px">发行公司：<a>{{item.company}}</a></p>
              <p style="font-family: 'Microsoft YaHei';font-size: 16px">产品介绍：<a>{{item.prodDescription}}</a></p>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" width="30%">
      <el-form style="text-align:center;" :inline="true" :model="buyForm" label-position="left"  class="login-container" :rules="rules" ref="buyForm">
        <span style="font-size: 22px;font-family: 'Microsoft YaHei';font-weight: bold;margin: 20px">{{product.productName}}</span>
        <el-form-item label="购买金额" prop="pay" style="margin-top: 50px">
          <el-input type="text" auto-complete="off" :placeholder=notice v-model="buyForm.pay"></el-input>
        </el-form-item>
        <div style="text-align:center;margin-top: 20px" v-show="timeVisible">
          <el-form-item label="定投周期" prop="time" >
            <el-select v-model="buyForm.time" placeholder="周期">
              <el-option key="1" label="每周" value="每周"></el-option>
              <el-option key="2" label="每两周" value="每两周"></el-option>
              <el-option key="3" label="每月" value="每月"></el-option>
              <el-option key="4" label="每季度" value="每季度"></el-option>
              <el-option key="5" label="每年" value="每年"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item style="width:80%;">
          <el-button :disabled="buyForm.pay==null" type="primary" style="width:100%;margin: 20px" @click="buy(product.productId)">购买</el-button>
          <el-button type="primary" v-show="!timeVisible" style="width:100%;margin: 20px" @click="timeVisible=true">定投</el-button>
          <el-button type="primary" v-show="timeVisible" style="width:100%;margin: 20px" @click="timeVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import {qryproducts} from '../../api/api.js'
  import {isvalidPay} from '../../../config/validate.js'
    export default {
      name: "Products",
      created:function(){
        console.log(JSON.parse(sessionStorage.getItem("user")).account);
        let param = {"account": JSON.parse(sessionStorage.getItem("user")).account};
        qryproducts(param).then((res) => {
          let {status, product} = res;
          if(status!="0"){
          }else{
            this.productList = product;
          }
        });
      },
      data () {
        var validatePay = (rule, value, callback) => {
          if(!value){
            callback(new Error("请输入金额"));
          }else if(!isvalidPay(this.product.startAmt, this.product.endAmt, value)){
            callback(new Error("输入正确的金额"));
          }else{
            callback();
          }
        }

        return {
          dialogFormVisible: false,
          productList: [],
          buyForm:{
            productId:"",
            pay:"",
            time: "每周"
          },
          rules:{
            pay:[{required:true,validator:validatePay,message:"请注意购买金额限制",trigger:"blur"}]
          },
          product:{
            productName:"",
            startAmt: "",
            endAmt: "",
            productId: ""
          },
          notice: "",
          timeVisible: false
        }

      },
      methods: {
        buy(number, callback) {
          if (!this.buyForm.pay) {
            alert("请输入金额");
          }
          console.log("number:" + number);
        },
        opendialog(item){
          this.buyForm.pay = null;
          this.dialogFormVisible = true;
          this.product.productName = item.productName;
          this.product.startAmt = item.startAmt;
          this.product.endAmt = item.endAmt;
          this.product.productId = item.productId;
          this.notice = "购买金额在"+ this.product.startAmt + "元与" + this.product.endAmt + "之间";
        }
      }
    }
</script>

<style scoped>

</style>
