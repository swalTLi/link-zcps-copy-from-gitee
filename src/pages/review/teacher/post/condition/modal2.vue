<template>
  <a-modal
    :title="'业绩条件填写-杂项'"
    :visible="visible_condition"
    :width="1000"
    :destroyOnClose="true"
    @cancel="handleCancel"
  >
    <a-form-model
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      ref="ruleForm"
    >
      <a-form-model-item label="业绩条件序号" prop="gzl">
        <h4>{{ form.gzl }}</h4>
      </a-form-model-item>
      <a-form-model-item label="具体要求序号" prop="gzl">
        <h4>{{ form.desc }}</h4>
      </a-form-model-item>
      <a-form-model-item label="具体要求" prop="gzl">
        <h4>{{ form.yaoqiu }}</h4>
      </a-form-model-item>
      <a-form-model-item label="描述" prop="gzl">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="附件">
        <a-upload-dragger
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">
            单击或拖动文件到此区域以上载
          </p>
          <p class="ant-upload-hint">
            只允许上传一个文件, 仅支持 .pdf .doc .docx格式
          </p>
        </a-upload-dragger>
      </a-form-model-item>
      <a-form-model-item
        :wrapper-col="{ span: 10, offset: 14 }"
        style="height:50px;"
      >
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button key="back" @click="closeModal">
        取消
      </a-button>
      <a-button key="submit" type="primary" @click="baocun">
        保存
      </a-button>
    </template>
  </a-modal>
</template>

<script>
const tableData = [
  {
    index: "1",
    content: "以第 1 申请人获批国家级教育教学改革项目（A 类）1 项；",
  },
  {
    index: "1",
    content:
      "以第 1 申请人获批国家级科研项目 1 项（不包括自然科学基金青年项目）；",
  },
  {
    index: "2",
    content: "获得国家级教育教学成果奖（我校的第 1 人）",
  },
  {
    index: "3",
    content:
      "理工类在影响因子为I区的SCI源期刊发表论文1篇或II区的SCI源期刊发表论文 3 篇；人文社会科学类在 SSCI、A&amp;HCI 源期刊发表论文 1 篇或被新华文摘全文转载 1 篇；",
  },
  {
    index: "3",
    content: "指导我校学生 1 名获省级优秀博（硕）士学位论文。",
  },
  {
    index: "4",
    content: "第 1 申请人获批省部级(B1)及以上项目 2 项；",
  },
  {
    index: "5",
    content: "作为第 1 负责人获批省部级及以上创新团队。",
  },
];
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    scopedSlots: { customRender: "description" },
    width: 100,
  },
  {
    title: "目标要求",
    dataIndex: "content",
    key: "content",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  name: "SingUp",
  i18n: require("./i18n"),
  props: ["visible_condition", "num", "record"],
  data() {
    return {
      form: {
        gzl: "A8",
        desc: "3",
        yaoqiu:
          "第 1 带头人完成校企联盟等服务地方经济项目并取得省级厅、委 办局认定的成果。",
        pdf: "",
        xh: "",
      },
      columns,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      xh: ["A1", "A2", "A3", "A4", "A5"],
      gw: ["校聘专业技术岗位"],
      xl: ["专任教师", "非专任教师"],
      dj: ["三级", "四级", "五级", "六级", "七级"],
      rules: {
        gzl: [{ required: true, message: "请输入工作量", trigger: "blur" }],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }],
        pdf: [{ required: true, message: "请填写描述", trigger: "blur" }],
      },
      tableData,
      current: 1,
      is_ok: false,
      is_upload: false,
    };
  },
  computed: {
    desc() {
      return this.$t("pageDesc");
    },
  },
  mounted() {
    // this.form = { ...this.record };
    console.log(this.num);
  },
  methods: {
    baocun() {
      this.$message.success(`保存成功！`);
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal");
    },
    deleteRecord() {},
    opendetailmodal() {},
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.is_upload) {
            console.log(this.form);
            this.is_ok = true;
          } else {
            this.$message.error(`请上传附件！！`);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(info) {
      const state = info.file.state;
      if (state !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (state === "done") {
        this.is_upload = true;
        this.$message.success(`${info.file.name} 文件上传成功.`);
        this.form.pdf = info.file.name;
      } else if (state === "error") {
        this.$message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    handleCancel() {
      this.closeModal();
    },
  },
};
</script>

<style scoped></style>
