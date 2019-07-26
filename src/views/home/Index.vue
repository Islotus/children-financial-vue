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

  #side-menu {
    position: fixed;
    margin-left: 50%;
    left: -680px;
    top: 100px;
  }

  .box-card {
    margin-top: 60px;
  }
</style>
