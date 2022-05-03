<template>
  <a-modal
    :title="'条件选择'"
    :visible="visible_condition"
    :width="1000"
    :destroyOnClose="true"
    @cancel="handleCancel"
  >
    系列：
    <a-select
      v-model="form.xh"
      placeholder="请选择岗位"
      style="width:200px;"
      defaultValue="A1"
    >
      <a-select-option v-for="item in xh" :key="item" :value="item">
        {{ item }}
      </a-select-option>
    </a-select>
    <a-table
      :pagination="false"
      :columns="columns"
      :data-source="tableData"
      style="margin-top:20px;"
    >
      <div slot="action" slot-scope="record">
        <a style="margin-right: 8px" @click="opendetailmodal(record)">
          <a-icon type="info" />填报
        </a>
      </div>
    </a-table>
    <template slot="footer">
      <a-button key="back" @click="closeModal" size="large">
        返回
      </a-button>
      <a-button key="submit" type="primary" @click="closeModal" size="large">
        完成
      </a-button>
    </template>
    <MODAL1
      :visible_condition="modal1"
      :record="record"
      :num="1"
      @closeModal="modal1 = false"
    />
    <MODAL2
      :visible_condition="modal2"
      :record="record"
      :num="2"
      @closeModal="modal2 = false"
    />
    <MODAL3
      :visible_condition="modal3"
      :record="record"
      :num="3"
      @closeModal="modal3 = false"
    />
  </a-modal>
</template>

<script>
// import columns from './COLUMNS.js'
import MODAL1 from "./modal1.vue";
import MODAL2 from "./modal2.vue";
import MODAL3 from "./modal3.vue";
import XHR from "@/services/interface";
const tableData = [
  {
    key: "1",
    index: "1",
    content: "以第 1 申请人获批国家级教育教学改革项目（A 类）1 项；",
    num: 1,
  },
  {
    key: "2",
    index: "1",
    content:
      "以第 1 申请人获批国家级科研项目 1 项（不包括自然科学基金青年项目）；",
    num: 2,
  },
  {
    key: "3",
    index: "2",
    content: "获得国家级教育教学成果奖（我校的第 1 人）",
    num: 3,
  },
  {
    key: "4",
    index: "3",
    content:
      "理工类在影响因子为I区的SCI源期刊发表论文1篇或II区的SCI源期刊发表论文 3 篇；人文社会科学类在 SSCI、A&amp;HCI 源期刊发表论文 1 篇或被新华文摘全文转载 1 篇；",
    num: 1,
  },
  {
    key: "5",
    index: "3",
    content: "指导我校学生 1 名获省级优秀博（硕）士学位论文。",
    num: 2,
  },
  {
    key: "6",
    index: "4",
    content: "第 1 申请人获批省部级(B1)及以上项目 2 项；",
    num: 3,
  },
  {
    key: "7",
    index: "5",
    content: "作为第 1 负责人获批省部级及以上创新团队。",
    num: 1,
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
    width: 100,
    scopedSlots: { customRender: "action" },
  },
];
export default {
  name: "SingUp",
  i18n: require("./i18n"),
  props: ["visible_condition"],
  data() {
    return {
      form: {
        gzl: 1,
        desc: "text",
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
      modal1: false,
      modal2: false,
      modal3: false,
      record: undefined,
    };
  },
  components: { MODAL1, MODAL2, MODAL3 },
  computed: {
    desc() {
      return this.$t("pageDesc");
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      XHR.Axios_$$searchTeacherInputRankReviewList({
        page: 1,
        line: 1000,
        rankReviewId: this.$route.query.rankReviewId,
        performanceCriteriaId: this.$route.query.performanceCriteriaId,
      }).then(_ => {
        console.log(_.data.info.list);
      });
    },
    closeModal() {
      this.$emit("closeModal");
    },
    deleteRecord() {},
    opendetailmodal(record) {
      console.log(record.num);
      this.record = record;
      this[`modal${record.num}`] = true;
    },
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
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      this.closeModal();
    },
  },
};
</script>

<style scoped></style>
