<template>
    <div>
      <el-row :gutter="22">
        <el-col :span="11">
          <left></left>
        </el-col>

        <el-col :span="11" :offset="1">
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix"  align="center">
                <el-badge>
                  <p class="totallMoneyFont">总资产：<span>{{totalMoney}}</span><a style="color: red"> 元</a></p>
                </el-badge>
              </div>
              <div>
                <el-collapse>
                  <el-collapse-item title="查看详情">
                    <div>
                      <p class="singleMoneyFont">账户余额：<span class="singleMoneyFont" style="display: inline-block; width: 150px;">{{balance}}</span><a style="color: red"> 元</a></p>
                      <el-button type="primary" class="buttonClass" style="background: dimgray; border-color: dimgray;" @click="buttonFun()">查看详情</el-button>
                    </div>
                    <div :style="display">
                      <el-table style="width: 100%;display:block" :data="yuErList.slice((currentPage-1)*pagesize,currentPage*pagesize)">
                        <el-table-column label="业务受理编号" prop="busiAcceptId" width="120"></el-table-column>
                        <el-table-column label="我方账号" prop="ownAcct" width="120"></el-table-column>
                        <el-table-column label="对方账号" prop="yourAcct" width="120"></el-table-column>
                        <el-table-column label="出入状态" prop="status" width="120"></el-table-column>
                        <el-table-column label="金额" prop="amt" width="120"></el-table-column>
                        <el-table-column label="剩余金额" prop="remainAmt" width="120"></el-table-column>
                        <el-table-column label="录入时间" prop="addTime" width="120"></el-table-column>
                        <el-table-column label="我方卡号" prop="ownCardNbr" width="120"></el-table-column>
                        <el-table-column label="对方卡号" prop="yourCardNbr" width="120"></el-table-column>
                      </el-table>
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 20, 40]"
                      :page-size="pagesize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="yuErList.length">
                      </el-pagination>
                    </div>
                    <div>
                      <p class="singleMoneyFont">基金收益：<span class="singleMoneyFont" style="display: inline-block; width: 150px;">{{licai}}</span><a style="color: red"> 元</a></p>
                      <el-button type="primary" class="buttonClass" style="background: dimgray; border-color: dimgray;" @click="buttonFunLi()">查看详情</el-button>
                    </div>
                    <div :style="displayLi">
                      <el-table style="width: 100%;display:block" :data="liCaiList.slice((currentPageLi-1)*pagesizeLi,currentPageLi*pagesizeLi)">
                        <el-table-column label="理财产品名称" prop="prodName" width="160"></el-table-column>
                        <el-table-column label="年利率" prop="rate" width="120"></el-table-column>
                        <el-table-column label="收益（元）" prop="profit" width="120"></el-table-column>
                      </el-table>
                      <el-pagination
                        @size-change="handleSizeChangeLi"
                        @current-change="handleCurrentChangeLi"
                        :current-page="currentPageLi"
                        :page-sizes="[5, 10, 20, 40]"
                        :page-size="pagesizeLi"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="liCaiList.length">
                      </el-pagination>
                    </div>

                    <div>
                      <p class="singleMoneyFont">定投收益：<span class="singleMoneyFont" style="display: inline-block; width: 150px;">{{dingTou}}</span><a style="color: red"> 元</a></p>
                      <el-button type="primary" class="buttonClass" style="background: dimgray; border-color: dimgray;">查看详情</el-button>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-card>
          </div>
        </el-col>

      </el-row>
    </div>
</template>

