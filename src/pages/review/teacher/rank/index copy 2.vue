<template>
  <a-card :bordered="false">
    <div style="font-size:30px;color: black;margin: 20px 0;">
      {{ $route.query.name }}
    </div>
    <!-- :rowkey="'teacherId'" -->
    <a-space class="operator" align="baseline">
      <!-- <a-button
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
      </h2> -->
      <label
        style="margin-left: 50px;font-size: 16px;font-weight: bold;"
        v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'"
        >二级部门审核状态：</label
      >
      <a-select
        v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'"
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
      <label
        v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'"
        style="margin-left: 20px;font-size: 16px;font-weight: bold;"
        >职能部门审核状态：</label
      >
      <a-select
        v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'"
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
      <label style="margin-left: 50px;font-size: 16px;font-weight: bold;"
        >教师姓名：</label
      >
      <a-input
        v-model="info.keyWord"
        allow-clear
        placeholder="请输入教师姓名"
      />
      <a-button type="primary" @click="getList()">检索</a-button>
    </a-space>
    <a-table
      class="table-td"
      :loading="loading"
      style="margin-top:20px;"
      :columns="COLUMNS"
      :data-source="dataSource"
      bordered
      :pagination="false"
      size="small"
    >
      <div slot="index" slot-scope="text, record, index">
        {{ index + 1 }}
      </div>
      <span slot="action" slot-scope="text, record, index" href="javascript:;">
        <a style="margin-right: 8px" @click="SEE(record, index)">
          <a-icon :component="svg_edit" /> 查看
        </a>
        <a-popconfirm
          title="点击通过?"
          ok-text="通过"
          cancel-text="取消"
          @confirm="TG(record, index)"
          @cancel="() => {}"
        >
          <a
            style="margin-right: 8px"
            v-if="
              record.functionExamineType !== 2 &&
                record.secondarySectorExamineType !== 2 &&
                record.functionExamineType !== 1 &&
                record.secondarySectorExamineType !== 1 &&
                Cookie.get('type') !== '1'
            "
          >
            <a-icon :component="svg_edit" /> 通过
          </a>
        </a-popconfirm>
        <a
          style="margin-right: 8px"
          @click="btg(record)"
          v-if="
            record.functionExamineType !== 2 &&
              record.secondarySectorExamineType !== 2 &&
              record.functionExamineType !== 1 &&
              record.secondarySectorExamineType !== 1 &&
              Cookie.get('type') !== '1'
          "
        >
          <a-icon :component="svg_edit" /> 不通过
        </a>
      </span>
    </a-table>
    <a-pagination
      v-model="pagination.current"
      :page-size-options="pagination.pageSizeOptions"
      :total="pagination.total"
      show-size-changer
      :page-size="pagination.pageSize"
      @showSizeChange="onShowSizeChange"
      style="margin-top: 8px;"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
        <span v-if="props.value === '50'">全部</span>
      </template>
    </a-pagination>
    <a-modal
      v-model="visible"
      title="审核"
      ok-text="确认"
      cancel-text="取消"
      @ok="BTG"
    >
      <label>说明：</label>
      <a-textarea
        style="width: 100%;height:400px;font-size: 20px;"
        v-model="description"
        placeholder="请填写描述"
      />
    </a-modal>
    <a-modal
      :width="1000"
      v-model="visible2"
      title="详情"
      ok-text="确认"
      cancel-text="取消"
      @ok="visible2 = false"
    >
      <a-page-header title="填报信息" />
      <div style="margin-left: 50px;" class="label">
        <label style="line-height:30px;">所属部门：</label>
        <span>{{ record.secondarySectorName }}</span>
        <br v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'" />
        <label
          style="line-height:30px;"
          v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'"
          >二级部门审核状态：</label
        >
        <span
          v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'"
          :style="{
            color:
              record.secondarySectorExamineType === 1
                ? 'green'
                : record.secondarySectorExamineType === 2
                ? 'red'
                : 'black',
          }"
          >{{ getInfo(type1[record.secondarySectorExamineType]) }}</span
        ><br v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'" />
        <label
          style="line-height:30px;"
          v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'"
          >二级部门审核说明：</label
        >
        <span v-if="Cookie.get('type') === '4' || Cookie.get('type') === '1'">{{
          getInfo(type1[record.secondarySectorExamineNote])
        }}</span
        ><br v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'" />
        <label
          style="line-height:30px;"
          v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'"
          >职能部门审核状态：</label
        >
        <span
          v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'"
          :style="{
            color:
              record.functionExamineType === 1
                ? 'green'
                : record.functionExamineType === 2
                ? 'red'
                : 'black',
          }"
          >{{ getInfo(type2[record.functionExamineType]) }}</span
        ><br v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'" />
        <label
          style="line-height:30px;"
          v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'"
          >职能部门审核状态：</label
        >
        <span v-if="Cookie.get('type') === '3' || Cookie.get('type') === '1'">{{
          getInfo(type2[record.functionExamineNote])
        }}</span
        ><br />
        <label style="line-height:30px;">上传文件：</label>
        <span>
          <a href="" style="color: green;text-decoration: underline">下载</a>
          {{ record.fileName }}</span
        ><br />
        <label>描述：</label> <span>{{ record.description }}</span
        ><br />
      </div>
      <a-divider style="margin-bottom: 32px" />
      <a-page-header title="成果信息" />
      <a-table
        :data-source="record.tableList"
        bordered
        :pagination="false"
        size="small"
      >
        <a-table-column key="source" title="来源" data-index="source">
          <template slot-scope="text">
            {{ text }}
          </template>
        </a-table-column>
        <a-table-column key="type" title="类型" data-index="type">
          <template slot-scope="text, record">
            {{ getType([text, record.typeName]) }}
          </template>
        </a-table-column>
        <a-table-column key="name" title="名称" data-index="name">
          <template slot-scope="text">
            {{ text }}
          </template>
        </a-table-column>
        <a-table-column key="level" title="等级" data-index="level">
          <template slot-scope="text">
            {{ text }}
          </template>
        </a-table-column>
        <a-table-column key="time" title="时间" data-index="time">
          <template slot-scope="text">
            {{ getLocalTime(text) }}
          </template>
        </a-table-column>
      </a-table>
      <a-divider style="margin-bottom: 32px" />
    </a-modal>
  </a-card>
