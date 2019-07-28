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
                  <span style="font-size: 26px;font-family: 'Microsoft YaHei';font-weight: bold">账户设置</span>
                </el-badge>
              </div>
              <!-- 试试 -->
              <el-switch
                      v-model="value1"
                      active-text="开启手机通知"
                      inactive-text="关闭手机通知">
                    </el-switch>
              <!-- 试试 -->
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import Left from '@/components/common/Left'
    export default {
      name: "Settings",
      components:{
        Left
      },

      data() {
        return {
            value1: true,
            value2: true
              }
             }
    }

</script>

<style scoped>
</style>


