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
              <div style="margin-top: 40px" align="center" @click="openmessage">
                <el-switch
                  v-model="value1"
                  active-text="开启短信通知"
                  inactive-text="关闭短信通知">
                </el-switch>
              </div>
              <div style="margin-top: 40px" align="center" @click="openmessage">
                <el-switch
                  v-model="value2"
                  active-text="开启软件通知"
                  inactive-text="关闭软件通知">
                </el-switch>
              </div>
              <div style="margin-top: 40px" align="center" @click="openmessage">
                <el-switch
                  v-model="value3"
                  active-text="开启APP通知"
                  inactive-text="关闭APP通知">
                </el-switch>
              </div>
              <div style="margin-top: 40px;margin-bottom: 40px" align="center" @click="openmessage">
                <el-switch
                  v-model="value4"
                  active-text="开启邮箱通知"
                  inactive-text="关闭邮箱通知">
                </el-switch>
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
      name: "Settings",
      components:{
        Left
      },

      data() {
        return {
          value1: true,
          value2: true,
          value3: true,
          value4: true
        }
      },
      methods: {
        openmessage() {
          this.$notify({
            title: '通信操作',
            message: '操作成功'
          });
        }
      }
    }

</script>

<style scoped>
</style>


