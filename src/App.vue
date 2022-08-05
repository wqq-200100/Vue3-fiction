<template>
  <Nav/>
  <router-view></router-view>
</template>

<script setup>
import {getUserLoginData} from "./store";
import {useRouter} from "vue-router";
import {onMounted} from "vue";

const router = useRouter()
onMounted(() => {
  const store = getUserLoginData()
  store.getLikes()
  // router.push('/home')
})

</script>

<style>
@import "assets/css/global.css";

#app {
  width: 100vw;
  height: 100vh;
}

</style>
