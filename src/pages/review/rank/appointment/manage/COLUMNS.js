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
    title: "用户id",
    dataIndex: "id",
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


    formType: "ldq-input",
    // 查看详情时是否显示
    info_show: true,

    edit_show: true,

    is_Editable: false,

    add_show: false,
  },
  {
    title: "岗位聘任名称",
    dataIndex: "name",
    scopedSlots: { customRender: "description" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写岗位聘任名称",
        trigger: "blur",
      },
    ],
    placeholder: "请填写岗位聘任名称",
  },
  {
    title: "年份",
    dataIndex: "year",
    scopedSlots: { customRender: "year" },



    formType: "ldq-input",
    info_show: false,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请输入年份",
        trigger: "blur",
      },
    ],
    placeholder: "请输入年份",
  },
  {
    title: "是否开启评审",
    dataIndex: "open",
    scopedSlots: { customRender: "open" },
    ellipsis: false,

    formType: "ldq-radio",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
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
    title: "是否开启公示",
    dataIndex: "public",
    scopedSlots: { customRender: "public" },
    ellipsis: false,

    formType: "ldq-radio",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "是否开启公示",
        trigger: "change",
      },
    ],
    placeholder: "是否开启公示",
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
    title: "开始时间",
    dataIndex: "startTime",
    scopedSlots: { customRender: "startTime" },

    ellipsis: false,

    formType: "ldq-datatime-m",
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
    title: "结束时间",
    dataIndex: "endTime",
    scopedSlots: { customRender: "endTime" },

    ellipsis: false,

    formType: "ldq-datatime-m",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请选择结束时间",
        trigger: "blur",
      },
    ],
    placeholder: "请选择结束时间",
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
