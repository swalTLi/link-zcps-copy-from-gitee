<template>
  <div>
    <a-card>
      <div :class="advanced ? 'search' : null">
        <a-form layout="horizontal">
          <div :class="advanced ? null : 'fold'">
            <a-row>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="院系部门"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-select placeholder="请选择" v-model="filterForm.college">
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
                  <a-input placeholder="请输入" v-model="filterForm.name" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="工号"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-input
                    style="width: 100%"
                    placeholder="请输入"
                    v-model="filterForm.code"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- <a-row v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="更新日期"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-date-picker style="width: 100%" placeholder="请输入更新日期" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="使用状态"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-select placeholder="请选择">
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="描述"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-input placeholder="请输入" />
                </a-form-item>
              </a-col>
            </a-row> -->
          </div>
          <span style="float: right; margin-top: 3px">
            <a-button type="primary" @click="handleSelect">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetObj(filterForm)"
              >重置</a-button
            >
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? "收起" : "展开" }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </span>
        </a-form>
      </div>
      <div>
        <a-space class="operator">
          <!-- <a-button @click="addNew" type="primary">新建</a-button> -->
          <!-- <div @click="showModal" :size="size" id="svg-btn">
            <img :src="excel_svg" alt="" width="20px" />
            导入
          </div> -->
          <ImageButton
            :src="svg_create"
            @click="
              () => {
                visible_table_edit = true;
                tableTitle = `创建教师`;
              }
            "
            :text="'新建'"
          />
          <ImageButton :src="svg_excel_upload" @click="showModal" :text="'导入'" />
          <ImageButton :src="svg_excel_export" @click="exportExcel" :text="'导出'" />
          <!-- <a-button icon="download" > 导出 </a-button> -->
          <!-- <a-button>批量操作</a-button> -->
          <!-- <a-dropdown>
            <a-menu @click="handleMenuClick" slot="overlay">
              <a-menu-item key="delete">删除</a-menu-item>
              <a-menu-item key="audit">审批</a-menu-item>
            </a-menu>
            <a-button> 更多操作 <a-icon type="down" /> </a-button>
          </a-dropdown> -->
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
            <!-- <a style="margin-right: 8px"> <a-icon type="plus" />新增 </a> -->
            <a
              style="margin-right: 8px"
              @click="
                () => {
                  visible_table_edit = true;
                  tableTitle = `编辑教师信息`;
                }
              "
            >
              <a-icon :component="svg_edit" /> 编辑
            </a>
            <a-popconfirm
              title="确认删除？"
              ok-text="删除"
              cancel-text="取消"
              @confirm="deleteRecord(record.key)"
            >
              <a-icon :component="svg_delete" /> 删除
            </a-popconfirm>
            <!-- <a @click="deleteRecord(record.key)" v-auth="`delete`">
              <a-icon type="delete" />删除2
            </a> -->
            <!-- <router-link :to="`/list/query/detail/${record.key}`">详情</router-link> -->
          </div>
          <template slot="statusTitle">
            <a-icon @click.native="onStatusTitleClick" type="info-circle" />123
          </template>
        </standard-table>
      </div>
    </a-card>

    <div>
      <!-- 上传excel导入框 -->
      <a-modal v-model="visible_upload_excel" title="excel导入" @ok="handleOk">
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

      <!-- table 编辑页 -->
      <a-modal
        v-model="visible_table_edit"
        width="800px"
        :title="tableTitle"
        @ok="onSubmitTable"
        @cancel="cancelTable"
        cancel-text="取消"
        ok-text="提交"
      >
        <a-form-model
          :model="EditForm"
          :label-col="labelCol"
          ref="EditForm"
          :rules="rules"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="Activity name" prop="name">
            <a-input v-model="EditForm.name" />
          </a-form-model-item>
          <a-form-model-item label="Activity zone" prop="region">
            <a-select v-model="EditForm.region" placeholder="please select your zone">
              <a-select-option value="shanghai"> Zone one </a-select-option>
              <a-select-option value="beijing"> Zone two </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="Activity time">
            <a-date-picker
              v-model="EditForm.date1"
              show-time
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </a-form-model-item>
          <a-form-model-item label="Instant delivery">
            <a-switch v-model="EditForm.delivery" />
          </a-form-model-item>
          <a-form-model-item label="Activity type">
            <a-checkbox-group v-model="EditForm.type">
              <a-checkbox value="1" name="type"> Online </a-checkbox>
              <a-checkbox value="2" name="type"> Promotion </a-checkbox>
              <a-checkbox value="3" name="type"> Offline </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <a-form-model-item label="Resources">
            <a-radio-group v-model="EditForm.resource">
              <a-radio value="1"> Sponsor </a-radio>
              <a-radio value="2"> Venue </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="Activity form" prop="desc">
            <a-input v-model="EditForm.desc" type="textarea" />
          </a-form-model-item>
          <!-- <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit"> Create </a-button>
            <a-button style="margin-left: 10px"> Cancel </a-button>
          </a-form-model-item> -->
        </a-form-model>
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
import { teacher } from "@/formRules";
const SVG_LIST = { svg_excel_upload, svg_excel_export, svg_create };
const columns = [
  {
    title: "教师编号",
    dataIndex: "key",
  },
  {
    title: "姓名",
    dataIndex: "name",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "工号",
    dataIndex: "no",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "所属院系",
    dataIndex: "Faculty",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "学历",
    dataIndex: "education",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "学位",
    dataIndex: "academic",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "职称",
    dataIndex: "title",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "毕业时间",
    dataIndex: "updatedAt",
    sorter: true,
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];
const dataSource = [];
for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i,
    no: "NO " + i,
    id: "id" + i,
    name: "教师" + i,
    Faculty: "第" + i + "学院",
    education: "博士",
    academic: "博士学位",
    title: "教授",
    description: "这是一段描述",
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: "2018-07-26",
  });
}
export default {
  name: "AdminTeacher",
  components: { StandardTable, ImageButton },
  i18n: require("./i18n"),
  data() {
    return {
      /**
       * table
       */
      rules: { ...teacher },
      tableTitle: "",
      visible_table_edit: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      EditForm: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      /**
       * 查询 过滤 检索 表单
       */
      filterForm: {
        college: "",
        name: "",
        code: "",
        link: [1, 2, 3],
        link2: { a: 1, b: 2 },
      },
      advanced: false,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      // 上传excel
      visible_upload_excel: false,
      // svg
      ...SVG_LIST,
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
  mounted() {
    console.log(this.rules);
  },
  methods: {
    // 工具函数
    /**
     * 重置object
     * 传入 {}
     * 自动重置
     */
    // 需要操作提示调用这个，不需要提示调用ergodic
    resetObj(obj) {
      this.ergodic(obj);
      const type = "success";
      const message = "重置表单成功！";
      this.$message[type](message).then(() => {});
    },
    // object 重置为 {}
    // Array  重置为 []
    // string 重置为 ""
    ergodic(obj) {
      for (let key in obj) {
        if (obj[key] instanceof Array) {
          obj[key] = [];
          this.ergodic(obj[key]);
        } else if (obj[key] instanceof Object) {
          this.ergodic(obj[key]);
        } else {
          obj[key] = "";
        }
      }
    },
    /**
     * Table
     */
    // 提交 编辑table 表单
    cancelTable() {
      this.$refs.EditForm.resetFields();
      // this.$refs["EditForm"].validate((valid) => {
      //   if (valid) {
      //     const type = "success";
      //     const message = "提交成功！";
      //     this.$message[type](message).then(() => {});
      //   } else {
      //     const type = "error";
      //     const message = "请将表单填写完整！";
      //     this.$message[type](message).then(() => {});
      //     return false;
      //   }
      // });
    },
    onSubmitTable() {
      this.$refs["EditForm"].validate((valid) => {
        if (valid) {
          const type = "success";
          const message = "修改成功！";
          this.$message[type](message).then(() => {});
          this.visible_table_edit = false;
        } else {
          const type = "error";
          const message = "请将表单填写完整！";
          this.$message[type](message).then(() => {});
          return false;
        }
      });
    },
    // 删除指定数据
    deleteRecord(key) {
      console.log(key);
      this.dataSource = this.dataSource.filter((item) => item.key !== key);
      this.selectedRows = this.selectedRows.filter((item) => item.key !== key);
    },
    // 表单操作
    // 查询表单操作
    handleSelect() {
      console.log(this.filterForm);
      const type = "success";
      const message = "查询成功！";
      this.$message[type](message).then(() => {});
    },
    // 导出excel
    exportExcel() {},
    // 上传excel
    showModal() {
      this.visible_upload_excel = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible_upload_excel = false;
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
      // this.$message.info("您清空了勾选的所有行");
    },
    onStatusTitleClick() {
      // this.$message.info("你点击了状态栏表头");
    },
    onChange() {
      // this.$message.info("表格状态改变了");
    },
    onSelectChange() {
      // this.$message.info("选中行改变了");
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
    getLabel(record, dataIndex) {
      let val = "";
      this.columns.find(_ => {
        if (_.dataIndex === dataIndex) {
          _["radios"].find(__ => {
            if (__.value === record[dataIndex]) {
              val = __.label;
            }
          });
        }
      });
      return val;
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
