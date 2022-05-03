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
getInfo;
type1;
function getInfo(e) {
  if (e) {
    return e;
  } else {
    return "";
  }
}
export const COLUMNS = [
  {
    title: "编号",
    dataIndex: "index",
    scopedSlots: { customRender: "index" },
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
    customRender: value => {
      const obj = {
        children: value,
        attrs: {},
      };
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
  {
    title: "描述",
    dataIndex: "description",
    scopedSlots: { customRender: "description" },
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

    formType: "ldq-ms",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写成果名称、获得时间、级别、排名",
        trigger: "blur",
      },
    ],
    placeholder: "请填写成果名称、获得时间、级别、排名",
  },
  {
    title: "明细",
    dataIndex: "isUpload",
    scopedSlots: { customRender: "isUpload" },
    customRender: value => {
      const obj = {
        children: value,
        attrs: {},
      };
      return obj;
    },
    ellipsis: false,
    formType: "ldq-isUpload",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写描述",
        trigger: "blur",
      },
    ],
    placeholder: "请填写描述",
  },
  {
    title: "二级部门审核状态",
    dataIndex: "secondarySectorExamineType",
    scopedSlots: { customRender: "secondarySectorExamineType" },
    customRender: (value, row) => {
      var color = "";
      if (row.secondarySectorExamineType === 2) {
        color = "red";
      }
      if (row.secondarySectorExamineType === 1) {
        color = "green";
      }
      console.log(color);
      console.log(color);
      const obj = {
        children: `<template>
        <span style="color: ${color}">
            ${getInfo(type1[row.secondarySectorExamineType])}
          </span></template>`,
        attrs: {},
      };
      return obj;
    },
  },
  {
    title: "职能部门审核状态",
    dataIndex: "functionExamineType",
    scopedSlots: { customRender: "functionExamineType" },
    customRender: value => {
      const obj = {
        children: value,
        attrs: {},
      };
      return obj;
    },
  },
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
  {
    title: "文件名",
    dataIndex: "fileName",
    scopedSlots: { customRender: "fileName" },

    ellipsis: false,

    formType: "ldq-href",
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
    title: "文件地址",
    dataIndex: "filePath",
    scopedSlots: { customRender: "filePath" },
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

    formType: "ldq-href",
    info_show: false,
    edit_show: true,
    add_show: true,
    is_Editable: false,
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
    title: "科技成果",
    dataIndex: "chooseResearch",
    scopedSlots: { customRender: "chooseResearch" },
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

    formType: "ldq-table",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
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
  description: [{ required: true, message: "请填写成果名称、获得时间、级别、排名", trigger: "blur" }],
  file: [{ required: true, message: "请填写完整", trigger: "blur" }],
  researchInfo: [{ required: true, message: "请填写完整", trigger: "change" }],
  competition: [{ required: true, message: "请填写完整", trigger: "change" }],
  competitionId: [{ required: true, message: "请填写完整", trigger: "change" }],
  competitionInfo: [
    { required: true, message: "请填写完整", trigger: "change" },
  ],
  projectInfoId: [{ required: true, message: "请填写完整", trigger: "change" }],
};
