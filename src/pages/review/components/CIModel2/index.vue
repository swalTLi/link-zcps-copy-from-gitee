<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :width="width"
      :destroyOnClose="true"
    >
      <a-space class="operator" align="baseline">
        <a-button type="primary" @click="opendetailmodal('Add')"
          >新建具体要求</a-button
        >
      </a-space>
      <a-table
        :data-source="dataSource"
        rowKey="id"
        style="margin-top:20px;"
        :scroll="{ y: 650 }"
        :pagination="false"
      >
        <a-table-column key="ids" title="id" data-index="id" width="80px" />
        <!-- 具体要求序号 -->
        <a-table-column
          key="name"
          title="序号"
          data-index="name"
          width="80px"
        />
        <a-table-column
          key="requireLevelOne"
          title="详情"
          data-index="requireLevelOne"
        >
          <template slot-scope="text, record">
            <div
              v-for="(One, numo) in record.requireLevelOne"
              :key="'tree' + One.id"
            >
              <div style="font-size:14px;">
                {{ numo + 1 + "：" + One.line }}
              </div>
            </div>
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作" width="150px">
          <template slot-scope="text, record, index">
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
              @confirm="opendetailmodal('Del', record, index, 1)"
            >
              <a style="margin-right: 8px">
                <a-icon :component="svg_delete" /> 删除
              </a>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
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
      <template slot="footer">
        <div v-if="type === 'Info'">
          <a-button key="back" @click="handleCancel">
            返回
          </a-button>
          <a-button type="primary" @click="handleCancel">
            完成
          </a-button>
        </div>
        <div v-if="type === 'Edit' || type === 'Add'"></div>
      </template>
    </a-modal>
    <!-- 新建编辑具体要求 -->
    <a-modal
      :title="CI_model.tableTitle"
      :visible="CI_model.visible"
      :confirm-loading="CI_model.confirmLoading"
      @ok="CI_model.handleOk()"
      @cancel="CI_model.visible = false"
      :width="CI_model.width"
      :destroyOnClose="true"
    >
      <a-space class="operator" align="baseline">
        <label>序号：</label><a-input v-model="CI_model.record.name" />
        <a-button type="primary" @click="saveIndex">保存序号</a-button>
      </a-space>
      <br />
      <a-space class="operator" align="baseline" style="margin-top:20px;">
        <a-button type="primary" @click="treeOption('Add', record, 0, 1)"
          >新建一级具体要求</a-button
        >
      </a-space>
      <a-table
        :data-source="CI_model.record.requireLevelOne"
        style="margin-top:20px;"
        rowKey="id"
      >
        <a-table-column key="id" title="序号" data-index="id">
          <template slot-scope="text, record, index">
            {{ index + 1 }}
          </template>
        </a-table-column>
        <a-table-column
          key="requireLevelOne"
          title="详情"
          data-index="requireLevelOne"
        >
          <template slot-scope="text, record">
            <span>
              <div style="font-size: 14px;width: 80%;">
                {{ record.line }}
              </div>
              <div
                v-for="(Two, tindex) in record.requireLevelTwo"
                :key="'childrens' + Two.id"
                style="font-size: 12px;width: 100%;"
              >
                <div style="display: flex;justify-content:space-between;">
                  <div style="">
                    {{ (tindex + 1).toString() + "）" + Two.line }}
                  </div>
                  <div>
                    <a
                      style="margin-right: 8px"
                      @click="treeOption('Edit', Two, tindex, 2, record)"
                    >
                      编辑
                    </a>
                    <a-popconfirm
                      title="确认删除？"
                      ok-text="删除"
                      cancel-text="取消"
                      @confirm="treeOption('Del', Two, tindex, 2)"
                    >
                      <a style="margin-right: 8px">
                        删除
                      </a>
                    </a-popconfirm>
                  </div>
                </div>
              </div>
            </span>
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作" data-index="action">
          <template slot-scope="text, record, index">
            <div style="width:300px;">
              <a
                style="margin-right: 8px"
                @click="treeOption('Add', record, index, 2, record)"
              >
                <a-icon :component="svg_add" /> 新建二级具体要求
              </a>
              <a
                style="margin-right: 8px"
                @click="treeOption('Edit', record, index, 1, record)"
              >
                <a-icon :component="svg_edit" /> 编辑
              </a>
              <a-popconfirm
                title="确认删除？"
                ok-text="删除"
                cancel-text="取消"
                @confirm="treeOption('Del', record, index, 1, record)"
              >
                <a style="margin-right: 8px">
                  <a-icon :component="svg_delete" /> 删除
                </a>
              </a-popconfirm>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </a-modal>
    <!-- 要求编辑 -->
    <a-modal
      :visible="level_model.visible"
      :title="level_model.tableTitle"
      :confirm-loading="level_model.confirmLoading"
      @ok="level_model.handleOk()"
      @cancel="level_model.visible = false"
      :width="1300"
      :destroyOnClose="true"
    >
      <a-form-model
        ref="jtyqForm"
        :model="level_model.record"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        money
        teacherType
        :rules="{
          line: [
            {
              required: true,
              message: '请填写完整',
              trigger: 'blur',
            },
          ],
          departmentId: [
            {
              required: true,
              message: '请填写完整',
              trigger: 'blur',
            },
          ],
          teacherType: [
            {
              required: true,
              message: '请填写完整',
              trigger: 'blur',
            },
          ],
          money: [
            {
              required: true,
              message: '请填写完整',
              trigger: 'blur',
            },
          ],
          inputAttach: [
            {
              required: true,
              message: '请填写完整',
              trigger: 'blur',
            },
          ],
          inputDescribe: [
            {
              required: true,
              message: '请填写完整',
              trigger: 'blur',
            },
          ],
          pullCompetition: [
            {
              required: true,
              message: '请填写完整',
              trigger: 'blur',
            },
          ],
          pullResearch: [
            {
              required: true,
              message: '请填写完整',
              trigger: 'blur',
            },
          ],
          pullProject: [
            {
              required: true,
              message: '请填写完整',
              trigger: 'blur',
            },
          ],
        }"
      >
        <a-form-model-item label="要求内容" prop="line">
          <a-textarea v-model="level_model.record.line" />
        </a-form-model-item>
        <a-form-model-item label="审批部门" prop="departmentId">
          <a-select
            v-model="level_model.record.departmentId"
            placeholder="请选择职能部门"
          >
            <a-select-option
              v-for="item in level_model.znbm"
              :key="item.name"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="教师类型" style="display:flex">
          <!-- <a-radio-group
            v-model="level_model.record.teacherType"
            :defaultValue="0"
          >
            <a-row>
              <a-col :span="8">
                <a-radio :value="0">
                  无
                </a-radio>
              </a-col>
              <a-col :span="8">
                <a-radio :value="1">
                  教学型
                </a-radio>
              </a-col>
              <a-col :span="8">
                <a-radio :value="2">
                  教学科研型
                </a-radio>
              </a-col>
              <a-col :span="8">
                <a-radio :value="3">
                  科研型
                </a-radio>
              </a-col>
              <a-col :span="8">
                <a-radio :value="4">
                  科研教学型
                </a-radio>
              </a-col>
            </a-row>
          </a-radio-group> -->
          <a-checkbox-group
            @change="teacherTypeChange"
            v-model="level_model.record.teacherType"
          >
            <a-row>
              <a-col :span="8">
                <a-checkbox :value="1">
                  教学型
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox :value="2">
                  教学科研型
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox :value="3">
                  科研型
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox :value="4">
                  科研教学型
                </a-checkbox>
              </a-col>
              <a-checkbox-group v-model="level_model.record.teacherType">
                <a-row>
                  <a-col :span="100">
                    <a-checkbox
                      :value="0"
                      @click="level_model.record.teacherType = ['0']"
                      >无
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </a-row>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="是否填写经费" prop="money">
          <a-radio-group v-model="level_model.record.money">
            <a-radio :value="0">
              否
            </a-radio>
            <a-radio :value="1">
              是
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="是否上传附件" prop="inputAttach">
          <a-radio-group v-model="level_model.record.inputAttach">
            <a-radio :value="0">
              否
            </a-radio>
            <a-radio :value="1">
              是
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="是否填写描述" prop="inputDescribe">
          <a-radio-group v-model="level_model.record.inputDescribe">
            <a-radio :value="0">
              否
            </a-radio>
            <a-radio :value="1">
              是
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
                label="业绩最小填写数量"
        >
          <a-input-number v-model="MinPerformance" />
        </a-form-model-item>
        <a-form-model-item label="拉取创新学院数据" prop="pullCompetition">
          <a-radio-group v-model="level_model.record.pullCompetition">
            <a-radio :value="0">
              否
            </a-radio>
            <a-radio :value="1">
              是
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
                label="最少填写数量"
                v-if="level_model.record.pullCompetition"
        >
          <a-input-number v-model="level_model.record.competitionInfo.min" />
        </a-form-model-item>
        <a-form-model-item
          v-if="level_model.record.pullCompetition"
          label="限制"
        >
          <div
            style="width:100%;display:flex;justify-content:center;align-items:between;"
          >
            <a-table
              :data-source="level_model.record.competitionInfo.limitList"
              :pagination="false"
              style="width: 700px;"
            >
              <a-table-column
                key="competitionType"
                title="类型"
                data-index="competitionType"
              >
                <template slot-scope="text, record, index">
                  <a-select
                    style="width: 300px"
                    v-model="
                      level_model.record.competitionInfo.limitList[index]
                        .competitionType
                    "
                  >
                    <a-select-option
                      v-for="item in CxxyDataInfo"
                      :key="item.type"
                      :value="item.type"
                      @click="CxxyDataInfoList = item.levelInfo"
                    >
                      {{ item.typeName }}
                    </a-select-option>
                  </a-select>
                </template>
              </a-table-column>
              <a-table-column
                key="competitionLevel"
                title="等级"
                data-index="competitionLevel"
              >
                <template slot-scope="text, record, index">
                  <a-select
                    style="width: 300px"
                    v-model="
                      level_model.record.competitionInfo.limitList[index]
                        .competitionLevel
                    "
                  >
                    <a-select-option
                      v-for="item in getCxxyDataInfoList(
                        record.competitionType
                      )"
                      :key="item.level"
                      :value="item.level"
                    >
                      {{ item.levelName }}
                    </a-select-option>
                  </a-select>
                </template>
              </a-table-column>
              <a-table-column key="action" title="操作">
                <template slot-scope="text, record, index">
                  <span
                    @click="
                      level_model.record.competitionInfo.limitList.splice(
                        index,
                        1
                      )
                    "
                  >
                    <a>
                      删除
                    </a>
                  </span>
                </template>
              </a-table-column>
            </a-table>
            <a-icon
              :component="svg_add"
              style="font-size:30px;float:left;margin-left: 20px;"
              @click="addCXXY"
            />
          </div>
        </a-form-model-item>
        <a-form-model-item label="拉取科技处数据" prop="pullResearch">
          <a-radio-group v-model="level_model.record.pullResearch">
            <a-radio :value="0">
              否
            </a-radio>
            <a-radio :value="1">
              是
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
                label="最少填写数量"
                v-if="level_model.record.pullResearch"
        >
          <a-input-number v-model="level_model.record.researchInfo.min" />
        </a-form-model-item>
        <a-form-model-item
          v-if="level_model.record.pullResearch"
          label="限制条件"
        >
          <div
            style="width:100%;display:flex;justify-content:center;align-items:between;"
          >
            <a-table
              :data-source="level_model.record.researchInfo.limitList"
              :pagination="false"
              style="width: 700px;"
            >
              <a-table-column
                key="researchType"
                title="类型"
                data-index="researchType"
              >
                <template slot-scope="text, record, index">
                  <a-select
                    style="width: 300px"
                    v-model="
                      level_model.record.researchInfo.limitList[index]
                        .researchType
                    "
                  >
                    <a-select-option
                      v-for="item in KjcDataInfo"
                      :key="item.type"
                      :value="item.type"
                      @click="KjcDataInfoList = item.levelInfo"
                    >
                      {{ item.typeName }}
                    </a-select-option>
                  </a-select>
                </template>
              </a-table-column>
              <a-table-column
                key="researchLevel"
                title="等级"
                data-index="researchLevel"
              >
                <template slot-scope="text, record, index">
                  <a-select
                    style="width: 300px"
                    v-model="
                      level_model.record.researchInfo.limitList[index]
                        .researchLevel
                    "
                  >
                    <a-select-option
                      v-for="item in getKjcDataInfoList(record.researchType)"
                      :key="item.level"
                      :value="item.level"
                    >
                      {{ item.levelName }}
                    </a-select-option>
                  </a-select>
                </template>
              </a-table-column>
              <a-table-column key="action" title="操作">
                <template slot-scope="text, record, index">
                  <span
                    @click="
                      level_model.record.researchInfo.limitList.splice(index, 1)
                    "
                  >
                    <a>
                      删除
                    </a>
                  </span>
                </template>
              </a-table-column>
            </a-table>
            <a-icon
              :component="svg_add"
              style="font-size:30px;float:left;margin-left: 20px;"
              @click="addKCJ"
            />
          </div>
        </a-form-model-item>
        <!-- 111111111 -->
        <a-form-model-item label="拉取教务处数据" prop="pullProject">
          <a-radio-group v-model="level_model.record.pullProject">
            <a-radio :value="0">
              否
            </a-radio>
            <a-radio :value="1">
              是
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
                label="最少填写数量"
                v-if="level_model.record.pullProject"
        >
          <a-input-number v-model="level_model.record.projectInfo.min" />
        </a-form-model-item>
        <a-form-model-item v-if="level_model.record.pullProject" label="限制">
          <div
            style="width:100%;display:flex;justify-content:center;align-items:between;"
          >
            <a-table
              :data-source="level_model.record.projectInfo.limitList"
              :pagination="false"
              style="width:700px;"
            >
              <a-table-column
                key="projectType"
                title="类型"
                data-index="projectType"
              >
                <template slot-scope="text, record, index">
                  <a-select
                    style="width: 300px"
                    v-model="
                      level_model.record.projectInfo.limitList[index]
                        .projectType
                    "
                  >
                    <a-select-option
                      v-for="item in JwcDataInfo"
                      :key="item.type"
                      :value="item.type"
                      @click="JwcDataInfoList = item.levelInfo"
                    >
                      {{ item.typeName }}
                    </a-select-option>
                  </a-select>
                </template>
              </a-table-column>
              <a-table-column
                key="projectLevel"
                title="等级"
                data-index="projectLevel"
              >
                <template slot-scope="text, record, index">
                  <a-select
                    style="width: 300px"
                    v-model="
                      level_model.record.projectInfo.limitList[index]
                        .projectLevel
                    "
                  >
                    <a-select-option
                      v-for="item in getJwcDataInfoList(record.projectType)"
                      :key="item.level"
                      :value="item.level"
                    >
                      {{ item.levelName }}
                    </a-select-option>
                  </a-select>
                </template>
              </a-table-column>
              <a-table-column key="action" title="操作">
                <template slot-scope="text, record, index">
                  <span
                    @click="
                      level_model.record.projectInfo.limitList.splice(index, 1)
                    "
                  >
                    <a>删除 </a>
                  </span>
                </template>
              </a-table-column>
            </a-table>
            <a-icon
              :component="svg_add"
              style="font-size:30px;float:left;margin-left: 20px;"
              @click="addJWC"
            />
          </div>
        </a-form-model-item>
        <!-- 111111111 -->
      </a-form-model>
      <template slot="footer">
        <a-button
          :loading="confirmLoading"
          @click="level_model.handleCancel"
          prop="rule"
        >
          取消
        </a-button>
        <a-button
          type="primary"
          :loading="confirmLoading"
          @click="level_model.handleOk"
        >
          提交
        </a-button>
      </template>
    </a-modal>
    <!-- 新建具体要求序号 -->
    <a-modal
      :visible="new_model.visible"
      :title="new_model.tableTitle"
      :confirm-loading="new_model.confirmLoading"
      @ok="new_model.handleOk()"
      @cancel="new_model.visible = false"
      :width="new_model.width"
      :destroyOnClose="true"
    >
      <a-form-model
        ref="newForm"
        :model="new_model.record"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        money
        teacherType
        :rules="{
          name: [
            {
              required: true,
              message: '请填写完整',
              trigger: 'blur',
            },
          ],
        }"
      >
        <a-form-model-item label="序号" prop="name">
          <a-input v-model="new_model.record.name" />
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button
          :loading="confirmLoading"
          @click="new_model.handleCancel"
          prop="rule"
        >
          取消
        </a-button>
        <a-button
          type="primary"
          :loading="confirmLoading"
          @click="new_model.handleOk"
        >
          提交
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { props } from "./props";
import XHR from "@/services/interface";
import svg_delete from "@/assets/svg/delete.svg";
import svg_edit from "@/assets/svg/edit.svg";
import svg_add from "@/assets/svg/add.svg";
const SVG_LIST = {
  svg_delete,
  svg_edit,
  svg_add,
};
export default {
  props: { ...props },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      ...SVG_LIST,
      confirmLoading: false,
      dataSource: undefined,
      info: {
        page: 1,
        line: 100000,
        keyWord: "",
        type: "condition",
      },
      detail_model_data: {
        visible: false,
        type: "Edit",
        tableTitle: "编辑",
        width: 1000,
        record: {},
      },
      CI_model: {
        visible: false,
        type: "Edit",
        tableTitle: "编辑",
        width: 1000,
        record: {},
      },
      MinPerformance:'',
      level_model: {
        visible: false,
        type: "Edit",
        tableTitle: "编辑",
        width: 1000,
        record: {
        },
      },
      minPullCallback:'',
      new_model: {
        visible: false,
        type: "Edit",
        tableTitle: "编辑",
        width: 1000,
        record: {},
      },
      KjcDataInfo: undefined,
      KjcDataInfoList: undefined,
      CxxyDataInfo: undefined,
      CxxyDataInfoList: undefined,
      JwcDataInfo: undefined,
      JwcDataInfoList: undefined,
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
      /**
       * 查询 过滤 检索 表单
       */
      filterForm: {
        keyWord: "",
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
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.pagination.loading = true;
      this.info.page = this.pagination.current;
      this.info.line = this.pagination.pageSize;
      await XHR.Axios_$$positionAppointment_require_searchList({
        ...this.info,
        id: this.record.id,
      }).then(_ => {
        this.pagination.lineCount = _.data.info.lineCount;
        this.pagination.pageCount = _.data.info.pageCount;
        this.pagination.loading = false;
        this.info.keyWord = this.filterForm.keyWord = "";
        this.dataSource = _.data.info.list;
        this.$forceUpdate();
        // console.log(_.data.info.list);
      });
      return this.dataSource;
    },
    // 切换页面行数
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      console.log(this.pagination);
      this.getList();
    },
    /**
     * @按钮
     */
    // 保存序号按钮
    saveIndex() {
      XHR.Axios_$$positionAppointment_serialNumber_edit({
        positionAppointmentCriteriaId: this.record.id,
        ...this.CI_model.record,
      }).then(_ => {
        this.getList(_);
      });
    },
    onSubmit() {},
    handleCancel() {
      this.$emit("close_CI_model");
    },
    handleOk() {
      this.$emit("close_CI_model");
    },
    async opendetailmodal(option, record = {}, index, level) {
      if (option === "Edit") {
        console.log(option, record, index);
        this.CI_model = {
          ...this.CI_model,
          visible: true,
          tableTitle: `编辑具体要求`,
          userType: this.info.type,
          width: 1200,
          type: option,
          record: record,
          listIndex: index,
          handleOk: () => (this.CI_model.visible = false),
        };
      } else if (option === "Add") {
        this.new_model = {
          ...this.new_model,
          visible: true,
          tableTitle: `新建具体要求`,
          userType: this.info.type,
          width: 400,
          type: option,
          record: record,
          listIndex: index,
          handleOk: async () => {
            this.$refs.newForm.validate(valid => {
              if (valid) {
                XHR.Axios_$$positionAppointment_serialNumber_edit({
                  positionAppointmentCriteriaId: this.record.id,
                  // positionAppointmentCriteriaSerialNumberId: this.CI_model
                  //   .record.id,
                  ...record,
                }).then(_ => {
                  this.getList(_);
                });
                this.new_model.visible = false;
              } else {
                console.log("error submit!!");
                return false;
              }
            });
          },
          handleCancel: () => (this.new_model.visible = false),
        };
      } else if (option === "Del") {
        XHR.Axios_$$positionAppointment_serialNumber_delete({
          id: record.id,
          level: level,
        }).then(_ => {
          this.getList(_);
        });
      }
    },
    async treeOption(option, record = {}, index = 0, level = 0, One) {
      console.log(option, record, index, level);
      if (option === "Edit") {
        await XHR.Axios_$$searchCxxyDataInfo().then(_ => {
          console.log(_.data.info.list);
          this.CxxyDataInfo = _.data.info.list;
        });
        await XHR.Axios_$$searchKjcDataInfo().then(_ => {
          console.log(_.data.info.list);
          this.KjcDataInfo = _.data.info.list;
        });
        await XHR.Axios_$$searchJwcDataInfo({ page: 1, line: 1000 }).then(_ => {
          console.log(_.data.info.list);
          this.JwcDataInfo = _.data.info.list;
        });
        await XHR.Axios_$$positionAppointment_require_searchSingleInfo({
          id: record.id,
          level: level,
        }).then(_ => {
          this.minPullCallback=_.data.info.minPull
          this.MinPerformance=this.minPullCallback
          XHR.Axios_$$searchFunctionDepartmentList({
            page: 0,
            line: 10000,
          }).then(__ => {
            var info = Object.assign({}, _.data.info);
            if (info.competitionInfo.length == 0) {
              info.competitionInfo = {
                limitList: [],
                min: undefined,
              };
            }
            if (info.researchInfo.length == 0) {
              info.researchInfo = {
                limitList: [],
                min: undefined,
              };
            }
            if (info.projectInfo.length == 0) {
              info.projectInfo = {
                limitList: [],
                min: undefined,
              };
            }
            console.log(info);
            this.level_model = {
              ...this.level_model,
              visible: true,
              tableTitle: `编辑`,
              userType: this.info.type,
              width: 800,
              type: option,
              record: { ...info },
              znbm: { ...__.data.info.list },
              listIndex: index,
              handleOk: () => {
                this.$refs.jtyqForm.validate(valid => {
                  if (valid) {
                    console.log(record, One);
                    let min=''
                    if(this.MinPerformance==''||this.MinPerformance== null ||this.MinPerformance== undefined){
                     this.min=0
                    }else{
                      this.min=this.MinPerformance
                    }
                    console.log("min",min)
                    console.log("min",this.min)
                    XHR.Axios_$$positionAppointment_require_edit({
                      ...this.level_model.record,
                      level: level,
                      levelOneSerialNumberId: One.id,
                      id: record.id,
                      minPull:this.min,
                    })
                      .then((this.level_model.visible = false))
                      .then(() => {
                        this.min=''
                        // this.MinPerformance=this.minPullCallback
                        console.log("minh",this.min)
                        this.getList().then(_ => {
                          if (level === 2) {
                            this.CI_model.record = this.dataSource[
                              this.CI_model.listIndex
                            ];
                            // this.CI_model.record.requireLevelOne[
                            //   index
                            // ].requireLevelTwo = this.dataSource[
                            //   this.CI_model.listIndex
                            // ].requireLevelOne[index].requireLevelTwo;
                          } else if (level === 1) {
                            this.CI_model.record = this.dataSource[
                              this.CI_model.listIndex
                            ];
                          }
                          console.log(_);
                          // if (level === 1) {
                          //   this.CI_model.record.requireLevelOne[
                          //     this.level_model.listIndex
                          //   ].line = this.dataSource[
                          //     this.CI_model.listIndex
                          //   ].requireLevelOne[this.level_model.listIndex].line;
                          // } else {
                          //   this.CI_model.record = this.dataSource[
                          //     this.CI_model.listIndex
                          //   ];
                          // }
                        });
                      })
                      .then(() => {});
                  } else {
                    console.log("error submit!!");
                    return false;
                  }
                });
              },
              handleCancel: () => (this.level_model.visible = false),
            };
          });
        });
      } else if (option === "Del") {
        await XHR.Axios_$$positionAppointment_require_delete({
          id: record.id,
          level: level,
        })
          .then(() => {
            // console.log(record);
            // record.requireLevelTwo.splice(index, 1);
          })
          .then(this.getList)
          .then(() => {
            // console.log(this.CI_model.record);
            // console.log(
            //   this.CI_model.record.requireLevelOne[this.CI_model.listIndex]
            // );
            // console.log(this.dataSource[this.CI_model.listIndex]);
            this.CI_model.record = this.dataSource[this.CI_model.listIndex];
            // this.CI_model.record.requireLevelOne[
            //   this.CI_model.listIndex
            // ] = this.dataSource[this.CI_model.listIndex];
          });
        // .then(this.getList());
        console.log(option, record, index, level);
      } else if (option === "Add") {
        console.log(option, record, index, level, this.record);
        await XHR.Axios_$$searchCxxyDataInfo().then(_ => {
          console.log(_.data.info.list);
          this.CxxyDataInfo = _.data.info.list;
        });
        await XHR.Axios_$$searchKjcDataInfo().then(_ => {
          console.log(_.data.info.list);
          this.KjcDataInfo = _.data.info.list;
        });
        await XHR.Axios_$$searchJwcDataInfo({ page: 1, line: 1000 }).then(_ => {
          console.log(_.data.info.list);
          this.JwcDataInfo = _.data.info.list;
        });
        await XHR.Axios_$$searchFunctionDepartmentList({
          page: 0,
          line: 10000,
        }).then(async __ => {
          this.level_model = {
            ...this.level_model,
            visible: true,
            tableTitle: `新建${level === 1 ? "一" : "二"}级具体要求`,
            userType: this.info.type,
            width: 800,
            type: option,
            record: {
              record,
              competitionInfo: { min: undefined, limitList: [] },
              researchInfo: { min: undefined, limitList: [] },
              projectInfo: { min: undefined, limitList: [] },
            },
            znbm: { ...__.data.info.list },
            listIndex: index,
            handleOk: () => {
              console.log("====================================");
              console.log(this.level_model);
              console.log(this.CI_model);
              console.log(record);
              console.log(this.record);
              console.log(this.dataSource);
              console.log("====================================");
              this.$refs.jtyqForm.validate(valid => {
                if (valid) {
                  XHR.Axios_$$positionAppointment_require_edit({
                    ...this.level_model.record,
                    level: level,
                    levelOneSerialNumberId: level === 1 ? undefined : record.id,
                    positionAppointmentCriteriaId: this.record.id,
                    positionAppointmentCriteriaSerialNumberId: this.CI_model
                      .record.id,
                    id: this.level_model.record.id,
                  })
                    .then(() => (this.level_model.visible = false))
                    .then(this.getList)
                    .then(() => {
                      if (level === 2) {
                        this.CI_model.record = this.dataSource[
                          this.CI_model.listIndex
                        ];
                        // this.CI_model.record.requireLevelOne[
                        //   index
                        // ].requireLevelTwo = this.dataSource[
                        //   this.CI_model.listIndex
                        // ].requireLevelOne[index].requireLevelTwo;
                      } else if (level === 1) {
                        this.CI_model.record = this.dataSource[
                          this.CI_model.listIndex
                        ];
                      }
                    });
                } else {
                  console.log("error submit!!");
                  return false;
                }
              });
            },
            handleCancel: () => (this.level_model.visible = false),
          };
        });
      }
    },
    /**
     * @表单函数
     */
    teacherTypeChange(checkedValues) {
      this.level_model.record.teacherType = checkedValues;
    },
    addCXXY() {
      if (
        this.level_model.record.competitionInfo.limitList &&
        this.level_model.record.competitionInfo.limitList.length > 0
      ) {
        this.level_model.record.competitionInfo.limitList.push({
          competitionLevel: undefined,
          competitionType: undefined,
        });
      } else {
        this.level_model.record.competitionInfo.limitList = [
          {
            competitionLevel: undefined,
            competitionType: undefined,
          },
        ];
      }
      console.log(this.level_model.record.competitionInfo);
      this.$forceUpdate();
    },
    addKCJ() {
      if (
        this.level_model.record.researchInfo.limitList &&
        this.level_model.record.researchInfo.limitList.length > 0
      ) {
        this.level_model.record.researchInfo.limitList.push({
          researchLevel: undefined,
          researchType: undefined,
        });
      } else {
        this.level_model.record.researchInfo.limitList = [
          {
            researchLevel: undefined,
            researchType: undefined,
          },
        ];
      }
      this.$forceUpdate();
    },
    addJWC() {
      if (
        this.level_model.record.projectInfo.limitList &&
        this.level_model.record.projectInfo.limitList.length > 0
      ) {
        this.level_model.record.projectInfo.limitList.push({
          projectLevel: undefined,
          projectType: undefined,
        });
      } else {
        this.level_model.record.projectInfo.limitList = [
          {
            projectLevel: undefined,
            projectType: undefined,
          },
        ];
      }
      this.$forceUpdate();
    },
    getCxxyDataInfoList(val) {
      console.log(val);
      var arr = [];
      this.CxxyDataInfo.forEach(_ => {
        if (val === _.type) arr.push(_.levelInfo);
      });
      console.log(arr);
      return arr[0];
    },
    getKjcDataInfoList(val) {
      console.log(val);
      var arr = [];
      this.KjcDataInfo.forEach(_ => {
        if (val === _.type) arr.push(_.levelInfo);
      });
      console.log(arr);
      return arr[0];
    },
    getJwcDataInfoList(val) {
      console.log(val);
      var arr = [];
      this.JwcDataInfo.forEach(_ => {
        if (val === _.type) arr.push(_.levelInfo);
      });
      console.log(arr);
      return arr[0];
    },
  },
};
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 5px 5px;
}
</style>
