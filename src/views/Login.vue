<template>
  <div class="login">
      <h1 class="text">免费小说</h1>
    <div class="input">
      <el-form
          :label-position="labelPosition"
          :model="formLabelAlign"
          label-width="100px"
          style="max-width: 500px">
        <el-form-item label="帐号">
          <el-input v-model="formLabelAlign.name"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.region"/>
        </el-form-item>
      </el-form>
    <div class="btn">
      <el-button type="primary" class="elBtn">登录</el-button>
    </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'

const labelPosition = ref('right')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})

</script>

<style lang="less" scoped>
.login {
  margin-left: 40vw;
  margin-top: 50vh;
  .text{
    position: absolute;
    top: 30vh;
    left: 49vw;
  }
  .input{
    position: relative;
  }
  .elBtn{
    width: 243px;
    position: absolute;
    left: 172px;
    top: 113px;
  }
}
</style>
