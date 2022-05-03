export const COLUMNS = [
  {
    title: "序号",
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
    info_show: false,

    edit_show: true,

    is_Editable: false,

    add_show: false,
  },
  {
    title: "具体要求",
    dataIndex: "line",
    scopedSlots: { customRender: "line" },

    ellipsis: false,

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
  //   title: "填写经费",
  //   dataIndex: "money",
  //   scopedSlots: { customRender: "money" },
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
  description: [{ required: true, message: "请填写描述", trigger: "blur" }],
  file: [{ required: true, message: "请填写完整", trigger: "blur" }],
  researchInfo: [{ required: true, message: "请填写完整", trigger: "change" }],
  competition: [{ required: true, message: "请填写完整", trigger: "change" }],
  competitionId: [{ required: true, message: "请填写完整", trigger: "change" }],
  competitionInfo: [
    { required: true, message: "请填写完整", trigger: "change" },
  ],
  projectInfoId: [{ required: true, message: "请填写完整", trigger: "change" }],
};
