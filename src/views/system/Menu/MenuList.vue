<template>
  <el-main>
    <el-form
      size="mini"
      :model="searchForm"
      ref="searchForm"
      label-width="80px"
    >
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input v-model="searchForm.name" placeholder="请输入菜单名"></el-input>
          </el-form-item>
        </el-col>
        <el-button
          size="mini"
          style="margin-left:20px;"
          icon="el-icon-search"
          type="primary"
          @click="searBtn"
        >搜索</el-button>
        <el-button size="mini" icon="el-icon-plus" type="primary" @click="addBtn">新增</el-button>
      </el-row>
    </el-form>

    <el-table
      :data="menuList"
      style="width: 100%;"
      row-key="id"
      :height="tableHeight"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="label" label="名称" sortable width="180"  align="center"></el-table-column>
      <el-table-column prop="icon" label="图标" sortable width="180"  align="center">
        <template slot-scope="scope">
          <i :class="scope.row.icon || ''"></i>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单URL" align="center"></el-table-column>
      <el-table-column prop="path" label="路由地址" align="center"></el-table-column>
      <el-table-column prop="code" label="权限标识" align="center"></el-table-column>
      <el-table-column prop="sort" label="序号" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editMenu(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增权限弹框 -->
    <el-dialog
      :title="addTitle"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :inline="true" size="mini" :model="addFrom"  :rules="addMenuValdate"  ref="addFrom" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="type">
              <el-radio-group v-model="addFrom.type">
                <el-radio :label="0">目录</el-radio>
                <el-radio :label="1">菜单</el-radio>
                <el-radio :label="2">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上级菜单" prop="parentId">
          <el-input v-model="addFrom.parentId"  @click.native="selectMenu"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="label">
          <el-input v-model="addFrom.label"></el-input>
        </el-form-item>
        <el-form-item v-if="addFrom.type != '2'" label="菜单图标" prop="icon">
          <el-input v-model="addFrom.icon"></el-input>
        </el-form-item>
        <el-form-item v-if="addFrom.type == '1'" label="路由名称" prop="name">
          <el-input v-model="addFrom.name"></el-input>
        </el-form-item>
        <el-form-item v-if="addFrom.type != '2'" label="路由地址" prop="path">
          <el-input v-model="addFrom.path"></el-input>
        </el-form-item>
        <el-form-item v-if="addFrom.type == '1'" label="组件路径" prop="url">
          <el-input v-model="addFrom.url"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="addFrom.code"></el-input>
        </el-form-item>
        <el-form-item label="显示序号" prop="sort">
          <el-input-number v-model="addFrom.sort"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addupdaMenu">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选择上级菜单树弹框 -->
    <el-dialog width="25%" :title="ParentTitle" :visible.sync="innerVisible" append-to-body>
      <tree :nodes="nodes" :setting="parentSetting"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>
<script>
  import tree from "vue-giant-tree";
  import {getMenuList,MenuList,addMenu,selectByid,updaMenu,delMenu} from '@/api/menu/Menu'
  export default {
    mounted () {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 230; //后面的50：根据需求空出的高度，自行调整
      });
    },
    created(){
      this.MenuList()
    },
    components:{
      tree
    },
    data () {
      return {
        addMenuValdate: {
          type: [{ required: true, trigger: "change", message: "请填选择类型" }],
          label: [
            { required: true, trigger: "change", message: "请填写权限名称" }
          ],
          parentName: [
            { required: true, trigger: "change", message: "请选择上级菜单" }
          ],
          name: [
            { required: true, trigger: "change", message: "请填写路由名称" }
          ],
          path: [
            { required: true, trigger: "change", message: "请填写路由地址" }
          ],
          url: [{ required: true, trigger: "change", message: "请填写组件路径" }],
          code: [{ required: true, trigger: "change", message: "请填写权限标识" }],
          sort: [{ required: true, trigger: "change", message: "请选择序列" }]
        },
        addFrom: {
          id: "", //编辑id
          label: "",
          name: "",
          type: 0,
          parentId: "",
          sort: "",
          parentName: "",
          path: "",
          code: "",
          icon: ""
        },
        innerVisible:false,
        editTag:null,
        ParentTitle:'',
        //控制上级部门弹框显示
        parentDialogVisible: false,
        //上级树陪
        parentZtreeObj: null,
        parentNodes: [], //上级部门树数据
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
        nodes: [],
        dialogVisible:false,
        addTitle:'',
        tableHeight:0,
        searchForm:{
          name:''
        },
        menuList: []
      }
    },
    methods:{
      editMenu(menu){
        this.editTag=1
        this.addTitle = "编辑菜单";
        this.dialogVisible = true;
        this.selectbymenuId(menu.id)
      },
      handleDelete(menuId){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMenu(menuId.id).then(response=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.MenuList()
          })
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          });
        });
      },
      selectbymenuId(menuId){
        selectByid(menuId).then(response=>{
          this.addFrom=response.data.Menu
        })
      },
      addBtn(){
        this.addTitle = "新增菜单";
        this.dialogVisible = true;
        this.resetForm("addFrom");
        this.menu()
      },
      searBtn(){

      },
      resetForm(formName) {
        if (this.$refs[formName]) {
          this.$refs[formName].resetFields();
        }
      },
      MenuList(){
        getMenuList().then(response=>{
          this.menuList=response.data.list
        })
      },
      selectMenu(){
        this.ParentTitle="上级菜单"
        this.innerVisible=true
      },
      updaMenu(){
        this.$refs.addFrom.validate(valid=>{
          if(valid){
            updaMenu(this.addFrom).then(response=>{
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.MenuList()
            })
            this.dialogVisible=false
          }
        })
      },
      addupdaMenu(){
        if(this.editTag){
          this.updaMenu()
        }else{
          this.addComit()
        }
      },
      addComit(){
        this.$refs.addFrom.validate(valid=>{
          if(valid){
            addMenu(this.addFrom).then(response=>{
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.MenuList()
            })
            this.dialogVisible=false
          }
        })
      },
      menu(){
        MenuList().then(response=>{
         this.nodes=response.data.menus
        })
      },
      ztreeParentOnClick(evt, treeId, treeNode){
        this.addFrom.parentName = treeNode.name;
        this.addFrom.parentId = treeNode.id;
      }
    },
  }
</script>
