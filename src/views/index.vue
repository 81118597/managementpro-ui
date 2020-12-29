<template>
  <div style="margin:20px 20px;">
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="12">
        <div class="grid-content bg-purple ub column-top" style='background:#00c0ef;color:#FFF;height:120px;border-radius:5px'>
          <div class='ub-f1' style='font-size:38px;font-weight: bold;padding:20px;'>0</div>
          <div class='' style="background: #3399FF;height:30px;text-align:'center">今日支付订单</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple ub column-top" style='background:#00c0ef;color:#FFF;height:120px;border-radius:5px'>
          <div class='ub-f1' style='font-size:38px;font-weight: bold;padding:20px;'>0</div>
          <div class='' style="background: #3399FF;height:30px;text-align:'center">今日待发货</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" class="row-bg" justify="center" style="margin-top:20px;">
      <el-col :span="12">
        <div class="grid-content bg-purple ub column-top" style='background:#00c0ef;color:#FFF;height:120px;border-radius:5px'>
          <div class='ub-f1' style='font-size:38px;font-weight: bold;padding:20px;'>0</div>
          <div class='' style="background: #3399FF;height:30px;text-align:'center">今日已发货订单</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple ub column-top" style='background:#dd4b39;color:#FFF;height:120px;border-radius:5px'>
          <div class='ub-f1' style='font-size:38px;font-weight: bold;padding:20px;'>0</div>
          <div class='' style="background: rgba(0, 0, 0, 0.1);height:30px;text-align:'center">今日异常</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        userName: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
