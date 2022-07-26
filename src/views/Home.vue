<template>
  <Nav/>
  <div class="banner">
    <div class="wrap">
      <div class="swiper">
        <img alt="" src="../assets/img/banner.png">
      </div>
    </div>
  </div>
  <div class="list">
    <p class="choice">精选推荐</p>
    <div class="top">
      <a v-for="item in data" href="#">
        <div class="book" @click="goto(item)">
          <img :src="'data:image/;base64,'+ item.baseimg" alt="">
          <p class="name">{{ item.title }}</p>
          <p class="intro">{{ item.intro }}</p>
          <div class="other">
            <span class="writer">{{ item.other }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {RecommendNovel} from "../network/request.js";
import Nav from '../components/Nav.vue'

const data = reactive([])
const router = useRouter()

async function bookList() {
  let res = await RecommendNovel()
  res.forEach(i => {
    data.push(i)
  })
}

bookList()

function goto(item) {
  router.push({
    name: 'detail',
    params: {
      title: item.title,
    }
  })
}

</script>

<style lang="less" scoped>
.banner {
  width: 100vw;
  height: 400px;
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 46.2%, #fff), #def4ff;
  position: relative;

  .wrap {
    width: 1200px;
    margin: 0 auto;

    .swiper img {
      padding-top: 40px;
    }
  }
}

.list {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;

  p {
    width: 128px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 23px;
    margin-top: 0;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .book {
      margin: 0 36px 30px 43px;

      img {
        width: 128px;
        height: 171px;
        border-radius: 6px;
      }

      .name {
        font-size: 16px;
        margin-top: 6px;
      }

      .intro {
        width: 128px;
        height: 34px;
        line-height: 18px;
        font-size: 14px;
        color: #666;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }

      .other {
        font-size: 12px;
        display: flex;
        justify-content: space-between;

        .writer {
          color: #666;
          width: 128px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .num {
          color: darksalmon;
        }
      }
    }
  }
}
</style>
