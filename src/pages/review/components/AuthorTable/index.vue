<template>
  <div v-if="column.length">
    <a-divider style="margin-bottom: 32px" />
    <h2 style="font-weight: bold" class="title">参与者</h2>
    <h5 style="font-weight: bold;color: red;" class="title">
      参与者列表操作无需保存，新增，修改，删除 操作直接生效，请谨慎操作
    </h5>
    <a-table
      rowKey="id"
      :scroll="{ y: 200 }"
      style="margin-bottom: 24px;"
      :columns="column"
      :data-source="dataSource"
      bordered
      :pagination="false"
    >
      <template slot="operation" slot-scope="record, operation">
        <a
          style="margin-right: 8px"
          @click="opendetailmodal('Edit', operation)"
        >
          <a-icon :component="svg_edit" /> 修改
        </a>
        <a-popconfirm
          title="确认删除？"
          ok-text="删除"
          cancel-text="取消"
          @confirm="handleDel(operation)"
        >
          <a> <a-icon :component="svg_delete" /> 删除 </a>
        </a-popconfirm>
      </template>
    </a-table>
    <div style="margin-bottom: 16px;" v-if="!option">
      <a-button type="primary" @click="opendetailmodal('Add')">
        添加参与者
      </a-button>
    </div>
    <a-modal
      :title="authorModal.title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          v-if="
            ((item.edit_show && authorModal.type === 'Edit') ||
              (item.add_show && authorModal.type === 'Add')) &&
              rules
          "
          :ref="item.dataIndex"
          v-for="item in column"
          :key="item.dataIndex"
          :label="item.title"
          :prop="item.dataIndex"
        >
          <div v-if="!item.is_Editable">
            {{ form[item.dataIndex] }}
          </div>
          <div v-if="item.formType === 'ldq-input' && item.is_Editable">
            <a-input
              :placeholder="item.placeholder"
              v-model="form[item.dataIndex]"
              @pressEnter="onSubmit"
              @blur="
                () => {
                  $refs[item.dataIndex][0].onFieldBlur();
                }
              "
            />
          </div>
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="confirmLoading"
          @click="onSubmit"
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
const SVG_LIST = {
  svg_delete,
  svg_edit,
};
svg_delete;
export default {
  name: "AuthorTable",
  props: { ...props },
  data() {
    return {
      ...SVG_LIST,
      column: [],
      dataSource: [],
      is_Editable: "",
      visible: false,
      confirmLoading: false,
      form: {},
      rules: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      authorModal: {
        title: "",
        type: "",
      },
      API: {
        kjc: {
          getList: XHR.Axios_$$thirdPartyData_kjc_data_getList,
          edit: XHR.Axios_$$thirdPartyData_kjc_data_author_edit,
        },
        cxxy: {
          getList: XHR.Axios_$$thirdPartyData_cxxy_data_getList,
          edit: XHR.Axios_$$thirdPartyData_cxxy_data_author_edit,
        },
        jwc: {
          getList: XHR.Axios_$$thirdPartyData_jwc_data_getList,
          edit: XHR.Axios_$$thirdPartyData_jwc_data_author_edit,
        },
        jxgzl: {
          getList: XHR.Axios_$$thirdPartyData_jxgzl_data_getList,
          edit: XHR.Axios_$$thirdPartyData_jxgzl_data_author_edit,
        },
      },
      authorType: {
        kycg: "kjc",
        kyxm: "kjc",
        lw: "kjc",
        yszp: "kjc",
        zl: "kjc",
        zz: "kjc",
        js: "cxxy",
        dc: "cxxy",
        gjxm: "jwc",
        jc: "jwc",
        jglw: "jwc",
        jxbs: "jwc",
        jxcg: "jwc",
        jxgc: "jwc",
        kc: "jwc",
        rych: "jwc",
        bk: "jxgzl",
        yjs: "jxgzl",
        lxs: "jxgzl",
      },
      getListAPI: undefined,
      editAPI: undefined,
    };
  },
  mounted() {
    const { getList, edit } = this.API[this.authorType[this.userType]];
    this.getListAPI = getList;
    this.editAPI = edit;
    console.log("====================================");
    console.log(this.userType);
    console.log("====================================");
    this.columns.forEach(_ => {
      if (_.formType === this.formType) {
        this.column = [..._.childrens];
      }
    });
    this.column.forEach(_ => {
      if (_.dataIndex === "operation") {
        if (this.option) {
          this.column.pop();
        } else {
          // console.log(this.column);
        }
        // console.log(this.column);
      }
    });
    this.dataSource = this.records.authors;
    if (this.dataSource.length > 0) {
      this.dataSource.forEach((_, index) => {
        _.key = index;
      });
    }
    // console.log(this.dataSource);
    // console.log(this.column);
    // console.log(this.dataSource);
    // console.log(this.option);
  },
  methods: {
    async getList() {
      await this.getListAPI({
        page: 1,
        line: 100,
        type: this.userType,
      }).then(_ => {
        // console.log(this.listIndex);
        // console.log(_.data.info.list[this.listIndex].author);
        this.dataSource = _.data.info.list[this.listIndex].authors;
      });
    },
    async handleAdd() {
      // 调用接口
      await this.editAPI({
        operate: 1,
        type: this.userType,
        id: this.id,
        author: this.form,
      });
      await this.getList();
    },
    async handleDel(query) {
      console.log(query);
      console.log(this.id);
      // 调用接口
      await this.editAPI({
        operate: 3,
        type: this.userType,
        id: this.id,
        author: query,
      });
      await this.getList();
    },
    async handleEdit() {
      const query = this.form;
      console.log(query);
      console.log(this.id);
      // 调用接口
      await this.editAPI({
        operate: 2,
        type: this.userType,
        id: this.id,
        author: query,
      });
      await this.getList();
    },
    handleOperate(type, query) {
      this[`handle${type}`](query);
    },
    // 编辑
    opendetailmodal(type, query) {
      const rules = {};
      const form = {};
      if (type === "Edit") {
        this.column.forEach(_ => {
          // // 去掉不需要编辑的
          if (_.edit_show) {
            form[_.dataIndex] = query[_.dataIndex];
          }
          // rule
          if (_.rule) {
            rules[_.dataIndex] = _.rule;
          }
        });
        this.authorModal = {
          title: "编辑",
          type: type,
        };
      } else if (type === "Add") {
        this.column.forEach(_ => {
          // // 去掉不需要编辑的
          // rule
          if (_.rule) {
            rules[_.dataIndex] = _.rule;
          }
        });
        for (var _ in this.form) this.form[_] = "";
        this.authorModal = {
          title: "添加",
          type: type,
        };
      }
      this.form = { ...form };
      this.rules = { ...rules };
      this.visible = true;
    },
    // 模态框返回按钮
    handleDetailModelSubmit({ form, type }) {
      console.log("type:", type);
      console.log("form:", form);
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
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
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
