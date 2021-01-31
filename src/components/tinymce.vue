<template>
  <div class="tinymce-editor">
    <Editor
      :id="editorId"
      v-model="editorValue"
      :init="editorInit"
    />
  </div>
</template>

<script>
  // 引入组件
  import tinymce from 'tinymce/tinymce';
  import Editor from '@tinymce/tinymce-vue';
  import 'tinymce/icons/default/icons';
  import 'tinymce/themes/silver';
  // 引入富文本编辑器主题的js和css
  import 'tinymce/themes/silver/theme.min';
  import 'tinymce/skins/ui/oxide/skin.min.css';
  // 扩展插件
  //这下面是tinymce的插件
  import 'tinymce/plugins/advlist'  //高级列表
  import 'tinymce/plugins/anchor'  //锚点
  import 'tinymce/plugins/autolink'  //自动链接
  import 'tinymce/plugins/autoresize'  //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
  import 'tinymce/plugins/autosave'  //自动存稿
  import 'tinymce/plugins/charmap'  //特殊字符
  import 'tinymce/plugins/code'  //编辑源码
  import 'tinymce/plugins/codesample'  //代码示例
  import 'tinymce/plugins/directionality'  //文字方向
  import 'tinymce/plugins/emoticons'  //表情
  import 'tinymce/plugins/fullpage'  //文档属性
  import 'tinymce/plugins/fullscreen'  //全屏
  import 'tinymce/plugins/help'  //帮助
  import 'tinymce/plugins/hr'  //水平分割线
  import 'tinymce/plugins/image'  //插入编辑图片
  import 'tinymce/plugins/importcss'  //引入css
  import 'tinymce/plugins/insertdatetime'  //插入日期时间
  import 'tinymce/plugins/link'  //超链接
  import 'tinymce/plugins/lists' //列表插件
  import 'tinymce/plugins/media' //插入编辑媒体
  import 'tinymce/plugins/nonbreaking' //插入不间断空格
  import 'tinymce/plugins/pagebreak' //插入分页符
  import 'tinymce/plugins/paste' //粘贴插件
  import 'tinymce/plugins/preview'//预览
  import 'tinymce/plugins/print'//打印
  import 'tinymce/plugins/quickbars'  //快速工具栏
  import 'tinymce/plugins/save'  //保存
  import 'tinymce/plugins/searchreplace'  //查找替换
  // import 'tinymce/plugins/spellchecker'  //拼写检查，暂未加入汉化，不建议使用
  import 'tinymce/plugins/tabfocus'  //切入切出，按tab键切出编辑器，切入页面其他输入框中
  import 'tinymce/plugins/table'  //表格
  import 'tinymce/plugins/template'  //内容模板
  import 'tinymce/plugins/textcolor'  //文字颜色
  import 'tinymce/plugins/textpattern'  //快速排版
  import 'tinymce/plugins/toc'  //目录生成器
  import 'tinymce/plugins/visualblocks'  //显示元素范围
  import 'tinymce/plugins/visualchars'  //显示不可见字符
  import 'tinymce/plugins/wordcount'  //字数统计
  import '@/assets/tinymce/zh_CN.js'
  export default {
    name: 'TinymceEditor',
    components: {Editor},
    props: {
      height: {
        type: Number,
        default: 500
      },
      id: {
        type: String,
        default: 'tinymceEditor'
      },
      value: {
        type: String,
        default: ''
      },
      plugins: {
        type: [String, Array],
        default: 'link lists image code table wordcount media fullscreen preview paste contextmenu textcolor'
      },
      toolbar: {
        type: [String, Array],
        default: 'fontselect | bold italic underline strikethrough | link unlink image | undo redo | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | code | removeformat'
      }
    },
    data() {
      return {
        editorInit: {
          language: 'zh_CN',
          height: this.height,
          content_style: '* { padding:0; margin:0; } img {max-width:100% !important }',
          plugin_preview_width: 375, // 预览宽度
          plugin_preview_height: 668,
          lineheight_val: "1 1.1 1.2 1.3 1.35 1.4 1.5 1.55 1.6 1.75 1.8 1.9 1.95 2 2.1 2.2 2.3 2.4 2.5 2.6 2.7 2.8 3 3.1 3.2 3.3 3.4 4 5",
          fontsize_formats: "8pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 24pt 36pt",
          font_formats:"微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
          plugins: this.plugins,
          powerpaste_word_import: 'merge',
          toolbar: this.toolbar,
          paste_data_images: true,
          statusbar: true, // 底部的状态栏
          menubar: true, // 最上方的菜单
          branding: false, // 水印“Powered by TinyMCE”
          images_upload_handler: (blobInfo, success, failure) => {
            this.$emit('handleImgUpload', blobInfo, success, failure);
          }
        },
        editorId: this.id,
        newValue: ''
      };
    },
    watch: {
      newValue(newValue) {
        this.$emit('input', newValue);
      }
    },
    mounted() {
      tinymce.init({});
      console.log(this.editorInit)
    },
    computed: {
      editorValue: {
        get() {
          return this.value;
        },
        set(val) {
          this.newValue = val;
        }
      }
    },
    methods: {
      clear() {
        this.editorValue = '';
      }
    }
  };
</script>
