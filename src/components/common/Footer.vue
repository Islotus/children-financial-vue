<template>
  <footer style="margin-top: 75px; border-color: black;margin-bottom: -1px">
    <div style="margin-bottom: auto; text-align: center">
      <span>浙商银行股份有限公司版权所有 浙ICP备 05008708号</span>
    </div>
  </footer>

</template>

<script>
  export default {
    name: "SelfFooter",
    data: () => ({}),
    props: {
      color: {
        type: String,
        default: "#ea0404"
      },
      flat: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style scoped></style>
