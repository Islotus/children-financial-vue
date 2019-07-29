<template>
  <div>
      <div class="home">
        <div id="header-div">
          <!--<div style="height: 150px"></div>-->
          <el-card class="card-carousel">
            <el-carousel  indicator-position="outside" class="push" :interval="4000" arrow="always">
              <el-carousel-item v-for="item in imgs" :key="item.id">
                <a :href=item.link target="_blank">
                  <el-image  :src=item.img></el-image>
                </a>
                <h3>{{item.title}}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </div>

        <div id="mid-div">
          <el-row :gutter="20">
            <el-col :span="24" style="padding: 14px;">
              <span class="vertical">&nbsp;</span>
              <span class="fontstyle">重要公告</span>
              <i class=" el-icon-more"></i>
            </el-col>
            <el-col :span="24">
              <template>
                <el-table :data="tableData" :show-header="false" style="width: 100%">
                  <el-table-column prop="msg" label="信息" width="500"></el-table-column>
                  <el-table-column prop="date" label="时间" width="180"></el-table-column>
                </el-table>
              </template>
            </el-col>
          </el-row>
        </div>

        <div id="foot-div">
          <el-row :gutter="20" >
            <el-col :span="6" v-for="item in footimgs" :key="item.id">
              <div style="padding: 14px;"><span class="vertical">&nbsp;</span><span class="fontstyle">{{item.con}}</span></div>
              <el-image :src="item.img" class="around-white"></el-image>
            </el-col>
          </el-row>
        </div>

      </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data: function () {
      return {
        imgs: [
          {img: '@/../static/img/back1.jpg'},
          {img: '@/../static/img/back2.jpg'},
          {img: '@/../static/img/back3.jpg'}
        ],
        footimgs:[
          {img: '@/../static/img/firstpagefoot1.jpg', con: '公司服务'},
          {img: '@/../static/img/firstpagefoot2.jpg', con: '金融市场'},
          {img: '@/../static/img/firstpagefoot3.jpg', con: '个人服务'},
          {img: '@/../static/img/firstpagefoot4.jpg', con: '金融知识'}
        ],
        tableData: [
          {msg: '小小理财家今日正式上线', date: '2019-07-28'},
          {msg: '六六公司发布大额存单公告', date: '2019-07-27'},
          {msg: '六六公司团建日期更改通知', date: '2019-07-26'}
        ]
      }
    }
  }
</script>

<style scoped>
  .home {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;

  }

  #header-div {
    padding-bottom: 20px;
    padding-left: 5px;
    background-color: white;
    /*background: url("../../assets/img/bg/bg3.jpg");*/
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .around-white{
    margin-left: 10px;
  }
  .vertical {
    border-left: 8px solid #FF0000;
    display: inline-block;
    margin-left: -1px;
    padding: 0px 0px 0px 3px;
  }
  .fontstyle {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 700
  }

  .top-title{
    width: 466px;
    height: 28px;
    margin: 0 auto;
  }
  .top-title .fl-bcg{
    float: left;
    width: 149px;
  }
  .top-title h3{
    float: left;
    width: 168px;
    font-size: 18px;
    color: #404040;
    line-height: 28px;
    text-align: center;
  }
  .top-title .fr-bcg{
    float: left;
    width: 149px;
  }
  .el-icon-more{
    font-size: 32px;
    border-radius: 30px;
  }
</style>
