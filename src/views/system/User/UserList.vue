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
            <el-form-item label="用户名">
              <el-input v-model="searchForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="电话">
              <el-input v-model="searchForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="邮箱">
              <el-input v-model="searchForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-button style="margin-left:20px;" size="mini" type="primary" icon="el-icon-search" @click="query">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="addUser">新增</el-button>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        :height="tableHeight"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="用户编号">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="isEnabled"
          label="帐户是否可用">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isEnabled === 1" size="success">可用</el-tag>
            <el-tag v-else size="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="注册手机号">
        </el-table-column>
        <el-table-column
          prop="email"
          label="注册邮箱">
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
        :current-page="searchForm.current"
        :page-size="searchForm.size"
        layout="prev, pager, next"
        style="padding: 30px 0;text-align: center"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
      <el-dialog :title="addTitle" :visible.sync="dialogVisible" width="45%">
        <el-form size="mini" :rules="rules" :inline="true" :model="userForm" ref="form" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userForm.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="userForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="帐户">
            <el-radio-group v-model="userForm.isEnabled">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">使用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="登录名" prop="username">
            <el-input v-model="userForm.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="userForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email"></el-input>
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
            label="编号"
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
  import {getLeftTree} from "@/api/dept/Dept"
  import {getuserList} from "@/api/user/User"
  export default {
    mounted () {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 230; //后面的50：根据需求空出的高度，自行调整
      });
    },
    components:{
      tree
    },
    created(){
      this.getdeptTree()
    },
    data() {
      return {
        total:0,
        Roletitle:'',
        dialogRoleVisible:false,
        parentDialogtitle:'',
        parentDialogVisible:false,
        ZtreeObj: null,
        addTitle:'',
        dialogVisible:false,
        rules:{
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
          mobile:[{
            required:true,
            trigger:"change",
            message:"请输入手机号"
          }],
          email:[{
            required:true,
            trigger:"change",
            message:"请输入邮箱"
          }]
        },
        userForm: {
          username: "",
          sex:0,
          mobile:"",
          password: "",
          deptId: "",
          deptName:"",
          isEnabled:1,
          nickName:"",
          email:""
        },
        tableRoleData: [],
        Nodes: [], //上级部门树数据
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
          mobile:'',
          pid:'',
          current:1,
          size:3,
          email:""
        },
        tableHeight:0,
        tableData: []
      }
    },
    methods:{
      getList(){
        getuserList(this.searchForm).then(response=>{
          this.tableData=response.data.list.records
          this.searchForm.current=response.data.list.current
          this.searchForm.size=response.data.list.size
          this.total=response.data.list.total
        })
      },
      query(){
        this.getList()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        this.searchForm.current=val
        this.getList();
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
        this.searchForm.pid=treeNode.id
        this.getList()
        console.log(treeNode)
      },
      handleCreated(treeObj) {
        this.ZtreeObj = treeObj
        treeObj.expandAll(true)
        let firstTree = this.ZtreeObj.getNodes()[0];
        //默认选中第一个
        this.ZtreeObj.selectNode(firstTree);
        //加载完自动点击第一个，加载右边表格
        if (firstTree) {
          //此处需要判断，否则会报错
          this.Setting.callback.onClick(null, firstTree.id, firstTree);
        }
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
        getLeftTree().then(response=>{
          this.parentNodes=response.data.deptList
        })
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
      getdeptTree(){
        getLeftTree().then(response=>{
          this.Nodes=response.data.deptList
        })
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
