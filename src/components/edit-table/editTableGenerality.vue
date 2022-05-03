/* eslint-disable vue/valid-v-for */
<template>
  <div>
    <a-table
      :columns="columns"
      :pagination="false"
      :data-source="tableDataV"
      bordered
    >
      <template slot="title">
        <h3 style="font-size:35px;width:100%;text-align:center;bold:1000;">
          {{ title }}
        </h3>
        <div>
          单位：
          <span>{{ company }}</span>
        </div>
      </template>
      <!-- <template slot="footer">
        备注：
      </template> -->
      <!-- <template slot="firstTarget" slot-scope="text, record" rowspan="3">
        <editable-cell
          v-if="text.show"
          :text="text.value.toString()"
          @change="onCellChange(record.key, 'firstTarget', $event)"
        />
      </template>
      <template slot="target_index" slot-scope="text, record" rowspan="3">
        <editable-cell
          v-if="text.show"
          :text="text.value.toString()"
          @change="onCellChange(record.key, 'target_index', $event)"
        />
      </template>
      <template slot="target" slot-scope="text, record" rowspan="3">
        <editable-cell
          v-if="text.show"
          :text="text.value.toString()"
          @change="onCellChange(record.key, 'target', $event)"
        />
      </template>
      <template slot="department" slot-scope="text, record" rowspan="3">
        <editable-cell
          v-if="text.show"
          :text="text.value.toString()"
          @change="onCellChange(record.key, 'department', $event)"
        />
      </template> -->
      <template slot="index" slot-scope="text" rowspan="3">
        <!-- <editable-cell
          v-if="text.show"
          :text="text.value.toString()"
          @change="onCellChange(record.key, 'index', $event)"
        /> -->
        <span v-if="text.show">
          {{ text.value }}
        </span>
      </template>
      <template
        :slot="item"
        slot-scope="text, record"
        v-for="(item, index) in [
          'firstTarget',
          'target_index',
          'target',
          'department',
          'score',
          'grade',
          'remarks',
        ]"
      >
        <editable-cell
          v-if="text.show"
          :key="index"
          :text="text.value.toString()"
          @change="onCellChange(record[item].key, item, $event)"
        />
      </template>
    </a-table>
  </div>
