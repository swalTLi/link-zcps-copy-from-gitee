<template>
  <div>
    <a-card>
      <div :class="advanced ? 'search' : null">
        <a-form layout="horizontal" @submit="handleSubmit">
          <div :class="advanced ? null : 'fold'">
            <a-row>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="院系部门"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-select placeholder="请选择">
                    <a-select-option value="1">计算机学院</a-select-option>
                    <a-select-option value="2">电子信息</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="姓名"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-input placeholder="请输入" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="工号"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-input-number style="width: 100%" placeholder="请输入" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <span style="float: right; margin-top: 3px">
            <a-button type="primary">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetFilter">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? "收起" : "展开" }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </span>
        </a-form>
      </div>
      <div>
        <a-space class="operator">
          <ImageButton @click="addNew" :src="svg_create" :text="'新建'" />
          <ImageButton :src="svg_excel_upload" @click="showModal" :text="'导入'" />
          <ImageButton :src="svg_excel_export" @click="exportExcel" :text="'导出'" />
        </a-space>
        <standard-table
          :columns="columns"
          :dataSource="dataSource"
          :selectedRows.sync="selectedRows"
          @clear="onClear"
          @change="onChange"
          @selectedRowChange="onSelectChange"
        >
          <div slot="description" slot-scope="{ text }">
            {{ text }}
          </div>
          <div slot="action" slot-scope="{ record }">
            <a style="margin-right: 8px"> <a-icon type="edit" />编辑 </a>
            <a @click="deleteRecord(record.key)"> <a-icon type="delete" />删除1 </a>
          </div>
          <template slot="statusTitle">
            <a-icon @click.native="onStatusTitleClick" type="info-circle" />
          </template>
        </standard-table>
      </div>
    </a-card>
    <!-- 上传excel导入框 -->
    <!-- <a-button type="primary" @click="showModal"> Open Modal </a-button> -->
    <div>
      <a-modal v-model="visible" title="excel导入" @ok="handleOk">
        <a-upload-dragger
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">{{ $t("upload_title") }}</p>
          <p class="ant-upload-hint">
            {{ $t("upload_info") }}
          </p>
        </a-upload-dragger>
      </a-modal>
    </div>
  </div>
</template>

<script>
import svg_excel_upload from "@/assets/svg/excel_upload.svg";
import svg_excel_export from "@/assets/svg/excel_export.svg";
import svg_create from "@/assets/svg/create.svg";
import StandardTable from "@/components/table/StandardTable";
import ImageButton from "@/components/imageBtn";
const columns = [
  {
    title: "序号",
    dataIndex: "key",
  },
  { 
    title: "要求序号",
    dataIndex: "index",
  },
  { 
    title: "所属业绩条件岗位",
    dataIndex: "position",
  },
  { 
    title: "要求分类",
    dataIndex: "def",
  },
  { 
    title: "要求内容",
    dataIndex: "content",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];
const dataSource = [
  {
    key: 1,
    index: 1,
    position: '副教授',
    def: '	教学型',
    content: '每年至少主讲一门及以上本科基础课或专业基础课，且年均完成的理论计划学时数不少于128学时或理论计划学时不少于80学时且本科教学工作量不少于400。'
  },
  {
    key: 2,
    index: 2,
    position: '副教授',
    def: '	教学型',
    content: '教学质量综合评价为优秀'
  },
  {
    key: 3,
    index: 3,
    position: '副教授',
    def: '	教学型',
    content: '公开发表2篇论文，其中在D级及以上期刊以第一作者公开发表教学改革或教育教学类研究论文1篇'
  },

];

export default {
  name: "AdminRequirement",
  components: { StandardTable, ImageButton },
  i18n: require("./i18n"),
  data() {
    return {
      // 过滤
      filterFrom: {},
      advanced: false,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      // 上传excel
      visible: false,
      // svg
      svg_excel_upload: svg_excel_upload,
      svg_excel_export: svg_excel_export,
      svg_create: svg_create,
    };
  },
  computed: {
    desc() {
      return this.$t("pageDesc");
    },
  },
  authorize: {
    deleteRecord: "delete",
  },
  mounted() {},
  methods: {
    methods: {
      // 检索表单
      handleSubmit() {},
      // 重置检索表单
      resetFilter() {},
      // 导出excel
      exportExcel() {},
      // 上传excel
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        console.log(e);
        this.visible = false;
      },
      handleChange(info) {
        const status = info.file.status;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          this.$message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          this.$message.error(`${info.file.name} file upload failed.`);
        }
      },
      deleteRecord(key) {
        console.log(key);
        this.dataSource = this.dataSource.filter((item) => item.key !== key);
        this.selectedRows = this.selectedRows.filter((item) => item.key !== key);
      },
      toggleAdvanced() {
        this.advanced = !this.advanced;
      },
      remove() {
        this.dataSource = this.dataSource.filter(
          (item) => this.selectedRows.findIndex((row) => row.key === item.key) === -1
        );
        this.selectedRows = [];
      },
      onClear() {
        this.$message.info("您清空了勾选的所有行");
      },
      onStatusTitleClick() {
        this.$message.info("你点击了状态栏表头");
      },
      onChange() {
        this.$message.info("表格状态改变了");
      },
      onSelectChange() {
        this.$message.info("选中行改变了");
      },
      addNew() {
        this.dataSource.unshift({
          key: this.dataSource.length,
          no: "NO " + this.dataSource.length,
          description: "这是一段描述",
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 4,
          updatedAt: "2018-07-26",
        });
      },
      handleMenuClick(e) {
        if (e.key === "delete") {
          this.remove();
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
