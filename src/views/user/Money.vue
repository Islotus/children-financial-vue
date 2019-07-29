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
                      <p class="singleMoneyFont">账户余额：<span class="singleMoneyFont">{{balance}}</span><a style="color: red"> 元</a></p>
                      <el-button type="primary" class="buttonClass" @click="toggle(show)">查看详情</el-button>
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
                      <p class="singleMoneyFont">理财金额：<span class="singleMoneyFont">{{licai}}</span><a style="color: red"> 元</a></p>
                      <el-button type="primary" class="buttonClass">查看详情</el-button>
                    </div>
                    <div>
                      <p class="singleMoneyFont">定投金额：<span class="singleMoneyFont">{{dingTou}}</span><a style="color: red"> 元</a></p>
                      <el-button type="primary" class="buttonClass">查看详情</el-button>
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
  import {qryEverySingleMoney, qryYuErList} from '../../api/api.js'
    export default {
      name: "Money",
      components:{
        Left
      },
      created:function(){
        this.getEverySingleMoney();
        this.getYuErList();
      },
      data () {
        return {
          totalMoney: "",
          balance: "",
          licai:"",
          dingTou:"",
          currentPage:1, //初始页
          pagesize:10,    //    每页的数据
          yuErList: [],
          display: ""
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
              console.log(totalAmount);
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
        toggle(show) {
          if (this.display === "display:none") {
            this.display = "";
          } else {
            this.display = "display:none";
          }
        },
        toThousands(num) {
          // if(num.indexOf(".") <= 0){ //不含有小数点，加小数点
          //   num = num + ".00"
          // }
          var num = (num || 0).toString(), result = '';
          var left = num.split(".")[0];
          if(left.length > 3){
            while (left.length > 3) {
              result = ',' + left.slice(-3) + result;
              left = left.slice(0, left.length - 3);
            }
            if (left) {
              result = left + result;
            }
            var right = num.split(".")[1];
            result = result + "." + right;
          }else{
            result = num;
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
