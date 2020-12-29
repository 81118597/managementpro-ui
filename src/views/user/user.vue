<template>
  <div>
    <el-breadcrumb separator="/"  style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="部门" label-width="70px">
          <el-select v-model="formInline.city" placeholder="请选择">
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="70px">
          <el-input v-model="formInline.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="70px">
          <el-input clearable v-model="formInline.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="70px">
          <el-input clearable v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 70px">
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          <el-button type="success" icon="el-icon-plus">添加</el-button>
          <el-button type="warning" icon="el-icon-download">导出</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
          <el-button icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%;height: 500px">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        style="float: right;margin: 15px 15px 15px 0px"
        :current-page="page"
        :total="total"
        :page-size="limit"
        :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
        @current-change="getList"
        @size-change="changeSize"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import { Userlist } from '@/api/user/user'
export default {
  data () {
    return {
      cities: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }],
      value: '',
      formInline: {
        user: '',
        region: '',
        city: '',
        name: '',
        nickname: '',
        email: ''
      },
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      tableData: [],
      currentPage4: 4
    }
  },
  created () {
    this.getList()
  },
  methods: {
    changeSize (size) {
      this.limit = size
      this.getList(1)
    },
    getList (page = 1) {
      // this.page=page
      // Userlist(this.page,this.limit)
      //   .then(response=>{
      //     this.tableData=response.data.data.items
      //     this.total=response.data.data.total
      //   })
    },

    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
