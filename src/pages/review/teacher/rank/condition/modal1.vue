<template>
  <a-modal
    :title="'业绩条件填写-科研'"
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
      <a-form-model-item label="科研数据拉取" prop="gzl">
        <h4>科研项目</h4>
      </a-form-model-item>
      <a-form-model-item label="科研项目" prop="gzl">
        <a-select
          v-model="form.kyxm"
          placeholder="请选择科研项目"
          @change="addData"
        >
          <a-select-option
            v-for="item in kyxm"
            :key="item.key"
            :value="item.name"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-table
        :pagination="false"
        :columns="columns"
        :data-source="tableData"
        style="margin-top:20px;"
      >
        <template slot="title">
          科研信息
        </template>
        <div slot="index" slot-scope="$index">
          <span>{{ $index }}</span>
        </div>
        <div slot="action" slot-scope="record">
          <a style="margin-right: 8px" @click="delData(record)">
            <a-icon type="info" />移除
          </a>
        </div>
      </a-table>
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
    key: 1,
    index: "1",
    name: "某某项目",
    fenlei: "科技类",
    type: "横向",
    money: "135.5",
    from: "中国航发哈尔滨...",
    code: "A1506574CH",
    jibie: "A1",
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
    title: "项目名称",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "学科分类",
    dataIndex: "fenlei",
    key: "fenlei",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "项目类型",
    dataIndex: "type",
    key: "type",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "项目经费",
    dataIndex: "money",
    key: "money",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "项目来源",
    dataIndex: "from",
    key: "from",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "项目编号",
    dataIndex: "code",
    key: "code",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "项目级别",
    dataIndex: "jibie",
    key: "jibie",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "操作",
    key: "operation",
    width: 100,
    scopedSlots: { customRender: "action" },
  },
];
const kyxm = [
  {
    key: 1,
    index: "1",
    name: "科研项目1",
    fenlei: "科技类",
    type: "横向",
    money: "135.5",
    from: "中国航发哈尔滨...",
    code: "A1506574CH",
    jibie: "A1",
  },
  {
    key: 2,
    index: "2",
    name: "科研项目2",
    fenlei: "科技类",
    type: "横向",
    money: "1325.5",
    from: "中国航发哈尔滨...",
    code: "A1506asd574CH",
    jibie: "A3",
  },
  {
    key: 3,
    index: "3",
    name: "科研项目3",
    fenlei: "科技类",
    type: "横向",
    money: "15.5",
    from: "中国航发哈尔滨...",
    code: "A150as6asd574CH",
    jibie: "A7",
  },
  {
    key: 4,
    index: "4",
    name: "科研项目4",
    fenlei: "科技类",
    type: "横向",
    money: "115.5",
    from: "中国航发哈尔滨...",
    code: "B150as6asd574CH",
    jibie: "A5",
  },
];
export default {
  name: "SingUp",
  i18n: require("./i18n"),
  props: ["visible_condition", "num", "record"],
  data() {
    return {
      kyxm,
      form: {
        gzl: "A5",
        desc: "1",
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
    addData(e) {
      console.log(e);
      this.kyxm.forEach(_ => {
        if (_.name == e) {
          this.tableData.push(_);
        }
      });
    },
    delData(val) {
      this.kyxm.find((item, index) => {
        if (item.index == val.index) {
          console.log(item.index, val.index, index);
          this.tableData.splice(index - 1, 1);
          console.log(this.tableData);
          return 1;
        }
      });
    },
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
