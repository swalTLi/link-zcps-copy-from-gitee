<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <!-- <a-page-header
      title="任现职3-6年的需要完成附件2要求的A1中1项和A2-A10中任意2项；"
    /> -->
    <a-space class="operator" align="baseline">
      <a-button
              key="console"
              type="primary"
              size="large"
              v-if="!is_ok"
              @click="openmodal()"
      >
        新增业绩
      </a-button>
      <h2
              style="font-weight:bold"
              key="console"
              type="primary"
              size="large"
              v-if="is_ok"
              @click="openmodal()"
      >
        我的业绩
      </h2>
      <label style="margin-left: 50px;font-size: 16px;font-weight: bold;"
      >二级部门审核状态：</label
      >
      <a-select
              default-value="0"
              v-model="secondarySectorExamineType"
              style="width: 120px"
              @change="value => handleSelect(value, 'secondarySectorExamineType')"
      >
        <a-select-option :value="-1">
          全部
        </a-select-option>
        <a-select-option :value="0">
          未审核
        </a-select-option>
        <a-select-option :value="1">
          通过
        </a-select-option>
        <a-select-option :value="2">
          退回
        </a-select-option>
      </a-select>
      <label style="margin-left: 20px;font-size: 16px;font-weight: bold;"
      >职能部门审核状态：</label
      >
      <a-select
              default-value="0"
              v-model="functionExamineType"
              style="width: 120px"
              @change="value => handleSelect(value, 'functionExamineType')"
      >
        <a-select-option :value="-1">
          全部
        </a-select-option>
        <a-select-option :value="0">
          未审核
        </a-select-option>
        <a-select-option :value="1">
          通过
        </a-select-option>
        <a-select-option :value="2">
          退回
        </a-select-option>
      </a-select>
    </a-space>
    <a-table
            class="table-td"
            :loading="loading"
            style="margin-top:20px;"
            :columns="COLUMNS"
            :data-source="tableData"
            bordered
            :pagination="false"
            size="small"
    >
      <div slot="index" slot-scope="text, record, index">
        {{ index + 1 }}
      </div>
      <!-- <div slot="isUpload" slot-scope="text">
        {{ isUpload[text] }}
      </div> -->
      <!-- <div slot="fileName" slot-scope="text, record">
        <table
          cellpadding="0"
          cellspacing="0"
          border="1"
          :summary="record.id"
          class="table-list"
        >
          <tr>
            <td :rowspan="getRowF(record)" v-if="!record.description">
              {{ record.description }}asdsad
            </td>
            <td
              :rowspan="getRowF(record)"
              v-if="!record.fileName || !record.filePath"
            >
              asdsad
              <a :href="record.filePath">{{ record.fileName }}</a>
            </td>
            <div v-for="(item, index) in getProChooseList(record)" :key="index">
              <span
                class="table-box"
                v-for="(key, index2) in [
                  'name',
                  'scope',
                  'source',
                  'subject',
                  'publication',
                  'include',
                  'page',
                  'money',
                ]"
                :key="index2"
              >
                {{ item[key] }}
              </span>
            </div>
          </tr>
        </table>
      </div> -->
      <div slot="action" slot-scope="text, record">
        <!-- <a
          style="margin-right: 8px"
          @click="opendetailmodal('Info', record, index)"
        >
          <a-icon type="info" />
          查看
        </a> -->
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
          <a-step title="审核结束" />
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
            :width="1500"
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
                    style="width: 1050px;"
                    @change="handleXHchange(new_model.record.serialNumberId)"
                    v-model="new_model.record.serialNumberId"
                    placeholder="请选择序号, 然后根据序号来获取具体要求列表"
            >
              <a-select-option
                      v-for="item in new_model.searchRequireInfoSerialNumberList"
                      :key="item.id"
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
                    style="width: 1050px;"
                    allow-clear
                    :treeDefaultExpandAll="true"
                    v-model="new_model.record.requireLine"
                    placeholder="请选择具体要求, 然后根据具体要求来获取您需要填写得表单"
            >
              <a-tree-select-node
                      v-for="One in new_model.searchPerformanceRequireInfoList"
                      :key="One.id"
                      :value="One.line"
              >
                <template slot="title">
                  <div @click="handleYQchange(One.id, 1)">{{ One.line }}</div>
                </template>
                <a-tree-select-node
                        v-for="Two in One.requireLevelTwo"
                        :key="Two.id"
                        :value="Two.line"
                >
                  <template slot="title">
                    <div @click="handleYQchange(Two.id, 2)">{{ Two.line }}</div>
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
                    style="width: 1050px;"
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
                    style="width: 1050px;height:300px;font-size: 20px;"
                    v-model="new_model.record.description"
                    placeholder="请填写描述"
            />
          </a-form-model-item>
          <a-form-model-item label="附件" v-if="new_model.formType.inputAttach">
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
                  :prop="new_model.formType.inputDescribe ? '' : 'competitionId'"
                  v-if="
              new_model.formType.pullCompetition &&
                new_model.formType.competitionInfo
            "
          >
            <a-select
                    style="width: 1050px;"
                    mode="multiple"
                    placeholder="请填写成果名称、获得时间、级别、排名"
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
            <span
                    style="color:red;margin-left: 20px;"
                    v-if="!new_model.formType.inputDescribe"
            >最小数量：{{ new_model.formType.competitionInfo.min }}</span
            >
          </a-form-model-item>
          <a-form-model-item
                  label="科研"
                  :prop="new_model.formType.inputDescribe ? '' : 'researchInfoId'"
                  v-if="
              new_model.formType.pullResearch && new_model.formType.researchInfo
            "
          >
            <a-select
                    style="width: 1050px;"
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
            <span
                    style="color:red;margin-left: 20px;"
                    v-if="!new_model.formType.inputDescribe"
            >最小数量：{{ new_model.formType.researchInfo.min }}</span
            >
            <!--            <div style="color:red;">-->
            <!--              2018前A类论文，请上传中科院分区证明（如有）<br/>-->
            <!--              A级论文说明：A1为A类1区，A2为A类2区，A3为A类3区，A4为A类4区-->
            <!--            </div>-->
          </a-form-model-item>
          <a-form-model-item
                  label="项目"
                  :prop="new_model.formType.inputDescribe ? '' : 'projectInfoId'"
                  v-if="
              new_model.formType.pullProject && new_model.formType.projectInfo
            "
          >
            <a-select
                    style="width: 1050px;"
                    mode="multiple"
                    placeholder="请选择项目"
                    @change="e => selectChange(e, 'projectInfo')"
                    v-model="new_model.record.projectInfoId"
            >
              <a-select-option
                      v-for="item in new_model.projectInfo"
                      :key="item.infoId"
                      :value="item.infoId"
              >
                {{ item.infoName }}
              </a-select-option>
            </a-select>
            <span
                    style="color:red;margin-left: 20px;"
                    v-if="!new_model.formType.inputDescribe"
            >最小数量：{{ new_model.formType.projectInfo.min }}</span
            >
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
  import { rules } from "./COLUMNS.js";
  export default {
    name: "SingUp",
    i18n: require("./i18n"),
    components: { detail },
    data() {
      const FileUrl = `http://api.vtszgj.rsc.sau.voooice.site/public`;
      const type1 = {
        0: "未审核",
        1: "院系部门审核通过",
        2: "院系部门审核退回",
      };
      const type2 = {
        0: "未审核",
        1: "职能部门审核通过",
        2: "职能部门审核退回",
      };
      type2;
      function getInfo(e) {
        if (e) {
          return e;
        } else {
          return "";
        }
      }
      function getCOLUMNS(_Columns) {
        console.log(_Columns);
        // if (Cookie.get("type") === "1") {
        //   return _Columns;
        // }
        // if (Cookie.get("type") === "3") {
        //   // _Columns[10].children.splice(0, 1);
        //   _Columns.splice(8, 1);
        //   return _Columns;
        // }
        // if (Cookie.get("type") === "4") {
        //   // _Columns[10].splice(5, 1);
        //   _Columns.splice(9, 1);
        //   return _Columns;
        // }
        if (Cookie.get("type") === "2") {
          if (Cookie.get("is_ok") === "true") {
            console.log("//////////");
            _Columns.splice(9, 1);
          }
        }
        return _Columns;
      }
      function getLocalTime(nS) {
        if (nS) {
          return new Date(parseInt(nS) * 1000)
                  .toLocaleString()
                  .replace(/:\d{1,2}$/, " ")
                  .split(" ")[0];
        } else {
          return "无数据";
        }
      }
      const COLUMNS = [
        {
          title: "编号",
          dataIndex: "index",
          scopedSlots: { customRender: "index" },
          customRender: (value, row) => {
            row;
            const obj = {
              children: row.index,
              attrs: {},
            };
            if (row.item_number !== 0) {
              obj.attrs.rowSpan = 0;
            } else {
              obj.attrs.rowSpan = row.length;
            }
            return obj;
          },
          ellipsis: false,
          info_show: false,
          // 是否在编辑页展示
          edit_show: false,
          is_Editable: false,
          add_show: false,
        },
        {
          title: "序号",
          dataIndex: "serialNumberName",
          scopedSlots: { customRender: "serialNumberName" },
          customRender: (value, row) => {
            row;
            const obj = {
              children: value,
              attrs: {},
            };
            if (row.item_number !== 0) {
              obj.attrs.rowSpan = 0;
            } else {
              obj.attrs.rowSpan = row.length;
            }
            return obj;
          },
          ellipsis: false,
          info_show: false,
          // 是否在编辑页展示
          edit_show: false,
          is_Editable: false,
          add_show: false,
        },
        {
          title: "教师id",
          dataIndex: "teacherId",
          scopedSlots: { customRender: "teacherId" },
          colSpan: 0,
          customRender: value => {
            const obj = {
              children: value,
              attrs: {
                colSpan: 0,
              },
            };
            return obj;
          },
          ellipsis: false,
          formType: "ldq-input",
          info_show: false,
          edit_show: true,
          add_show: true,
          is_Editable: false,
          rule: [
            {
              required: true,
              message: "是否开启评审",
              trigger: "change",
            },
          ],
          placeholder: "是否开启评审",
          radios: [
            {
              label: "开启",
              value: 1,
            },
            {
              label: "不开启",
              value: 0,
            },
          ],
        },
        {
          title: "教师名",
          dataIndex: "teacherName",
          scopedSlots: { customRender: "teacherName" },
          colSpan: 0,
          customRender: value => {
            const obj = {
              children: value,
              attrs: {
                colSpan: 0,
              },
            };
            return obj;
          },

          ellipsis: false,

          formType: "ldq-input",
          info_show: true,
          edit_show: true,
          add_show: true,
          is_Editable: true,
          rule: [
            {
              required: true,
              message: "请选择开始时间",
              trigger: "blur",
            },
          ],
          placeholder: "请选择开始时间",
        },
        {
          title: "业绩id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          colSpan: 0,
          customRender: value => {
            const obj = {
              children: value,
              attrs: {
                colSpan: 0,
              },
            };
            return obj;
          },

          formType: "ldq-input",
          // 查看详情时是否显示
          info_show: false,

          edit_show: true,

          is_Editable: false,

          add_show: false,
        },
        {
          title: "具体要求",
          dataIndex: "line",
          scopedSlots: { customRender: "line" },
          customRender: (value, row) => {
            const obj = {
              // children: value,
              children: (
                      <a-table
                              class="rowStyle"
                              showHeader={false}
                              id="link-table"
                              pagination={false}
                              // style="display:inline-block;border: 0px,width: 100%;height: 100%;line-height:100%;"
                              columns={[
                                {
                                  title: "教师id",
                                  dataIndex: "line",
                                  width: 150,
                                  scopedSlots: { customRender: "line" },
                                },
                              ]}
                              data-source={[{ line: value }]}
                              bordered
                              size="small"
                      >
                        <div slot="index" slot-scope={{}}>
                          s
                        </div>
                      </a-table>
              ),
              attrs: {},
            };
            if (row.item_number !== 0) {
              obj.attrs.rowSpan = 0;
            } else {
              obj.attrs.rowSpan = row.length;
            }
            return obj;
          },
          // customRender: (value, row) => {
          //   const obj = {
          //     children: value,
          //     attrs: {},
          //   };

          //   if (row.item_number !== 0) {
          //     obj.attrs.rowSpan = 0;
          //   } else {
          //     obj.attrs.rowSpan = row.length;
          //   }
          //   return obj;
          // },
          // ellipsis: false,
          formType: "ldq-input",
          info_show: true,
          edit_show: true,
          add_show: true,
          is_Editable: true,
          rule: [
            {
              required: true,
              message: "请填写具体要求",
              trigger: "blur",
            },
          ],
          placeholder: "请填写具体要求",
        },
        {
          title: "明细",
          dataIndex: "description",
          // colSpan: 3,
          scopedSlots: { customRender: "description" },
          customRender: (value, row) => {
            // console.log(row.filePath, row.fileName);
            var columns = [];
            var data = [];
            // 描述 文件
            if (row.is_description) {
              const array = [
                // "level",
                "description",
                "fileName",
              ];
              data = [
                {
                  description: value,
                  fileName: row.fileName,
                  filePath: row.filePath,
                },
              ];
              columns = [];
              array.forEach(_ => {
                if (row[_]) {
                  var obj = {};
                  // console.log(_ === "fileName");
                  if (_ === "fileName") {
                    obj = {
                      dataIndex: _,
                      width: 250,
                      scopedSlots: { customRender: _ },
                      customRender: (value, row) => {
                        const obj = {
                          children: (
                                  <span>
                            <span style="font-size:16px;font-weight:bold;">
                              附件：
                            </span>
                            <a target="_blank" href={FileUrl + row.filePath}>
                              {value ? value : "-"}
                            </a>
                          </span>
                          ),
                          attrs: {},
                        };
                        return obj;
                      },
                    };
                  } else {
                    obj = {
                      dataIndex: _,
                      width: 250,
                      scopedSlots: { customRender: _ },
                    };
                  }
                  columns.push(obj);
                }
              });
            } else {
              const array = [
                // "level",
                "name",
                "source",
                "level",
                "money",
                "time",
              ];
              const width = [200, 100, 100, 100, 100];
              data = [
                {
                  name: row.name,
                  source: row.source,
                  level: row.level,
                  money: row.money,
                  time: row.time,
                },
              ];
              columns = [];
              array.forEach((_, inde_w) => {
                // if (row[_]) {
                // console.log(row[_]);
                if (_ === "time") {
                  columns.push({
                    dataIndex: _,
                    width: width[inde_w],
                    scopedSlots: { customRender: _ },
                    customRender: (value, row) => {
                      const obj = {
                        children: getLocalTime(row[_]),
                        attrs: {},
                      };
                      return obj;
                    },
                  });
                } else {
                  columns.push({
                    dataIndex: _,
                    width: width[inde_w],
                    scopedSlots: { customRender: _ },
                    customRender: (value, row) => {
                      var val = row[_];
                      // console.log(val, !val);
                      if (!val) {
                        val = "-";
                      }
                      const obj = {
                        children: val,
                        attrs: {},
                      };
                      return obj;
                    },
                  });
                }
                // }
              });
            }
            const obj = {
              children: (
                      <a-table
                              class="rowStyle"
                              showHeader={false}
                              id="link-table"
                              pagination={false}
                              columns={columns}
                              data-source={data}
                              bordered
                              size="small"
                      >
                        <div slot="index" slot-scope={{}}>
                          s
                        </div>
                      </a-table>
              ),
              attrs: {},
            };
            return obj;
          },
          // children: [
          //   {
          //     title: "描述",
          //     dataIndex: "description",
          //     key: "description",
          //     customRender: value => {
          //       const obj = {
          //         children: value,
          //         attrs: {},
          //       };
          //       return obj;
          //     },
          //   },
          //   {
          //     title: "文件",
          //     dataIndex: "fileName",
          //     key: "fileName",
          //     customRender: (value, row) => {
          //       const obj = {
          //         children: <a href={row.filePath}>{value}</a>,
          //         attrs: {},
          //       };
          //       return obj;
          //     },
          //   },
          //   {
          //     title: "成果",
          //     dataIndex: "filePath",
          //     key: "filePath",
          //     customRender: (value, row) => {
          //       row;
          //       const array = [
          //         "name",
          //         "scope",
          //         "source",
          //         "subject",
          //         "publication",
          //         "include",
          //         "page",
          //       ];
          //       const realarray = array.filter(_ => {
          //         return row[_] !== undefined && row[_] !== null;
          //       });
          //       const obj = {
          //         children: (
          //           <table
          //             class="table-line"
          //             style={{
          //               display: "block",
          //               width: "100%",
          //               height: "100%",
          //               justifyContent: "space-between",
          //               padding: "0rpx 30rpx",
          //             }}
          //           >
          //             <tr
          //               style={{
          //                 display: "block",
          //                 width: "100%",
          //                 height: "100%",
          //                 justifyContent: "space-around",
          //                 padding: "0rpx 30rpx",
          //               }}
          //             >
          //               {realarray.map(_ => {
          //                 if (row[_] !== undefined && row[_] !== null) {
          //                   return (
          //                     <td
          //                       style={{
          //                         width: "30% !important",
          //                         height: "100% !important",
          //                       }}
          //                       class="table-box"
          //                     >
          //                       {row[_]}
          //                     </td>
          //                   );
          //                 }
          //               })}
          //             </tr>
          //           </table>
          //         ),
          //         attrs: {},
          //       };
          //       return obj;
          //     },
          //   },
          // ],
          // customRender: value => {
          //   const obj = {
          //     children: value,
          //     attrs: {},
          //   };
          //   return obj;
          // },
          ellipsis: false,
          formType: "ldq-isUpload",
          info_show: true,
          edit_show: true,
          add_show: true,
          is_Editable: true,
        },
        // {
        //   title: "文件",
        //   colSpan: 0,
        //   dataIndex: "fileName",
        //   scopedSlots: { customRender: "fileName" },
        //   customRender: (value, row) => {
        //     const obj = {
        //       children: <a href={row.filePath}>{value}</a>,
        //       attrs: {},
        //     };
        //     return obj;
        //   },
        // },
        // {
        //   title: "xinxi",
        //   colSpan: 0,
        //   dataIndex: "filePath",
        //   scopedSlots: { customRender: "filePath" },
        //   customRender: (value, row) => {
        //     row;
        //     const array = [
        //       "name",
        //       "scope",
        //       "source",
        //       "subject",
        //       "publication",
        //       "include",
        //       "page",
        //     ];
        //     const realarray = array.filter(_ => {
        //       return row[_] !== undefined && row[_] !== null;
        //     });
        //     const obj = {
        //       children: (
        //         <table
        //           class="table-line"
        //           style={{
        //             display: "block",
        //             width: "100%",
        //             height: "100%",
        //             justifyContent: "space-between",
        //             padding: "0rpx 30rpx",
        //           }}
        //         >
        //           <tr
        //             style={{
        //               display: "block",
        //               width: "100%",
        //               height: "100%",
        //               justifyContent: "space-around",
        //               padding: "0rpx 30rpx",
        //             }}
        //           >
        //             {realarray.map(_ => {
        //               if (row[_] !== undefined && row[_] !== null) {
        //                 return (
        //                   <td
        //                     style={{
        //                       width: "30% !important",
        //                       height: "100% !important",
        //                     }}
        //                     class="table-box"
        //                   >
        //                     {row[_]}
        //                   </td>
        //                 );
        //               }
        //             })}
        //           </tr>
        //         </table>
        //       ),
        //       attrs: {},
        //     };
        //     return obj;
        //   },
        // },
        // {
        //   title: "二级部门审核状态/说明",
        //   dataIndex: "length",
        //   scopedSlots: { customRender: "length" },
        //   customRender: (value, row) => {
        //     const obj = {
        //       children: `${row.length}-${row.item_number}`,
        //       attrs: {},
        //     };
        //     return obj;
        //   },
        // },

        {
          title: "二级审核状态/说明",
          dataIndex: "secondarySectorExamineType",
          key: "secondarySectorExamineType",
          customRender: (value, row) => {
            const obj = {
              children: (
                      <a-table
                              class="rowStyle"
                              showHeader={false}
                              id="link-table"
                              pagination={false}
                              columns={[
                                {
                                  title: "教师id",
                                  dataIndex: "secondarySectorExamineType",
                                  width: 100,
                                  scopedSlots: { customRender: "secondarySectorExamineType" },
                                  customRender: (value, row) => {
                                    var arr = [];
                                    var color = "";
                                    if (row.secondarySectorExamineType === 2) {
                                      color = "red";
                                      arr = [
                                        getInfo(type1[row.secondarySectorExamineType]),
                                        row.secondarySectorExamineNote
                                                ? row.secondarySectorExamineNote
                                                : "空",
                                      ].join(" / ");
                                    } else if (row.secondarySectorExamineType === 1) {
                                      color = "green";
                                      arr = getInfo(type1[row.secondarySectorExamineType]);
                                    } else {
                                      arr = getInfo(type1[0]);
                                    }
                                    const obj = {
                                      children: <p style={{ color: color }}>{arr}</p>,
                                      attrs: {},
                                    };
                                    return obj;
                                  },
                                },
                              ]}
                              data-source={[
                                {
                                  secondarySectorExamineType: value,
                                  secondarySectorExamineNote: row.secondarySectorExamineNote,
                                },
                              ]}
                              bordered
                              size="small"
                      />
              ),
              attrs: {},
            };
            return obj;
          },
        },
        {
          title: "职能审核状态/说明",
          dataIndex: "functionExamineType",
          key: "functionExamineType",
          customRender: (value, row) => {
            const obj = {
              children: (
                      <a-table
                              class="rowStyle"
                              showHeader={false}
                              id="link-table"
                              pagination={false}
                              columns={[
                                {
                                  title: "教师id",
                                  dataIndex: "functionExamineType",
                                  width: 100,
                                  scopedSlots: { customRender: "functionExamineType" },
                                  customRender: (value, row) => {
                                    var arr = [];
                                    var color = "";
                                    if (row.functionExamineType === 2) {
                                      color = "red";
                                      arr = [
                                        getInfo(type2[row.functionExamineType]),
                                        row.functionExamineNote
                                                ? row.functionExamineNote
                                                : "空",
                                      ].join(" / ");
                                    } else if (row.functionExamineType === 1) {
                                      color = "green";
                                      arr = getInfo(type2[row.functionExamineType]);
                                    } else {
                                      arr = getInfo(type2[0]);
                                    }
                                    const obj = {
                                      children: <p style={{ color: color }}>{arr}</p>,
                                      attrs: {},
                                    };
                                    return obj;
                                  },
                                },
                              ]}
                              data-source={[
                                {
                                  functionExamineType: value,
                                  functionExamineNote: row.functionExamineNote,
                                },
                              ]}
                              bordered
                              size="small"
                      />
              ),
              attrs: {},
            };
            return obj;
          },
        },
        // {
        //   title: "职能审核状态/说明",
        //   dataIndex: "functionExamineType",
        //   key: "functionExamineType",
        //   customRender: value => {
        //     const obj = {
        //       children: (
        //         <a-table
        //           class="rowStyle"
        //           showHeader={false}
        //           id="link-table"
        //           pagination={false}
        //           columns={[
        //             {
        //               title: "教师id",
        //               dataIndex: "functionExamineType",
        //               width: 100,
        //               scopedSlots: { customRender: "functionExamineType" },
        //               customRender: (value, row) => {
        //                 var arr = [];
        //                 var color = "";
        //                 if (row.functionExamineType === 2) {
        //                   color = "red";
        //                   arr = [
        //                     getInfo(type1[row.functionExamineType]),
        //                     row.functionExamineNote
        //                       ? row.functionExamineNote
        //                       : "空",
        //                   ].join(" / ");
        //                 } else if (row.functionExamineType === 1) {
        //                   color = "green";
        //                   arr = getInfo(type1[row.functionExamineType]);
        //                 } else {
        //                   arr = getInfo(type1[0]);
        //                 }
        //                 const obj = {
        //                   children: <p style={{ color: color }}>{arr}</p>,
        //                   attrs: {},
        //                 };
        //                 return obj;
        //               },
        //             },
        //           ]}
        //           data-source={[{ functionExamineType: value }]}
        //           bordered
        //           size="small"
        //         />
        //       ),
        //       attrs: {},
        //     };
        //     return obj;
        //   },
        // },
        // {
        //   title: "审核状态/说明",
        //   dataIndex: "secondarySectorExamineType",
        //   scopedSlots: { customRender: "secondarySectorExamineType" },
        //   children: [
        //     {
        //       title: "二级",
        //       dataIndex: "secondarySectorExamineType",
        //       key: "secondarySectorExamineType",
        //       customRender: (value, row) => {
        //         var color = "";
        //         if (row.secondarySectorExamineType === 2) {
        //           color = "red";
        //         }
        //         if (row.secondarySectorExamineType === 1) {
        //           color = "green";
        //         }
        //         const arr = [
        //           getInfo(type1[row.secondarySectorExamineType]),
        //           row.secondarySectorExamineNote
        //             ? row.secondarySectorExamineNote
        //             : "空",
        //         ].join(" / ");
        //         const obj = {
        //           children: (
        //             <span style={{ color: color, minWidth: "50px" }}>{arr}</span>
        //           ),
        //           attrs: {},
        //         };
        //         return obj;
        //       },
        //     },
        //     {
        //       title: "职能",
        //       dataIndex: "functionExamineType",
        //       scopedSlots: { customRender: "functionExamineType" },
        //       customRender: (value, row) => {
        //         var color = "";
        //         if (row.functionExamineType === 2) {
        //           color = "red";
        //         }
        //         if (row.functionExamineType === 1) {
        //           color = "green";
        //         }
        //         // console.log(color);
        //         // console.log(color);
        //         const arr = [
        //           getInfo(type2[row.functionExamineType]),
        //           row.functionExamineNote ? row.functionExamineNote : "空",
        //         ].join(" / ");
        //         const obj = {
        //           children: <span style={{ color: color }}>{arr}</span>,
        //           attrs: {},
        //         };
        //         return obj;
        //       },
        //     },
        //   ],
        // customRender: (value, row) => {
        //   var color = "";
        //   if (row.secondarySectorExamineType === 2) {
        //     color = "red";
        //   }
        //   if (row.secondarySectorExamineType === 1) {
        //     color = "green";
        //   }
        //   const arr = [
        //     getInfo(type1[row.secondarySectorExamineType]),
        //     row.secondarySectorExamineNote
        //       ? row.secondarySectorExamineNote
        //       : "空",
        //   ].join(" / ");
        //   const obj = {
        //     children: <span style={{ color: color }}>{arr}</span>,
        //     attrs: {},
        //   };
        //   return obj;
        // },
        // },
        // {
        //   title: "职能部门审核状态",
        //   dataIndex: "functionExamineType",
        //   scopedSlots: { customRender: "functionExamineType" },
        //   customRender: (value, row) => {
        //     var color = "";
        //     if (row.functionExamineType === 2) {
        //       color = "red";
        //     }
        //     if (row.functionExamineType === 1) {
        //       color = "green";
        //     }
        //     // console.log(color);
        //     // console.log(color);
        //     const arr = [
        //       getInfo(type2[row.functionExamineType]),
        //       row.functionExamineNote ? row.functionExamineNote : "空",
        //     ].join(" / ");
        //     const obj = {
        //       children: <span style={{ color: color }}>{arr}</span>,
        //       attrs: {},
        //     };
        //     return obj;
        //   },
        // },
        // {
        //   title: "具体条件等级",
        //   dataIndex: "level",
        //   scopedSlots: { customRender: "level" },

        //   ellipsis: false,

        //   formType: "ldq-input",
        //   info_show: true,
        //   edit_show: true,
        //   add_show: true,
        //   is_Editable: true,
        //   rule: [
        //     {
        //       required: true,
        //       message: "请填写具体条件等级",
        //       trigger: "blur",
        //     },
        //   ],
        //   placeholder: "请填写具体条件等级",
        // },
        // {
        //   title: "填写经费",
        //   dataIndex: "money",
        //   scopedSlots: { customRender: "money" },
        //
        //
        //
        //   formType: "ldq-money",
        //   info_show: true,
        //   edit_show: true,
        //   add_show: true,
        //   is_Editable: true,
        //   rule: [
        //     {
        //       required: true,
        //       message: "请输入经费",
        //       trigger: "blur",
        //     },
        //   ],
        //   placeholder: "请输入经费",
        // },
        // {
        //   title: "描述",
        //   dataIndex: "description",
        //   scopedSlots: { customRender: "description" },
        //   colSpan: 0,
        //   customRender: value => {
        //     const obj = {
        //       children: value,
        //       attrs: {
        //         colSpan: 0,
        //       },
        //     };
        //     return obj;
        //   },
        //   ellipsis: false,
        //   formType: "ldq-ms",
        //   info_show: true,
        //   edit_show: true,
        //   add_show: true,
        //   is_Editable: true,
        //   rule: [
        //     {
        //       required: true,
        //       message: "请填写描述",
        //       trigger: "blur",
        //     },
        //   ],
        //   placeholder: "请填写描述",
        // },
        // {
        //   title: "业绩状态",
        //   dataIndex: "isUpload",
        //   scopedSlots: { customRender: "isUpload" },
        //   ellipsis: false,
        //   formType: "ldq-isUpload",
        //   info_show: true,
        //   edit_show: true,
        //   add_show: true,
        //   is_Editable: true,
        //   rule: [
        //     {
        //       required: true,
        //       message: "请填写描述",
        //       trigger: "blur",
        //     },
        //   ],
        //   placeholder: "请填写描述",
        // },
        // {
        //   title: "文件名",
        //   dataIndex: "fileName",
        //   scopedSlots: { customRender: "fileName" },

        //   ellipsis: false,

        //   formType: "ldq-href",
        //   info_show: true,
        //   edit_show: true,
        //   add_show: true,
        //   is_Editable: true,
        //   rule: [
        //     {
        //       required: true,
        //       message: "请选择开始时间",
        //       trigger: "blur",
        //     },
        //   ],
        //   placeholder: "请选择开始时间",
        // },
        // {
        //   title: "文件地址",
        //   dataIndex: "filePath",
        //   scopedSlots: { customRender: "filePath" },
        //   colSpan: 0,
        //   customRender: value => {
        //     const obj = {
        //       children: value,
        //       attrs: {
        //         colSpan: 0,
        //       },
        //     };
        //     return obj;
        //   },

        //   ellipsis: false,

        //   formType: "ldq-href",
        //   info_show: false,
        //   edit_show: true,
        //   add_show: true,
        //   is_Editable: false,
        //   rule: [
        //     {
        //       required: true,
        //       message: "请选择开始时间",
        //       trigger: "blur",
        //     },
        //   ],
        //   placeholder: "请选择开始时间",
        // },

        // {
        //   title: "科技成果",
        //   dataIndex: "chooseResearch",
        //   scopedSlots: { customRender: "chooseResearch" },
        //   colSpan: 0,
        //   customRender: value => {
        //     const obj = {
        //       children: value,
        //       attrs: {
        //         colSpan: 0,
        //       },
        //     };
        //     return obj;
        //   },
        //   ellipsis: false,
        //   formType: "ldq-table",
        //   info_show: true,
        //   edit_show: true,
        //   add_show: true,
        //   is_Editable: true,
        // },
        {
          title: "操作",
          dataIndex: "caozuo",
          scopedSlots: { customRender: "action" },
          // 是否在详情页展示
          info_show: false,
          // 是否在编辑页展示
          edit_show: false,
          add_show: false,
        },
      ];
      return {
        isUpload: {
          0: "未提交",
          1: "已提交",
          2: "未通过",
          3: "已通过",
        },
        rules,
        COLUMNS: getCOLUMNS(COLUMNS),
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
        loading: false,
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
          // 项目列表
          projectInfo: [],
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
        functionExamineType: -1,
        secondarySectorExamineType: -1,
        loaging: false,
      };
    },
    computed: {
      desc() {
        return this.$t("pageDesc");
      },
    },
    async mounted() {
      await XHR.Axios_$$getTeacherApplyRateInfo({
        rankReviewId: this.$route.query.rankReviewId,
        sid: this.$route.query.teacherSid,
      }).then(_ => {
        if (_.data.info.all === 4) {
          this.is_ok = true;
          Cookie.set("is_ok", true);
          this.current = _.data.info.performanceCriteria - 1;
        } else {
          Cookie.set("is_ok", false);
        }
        // if (_.data.info.all === 3) {
        if ("performanceCriteriaId" in this.$route.query) {
          this.getList();
        } else {
          XHR.Axios_$$getTeacherApplyInfo({
            rankReviewId: this.$route.query.rankReviewId,
            sid: this.$route.query.teacherSid,
          }).then(_ => {
            this.performanceCriteriaId =
                    _.data.info.teacherApply.performanceCriteriaId;
            this.getList(_.data.info.teacherApply.performanceCriteriaId);
          });
          // }
        }
      });
    },
    methods: {
      async getList() {
        Cookie.set("is_ok", false);
        this.loading = true;
        var status = {
          functionExamineType: undefined,
          secondarySectorExamineType: undefined,
        };
        if (this.secondarySectorExamineType !== -1) {
          status.secondarySectorExamineType = this.secondarySectorExamineType;
        }
        if (this.functionExamineType !== -1) {
          status.functionExamineType = this.functionExamineType;
        }
        await XHR.Axios_$$searchTeacherInputRankReviewList({
          page: 1,
          line: 1000,
          teacherId: this.$route.query.teacherId,
          rankReviewId: this.$route.query.rankReviewId,
          performanceCriteriaId:
                  this.$route.query.performanceCriteriaId || this.performanceCriteriaId,
          functionExamineType: status.functionExamineType,
          secondarySectorExamineType: status.secondarySectorExamineType,
        }).then(async _ => {
          var arr = [];
          let index = 0;
          await _.data.info.list.forEach(async item => {
            // var rowspan = 0;
            var __ = item;
            __.length = 0;
            var arr1 = [];
            var arr2 = [];
            var arr3 = [];
            await item.chooseCompetition.forEach(r => {
              arr1.push({ ...r });
              __.length++;
            });
            await item.chooseProject.forEach(r => {
              arr2.push({ ...r });
              __.length++;
            });
            await item.chooseResearch.forEach(r => {
              arr3.push({ ...r });
              __.length++;
            });
            const _arr = [...arr1, ...arr2, ...arr3];
            if (_arr.length && item.description) {
              __._money = __.money;
              delete __.money;
              __._level = __.level;
              delete __.level;
              __.length++;
              arr.push({
                ...__,
                item_number: 0,
                index: (index += 1),
                is_description: (index--, true),
              });
              await _arr.forEach((_a, ind) => {
                arr.push({
                  ..._a,
                  ...__,
                  item_number: ind + 1,
                  index: ind === 0 ? (index += 1) : index,
                  is_description: false,
                });
              });
            } else if (_arr.length && !item.description) {
              __._money = __.money;
              delete __.money;
              __._level = __.level;
              delete __.level;
              await _arr.forEach((_a, ind) => {
                arr.push({
                  ..._a,
                  ...__,
                  item_number: ind,
                  index: ind === 0 ? (index += 1) : index,
                  is_description: false,
                });
              });
            } else {
              __.length = 1;
              __._money = __.money;
              delete __.money;
              __._level = __.level;
              delete __.level;
              arr.push({
                ...__,
                item_number: 0,
                index: (index += 1),
                is_description: true,
              });
            }
            // if (_arr.length) {
            //   await _arr.forEach((_a, ind) => {
            //     __._money = __.money;
            //     delete __.money;
            //     __._level = __.level;
            //     delete __.level;
            //     arr.push({
            //       ...__,
            //       ..._a,
            //       item_number: ind,
            //       index: ind === 0 ? (index += 1) : index,
            //     });
            //   });
            // } else {
            //   __.length = 1;
            //   __._money = __.money;
            //   delete __.money;
            //   arr.push({
            //     ...__,
            //     item_number: 0,
            //     index: (index += 1),
            //   });
            // }
          });
          this.dataSource = await arr;
          this.tableData = await arr;
          this.loading = false;
          console.log(this.tableData);
        });
      },
      async openmodal() {
        this.new_model = {
          loading: false,
          visible: false,
          type: "Add",
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
          // 休眠
          projectInfo: [],
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
            // console.log(
            //   this.new_model.formType.competitionInfo.min,
            //   this.new_model.record["competitionInfo"]
            // );
            // console.log(
            //   this.new_model.formType.researchInfo.min,
            //   this.new_model.record["researchInfo"]
            // );
            // console.log(
            //   this.new_model.formType.projectInfo.min,
            //   this.new_model.record["projectInfoId"]
            // );
            // 验证是否全了
            if (this.new_model.formType.inputDescribe) {
              if (this.new_model.formType.competitionInfo.min) {
                if (
                        this.new_model.record["competitionInfo"] !== undefined &&
                        this.new_model.record["competitionInfo"].length <
                        this.new_model.formType.competitionInfo.min
                ) {
                  return this.$message.warn(
                          `比赛数不得少于最小数量： ${this.new_model.formType.competitionInfo.min}个`
                  );
                }
              }
              if (this.new_model.formType.researchInfo.min) {
                if (
                        this.new_model.record["researchInfo"] !== undefined &&
                        this.new_model.record["researchInfo"].length <
                        this.new_model.formType.researchInfo.min
                ) {
                  return this.$message.warn(
                          `科技数不得少于最小数量： ${this.new_model.formType.researchInfo.min}个`
                  );
                }
                // console.log("researchInfo");
              }
              if (this.new_model.formType.projectInfo.min) {
                if (
                        this.new_model.record["projectInfo"] !== undefined &&
                        this.new_model.record["projectInfo"].length <
                        this.new_model.formType.projectInfo.min
                ) {
                  return this.$message.warn(
                          `项目数不得少于最小数量： ${this.new_model.formType.projectInfo.min}个`
                  );
                }
                // console.log("projectInfo");
              }
            }
            this.new_model.record.teacherApplyRankId = this.$route.query.teacherApplyRankId;
            // console.log("record", this.new_model.record);
            let formData = new FormData();
            // for (let key in this.new_model.record) {
            //   console.log(key, this.new_model.record[key]);
            //   formData.append(key, this.new_model.record[key]);
            // }
            // console.log(Cookie.get("Authorization"));
            formData.append("token", Cookie.get("Authorization"));
            formData.append("type", Cookie.get("type"));
            // formData.append("file", this.new_model.record.file);
            for (let key in this.new_model.record) {
              formData.append(`info[${key}]`, this.new_model.record[key]);
            }
            for (let key in this.new_model.record.researchInfo) {
              // console.log(key);
              formData.append(
                      `info[researchInfo][${key}][typeId]`,
                      this.new_model.record.researchInfo[key].typeId
              );
              formData.append(
                      `info[researchInfo][${key}][infoId]`,
                      this.new_model.record.researchInfo[key].infoId
              );
            }
            for (let key in this.new_model.record.projectInfo) {
              // console.log(key);
              formData.append(
                      `info[projectInfo][${key}][typeId]`,
                      this.new_model.record.projectInfo[key].typeId
              );
              formData.append(
                      `info[projectInfo][${key}][infoId]`,
                      this.new_model.record.projectInfo[key].infoId
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
                this.new_model.confirmLoading = true;
                // console.log("formData", formData);
                // console.log("formData.values()", formData.values());
                XHR.Axios_$$teacherInputRankReview(formData).then(() => {
                  // console.log(_);
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
                      projectInfo: [],
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
            // console.log("====================================");
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
          XHR.Axios_$$searchTeacherInputRankReviewInfo({
            id: record.id,
            // level: record.level,
          }).then(_ => {
            this.detail_model_data = {
              visible: true,
              tableTitle: `详情`,
              width: 1200,
              type: option,
              columns: this.columns,
              record: { ..._.data.info },
            };
          });
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
            projectInfo: [],
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
              projectInfo: record.chooseProject,
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
              for (let key in this.new_model.record.projectInfo) {
                console.log(key);
                formData.append(
                        `info[projectInfo][${key}][typeId]`,
                        this.new_model.record.projectInfo[key].typeId
                );
                formData.append(
                        `info[projectInfo][${key}][infoId]`,
                        this.new_model.record.projectInfo[key].infoId
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
              formData.append(
                      `info[teacherApplyRankId]`,
                      this.$route.query.teacherApplyRankId
              );
              // formData.append("info", JSON.stringify(this.new_model.record));
              this.$refs.jtyqForm.validate(valid => {
                if (valid) {
                  this.new_model.confirmLoading = true;
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
                        projectInfo: [],
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
        // 清空form
        if (
                this.new_model.record.money !== undefined &&
                this.new_model.record.money !== null
        ) {
          this.new_model.record["money"] = undefined;
        }
        if (
                this.new_model.record.description !== undefined &&
                this.new_model.record.description !== null
        ) {
          this.new_model.record["description"] = undefined;
        }
        if (
                this.new_model.record.file !== undefined &&
                this.new_model.record.file !== null
        ) {
          this.new_model.record["file"] = undefined;
          this.new_model.fileList.length = 0;
        }
        for (let a = 0; a < 20; a++) {
          if (this.new_model.record["projectInfoId"]) {
            this.new_model.record["projectInfoId"].pop();
          }
          if (this.new_model.record["researchInfoId"]) {
            this.new_model.record["researchInfoId"].pop();
          }
          if (this.new_model.record["competitionId"]) {
            this.new_model.record["competitionId"].pop();
          }
        }
        this.new_model.record.requireId = id;
        this.new_model.record.level = level;
        this.new_model.loading = true;
        await XHR.Axios_$$searchSinglePerformanceRequireInfo({
          id,
          level,
        }).then(_ => {
          // console.log(_.data.info);
          this.new_model.formType = _.data.info;
          this.new_model.limitList = {
            researchInfo: 0,
            competitionInfo: 0,
            projectInfo: 0,
          };
          const limitList1 = [];
          // if (_.data.info.researchInfo.limitList) {
          if (_.data.info.pullResearch) {
            this.new_model.limitList["researchInfo"] =
                    _.data.info.researchInfo.min;
            _.data.info.researchInfo.limitList.forEach(item => {
              limitList1.push({
                researchInfoLevel: item.researchLevel,
                researchInfoType: item.researchType,
              });
            });
          }
          const limitList2 = [];
          // if (_.data.info.competitionInfo.limitList) {
          if (_.data.info.pullCompetition) {
            this.new_model.limitList["competitionInfo"] =
                    _.data.info.competitionInfo.min;
            _.data.info.competitionInfo.limitList.forEach(item => {
              limitList2.push({
                competitionLevel: item.competitionLevel,
                competitionType: item.competitionType,
              });
            });
          }
          const limitList3 = [];
          // if (_.data.info.projectInfo.limitList) {
          if (_.data.info.pullProject) {
            this.new_model.limitList["projectInfo"] = _.data.info.projectInfo.min;
            _.data.info.projectInfo.limitList.forEach(item => {
              limitList3.push({
                projectLevel: item.projectLevel,
                projectType: item.projectType,
              });
            });
          }
          if (limitList1.length) {
            XHR.Axios_$$searchKjcDataByTypeLevel({
              limitList: limitList1,
              limitFunction: 1,
            }).then(__ => {
              console.log(__.data.info.list);
              this.new_model.researchInfo = __.data.info.list;
              this.$forceUpdate();
            });
          }
          if (limitList2.length) {
            XHR.Axios_$$searchCxxyDateByTypeLevel({
              limitList: limitList2,
              limitFunction: 1,
            }).then(__ => {
              console.log(__.data.info.list);
              this.new_model.competitionInfo = __.data.info.list;
              this.$forceUpdate();
            });
          }
          if (limitList3.length) {
            XHR.Axios_$$searchJwcDateByTypeLevel({
              limitList: limitList3,
              limitFunction: 1,
            }).then(__ => {
              console.log(__.data.info.list);
              this.new_model.projectInfo = __.data.info.list;
              this.$forceUpdate();
            });
          }
        });
        this.new_model.loading = false;
      },
      handleTree(record, level) {
        console.log(record, level);
      },
      sh() {
        XHR.Axios_$$uploadTeacherInputRankReview({
          rankReviewId: this.$route.query.rankReviewId,
        }).then(_ => {
          if (_.data.state === 1) {
            this.tableData.forEach(_ => (_.status = "审核中"));
            this.is_ok = !this.is_ok;
          }
        });
      },
      deleteRecord(record) {
        XHR.Axios_$$deleteTeacherInputRankReview({
          id: record.id,
          performanceCriteriaId:
                  this.$route.query.performanceCriteriaId || this.performanceCriteriaId,
        }).then(() => {
          // console.log(_);
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
        // console.log(value);
        const arr = [];
        value.forEach(_ => {
          this.new_model[type].forEach(__ => {
            // console.log(__);
            if (__.infoId == _) {
              arr.push(__);
            }
          });
        });
        // console.log(arr);
        this.new_model.record[type] = arr;
      },
      getRowF(record) {
        return (
                record.chooseResearch.length +
                record.chooseProject.length +
                record.chooseCompetition.length
        );
      },
      getProChooseList(record) {
        // console.log([
        //   ...record.chooseResearch,
        //   ...record.chooseProject,
        //   ...record.chooseCompetition,
        // ]);
        return [
          ...record.chooseResearch,
          ...record.chooseProject,
          ...record.chooseCompetition,
        ];
      },
      handleSelect(value, key) {
        this[key] = value;
        console.log(this[key]);
        this.pagination = {
          pageSizeOptions: ["10"],
          current: 1,
          pageSize: 10,
          total: undefined,
        };
        this.getList();
      },
    },
  };
</script>

<style scoped lang="less">
  .table-table {
    width: 100%;
    height: 100%;
    display: inline-grid;
    justify-content: stretch;
    lign-content: stretch;
    grid-template-columns: 50px 50px 50px;
    grid-template-rows: 50px 50px 50px;
  }
  .description {
  }
  .filePath {
  }
  .box {
    display: grid;
    justify-content: stretch;
    lign-content: stretch;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  .line {
  }
  // .table-list {
  //   width: 100%;
  //   tr {
  //     width: 100%;
  //   }
  //   td {
  //     padding: 5px;
  //   }
  // }
  // .table-table {
  //   margin: -8px -10px;
  //   height: 100%;
  //   background-color: grey;
  //   display: flex;
  //   justify-content: space-around;
  //   text-align: center;
  //   .table-description {
  //     width: 100%;
  //     display: flex;
  //     text-align: center;
  //     background-color: red;
  //   }
  //   .table-filePath {
  //     width: 100%;
  //     min-width: 10%;
  //     display: flex;
  //     text-align: center;
  //     background-color: rebeccapurple;
  //   }
  //   .table-right {
  //     width: 100%;
  //     min-width: 10%;
  //     background-color: saddlebrown;
  //     height: 60px;
  //     .table-line {
  //       background-color: green;
  //       .table-box {
  //         background-color: orange;
  //       }
  //     }
  //   }
  // }
  // .container {
  //   background-color: red;
  //   display: grid;
  //   grid-template-columns: 1fr 1fr 1fr 1fr;
  //   grid-template-rows: 1fr 1fr 1fr;
  //   grid-auto-columns: 1fr 1fr 1fr 1fr;
  //   grid-auto-rows: 1fr;
  //   gap: 0px 0px;
  //   grid-auto-flow: row;
  //   justify-items: end;
  //   grid-template-areas:
  //     "path asd . ."
  //     "path asd asdasd asdasd"
  //     "path asd . .";
  // }

  // .path {
  //   display: grid;
  //   background-color: gray;
  //   grid-template-columns: 1fr 1fr 1fr;
  //   grid-template-rows: 1fr 1fr 1fr;
  //   gap: 0px 0px;
  //   grid-auto-flow: row;
  //   grid-template-areas:
  //     ". . ."
  //     ". . ."
  //     ". . .";
  //   grid-area: path;
  // }

  // .asd {
  //   background-color: saddlebrown;
  //   display: grid;
  //   grid-template-columns: 1fr 1fr 1fr;
  //   grid-template-rows: 1fr 1fr 1fr;
  //   gap: 0px 0px;
  //   grid-auto-flow: row;
  //   grid-template-areas:
  //     ". . ."
  //     ". . ."
  //     ". . .";
  //   grid-area: asd;
  // }

  // .asdasd {
  //   background-color: rgb(161, 149, 140);
  //   display: grid;
  //   grid-template-columns: 1fr 1fr 1fr;
  //   grid-template-rows: 1fr 1fr 1fr;
  //   gap: 0px 0px;
  //   grid-auto-flow: row;
  //   grid-template-areas:
  //     ". . ."
  //     ". . ."
  //     ". . .";
  //   grid-area: asdasd;
  // }
  .table-line {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .table-box {
    border: 1px solid #f0f0f0;
    padding: 20px;
  }

  #link-table {
    // display: flex !important;
    // align-items: center !important;
    // justify-content: space-around;
    // 给.ant-table设置最低高度
    /deep/.ant-empty-normal {
      // margin: 1.9% 0 !important;
    }

    // 当表格数据为空时，修改.ant-empty-normal样式，会撑高空白样式
    /deep/.ant-table-content {
      // min-height: 100% !important;
      border: 0;
    }
    /deep/.ant-table {
      min-height: 100% !important;
      border: 0;
    }
    /deep/ tr {
      // border: 0;
      // height: 100% !important;
      // height: 1px !important;
      // line-height: 1px !important;
      padding: 0px !important;
    }
    /deep/ td {
      // background: rgb(221, 221, 221);
      // border: 0;
      // height: 1px !important;
      text-align: center;
      // line-height: 30px !important;
      padding: 1px !important;
    }
    /deep/ th {
      // border: 0;
      // height: 1px !important;
      // line-height: 1px !important;
      padding: 0px !important;
    }
    /deep/ .ant-table-tbody {
      // border: 0;
      padding: 0px !important;
    }
  }
  .table-td {
    /deep/ td {
      // background: rgb(160, 160, 160);
      // padding: 0px !important;
    }
  }
  /deep/ .ant-table-tbody > tr > td {
    // padding: 0px !important;
  }
  th.description,
  td.description {
    padding: 0px !important;
    // text-align: right !important;
  }
  td {
    padding: 1px !important;
    text-align: center !important;
  }
</style>
