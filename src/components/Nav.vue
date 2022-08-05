<template>
  <div class="nav">
    <div class="wrap">
      <div class="left">
        <a href="#" @click="goHome">
          <img alt="" class="logo" src="../assets/img/logo.png">
        </a>
        <div class="tabs">
          <a :class="route.path ==='/home' && 'active'" href="#" @click="router.push('/home')">首页</a>
          <a :class="route.path ==='/collect' && 'active'" href="#" @click="router.push('/collect')">收藏</a>
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
        <p v-if="username">
          {{ username }}
          <button @click="logout">退出登录</button>
        </p>
        <p v-else class="login" @click="goLogin">登录|注册</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref, watch} from 'vue'
import {Search} from "../api/request.js";
import {getUserLoginData} from "../store";
import {useRoute} from "vue-router";
import {getLocal} from "../utils/tools";

const options = ref([])
const searchData = ref([])
const username = ref('')
let loginStore = getUserLoginData()
const route = useRoute()
const router = useRouter()

function goHome() {
  router.push({path: '/home'})
}

function goLogin() {
  router.push('/login')
}

//监听路由的变化，拿到变化后的路由参数
watch(() => route.path, () => {
  const params = route.params.username
  if (params) username.value = params
})

// 为了防止刷新丢失数据，将用户名保存到本地
onMounted(() => {
  const storageName = getLocal('usernameData').stateUsername
  if (storageName) username.value = storageName
})

function logout() {
  loginStore.$reset() // 重置state
  window.localStorage.clear('username') // 清空localStorage
  username.value = ''
}

// 监听搜索内容，如有内容则通过路由传参，跳转至详情
watch(searchData, () => {
  if (searchData.value.length > 0) {
    router.push({
      name: 'detail',
      params: {
        title: searchData.value[0],
      }
    })
  }
})

// 如果有参数，将搜索的结果赋值给option,否则为空数组
const remoteMethod = async (query) => {
  if (query) {
    options.value = await Search(query)
  } else {
    options.value = []
  }
}


</script>

<style lang="less" scoped>
@media screen and (min-width: 601px) {
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
}

@media screen and (max-width: 600px) {
  .nav {
    width: 100vw;
    background: rgba(245, 245, 247, .8);

    .wrap {
      height: 64px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 16px;
      line-height: 64px;

      .left {
        display: flex;
        flex: 1;

        .logo {
          width: 65px;
          margin-top: 24px;
        }

        .tabs {
          font-size: 16px;
          display: flex;
          margin-left: 13px;
          overflow: hidden;

          a {
            margin-left:6px;
          }

          .active{
            font-weight: bold;
            color: dodgerblue;
            font-size: 16px;
            position: relative;
            &:after{
              display: table;
              content: '';
              width: 100%;
              background: dodgerblue;
              height: 3px;
              position: absolute;
              bottom: 5px;
            }
          }
        }
      }

      .right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .search {
          flex: 1;
          padding-right: 13px;

          .input {
            border: 1px solid #8888;
            border-radius: 50px;
          }
        }
      }

    }

    /*.wrap {
      //width: 100%;
      height: 64px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      line-height: 64px;

      .left {
        .logo {
          width: 110px;
          cursor: pointer; // 悬浮上空为首手
          vertical-align: middle;
        }

        .tabs {
          display: flex;

          -webkit-box-align: center;
          align-items: center;
          margin-left: 68px;

          a {
            //margin-right: 50px;
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
          //padding-right: 30px;

          input {
            border-radius: 50px;
            border: 1px solid #888888;
            height: 25px;
            width: 175px;
            //-webkit-appearance: none;
            outline: none;
            font: inherit;
          }
        }

        .other {
          //padding-right: 50px;
          display: flex;
          align-items: center;
          //-webkit-box-align: center;

          a {
            //margin-left: 35px;
          }
        }
      }
    }*/
  }
}

</style>