</template>
<script>
import EditableCell from "@/components/edit-table/editTableCell";
// import Bus from '@/pages/table/eventBus'
export default {
  components: {
    EditableCell,
  },
  props: ["tableData", "title", "company", "status"],
  data() {
    return {
      tableDataV: this.tableData,
      key: 0,
      columns: [],
    };
  },
  created() {},
  mounted() {
    // // 保存
    // Bus.$on("save_Generality",(e)=>{
    //   Bus.$emit("save_Generality_input", e);
    // })
    this.columns = [
      // {
      //   title: "序号",
      //   dataIndex: "index",
      //   customRender: text => {
      //     return {
      //       children: <span style="width: 100px;">{text.value}</span>,
      //       attrs: {
      //         rowSpan: text.rowSpan,
      //       },
      //     };
      //   },
      // },
      /**
       * 渲染模板
       * status
       * dataIndex
       * title
       * colSpan
       * width [编辑状态,阅读状态]
       */
      // 序号
      this.Render_Tab(this.status, "index", "序号", 1, [50, 50]),
      // 一级指标
      this.Render_Tab(this.status, "firstTarget", "一级指标", 1, [200, 150]),
      // 考核部门
      this.Render_Tab(this.status, "target_index", "工作目标", 0, [100, 50]),
      this.Render_Tab(this.status, "target", "工作目标", 2, [200, 100]),
      this.Render_Tab(this.status, "department", "考核部门", 1, [200, 100]),
      this.Render_Tab(this.status, "score", "分值", 1, [200, 100]),
      this.Render_Tab(this.status, "grade", "考核等级", 1, [200, 100]),
      this.Render_Tab(this.status, "remarks", "考核备注", 1, [200, 100]),
      // this.Render_firstTarget(this.status),
      // // 工作目标
      // this.Render_target_index(this.status),
      // this.Render_target(this.status),
      // 考核部门
      // {
      //   title: "工作目标",
      //   dataIndex: "target",
      //   colSpan: 2,
      //   customRender: text => {
      //     return {
      //       children: <span>{text.value}</span>,
      //     };
      //   },
      // },
      // {
      //   title: "考核部门",
      //   dataIndex: "department",
      //   customRender: text => {
      //     return <span>{text.value}</span>;
      //   },
      // },
      // {
      //   title: "分值",
      //   dataIndex: "score",
      //   customRender: text => {
      //     return <span>{text.value}</span>;
      //   },
      // },
      // {
      //   title: "考核等级",
      //   dataIndex: "grade",
      //   customRender: text => {
      //     return <span>{text.value}</span>;
      //   },
      // },
      // {
      //   title: "备注（ 任务之 外&创新）",
      //   dataIndex: "remarks",
      //   customRender: text => {
      //     return <span>{text.value}</span>;
      //   },
      // },
    ];
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const tableDataV = [...this.tableDataV];
      // console.log(key);
      const target = tableDataV.find(item => item[dataIndex].key === key);
      if (target) {
        target[dataIndex].value = value;
        this.tableDataV = tableDataV;
      }
      // console.log(this.tableDataV);
      console.log(1)
    },
    // 一级指标
    Render_firstTarget(status) {
      const scopedSlots = { customRender: "firstTarget" };
      const customRender = text => {
        return {
          children: <span>{text.value}</span>,
          attrs: {
            rowSpan: text.rowSpan,
          },
        };
      };
      const obj = {
        title: "一级指标",
        dataIndex: "firstTarget",
        width: status ? 150 : 100,
      };
      if (status) {
        return {
          ...obj,
          scopedSlots,
        };
      } else {
        return {
          ...obj,
          customRender,
        };
      }
    },
    // 工作目标
    Render_target_index(status) {
      const scopedSlots = { customRender: "target_index" };
      const customRender = text => {
        return {
          children: <span>{text.value}</span>,
          attrs: {
            rowSpan: text.rowSpan,
          },
        };
      };
      const obj = {
        title: "工作目标",
        dataIndex: "target_index",
        width: status ? 150 : 100,
        colSpan: 0,
      };
      if (status) {
        return {
          ...obj,
          scopedSlots,
        };
      } else {
        return {
          ...obj,
          customRender,
        };
      }
    },
    Render_target(status) {
      const scopedSlots = { customRender: "target" };
      const customRender = text => {
        return {
          children: <span>{text.value}</span>,
          attrs: {
            rowSpan: text.rowSpan,
          },
        };
      };
      const obj = {
        title: "工作目标",
        dataIndex: "target",
        width: status ? 150 : 100,
        colSpan: 2,
      };
      if (status) {
        return {
          ...obj,
          scopedSlots,
        };
      } else {
        return {
          ...obj,
          customRender,
        };
      }
    },
    // 考核部门

    /**
     * 渲染模板
     * status
     * dataIndex
     * title
     * colSpan
     * width [100,200]
     */
    Render_Tab(status, dataIndex, title, colSpan, width) {
      const scopedSlots = { customRender: dataIndex };
      const customRender = text => {
        return {
          children: <span>{text.value}</span>,
          attrs: {
            rowSpan: text.rowSpan,
          },
        };
      };
      const obj = {
        title,
        dataIndex: dataIndex,
        width: status ? width[0] : width[1],
        colSpan,
      };
      if (status) {
        return {
          ...obj,
          scopedSlots,
        };
      } else {
        return {
          ...obj,
          customRender,
        };
      }
    },
  },
};
</script>
<style lang="less" scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
.ant-table-wrapper {
  height: 100% !important;
}
.hidden_header {
  margin: -15px !important;
  /deep/ .ant-table-thead {
    display: none !important;
  }
}
.edit-table {
  width: 100%;
  .edit-table-header {
    text-align: center;
    font-size: 40px;
  }
}
</style>
