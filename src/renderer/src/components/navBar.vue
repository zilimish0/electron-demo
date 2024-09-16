<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <div class="flex-grow" />
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">关于</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter() // 使用 useRouter() 函数获取 router 实例
const activeIndex = ref('1')

const handleSelect = (key: string) => {
  if (key == '1') {
    router.push('/')
  } else {
    router.push('/about')
  }
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
