<template>
  <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
    <el-table-column prop="id" label="编号" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="email" label="邮箱地址"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },

  mounted(){
    console.log('mounted start' )
    // this.getTabledata()
    this.testDb()
  },

  methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%4 === 1) {
          return 'warning-row';
        } else if (rowIndex%4 === 3) {
          return 'success-row';
        }
        return '';
      },


    getTabledata(){
       console.log('getTabledata start')
      // // 当组件挂载时发送数据请求
      window.electron.ipcRenderer.send('get-tabledata')

      // 监听来自主进程的数据
      window.electron.ipcRenderer.on('tabledata', (e, data) => {
        this.tableData = data
        console.log(data)
      })
    },

    testDb(){
      console.log('testDb start')
      window.electron.ipcRenderer.send('query-database', 'select * from user');

      window.electron.ipcRenderer.on('query-results', (event, data) => {
        data.forEach((row) => {
        this.tableData.push(row)
        console.log('qeury db row: '+ `${row.id}: ${row.name}`);
      });
      })
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
