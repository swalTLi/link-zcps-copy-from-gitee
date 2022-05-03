import Cookie from "js-cookie";
const renderContent = value => {
  const obj = {
    children: value,
    attrs: {},
  };
  return obj;
};
renderContent;
var _COLUMNS = [
  {
    title: "教师姓名",
    dataIndex: "teacherName",
    key: "teacherName",
    customRender: (value, row) => {
      const obj = {
        children: value + 1,
        attrs: {},
      };
      if (row.serialNumber_hide) {
        obj.attrs.rowSpan = 0;
      } else {
        obj.attrs.rowSpan = row.serialNumber_children_num;
      }
      return obj;
    },
  },
  {
    title: "教师工号",
    dataIndex: "teacherSid",
    key: "teacherSid",
    customRender: (value, row) => {
      const obj = {
        children: value,
        attrs: {},
      };
      if (row.serialNumber_hide) {
        obj.attrs.rowSpan = 0;
      } else {
        obj.attrs.rowSpan = row.serialNumber_children_num;
      }
      return obj;
    },
  },
  {
    title: "职称",
    dataIndex: "teacherTitle",
    key: "teacherTitle",
    customRender: (value, row) => {
      const obj = {
        children: value,
        attrs: {},
      };
      if (row.serialNumber_hide) {
        obj.attrs.rowSpan = 0;
      } else {
        obj.attrs.rowSpan = row.serialNumber_children_num;
      }
      return obj;
    },
  },
  {
    title: "聘任时间",
    dataIndex: "teacherTitleTime",
    key: "teacherTitleTime",
    scopedSlots: { customRender: "teacherTitleTime" },
    customRender: (value, row) => {
      const obj = {
        children: value,
        attrs: {},
      };
      if (row.serialNumber_hide) {
        obj.attrs.rowSpan = 0;
      } else {
        obj.attrs.rowSpan = row.serialNumber_children_num;
      }
      return obj;
    },
  },
  {
    title: "评选职级",
    dataIndex: "performanceCriteriaName",
    key: "performanceCriteriaName",
    customRender: (value, row) => {
      const obj = {
        children: value,
        attrs: {},
      };
      if (row.serialNumber_hide) {
        obj.attrs.rowSpan = 0;
      } else {
        obj.attrs.rowSpan = row.serialNumber_children_num;
      }
      console.log(row.serialNumber_children_num);
      return obj;
    },
  },
  {
    title: "序号",
    dataIndex: "serialNumberName",
    key: "serialNumberName",
    customRender: (value, row) => {
      row;
      const obj = {
        children: value,
        attrs: {},
      };
      return obj;
    },
  },
  // {
  //   title: "具体条件",
  //   dataIndex: "line",
  //   customRender: renderContent,
  // },
  // {
  //   title: "教师上传id",
  //   dataIndex: "teacherInputId",
  //   key: "teacherInputId",
  //   // scopedSlots: { customRender: "teacherInputId" },
  //   customRender: value => {
  //     const obj = {
  //       children: value,
  //       attrs: {},
  //     };
  //     return obj;
  //   },
  // },
  // {
  //   title: "具体条件id",
  //   dataIndex: "requireId",
  //   key: "requireId",
  //   // scopedSlots: { customRender: "requireId" },
  //   customRender: value => {
  //     const obj = {
  //       children: value,
  //       attrs: {},
  //     };
  //     return obj;
  //   },
  // },
  // {
  //   title: "具体条件",
  //   dataIndex: "line",
  //   key: "line",
  //   // scopedSlots: { customRender: "line" },
  //   customRender: value => {
  //     const obj = {
  //       children: value,
  //       attrs: {},
  //     };
  //     return obj;
  //   },
  // },
  // {
  //   title: "等级",
  //   dataIndex: "level",
  //   key: "level",
  //   // scopedSlots: { customRender: "level" },
  //   customRender: value => {
  //     const obj = {
  //       children: value,
  //       attrs: {},
  //     };
  //     return obj;
  //   },
  // },
  // {
  //   title: "填报时间",
  //   dataIndex: "updateTime",
  //   key: "updateTime",
  //   scopedSlots: { customRender: "updateTime" },
  //   // customRender: renderContent,
  // },
  // {
  //   title: "审核状态",
  //   dataIndex: "updateTime",
  //   key: "updateTime",
  //   scopedSlots: { customRender: "updateTime" },
  //   // customRender: renderContent,
  // },
  // {
  //   title: "审核说明",
  //   dataIndex: "updateTime",
  //   key: "updateTime",
  //   scopedSlots: { customRender: "updateTime" },
  //   // customRender: renderContent,
  // },
  {
    title: "操作",
    dataIndex: "action",
    ellipsis: true,
    scopedSlots: { customRender: "action" },
  },
];
if(Cookie.get("type") === 1){
  _COLUMNS
}
export const COLUMNS = [..._COLUMNS];
export const rules = {
  researchInfoId: [
    { required: true, message: "请填写完整", trigger: "change" },
  ],
  requireLine: [{ required: true, message: "请填写完整", trigger: "change" }],
  requireId: [{ required: true, message: "请填写完整", trigger: "change" }],
  requireInfo: [{ required: true, message: "请填写完整", trigger: "change" }],
  serialNumberId: [
    { required: true, message: "请填写完整", trigger: "change" },
  ],
  money: [{ required: true, message: "请填写完整", trigger: "blur" }],
  description: [{ required: true, message: "请填写完整", trigger: "blur" }],
  file: [{ required: true, message: "请填写完整", trigger: "blur" }],
  researchInfo: [{ required: true, message: "请填写完整", trigger: "change" }],
  competition: [{ required: true, message: "请填写完整", trigger: "change" }],
  competitionId: [{ required: true, message: "请填写完整", trigger: "change" }],
  competitionInfo: [
    { required: true, message: "请填写完整", trigger: "change" },
  ],
  projectInfoId: [{ required: true, message: "请填写完整", trigger: "change" }],
};
