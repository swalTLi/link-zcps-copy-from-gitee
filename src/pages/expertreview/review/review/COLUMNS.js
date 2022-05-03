export const COLUMNS = [
  {
    title: "序号",
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
    ellipsis: false,

    formType: "ldq-input",
    // 查看详情时是否显示
    info_show: true,

    edit_show: true,

    is_Editable: false,

    add_show: false,
  },
  {
    title: "评审名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写用户名",
        trigger: "blur",
      },
      {
        min: 3,
        max: 20,
        message: "字符长度3-20",
        trigger: "blur",
      },
    ],
    placeholder: "请填写用户名，字符长度3-20",
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
    title: "是否开启",
    dataIndex: "openReview",
    scopedSlots: { customRender: "openReview" },
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
    title: "是否允许投票",
    dataIndex: "allowVote",
    scopedSlots: { customRender: "allowVote" },
    ellipsis: false,

    formType: "ldq-radio",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "是否允许投票",
        trigger: "change",
      },
    ],
    placeholder: "是否允许评审",
    radios: [
      {
        label: "是",
        value: 1,
      },
      {
        label: "否",
        value: 0,
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
  {
    title: "评审排序",
    dataIndex: "order",
    scopedSlots: { customRender: "order" },

    ellipsis: false,

    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: true,
    is_Editable: true,
    rule: [
      {
        required: true,
        message: "请填写序号",
        trigger: "blur",
      },
    ],
    placeholder: "请填写序号",
  },
];
