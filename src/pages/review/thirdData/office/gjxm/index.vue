<template>
  <div>
    <a-card>
      <div :class="advanced ? 'search' : null">
        <a-form layout="horizontal">
          <div :class="advanced ? null : 'fold'">
            <a-row>
              <a-col :md="8" :sm="24">
                <a-form-item
                  label="模糊搜索"
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18, offset: 1 }"
                >
                  <a-input
                    @pressEnter="handleSelect"
                    placeholder="输入关键词"
                    v-model="filterForm.keyWord.name"
                  />
                </a-form-item>
              </a-col>
              <!-- <a-col :md="8" :sm="24">
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
              </a-col> -->
              <!-- <a-col :md="8" :sm="24">
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
              </a-col> -->
            </a-row>
          </div>
          <span style="float: right; margin-top: 3px">
            <a-button type="primary" @click="handleSelect">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetObj()"
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
        <div style="display: flex;justify-content: space-between;">
          <a-space class="operator" align="baseline">
            <ImageButton
              :src="svg_create"
              @click="opendetailmodal('Add', {})"
              :text="'添加'"
            />
            <ImageButton
              :src="svg_excel_upload"
              @click="showModal"
              :text="'导入'"
            />
            <!-- <ImageButton
              :src="svg_excel_export"
              @click="exportExcel"
              :text="'导出'"
            /> -->
          </a-space>
          <!-- <a-pagination
            style="right:0px;"
            v-model="pagination.current"
            show-size-changer
            :page-size.sync="pagination.pageSize"
            :total="pagination.lineCount"
            @showSizeChange="onShowSizeChange"
            :page-size-options="pagination.options"
            :defaultPageSize="pagination.pageSize"
            :position="'both'"
          /> -->
        </div>
        <standard-table
          :columns="columns"
          :dataSource="dataSource"
          :selectedRows.sync="selectedRows"
          @clear="onClear"
          @change="onChange"
          rowKey="id"
          :loading="pagination.loading"
          @selectedRowChange="onSelectChange"
          size="small"
        >
          <div slot="index" slot-scope="{ index }">
            {{ index + 1 }}
          </div>
          <div slot="allowLogin" slot-scope="record">
            <a-tag
              :color="
                record.record['allowLogin'] === 0
                  ? 'red'
                  : record.record['allowLogin'] === 1
                  ? 'green'
                  : 'grey'
              "
            >
              {{ getLabel(record.record, "allowLogin") }}
            </a-tag>
          </div>
          <div slot="action" slot-scope="{ record, index }">
            <a
              style="margin-right: 8px"
              @click="opendetailmodal('Info', record, index)"
            >
              <a-icon :component="svg_details" /> 详情
            </a>
            <a
              style="margin-right: 8px"
              @click="opendetailmodal('Edit', record, index)"
            >
              <a-icon :component="svg_edit" /> 编辑
            </a>
            <a-popconfirm
              title="确认删除？"
              ok-text="删除"
              cancel-text="取消"
              @confirm="deleteRecord(record)"
            >
              <a> <a-icon :component="svg_delete" /> 删除 </a>
            </a-popconfirm>
          </div>
          <template slot="statusTitle">
            <a-icon @click.native="onStatusTitleClick" type="info-circle" />
          </template>
        </standard-table>
        <div
          style="display: flex;justify-content: space-between;margin-top: 20px;"
        >
          <div></div>
          <a-pagination
            style="right:0px;"
            v-model="pagination.current"
            show-size-changer
            :page-size.sync="pagination.pageSize"
            :total="pagination.lineCount"
            @showSizeChange="onShowSizeChange"
            :page-size-options="pagination.options"
            :defaultPageSize="pagination.pageSize"
            :position="'both'"
          />
        </div>
      </div>
    </a-card>

    <div>
      <!-- 编辑框 -->
      <div v-if="detail_model_data.visible">
        <detail-model
          ref="DetailModel"
          :visible="detail_model_data.visible"
          :type="detail_model_data.type"
          :title="detail_model_data.tableTitle"
          :columns="detail_model_data.columns"
          :width="detail_model_data.width"
          :record="detail_model_data.record"
          :userType="detail_model_data.userType"
          @handleDetailModelSubmit="handleDetailModelSubmit"
          @getList="getList()"
          @closemodel="detail_model_data.visible = false"
          :listIndex="detail_model_data.listIndex"
        />
      </div>
      <!-- 上传excel导入框 -->
      <a-modal v-model="visible_upload_excel" title="excel导入" @ok="handleOk">
        <div class="clearfix">
          <a-upload
            v-if="visible_upload_excel"
            :file-list="fileList"
            :remove="handleRemove"
            :before-upload="beforeUpload"
          >
            <a-button> <a-icon type="upload" /> Select File </a-button>
          </a-upload>
        </div>
        <template slot="footer">
          <a-button key="back" @click="visible_upload_excel = false">
            取消
          </a-button>
          <a-button
            type="primary"
            :disabled="fileList.length === 0"
            :loading="uploading"
            style="margin-top: 16px"
            @click="handleUpload"
          >
            {{ uploading ? "上传中..." : "开始上传" }}
          </a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script>
