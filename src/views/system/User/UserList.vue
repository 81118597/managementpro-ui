<template>
  <el-container>
    <el-aside width="200px" style="border-right: 1px solid #d2d6de;border-left:none; margin-top: 5px">
     <div style="padding-left:5px;">
       <i class="el-icon-s-grid"></i>
       <span style="padding-left:3px;">组织机构</span>
     </div>
      <tree :nodes="Nodes" :setting="Setting" @onCreated="handleCreated" style="padding-left: 5px;padding-top: 10px;"></tree>
    </el-aside>
    <el-main>
      <el-form size="mini" :model="searchForm" ref="form" label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="名称">
              <el-input v-model="searchForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="电话">
              <el-input v-model="searchForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="邮箱">
              <el-input v-model="searchForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-button style="margin-left:20px;" size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="addUser">新增</el-button>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        :height="tableHeight"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="success"
              @click="assignRole(scope.$index,scope.row)"
              size="mini">分配角色</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="1"
        :page-size="3"
        :total="1000"
        layout="prev, pager, next"
        style="padding: 30px 0;text-align: center"
        @current-change="handleSizeChange">
      </el-pagination>
      <el-dialog :title="addTitle" :visible.sync="dialogVisible" width="45%">
        <el-form size="mini" :rules="rules" :inline="true" :model="userForm" ref="form" label-width="80px">
          <el-form-item label="姓名" prop="loginname">
            <el-input v-model="userForm.loginname"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userForm.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="userForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="登录名" prop="username">
            <el-input v-model="userForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="deptName">
            <el-input @click.native="selectDept" v-model="userForm.deptName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserPull">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog
        :title="parentDialogtitle"
        :visible.sync="parentDialogVisible"
        width="30%">
        <tree :nodes="parentNodes" @onCreated='createdParent' :setting="parentSetting"></tree>
        <span slot="footer" class="dialog-footer">
    <el-button @click="parentDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="parentDialogVisible = false">确 定</el-button>
    </span>
      </el-dialog>
      <el-dialog
        :title="Roletitle"
        :visible.sync="dialogRoleVisible"
        class="roleClass"
        width="50%">
        <el-table
          :data="tableRoleData"
          style="width: 100%"
          @current-change="selectRoleRow"
          highlight-current-row>
          <el-table-column
            prop="id"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色"
            width="180">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="描述">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogRoleVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogRoleVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
  import tree from "vue-giant-tree"
  export default {
    mounted () {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 230; //后面的50：根据需求空出的高度，自行调整
      });
    },
    components:{
      tree
    },
    data() {
      return {
        Roletitle:'',
        dialogRoleVisible:false,
        parentDialogtitle:'',
        parentDialogVisible:false,
        ZtreeObj: null,
        addTitle:'',
        dialogVisible:false,
        rules:{
          loginname:[{
            required:true,
            trigger:"change",
            message:"请输入姓名"
          }],
          username:[{
            required:true,
            trigger:"change",
            message:"请输入用户名"
          }],
          password:[{
            required:true,
            trigger:"change",
            message:"请输入密码"
          }],
          deptName:[{
            required:true,
            trigger:"change",
            message:"请选择部门"
          }],
          phone:[{
            required:true,
            trigger:"change",
            message:"请输入手机号"
          }]
        },
        userForm: {
          username: "",
          sex:0,
          loginname: "",
          phone:"",
          password: "",
          deptId: "",
          deptName:""

        },
        tableRoleData: [],
        Nodes: [
          {
            id: "0",
            pid: "-1",
            likeId: "0,",
            parentName: null,
            manager: null,
            name: "顶级部门",
            deptCode: null,
            deptAddress: null,
            deptPhone: null,
            orderNum: null
          },
          {
            id: "1000000362292826",
            pid: "1000001251633881",
            likeId: "0,100000177618509910000012516338811000000362292826",
            parentName: "销售部门",
            manager: null,
            name: "销售1",
            deptCode: "",
            deptAddress: "",
            deptPhone: "",
            orderNum: 0
          },
          {
            id: "1000001251633881",
            pid: "1000001776185099",
            likeId: "0,10000017761850991000001251633881",
            parentName: "秘咖科技有限公司",
            manager: null,
            name: "销售部门",
            deptCode: null,
            deptAddress: null,
            deptPhone: null,
            orderNum: null
          },
          {
            id: "1000001341234088",
            pid: "1000001776185099",
            likeId: "0,1000001776185099",
            parentName: "秘咖网络科技有限公司",
            manager: null,
            name: "人才管理部1",
            deptCode: "RCGL",
            deptAddress: "",
            deptPhone: "",
            orderNum: 0
          },
          {
            id: "1000001620535597",
            pid: "1000001776185099",
            likeId: "0,10000017761850991000001620535597",
            parentName: "秘咖网络科技有限公司",
            manager: null,
            name: "软件研发部",
            deptCode: null,
            deptAddress: null,
            deptPhone: null,
            orderNum: null
          },
          {
            id: "1000001776185099",
            pid: "0",
            likeId: "0,1000001776185099",
            parentName: "顶级部门",
            manager: null,
            name: "秘咖网络科技有限公司",
            deptCode: null,
            deptAddress: null,
            deptPhone: null,
            orderNum: null
          },
          {
            id: "1000002097176073",
            pid: "1000001776185099",
            likeId: "0,10000017761850991000002097176073",
            parentName: "秘咖网络科技有限公司",
            manager: "464156",
            name: "售后服务部",
            deptCode: "SHFWB",
            deptAddress: "昆明",
            deptPhone: "18687171906",
            orderNum: null
          }
        ], //上级部门树数据
        //上级部门树配置
        Setting: {
          view: {
            showLine: true,
            showIcon: false,
            fontCss: { "font-size": "12px", color: "#333" }
          },
          //设置这里会显示复选框
          // check: {
          //   enable: true
          // },
          data: {
            simpleData: {
              enable: true,
              idKey: "id",
              pIdKey: "pid",
              rootPId: "0"
            }
          },
          callback: {
            onClick: this.ztreeOnClick
          }
        },

        // ---------------------------
        parentNodes :[],
        parentZtreeObj: null,
        //上级部门树配置
        parentSetting: {
          view: {
            showLine: true,
            showIcon: false,
            fontCss: { "font-size": "12px", color: "#333" }
          },
          //设置这里会显示复选框
          // check: {
          //   enable: true
          // },
          data: {
            simpleData: {
              enable: true,
              idKey: "id",
              pIdKey: "pid",
              rootPId: "0"
            }
          },
          callback: {
            onClick: this.ztreeParentOnClick
          }
        },
        searchForm:{
          username:'',
          phone:'',
          email:''
        },
        tableHeight:0,
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods:{
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
      },
      handleEdit(index,row){

      },
      handleDelete(index,row){

      },
      assignRole(index,row){
        this.tableRoleData=[
          {id:'1',roleName:'超级管理员',remark:"所有权限"},
          {id:'2',roleName:'系统管理员',remark:"系统"},
          {id:'3',roleName:'财务管理员',remark:"财务"},
        ]
        this.dialogRoleVisible=true
        this.Roletitle='分配角色'
      },
      ztreeOnClick(evt,treeId,treeNode){
        console.log(treeNode)
      },
      handleCreated(treeObj){
        this.ZtreeObj=treeObj
        treeObj.expandAll(true)
      },
      addUser(){
        this.addTitle='添加用户'
        this.dialogVisible=true
        this.resetForm('form')
      },
      createdParent(treeObj){
        this.parentZtreeObj=treeObj;
        treeObj.expandAll(true)
      },
      selectDept(){
        this.parentDialogtitle='选择部门';
        this.parentDialogVisible = true;
        this.parentNodes = [
    {
      id: "1000000362292826",
      pid: "1000001251633881",
      likeId: "0,100000177618509910000012516338811000000362292826",
      parentName: "销售部门",
      manager: null,
      name: "销售1",
      deptCode: "",
      deptAddress: "",
      deptPhone: "",
      orderNum: 0
    },
    {
      id: "1000001251633881",
      pid: "1000001776185099",
      likeId: "0,10000017761850991000001251633881",
      parentName: "秘咖科技有限公司",
      manager: null,
      name: "销售部门",
      deptCode: null,
      deptAddress: null,
      deptPhone: null,
      orderNum: null
    },
    {
      id: "1000001341234088",
      pid: "1000001776185099",
      likeId: "0,1000001776185099",
      parentName: "秘咖网络科技有限公司",
      manager: null,
      name: "人才管理部1",
      deptCode: "RCGL",
      deptAddress: "",
      deptPhone: "",
      orderNum: 0
    },
    {
      id: "1000001620535597",
      pid: "1000001776185099",
      likeId: "0,10000017761850991000001620535597",
      parentName: "秘咖网络科技有限公司",
      manager: null,
      name: "软件研发部",
      deptCode: null,
      deptAddress: null,
      deptPhone: null,
      orderNum: null
    },
    {
      id: "1000001776185099",
      pid: "0",
      likeId: "0,1000001776185099",
      parentName: "顶级部门",
      manager: null,
      name: "秘咖网络科技有限公司",
      deptCode: null,
      deptAddress: null,
      deptPhone: null,
      orderNum: null
    },
    {
      id: "1000002097176073",
      pid: "1000001776185099",
      likeId: "0,10000017761850991000002097176073",
      parentName: "秘咖网络科技有限公司",
      manager: "464156",
      name: "售后服务部",
      deptCode: "SHFWB",
      deptAddress: "昆明",
      deptPhone: "18687171906",
      orderNum: null
    }
  ]
      },
      ztreeParentOnClick(evt,treeId,treeNode){
        this.userForm.deptId = treeId;
        this.userForm.deptName = treeNode.name;
      },
      selectRoleRow(row){
        console.log(row)
      },
      addUserPull(){
        const  _this=this;
        this.$refs.form.validate(valid=>{
          if(valid){
            _this.dialogVisible=false
          }
        })
      },
      resetForm(FormName){
        if(this.$refs[FormName]){
          this.$refs[FormName].resetFields();
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .roleClass /deep/ .el-table__body tr.current-row > td {
    background: #409eff !important;
    color: #fff;
  }
</style>
