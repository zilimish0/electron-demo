<template>
  <div>主页11</div>
  <!-- 显示接收到的数据 -->
  <ul>
    <li v-for="val in list" :key="val.id">{{ val.title }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
const list = ref([])
// // 当组件挂载时发送数据请求
window.electron.ipcRenderer.send('get-data')

// 监听来自主进程的数据
window.electron.ipcRenderer.on('dataList', (e, data) => {
  list.value = data
  console.log(list.value)
})
</script>

<style></style>
