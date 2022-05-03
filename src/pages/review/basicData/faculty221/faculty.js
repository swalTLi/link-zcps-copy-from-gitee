export const COLUMNS = [
  // {
  //   title: "id",
  //   dataIndex: "id",
  //   scopedSlots: { customRender: "description" },
  //
  //   fixed: "left",
  //   ellipsis: false,
  //   是否在详情页展示
  //   info_show: false,
  //   是否在编辑页展示
  //   edit_show: false,
  // },
  {
    title: "用户名",
    dataIndex: "name",
    scopedSlots: { customRender: "description" },

    fixed: "left",
    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    rule: [
      {
        required: true,
        message: "请填写用户名",
        trigger: "blur",
      },
      {
        min: 3,
        max: 10,
        message: "字符长度3-10",
        trigger: "blur",
      },
    ],
    placeholder: "请填写用户名，字符长度3-10",
  },
  {
    title: "允许登陆",
    dataIndex: "allowLogin",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
    
    formType: "ldq-radio",
    info_show: true,
    edit_show: true,
    rule: [
      {
        required: true,
        message: "请设置是否允许用户登陆",
        trigger: "change",
      },
    ],
    placeholder: "请设置是否允许用户登陆",
    radios: [
      {
        label: "允许",
        value: 1,
      },
      {
        label: "不允许",
        value: 0,
      },
    ],
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
    info_show: false,
    edit_show: false,
    //  日期
    // formType: "ldq-DatePicker",
    // // timeType 时间格式
    // // 1. 时间戳
    // // 2. YY-M
    // dataeType: "",
    // info_show: true,
    // rule: [
    //   {
    //     required: true,
    //     message: "请选择时间",
    //     trigger: "change",
    //   },
    // ],
    // placeholder: "请选择时间",
  },
  {
    title: "教师姓名",
    dataIndex: "teacherName",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
    
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    rule: [
      {
        required: true,
        message: "请填写教师姓名",
        trigger: "blur",
      },
      {
        min: 2,
        max: 5,
        message: "字符长度2-5",
        trigger: "blur",
      },
    ],
    placeholder: "教师姓名，字符长度2-5",
  },
  {
    title: "岗位",
    dataIndex: "jobs",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
    
    formType: "ldq-select",
    info_show: true,
    edit_show: true,
    rule: [
      {
        required: true,
        message: "请选择岗位",
        trigger: "blur",
      },
    ],
    placeholder: "请选择岗位",
    selects: [
      {
        label: "校聘",
        value: "校聘",
      },
      {
        label: "院聘",
        value: "院聘",
      },
    ],
  },
  {
    title: "岗位系列",
    dataIndex: "postSeries",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
  },
  {
    title: "岗位等级",
    dataIndex: "postGrades",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
  },
  {
    title: "岗位类型",
    dataIndex: "postType",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
  },
  {
    title: "二级部门编号",
    dataIndex: "secondarySectorNumber",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "二级部门信息id",
    dataIndex: "secondarySectorId",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
  },
  {
    title: "二级部门名称",
    dataIndex: "secondarySectorName",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
  },
  {
    title: "职能部门信息id",
    dataIndex: "functionId",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
  },
  {
    title: "职能部门编号",
    dataIndex: "functionNumber",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
  },
  {
    title: "职能部门名称",
    dataIndex: "functionName",
    scopedSlots: { customRender: "description" },

    ellipsis: false,
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
    width: 200,
    fixed: "right",
    // 是否在详情页展示
    info_show: false,
    // 是否在编辑页展示
    edit_show: false,
  },
];
