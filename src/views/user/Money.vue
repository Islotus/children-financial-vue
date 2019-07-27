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
                  <span style="font-size: 26px;font-family: 'Microsoft YaHei';font-weight: bold">总资产：</span>
                </el-badge>
              </div>
              <div>
                <el-collapse>
                  <el-collapse-item title="查看详情">
                    <p style="font-family: 'Microsoft YaHei';font-size: 22px">存款：<a style="color: red"></a></p>
                    <p style="font-family: 'Microsoft YaHei';font-size: 22px">理财：<a style="color: red"></a></p>
                    <p style="font-family: 'Microsoft YaHei';font-size: 22px">定投：<a style="color: red">元</a></p>
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
    export default {
      name: "Money",
      components:{
        Left
      }
    }
</script>

<style scoped>

</style>
