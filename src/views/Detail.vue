<template>
  <div class="main">
    <div class="page-header">
      <div class="breadCrumb">
        <a href="#" @click="goHome">首页</a>
        <span>&nbsp>&nbsp</span>
        <sapn>{{ date.title }}</sapn>
      </div>
      <div class="book-wrap">
        <a class="book-img" href="#">
          <img :src="'data:image/;base64,'+date.baseimg" alt="">
          <div class="free">免费</div>
        </a>
        <div class="book-info">
          <div class="book-title">{{ date.title }}</div>
          <div class="book-update">
            <span>{{ date.update }}</span>
          </div>
          <div class="book-tags">
            <span class="tag">{{ date.tag }}</span>
          </div>
          <div class="book-total">
            <div class="book-score">
              <span class="score-value value">{{ date.total[0] }}分</span>
              <span class="meg">人评分</span>
            </div>
            <div class="favor">
              <span class="value">{{ date.total[1] }}+</span>
              <sapn class="meg">收藏</sapn>
            </div>
            <div class="boo-like">
              <span class="value">{{ date.total[2] }}+</span>
              <sapn class="meg">赞赏</sapn>
            </div>
          </div>
          <div class="book-btns">
            <button class="btn-add">加入书架</button>
            <a href="#">
              <button class="btn-start">
                <span>开始阅读</span>
              </button>
            </a>
            <a href="#" @click="changeClick">
              <el-button v-if="!isLike" class="btn-like" round type="danger" @click="addClick('add')">收藏</el-button>
              <el-button v-else class="btn-like" round type="danger" @click="addClick">取消收藏</el-button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="tabs">
        <div :class="isaction ? '' :'active'" class="tab-nav " @click="handleClick">书籍简介</div>
        <div :class="isaction ? 'active' :''" class="tab-nav tab-nav-right" @click="handleClick">
          目录（{{ chapterList.length }}章）
        </div>
      </div>
      <div class="tabs-content">
        <!-- 书籍简介内容-->
        <div v-if="!isaction" class="tab-panel">
          <div class="intro">{{ date.intro }}</div>
          <div class="copy">{{ date.copy }}</div>
          <div class="chapter-wrap">
            <h3 class="title">{{ currtenChapter.chapterName }}</h3>
            <div class="chapter-content">
              <p v-for="i in currtenChapter.content">{{ i }}</p>
            </div>
          </div>
        </div>
        <!--目录-->
        <div v-if="isaction" class="tab-panel">
          <div class="sort">排序||</div>
          <div class="book-dir">
            <a v-for="i in chapterList" class="list" href="#">
              <p class="name" @click="clickChapter(i.cid)">{{ i.chapterName }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

import {GetCapterName, NovelDetails} from "../api/request.js";
import {getUserLoginData} from "../store";
import {addLike, deleteLike} from "../api/collect";

const router = useRouter()
const route = useRoute()
const userStore = getUserLoginData()
const date = ref({
  total: []
})
const isaction = ref(false)
const isLike = ref(false)
const info = reactive({})
const chapterList = ref([])
const chapterNum = ref(0)

const currtenChapter = ref({
  chapterName: '',
  content: ''
})

watch(chapterNum, () => {
  currtenChapter.value = filterChapter() // 监听章节id的变化，拿到当前对应id的章节
})

// 点击章节
function clickChapter(cid) {
  isaction.value = false
  chapterNum.value = cid
}

// 过滤章节，
function filterChapter() {
  let c = chapterList.value.filter(i => i.cid === chapterNum.value)[0] // 过滤章节id与章节数相同的章节
  c.content = c.content.split('\n')
  return c || {} // 章节id和章节数相同则返回，否则返回一个空对象
}

async function getChapterNameDate(req) {
  chapterList.value = await GetCapterName(req) // 根据小说名获取小说章节
  chapterNum.value = (chapterList.value[0] || []).cid // 获取第一章内容的id
  date.value = await NovelDetails(req)  // 根据小说名获取小说详情
  window.localStorage.setItem('detailDate', JSON.stringify(date.value))
}

// 接受home的路由传参
onMounted(() => {
  let title
  if (route.params.title) {
    const routeParams = route.params
    title = routeParams.title
  } else {
    title = JSON.parse(window.localStorage.getItem('detailDate')).title || ''
  }
  info.title = title
  getChapterNameDate(title)
  const f = userStore.likes.filter(i => i.title === info.title)
  if (f.length > 0) isLike.value = true
})

async function addClick(type) {
  const user_id = userStore.user_id || JSON.parse(window.localStorage.getItem('usernameData')).user_id
  const req = {title: info.title, user_id}
  let res
  if (type === 'add') {
    res = await addLike(req)
  } else {
    res = await deleteLike(req)
  }
  console.log(res)
}

// 切换书籍简介和详情
function handleClick() {
  isaction.value = !isaction.value
}

// 切换收藏和取消收藏
function changeClick() {
  isLike.value = !isLike.value;
  userStore.getLikes()
}

function goHome() {
  router.push({
    path: '/home'
  })
}
</script>

<style lang="less" scoped>
.main {
  width: 1200px;
  margin: 0 auto;
  //height: 380px;

  .page-header {
    .breadCrumb {
      padding-top: 25px;
      color: #666;

      a {
        color: #666;
      }
    }

    .book-wrap {
      display: flex;
      padding-top: 40px;

      .book-img {
        position: relative;

        img {
          width: 168px;
          height: 240px;
          border-radius: 6px;
        }

        .free {
          position: absolute;
          top: 0px;
          background: red;
          color: #fff;
        }
      }

      .book-info {
        padding-left: 40px;

        .book-title {
          font-size: 23px;
        }

        .book-update {
          padding-top: 26px;
          color: #666;
          font-size: 15px;
        }

        .book-tags {
          padding-top: 16px;

          .tag {
            background: rgba(51, 51, 51, .06);
            font-size: 13px;
          }
        }

        .book-total {
          display: flex;
          padding-top: 30px;

          div {
            margin-right: 50px;

            span {
              margin-right: 5px;
            }
          }

          .score-value {
            color: orange;
          }

          .value {
            font-size: 21px;
          }

          .meg {
            color: #666;
          }
        }

        .book-btns {
          padding-top: 35px;

          .btn-add {
            width: 134px;
            height: 44px;
            border: 1px;
            border-radius: 22px;
            background: rgba(14, 140, 219, .1);
            color: #0bafff
          }

          .btn-start {
            width: 134px;
            height: 44px;
            border: 1px;
            border-radius: 22px;
            margin-left: 20px;
            background: #0bafff;
            color: #fff;
          }

          .btn-like {
            margin-left: 20px;
          }
        }
      }
    }
  }

  .page-body {
    padding-top: 60px;

    .tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 21px;
      padding-right: 30%;

      .tab-nav {
        position: relative;
      }

      .tab-nav-right {
        margin-right: 58%;
      }

      .active::after {
        position: absolute;
        content: '';
        bottom: -12px;
        left: 50%;
        transform: translate(-50%);
        width: 40px;
        height: 7px;
        border-bottom: 4px solid #0bafff;
      }
    }

    .tabs-content {
      padding-top: 45px;

      .copy {
        margin-top: 35px;
        color: #666;
        font-size: 13px;
      }

      .chapter-wrap {
        margin-top: 50px;
        font-size: 22px;

        .chapter-content {
          font-size: 17px;

          p {
            text-indent: 2em;
            line-height: 30px;
          }
        }

        .continueBtn {
          height: 200px;
          padding: 77px 33%;

          button {
            width: 300px;
            height: 44px;
            border: 1px solid #0bafff;
            border-radius: 40px;
            background: #0bafff;
            color: #fff;
          }
        }
      }

      .tab-panel {
        width: 1200px;
        position: relative;

        .sort {
          font-size: 12px;
          color: #666;
          position: absolute;
          right: 270px;
          top: -58px;
        }

        .intro {
          color: #666;
        }

        .book-dir {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          .list {
            width: calc(50% - 15px);
            height: 48px;
            line-height: 48px;
            align-items: center;

            .name {
              flex: 1;
              height: 22px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              line-height: 22px;
              width: 400px;
            }
          }
        }
      }
    }
  }
}
</style>
