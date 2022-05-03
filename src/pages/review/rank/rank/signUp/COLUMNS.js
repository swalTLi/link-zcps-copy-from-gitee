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
    title: "id",
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
    info_show: false,

    edit_show: true,

    is_Editable: false,

    add_show: false,
  },
  {
    title: "教师工号",
    dataIndex: "teacherSid",
    scopedSlots: { customRender: "teacherSid" },
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: false,
    is_Editable: false,
  },
  {
    title: "教师名称",
    dataIndex: "teacherName",
    scopedSlots: { customRender: "teacherName" },
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: false,
    is_Editable: false,
  },
  {
    title: "审核结果",
    dataIndex: "isCheck",
    scopedSlots: { customRender: "isCheck" },
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: false,
    is_Editable: false,
    customRender: value => {
      if (value == 0) {
        return '未检查';
      }
      if (value == 1) {
        return '已通过';
      }
      if (value == 2) {
        return '未通过';
      }
      return value;
    },
  },
  /*{
    title: "评审名称",
    dataIndex: "rankReviewName",
    scopedSlots: { customRender: "rankReviewName" },
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: false,
    is_Editable: false,
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
    title: "评定条件",
    dataIndex: "performanceCriteriaName",
    scopedSlots: { customRender: "performanceCriteriaName" },
    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: false,
    is_Editable: false,
  },*/
  {
    title: "操作",
    dataIndex: "caozuo",
    scopedSlots: { customRender: "action" },
    info_show: false,
    edit_show: false,
    add_show: false,
  },
];
