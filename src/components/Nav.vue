<template>
  <div class="nav">
    <div class="wrap">
      <div class="left">
        <a href="#" @click="goHome">
          <img alt="" class="logo" src="../assets/img/logo.png">
        </a>
        <div class="tabs">
          <a class="active" href="#">首页</a>
          <a href="#">详情</a>
          <a href="#">书架</a>
        </div>
      </div>
      <div class="right">
        <div class="search">
          <el-select
              v-model="searchData"
              :remote-method="remoteMethod"
              filterable
              multiple
              placeholder="请输入书名"
              remote
              reserve-keyword>
            <el-option
                v-for="item in options"
                :key="item.id"
                :value="item.title"/>
          </el-select>
        </div>
        <div class="other">
          <a href="#">作家专区</a>
          <a href="#">手机版</a>
        </div>
        <p class="login">登录&nbsp&nbsp|&nbsp&nbsp注册</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref, watch} from 'vue'
import {Search} from "../network/request.js";

const options = ref([])
const searchData = ref([])

watch(searchData, () => {
  // 监听搜索内容，如有内容则通过路由传参，跳转至详情
  if (searchData.value.length > 0) {
    router.push({
      name: 'detail',
      params: {
        title: searchData.value[0],
      }
    })
  }
})

const remoteMethod = async (query) => {
  if (query) {
    options.value = await Search(query)
  } else {
    options.value = []
  }
}

const router = useRouter()
function goHome() {
  router.push({
    path: '/'
  })
}

</script>

<style lang="less" scoped>
.nav {
  width: 100vw;
  background: rgba(245, 245, 247, .8);

  .wrap {
    width: 1200px;
    height: 64px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    line-height: 64px;

    .left {
      display: flex;

      .logo {
        width: 110px;
        cursor: pointer; // 悬浮上空为首手
        vertical-align: middle;
      }

      .tabs {
        -webkit-box-align: center;
        align-items: center;
        margin-left: 68px;

        a {
          margin-right: 50px;
        }

        .active {
          font-weight: bold;
          color: dodgerblue;
          border-bottom: 5px solid dodgerblue;
          display: inline-block;
          position: relative;
          top: -4px;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      -webkit-box-pack: justify;

      .search {
        padding-right: 30px;

        input {
          border-radius: 50px;
          border: 1px solid #888888;
          height: 25px;
          width: 175px;
          -webkit-appearance: none;
          outline: none;
          font: inherit;
        }
      }

      .other {
        padding-right: 50px;
        display: flex;
        align-items: center;
        -webkit-box-align: center;

        a {
          margin-left: 35px;
        }
      }
    }
  }
}
</style>
