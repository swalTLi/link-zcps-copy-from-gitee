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
                    v-model="filterForm.keyWord"
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
              :text="'创建业绩条件'"
            />
            <!-- <ImageButton
              :src="svg_excel_upload"
              @click="showModal"
              :text="'导入'"
            />
            <ImageButton
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
          <div slot="action" slot-scope="{ record }">
            <!-- <a style="margin-right: 8px" @click="goto('signUp', record)">
              <a-icon :component="svg_list" /> 报名管理
            </a> -->
            <a
              style="margin-right: 8px"
              @click="opendetailmodal('Info', record)"
            >
              <a-icon :component="svg_details" /> 详情
            </a>
            <a style="margin-right: 8px" @click="opendetailmodal('RC', record)">
              <a-icon :component="svg_list" /> 报名条件
            </a>
            <a
              style="margin-right: 8px"
              @click="opendetailmodal('Edit', record)"
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
          :listIndex="detail_model_data.listIndex"
          @handleDetailModelSubmit="handleDetailModelSubmit"
          @getList="getList()"
          @closemodel="detail_model_data.visible = false"
          :getUser="false"
        />
      </div>
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
    </div>
    <a-modal
      :visible="condition_model.visible"
      :title="condition_model.tableTitle"
      :width="condition_model.width"
      :destroyOnClose="true"
      @cancel="condition_model.handleCancel"
    >
      <a-space class="operator" align="baseline"> </a-space>
      <a-form-model
        :model="condition_model.record"
        :label-col="labelCol"
        ref="EditForm"
        :rules="rules"
        :wrapper-col="wrapperCol"
      >
        <div v-if="condition_model.isEdit">
          <a-form-model-item label="岗位" prop="teacherJobId">
            <a-select
              placeholder="请选择岗位"
              v-model="condition_model.record.teacherJobId"
            >
              <a-select-option
                :value="item.id"
                v-for="item in job"
                :key="item.id"
                >{{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="教师岗位等级" prop="teacherPostGradeId">
            <a-select
              placeholder="请选择教师岗位等级"
              v-model="condition_model.record.teacherPostGradeId"
            >
              <a-select-option
                :value="item.id"
                v-for="item in gw"
                :key="item.id"
                >{{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="学历" prop="teacherEducationId">
            <a-select
              placeholder="请选择学历"
              v-model="condition_model.record.teacherEducationId"
            >
              <a-select-option
                :value="item.value"
                v-for="item in xl"
                :key="item.value"
                >{{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="教师岗位任职时间" prop="teacherPostMinYear">
            <a-input
              placeholder="请输入教师岗位任职时间"
              v-model="condition_model.record.teacherPostMinYear"
            />
          </a-form-model-item>
        </div>
        <div v-if="!condition_model.isEdit">
          <a-form-model-item label="岗位" prop="teacherJobId">
            {{ condition_model.record.teacherJobName }}
          </a-form-model-item>
          <a-form-model-item label="教师岗位等级" prop="teacherPostGradeId">
            {{ condition_model.record.teacherPostGradeName }}
          </a-form-model-item>
          <a-form-model-item label="教师最低学历" prop="teacherEducationId">
            {{ condition_model.record.teacherEducationName }}
          </a-form-model-item>
          <a-form-model-item label="教师岗位任职时间" prop="teacherPostMinYear">
            {{ condition_model.record.teacherPostMinYear + "年" }}
          </a-form-model-item>
        </div>
      </a-form-model>
      <template slot="footer">
        <a-button
          style="float:left;"
          type="primary"
          key="edit"
          @click="condition_model.isEdit = true"
          v-if="!condition_model.isEdit"
          size="large"
        >
          编辑
        </a-button>
        <a-button
          key="back"
          @click="condition_model.handleCancel"
          size="large"
          v-if="!condition_model.isEdit"
        >
          返回
        </a-button>
        <a-button
          v-if="!condition_model.isEdit"
          key="submit"
          type="primary"
          @click="condition_model.handleCancel"
          size="large"
        >
          完成
        </a-button>
        <a-button
          v-if="condition_model.isEdit"
          key="submit1"
          type="info"
          @click="condition_model.visible = false"
          size="large"
        >
          取消
        </a-button>
        <a-button
          v-if="condition_model.isEdit"
          key="submit2"
          type="primary"
          @click="condition_model.handleOk"
          size="large"
        >
          保存
        </a-button>
      </template>
    </a-modal>
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
import svg_list from "@/assets/svg/list.svg";
import ImageButton from "@/components/imageBtn";
// 自定义组件
import DetailModel from "@/pages/review/components/detailModel";
// 数据配置
import { COLUMNS } from "./COLUMNS";
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
  svg_list,
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
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      EditForm: {
        ruleId: undefined,
        teacherJobId: undefined,
        teacherPostGradeId: undefined,
        teacherEducationId: undefined,
        teacherPostMinYear: undefined,
      },
      xl: [
        {
          name: "博士研究生",
          value: 1,
        },
        {
          name: "硕士研究生",
          value: 2,
        },
        {
          name: "本科",
          value: 3,
        },
        {
          name: "本科",
          value: 4,
        },
        {
          name: "中专",
          value: 5,
        },
        {
          name: "高中",
          value: 6,
        },
        {
          name: "初中",
          value: 7,
        },
        {
          name: "小学",
          value: 8,
        },
        {
          name: "学前",
          value: 9,
        },
        {
          name: "职高",
          value: 10,
        },
        {
          name: "技校",
          value: 11,
        },
      ],
      gw: [],
      job: [],
      /**
       * 查询 过滤 检索 表单
       */
      filterForm: {
        keyWord: "",
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
        keyWord: "",
        type: "zjpdgl",
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
      condition_model: {
        visible: false,
        type: "Edit",
        tableTitle: "编辑",
        columns: COLUMNS,
        width: 1000,
        record: {},
        handleOk: () => {
          this.condition_model.visible = false;
        },
        handleCancel: () => {
          this.condition_model.visible = false;
        },
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
    this.getDetailModalSelectValue();
    this.getList();
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
      XHR.Axios_$$appointReview_rule_searchList(this.info).then(_ => {
        this.dataSource = _.data.info.list;
        this.pagination.lineCount = _.data.info.lineCount;
        this.pagination.pageCount = _.data.info.pageCount;
        this.pagination.loading = false;
        this.info.keyWord = this.filterForm.keyWord = "";
        console.log(_.data.info.list);
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
      XHR.Axios_$$appointReview_rule_add(query).then(_ => {
        this.$refs["DetailModel"].handleCallBack(_.data);
      });
    },
    // 添加
    handleAdd(query) {
      console.log(query);
      // 调用接口
      XHR.Axios_$$appointReview_rule_add(query).then(_ => {
        this.$refs["DetailModel"].handleCallBack(_.data);
      });
    },
    // 删除
    handleDel() {},
    // 打开弹窗
    async opendetailmodal(option, record = {}) {
      // console.log(option, record);
      if (option === "Edit") {
        this.detail_model_data = {
          visible: true,
          tableTitle: `编辑`,
          userType: this.info.type,
          width: 800,
          type: option,
          columns: this.columns,
          record: record,
          listIndex: 0,
        };
        console.log(this.detail_model_data);
      } else if (option === "Info") {
        this.detail_model_data = {
          visible: true,
          tableTitle: `用户详情`,
          userType: this.info.type,
          width: 1200,
          type: option,
          columns: this.columns,
          record: record,
        };
      } else if (option === "Add") {
        this.detail_model_data = {
          visible: true,
          tableTitle: `创建职级评定`,
          userType: this.info.type,
          width: 800,
          type: option,
          columns: this.columns,
          record: record,
          listIndex: 0,
        };
      } else if (option === "RC") {
        var registerRequirement = {};
        console.log(record);
        await XHR.Axios_$$appointReview_registerRequirement_getInfo({
          ruleId: record.id,
        }).then(_ => {
          registerRequirement = _.data.info.registerRequirement;
          console.log(_.data.info);
        });
        // if ("ruleId" in registerRequirement) {
        await XHR.Axios_$$searchPostGradeList({
          page: 1,
          line: 10000,
        }).then(_ => {
          this.gw = _.data.info.list;
          console.log(this.gw);
        });
        await XHR.Axios_$$searchJobList({
          page: 1,
          line: 10000,
        }).then(_ => {
          this.job = _.data.info.list;
          console.log(this.job);
        });
        // }
        this.condition_model = {
          isEdit: registerRequirement.length > 0 ? false : true,
          visible: true,
          tableTitle:
            "ruleId" in registerRequirement ? `报名条件编辑` : `创建条件编辑`,
          userType: this.info.type,
          width: 800,
          type: option,
          columns: this.columns,
          record:
            "ruleId" in registerRequirement
              ? { ruleId: record.id, ...record, ...registerRequirement }
              : { ruleId: record.id, ...record },
          listIndex: 0,
          handleOk: () => {
            XHR.Axios_$$appointReview_registerRequirement_add(
              this.condition_model.record
            ).then(_ => {
              console.log(_.data.info);
            });
            console.log(this.condition_model.record);
            this.condition_model.visible = false;
          },
          handleCancel: () => {
            this.condition_model.visible = false;
          },
        };
      }
    },
    // 删除指定数据
    deleteRecord(record) {
      console.log(record);
      XHR.Axios_$$appointReview_rule_delete({ id: record.id }).then(() =>
        this.getList()
      );
      return this.getList();
    },
    async goto(path, query) {
      await console.log(query);
      this.$router.push({
        path,
        query: {
          rankReviewId: query.id,
        },
      });
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
    getLocalTime(nS) {
      if (nS) {
        return new Date(parseInt(nS) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ")
          .split(" ")[0];
      } else {
        return "无数据";
      }
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
