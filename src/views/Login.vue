<template>
  <div class="login">
    <h1 class="text">免费小说</h1>
    <div class="input">
      <el-form
          label-position="left"
          :model="formLabelAlign">
        <el-form-item label="帐号:">
          <el-input v-model="formLabelAlign.name"/>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="formLabelAlign.pwd"/>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button class="registerBtn" @click="onSubmit('register')">注册</el-button>
        <el-button class="loginBtn" type="primary" @click="onSubmit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {login, registerRequest} from "../api/user";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {getUserLoginData} from "../store";
const router = useRouter()
const formLabelAlign = reactive({
  name: '',
  pwd: '',
})
let loginStore = getUserLoginData()

// 提交用户名和密码
async function onSubmit(subType) {
  const req = {
    username: formLabelAlign.name,
    password: formLabelAlign.pwd
  }
  let res
  if (subType === 'register') {
    res = await registerRequest(req)
    ElMessage({
      message: res,
      type: 'success',
    })
  } else {
    res = await login(req)
    if (res.msg === "登录成功") {
      // 登录成功将用户id和用户名保存到store中
      loginStore.$patch({
        user_id: res.user_id,
        stateUsername: formLabelAlign.name
      })
      window.localStorage.setItem('usernameData', JSON.stringify(loginStore))
      await router.push({
        name: 'home',
        params: {username: loginStore.stateUsername}
      })
    }
  }
}

</script>

<style lang="less" scoped>

@media screen and (min-width: 601px) {

  .login {
    width: 500px;
    margin-left: 37vw;
    margin-top: 30vh;

    .text {
      position: absolute;
      top: 20vh;
      left: 49vw;
    }

    .input {
      position: relative;

      .btn {
        width: 300px;
        display: flex;
        margin: 40px 130px;
        justify-content: space-between;

        .registerBtn, .loginBtn {
          width: 120px;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .login {
    width: 100vw;
    margin-top: 5rem;

    .text {
      position: relative;
      top: 40px;
      text-align: center;
    }

    .input {
      position: relative;
      width: 90%;
      margin: 50% auto;

      .btn {
        margin: 30px auto;
        width: 80%;
        display: flex;

        align-items: center;
        justify-content: space-around;

        .registerBtn, .loginBtn {
          width: 5rem;
        }
      }
    }
  }
}
</style>
