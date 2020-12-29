<template>
  <el-container>
    <el-aside width="200px" style="border-right: 1px solid #d2d6de;border-left:none; margin-top: 5px">
      <div style="padding-left:5px;">
        <i class="el-icon-menu"></i>
        <span style="padding-left:3px;">部门</span>
      </div>
      <tree
        style="padding-left: 5px;padding-top: 10px;"
        :nodes="nodes"
        :setting="setting"
        @onCreated="handleCreated"
      />
    </el-aside>
    <el-main>
      <el-form size="mini" :model="searchForm" ref="form" label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="名称">
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="电话">
              <el-input v-model="searchForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-button style="margin-left:20px;" size="mini" type="primary" icon="el-icon-search" @click="query">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="addDept">新增</el-button>
        </el-row>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" border style="width: 100%">
        <el-table-column prop="id" label="部门编号"></el-table-column>
        <el-table-column prop="name" label="部门名称"></el-table-column>
        <el-table-column prop="deptCode" label="部门编码"></el-table-column>
        <el-table-column prop="deptAddress" label="部门地址"></el-table-column>
        <el-table-column prop="deptPhone" label="部门电话"></el-table-column>
        <el-table-column prop="orderNum" label="部门序号"></el-table-column>
        <el-table-column label="操作" width="170" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      <!--新增部门弹框-->
      <el-dialog :title="deptDialogTitle" :visible.sync="dialogVisible" width="30%">
        <el-form :rules="rules"  size="mini" :model="addForm" ref="addDepartment"  label-width="80px">
          <el-form-item label="上级部门" prop="parentName">
            <el-input v-model="addForm.parentName" @click.native="selectDept"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门编码">
            <el-input v-model="addForm.deptCode"></el-input>
          </el-form-item>
          <el-form-item label="部门电话">
            <el-input v-model="addForm.deptPhone"></el-input>
          </el-form-item>
          <el-form-item label="部门地址">
            <el-input v-model="addForm.deptAddress"></el-input>
          </el-form-item>
          <el-form-item label="序号">
            <el-input-number v-model="addForm.orderNum" placeholder></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAll">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog
        :title="deptTitle"
        :visible.sync="Visible"
        width="30%">
        <tree @onCreated='parentCreated' :nodes="parentNodes" :setting="parentSeeting"></tree>
        <span slot="footer" class="dialog-footer">
    <el-button @click="Visible = false">取 消</el-button>
    <el-button type="primary" @click="Visible = false">确 定</el-button>
  </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
  import tree from "vue-giant-tree"
  import {getDeptList,adddept,getInfo,updadept,deldept,dept,getLeftTree} from "@/api/dept/Dept"
  export default {
    created(){
      this.getdeptTree()
      this.getList()
    },
    components:{
      tree
    },
    //计算表格高度
    mounted () {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 230; //后面的50：根据需求空出的高度，自行调整
      });
    },
    data () {
      return {
        rules:{
          parentName:[{
            required:true,
            trigger:"change",
            message:"请选择上级部门"
          }],
          name:[{
            required:true,
            trigger:"change",
            message:"请输入部门名称"
          }]
        },
        parentZtreeObj: null,
        parentNodes: [],
        Visible:false,
        ztreeObj: null,
        parentSeeting: {
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
        parentNodes :[],
        ztreeObj: null,
        setting: {
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
        total:0,
        editTag:null,
        nodes: [],
        deptDialogTitle:'',
        deptTitle:'',
        tableHeight:0,
        //当前页树
        currentPage: 1,
        //表格高度
        tableHeight: 0,
        //搜索数据绑定
        searchForm: {
          name: "",
          iphone: "",
          pid:"",
          current:1,
          size:3
        },
        dialogVisible:false,
        addForm: {
          id: "",
          pid: "",
          parentName: "",
          name: "",
          deptCode: "",
          deptPhone: "",
          deptAddress: "",
          orderNum: ""
        },
        tableData: []
      };
    },
    methods: {
      getList(){
        getDeptList(this.searchForm).then(response=>{
          this.tableData=response.data.list.records
          this.searchForm.current=response.data.list.current
          this.searchForm.size=response.data.list.size
          this.total=response.data.list.total
        })
      },
      getdeptTree(){
        getLeftTree().then(response=>{
          this.nodes=response.data.deptList
        })
      },
      handleEdit(index,row){
        this.deptDialogTitle="编辑部门"
        this.editTag=1
        this.dialogVisible=true;
        this.deptinfo(row.id)
      },
      deptinfo(deptId){
        getInfo(deptId).then(response=>{
          this.addForm=response.data.dept
        })
      },
      updadept(){
        const  _this=this;
        this.$refs.addDepartment.validate(valid=>{
          if(valid){
            updadept(this.addForm).then(response=>{
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.getList()
              this.getdeptTree()
            })
            _this.dialogVisible=false
          }
        })
      },
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deldept(row.id).then(response=>{
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
      confirmAll(){
        if(this.editTag){
          this.updadept()
        }else{
          this.AddDepartment()
        }
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        this.searchForm.current=val
        this.getList();
        console.log(`当前页: ${val}`);
      },
      handleCreated(treeObj){
        console.log(treeObj)
        this.ztreeObj=treeObj;
        treeObj.expandAll(true)
        let firstTree = this.ztreeObj.getNodes()[0];
        this.ztreeObj.selectNode(firstTree);
        if (firstTree) {
          //此处需要判断，否则会报错
           this.setting.callback.onClick(null, firstTree.id, firstTree);
          }
        },
      ztreeOnClick(evt,treeId,treeNode){
        this.searchForm.pid=treeNode.id
        this.getList();
      },
      addDept() {
        this.resetForm('addDepartment')
        this.deptDialogTitle = '新增部门';
        this.dialogVisible = true;
      },
      query(){
        this.getList()
      },
      ztreeParentOnClick(evt,treeId,treeNode){
        console.log(treeNode)
        this.addForm.parentName=treeNode.name
        this.addForm.pid=treeNode.id
      },
      selectDept(){
        dept().then(response=>{
          this.parentNodes=response.data.depts
        })
        this.deptTitle='选择上级部门';
        this.Visible=true
      },
      parentCreated(treeObj){
        this.parentZtreeObj=treeObj;
        treeObj.expandAll(true)
      },
      AddDepartment(){
        const  _this=this;
        this.$refs.addDepartment.validate(valid=>{
          if(valid){
            console.log(this.addForm)
            adddept(this.addForm).then(response=>{
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.getList()
              this.getdeptTree()
            })
            // this.addForm=[]
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
  .el-dialog__wrapper /deep/ .el-dialog__body {
    padding-top: 15px !important;
  }
</style>
