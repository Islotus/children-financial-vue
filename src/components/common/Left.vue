<template>
  <div class="dashboard" ref="dashboard">
    <el-row>
      <el-col>
        <div id="money" width="50%"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import macarons from 'echarts/theme/macarons';
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    name: "Personal",
    data() {
      return {
        chart: null
      };
    },
    methods: {
      drawbar(id) {
        let o = document.getElementById(id);
        let height = document.documentElement.clientHeight;
        height += 20;
        o.style.height= height+"px";
        this.chart = echarts.init(o,'macarons');
        this.chart.setOption(option);
        this.chart.on('click',(e)=>{
          window.location.href = e.data.url;
        })

      }
    },
    mounted() {
      this.$nextTick(function () {
        this.drawbar('money');
        var that = this;
        var resizeTimer = null;
        window.onresize = function () {
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function () {
            that.drawbar('money');
          }, 300);
        }
      });
    },

  }

  const option = {
    // backgroundColor:'#FAFAD2',
    backgroundColor:'white',
    title: {
      text: '个人业务',
      left: 'center',
      //标题栏的高度，值越大，距离顶部的距离越大
      top: 20,
      //标题栏字体的颜色
      textStyle: {
        color: 'black',
        fontSize: 25,
        fontWeight: 2
      }
    },

    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
      show: false,
      //饼图中在最大值最小值颜色范围中的亮度，值越大颜色越深
      min:10,
      max: 600,
      inRange: {
        //0-1之间，值越小颜色越深
        colorLightness: [0, 1]
      }
    },
    series : [
      {
        //饼图中内容介绍
        name:'根据账户信息查询',
        //统计表的类型
        type:'pie',
        //饼图的弧度，值越小生成的饼状图越小
        radius : '60%',
        //饼图生成后的位置
        center: ['50%', '50%'],
        data:[
          {value:400, name:'用户管理', url:'/'},
          {value:350, name:'理财产品', url:'/products'},
          {value:325, name:'账户查询', url:'/money'},
          {value:250, name:'转账汇款', url:'/transfer'},
          {value:200, name:'账户设置', url:'/'}
        ].sort(function (a, b) { return a.value - b.value; }),
        roseType: 'radius',
        //饼状图的外围标签
        label: {
          normal: {
            textStyle: {
              // color: 'rgba(0, 0, 0, 0.3)'
              color: 'black',
              fontSize: 22,
              fontFamily: "宋体斜体"
            }
          }
        },
        //指向外围标签的线条
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(0, 0, 255, 0.3)',
              width: 2
            },
            smooth: 0.5,
            length: 15,
            length2: 30
          }
        },
        itemStyle: {
          normal: {
            //具体决定了饼状图每一份的颜色显示
            color: '#FFA07A',
            //饼状图阴影，值越大阴影亮度越高
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        //图表生成的随机时间
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  };;
</script>

<style scoped>

</style>