import StandardTable from "@/components/table/StandardTable";
// 规则验证
import { teacher } from "@/formRules";
import XHR from "@/services/interface";
// svg组件
import svg_excel_upload from "@/assets/svg/excel_upload.svg";
import svg_excel_export from "@/assets/svg/excel_export.svg";
import svg_create from "@/assets/svg/create.svg";
import svg_registration from "@/assets/svg/Registration.svg";
import svg_delete from "@/assets/svg/delete.svg";
import svg_user from "@/assets/svg/user.svg";
import svg_details from "@/assets/svg/details.svg";
import svg_edit from "@/assets/svg/edit.svg";
import svg_condition from "@/assets/svg/condition.svg";
import ImageButton from "@/components/imageBtn";
// 自定义组件
import DetailModel from "@/pages/review/components/detailModel";
// 数据配置
import { COLUMNS } from "./COLUMNS";
import Cookie from "js-cookie";
const SVG_LIST = {
  svg_excel_upload,
  svg_excel_export,
  svg_create,
  svg_registration,
  svg_delete,
  svg_user,
  svg_details,
  svg_edit,
  svg_condition,
};
export default {
  name: "AdminFaculty",
  components: { StandardTable, ImageButton, DetailModel },
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
        keyWord: {
          name: "",
        },
      },
      advanced: false,
      columns: COLUMNS,
      dataSource: undefined,
      selectedRows: [],
      // 上传excel
      visible_upload_excel: false,
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      // svg
      ...SVG_LIST,
      // 请求接口 参数
      info: {
        page: 1,
        line: 10,
        keyWord: {
          name: "",
        },
        type: "gjxm",
        operate: "",
      },
      // 自定义编辑框
      detail_model_data: {
        visible: false,
        type: "Edit",
        tableTitle: "编辑",
        columns: COLUMNS,
        width: 1000,
        record: {},
      },
      pagination: {
        options: ["10", "20", "50", "100", "1000"],
        // 总页数
        pageCount: undefined,
        // 总行数
        lineCount: undefined,
        // 本页行数
        pageSize: 10,
        // 页码
        current: 1,
        loading: false,
      },
      fileList: [],
      uploading: false,
    };
  },
  watch: {
    "pagination.pageSize": {
      handler(val) {
        console.log("pageSize", val);
        this.pagination.pageSize = val;
        this.getList();
      },
      deep: true,
    },
    "pagination.current": {
      handler(val) {
        this.pagination.current = val;
        console.log("current", val);
        this.getList();
      },
      deep: true,
    },
  },
  computed: {
    desc() {
      return this.$t("pageDesc");
    },
  },
  mounted() {
    // console.log(this.rules);
    this.getList();
    // this.getDetailModalSelectValue();
  },
  methods: {
    // 读取下拉框数据
    getDetailModalSelectValue() {
      this.columns.forEach(_ => {
        if (_.selectType && _.selectType === "api") {
          XHR[`Axios_$$${_.Api}`]({
            page: 1,
            line: 1000000,
          }).then(__ => {
            _.selects = __.data.info.list;
          });
        }
      });
    },
    getList() {
      this.pagination.loading = true;
      this.info.page = this.pagination.current;
      this.info.line = this.pagination.pageSize;
      XHR.Axios_$$thirdPartyData_jwc_data_getList(this.info).then(_ => {
        this.dataSource = _.data.info.list;
        this.pagination.lineCount = _.data.info.lineCount;
        this.pagination.pageCount = _.data.info.pageCount;
        this.pagination.loading = false;
        this.info.keyWord = this.filterForm.keyWord = {
          name: "",
        };
      });
    },
    // 模糊搜索表单操作
    handleSelect() {
      this.info.keyWord = this.filterForm.keyWord;
      this.pagination.current = 1;
      this.getList();
    },
    // 切换页面行数
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      console.log(this.pagination);
    },
    // 模态框返回按钮
    handleDetailModelSubmit({ form, type }) {
      console.log("type:", type);
      console.log("form:", form);
      return this[`handle${type}`](form);
    },
    // 更新
    handleEdit(query) {
      console.log(query);
      // 调用接口
      XHR.Axios_$$thirdPartyData_jwc_data_edit({
        operate: 2,
        type: this.info.type,
        id: query.id,
        [this.info.type]: query,
      }).then(_ => {
        this.$refs["DetailModel"].handleCallBack(_.data);
      });
    },
    // 添加
    handleAdd(query) {
      console.log(query);
      // 调用接口
      XHR.Axios_$$thirdPartyData_jwc_data_edit({
        operate: 1,
        type: this.info.type,
        [this.info.type]: query,
      }).then(_ => {
        this.$refs["DetailModel"].handleCallBack(_.data);
      });
    },
    // 删除
    handleDel() {},
    // 打开弹窗
    opendetailmodal(option, record = {}, index) {
      console.log(option, record, index);
      if (option === "Edit") {
        this.detail_model_data = {
          visible: true,
          tableTitle: `编辑`,
          userType: this.info.type,
          width: 800,
          type: option,
          columns: this.columns,
          record: record,
          listIndex: index,
        };
      } else if (option === "Info") {
        this.detail_model_data = {
          visible: true,
          tableTitle: `详情`,
          userType: this.info.type,
          width: 1000,
          type: option,
          columns: this.columns,
          record: record,
          listIndex: index,
        };
      } else if (option === "Add") {
        this.detail_model_data = {
          visible: true,
          tableTitle: `添加`,
          width: 1000,
          type: option,
          columns: this.columns,
          record: record,
        };
      }
    },
    // 删除指定数据
    deleteRecord(query) {
      XHR.Axios_$$thirdPartyData_jwc_data_edit({
        operate: 3,
        id: query.id,
        type: this.info.type,
        [this.info.type]: query,
      }).then(() => this.getList());
      return this.getList();
      // this.dataSource = this.dataSource.filter(item => item.key !== key);
      // this.selectedRows = this.selectedRows.filter(item => item.key !== key);
    },
    // 表单操作
    // 导出excel
    exportExcel() {},
    // 上传excel
    showModal() {
      this.visible_upload_excel = true;
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 工具函数
    /**
     * 重置object
     * 传入 {}
     * 自动重置
     */
    // 需要操作提示调用这个，不需要提示调用ergodic
    resetObj() {
      this.ergodic(this.filterForm);
      const type = "success";
      const message = "重置表单成功!";
      this.$message[type](message).then(() => {});
      this.getList();
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
        item => this.selectedRows.findIndex(row => row.key === item.key) === -1
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
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [file];
      return false;
    },
    async handleUpload() {
      this.uploading = true;
      const { fileList } = this;
      const formData = new FormData();
      console.log(this.info.type);
      console.log(fileList[0]);
      formData.append("token", Cookie.get("Authorization"));
      formData.append("type", Cookie.get("type"));
      formData.append(`info[file]`, fileList[0]);
      formData.append(`info[type]`, this.info.type);
      await XHR.Axios_$$thirdPartyData_jwc_upload(formData).then(_ => {
        console.log(_);
        this.uploading = false;
        this.visible_upload_excel = false;
        return this.getList();
      });
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
