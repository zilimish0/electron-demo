//数据库连接

import sqlite3 from 'sqlite3'
import path from 'path'
import { app } from 'electron'
let DB_PATH = path.join(app.getAppPath(), '/config/text.db')

console.log('database app path:', app.getAppPath())
console.log('database exe path:', path.dirname(app.getPath('exe')))


// 判断是否是正式环境
if (app.isPackaged) {
  // 正式环境
  DB_PATH = path.join(path.dirname(app.getPath('exe')), '/config/text.db')
}
console.log('database path:', DB_PATH)

//连接数据库
function connectDatabase() {
  return new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('connect database fail: ' + err.message)
    }
    console.log('connect database success')
  })
}
const db = connectDatabase()

//创建数据库,如果用户本地没有数据库的话就创建否则跳过
function createDataTable() {
  //创建用户表
  db.serialize(function () {
    db.run(
      'create table if not exists user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, email text, phone text);'
    )
  })
  // db.close();
}

export { connectDatabase, createDataTable, db }
