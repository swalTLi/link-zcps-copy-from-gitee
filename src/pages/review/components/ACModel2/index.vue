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
          >新建条件要求</a-button
        >
      </a-space>
      <a-table
        style="margin-top:20px;"
        :columns="tableColumns"
        :data-source="dataSource"
        bordered
      >
        <!-- <span slot="action" slot-scope="text, record, index">
          {{ text.join(",") }}
        </span> -->
        <span
          slot="action"
          slot-scope="text, record, index"
          href="javascript:;"
        >
          <a
            style="margin-right: 8px"
            @click="opendetailmodal('Edit', record, index)"
          >
            <a-icon :component="svg_edit" /> 编辑
          </a>
          <!-- <a-popconfirm
            title="确认删除？"
            ok-text="删除"
            cancel-text="取消"
            @confirm="opendetailmodal('Del', record, index)"
          >
            <a style="margin-right: 8px">
              <a-icon :component="svg_delete" /> 删除
            </a>
          </a-popconfirm> -->
        </span>
      </a-table>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          返回
        </a-button>
        <a-button type="primary" @click="handleCancel">
          完成
        </a-button>
      </template>
    </a-modal>
    <a-modal
      :title="new_model.tableTitle"
      :visible="new_model.visible"
      :confirm-loading="new_model.confirmLoading"
      :width="new_model.width"
      :destroyOnClose="true"
      @ok="new_model.handleOk()"
      @cancel="new_model.visible = false"
      v-if="new_model.formData"
    >
      <a-space
        class="operator"
        align="center"
        style="display: flex; justify-content: space-between;"
      >
        <span>
          任职年限： 从
          <a-input-number
            id="inputNumber"
            v-model="new_model.formData.minYear"
            :min="1"
            :max="100"
          />
          到
          <a-input-number
            id="inputNumber"
            v-model="new_model.formData.maxYear"
            :min="1"
            :max="100"
          />
          年
        </span>
        <span>
          <a-icon :component="svg_add" style="font-size:30px;" @click="AddTJ"
        /></span>
      </a-space>
      <a-table
        :data-source="new_model.formData.requireInfoList"
        style="margin-top:20px;"
      >
        <a-table-column key="index" title="序号" data-index="index">
          <template slot-scope="text">
            {{ text + 1 }}
          </template>
        </a-table-column>
        <a-table-column key="relation" title="关系" data-index="relation">
          <template slot-scope="text, record, index">
            <span>
              <a-select
                style="width: 100px;"
                placeholder="请选择"
                v-model="
                  new_model.formData['requireInfoList'][index]['relation']
                "
                @change="e => handleChange1(e, index)"
              >
                <a-select-option :value="0">无关系</a-select-option>
                <a-select-option :value="1">和</a-select-option>
                <a-select-option :value="2">或</a-select-option>
              </a-select>
            </span>
          </template>
        </a-table-column>
        <a-table-column key="requireList" title="要求" data-index="requireList">
          <template slot-scope="text, record, index">
            <!-- <span v-for="item in record.requireList" :key="item.id">{{
              item.name
            }}</span> -->
            <!-- <span v-html="getyqList(record.requireList)"></span> -->
            <div v-if="new_model.type === 'Edit'">
              <a-select
                mode="multiple"
                :default-value="
                  getDefValue(new_model.form['requireInfoList'], index)
                "
                style="width: 250px;"
                placeholder="select one country"
                option-label-prop="label"
                @change="e => handleChange2(e, index)"
              >
                <a-select-option
                  v-for="item in condition_List"
                  :value="item.id"
                  :label="item.name"
                  :key="item.id"
                >
                  <span>{{ item.name }}</span>
                </a-select-option>
              </a-select>
            </div>
            <div v-if="new_model.type === 'Add'">
              <a-select
                mode="multiple"
                style="width: 250px;"
                placeholder="select one country"
                option-label-prop="label"
                @change="e => handleChange2(e, index)"
              >
                <a-select-option
                  v-for="item in condition_List"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                >
                  <span>{{ item.name }}</span>
                </a-select-option>
              </a-select>
            </div>
          </template>
        </a-table-column>
        <a-table-column
          key="requireCompletion"
          title="要求完成数"
          data-index="requireCompletion"
        >
          <template slot-scope="text, record, index">
            <span
              ><a-input-number
                :min="1"
                style="width: 100px;"
                v-model="
                  new_model.formData['requireInfoList'][index][
                    'requireCompletion'
                  ]
                "
            /></span>
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作" data-index="action">
          <template slot-scope="text, record, index">
            <a style="margin-right: 8px" @click="handleDelete(index, 1)">
              <a-icon :component="svg_delete" />
              删除
            </a>
          </template>
        </a-table-column>
      </a-table>
      <template slot="footer">
        <a-button key="back" @click="new_model.visible = false">
          返回
        </a-button>
        <a-button type="primary" @click="new_model.handleOk">
          完成
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
import svg_save from "@/assets/svg/save.svg";
import svg_cancel from "@/assets/svg/cancel.svg";
import svg_add from "@/assets/svg/add.svg";
const SVG_LIST = {
  svg_delete,
  svg_edit,
  svg_save,
  svg_cancel,
  svg_add,
};
svg_delete;
const renderContent = value => {
  const obj = {
    children: value,
    attrs: {},
  };
  return obj;
};
export default {
  props: { ...props },
  data() {
    const tableColumns = [
      {
        title: "序号",
        dataIndex: "num",
        customRender: (value, row) => {
          const obj = {
            children: value + 1,
            attrs: {},
          };
          if (row.hide) {
            obj.attrs.rowSpan = 0;
          } else {
            obj.attrs.rowSpan = row.rowSpan;
          }
          return obj;
        },
      },
      {
        title: "id",
        dataIndex: "id",
        customRender: (value, row) => {
          const obj = {
            children: value + 1,
            attrs: {},
          };
          if (row.hide) {
            obj.attrs.rowSpan = 0;
          } else {
            obj.attrs.rowSpan = row.rowSpan;
          }
          return obj;
        },
      },
      {
        title: "任职年限",
        dataIndex: "maxYear",
        customRender: (value, row) => {
          const obj = {
            children: <span>{row.minYear + "-" + row.maxYear + "年"}</span>,
            attrs: {},
          };
          if (row.hide) {
            obj.attrs.rowSpan = 0;
          } else {
            obj.attrs.rowSpan = row.rowSpan;
          }
          return obj;
        },
      },
      {
        title: "关系",
        dataIndex: "relation",
        customRender: (value, row) => {
          const obj = {
            children: (
              <span>
                {row.relation === 0
                  ? "无关系"
                  : row.relation === 1
                  ? "和"
                  : "或"}
              </span>
            ),
            attrs: {},
          };
          return obj;
        },
      },
      {
        title: "要求",
        dataIndex: "requireList",
        customRender: value => {
          const obj = {
            children: value,
            attrs: {},
          };
          var arr = [];
          value.forEach(_ => {
            arr.push(_.name);
          });
          obj.children = arr.join(",");
          return obj;
        },
      },
      {
        title: "要求完成数",
        dataIndex: "requireCompletion",
        customRender: renderContent,
      },
      {
        title: "操作",
        dataIndex: "action",
        scopedSlots: { customRender: "action" },
      },
    ];
    return {
      tableColumns,
      ...SVG_LIST,
      column: [],
      dataSource: [],
      is_Editable: "",
      confirmLoading: false,
      form: {},
      rules: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      authorModal: {
        title: "",
        type: "",
      },
      AC_model: {
        visible: false,
        type: "Edit",
        tableTitle: "编辑",
        width: 1000,
        record: {},
      },
      new_model: {
        visible: false,
        type: "Edit",
        tableTitle: "编辑",
        width: 1000,
        record: {},
        form: {
          minYear: undefined,
          maxYear: undefined,
          relation: undefined,
        },
        dataSource: [],
        tableDate: [],
      },
      tableDate: [],
      formData: {},
      requirementList: {},
      xhindex: 0,
    };
  },
  mounted() {
    this.getList();
    XHR.Axios_$$searchPerformanceRequireList({
      id: this.record.id,
      page: 0,
      line: 100000,
    }).then(_ => {
      this.condition_List = _.data.info.list;
    });
  },
  methods: {
    async getList() {
      await XHR.Axios_$$searchPerformanceCriteriaConditionList({
        ...this.info,
        id: this.record.id,
      }).then(_ => {
        this.dataSource = [];
        this.tableDate = this.deepCopy(_.data.info.list);
        var indexNum = 0;
        _.data.info.list.forEach(_ => {
          if (_.requireInfoList.length > 0) {
            _.requireInfoList.forEach((__, index) => {
              this.dataSource.push({
                id: _.id,
                num: index === 0 ? indexNum++ : indexNum,
                index: index,
                minYear: _.minYear,
                maxYear: _.maxYear,
                relation: __.relation,
                requireCompletion: __.requireCompletion,
                requireList: __.requireList,
                hide: index === 0 ? false : true,
                rowSpan: _.requireInfoList.length,
              });
            });
          } else {
            this.dataSource.push({
              id: _.id,
              num: indexNum++,
              index: 1,
              minYear: _.minYear,
              maxYear: _.maxYear,
              relation: 0,
              requireCompletion: 0,
              requireList: [],
              hide: false,
              rowSpan: 1,
            });
          }
        });
        this.$forceUpdate();
        // console.log(this.dataSource);
      });
      return this.tableDate;
    },
    async handleAdd() {
      // 调用接口
      await XHR.Axios_$$thirdPartyData_kjc_data_author_edit({
        operate: 1,
        type: this.userType,
        id: this.id,
        author: this.form,
      });
      return this.getList();
    },
    async handleDel(query) {
      // console.log(query);
      // console.log(this.id);
      // 调用接口
      await XHR.Axios_$$thirdPartyData_kjc_data_author_edit({
        operate: 3,
        type: this.userType,
        id: this.id,
        author: query,
      });
      return this.getList();
    },
    async handleEdit() {
      const query = this.form;
      // console.log(query);
      // console.log(this.id);
      // 调用接口
      await XHR.Axios_$$thirdPartyData_kjc_data_author_edit({
        operate: 2,
        type: this.userType,
        id: this.id,
        author: query,
      });
      return this.getList();
    },
    handleOperate(type, query) {
      this[`handle${type}`](query);
    },
    // 编辑
    opendetailmodal(type, query, index) {
      // console.log(type, query, index, this.record);
      if (type === "Add") {
        this.new_model = {
          ...this.new_model,
          visible: true,
          type: "Add",
          tableTitle: "新建业绩条件",
          width: 800,
          formData: {},
          dataSource: [],
          confirmLoading: false,
          handleOk: () => {
            // console.log(this.new_model.formData);
            XHR.Axios_$$addPerformanceCriteriaCondition({
              ...this.new_model.formData,
              performanceCriteriaId: this.record.id,
            }).then(() => {
              this.getList();
              this.new_model.visible = false;
            });
          },
          handleCancel: () => (this.new_model.visible = false),
        };
      } else if (type === "Edit") {
        const arr = this.tableDate.find(_ => _.id === query.id);
        // console.log(arr);
        this.formData = this.deepCopy(arr);
        this.new_model = {
          ...this.new_model,
          visible: true,
          type: "Edit",
          tableTitle: "编辑业绩条件",
          width: 800,
          form: arr,
          dataSource: [],
          formData: this.deepCopy(arr),
          confirmLoading: false,
          listIndex: index,
          handleOk: async () => {
            // if (
            //   this.new_model.formData.requireInfoList &&
            //   this.new_model.formData.requireInfoList[0] &&
            //   this.new_model.formData.requireInfoList[0].requireList &&
            //   this.new_model.formData.requireInfoList[0].requireList[0].id
            // ) {
            //   this.new_model.formData.requireInfoList[0].requireList.forEach(
            //     _ => {
            //       arr.push(_.id);
            //     }
            //   );
            //   this.new_model.formData.requireInfoList[0].requireList = [...arr];
            // }
            console.log(this.new_model.formData.requireInfoList[0].requireList);
            // console.log(arr);
            if (this.new_model.formData.requireInfoList.length > 0) {
              await this.new_model.formData.requireInfoList.forEach(_ => {
                if (_.requireList.length > 0) {
                  if (
                    Object.prototype.toString.call(_.requireList[0]) ===
                    "[object Object]"
                  ) {
                    let array = [];
                    console.log("obj");
                    _.requireList.forEach(__ => {
                      console.log(__);
                      array.push(__.id);
                    });
                    console.log(array);
                    console.log(this.new_model.formData.requireInfoList);
                    _.requireList = [...array];
                    console.log(this.new_model.formData.requireInfoList);
                    array = [];
                  }
                }
              });
            }
            if (this.new_model.type === "Edit") {
              // console.log("====================================");
              // console.log({
              //   ...this.new_model.formData,
              //   performanceCriteriaId: this.record.id,
              // });
              // console.log("====================================");
              await XHR.Axios_$$addPerformanceCriteriaCondition({
                ...this.new_model.formData,
                performanceCriteriaId: this.record.id,
              }).then(() => {
                this.getList();
                this.new_model.visible = false;
              });
            }
          },
          handleCancel: () => (this.new_model.visible = false),
        };
        // console.log(this.new_model.formData["requireInfoList"]);
        // this.new_model.formData["requireInfoList"].forEach(_ => {
        //   console.log(_);
        // });
        // this.new_model.formData["requireInfoList"][index]["relation"];
        // console.log(this.new_model.formData);
        this.visible = true;
      } else if (type === "Del") {
        this.visible = true;
      }
    },
    // 模态框返回按钮
    handleDetailModelSubmit({ form, type }) {
      // console.log("type:", type);
      // console.log("form:", form);
      return this[`handle${type}`](form);
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert("submit!");
          if (this.authorModal.type === "Edit") {
            this.handleEdit();
          }
          if (this.authorModal.type === "Add") {
            this.handleAdd();
          }
          this.confirmLoading = false;
          this.visible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleOk() {
      this.$emit("close_AC_model");
    },
    handleCancel() {
      this.$emit("close_AC_model");
    },
    // 编辑业绩条件
    handleSaveTJ() {
      // console.log(this.new_model.formData);
      if (this.new_model.type === "Edit") {
        XHR.Axios_$$addPerformanceCriteriaCondition({
          ...this.new_model.formData,
          performanceCriteriaId: this.new_model.formData.id,
        }).then(() => {
          this.getList();
          this.new_model.visible = false;
        });
      } else if (this.new_model.type === "Add") {
        // console.log(this.new_model.formData);
        XHR.Axios_$$addPerformanceCriteriaCondition({
          ...this.new_model.formData,
          performanceCriteriaId: this.record.id,
        }).then(() => {
          this.getList();
          this.new_model.visible = false;
        });
      }
    },
    AddTJ() {
      if (this.new_model.type === "Edit") {
        if (this.new_model.formData.requireInfoList) {
          console.log([]);
          this.xhindex = this.new_model.formData.requireInfoList.length + 1;
          this.new_model.formData.requireInfoList.push({
            index: this.xhindex,
            requireCompletion: 1,
            relation: 0,
            requireList: [],
          });
        } else {
          this.new_model.formData.requireInfoList = [
            {
              index: this.xhindex,
              requireCompletion: 1,
              relation: 0,
              requireList: [],
            },
          ];
        }
      }
      if (this.new_model.type === "Add") {
        if (this.new_model.formData.requireInfoList) {
          console.log([]);
          this.xhindex = this.new_model.formData.requireInfoList.length + 1;
          this.new_model.formData.requireInfoList.push({
            index: this.xhindex,
            requireCompletion: 1,
            relation: 0,
            requireList: [],
          });
        } else {
          this.new_model.formData.requireInfoList = [
            {
              index: this.xhindex,
              requireCompletion: 1,
              relation: 0,
              requireList: [],
            },
          ];
        }
      }
      // console.log(this.new_model.formData.requireInfoList);
      this.$forceUpdate();
    },
    handleDelete(index) {
      // console.log(this.new_model.formData.requireInfoList, index);
      this.new_model.formData.requireInfoList.splice(index, 1);
      this.$forceUpdate();
    },
    handleChange1(e, index) {
      this.new_model.formData["requireInfoList"][index]["requireList"] = e;
      this.$forceUpdate();
    },
    handleChange2(e, index) {
      // console.log(e);
      this.new_model.formData["requireInfoList"][index]["requireList"] = e;
      this.$forceUpdate();
    },
    getyqList(list) {
      var arr = [];
      list.forEach(_ => {
        arr.push(_.name);
      });
      return arr;
    },
    saveIndex() {},
    deepCopy(obj) {
      var a = JSON.stringify(obj);
      var newobj = JSON.parse(a);
      return newobj;
    },
    getDefValue(value, index) {
      if (value[index]) {
        if ("requireList" in value[index]) {
          var arr = [];
          value[index].requireList.forEach(_ => {
            arr.push(_.id);
          });
          return arr;
        }
      } else {
        this.xhindex = this.new_model.formData.requireInfoList.length + 1;
        value = [
          {
            index: this.xhindex,
            requireCompletion: 1,
            relation: 0,
            requireList: [],
          },
        ];
        return [];
      }
    },
  },
};
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