<script>
  import Left from '@/components/common/Left'
  import {qryEverySingleMoney, qryYuErList, qryLiCaiList} from '../../api/api.js'
    export default {
      name: "Money",
      components:{
        Left
      },
      created:function(){
        this.getEverySingleMoney();
        this.getYuErList();
        this.getLiCaiList();
      },
      data () {
        return {
          totalMoney: "",
          balance: "",
          licai:"",
          dingTou:"",
          currentPage:1, //初始页
          pagesize:10,    //    每页的数据
          currentPageLi:1,
          pagesizeLi:10,
          currentPage3:1, //初始页
          pagesize3:10,    //    每页的数据
          yuErList: [],
          liCaiList: [],
          dingTouList: [],
          display: "display:none",
          displayLi: "display:none",
          display3: "display:none"
        }
      },
      methods: {
        getEverySingleMoney(){
          let param = {"account": JSON.parse(sessionStorage.getItem("user")).account};
          qryEverySingleMoney(param).then((res) => {
            let {totalAmount, DTTotalAmount, balance, LCTotalAmount, status} = res;
            if (status != 0) {
              this.$message({
                message: "理财金额和定投金额查询失败，请检查信息",
                type: 'error'
              });
            } else {
              this.licai = this.$options.methods.toThousands(LCTotalAmount);
              this.dingTou = this.$options.methods.toThousands(DTTotalAmount);
              this.balance = this.$options.methods.toThousands(balance);
              this.totalMoney = this.$options.methods.toThousands(totalAmount);
              // this.licai = LCTotalAmount;
              // this.dingTou = DTTotalAmount;
              // this.balance = balance;
              // this.totalMoney = totalAmount;
              // console.log("--------------------------------");
              // console.log(LCTotalAmount);
              // console.log(this.licai);
              // console.log(DTTotalAmount);
              // console.log(this.dingTou);
              // console.log(balance);
              // console.log(this.balance);
              // console.log(totalAmount);
              // console.log(this.totalMoney);
              // console.log("--------------------------------");

            }
          })
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage;
          console.log(this.currentPage)  //点击第几页
        },
        handleSizeChangeLi: function (size) {
          this.pagesizeLi = size;
          console.log(this.pagesizeLi)  //每页下拉显示数据
        },
        handleCurrentChangeLi: function (currentPage) {
          this.currentPageLi = currentPage;
          console.log(this.currentPageLi)  //点击第几页
        },
        handleSizeChange3: function (size) {
          this.pagesize3 = size;
          console.log(this.pagesize3)  //每页下拉显示数据
        },
        handleCurrentChange3: function (currentPage) {
          this.currentPage3 = currentPage;
          console.log(this.currentPage3)  //点击第几页
        },
        getYuErList() {
          let param = {"account": JSON.parse(sessionStorage.getItem("user")).account, "pn": "1", "ps": "1000"};
          console.log(param);
          qryYuErList(param).then((res) => {
            let {status, lsList} = res;
            if (status == "-1") {
              this.$message({
                message: "余额流水查询失败，请检查信息",
                type: 'error'
              });
            } else {
              this.yuErList = lsList;
            }
          })
        },
        getLiCaiList() {
          let param = {"account": JSON.parse(sessionStorage.getItem("user")).account, "pn": "1", "ps": "1000"};
          console.log(param);
          qryLiCaiList(param).then((res) => {
            let {result,status} = res;
            if (status == "-1") {
              this.$message({
                message: "余额流水查询失败，请检查信息",
                type: 'error'
              });
            } else {
              this.liCaiList = result;
            }
          })
        },
        buttonFun(){
          if (this.display === "display:none") {
            this.display = "";
          } else {
            this.display = "display:none";
          }
        },
        buttonFunLi(){
          if (this.displayLi === "display:none") {
            this.displayLi = "";
          } else {
            this.displayLi = "display:none";
          }
        },
        toggle() {
          if (this.display === "display:none") {
            this.display = "";
          } else {
            this.display = "display:none";
          }
        },
        toThousands(num) {
          var numStr = num.toString();
          // if(numStr.search(".") == -1){ //不含有小数点，加小数点
          //   console.log("不含有小数点");
          //   numStr += ".00";
          // }
          // var numStr = (numStr || 0).toString();
          var result = '';
          var left = numStr.split(".")[0];
          if(left.length > 3){
            while (left.length > 3) {
              result = ',' + left.slice(-3) + result;
              left = left.slice(0, left.length - 3);
            }
            if (left) {
              result = left + result;
            }
            var right = numStr.split(".")[1];
            console.log(right);
            result = result + "." + right;
          }else{
            result = numStr;
          }
          return result;
        }
      }
    }
</script>

<style scoped>
  .totallMoneyFont{
    font-size: 26px;
    font-family: 'Microsoft YaHei';
    font-weight: bold
  }
  .singleMoneyFont{
    font-family: 'Microsoft YaHei';
    font-size: 22px;
    color: black;
    display: inline-block;
    margin: 0;
  }
  input:disabled,textarea:disabled{
    font-family:"Microsoft YaHei";
    font-size:30px;
    -webkit-text-fill-color: black;
  }
  .buttonClass{
    padding: 2px 10px;
    color: white;
  }
</style>
