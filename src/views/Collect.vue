<template>
  <div class="collect">
    <div class="btn">
      <el-button class="btn-edit" round type="primary">编辑</el-button>
    </div>
    <div class="main">
      <div v-for="item in store.likes" class="main-books">
        <div class="book-img">
          <img :src="'data:image/;base64,'+item.baseimg" alt="book">
        </div>
        <div class="book-title">
          <p>{{ item.title }}</p>
        </div>
        <div class="book-chapternum">{{ item.chapterCount }}章</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getUserLoginData} from "../store";
const store = getUserLoginData()

</script>

<style lang='less' scoped>
.collect {
  width: 1200px;
  margin: 50px auto;

  .btn-edit {
    width: 100px;
    height: 40px;
    font-size: 17px;
  }

  .main {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;

    .main-books {
      margin: 22px 15px;
    }
  }

  .book-img {
    img {
      width: 140px;
      height: 200px;
    }
  }
}
</style>