</template>

<script>
import svg_unlock from "@/assets/svg/unlock.svg";
import svg_lock from "@/assets/svg/lock.svg";
import svg_edit from "@/assets/svg/edit.svg";
import XHR from "@/services/interface";
import Cookie from "js-cookie";
// import DetailList from "@/components/tool/DetailList";
const SVG_LIST = {
  svg_unlock,
  svg_lock,
  svg_edit,
};
export default {
  name: "Success",
  // components: { DetailList },
  data() {
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
    function getInfo(e) {
      if (e) {
        return e;
      } else {
        return "";
      }
    }
    function getCOLUMNS(_Columns) {
      if (Cookie.get("type") === "1") {
        return _Columns;
      }
      if (Cookie.get("type") === "3") {
        _Columns[10].children.splice(0, 1);
        // _Columns.splice(8, 2);
        return _Columns;
      }
      if (Cookie.get("type") === "4") {
        _Columns[10].children.splice(1, 1);
        // _Columns.splice(10, 2);
        return _Columns;
      }
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
        title: "教师名称",
        dataIndex: "teacherName",
        scopedSlots: { customRender: "teacherName" },
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
        title: "教师工号",
        dataIndex: "teacherSid",
        scopedSlots: { customRender: "teacherSid" },
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
        title: "职称",
        dataIndex: "teacherTitle",
        scopedSlots: { customRender: "teacherTitle" },
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
        title: "职称获得时间",
        dataIndex: "teacherTitleTime",
        scopedSlots: { customRender: "teacherTitleTime" },
        customRender: (value, row) => {
          row;
          const obj = {
            children: getLocalTime(value),
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
        // colSpan: 1,
        scopedSlots: { customRender: "description" },
        customRender: (value, row) => {
          console.log(row);
          var columns = [];
          var data = [];
          // 描述 文件
          if (row.description) {
            columns = [
              {
                title: "描述",
                dataIndex: "description",
                scopedSlots: { customRender: "description" },
              },
            ];
          } else {
            columns = [
              {
                title: "描述",
                dataIndex: "level",
                scopedSlots: { customRender: "level" },
              },
              {
                title: "描述",
                dataIndex: "name",
                scopedSlots: { customRender: "name" },
              },
              {
                title: "描述",
                dataIndex: "source",
                scopedSlots: { customRender: "source" },
              },
              {
                title: "描述",
                dataIndex: "type",
                scopedSlots: { customRender: "type" },
              },
              {
                title: "描述",
                dataIndex: "typeName",
                scopedSlots: { customRender: "typeName" },
              },
            ];
          }
          // const array = [
          //   "name",
          //   "scope",
          //   "source",
          //   "subject",
          //   "publication",
          //   "include",
          //   "page",
          // ];
          // const realarray = array.filter(_ => {
          //   return row[_] !== undefined && row[_] !== null;
          // });
          const obj = {
            children: (
              <a-table
                showHeader={false}
                id="link-table"
                pagination={false}
                style="border: 0px"
                columns={columns}
                // {[
                //   {
                //     title: "明细",
                //     dataIndex: "index",
                //     // colSpan: 1,
                //     scopedSlots: { customRender: "index" },
                //   },
                //   {
                //     title: "明2细",
                //     dataIndex: "index2",
                //     // colSpan: 1,
                //     scopedSlots: { customRender: "index2" },
                //   },
                // ]}
                data-source={[
                  { index: 1, index2: 2 },
                  { index: 11, index2: 22 },
                ]}
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
        // children2: [
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
        //       // const array = [
        //       //   "name",
        //       //   "scope",
        //       //   "source",
        //       //   "subject",
        //       //   "publication",
        //       //   "include",
        //       //   "page",
        //       // ];
        //       // const realarray = array.filter(_ => {
        //       //   return row[_] !== undefined && row[_] !== null;
        //       // });
        //       const obj = {
        //         children: (
        //           <a-table
        //             pagination={false}
        //             style="border: 0px"
        //             columns={[
        //               {
        //                 title: "明细",
        //                 dataIndex: "index",
        //                 // colSpan: 1,
        //                 scopedSlots: { customRender: "index" },
        //               },
        //               {
        //                 title: "明2细",
        //                 dataIndex: "index2",
        //                 // colSpan: 1,
        //                 scopedSlots: { customRender: "index2" },
        //               },
        //             ]}
        //             data-source={[
        //               { index: 1, index2: 2 },
        //               { index: 11, index2: 22 },
        //             ]}
        //             bordered
        //             size="small"
        //           >
        //             <div slot="index" slot-scope={{}}>
        //               s
        //             </div>
        //           </a-table>
        //           // <tr>
        //           //   {realarray.map(_ => {
        //           //     if (row[_] !== undefined && row[_] !== null) {
        //           //       return (
        //           //         <th
        //           //           style={{
        //           //             width: "30% !important",
        //           //             height: "100% !important",
        //           //           }}
        //           //           class="table-box"
        //           //         >
        //           //           {row[_]}
        //           //         </th>
        //           //       );
        //           //     }
        //           //   })}
        //           // </tr>
        //         ),
        //         attrs: {},
        //       };
        //       return obj;
        //     },
        //   },
        // ],
        ellipsis: false,
        formType: "ldq-isUpload",
        info_show: true,
        edit_show: true,
        add_show: true,
        is_Editable: true,
      },
      {
        title: "审核状态/说明",
        dataIndex: "secondarySectorExamineType",
        scopedSlots: { customRender: "secondarySectorExamineType" },
        children: [
          {
            title: "二级",
            dataIndex: "secondarySectorExamineType",
            key: "secondarySectorExamineType",
            customRender: (value, row) => {
              var color = "";
              if (row.secondarySectorExamineType === 2) {
                color = "red";
              }
              if (row.secondarySectorExamineType === 1) {
                color = "green";
              }
              const arr = [
                getInfo(type1[row.secondarySectorExamineType]),
                row.secondarySectorExamineNote
                  ? row.secondarySectorExamineNote
                  : "空",
              ].join(" / ");
              const obj = {
                children: (
                  <span>
                    <span style={{ color: color }}>{arr[0]}</span>
                    <span>{arr[1]}</span>
                  </span>
                ),
                attrs: {},
              };
              return obj;
            },
          },
          {
            title: "职能",
            dataIndex: "functionExamineType",
            scopedSlots: { customRender: "functionExamineType" },
            customRender: (value, row) => {
              var color = "";
              if (row.functionExamineType === 2) {
                color = "red";
              }
              if (row.functionExamineType === 1) {
                color = "green";
              }
              const arr = [
                getInfo(type2[row.functionExamineType]),
                row.functionExamineNote ? row.functionExamineNote : "空",
              ].join(" / ");
              const obj = {
                children: <span style={{ color: color }}>{arr}</span>,
                attrs: {},
              };
              return obj;
            },
          },
        ],
      },
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
      Cookie,
      pagination: {
        pageSizeOptions: ["10"],
        current: 1,
        pageSize: 10,
        total: undefined,
      },
      type1,
      type2,
      description: "",
      ...SVG_LIST,
      dataSource: [],
      // aasdadsasdad: getCOLUMNS(COLUMNS),
      COLUMNS: getCOLUMNS(COLUMNS),
      tableDate: [],
      num: 0,
      loading: true,
      visible: false,
      visible2: false,
      record: {},
      info: {
        page: 1,
        line: 10,
        keyWord: undefined,
      },
      functionExamineType: -1,
      secondarySectorExamineType: -1,
      loaging: false,
    };
  },
  async activated() {
    await this.getList();
  },
  // async mounted() {
  //   await this.getList();
  // },
  destroyed() {},
  watch: {
    visible(newV) {
      if (!newV) {
        this.record = {};
      }
    },
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
  methods: {
    async getList() {
      this.loading = true;
      this.info.page = this.pagination.current;
      this.info.line = this.pagination.pageSize;
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
      await XHR.Axios_$$rankReview_searchTeacherUploadList({
        ...this.info,
        rankReviewId: this.$route.query.rankReviewId,
        performanceCriteriaId: this.$route.query.performanceCriteriaId,
        functionExamineType: status.functionExamineType,
        secondarySectorExamineType: status.secondarySectorExamineType,
        keyWord: this.info.keyWord,
        // rankReviewId: 6,
        // performanceCriteriaId: 1,
      }).then(async _ => {
        this.pagination.total = _.data.info.lineCount;
        this.pagination.pageCount = _.data.info.pageCount;
        this.dataSource = [];
        this.tableDate = this.deepCopy(_.data.info.list);

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
          if (_arr.length) {
            await _arr.forEach((_a, ind) => {
              arr.push({
                ..._a,
                ...__,
                item_number: ind,
                index: ind === 0 ? (index += 1) : index,
              });
            });
          } else {
            __.length = 1;
            arr.push({ ...__, item_number: 0, index: (index += 1) });
          }
        });
        this.dataSource = await arr;
        this.loading = false;
        console.log(this.tableData);
        this.$forceUpdate();
      });
      console.log(this.tableDate);
      console.log(this.dataSource);
      this.loading = false;
      return this.tableDate;
    },
    async SEE(record) {
      await XHR.Axios_$$rankReview_searchTeacherUploadInfo({
        id: record.teacherInputId,
        teacherSecondarySectorInfo: record.secondarySectorName,
      }).then(async _ => {
        console.log(_);
        var list = [];
        this.record = { ...record, ..._.data.info };
        await _.data.info.chooseResearch.forEach(_ => {
          list.push(_);
        });
        await _.data.info.chooseProject.forEach(_ => {
          list.push(_);
        });
        await _.data.info.chooseCompetition.forEach(_ => {
          list.push(_);
        });
        this.record.tableList = list;
      });
      this.visible2 = await true;
    },
    async TG(record) {
      console.log(record);
      var info = {};
      if (
        record["functionExamineType"] !== undefined &&
        record["functionExamineType"] !== null
      ) {
        info["functionExamineType"] = 1;
        info["functionExamineNote"] = "";
      }
      if (
        record["secondarySectorExamineType"] !== undefined &&
        record["secondarySectorExamineType"] !== null
      ) {
        info["secondarySectorExamineType"] = 1;
        info["secondarySectorExamineNote"] = "";
      }
      console.log(info);
      await XHR.Axios_$$rankReview_checkTeacherFill({
        id: record.teacherInputId,
        ...info,
      }).then(_ => {
        console.log(_);
        if (_.data.state === 1) {
          this.getList();
        }
      });
    },
    async BTG() {
      var info = {};
      if (
        this.record["functionExamineType"] !== undefined &&
        this.record["functionExamineType"] !== null
      ) {
        info["functionExamineType"] = 2;
        if (!this.description) {
          return this.$message.error("请将说明填完整");
        } else {
          info["functionExamineNote"] = this.description;
        }
      }
      if (
        this.record["secondarySectorExamineType"] !== undefined &&
        this.record["secondarySectorExamineType"] !== null
      ) {
        info["secondarySectorExamineType"] = 2;
        if (!this.description) {
          return this.$message.error("请将说明填完整.");
        } else {
          info["secondarySectorExamineNote"] = this.description;
        }
      }
      await XHR.Axios_$$rankReview_checkTeacherFill({
        id: this.record.teacherInputId,
        ...info,
      }).then(_ => {
        console.log(_);
        this.description = "";
        this.visible = false;
      });
      await this.getList();
    },
    getType(arr) {
      var a = [];
      arr.forEach(_ => {
        if (_) a.push(_);
      });
      return a.join(" / ");
    },
    deepCopy(obj) {
      var a = JSON.stringify(obj);
      var newobj = JSON.parse(a);
      return newobj;
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
    getLength(list) {
      var a = 0;
      list.forEach(_ => {
        _.requireList.forEach(() => {
          a++;
        });
      });
      console.log(a);
      return a;
    },
    hideModal() {
      this.visible = false;
    },
    btg(record) {
      this.record = record;
      this.visible = true;
    },
    async goto(path, query, key) {
      this.$router.push({
        path,
        query: { ...query, [key]: query.id },
      });
    },
    getInfo(e) {
      if (e) {
        return e;
      } else {
        return "";
      }
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      // this.getList();
    },
    handleSelect(value, key) {
      this[key] = value;
      console.log(this[key]);
      this.getList();
    },
  },
};
</script>

<style scoped lang="less">
.result-success {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  // height: 300px;
  // background-color: green;
  padding-top: 30px;
  .line {
    width: 100%;
    background-color: white;
    align-items: center;
    font-size: 30px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .box {
    cursor: pointer;
    // width: 30%;
    // background-color: red;
    left: 1057px;
    top: 146px;
    // height: 158px;
    line-height: 20px;
    border-radius: 3px;
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: center;
    // align-items: start;
    .welcome-link {
      margin-top: 20px;
      width: 100%;
      height: 150px;
      background-color: rgba(255, 255, 255, 100);
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.14);
      border: 1px solid rgba(233, 233, 233, 100);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .box {
        width: 60%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
    .d1 {
      width: 100%;
      span {
        left: 430px;
        top: 177px;
        width: 64px;
        height: 24px;
        color: rgba(16, 16, 16, 100);
        font-size: 16px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
      }
    }
    .d2 {
      width: 100%;
      span {
        left: 799px;
        top: 213px;
        height: 22px;
        color: rgba(136, 137, 138, 100);
        font-size: 14px;
        text-align: center;
        font-family: SourceHanSansSC-regular;
      }
    }
  }
  .label {
    label {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .action:not(:first-child) {
    margin-left: 8px;
  }
  .project-name {
    font-size: 16px;
    color: @title-color;
    font-weight: 500;
    margin-bottom: 20px;
  }
}
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
.table-line {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-box {
  padding: 10px;
}
#link-table {
  .ant-table {
    margin: -15px !important;
    /deep/ .ant-table-thead {
      display: none !important;
    }
  }
}
.table-td {
  /deep/ .ant-table-tbody {
    // background-color: red !important;
    .ant-table-row {
      td:nth-child(8) {
        // background-color: rgb(95, 67, 67) !important;
        padding: 0px !important;
        .ant-table-wrapper {
          border: 0;
        }
      }
    }
  }
}
#link-table {
  height: 200%;
}
.ant-table-wrapper {
  width: 98%;
  height: 100%;
  position: relative;
  // top: 30px;
}
.ant-table {
  background-color: rgb(9, 100, 100);
  color: white;
}
// 表头样式
.ant-table-thead > tr > th {
  background-color: rgb(3, 50, 50);
  color: white;
}

// 修改选中行样式
.ant-table-tbody {
  > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover,
  .ant-table-row-hover > td {
    background-color: rgb(18, 75, 75) !important;
  }
}
// 去除边框，留右边框 && 表格内容居中 && 行高
.ant-table-tbody > tr > td,
.ant-table-thead > tr > th {
  border-bottom: none;
  border-right: 1px solid #ccc;
  text-align: center !important;
  padding: 10px 10px !important;
}

// 去除表头最右边边框
.ant-table-container table > thead > tr:first-child th:last-child {
  border-right: none;
}
// 去除tbody最右边边框
.ant-table-container table > tbody > tr td:last-child {
  border-right: none;
}
// 暂无数据样式
.ant-empty-description {
  color: white;
}
// 奇数行
.table-color-odd {
  background-color: rgb(9, 100, 100);
}
// 偶数行
.table-color-even {
  background-color: rgb(19, 147, 147);
}
</style>
