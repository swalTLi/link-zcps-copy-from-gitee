<template>
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
      <label>序号：</label><a-input v-model="record.name" />
      <a-button type="primary">保存序号：</a-button>
    </a-space>
    <br />
    <a-space class="operator" align="baseline" style="margin-top:20px;">
      <a-button type="primary">新建一级具体要求</a-button>
      <a-button type="primary">新建二级具体要求</a-button>
    </a-space>
    <a-table :data-source="dataSource" style="margin-top:20px;">
      <a-table-column key="id" title="序号" data-index="id" />
      <a-table-column key="info" title="序号" data-index="info" />
    </a-table>
    <template slot="footer">
      <div v-if="type === 'Info'">
        <a-button key="back" @click="handleCancel">
          返回
        </a-button>
        <a-button key="submit" type="primary" @click="handleCancel">
          完成
        </a-button>
      </div>
      <div v-if="type === 'Edit' || type === 'Add'">
        <!-- <a-button key="back" @click="resetForm">
          重置
        </a-button> -->
        <a-button
          key="submit"
          type="primary"
          :loading="confirmLoading"
          @click="onSubmit"
        >
          提交
        </a-button>
      </div>
    </template>
  </a-modal>
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
export default {
  props: { ...props },
  data() {
    return {
      ...SVG_LIST,
      confirmLoading: false,
      dataSource: undefined,
      info: {
        page: 1,
        line: 10,
        keyWord: "",
        type: "condition",
      },
      detail_model_data: {
        visible: false,
      },
    };
  },
  mounted() {
    this.getList();
    console.log(this.visible);
    console.log(this.record);
    console.log(this.dataSource);
  },
  methods: {
    getList() {
      XHR.Axios_$$searchSinglePerformanceRequireInfo({
        id: this.record.id,
        level: 2,
      }).then(_ => {
        this.dataSource = _.data.info.list;
        console.log(_);
      });
    },
    handleCancel() {
      this.$emit("close_CI_model");
    },
    handleOk() {
      this.$emit("close_CI_model");
    },
    opendetailmodal(option, record = {}, index) {
      console.log(option, record, index);
      if (option === "Edit") {
        this.detail_model_data = {
          visible: true,
          tableTitle: `编辑具体要求`,
          userType: this.info.type,
          width: 800,
          type: option,
          columns: this.columns,
          record: record,
          listIndex: index,
        };
      }
    },
    onSubmit() {},
  },
};
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
