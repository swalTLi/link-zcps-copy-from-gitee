<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <!-- <a-page-header
      title="任现职3-6年的需要完成附件2要求的A1中1项和A2-A10中任意2项；"
    /> -->
    <a-space class="operator" align="baseline">
      <a-button key="console" type="primary" size="large" @click="openmodal()">
        新增业绩
      </a-button>
    </a-space>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      rowKey="id"
      size="small"
      style="margin-top:20px;"
      bordered
      @ok="new_model.handleOk"
      @cancel="new_model.handleCancel"
    >
      <div slot="index" slot-scope="text, record, index">
        {{ index + 1 }}
      </div>
      <div slot="action" slot-scope="text, record, index">
        <a
          style="margin-right: 8px"
          @click="opendetailmodal('Info', record, index)"
        >
          <a-icon type="info" />查看
        </a>
        <!-- <a
          style="margin-right: 8px"
          @click="opendetailmodal('Edit', record)"
          v-if="!is_ok"
        >
          <a-icon type="Edit" />编辑
        </a> -->
        <a-popconfirm
          title="确认删除？"
          ok-text="删除"
          cancel-text="取消"
          @confirm="deleteRecord(record)"
        >
          <a v-if="!is_ok"> <a-icon type="delete" />删除 </a>
        </a-popconfirm>
      </div>
    </a-table>
    <a-space
      v-if="!is_ok"
      class="operator"
      align="baseline"
      style="display:flex;justify-content:center;align-items:center"
    >
      <a-button
        key="console"
        type="primary"
        size="large"
        style="float:right;margin-top:50px;"
        @click="sh()"
        >提交审核
      </a-button>
    </a-space>
    <!-- <condition
      :visible_condition="visible_condition"
      @closeModal="visible_condition = false"
    /> -->
    <div v-if="is_ok">
      <a-page-header title="工作业绩条件审核进度" />
      <div style="margin:50px 15%;">
        <a-steps :current="current">
          <a-step title="填报" />
          <a-step title="等待审核" />
          <a-step title="审核技术" />
        </a-steps>
      </div>
    </div>
    <a-modal
      v-if="new_model.visible"
      :title="new_model.tableTitle"
      :visible="new_model.visible"
      :confirm-loading="new_model.confirmLoading"
      @ok="new_model.handleOk"
      @cancel="new_model.handleCancel"
      :width="new_model.width"
      :destroyOnClose="true"
    >
      <a-page-header title="业绩条件" />
      <a-form-model
        ref="jtyqForm"
        :model="new_model.record"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        money
        teacherType
        :rules="rules"
      >
        <div v-if="new_model.type === 'Add'">
          <a-form-model-item label="选择序号" prop="serialNumberId">
            <a-select
              @change="handleXHchange(new_model.record.serialNumberId)"
              v-model="new_model.record.serialNumberId"
              placeholder="请选择序号, 然后根据序号来获取具体要求列表"
            >
              <a-select-option
                v-for="(item,
                index) in new_model.searchRequireInfoSerialNumberList"
                :key="100 + index + item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            label="选择具体要求"
            prop="requireLine"
            v-if="new_model.searchPerformanceRequireInfoList.length > 0"
          >
            <a-tree-select
              allow-clear
              :treeDefaultExpandAll="true"
              v-model="new_model.record.requireLine"
              placeholder="请选择具体要求, 然后根据具体要求来获取您需要填写得表单"
            >
              <a-tree-select-node
                v-for="(One,
                index) in new_model.searchPerformanceRequireInfoList"
                :key="1000 + index + One.id"
                :value="One.line"
              >
                <template slot="title">
                  <span @click="handleYQchange(One.id, 1)">{{ One.line }}</span>
                </template>
                <a-tree-select-node
                  v-for="(Two, Tindex) in One.requireLevelTwo"
                  :key="2000 + Tindex + Two.id"
                  :value="Two.line"
                >
                  <template slot="title">
                    <span @click="handleYQchange(Two.id, 2)">{{
                      Two.line
                    }}</span>
                  </template>
                </a-tree-select-node>
              </a-tree-select-node>
            </a-tree-select>
          </a-form-model-item>
        </div>
        <div v-if="new_model.type === 'Edit'" style="margin:auto;width:900px;">
          <div style="margin:auto;font-size:18px;">
            <span style="margin-right:20px;">业绩条件:</span
            ><span>{{ new_model.record.serialNumberName }}</span>
          </div>
          <div style="margin:auto;font-size:18px;">
            <span style="margin-right:20px;">具体要求:</span
            ><span>{{ new_model.record.line }}</span>
          </div>
        </div>
        <div
          v-if="
            new_model.record.requireId &&
              new_model.searchPerformanceRequireInfoList.length > 0 &&
              new_model.formType
          "
        >
          <a-page-header title="业绩表单" />
          <a-form-model-item
            label="经费（万元）"
            prop="money"
            v-if="new_model.formType.money"
          >
            <a-input-number
              style="width: 100%"
              v-model="new_model.record.money"
              placeholder="请输入经费（万元）"
            />
          </a-form-model-item>
          <a-form-model-item
            label="描述"
            prop="description"
            v-if="new_model.formType.inputDescribe"
          >
            <a-textarea
              style="width: 100%;height:400px;font-size: 20px;"
              v-model="new_model.record.description"
              placeholder="请填写描述"
            />
          </a-form-model-item>
          <a-form-model-item
            label="附件"
            
            v-if="new_model.formType.inputAttach"
          >
            <div class="clearfix">
              <a-upload
                :file-list="new_model.fileList"
                :remove="handleRemove"
                :before-upload="beforeUpload"
                v-model="new_model.record.file"
              >
                <a-button> <a-icon type="upload" /> Select File </a-button>
              </a-upload>
              <!-- <a-button
                type="primary"
                :disabled="new_model.fileList.length === 0"
                :loading="uploading"
                style="margin-top: 16px"
                @click="handleUpload"
              >
                {{ uploading ? "Uploading" : "Start Upload" }}
              </a-button> -->
            </div>
          </a-form-model-item>
          <a-form-model-item
            label="比赛"
            prop="competitionId"
            v-if="
              new_model.formType.pullCompetition &&
                new_model.formType.competitionInfo
            "
          >
            <a-select
              mode="multiple"
              placeholder="请选择比赛"
              @change="e => selectChange(e, 'competitionInfo')"
              v-model="new_model.record.competitionId"
            >
              <a-select-option
                v-for="item in new_model.competitionInfo"
                :key="item.infoId"
                :value="item.infoId"
              >
                {{ item.infoName }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            label="科研"
            prop="researchInfoId"
            v-if="
              new_model.formType.pullResearch && new_model.formType.researchInfo
            "
          >
            <a-select
              mode="multiple"
              placeholder="请选择科研"
              @change="e => selectChange(e, 'researchInfo')"
              v-model="new_model.record.researchInfoId"
            >
              <a-select-option
                v-for="item in new_model.researchInfo"
                :key="item.infoId"
                :value="item.infoId"
              >
                {{ item.infoName }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
      </a-form-model>
      <a-spin
        size="large"
        v-if="new_model.loading"
        style=" margin:auto;margin-top: 30px;margin-bottom:30px;  width: 100%;"
      />
      <template slot="footer">
        <a-button
          :loading="new_model.confirmLoading"
          @click="new_model.handleCancel"
          prop="rule"
        >
          取消
        </a-button>
        <a-button
          type="primary"
          :loading="new_model.confirmLoading"
          @click="new_model.handleOk"
        >
          提交
        </a-button>
      </template>
    </a-modal>
    <a-modal
      :visible="detail_model_data.visible"
      :title="detail_model_data.tableTitle"
      :width="detail_model_data.width"
      @ok="detail_model_data.visible = false"
      @cancel="detail_model_data.visible = false"
    >
      <detail
        v-if="detail_model_data.visible"
        :columns="detail_model_data.columns"
        :record="detail_model_data.record"
      />
    </a-modal>
  </a-card>
</template>

<script>
import Cookie from "js-cookie";
// import condition from "./condition.vue";
import detail from "./detail.vue";
import XHR from "@/services/interface";
import { COLUMNS, rules } from "./COLUMNS.js";
export default {
  name: "SingUp",
  i18n: require("./i18n"),
  components: { detail },
  data() {
    return {
      rules,
      columns: COLUMNS,
      tableData: [],
      form: {
        gzl: 1,
        desc: "text",
        pdf: "",
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      current: 1,
      is_ok: false,
      is_upload: false,
      visible_condition: false,
      new_model: {
        loading: false,
        visible: false,
        type: "Edit",
        tableTitle: "新增业绩",
        width: 1000,
        record: {},
        form: {},
        // 选择序号列表
        searchRequireInfoSerialNumberList: [],
        // 选择具体要求列表
        searchPerformanceRequireInfoList: [],
        formType: {},
        // 附件
        fileList: [],
        // 竞赛列表
        competition: [],
        // 科技列表
        researchInfo: [],
        handleOk: () => {},

        handleCancel: () => {
          this.new_model.visible = false;
        },
      },
      detail_model_data: {
        visible: false,
        type: "Edit",
        tableTitle: "新增业绩",
        width: 1000,
        record: {},
      },
      uploading: false,
    };
  },
  computed: {
    desc() {
      return this.$t("pageDesc");
    },
  },
  async mounted() {
    if ("performanceCriteriaId" in this.$route.query) {
      await this.getList();
    } else {
      await XHR.Axios_$$getTeacherApplyInfo({
        rankReviewId: this.$route.query.rankReviewId,
      }).then(_ => {
        this.performanceCriteriaId =
          _.data.info.teacherApply.performanceCriteriaId;
        this.getList(_.data.info.teacherApply.performanceCriteriaId);
      });
    }
  },
  methods: {
    async getList(performanceCriteriaId) {
      await XHR.Axios_$$searchTeacherInputRankReviewList({
        page: 1,
        line: 1000,
        rankReviewId: this.$route.query.rankReviewId,
        performanceCriteriaId:
          this.$route.query.performanceCriteriaId || performanceCriteriaId,
      }).then(_ => {
        console.log(_.data.info.list);
        this.tableData = _.data.info.list;
      });
    },
    async openmodal() {
      this.new_model = await {
        loading: false,
        visible: false,
        type: "Add",
        tableTitle: "新增s业绩",
        width: 1000,
        record: {},
        form: {},
        // 选择序号列表
        searchRequireInfoSerialNumberList: [],
        // 选择具体要求列表
        searchPerformanceRequireInfoList: [],
        formType: {},
        // 附件
        fileList: [],
        // 竞赛列表
        competition: [],
        // 科技列表
        researchInfo: [],
        handleOk: () => {},
        handleCancel: () => {
          this.new_model.visible = false;
        },
      };
      await XHR.Axios_$$searchRequireInfoSerialNumberList({
        performanceCriteriaId:
          this.$route.query.performanceCriteriaId || this.performanceCriteriaId,
      }).then(_ => {
        this.new_model.searchRequireInfoSerialNumberList = _.data.info.list;
      });
      this.new_model = {
        ...this.new_model,
        visible: true,
        width: 1000,
        confirmLoading: false,
        handleOk: async () => {
          console.log("====================================");
          this.new_model.record.teacherApplyRankId =
            this.$route.query.performanceCriteriaId ||
            this.performanceCriteriaId;
          console.log("record", this.new_model.record);
          console.log(this.$route.query);
          console.log(this.new_model.record.serialNumberId);
          let formData = new FormData();
          // for (let key in this.new_model.record) {
          //   console.log(key, this.new_model.record[key]);
          //   formData.append(key, this.new_model.record[key]);
          // }
          console.log(Cookie.get("Authorization"));
          formData.append("token", Cookie.get("Authorization"));
          formData.append("type", Cookie.get("type"));
          // formData.append("file", this.new_model.record.file);
          for (let key in this.new_model.record) {
            formData.append(`info[${key}]`, this.new_model.record[key]);
          }

          for (let key in this.new_model.record.competitionId) {
            formData.append(
              `info[competitionId][${key}]`,
              this.new_model.record.competitionId[key]
            );
          }
          for (let key in this.new_model.record.researchInfoId) {
            formData.append(
              `info[researchInfoId][${key}]`,
              this.new_model.record.researchInfoId[key]
            );
          }
          for (let key in this.new_model.record.researchInfo) {
            console.log(this.new_model.record.researchInfo[key].typeId);
            console.log(this.new_model.record.researchInfo[key].infoId);
            formData.append(
              `info[researchInfo][${key}][typeId]`,
              this.new_model.record.researchInfo[key].typeId
            );
            formData.append(
              `info[researchInfo][${key}][infoId]`,
              this.new_model.record.researchInfo[key].infoId
            );
          }
          for (let key in this.new_model.record.competitionInfo) {
            console.log(this.new_model.record.competitionInfo[key].typeId);
            console.log(this.new_model.record.competitionInfo[key].infoId);
            formData.append(
              `info[competitionInfo][${key}][typeId]`,
              this.new_model.record.competitionInfo[key].typeId
            );
            formData.append(
              `info[competitionInfo][${key}][infoId]`,
              this.new_model.record.competitionInfo[key].infoId
            );
          }
          formData.delete("info[competitionInfo]");
          formData.delete("info[researchInfo]");
          // formData.append(
          //   `info[teacherApplyRankId]`,
          //   this.$route.query.performanceCriteriaId ||
          //     this.performanceCriteriaId
          // );
          // formData.append("info", JSON.stringify(this.new_model.record));
          this.$refs.jtyqForm.validate(valid => {
            if (valid) {
              console.log(1);
              // this.new_model.confirmLoading = true;
              console.log("formData", formData);
              console.log("formData.values()", formData.values());
              XHR.Axios_$$teacherInputRankReview(formData).then(_ => {
                console.log(_);
                this.new_model.loading = false;
                this.getList();
                // return this.getList(this.performanceCriteriaId).then(() => {
                //   this.new_model = {
                //     loading: false,
                //     visible: false,
                //     type: "Edit",
                //     tableTitle: "新增业绩",
                //     width: 1000,
                //     record: {},
                //     form: {},
                //     // 选择序号列表
                //     searchRequireInfoSerialNumberList: [],
                //     // 选择具体要求列表
                //     searchPerformanceRequireInfoList: [],
                //     formType: {},
                //     // 附件
                //     fileList: [],
                //     // 竞赛列表
                //     competition: [],
                //     // 科技列表
                //     researchInfo: [],
                //     handleOk: () => {},

                //     handleCancel: () => {
                //       this.new_model.visible = false;
                //     },
                //   };
                // });
              });
            } else {
              console.log("error submit!!");
              return false;
            }
          });
          console.log("====================================");
          // this.new_model.visible = false;
        },
        handleCancel: () => {
          this.new_model.visible = false;
        },
      };
    },
    async opendetailmodal(option, record = {}, index) {
      console.log(option, record, index);
      if (option === "Info") {
        this.detail_model_data = {
          visible: true,
          tableTitle: `详情`,
          width: 1200,
          type: option,
          columns: this.columns,
          record: record,
        };
      } else if (option === "Edit") {
        this.new_model = {
          loading: false,
          visible: false,
          type: "Edit",
          tableTitle: "新增业绩",
          width: 1000,
          record: {},
          form: {},
          // 选择序号列表
          searchRequireInfoSerialNumberList: [],
          // 选择具体要求列表
          searchPerformanceRequireInfoList: [],
          formType: {},
          // 附件
          fileList: [],
          // 竞赛列表
          competition: [],
          // 科技列表
          researchInfo: [],
          handleOk: () => {},
          handleCancel: () => {
            this.new_model.visible = false;
          },
        };
        this.new_model = {
          ...this.new_model,
          loading: false,
          visible: true,
          tableTitle: `编辑`,
          width: 1200,
          type: option,
          columns: this.columns,
          record: {
            ...record,
            teacherApplyRankId: this.$route.query.teacherApplyRankId,
            serialNumberId: record.serialNumberId,
            requireId: record.requireId,
            level: record.level,
            money: record.money,
            description: record.description,
            competitionInfo: record.chooseCompetition,
            researchInfo: record.chooseResearch,
          },
          handleOk: async () => {
            console.log("====================================");
            this.new_model.record.teacherApplyRankId = this.$route.query.teacherApplyRankId;
            console.log("record", this.new_model.record);
            let formData = new FormData();
            // for (let key in this.new_model.record) {
            //   console.log(key, this.new_model.record[key]);
            //   formData.append(key, this.new_model.record[key]);
            // }
            console.log(Cookie.get("Authorization"));
            formData.append("token", Cookie.get("Authorization"));
            formData.append("type", Cookie.get("type"));
            // formData.append("file", this.new_model.record.file);
            for (let key in this.new_model.record) {
              formData.append(`info[${key}]`, this.new_model.record[key]);
            }
            for (let key in this.new_model.record.researchInfo) {
              console.log(key);
              formData.append(
                `info[researchInfo][${key}][typeId]`,
                this.new_model.record.researchInfo[key].typeId
              );
              formData.append(
                `info[researchInfo][${key}][infoId]`,
                this.new_model.record.researchInfo[key].infoId
              );
            }
            for (let key in this.new_model.record.competitionInfo) {
              formData.append(
                `info[competitionInfo][${key}][typeId]`,
                this.new_model.record.competitionInfo[key].typeId
              );
              formData.append(
                `info[competitionInfo][${key}][infoId]`,
                this.new_model.record.competitionInfo[key].infoId
              );
            }
            // formData.append("info", JSON.stringify(this.new_model.record));
            this.$refs.jtyqForm.validate(valid => {
              if (valid) {
                // this.new_model.confirmLoading = true;
                console.log("formData", formData);
                console.log("formData.values()", formData.values());
                XHR.Axios_$$teacherInputRankReview(formData).then(_ => {
                  console.log(_);
                  return this.getList(this.performanceCriteriaId).then(() => {
                    this.new_model = {
                      loading: false,
                      visible: false,
                      type: "Edit",
                      tableTitle: "新增业绩",
                      width: 1000,
                      record: {},
                      form: {},
                      // 选择序号列表
                      searchRequireInfoSerialNumberList: [],
                      // 选择具体要求列表
                      searchPerformanceRequireInfoList: [],
                      formType: {},
                      // 附件
                      fileList: [],
                      // 竞赛列表
                      competition: [],
                      // 科技列表
                      researchInfo: [],
                      handleOk: () => {},

                      handleCancel: () => {
                        this.new_model.visible = false;
                      },
                    };
                  });
                });
              } else {
                console.log("error submit!!");
                return false;
              }
            });
            console.log("====================================");
            // this.new_model.visible = false;
          },
          handleCancel: () => {
            this.new_model.visible = false;
          },
        };
        this.new_model.loading = false;
        await this.handleXHchange(record.serialNumberId);
        await this.handleYQchange(record.requireId, record.level);
      }
    },
    async handleXHchange(serialNumberId) {
      this.new_model.record.requireId = await undefined;
      this.new_model.formType = await undefined;
      this.new_model.searchPerformanceRequireInfoList = await [];
      this.new_model.loading = true;
      await XHR.Axios_$$searchPerformanceRequireInfoList({
        id: serialNumberId,
      }).then(_ => {
        this.new_model.searchPerformanceRequireInfoList = _.data.info.list;
        this.new_model.loading = false;
      });
    },
    async handleYQchange(id, level) {
      console.log(
        this.new_model.record.serialNumberId,
        this.new_model.record.requireId,
        level
      );
      this.new_model.record.requireId = id;
      this.new_model.record.level = level;
      this.new_model.loading = true;
      await XHR.Axios_$$searchSinglePerformanceRequireInfo({
        id,
        level,
      }).then(_ => {
        console.log(_.data.info);
        this.new_model.formType = _.data.info;
        const limitList1 = [];
        if (_.data.info.researchInfo.limitList) {
          _.data.info.researchInfo.limitList.forEach(item => {
            limitList1.push({
              researchInfoLevel: item.researchLevel,
              researchInfoType: item.researchType,
            });
          });
        }
        const limitList2 = [];
        if (_.data.info.competitionInfo.limitList) {
          _.data.info.competitionInfo.limitList.forEach(item => {
            limitList2.push({
              competitionLevel: item.competitionLevel,
              competitionType: item.competitionType,
            });
          });
        }
        if (limitList1.length) {
          XHR.Axios_$$searchKjcDataByTypeLevel({
            limitList: limitList1,
          }).then(__ => {
            console.log(__.data.info.list);
            this.new_model.researchInfo = __.data.info.list;
          });
        }
        if (limitList2.length) {
          XHR.Axios_$$searchCxxyDateByTypeLevel({
            limitList: limitList2,
          }).then(__ => {
            console.log(__.data.info.list);
            this.new_model.competitionInfo = __.data.info.list;
          });
        }
      });
      this.new_model.loading = false;
    },
    handleTree(record, level) {
      console.log(record, level);
    },
    sh() {
      this.tableData.forEach(_ => (_.status = "审核中"));
      this.is_ok = !this.is_ok;
    },
    deleteRecord(record) {
      XHR.Axios_$$deleteTeacherInputRankReview({
        id: record.id,
      }).then(_ => {
        console.log(_);
        this.getList();
      });
    },
    handleRemove(file) {
      const index = this.new_model.fileList.indexOf(file);
      const newFileList = this.new_model.fileList.slice();
      newFileList.splice(index, 1);
      this.new_model.fileList = newFileList;
      this.new_model.record.file = undefined;
    },
    beforeUpload(file) {
      const type = {
        "application/msword": 1,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": 1,
        "application/pdf": 1,
      };
      const isJpgOrPng = type[file.type];
      if (!isJpgOrPng) {
        this.$message.error(
          "只允许上传 pdf、doc、dox类型文件，并且限制大小25MB!"
        );
      }
      const isLt2M = file.size / 1024 / 1024 < 25;
      if (!isLt2M) {
        this.$message.error("上传的附件大小必须小于 25MB!");
      }
      if (isJpgOrPng && isLt2M) {
        if (this.new_model.fileList.length > 0) {
          this.handleRemove(this.new_model.fileList[0]);
        }
        this.new_model.fileList = [file];
        this.new_model.record.file = file;
      }
      return false;
    },
    handleUpload() {},
    selectChange(value, type) {
      console.log(value);
      const arr = [];
      value.forEach(_ => {
        this.new_model[type].forEach(__ => {
          console.log(__);
          if (__.infoId == _) {
            arr.push(__);
          }
        });
      });
      console.log(arr);
      this.new_model.record[type] = arr;
    },
  },
};
</script>

<style scoped></style>
