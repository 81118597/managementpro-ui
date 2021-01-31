<template>
  <div style="padding: 50px ">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="产品id" prop="SecondaryDirectory">
        <el-col :span="6">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="二级目录" prop="SecondaryDirectory">
        <el-col :span="6">
        <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="选择地区" prop="region">
        <el-select v-model="ruleForm.region" placeholder="选择地区" style="width: 288px">
          <el-option label="深圳" value="深圳"></el-option>
          <el-option label="台湾" value="台湾"></el-option>
          <el-option label="香港" value="香港"></el-option>
          <el-option label="日本" value="日本"></el-option>
          <el-option label="美国" value="美国"></el-option>
          <el-option label="新加坡" value="新加坡"></el-option>
          <el-option label="越南" value="越南"></el-option>
          <el-option label="泰国" value="泰国"></el-option>
          <el-option label="加拿大" value="加拿大"></el-option>
          <el-option label="澳门" value="澳门"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择语言" prop="region">
        <el-select v-model="ruleForm.region" placeholder="选择语言" style="width: 288px">
          <el-option label="繁体中文" value="繁体中文"></el-option>
          <el-option label="英语" value="英语"></el-option>
          <el-option label="简体中文" value="简体中文"></el-option>
          <el-option label="日语" value="日语"></el-option>
          <el-option label="阿拉伯语" value="阿拉伯语"></el-option>
          <el-option label="越南语" value="越南语"></el-option>
          <el-option label="泰语" value="泰语"></el-option>
          <el-option label="俄语" value="俄语"></el-option>
          <el-option label="印尼语" value="印尼语"></el-option>
          <el-option label="马来中文" value="马来中文"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="产品外文名称" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="seo标题" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="seo标题" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="seo描述" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="价格" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="原价" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="折扣" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="标签" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="支付方式" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="paypal" name="type"></el-checkbox>
          <el-checkbox label="SecurityPay" name="type"></el-checkbox>
          <el-checkbox label="货到付款" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="销量" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="库存" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="联系邮箱" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="pop800 id" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="收缩图" prop="SecondaryDirectory">
        <el-col :span="20">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="图集" prop="SecondaryDirectory">
        <el-col :span="20">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </el-col>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple">属性组id</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">属性组</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">属性名称</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">属性价格</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">产品属性id</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">操作</div></el-col>
      </el-row>
      <el-form-item  prop="SecondaryDirectory" label-width="0" v-for="(domain,index) in ruleForm.domains"
      :key="domain.key">
        <el-row :gutter="20">
          <el-col :span="4"><el-input v-model="domain.attributeId" :disabled="true"></el-input></el-col>
          <el-col :span="4"><el-input v-model="domain.AttributeGroup"></el-input></el-col>
          <el-col :span="4"><el-input v-model="domain.attributeName"></el-input></el-col>
          <el-col :span="4"><el-input v-model="domain.price"></el-input></el-col>
          <el-col :span="4"><el-input v-model="domain.price"></el-input></el-col>
          <el-col :span="4"><el-button type="success"  @click="dialogVisible = true">附件</el-button><el-button type="danger"  @click.prevent="removeDomain(domain)">删除属性</el-button></el-col>
        </el-row>
      </el-form-item>
      <el-row :gutter="20">
      <el-button type="primary" @click="addDomain">添加属性</el-button>
      </el-row>
      <el-form-item label="套餐" prop="desc" v-for="(pack,index) in ruleForm.package"
                    :key="index">
        <div style="border: #d3dce6 solid;padding-bottom: 60px">

          <el-form-item  prop="SecondaryDirectory" label-width="0">
            <el-form-item label="套餐名称" prop="SecondaryDirectory" style="margin-top: 30px">
              <el-col :span="8">
                <el-input v-model="ruleForm.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="价格" prop="SecondaryDirectory" style="margin-top: 30px">
              <el-col :span="8">
                <el-input v-model="ruleForm.price"></el-input>
              </el-col>
              <el-col :span="15">
                <el-button type="danger" @click="delpackage(pack)" style="float: right">删除属性</el-button>
              </el-col>
            </el-form-item>
          </el-form-item>
            <el-form-item prop="SecondaryDirectory" style="margin-top: 20px" v-for="(packpro,index) in ruleForm.packageproduct"
                          :key="index">
            <el-row :gutter="20">
              <el-col :span="5"><div class="grid-content bg-purple">产品名称</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">产品外文名称</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">产品数量</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">产品id</div></el-col>
              <el-col :span="7"><div class="grid-content bg-purple">操作</div></el-col>
            </el-row>
              <el-row :gutter="20">
                <el-col :span="5"><el-input v-model="ruleForm.name"></el-input></el-col>
                <el-col :span="4"><el-input v-model="ruleForm.products"></el-input></el-col>
                <el-col :span="4"><el-input v-model="ruleForm.number"></el-input></el-col>
                <el-col :span="4"><el-input v-model="ruleForm.packageId" :disabled="true"></el-input></el-col>
                <el-col :span="7"><el-button type="success" @click.prevent="addpackageproduct">添加产品</el-button>
                  <el-button type="danger"  @click.prevent="removepackageproduct(packpro)">删除产品</el-button>
                  <el-button type="primary">选择产品</el-button>
                </el-col>
              </el-row>
          </el-form-item>
        </div>
      </el-form-item>
      <el-row :gutter="20">
        <el-button type="primary" @click="addpackage">添加套餐</el-button>
      </el-row>
      <el-form-item label="FB通用像素id" prop="SecondaryDirectory">
        <el-col :span="20">
          <el-input v-model="ruleForm.SecondaryDirectory"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="内容" prop="SecondaryDirectory">
        <el-col :span="20">
          <tinymce
            id="editor"
            ref="editor"
            v-model="content"
            :height="realHeight"
            @handleImgUpload="imgUpload"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import tinymce from '@/components/tinymce'
  export default {
    components:{
      tinymce
    },
    computed:{
      realHeight() {
        return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 200
      }
    },
    data() {
      return {
        value: '', //富文本的内容
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',

          domains:[{
            attributeId:'',
            AttributeGroup:'',
            attributeName:'',
            price:'',
            picture:'',
            productId:''
          }],
          package:[{
            name:'',
            price:'',
            picture:'',
          }],
          packageproduct:[{
            name:'',
            products:'',
            number:'',
            packageId:''
          }]
          //--------------------
        },
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        dialogVisible: false,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      async imgUpload(blobInfo, success, failure) {
        const formData = new FormData();
        formData.append('file', blobInfo.blob());
        try {
          const res = await uploadFile(formData);
          success(this.server + res);
          console.log(this.server + res);
        } catch (e) {
          console.log(e);
          failure('上传失败:' + e);
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addDomain(){
        this.ruleForm.domains.push({
          attributeId:'',
          AttributeGroup:'',
          attributeName:'',
          price:'',
          picture:'',
          productId:'',
          key: Date.now()
        });
      },
      addpackageproduct(){
        this.ruleForm.packageproduct.push({
          value: '',
          key: Date.now()
        });
      },
      addpackage(){
        this.ruleForm.package.push({
          value: '',
          key: Date.now()
        });
      },

      removepackageproduct(item){
        var index = this.ruleForm.packageproduct.indexOf(item)
        if (index !== -1) {
          this.ruleForm.packageproduct.splice(index, 1)
        }
      },
      delpackage(item){
        var index = this.ruleForm.package.indexOf(item)
        if (index !== -1) {
          this.ruleForm.package.splice(index, 1)
        }
      },
      removeDomain(item){
        var index = this.ruleForm.domains.indexOf(item)
        if (index !== -1) {
          this.ruleForm.domains.splice(index, 1)
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleClose(done) {
            done();
      },
    }
  }
</script>
<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
    text-align: center;
    line-height: 33px;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
