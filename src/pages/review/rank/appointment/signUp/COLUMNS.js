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
    title: "评审名称",
    dataIndex: "positionAppointmentReviewName",
    scopedSlots: { customRender: "positionAppointmentReviewName" },
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
    info_show: true,
    edit_show: true,
    add_show: false,
    is_Editable: false,
  },
  {
    title: "业绩条件",
    dataIndex: "positionAppointmentName",
    scopedSlots: { customRender: "positionAppointmentName" },



    formType: "ldq-input",
    info_show: true,
    edit_show: true,
    add_show: false,
    is_Editable: false,
  },
  {
    title: "业绩条件（教师端显示）",
    dataIndex: "positionAppointmentTeacherChooseName",
    scopedSlots: { customRender: "positionAppointmentTeacherChooseName" },
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
    info_show: true,
    edit_show: true,
    add_show: false,
    is_Editable: false,
  },
  {
    title: "岗位聘任id",
    dataIndex: "performanceCriteriaId",
    scopedSlots: { customRender: "performanceCriteriaId" },
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
    add_show: false,
    is_Editable: false,
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
    title: "岗位评聘条件",
    dataIndex: "positionAppointmentName",
    scopedSlots: { customRender: "positionAppointmentName" },



    formType: "ldq-input",
    info_show: false,
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
