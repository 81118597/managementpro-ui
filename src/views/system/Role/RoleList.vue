<template>
  <el-main>
    <!--搜索框-->
    <el-form  style="margin-top: 20px" size="mini" :model="RoleQuery" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
          <el-input v-model="RoleQuery.name" placeholder="请输入角色名"></el-input>
          </el-form-item>
        </el-col>
        <el-button class="bth-left" size="small" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        <el-button size="small " type="primary" icon="el-icon-plus" @click="openAddRole" v-if='hasPerm("sys:role:add")'>新增</el-button>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      :height=tableHeight
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="editRole(scope.row)" size="mini" v-if='hasPerm("sys:role:edit")'>编辑</el-button>
          <el-button type="success" @click="assignRole(scope.row)" size="mini" v-if='hasPerm("sys:role:assign")'>分配权限</el-button>
          <el-button type="danger" @click="deleteRole(scope.row)" size="mini" v-if='hasPerm("sys:role:delete")'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="RoleQuery.current"
      :page-size="RoleQuery.size"
      layout="prev, pager, next"
      style="padding: 30px 0;text-align: center"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="42%"
      :before-close="handleClose" size="small">
      <el-form :rules="rules"  ref="addRole" :model="addRoleForm" size="small" :inline="true" label-width="80px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="addRoleForm.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="角色描述">
          <el-input v-model="addRoleForm.remark" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmBtn">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="Visible"
      width="30%"
      class="self_dialog"
      :before-close="handleClose">
      <tree
        :setting="setting"
        :nodes="treeDatas"
        @onCheck="ztreeOnCheck"
        @onCreated="handleCreated"
      />
      <span slot="footer" class="dialog-footer">
    <el-button @click="Visible = false">取 消</el-button>
    <el-button type="primary" @click="saveAssign">确 定</el-button>
  </span>
    </el-dialog>
  </el-main>
</template>
<script>
import tree from "vue-giant-tree";
import {getRoleList,addrole,selectById,updarole,delrole,MenuTree,assignRole,assignRoleMenu} from '@/api/role/Role'
export default {
  components:{
    tree
  },
  data () {
    return {
      editTag:null,
      pages:1,
      total:0,
      //查询
      RoleQuery:{
        name:null,
        current:1,
        size:5
      },
      //ztree对象
      ztreeObj: null,
      //ztree配置,参照ztree官网的配置
      setting: {
        check: {
          //树是否带复选框或者单选框
          enable: true
        },
        data: {
          simpleData: {
            //是否使用简单数据模式
            enable: true,
            //树节点id
            idKey: "id",
            //父级id
            pIdKey: "pid",
            rootPId: "0"
          }
        },
        //ztree回调函数
        callback: {
          //树选择事件
          onCheck: this.ztreeOnCheck
        }
      },
      rules:{
        name:[{
            required:true,
            trigger:"change",
            message:"请输入角色名称"
          }],
        remark:[{
            required:true,
            trigger:"change",
            message:"请输入角色描述"
          }]
      },
      Visible:false,
      dialogTitle:'',
      dialogVisible: false,
      roleId:null,
      addRoleForm:{
        name:'',
        remark:''
      },
      treeDatas:[],
      tableHeight: window.innerHeight,
      tableData: [],
      checkMenu:[]
    }
  },
  created(){
    this.getList()
  },
  methods:{
    query(){
      this.getList()
    },
    getList(){
      getRoleList(this.RoleQuery).then(response=>{
        this.tableData=response.data.list.records
        console.log(response)
        this.pages=(response.data.list.pages)
        this.total=response.data.list.total
        this.RoleQuery.current=response.data.list.current
      })
    },

    openAddRole(){
      this.editTag=null
      this.resetForm('addRole')
      this.dialogTitle="新增角色"
      this.dialogVisible=true
    },
    confirmBtn(){
      if(this.editTag){
        this.updarole()
      }else{
        this.Addrole()
      }
    },
    updarole(){
      const  _this=this;
      this.$refs.addRole.validate(valid=>{
        if(valid){
          _this.dialogVisible=false
          updarole(this.addRoleForm).then(response=>{
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getList()
          })
        }
      })
    },
    Addrole(){
      const  _this=this;
      this.$refs.addRole.validate(valid=>{
        if(valid){
          _this.dialogVisible=false
          addrole(this.addRoleForm).then(response=>{
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.getList()
          })
        }
      })
    },
    editRole(row){
      this.editTag=1
      this.dialogTitle="编辑角色"
      this.dialogVisible=true
      this.selectByid(row.id)
    },
    selectByid(roleId){
      selectById(roleId).then(response=>{
        this.addRoleForm=response.data.role
      })
    },
    assignRole(row){
      this.dialogTitle="为"+row.name+"分配权限"
      this.roleId=row.id
      let parm={
        userId:sessionStorage.getItem('userId'),
        roleId:row.id
      }
      MenuTree(parm).then(response=>{
        this.treeDatas=response.data.treeVos
      })
      this.Visible=true
    },
    deleteRole(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delrole(row.id).then(response=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除'
        });
      });
    },
    handleClose(done) {
          done();
    },
    resetForm(FormName){
      if(this.$refs[FormName]){
        this.$refs[FormName].resetFields();
      }
    },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
      this.RoleQuery.current=val
        this.getList();
      },
    //获取选择的权限
    ztreeOnCheck(){
      let checked=this.ztreeObj.getCheckedNodes(tree)
      this.checkMenu=checked
    },
    saveAssign(){
      if(this.checkMenu.length<1){
        this.$message({
          type: 'error',
          message: '请勾选权限!'
        });
        return;
      }
      let parm={
        list:this.checkMenu,
        roleId:this.roleId
      }
      assignRoleMenu(parm).then(response=>{
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
        this.Visible=false
      })
    },
    handleCreated: function(ztreeObj) {
      this.ztreeObj = ztreeObj;
      // onCreated 中操作ztreeObj对象展开第一个节点
      ztreeObj.expandAll(true)
    },
  },
  //计算表格高度
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 230; //后面的50：根据需求空出的高度，自行调整
    });
  },
}
</script>
<style lang="scss" scoped>
  .bth-left{
    margin-left: 20px;
  }
  .el-main{
    padding-top: 5px!important;
  }
  .self_dialog {
    display: flex;
    justify-content: center;
    align-items: Center;
    overflow: hidden;
  }
  .self_dialog /deep/ .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }
  .self_dialog /deep/ .el-dialog .el-dialog__body {
    padding-top: 5px !important;
    overflow: hidden;
    overflow-y: auto;
    margin-bottom: 40px;
  }
  .self_dialog /deep/ .el-dialog .el-dialog__footer{
    left: 55%;
    bottom: 0;
    position: absolute;
  }
  /*/deep/::-webkit-scrollbar {*/
  /*  width: 8px;*/
  /*  height: 8px;*/
  /*}*/
  /*/deep/::-webkit-scrollbar-thumb {*/
  /*  background-color: #b6b6b6;*/
  /*}*/
</style>
